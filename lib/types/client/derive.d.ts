import type { UsageIssue, UsageRecord, UsageSession, UsageSnapshot } from '@deepseek-ai/dsh-client-ui-usage/types';
export type Period = 7 | 30 | 90 | 365;
/** Inclusive local-calendar day range; both ends are midnights. */
export type DayRange = {
    readonly first: number;
    readonly last: number;
};
export type SessionMode = 'high' | 'recent';
export type Rank = {
    name: string;
    total: number;
};
/** User-selected scope of the dashboard. */
export interface Filters {
    readonly period: Period | 'custom';
    /** Used when `period` is `custom`. */
    readonly custom: DayRange;
    /** A heatmap day selection overrides the period. */
    readonly selectedDay: number | undefined;
    readonly project: string;
    readonly model: string;
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
/** Number of calendar days in an inclusive range, counted by local dates so DST changes do not skew it. */
export declare function dayCount(range: DayRange): number;
/** Order a possibly reversed pair of days into an inclusive range. */
export declare function orderedRange(a: number, b: number): DayRange;
/** Token and turn totals per weekday (Monday first) and local hour. */
export interface HourlyDistribution {
    /** `tokens[weekday][hour]`, weekday 0 = Monday. */
    readonly tokens: readonly (readonly number[])[];
    readonly turns: readonly (readonly number[])[];
    readonly max: number;
    /** Busiest slot, absent when there is no usage. */
    readonly peak?: {
        readonly weekday: number;
        readonly hour: number;
        readonly tokens: number;
    };
    /** Tokens per hour of day across all weekdays. */
    readonly byHour: readonly number[];
}
/** Bucket usage by the local weekday and hour its turn ended. */
export declare function hourlyDistribution(records: readonly UsageRecord[]): HourlyDistribution;
/** Localized labels for aggregated buckets. */
export interface DashboardLabels {
    /** Values without a model, provider, or project. */
    readonly unknown: string;
    /** Everything beyond the named slots of a breakdown. */
    readonly other: string;
}
/**
 * Keep the largest rows and fold the rest into one trailing "other" row, so a breakdown never
 * needs more colors than it has slots. Shared by the donuts and the stacked trend so a model
 * keeps the same color everywhere.
 * @param rows - rows sorted largest first.
 * @param other - label of the folded row.
 * @param slots - maximum rows returned, including the folded one.
 */
export declare function topWithOther(rows: readonly Rank[], other: string, slots?: number): Rank[];
export type TrendMode = 'daily' | 'weekly' | 'cumulative';
/** One bar of the stacked trend: per-series totals for a day or a week. */
export interface TrendBucket {
    readonly at: number;
    /** Last day covered; equals `at` for daily buckets. */
    readonly endAt: number;
    /** Tokens per series, aligned with the series list. */
    readonly values: readonly number[];
    readonly total: number;
}
/**
 * Bucket records into stacked bars.
 * @param records - records inside `range`.
 * @param range - inclusive day range; every day or week in it gets a bucket, empty ones included.
 * @param mode - daily bars, Monday-based weekly bars, or running totals per day.
 * @param seriesOf - series index for a record.
 * @param seriesCount - number of series.
 */
export declare function trendBuckets(records: readonly UsageRecord[], range: DayRange, mode: TrendMode, seriesOf: (record: UsageRecord) => number, seriesCount: number): TrendBucket[];
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
export declare function deriveDashboard(snapshot: UsageSnapshot, filters: Filters, labels: DashboardLabels): {
    today: number;
    range: DayRange;
    anchor: number;
    daysInView: number;
    start: number;
    end: number;
    projectById: Map<string, string>;
    hourly: HourlyDistribution;
    models: string[];
    scoped: readonly UsageRecord[];
    selected: UsageRecord[];
    modelSeries: Rank[];
    modelSeriesOf: (record: UsageRecord) => number;
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
    earliestDay: number;
    heatYears: number[];
    sessions: RankedSession[];
};
//# sourceMappingURL=derive.d.ts.map