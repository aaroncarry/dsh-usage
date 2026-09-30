/** Locale-aware number/date formatting and chart scales for the usage dashboard. */
const cache = new Map();
/** Map a DSH locale id to a BCP 47 tag Intl understands; unknown ids fall back to the browser default. */
function intlTag(locale) {
    const tag = locale === 'zh' ? 'zh-CN' : locale;
    try {
        return Intl.getCanonicalLocales(tag)[0];
    }
    catch (_invalidTag) {
        return undefined;
    }
}
/**
 * Formatters for one UI language, built once and reused: the heatmap alone formats hundreds of dates per render.
 * @param locale - active DSH locale id such as `zh` or `en`.
 */
export function formattersFor(locale) {
    const cached = cache.get(locale);
    if (cached !== undefined)
        return cached;
    const tag = intlTag(locale);
    const number = (options) => new Intl.NumberFormat(tag, options).format;
    const date = (options) => new Intl.DateTimeFormat(tag, options).format;
    const decimal = number({ maximumFractionDigits: 1 });
    const compact = number({ notation: 'compact', maximumFractionDigits: 1 });
    const value = {
        integer: number({}),
        amount: amount => (amount >= 10_000 ? compact : decimal)(amount),
        dayShort: date({ month: 'short', day: 'numeric' }),
        dayMedium: date({ year: 'numeric', month: 'short', day: 'numeric' }),
        dayLong: date({ year: 'numeric', month: 'long', day: 'numeric' }),
        dayNumeric: date({ year: 'numeric', month: 'numeric', day: 'numeric' }),
        month: date({ month: 'short' }),
        dateTime: date({ month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        // 2024-01-01 was a Monday.
        weekday: (weekdays => (index) => weekdays(new Date(2024, 0, 1 + index)))(date({ weekday: 'short' })),
    };
    cache.set(locale, value);
    return value;
}
/**
 * Round an axis up to a 1/2/2.5/5 × 10ⁿ step so tick labels read as round numbers.
 * @param maximum - largest plotted value.
 * @param integer - whether ticks must be whole numbers (counts).
 * @returns the axis top and its tick values from zero, at most five ticks.
 */
export function niceScale(maximum, integer = false) {
    if (!(maximum > 0))
        return { top: 1, ticks: [0, 1] };
    const rough = Math.max(maximum, integer ? 1 : 0) / 4;
    const magnitude = 10 ** Math.floor(Math.log10(rough));
    const residual = rough / magnitude;
    let step = (residual <= 1 ? 1 : residual <= 2 ? 2 : residual <= 2.5 ? 2.5 : residual <= 5 ? 5 : 10) * magnitude;
    if (integer)
        step = Math.max(1, Math.ceil(step));
    const count = Math.max(1, Math.ceil(maximum / step - 1e-9));
    return { top: step * count, ticks: Array.from({ length: count + 1 }, (_, index) => step * index) };
}
/**
 * Map a value to one of five heat levels on a square-root scale, so ordinary values stay
 * visible next to a single extreme peak.
 * @returns 0 for no usage, otherwise 1–4.
 */
export function heatLevel(value, max) {
    if (value <= 0 || max <= 0)
        return 0;
    return Math.min(4, Math.max(1, Math.ceil(Math.sqrt(value / max) * 4)));
}
/** `YYYY-MM-DD` for a local-calendar day, as used by `<input type="date">`. */
export function isoDay(time) {
    const date = new Date(time);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
/** Local midnight for a `YYYY-MM-DD` value, or undefined when it is empty or malformed. */
export function parseIsoDay(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (match === null)
        return undefined;
    const [, year, month, day] = match.map(Number);
    const date = new Date(year, month - 1, day);
    return date.getMonth() === month - 1 && date.getDate() === day ? date.getTime() : undefined;
}
/** Evenly spaced indexes into `length` points, always including both ends. */
export function spreadIndexes(length, wanted) {
    if (length <= 0)
        return [];
    if (length === 1)
        return [0];
    const count = Math.min(length, wanted);
    return [...new Set(Array.from({ length: count }, (_, index) => Math.round(index * (length - 1) / (count - 1))))];
}
//# sourceMappingURL=format.js.map