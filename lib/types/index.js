var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import { foldUsageSession } from "./fold.js";
let UsageStatistics = (() => {
    let _classSuper = TypertRemoteService;
    let _instanceExtraInitializers = [];
    let _progress_decorators;
    let _snapshot_decorators;
    return class UsageStatistics extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _progress_decorators = [Remote('progress')];
            _snapshot_decorators = [Remote('snapshot')];
            __esDecorate(this, null, _progress_decorators, { kind: "method", name: "progress", static: false, private: false, access: { has: obj => "progress" in obj, get: obj => obj.progress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _snapshot_decorators, { kind: "method", name: "snapshot", static: false, private: false, access: { has: obj => "snapshot" in obj, get: obj => obj.snapshot }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static inject = ['typert', 'sessionQuery', 'workspaceRegistry'];
        readConcurrency = __runInitializers(this, _instanceExtraInitializers);
        folds = new Map();
        progressState = { completed: 0, total: 0, running: false };
        generation = 0;
        /** @param ctx - Host services owning sessions and workspaces. @param config - cold read concurrency. */
        constructor(ctx, config = {}) {
            super(ctx, 'usageStatistics', { namespace: 'usageStatistics' });
            this.readConcurrency = config.readConcurrency ?? 4;
            if (!Number.isSafeInteger(this.readConcurrency) || this.readConcurrency < 1 || this.readConcurrency > 16) {
                throw new Error('ui-usage: readConcurrency must be an integer from 1 to 16');
            }
        }
        /** Read the current observation's progress. @returns processed and total session counts. */
        progress() { return this.progressState; }
        /**
         * Read provider-reported token totals for completed turns in each logical session.
         * Fork-inherited events are excluded so they are counted only in their source session.
         * @param force - recompute every session even when its current process revision matches.
         * @returns session, project, token, and quality facts for the dashboard.
         */
        async snapshot(force) {
            const workspaces = this.ctx.workspaceRegistry.list();
            const projects = workspaces.map(({ id, title }) => ({ id, title }));
            const workspaceByPath = new Map(workspaces.map(({ id, path }) => [path, id]));
            const persistence = this.ctx.get('sessionPersistence');
            const [headers, persisted] = await Promise.all([
                this.ctx.sessionQuery.listSessions(),
                persistence?.list() ?? Promise.resolve([]),
            ]);
            const generation = ++this.generation;
            this.progressState = { completed: 0, total: headers.length, running: true };
            const completeOne = () => {
                if (this.generation !== generation)
                    return;
                this.progressState = { ...this.progressState, completed: this.progressState.completed + 1 };
            };
            const persistedById = new Map(persisted.map(item => [item.header.id, item]));
            const byId = new Map(headers.map(({ header }) => [header.id, header]));
            const projectFor = (id) => {
                let header = byId.get(id);
                const visited = new Set();
                while (header !== undefined && !visited.has(header.id)) {
                    visited.add(header.id);
                    if (header.cwd !== undefined) {
                        const projectId = workspaceByPath.get(header.cwd);
                        if (projectId !== undefined)
                            return projectId;
                    }
                    header = header.parentSession === undefined ? undefined : byId.get(header.parentSession);
                }
                return undefined;
            };
            const results = new Array(headers.length);
            let cursor = 0;
            const readNext = async () => {
                for (;;) {
                    const index = cursor++;
                    const entry = headers[index];
                    if (entry === undefined)
                        return;
                    const { header } = entry;
                    const live = this.ctx.get('sessions')?.get(header.id);
                    const stored = persistedById.get(header.id);
                    const cached = force ? undefined : this.folds.get(header.id);
                    if (cached?.source === 'live' && live === cached.owner && live.seq === cached.seq) {
                        results[index] = { value: cached.value };
                        completeOne();
                        continue;
                    }
                    if (cached?.source === 'persisted' && live === undefined && persistence?.identity === cached.persistence
                        && stored?.revision === cached.revision) {
                        results[index] = { value: cached.value };
                        completeOne();
                        continue;
                    }
                    try {
                        const observation = await this.ctx.sessionQuery.observeSession(header.id, { projectionMode: 'none' });
                        try {
                            const value = foldUsageSession(observation.header, observation.events, observation.inheritedEventCount);
                            results[index] = { value };
                            if (observation.source === 'live') {
                                const owner = this.ctx.get('sessions')?.get(header.id);
                                if (owner !== undefined && owner.seq === observation.cursor + 1) {
                                    this.folds.set(header.id, { source: 'live', owner, seq: owner.seq, value });
                                }
                                else
                                    this.folds.delete(header.id);
                            }
                            else if (persistence !== undefined && observation.revision !== undefined) {
                                this.folds.set(header.id, {
                                    source: 'persisted', persistence: persistence.identity,
                                    revision: observation.revision, value,
                                });
                            }
                        }
                        finally {
                            observation[Symbol.dispose]();
                        }
                    }
                    catch (_unreadableSession) {
                        this.folds.delete(header.id);
                        results[index] = { issue: {
                                kind: 'unreadable-session', sessionId: header.id,
                                title: header.cwd?.split(/[\\/]/).at(-1) || header.id,
                            } };
                    }
                    completeOne();
                }
            };
            await Promise.all(Array.from({ length: Math.min(this.readConcurrency, headers.length) }, () => readNext()));
            if (this.generation === generation)
                this.progressState = { ...this.progressState, running: false };
            const presentIds = new Set(headers.map(item => item.header.id));
            for (const id of this.folds.keys())
                if (!presentIds.has(id))
                    this.folds.delete(id);
            const sessions = [];
            const records = [];
            const issues = [];
            for (const result of results) {
                if (result === undefined)
                    continue;
                if ('issue' in result) {
                    const projectId = projectFor(result.issue.sessionId);
                    issues.push({ ...result.issue, ...(projectId === undefined ? {} : { projectId }) });
                    continue;
                }
                const { session, records: ownRecords, issues: ownIssues } = result.value;
                const projectId = projectFor(session.id);
                sessions.push({ ...session, ...(projectId === undefined ? {} : { projectId }) });
                records.push(...ownRecords);
                issues.push(...ownIssues.map(issue => ({ ...issue, ...(projectId === undefined ? {} : { projectId }) })));
            }
            return {
                capturedAt: Date.now(), projects, sessions, records, issues,
                unreadableSessions: issues.filter(issue => issue.kind === 'unreadable-session').length,
            };
        }
    };
})();
/** Reads complete, live-preferred logs without activating their agents. */
export default UsageStatistics;
//# sourceMappingURL=index.js.map