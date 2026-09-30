/** Locale-aware number/date formatting and chart scales for the usage dashboard. */
/** Formatters bound to one UI language. */
export interface Formatters {
    /** Integer with grouping, e.g. 1,234,567. */
    readonly integer: (value: number) => string;
    /** Compact above 10k, e.g. 1.2M; one decimal below. */
    readonly amount: (value: number) => string;
    readonly dayShort: (time: number) => string;
    readonly dayMedium: (time: number) => string;
    readonly dayLong: (time: number) => string;
    readonly dayNumeric: (time: number) => string;
    readonly month: (time: number) => string;
    readonly dateTime: (time: number) => string;
    /** Short weekday name; 0 = Monday. */
    readonly weekday: (index: number) => string;
}
/**
 * Formatters for one UI language, built once and reused: the heatmap alone formats hundreds of dates per render.
 * @param locale - active DSH locale id such as `zh` or `en`.
 */
export declare function formattersFor(locale: string): Formatters;
/**
 * Round an axis up to a 1/2/2.5/5 × 10ⁿ step so tick labels read as round numbers.
 * @param maximum - largest plotted value.
 * @param integer - whether ticks must be whole numbers (counts).
 * @returns the axis top and its tick values from zero, at most five ticks.
 */
export declare function niceScale(maximum: number, integer?: boolean): {
    top: number;
    ticks: number[];
};
/**
 * Map a value to one of five heat levels on a square-root scale, so ordinary values stay
 * visible next to a single extreme peak.
 * @returns 0 for no usage, otherwise 1–4.
 */
export declare function heatLevel(value: number, max: number): 0 | 1 | 2 | 3 | 4;
/** `YYYY-MM-DD` for a local-calendar day, as used by `<input type="date">`. */
export declare function isoDay(time: number): string;
/** Local midnight for a `YYYY-MM-DD` value, or undefined when it is empty or malformed. */
export declare function parseIsoDay(value: string): number | undefined;
/** Evenly spaced indexes into `length` points, always including both ends. */
export declare function spreadIndexes(length: number, wanted: number): number[];
//# sourceMappingURL=format.d.ts.map