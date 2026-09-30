/** Browser-safe facts for the token usage dashboard. */
import type { SessionId } from '@deepseek-ai/dsh-session/types';
/** Provider-reported usage for a completed turn in one session. */
export interface UsageRecord {
    readonly sessionId: SessionId;
    readonly at: number;
    readonly inputTokens: number;
    readonly outputTokens: number;
    readonly totalTokens: number;
    readonly cacheReadTokens?: number;
    readonly cacheWriteTokens?: number;
    readonly provider?: string;
    readonly model?: string;
}
/** Session metadata used by rankings and navigation. */
export interface UsageSession {
    readonly id: SessionId;
    readonly title: string;
    readonly projectId?: string;
    readonly lastAt: number;
    readonly missingTurns: number;
}
/** One incomplete or unattributed observation linked to its source session. */
export interface UsageIssue {
    readonly kind: 'unreadable-session' | 'missing-turn' | 'unattributed-turn';
    readonly sessionId: SessionId;
    readonly title: string;
    readonly projectId?: string;
    readonly at?: number;
}
/** Workspace metadata used by the project filter. */
export interface UsageProject {
    readonly id: string;
    readonly title: string;
}
/** One complete Host observation of the readable session corpus. */
export interface UsageSnapshot {
    readonly capturedAt: number;
    readonly projects: readonly UsageProject[];
    readonly sessions: readonly UsageSession[];
    readonly records: readonly UsageRecord[];
    readonly issues: readonly UsageIssue[];
    /** Sessions whose log could not be read; their usage is unknown. */
    readonly unreadableSessions: number;
}
/** Progress of the current Host observation, including reused sessions. */
export interface UsageProgress {
    readonly completed: number;
    readonly total: number;
    readonly running: boolean;
}
//# sourceMappingURL=types.d.ts.map