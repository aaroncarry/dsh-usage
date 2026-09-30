/** Exact usage and data-quality facts from one observed Session. */
import type { SessionEvent, SessionHeader } from '@deepseek-ai/dsh-session/types'
import type { UsageIssue, UsageRecord, UsageSession } from './types.ts'
import { deriveTurnTokenUsage } from './turn-usage.ts'

/** Reusable facts that do not depend on registered Workspace names. */
export interface FoldedUsageSession {
  readonly session: UsageSession
  readonly records: readonly UsageRecord[]
  readonly issues: readonly UsageIssue[]
}

/**
 * Fold one immutable live or prepared Session observation.
 * @param header - observed Session metadata.
 * @param events - complete events from the same observation.
 * @param inheritedEventCount - events inherited from a fork parent.
 * @returns owned turn usage, display metadata, and quality issues.
 */
export function foldUsageSession(
  header: SessionHeader,
  events: readonly SessionEvent[],
  inheritedEventCount: number,
): FoldedUsageSession {
  const titled = events.findLast(event => event.type === 'session/title')
  const title = titled?.type === 'session/title'
    ? titled.data.title
    : header.cwd?.split(/[\\/]/).at(-1) || header.id
  let lastAt = 0
  let missingTurns = 0
  let turn: SessionEvent[] = []
  const records: UsageRecord[] = []
  const issues: UsageIssue[] = []
  for (let index = inheritedEventCount; index < events.length; index++) {
    const event = events[index]
    if (event === undefined) continue
    if (event.type === 'user/message' || event.type === 'assistant/message' || event.type === 'turn/end') {
      lastAt = Math.max(lastAt, event.time)
    }
    if (event.type === 'turn/start') turn = [event]
    else if (turn.length > 0) turn.push(event)
    if (event.type !== 'turn/end' || turn.length === 0) continue
    const usage = deriveTurnTokenUsage(turn)
    if (usage === undefined) {
      missingTurns++
      issues.push({ kind: 'missing-turn', sessionId: header.id, title, at: event.time })
    } else {
      const route = usage.routes?.length === 1 ? usage.routes[0] : undefined
      records.push({
        sessionId: header.id,
        at: event.time,
        inputTokens: usage.uncachedInputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
        ...(usage.cacheReadTokens === undefined ? {} : { cacheReadTokens: usage.cacheReadTokens }),
        ...(usage.cacheWriteTokens === undefined ? {} : { cacheWriteTokens: usage.cacheWriteTokens }),
        ...(route === undefined ? {} : { provider: route.provider, model: route.model }),
      })
      if (route === undefined) {
        issues.push({ kind: 'unattributed-turn', sessionId: header.id, title, at: event.time })
      }
    }
    turn = []
  }
  return { session: { id: header.id, title, lastAt, missingTurns }, records, issues }
}
