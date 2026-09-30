import type { UsageIssue, UsageRecord, UsageSession, UsageSnapshot } from '@deepseek-ai/dsh-client-ui-usage/types';
export type Period = 1 | 7 | 30 | 90 | 365;
export type SessionMode = 'high' | 'recent';
export type Rank = {
    name: string;
    total: number;
};
/** User-selected scope of the dashboard. */
export interface Filters {
    readonly period: Period;
    readonly selectedDay: number | undefined;
    readonly project: string;
    readonly model: string;
    readonly trendModel: string;
    readonly efficiencyModel: string;
    readonly sessionMode: SessionMode;
}
/** One ranked session with its period total and dominant route. */
export interface RankedSession {
    readonly session: UsageSession;
    readonly total: number;
    readonly route: string;
}
/** Local-calendar midnight of the day containing `time`. */
export declare function dayStart(time: number): number;
/** Move a local-calendar midnight by whole days, honoring DST. */
export declare function shiftDay(time: number, days: number): number;
/** Prompt-side tokens of one record: uncached, cache read, and cache write input. */
export declare function inputOf(record: UsageRecord): number;
/** Sum total tokens per key, largest first. */
export declare function grouped(records: readonly UsageRecord[], getName: (record: UsageRecord) => string): Rank[];
/** Cache-read share of input in percent; undefined unless every record reports cache reads. */
export declare function cacheRatePercent(records: readonly UsageRecord[]): number | undefined;
/**
 * Consecutive active days inside `[first, last]`.
 * @param days - local-calendar midnights with usage.
 * @param first - first day of the range.
 * @param last - last day of the range.
 * @returns longest run in the range and the run ending at `last` (or the day before it).
 */
export declare function streaks(days: Iterable<number>, first: number, last: number): {
    current: number;
    longest: number;
};
/**
 * Derive every figure shown by the dashboard from one Host observation.
 * @param snapshot - complete Host observation.
 * @param filters - period, day, project, model, and ranking selections.
 * @param unknown - localized label for unattributed values.
 * @returns immutable view model; recompute only when an input changes.
 */
export declare function deriveDashboard(snapshot: UsageSnapshot, filters: Filters, unknown: string): {
    today: number;
    anchor: number;
    daysInView: Period;
    start: number;
    end: number;
    projectById: Map<string, string>;
    models: string[];
    scoped: readonly UsageRecord[];
    selected: UsageRecord[];
    trendModels: string[];
    activeTrendModel: string;
    trendRecords: UsageRecord[];
    activeEfficiencyModel: string;
    efficiencyRecords: UsageRecord[];
    total: number;
    prior: number;
    peak: number;
    priorPeak: number;
    activeDays: number;
    priorActiveDays: number;
    cacheRate: number | undefined;
    cacheRateDelta: number | undefined;
    qualityIssues: UsageIssue[];
    unreadable: number;
    missing: number;
    unattributed: number;
    completedTurns: number;
    averageInputPerTurn: number | undefined;
    efficiencyCacheShare: number | undefined;
    coverage: number | undefined;
    composition: {
        uncached: number;
        cacheRead: number;
        cacheWrite: number;
        output: number;
        other: number;
    };
    modelRows: Rank[];
    providerRows: Rank[];
    projectRows: Rank[];
    heatYears: number[];
    sessions: RankedSession[];
};
//# sourceMappingURL=derive.d.ts.map