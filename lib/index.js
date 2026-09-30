// lib/types/index.js
import { Remote, TypertRemoteService } from "@deepseek-ai/dsh-typert-protocol";

// lib/types/turn-usage.js
function isCount(value) {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}
function safeSum(values) {
  let total = 0;
  for (const value of values) {
    total += value;
    if (!Number.isSafeInteger(total))
      return void 0;
  }
  return total;
}
function messageRoute(message) {
  const { provider, model } = message.source;
  return provider.length > 0 && model.length > 0 ? { provider, model } : void 0;
}
function streamUsage(stream) {
  for (let index = stream.length - 1; index >= 0; index--) {
    const record = stream[index];
    if (record?.type === "chunk" && record.chunk.type === "usage")
      return record.chunk.usage;
  }
  return void 0;
}
function normalizeUsage(usage, route) {
  const { inputTokens, outputTokens, cacheReadTokens, cacheWriteTokens, reasoningTokens, totalTokens } = usage;
  if (!isCount(inputTokens) || !isCount(outputTokens))
    return void 0;
  if (cacheReadTokens !== void 0 && !isCount(cacheReadTokens))
    return void 0;
  if (cacheWriteTokens !== void 0 && !isCount(cacheWriteTokens))
    return void 0;
  if (reasoningTokens !== void 0 && (!isCount(reasoningTokens) || reasoningTokens > outputTokens)) {
    return void 0;
  }
  const knownPrompt = safeSum([
    inputTokens,
    ...cacheReadTokens === void 0 ? [] : [cacheReadTokens],
    ...cacheWriteTokens === void 0 ? [] : [cacheWriteTokens]
  ]);
  if (knownPrompt === void 0)
    return void 0;
  let exactTotal;
  if (totalTokens !== void 0) {
    if (!isCount(totalTokens))
      return void 0;
    const exactPrompt = totalTokens - outputTokens;
    if (!isCount(exactPrompt) || exactPrompt < knownPrompt)
      return void 0;
    if (cacheReadTokens !== void 0 && cacheWriteTokens !== void 0 && exactPrompt !== knownPrompt) {
      return void 0;
    }
    exactTotal = totalTokens;
  } else {
    if (cacheReadTokens === void 0 || cacheWriteTokens === void 0)
      return void 0;
    const derivedTotal = safeSum([knownPrompt, outputTokens]);
    if (derivedTotal === void 0)
      return void 0;
    exactTotal = derivedTotal;
  }
  return {
    inputTokens,
    outputTokens,
    totalTokens: exactTotal,
    ...cacheReadTokens === void 0 ? {} : { cacheReadTokens },
    ...cacheWriteTokens === void 0 ? {} : { cacheWriteTokens },
    ...reasoningTokens === void 0 ? {} : { reasoningTokens },
    ...route === void 0 ? {} : { route }
  };
}
function aggregateAttempts(attempts) {
  if (attempts.length === 0)
    return void 0;
  const inputTokens = safeSum(attempts.map((attempt) => attempt.inputTokens));
  const outputTokens = safeSum(attempts.map((attempt) => attempt.outputTokens));
  const totalTokens = safeSum(attempts.map((attempt) => attempt.totalTokens));
  if (inputTokens === void 0 || outputTokens === void 0 || totalTokens === void 0)
    return void 0;
  const cacheRead = attempts.map((attempt) => attempt.cacheReadTokens);
  const cacheWrite = attempts.map((attempt) => attempt.cacheWriteTokens);
  const reasoning = attempts.map((attempt) => attempt.reasoningTokens);
  const cacheReadTokens = cacheRead.every(isCount) ? safeSum(cacheRead) : void 0;
  const cacheWriteTokens = cacheWrite.every(isCount) ? safeSum(cacheWrite) : void 0;
  const reasoningTokens = reasoning.every(isCount) ? safeSum(reasoning) : void 0;
  let routes;
  const attributed = attempts.map((attempt) => attempt.route);
  if (attributed.every((route) => route !== void 0)) {
    const unique = /* @__PURE__ */ new Map();
    for (const route of attributed)
      unique.set(`${route.provider}\0${route.model}`, route);
    routes = [...unique.values()];
  }
  return {
    uncachedInputTokens: inputTokens,
    outputTokens,
    totalTokens,
    ...cacheReadTokens === void 0 ? {} : { cacheReadTokens },
    ...cacheWriteTokens === void 0 ? {} : { cacheWriteTokens },
    ...reasoningTokens === void 0 ? {} : { reasoningTokens },
    ...routes === void 0 ? {} : { routes }
  };
}
function sameAttempt(state, turn, step) {
  return state.turn === turn && state.step === step;
}
function deriveTurnTokenUsage(events) {
  let state = { kind: "idle" };
  const attempts = [];
  let turn;
  let sawEnd = false;
  let invalid = false;
  const closeOpen = (route) => {
    if (state.kind !== "open" || state.sample === void 0)
      return false;
    const normalized = normalizeUsage(state.sample, route);
    if (normalized === void 0)
      return false;
    attempts.push(normalized);
    return true;
  };
  for (const event of events) {
    if (invalid)
      break;
    if (event.type === "turn/start") {
      if (turn !== void 0 || state.kind !== "idle")
        invalid = true;
      else
        turn = event.data.turn;
      continue;
    }
    if (turn === void 0) {
      invalid = true;
      break;
    }
    if (event.type === "turn/end") {
      if (event.data.turn !== turn || state.kind !== "idle" || sawEnd)
        invalid = true;
      else
        sawEnd = true;
      continue;
    }
    if (sawEnd) {
      invalid = true;
      break;
    }
    if (event.type === "step/start") {
      if (event.data.turn !== turn || state.kind !== "idle")
        invalid = true;
      else
        state = { kind: "open", turn, step: event.data.step };
      continue;
    }
    if (event.type === "llm/retry-started") {
      if (event.data.turn !== turn || state.kind !== "settled" || state.by !== "retry" || !sameAttempt(state, event.data.turn, event.data.step))
        invalid = true;
      else
        state = { kind: "open", turn, step: event.data.step };
      continue;
    }
    if (event.type === "assistant/attempt") {
      if (event.data.turn !== turn || state.kind !== "open" || !sameAttempt(state, event.data.turn, event.data.step)) {
        invalid = true;
        continue;
      }
      const sample = streamUsage(event.data.stream) ?? state.sample;
      state = { kind: "open", turn, step: event.data.step, ...sample === void 0 ? {} : { sample } };
      if (!closeOpen())
        invalid = true;
      else
        state = { kind: "finishClosed", turn, step: event.data.step };
      continue;
    }
    if (event.type === "assistant/message") {
      if (event.data.turn !== turn || state.kind !== "open" || !sameAttempt(state, event.data.turn, event.data.step)) {
        invalid = true;
        continue;
      }
      const sample = event.data.usage ?? streamUsage(event.data.stream);
      if (sample !== void 0)
        state = { ...state, sample };
      if (!closeOpen(messageRoute(event.data.message)))
        invalid = true;
      else
        state = { kind: "settled", turn, step: event.data.step, by: "message" };
      continue;
    }
    if (event.type === "llm/retry") {
      if (event.data.turn !== turn || state.kind === "idle" || !sameAttempt(state, event.data.turn, event.data.step)) {
        invalid = true;
        continue;
      }
      if (state.kind === "settled" || state.kind === "open" && state.sample !== void 0 && !closeOpen())
        invalid = true;
      if (!invalid)
        state = { kind: "settled", turn, step: event.data.step, by: "retry" };
      continue;
    }
    if (event.type === "step/end") {
      if (event.data.turn !== turn || state.kind === "idle" || !sameAttempt(state, event.data.turn, event.data.step)) {
        invalid = true;
        continue;
      }
      if (state.kind === "open" && !closeOpen())
        invalid = true;
      if (!invalid)
        state = { kind: "idle" };
    }
  }
  return invalid || !sawEnd || state.kind !== "idle" ? void 0 : aggregateAttempts(attempts);
}

