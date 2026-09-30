/** Host Remote for the desktop token usage dashboard. */
import type { Context } from '@deepseek-ai/cordis';
import { TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import type { UsageProgress, UsageSnapshot } from './types.ts';
export type * from './types.ts';
/** Read pressure for cold session logs; configurable in cordis.yml. */
export interface Config {
    /** Maximum number of session logs read at once. Defaults to 4. */
    readConcurrency?: number;
}
declare module '@deepseek-ai/cordis' {
    interface Context {
        /** Cross-session token usage observation for the desktop. */
        usageStatistics: UsageStatistics;
    }
}
/** Reads complete, live-preferred logs without activating their agents. */
export default class UsageStatistics extends TypertRemoteService {
    static inject: string[];
    private readonly readConcurrency;
    private readonly folds;
    private progressState;
    private generation;
    /** @param ctx - Host services owning sessions and workspaces. @param config - cold read concurrency. */
    constructor(ctx: Context, config?: Config);
    /** Read the current observation's progress. @returns processed and total session counts. */
    progress(): UsageProgress;
    /**
     * Read provider-reported token totals for completed turns in each logical session.
     * Fork-inherited events are excluded so they are counted only in their source session.
     * @param force - recompute every session even when its current process revision matches.
     * @returns session, project, token, and quality facts for the dashboard.
     */
    snapshot(force: boolean): Promise<UsageSnapshot>;
}
//# sourceMappingURL=index.d.ts.map