/** Decorative glyph for the usage sidebar entry. */
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
/**
 * Outlined bar chart on a baseline, drawn to the DSH icon grid: 16×16 viewBox, currentColor, 1px Regular stroke.
 * Built-in chart-like glyphs (gauge, data, database) are already taken by other usage plugins.
 * Uneven bar heights avoid reading as a signal-strength meter; edges sit on half-pixel
 * coordinates so the 1px stroke stays crisp.
 * @param props - sidebar icon props. @returns the glyph.
 */
export declare function UsageIcon({ size }: PropsRuntime<'sidebar.panellist'>): import("react").JSX.Element;
//# sourceMappingURL=UsageIcon.d.ts.map