// lib/types/fold.js
function foldUsageSession(header, events, inheritedEventCount) {
  const titled = events.findLast((event) => event.type === "session/title");
  const title = titled?.type === "session/title" ? titled.data.title : header.cwd?.split(/[\\/]/).at(-1) || header.id;
  let lastAt = 0;
  let missingTurns = 0;
  let turn = [];
  const records = [];
  const issues = [];
  for (let index = inheritedEventCount; index < events.length; index++) {
    const event = events[index];
    if (event === void 0)
      continue;
    if (event.type === "user/message" || event.type === "assistant/message" || event.type === "turn/end") {
      lastAt = Math.max(lastAt, event.time);
    }
    if (event.type === "turn/start") {
      if (turn.length > 0) {
        missingTurns++;
        issues.push({ kind: "missing-turn", sessionId: header.id, title, at: event.time });
      }
      turn = [event];
    } else if (turn.length > 0)
      turn.push(event);
    if (event.type !== "turn/end" || turn.length === 0)
      continue;
    const usage = deriveTurnTokenUsage(turn);
    if (usage === void 0) {
      missingTurns++;
      issues.push({ kind: "missing-turn", sessionId: header.id, title, at: event.time });
    } else {
      const route = usage.routes?.length === 1 ? usage.routes[0] : void 0;
      records.push({
        sessionId: header.id,
        at: event.time,
        inputTokens: usage.uncachedInputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
        ...usage.cacheReadTokens === void 0 ? {} : { cacheReadTokens: usage.cacheReadTokens },
        ...usage.cacheWriteTokens === void 0 ? {} : { cacheWriteTokens: usage.cacheWriteTokens },
        ...route === void 0 ? {} : { provider: route.provider, model: route.model }
      });
      if (route === void 0) {
        issues.push({ kind: "unattributed-turn", sessionId: header.id, title, at: event.time });
      }
    }
    turn = [];
  }
  return { session: { id: header.id, title, lastAt, missingTurns }, records, issues };
}

