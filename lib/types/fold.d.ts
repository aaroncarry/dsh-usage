/** Exact usage and data-quality facts from one observed Session. */
import type { SessionEvent, SessionHeader } from '@deepseek-ai/dsh-session/types';
import type { UsageIssue, UsageRecord, UsageSession } from './types.ts';
/** Reusable facts that do not depend on registered Workspace names. */
export interface FoldedUsageSession {
    readonly session: UsageSession;
    readonly records: readonly UsageRecord[];
    readonly issues: readonly UsageIssue[];
}
/**
 * Fold one immutable live or prepared Session observation.
 * @param header - observed Session metadata.
 * @param events - complete events from the same observation.
 * @param inheritedEventCount - events inherited from a fork parent.
 * @returns owned turn usage, display metadata, and quality issues.
 */
export declare function foldUsageSession(header: SessionHeader, events: readonly SessionEvent[], inheritedEventCount: number): FoldedUsageSession;
//# sourceMappingURL=fold.d.ts.map