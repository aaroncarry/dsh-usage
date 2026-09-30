import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Outlined bar chart on a baseline, drawn to the DSH icon grid: 16×16 viewBox, currentColor, 1px Regular stroke.
 * Built-in chart-like glyphs (gauge, data, database) are already taken by other usage plugins.
 * Uneven bar heights avoid reading as a signal-strength meter; edges sit on half-pixel
 * coordinates so the 1px stroke stays crisp.
 * @param props - sidebar icon props. @returns the glyph.
 */
export function UsageIcon({ size }) {
    return _jsxs("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", stroke: "currentColor", strokeWidth: 1, strokeLinejoin: "round", children: [_jsx("rect", { x: "2.5", y: "7.5", width: "3", height: "5", rx: "0.75" }), _jsx("rect", { x: "6.5", y: "2.5", width: "3", height: "10", rx: "0.75" }), _jsx("rect", { x: "10.5", y: "5.5", width: "3", height: "7", rx: "0.75" }), _jsx("path", { d: "M1.5 14.5H14.5", strokeLinecap: "round" })] });
}
//# sourceMappingURL=UsageIcon.js.map