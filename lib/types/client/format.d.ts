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
/** Evenly spaced indexes into `length` points, always including both ends. */
export declare function spreadIndexes(length: number, wanted: number): number[];
//# sourceMappingURL=format.d.ts.map