// lib/types/project.js
var CASE_INSENSITIVE = process.platform === "win32" || process.platform === "darwin";
function normalizePath(path) {
  const unified = path.replace(/\\/g, "/").replace(/\/+$/, "");
  return CASE_INSENSITIVE ? unified.toLowerCase() : unified;
}
function createWorkspaceMatcher(workspaces) {
  const roots = workspaces.map(({ id, path }) => ({ id, root: normalizePath(path) })).filter(({ root }) => root.length > 0).sort((a, b) => b.root.length - a.root.length);
  return (cwd) => {
    const path = normalizePath(cwd);
    return roots.find(({ root }) => path === root || path.startsWith(`${root}/`))?.id;
  };
}
function withProject(value, projectId) {
  return projectId === void 0 ? value : { ...value, projectId };
}

// lib/types/index.js
var __runInitializers = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var __esDecorate = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var UsageStatistics = (() => {
  let _classSuper = TypertRemoteService;
  let _instanceExtraInitializers = [];
  let _progress_decorators;
  let _snapshot_decorators;
  return class UsageStatistics extends _classSuper {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _progress_decorators = [Remote("progress")];
      _snapshot_decorators = [Remote("snapshot")];
      __esDecorate(this, null, _progress_decorators, { kind: "method", name: "progress", static: false, private: false, access: { has: (obj) => "progress" in obj, get: (obj) => obj.progress }, metadata: _metadata }, null, _instanceExtraInitializers);
      __esDecorate(this, null, _snapshot_decorators, { kind: "method", name: "snapshot", static: false, private: false, access: { has: (obj) => "snapshot" in obj, get: (obj) => obj.snapshot }, metadata: _metadata }, null, _instanceExtraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    }
    static inject = ["typert", "sessionQuery", "workspaceRegistry"];
    readConcurrency = __runInitializers(this, _instanceExtraInitializers);
    folds = /* @__PURE__ */ new Map();
    progressState = { completed: 0, total: 0, running: false };
    generation = 0;
    /** @param ctx - Host services owning sessions and workspaces. @param config - cold read concurrency. */
    constructor(ctx, config = {}) {
      super(ctx, "usageStatistics", { namespace: "usageStatistics" });
      this.readConcurrency = config.readConcurrency ?? 4;
      if (!Number.isSafeInteger(this.readConcurrency) || this.readConcurrency < 1 || this.readConcurrency > 16) {
        throw new Error("ui-usage: readConcurrency must be an integer from 1 to 16");
      }
    }
    /** Read the current observation's progress. @returns processed and total session counts. */
    progress() {
      return this.progressState;
    }
    /**
     * Read provider-reported token totals for completed turns in each logical session.
     * Fork-inherited events are excluded so they are counted only in their source session.
     * @param force - recompute every session even when its current process revision matches.
     * @returns session, project, token, and quality facts for the dashboard.
     */
    async snapshot(force) {
      const workspaces = this.ctx.workspaceRegistry.list();
      const projects = workspaces.map(({ id, title }) => ({ id, title }));
      const workspaceFor = createWorkspaceMatcher(workspaces);
      const persistence = this.ctx.get("sessionPersistence");
      const [headers, persisted] = await Promise.all([
        this.ctx.sessionQuery.listSessions(),
        persistence?.list() ?? Promise.resolve([])
      ]);
      const generation = ++this.generation;
      this.progressState = { completed: 0, total: headers.length, running: true };
      const completeOne = () => {
        if (this.generation !== generation)
          return;
        this.progressState = { ...this.progressState, completed: this.progressState.completed + 1 };
      };
      const persistedById = new Map(persisted.map((item) => [item.header.id, item]));
      const byId = new Map(headers.map(({ header }) => [header.id, header]));
      const projectFor = (id) => {
        let header = byId.get(id);
        const visited = /* @__PURE__ */ new Set();
        while (header !== void 0 && !visited.has(header.id)) {
          visited.add(header.id);
          if (header.cwd !== void 0) {
            const projectId = workspaceFor(header.cwd);
            if (projectId !== void 0)
              return projectId;
          }
          header = header.parentSession === void 0 ? void 0 : byId.get(header.parentSession);
        }
        return void 0;
      };
      const results = new Array(headers.length);
      let cursor = 0;
      const readNext = async () => {
        for (; ; ) {
          const index = cursor++;
          const entry = headers[index];
          if (entry === void 0)
            return;
          const { header } = entry;
          const live = this.ctx.get("sessions")?.get(header.id);
          const stored = persistedById.get(header.id);
          const cached = force ? void 0 : this.folds.get(header.id);
          if (cached?.source === "live" && live === cached.owner && live.seq === cached.seq) {
            results[index] = { value: cached.value };
            completeOne();
            continue;
          }
          if (cached?.source === "persisted" && live === void 0 && persistence?.identity === cached.persistence && stored?.revision === cached.revision) {
            results[index] = { value: cached.value };
            completeOne();
            continue;
          }
          try {
            const observation = await this.ctx.sessionQuery.observeSession(header.id, { projectionMode: "none" });
            try {
              const value = foldUsageSession(observation.header, observation.events, observation.inheritedEventCount);
              results[index] = { value };
              if (observation.source === "live") {
                const owner = this.ctx.get("sessions")?.get(header.id);
                if (owner !== void 0 && owner.seq === observation.cursor + 1) {
                  this.folds.set(header.id, { source: "live", owner, seq: owner.seq, value });
                } else
                  this.folds.delete(header.id);
              } else if (persistence !== void 0 && observation.revision !== void 0) {
                this.folds.set(header.id, {
                  source: "persisted",
                  persistence: persistence.identity,
                  revision: observation.revision,
                  value
                });
              }
            } finally {
              observation[Symbol.dispose]();
            }
          } catch (_unreadableSession) {
            this.folds.delete(header.id);
            results[index] = { issue: {
              kind: "unreadable-session",
              sessionId: header.id,
              title: header.cwd?.split(/[\\/]/).at(-1) || header.id
            } };
          }
          completeOne();
        }
      };
      await Promise.all(Array.from({ length: Math.min(this.readConcurrency, headers.length) }, () => readNext()));
      if (this.generation === generation)
        this.progressState = { ...this.progressState, running: false };
      const presentIds = new Set(headers.map((item) => item.header.id));
      for (const id of this.folds.keys())
        if (!presentIds.has(id))
          this.folds.delete(id);
      const sessions = [];
      const records = [];
      const issues = [];
      for (const result of results) {
        if (result === void 0)
          continue;
        if ("issue" in result) {
          issues.push(withProject(result.issue, projectFor(result.issue.sessionId)));
          continue;
        }
        const { session, records: ownRecords, issues: ownIssues } = result.value;
        const projectId = projectFor(session.id);
        sessions.push(withProject(session, projectId));
        records.push(...ownRecords);
        issues.push(...ownIssues.map((issue) => withProject(issue, projectId)));
      }
      return {
        capturedAt: Date.now(),
        projects,
        sessions,
        records,
        issues,
        unreadableSessions: issues.filter((issue) => issue.kind === "unreadable-session").length
      };
    }
  };
})();
var index_default = UsageStatistics;
export {
  index_default as default
};
