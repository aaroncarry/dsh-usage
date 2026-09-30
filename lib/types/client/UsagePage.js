import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/** Interactive charts over one Host observation of durable token usage. */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Tooltip } from '@deepseek-ai/dsh-client-ui-primitives';
import { deriveDashboard, dayStart, orderedRange, shiftDay, streaks, topWithOther, trendBuckets, } from "./derive.js";
import { formattersFor, heatLevel, isoDay, niceScale, parseIsoDay, spreadIndexes } from "./format.js";
import css from './UsagePage.module.css';
const MODEL_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-model-${index})`);
const PROJECT_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-project-${index})`);
const PROVIDER_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-provider-${index})`);
const COMPOSITION_COLORS = Array.from({ length: 5 }, (_, index) => `var(--usage-composition-${index})`);
function percent(value) {
    return value === undefined ? '—' : `${value.toFixed(1)}%`;
}
function share(value, total) {
    return `${(total ? value / total * 100 : 0).toFixed(1)}%`;
}
/** Period-over-period change, or undefined when the previous period has nothing to compare against. */
function delta(current, previous) {
    if (previous <= 0)
        return undefined;
    const change = (current - previous) / previous * 100;
    return { text: `${Math.abs(change).toFixed(1)}%`, up: change >= 0 };
}
function Segments({ modes, value, onChange, label }) {
    return _jsx("div", { className: css.segments, children: modes.map(mode => _jsx("button", { className: value === mode ? css.selected : '', "aria-pressed": value === mode, onClick: () => { onChange(mode); }, children: label(mode) }, mode)) });
}
/** Subscribes to progress alone so 500 ms progress ticks do not re-render the dashboard. */
function ProgressCount({ useProgress, prefix }) {
    const progress = useProgress(state => state.progress);
    return _jsx(_Fragment, { children: progress?.total ? `${prefix}${progress.completed}/${progress.total}` : '' });
}
// Stacked trend geometry in viewBox units; date labels sit below the plot.
const TREND = { width: 790, height: 224, left: 56, right: 776, top: 18, bottom: 190 };
const TREND_PLOT_WIDTH = TREND.right - TREND.left;
const TREND_PLOT_HEIGHT = TREND.bottom - TREND.top;
/** Bar outline with rounded top corners only, so a stack reads as one column. */
function roundedTop(x, y, width, height, radius) {
    const r = Math.max(0, Math.min(radius, width / 2, height));
    return `M${x} ${y + height}V${y + r}Q${x} ${y} ${x + r} ${y}H${x + width - r}Q${x + width} ${y} ${x + width} ${y + r}V${y + height}Z`;
}
function StackedTrend({ buckets, series, colors, mode, fmt, t }) {
    const [hovered, setHovered] = useState();
    const [focused, setFocused] = useState();
    const [hidden, setHidden] = useState(() => new Set());
    const shown = (index) => !hidden.has(index);
    const totals = buckets.map(bucket => bucket.values.reduce((total, value, index) => shown(index) ? total + value : total, 0));
    const scale = niceScale(Math.max(0, ...totals));
    const count = Math.max(1, buckets.length);
    const slot = TREND_PLOT_WIDTH / count;
    // Wide slots get airy bars; a year of days packs them nearly edge to edge.
    const barWidth = Math.max(1, Math.min(28, slot * (count > 120 ? 0.82 : 0.62)));
    const separated = barWidth >= 6;
    const centerOf = (index) => TREND.left + slot * (index + 0.5);
    const yOf = (value) => TREND.bottom - value / scale.top * TREND_PLOT_HEIGHT;
    const average = mode === 'cumulative' ? 0 : totals.reduce((total, value) => total + value, 0) / count;
    const grandTotal = series.reduce((total, row, index) => shown(index) ? total + row.total : total, 0);
    const labelIndexes = spreadIndexes(buckets.length, 6);
    const active = hovered === undefined ? undefined : buckets[hovered];
    const bucketLabel = (bucket) => mode === 'weekly' && bucket.endAt !== bucket.at
        ? `${fmt.dayShort(bucket.at)} – ${fmt.dayShort(bucket.endAt)}` : fmt.dayMedium(bucket.at);
    const toggle = (index) => {
        setHidden(current => {
            const next = new Set(current);
            if (next.has(index))
                next.delete(index);
            else if (series.length - next.size > 1)
                next.add(index); // keep at least one series visible
            return next;
        });
    };
    const pick = (clientX, element) => {
        const bounds = element.getBoundingClientRect();
        const x = (clientX - bounds.left) / bounds.width * TREND.width;
        const index = Math.floor((x - TREND.left) / slot);
        setHovered(index >= 0 && index < buckets.length ? index : undefined);
    };
    const activeX = hovered === undefined ? 0 : centerOf(hovered) / TREND.width * 100;
    return _jsxs("div", { className: css.trend, children: [_jsxs("div", { className: css.chartWrap, children: [_jsxs("svg", { className: css.chart, viewBox: `0 0 ${TREND.width} ${TREND.height}`, role: "img", tabIndex: 0, "aria-label": `${t('trend')} · ${fmt.dayShort(buckets[0]?.at ?? 0)} – ${fmt.dayShort(buckets.at(-1)?.endAt ?? 0)}`, onPointerMove: event => { pick(event.clientX, event.currentTarget); }, onPointerLeave: () => { setHovered(undefined); }, onFocus: () => { setHovered(buckets.length - 1); }, onBlur: () => { setHovered(undefined); }, onKeyDown: event => {
                            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
                                return;
                            event.preventDefault();
                            setHovered(index => Math.max(0, Math.min(buckets.length - 1, (index ?? buckets.length - 1) + (event.key === 'ArrowLeft' ? -1 : 1))));
                        }, children: [scale.ticks.map(tick => _jsxs("g", { children: [_jsx("line", { x1: TREND.left, x2: TREND.right, y1: yOf(tick), y2: yOf(tick), className: tick === 0 ? css.baseLine : css.gridLine }), _jsx("text", { x: TREND.left - 10, y: yOf(tick) + 3.5, textAnchor: "end", className: css.chartTick, children: fmt.amount(tick) })] }, tick)), hovered !== undefined && _jsx("rect", { className: css.hoverBand, x: centerOf(hovered) - slot / 2, y: TREND.top - 6, width: slot, height: TREND.bottom - TREND.top + 6, rx: Math.min(6, slot / 2) }), _jsx("g", { children: buckets.map((bucket, index) => {
                                    const x = centerOf(index) - barWidth / 2;
                                    const visible = bucket.values.map((value, seriesIndex) => ({ value, seriesIndex })).filter(item => item.value > 0 && shown(item.seriesIndex));
                                    let base = TREND.bottom;
                                    return _jsx("g", { className: css.bar, opacity: hovered === undefined || hovered === index ? 1 : 0.55, style: { animationDelay: `${Math.min(index * 12, 360)}ms` }, children: visible.map((item, position) => {
                                            const height = item.value / scale.top * TREND_PLOT_HEIGHT;
                                            const top = base - height;
                                            base = top;
                                            const isTop = position === visible.length - 1;
                                            // A 1px gap between stacked segments when bars are wide enough to show it.
                                            const drawn = separated && !isTop ? Math.max(0, height - 1) : height;
                                            const fade = focused === undefined || focused === item.seriesIndex ? undefined : 0.22;
                                            const fill = colors[item.seriesIndex % colors.length];
                                            return isTop
                                                ? _jsx("path", { d: roundedTop(x, top, barWidth, drawn, 3), fill: fill, opacity: fade }, item.seriesIndex)
                                                : _jsx("rect", { x: x, y: top + (height - drawn), width: barWidth, height: drawn, fill: fill, opacity: fade }, item.seriesIndex);
                                        }) }, bucket.at);
                                }) }, `${mode}:${buckets[0]?.at}:${buckets.length}`), average > 0 && _jsxs("g", { className: css.averageLine, children: [_jsx("line", { x1: TREND.left, x2: TREND.right, y1: yOf(average), y2: yOf(average) }), _jsxs("text", { x: TREND.right, y: yOf(average) - 5, textAnchor: "end", children: [t(mode === 'weekly' ? 'weeklyAverage' : 'dailyAverage'), " ", fmt.amount(Math.round(average))] })] }), labelIndexes.map((index, position) => {
                                const bucket = buckets[index];
                                if (bucket === undefined)
                                    return null;
                                const anchor = labelIndexes.length === 1 ? 'middle' : position === 0 ? 'start' : position === labelIndexes.length - 1 ? 'end' : 'middle';
                                const x = anchor === 'start' ? centerOf(index) - barWidth / 2 : anchor === 'end' ? centerOf(index) + barWidth / 2 : centerOf(index);
                                return _jsx("text", { x: x, y: TREND.height - 8, textAnchor: anchor, className: css.chartTick, children: fmt.dayShort(bucket.at) }, index);
                            })] }), active && hovered !== undefined && _jsxs("div", { className: css.trendTooltip, role: "status", style: { left: `${activeX}%`, transform: activeX > 58 ? 'translateX(calc(-100% - 14px))' : 'translateX(14px)' }, children: [_jsxs("div", { className: css.trendTooltipHead, children: [_jsx("span", { children: bucketLabel(active) }), _jsx("strong", { children: fmt.amount(totals[hovered] ?? 0) })] }), active.values.map((value, index) => ({ value, index })).filter(item => item.value > 0 && shown(item.index))
                                .sort((a, b) => b.value - a.value).map(item => _jsxs("div", { className: css.trendTooltipRow, children: [_jsx("i", { style: { background: colors[item.index % colors.length] } }), _jsx("span", { children: series[item.index]?.name }), _jsx("strong", { children: fmt.amount(item.value) }), _jsx("small", { children: share(item.value, totals[hovered] ?? 0) })] }, item.index)), (totals[hovered] ?? 0) === 0 && _jsx("div", { className: css.trendTooltipEmpty, children: t('noUsage') })] })] }), _jsx("div", { className: css.trendLegend, children: series.map((row, index) => _jsxs("button", { "aria-pressed": shown(index), className: `${shown(index) ? '' : css.legendOff} ${focused === index ? css.legendFocus : ''}`, onPointerEnter: () => { if (shown(index))
                        setFocused(index); }, onPointerLeave: () => { setFocused(undefined); }, onClick: () => { setFocused(undefined); toggle(index); }, title: t('legendToggle'), children: [_jsx("i", { style: { background: colors[index % colors.length] } }), _jsx("span", { children: row.name }), _jsx("small", { children: shown(index) ? share(row.total, grandTotal) : '—' })] }, row.name)) })] });
}
function Heatmap({ records, years, year, today, selectedDay, onYearChange, onSelectDay, fmt, t }) {
    const grid = useMemo(() => {
        const totals = new Map();
        for (const record of records) {
            const day = dayStart(record.at);
            totals.set(day, (totals.get(day) ?? 0) + record.totalTokens);
        }
        const first = year === 'rolling' ? shiftDay(today, -364) : new Date(year, 0, 1).getTime();
        const last = year === 'rolling' ? today : new Date(year, 11, 31).getTime();
        // Weeks start on Monday, like the weekly trend buckets.
        const start = shiftDay(first, -((new Date(first).getDay() + 6) % 7));
        const cells = [];
        for (let day = start; day <= last; day = shiftDay(day, 1)) {
            cells.push({ at: day, total: totals.get(day) ?? 0, visible: day >= first && day <= today, future: day >= first && day > today });
        }
        while (cells.length % 7 !== 0)
            cells.push({ at: today, total: 0, visible: false, future: false });
        const weeks = cells.length / 7;
        const months = Array.from({ length: weeks }, (_, week) => {
            const cell = cells[week * 7];
            if (cell === undefined)
                return '';
            const date = Math.max(cell.at, first);
            const previousCell = week === 0 ? undefined : cells[(week - 1) * 7];
            const previous = previousCell === undefined ? undefined : Math.max(previousCell.at, first);
            return previous === undefined || new Date(date).getMonth() !== new Date(previous).getMonth()
                ? fmt.month(date) : '';
        });
        const active = [...totals].filter(([day, total]) => day >= first && day <= last && total > 0);
        const max = Math.max(1, ...active.map(([, total]) => total));
        const lastShown = Math.min(last, today);
        return { cells, weeks, months, max, first, lastShown, streak: streaks(active.map(([day]) => day), first, lastShown) };
    }, [records, year, today, fmt]);
    const { cells, weeks, months, max, first, lastShown, streak } = grid;
    // When the grid overflows, show the most recent weeks rather than the oldest.
    const scroller = useRef(null);
    useLayoutEffect(() => {
        const element = scroller.current;
        if (element === null)
            return;
        const toLatest = () => { element.scrollLeft = element.scrollWidth; };
        toLatest();
        // Resizing the window or sidebar can start the overflow after the first render.
        const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(toLatest);
        observer?.observe(element);
        return () => { observer?.disconnect(); };
    }, [weeks, year]);
    // Exactly one cell is a tab stop; fall back to the range's last day when the selection or today is outside it.
    const tabStop = selectedDay !== undefined && selectedDay >= first && selectedDay <= lastShown ? selectedDay : lastShown;
    const size = { gridTemplateColumns: `repeat(${weeks}, minmax(var(--usage-heat-cell-size), 1fr))`, minWidth: `${weeks * 12 + (weeks - 1) * 3}px` };
    return _jsxs("section", { className: css.card, children: [_jsxs("div", { className: css.cardHead, children: [_jsxs("div", { children: [_jsx("h2", { children: t('heatmap') }), _jsx("p", { children: year === 'rolling' ? t('heatmapNote') : `${year} · ${t('oneCellDay')}` })] }), _jsxs("select", { className: css.select, "aria-label": t('heatmapRange'), value: year, onChange: event => { onYearChange(event.target.value === 'rolling' ? 'rolling' : Number(event.target.value)); }, children: [_jsx("option", { value: "rolling", children: t('rollingYear') }), years.map(item => _jsx("option", { value: item, children: item }, item))] })] }), _jsxs("div", { className: css.heatScroll, ref: scroller, children: [_jsx("div", { className: css.monthLabels, style: size, children: months.map((month, index) => _jsx("span", { children: month }, index)) }), _jsx("div", { className: css.heatmap, style: size, children: Array.from({ length: weeks }, (_, week) => _jsx("div", { className: css.heatWeek, children: cells.slice(week * 7, week * 7 + 7).map((cell, day) => {
                                const level = heatLevel(cell.total, max);
                                const detail = `${fmt.dayLong(cell.at)}\n${fmt.integer(cell.total)} ${t('tokenUnit')}`;
                                return _jsx(Tooltip, { label: detail, side: "top", portal: true, delayMs: 80, disabled: !cell.visible, children: _jsx("span", { className: `${css.heatCell} ${cell.visible ? css[`heat${level}`] : cell.future ? css.heatFuture : css.heatHidden} ${selectedDay === cell.at ? css.heatSelected : ''}`, role: cell.visible ? 'button' : undefined, tabIndex: cell.visible && cell.at === tabStop ? 0 : -1, "aria-label": cell.visible ? detail : undefined, "aria-pressed": cell.visible ? selectedDay === cell.at : undefined, onClick: () => { if (cell.visible)
                                            onSelectDay(cell.at); }, onKeyDown: event => {
                                            if (!cell.visible)
                                                return;
                                            if (event.key === 'Enter' || event.key === ' ') {
                                                event.preventDefault();
                                                onSelectDay(cell.at);
                                                return;
                                            }
                                            const step = event.key === 'ArrowRight' ? 7 : event.key === 'ArrowLeft' ? -7
                                                : event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
                                            if (step === 0)
                                                return;
                                            event.preventDefault();
                                            const target = cells[week * 7 + day + step];
                                            if (target?.visible)
                                                event.currentTarget.closest(`.${css.heatmap}`)
                                                    ?.querySelector(`[data-day="${target.at}"]`)?.focus();
                                        }, "data-day": cell.at }) }, day);
                            }) }, week)) })] }), _jsxs("div", { className: css.heatFoot, children: [_jsxs("span", { children: [lastShown === today && _jsxs(_Fragment, { children: [t('currentStreak'), " ", _jsxs("strong", { children: [streak.current, " ", t('days')] }), " \u00B7 "] }), t('longestStreak'), " ", _jsxs("strong", { children: [streak.longest, " ", t('days')] })] }), _jsxs("span", { children: [t('less'), " ", _jsx("i", { className: css.heat0 }), _jsx("i", { className: css.heat1 }), _jsx("i", { className: css.heat2 }), _jsx("i", { className: css.heat3 }), _jsx("i", { className: css.heat4 }), " ", t('more')] })] })] });
}
function HourlyCard({ hourly, fmt, t }) {
    const slot = (hour) => `${String(hour).padStart(2, '0')}:00–${String(hour + 1).padStart(2, '0')}:00`;
    const hourMax = Math.max(1, ...hourly.byHour);
    const { peak } = hourly;
    return _jsxs("section", { className: css.card, children: [_jsxs("div", { className: css.cardHead, children: [_jsxs("div", { children: [_jsx("h2", { children: t('hourly') }), _jsx("p", { children: t('hourlyNote') })] }), peak && _jsxs("p", { className: css.hourlyPeak, children: [t('peakHour'), " ", _jsxs("strong", { children: [fmt.weekday(peak.weekday), " ", slot(peak.hour)] }), " \u00B7 ", fmt.amount(peak.tokens), " ", t('tokenUnit')] })] }), hourly.max === 0 ? _jsx("p", { className: css.empty, children: t('noData') }) : _jsxs("div", { className: css.hourly, children: [_jsx("span", {}), Array.from({ length: 24 }, (_, hour) => _jsx("span", { className: css.hourLabel, children: hour % 3 === 0 ? hour : '' }, hour)), hourly.tokens.map((row, weekday) => _jsxs("div", { className: css.hourRow, children: [_jsx("span", { className: css.weekdayLabel, children: fmt.weekday(weekday) }), row.map((value, hour) => {
                                const detail = `${fmt.weekday(weekday)} ${slot(hour)}\n${fmt.integer(value)} ${t('tokenUnit')} · ${fmt.integer(hourly.turns[weekday]?.[hour] ?? 0)} ${t('turns')}`;
                                return _jsx(Tooltip, { label: detail, side: "top", portal: true, delayMs: 80, children: _jsx("span", { className: `${css.hourCell} ${css[`heat${heatLevel(value, hourly.max)}`]}`, "aria-label": detail, role: "img" }) }, hour);
                            })] }, weekday)), _jsx("span", { className: css.weekdayLabel, title: t('hourTotal'), children: "\u03A3" }), hourly.byHour.map((value, hour) => _jsx(Tooltip, { label: `${slot(hour)}\n${fmt.integer(value)} ${t('tokenUnit')}`, side: "top", portal: true, delayMs: 80, children: _jsx("span", { className: css.hourBar, children: _jsx("i", { style: { height: `${value / hourMax * 100}%` } }) }) }, hour))] })] });
}
function RankBars({ rows, empty, unit, fmt }) {
    const total = Math.max(1, rows.reduce((sum, row) => sum + row.total, 0));
    return rows.length === 0 ? _jsx("p", { className: css.empty, children: empty }) : _jsx("div", { className: css.rankList, children: rows.slice(0, 6).map((row, index) => _jsx(Tooltip, { label: `${row.name}\n${fmt.integer(row.total)} ${unit} · ${share(row.total, total)}`, side: "top", portal: true, children: _jsxs("div", { children: [_jsxs("div", { className: css.rankMeta, children: [_jsx("span", { children: row.name }), _jsxs("strong", { children: [fmt.amount(row.total), _jsx("small", { children: share(row.total, total) })] })] }), _jsx("div", { className: css.track, children: _jsx("span", { style: { width: `${row.total / total * 100}%`, background: PROJECT_COLORS[index % PROJECT_COLORS.length] } }) })] }) }, row.name)) });
}
function ShareDonut({ rows, empty, other, colors, unit, fmt }) {
    const [hovered, setHovered] = useState();
    const total = rows.reduce((sum, row) => sum + row.total, 0);
    if (total === 0)
        return _jsx("p", { className: css.empty, children: empty });
    const shown = topWithOther(rows, other);
    let offset = 0;
    const stops = shown.map((row, index) => {
        const from = offset;
        offset += row.total / total * 100;
        return `${colors[index % colors.length]} ${from}% ${offset}%`;
    });
    const detail = (row) => `${row.name}\n${fmt.integer(row.total)} ${unit} · ${share(row.total, total)}`;
    const onDonutMove = (clientX, clientY, element) => {
        const bounds = element.getBoundingClientRect();
        const angle = (Math.atan2(clientX - bounds.left - bounds.width / 2, -(clientY - bounds.top - bounds.height / 2)) + 2 * Math.PI) % (2 * Math.PI);
        const portion = angle / (2 * Math.PI) * total;
        let used = 0;
        setHovered(shown.findIndex(row => (used += row.total) > portion));
    };
    const focused = hovered === undefined || hovered < 0 ? undefined : shown[hovered];
    return _jsxs("div", { className: css.share, children: [_jsx(Tooltip, { label: focused === undefined ? `${fmt.integer(total)} ${unit}` : detail(focused), side: "top", portal: true, children: _jsx("div", { className: css.donut, style: { background: `conic-gradient(${stops.join(', ')})` }, onPointerMove: event => { onDonutMove(event.clientX, event.clientY, event.currentTarget); }, onPointerLeave: () => { setHovered(undefined); }, children: _jsxs("span", { children: [_jsx("strong", { children: fmt.amount(focused?.total ?? total) }), _jsx("small", { children: focused === undefined ? unit : share(focused.total, total) })] }) }) }), _jsx("div", { className: css.shareLegend, children: shown.map((row, index) => _jsx(Tooltip, { label: detail(row), side: "top", portal: true, children: _jsxs("div", { className: hovered === index ? css.legendActive : undefined, onPointerEnter: () => { setHovered(index); }, onPointerLeave: () => { setHovered(undefined); }, children: [_jsx("i", { style: { background: colors[index % colors.length] } }), _jsx("span", { children: row.name }), _jsx("strong", { children: share(row.total, total) })] }) }, `${index}:${row.name}`)) })] });
}
function QualityPanel({ issues, refreshing, onOpen, onRebuild, fmt, t }) {
    const groups = [
        ['unreadable-session', t('unreadableSessions'), t('unreadableExplanation')],
        ['missing-turn', t('missingTurns'), t('missingExplanation')],
        ['unattributed-turn', t('unattributedTurns'), t('unattributedExplanation')],
    ];
    return _jsxs("section", { className: css.qualityPanel, "aria-label": t('dataQuality'), children: [_jsxs("div", { className: css.qualityHead, children: [_jsx("p", { children: t('qualityIntro') }), _jsx("button", { className: css.button, disabled: refreshing, onClick: onRebuild, children: t('rebuild') })] }), groups.map(([kind, label, explanation]) => {
                const own = issues.filter(issue => issue.kind === kind);
                const sessions = new Map();
                for (const issue of own) {
                    const previous = sessions.get(issue.sessionId);
                    const at = Math.max(previous?.at ?? 0, issue.at ?? 0) || undefined;
                    sessions.set(issue.sessionId, { title: issue.title, count: (previous?.count ?? 0) + 1,
                        ...(at === undefined ? {} : { at }) });
                }
                return _jsxs("div", { className: css.qualityGroup, children: [_jsxs("div", { className: css.qualityGroupHead, children: [_jsxs("strong", { children: [label, " \u00B7 ", own.length] }), _jsx("span", { children: explanation })] }), sessions.size > 0 && _jsx("div", { className: css.qualityList, children: [...sessions].sort((a, b) => (b[1].at ?? 0) - (a[1].at ?? 0)).map(([id, item]) => _jsxs("button", { onClick: () => { onOpen(id); }, children: [_jsx("span", { children: item.title }), _jsx("small", { children: kind === 'unreadable-session' ? t('openSession') : `${item.count} ${t('turns')}${item.at === undefined ? '' : ` · ${fmt.dayShort(item.at)}`}` })] }, id)) })] }, kind);
            })] });
}
/** Render token activity, trends, breakdowns, and session navigation. @param props - localized page services. @returns dashboard. */
export function UsagePage({ useUsage, useProgress, activate, retry, rebuild, openSession, locale, t }) {
    const snapshot = useUsage(state => state.snapshot);
    const error = useUsage(state => state.error);
    const refreshing = useUsage(state => state.refreshing);
    const [period, setPeriod] = useState(30);
    const [custom, setCustom] = useState();
    const [selectedDay, setSelectedDay] = useState();
    const [heatYear, setHeatYear] = useState('rolling');
    const [qualityOpen, setQualityOpen] = useState(false);
    const [project, setProject] = useState('');
    const [model, setModel] = useState('');
    const [trend, setTrend] = useState('daily');
    const [sessionMode, setSessionMode] = useState('high');
    useEffect(() => activate(), [activate]);
    const fmt = formattersFor(locale());
    const unknown = t('unknown');
    const other = t('other');
    const today = snapshot === undefined ? dayStart(Date.now()) : dayStart(snapshot.capturedAt);
    const customRange = custom ?? { first: shiftDay(today, -29), last: today };
    const view = useMemo(() => snapshot === undefined ? undefined : deriveDashboard(snapshot, { period, custom: customRange, selectedDay, project, model, sessionMode }, { unknown, other }), [snapshot, period, customRange.first, customRange.last, selectedDay, project, model, sessionMode, unknown, other]);
    const buckets = useMemo(() => view === undefined ? []
        : trendBuckets(view.selected, view.range, trend, view.modelSeriesOf, view.modelSeries.length), [view, trend]);
    const setCustomEnd = (end, value) => {
        const day = parseIsoDay(value);
        if (day !== undefined)
            setCustom(orderedRange(day, end === 'first' ? customRange.last : customRange.first));
    };
    const issueCount = view === undefined ? 0 : view.unreadable + view.missing + view.unattributed;
    return _jsx("main", { className: css.page, children: _jsxs("div", { className: css.content, children: [_jsxs("header", { className: css.pageHead, children: [_jsxs("div", { className: css.titleBlock, children: [_jsx("h1", { children: t('title') }), _jsx("p", { children: t('subtitle') })] }), snapshot && view && _jsxs("div", { className: css.headControls, children: [_jsxs("div", { className: css.filters, children: [_jsxs("span", { className: css.periodGroup, children: [_jsxs("select", { className: `${css.select} ${selectedDay === undefined ? '' : css.selectActive}`, "aria-label": t('period'), value: selectedDay === undefined ? period : 'selected', onChange: (event) => {
                                                        const value = event.target.value;
                                                        setSelectedDay(undefined);
                                                        setPeriod(value === 'custom' ? 'custom' : Number(value));
                                                    }, children: [selectedDay !== undefined && _jsx("option", { value: "selected", children: fmt.dayNumeric(selectedDay) }), _jsx("option", { value: 7, children: t('days7') }), _jsx("option", { value: 30, children: t('days30') }), _jsx("option", { value: 90, children: t('days90') }), _jsx("option", { value: 365, children: t('days365') }), _jsx("option", { value: "custom", children: t('customRange') })] }), period === 'custom' && selectedDay === undefined && _jsxs("span", { className: css.dateRange, children: [_jsx("input", { type: "date", className: css.dateInput, "aria-label": t('rangeStart'), value: isoDay(customRange.first), min: isoDay(view.earliestDay), max: isoDay(today), onChange: event => { setCustomEnd('first', event.target.value); } }), _jsx("span", { "aria-hidden": "true", children: "\u2013" }), _jsx("input", { type: "date", className: css.dateInput, "aria-label": t('rangeEnd'), value: isoDay(customRange.last), min: isoDay(view.earliestDay), max: isoDay(today), onChange: event => { setCustomEnd('last', event.target.value); } })] }), selectedDay !== undefined && _jsx("button", { className: css.clearDay, onClick: () => { setSelectedDay(undefined); }, title: t('clearDay'), "aria-label": t('clearDay'), children: "\u2715" })] }), _jsxs("select", { className: css.select, "aria-label": t('project'), value: project, onChange: (event) => { setProject(event.target.value); setModel(''); }, children: [_jsx("option", { value: "", children: t('allProjects') }), snapshot.projects.map(item => _jsx("option", { value: item.id, children: item.title }, item.id))] }), _jsxs("select", { className: css.select, "aria-label": t('model'), value: model, onChange: (event) => { setModel(event.target.value); }, children: [_jsx("option", { value: "", children: t('allModels') }), view.models.map(item => _jsx("option", { value: item, children: item }, item))] })] }), _jsxs("div", { className: css.status, children: [_jsx("span", { children: refreshing
                                                ? _jsxs(_Fragment, { children: [_jsx("i", { className: css.spinner }), t('refreshing'), _jsx(ProgressCount, { useProgress: useProgress, prefix: " " })] })
                                                : `${error ? t('staleAsOf') : t('updatedAt')} ${fmt.dateTime(snapshot.capturedAt)}` }), _jsx("button", { className: css.linkButton, disabled: refreshing, onClick: retry, children: t('refresh') }), _jsx("span", { className: css.divider }), _jsxs("button", { className: `${css.linkButton} ${issueCount > 0 ? css.qualityWarn : ''}`, "aria-expanded": qualityOpen, onClick: () => { setQualityOpen(!qualityOpen); }, title: `${view.unreadable} ${t('sessionsUnit')} / ${view.missing} ${t('turns')} / ${view.unattributed} ${t('unattributedShort')}`, children: [_jsx("i", { className: css.qualityDot }), t('dataQuality'), " \u00B7 ", issueCount] })] })] })] }), error && _jsxs("div", { className: css.notice, role: "alert", children: [snapshot ? t('staleError') : t('error'), " ", _jsx("button", { className: css.button, onClick: retry, children: t('retry') })] }), !snapshot && !error && _jsxs("div", { className: css.loading, role: "status", children: [_jsx("i", {}), t('loading'), _jsx(ProgressCount, { useProgress: useProgress, prefix: " \u00B7 " })] }), snapshot && view && _jsxs(_Fragment, { children: [qualityOpen && _jsx(QualityPanel, { issues: view.qualityIssues, refreshing: refreshing, onOpen: openSession, onRebuild: rebuild, fmt: fmt, t: t }), _jsxs("section", { className: css.summary, "aria-label": t('title'), children: [[
                                    [t('total'), fmt.amount(view.total), '', delta(view.total, view.prior)],
                                    [t('average'), fmt.amount(Math.round(view.total / view.daysInView)), '', delta(view.total, view.prior)],
                                    [t('peak'), fmt.amount(view.peak), '', delta(view.peak, view.priorPeak)],
                                    [t('active'), String(view.activeDays), t('days'), delta(view.activeDays, view.priorActiveDays)],
                                ].map(([label, value, unit, change]) => _jsxs("div", { className: css.stat, children: [_jsx("span", { children: label }), _jsxs("strong", { children: [value, unit && _jsx("small", { children: unit })] }), _jsx("small", { children: change === undefined ? t('noPrior') : _jsxs(_Fragment, { children: [t('compared'), " ", _jsxs("b", { children: [change.up ? '↑' : '↓', " ", change.text] })] }) })] }, label)), _jsxs("div", { className: css.stat, children: [_jsx("span", { children: t('cacheRate') }), _jsx("strong", { children: percent(view.cacheRate) }), _jsx("small", { children: view.cacheRate === undefined
                                                ? (view.selected.length > 0 ? t('cacheUnknown') : t('noPrior'))
                                                : view.cacheRateDelta === undefined ? t('noPrior')
                                                    : _jsxs(_Fragment, { children: [t('compared'), " ", _jsxs("b", { children: [view.cacheRateDelta >= 0 ? '↑' : '↓', " ", Math.abs(view.cacheRateDelta).toFixed(1), " ", t('percentagePoints')] })] }) })] })] }), _jsx(Heatmap, { records: view.scoped, years: view.heatYears, year: heatYear, today: view.today, selectedDay: selectedDay, onYearChange: value => { setHeatYear(value); setSelectedDay(undefined); }, onSelectDay: value => { setSelectedDay(current => current === value ? undefined : value); }, fmt: fmt, t: t }), _jsxs("section", { className: css.card, children: [_jsxs("div", { className: css.cardHead, children: [_jsxs("div", { children: [_jsx("h2", { children: t('trend') }), _jsx("p", { children: t('trendNote') })] }), _jsx(Segments, { modes: ['daily', 'weekly', 'cumulative'], value: trend, onChange: setTrend, label: t })] }), view.selected.length ? _jsx(StackedTrend, { buckets: buckets, series: view.modelSeries, colors: MODEL_COLORS, mode: trend, fmt: fmt, t: t }, view.modelSeries.map(row => row.name).join('\0')) : _jsx("p", { className: css.empty, children: t('noData') })] }), _jsx(HourlyCard, { hourly: view.hourly, fmt: fmt, t: t }), _jsxs("div", { className: css.twoCols, children: [_jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('composition') }), _jsxs("div", { className: css.composition, children: [[
                                                    [t('uncached'), view.composition.uncached, COMPOSITION_COLORS[0]],
                                                    [t('cacheRead'), view.composition.cacheRead, COMPOSITION_COLORS[1]],
                                                    [t('cacheWrite'), view.composition.cacheWrite, COMPOSITION_COLORS[2]],
                                                    [t('output'), view.composition.output, COMPOSITION_COLORS[3]],
                                                    [t('unknownInput'), view.composition.other, COMPOSITION_COLORS[4]],
                                                ].filter(([, value]) => value > 0).map(([name, value, color]) => _jsx(Tooltip, { label: `${name}\n${fmt.integer(value)} ${t('tokenUnit')} · ${share(value, view.total)}`, side: "top", portal: true, children: _jsxs("div", { className: css.compRow, children: [_jsx("span", { children: name }), _jsx("div", { className: css.track, children: _jsx("span", { style: { width: `${view.total ? value / view.total * 100 : 0}%`, background: color } }) }), _jsxs("strong", { children: [fmt.amount(value), _jsx("small", { children: share(value, view.total) })] })] }) }, name)), view.total === 0 && _jsx("p", { className: css.empty, children: t('noData') })] })] }), _jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('models') }), _jsx(ShareDonut, { rows: view.modelRows, empty: t('noData'), other: t('other'), colors: MODEL_COLORS, unit: t('tokenUnit'), fmt: fmt })] }), _jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('projects') }), _jsx(RankBars, { rows: view.projectRows, empty: t('noData'), unit: t('tokenUnit'), fmt: fmt })] }), _jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('providers') }), _jsx(ShareDonut, { rows: view.providerRows, empty: t('noData'), other: t('other'), colors: PROVIDER_COLORS, unit: t('tokenUnit'), fmt: fmt })] })] }), _jsxs("section", { className: css.card, children: [_jsxs("div", { className: css.cardHead, children: [_jsx("h2", { children: t('sessions') }), _jsx(Segments, { modes: ['high', 'recent'], value: sessionMode, onChange: setSessionMode, label: mode => t(mode === 'high' ? 'highUsage' : 'recent') })] }), view.sessions.length === 0 ? _jsx("p", { className: css.empty, children: t('noData') }) : _jsx("div", { className: css.sessionList, children: view.sessions.map(({ session, total, route }, index) => _jsxs("button", { className: css.sessionRow, onClick: () => { openSession(session.id); }, title: t('openSession'), children: [_jsx("span", { className: css.sessionIndex, children: index + 1 }), _jsxs("span", { className: css.sessionText, children: [_jsx("strong", { children: session.title }), _jsxs("small", { children: [view.projectById.get(session.projectId ?? '') ?? unknown, " \u00B7 ", sessionMode === 'recent' ? `${t('lastChat')} ${fmt.dayShort(session.lastAt)}` : route] })] }), _jsxs("span", { className: css.sessionTotal, children: [_jsxs("span", { children: [fmt.amount(total), " ", t('tokenUnit')] }), _jsx("i", { className: css.sessionBar, children: _jsx("i", { style: { width: `${view.total ? total / view.total * 100 : 0}%` } }) })] }), _jsx("span", { className: css.sessionArrow, "aria-hidden": "true", children: "\u203A" })] }, session.id)) })] })] })] }) });
}
//# sourceMappingURL=UsagePage.js.map