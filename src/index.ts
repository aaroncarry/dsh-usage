/** Host Remote for the desktop token usage dashboard. */
import type { Context } from '@deepseek-ai/cordis'
import type { Session } from '@deepseek-ai/dsh-session'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import type {} from '@deepseek-ai/dsh-session-query'
import type {} from '@deepseek-ai/dsh-session-persistence'
import type {} from '@deepseek-ai/dsh-workspace'
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'
import type { UsageIssue, UsageProgress, UsageProject, UsageRecord, UsageSession, UsageSnapshot } from './types.ts'
import { foldUsageSession, type FoldedUsageSession } from './fold.ts'

export type * from './types.ts'

/** Read pressure for cold session logs; configurable in cordis.yml. */
export interface Config {
  /** Maximum number of session logs read at once. Defaults to 4. */
  readConcurrency?: number
}

type CachedFold =
  | { readonly source: 'live'; readonly owner: Session; readonly seq: number; readonly value: FoldedUsageSession }
  | { readonly source: 'persisted'; readonly persistence: symbol; readonly revision: string; readonly value: FoldedUsageSession }

declare module '@deepseek-ai/cordis' {
  interface Context {
    /** Cross-session token usage observation for the desktop. */
    usageStatistics: UsageStatistics
  }
}

/** Reads complete, live-preferred logs without activating their agents. */
export default class UsageStatistics extends TypertRemoteService {
  static inject = ['typert', 'sessionQuery', 'workspaceRegistry']
  private readonly readConcurrency: number
  private readonly folds = new Map<SessionId, CachedFold>()
  private progressState: UsageProgress = { completed: 0, total: 0, running: false }
  private generation = 0

  /** @param ctx - Host services owning sessions and workspaces. @param config - cold read concurrency. */
  constructor(ctx: Context, config: Config = {}) {
    super(ctx, 'usageStatistics', { namespace: 'usageStatistics' })
    this.readConcurrency = config.readConcurrency ?? 4
    if (!Number.isSafeInteger(this.readConcurrency) || this.readConcurrency < 1 || this.readConcurrency > 16) {
      throw new Error('ui-usage: readConcurrency must be an integer from 1 to 16')
    }
  }

  /** Read the current observation's progress. @returns processed and total session counts. */
  @Remote('progress')
  progress(): UsageProgress { return this.progressState }

  /**
   * Read provider-reported token totals for completed turns in each logical session.
   * Fork-inherited events are excluded so they are counted only in their source session.
   * @param force - recompute every session even when its current process revision matches.
   * @returns session, project, token, and quality facts for the dashboard.
   */
  @Remote('snapshot')
  async snapshot(force: boolean): Promise<UsageSnapshot> {
    const workspaces = this.ctx.workspaceRegistry.list()
    const projects: UsageProject[] = workspaces.map(({ id, title }) => ({ id, title }))
    const workspaceByPath = new Map(workspaces.map(({ id, path }) => [path, id]))
    const persistence = this.ctx.get('sessionPersistence')
    const [headers, persisted] = await Promise.all([
      this.ctx.sessionQuery.listSessions(),
      persistence?.list() ?? Promise.resolve([]),
    ])
    const generation = ++this.generation
    this.progressState = { completed: 0, total: headers.length, running: true }
    const completeOne = (): void => {
      if (this.generation !== generation) return
      this.progressState = { ...this.progressState, completed: this.progressState.completed + 1 }
    }
    const persistedById = new Map(persisted.map(item => [item.header.id, item]))
    const byId = new Map(headers.map(({ header }) => [header.id, header]))
    const projectFor = (id: SessionId): string | undefined => {
      let header = byId.get(id)
      const visited = new Set<SessionId>()
      while (header !== undefined && !visited.has(header.id)) {
        visited.add(header.id)
        if (header.cwd !== undefined) {
          const projectId = workspaceByPath.get(header.cwd)
          if (projectId !== undefined) return projectId
        }
        header = header.parentSession === undefined ? undefined : byId.get(header.parentSession)
      }
      return undefined
    }
    const results: ({ value: FoldedUsageSession } | { issue: UsageIssue } | undefined)[] = new Array(headers.length)
    let cursor = 0
    const readNext = async (): Promise<void> => {
      for (;;) {
        const index = cursor++
        const entry = headers[index]
        if (entry === undefined) return
        const { header } = entry
        const live = this.ctx.get('sessions')?.get(header.id)
        const stored = persistedById.get(header.id)
        const cached = force ? undefined : this.folds.get(header.id)
        if (cached?.source === 'live' && live === cached.owner && live.seq === cached.seq) {
          results[index] = { value: cached.value }
          completeOne()
          continue
        }
        if (cached?.source === 'persisted' && live === undefined && persistence?.identity === cached.persistence
          && stored?.revision === cached.revision) {
          results[index] = { value: cached.value }
          completeOne()
          continue
        }
        try {
          const observation = await this.ctx.sessionQuery.observeSession(header.id, { projectionMode: 'none' })
          try {
            const value = foldUsageSession(observation.header, observation.events, observation.inheritedEventCount)
            results[index] = { value }
            if (observation.source === 'live') {
              const owner = this.ctx.get('sessions')?.get(header.id)
              if (owner !== undefined && owner.seq === observation.cursor + 1) {
                this.folds.set(header.id, { source: 'live', owner, seq: owner.seq, value })
              } else this.folds.delete(header.id)
            } else if (persistence !== undefined && observation.revision !== undefined) {
              this.folds.set(header.id, {
                source: 'persisted', persistence: persistence.identity,
                revision: observation.revision, value,
              })
            }
          } finally {
            observation[Symbol.dispose]()
          }
        } catch (_unreadableSession) {
          this.folds.delete(header.id)
          results[index] = { issue: {
            kind: 'unreadable-session', sessionId: header.id,
            title: header.cwd?.split(/[\\/]/).at(-1) || header.id,
          } }
        }
        completeOne()
      }
    }
    await Promise.all(Array.from({ length: Math.min(this.readConcurrency, headers.length) }, () => readNext()))
    if (this.generation === generation) this.progressState = { ...this.progressState, running: false }
    const presentIds = new Set(headers.map(item => item.header.id))
    for (const id of this.folds.keys()) if (!presentIds.has(id)) this.folds.delete(id)
    const sessions: UsageSession[] = []
    const records: UsageRecord[] = []
    const issues: UsageIssue[] = []
    for (const result of results) {
      if (result === undefined) continue
      if ('issue' in result) {
        const projectId = projectFor(result.issue.sessionId)
        issues.push({ ...result.issue, ...(projectId === undefined ? {} : { projectId }) })
        continue
      }
      const { session, records: ownRecords, issues: ownIssues } = result.value
      const projectId = projectFor(session.id)
      sessions.push({ ...session, ...(projectId === undefined ? {} : { projectId }) })
      records.push(...ownRecords)
      issues.push(...ownIssues.map(issue => ({ ...issue, ...(projectId === undefined ? {} : { projectId }) })))
    }
    return {
      capturedAt: Date.now(), projects, sessions, records, issues,
      unreadableSessions: issues.filter(issue => issue.kind === 'unreadable-session').length,
    }
  }
}
