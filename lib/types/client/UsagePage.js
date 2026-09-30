import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/** Interactive charts over one Host observation of durable token usage. */
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Tooltip } from '@deepseek-ai/dsh-client-ui-primitives';
import { deriveDashboard, dayStart, orderedRange, shiftDay, streaks } from "./derive.js";
import { formattersFor, heatLevel, isoDay, niceScale, parseIsoDay, spreadIndexes } from "./format.js";
import css from './UsagePage.module.css';
const MODEL_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-model-${index})`);
const PROJECT_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-project-${index})`);
const PROVIDER_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-provider-${index})`);
const COMPOSITION_COLORS = Array.from({ length: 5 }, (_, index) => `var(--usage-composition-${index})`);
// Chart geometry in viewBox units: plot spans x 68–758 and y 30–150; date labels sit below.
const PLOT_LEFT = 68;
const PLOT_WIDTH = 690;
const PLOT_BOTTOM = 150;
const PLOT_HEIGHT = 120;
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
function TrendChart({ records, days, anchorAt, mode, metric, label, fmt, t }) {
    const [hovered, setHovered] = useState();
    const gradientId = useId();
    const anchor = dayStart(anchorAt);
    const data = [];
    for (let offset = days - 1; offset >= 0; offset--) {
        const at = shiftDay(anchor, -offset);
        data.push({ at, endAt: at, input: 0, turns: 0, cacheRead: 0, cacheKnown: true });
    }
    const byDay = new Map(data.map((item, index) => [item.at, index]));
    for (const record of records) {
        const index = byDay.get(dayStart(record.at));
        if (index === undefined)
            continue;
        const item = data[index];
        if (item === undefined)
            continue;
        item.input += record.totalTokens - record.outputTokens;
        item.turns++;
        item.cacheRead += record.cacheReadTokens ?? 0;
        item.cacheKnown &&= record.cacheReadTokens !== undefined;
    }
    const points = mode === 'weekly'
        ? data.reduce((weeks, item) => {
            const monday = shiftDay(item.at, -((new Date(item.at).getDay() + 6) % 7));
            let week = weeks.at(-1);
            if (week?.at !== monday) {
                week = { at: monday, endAt: item.at, input: 0, turns: 0, cacheRead: 0, cacheKnown: true };
                weeks.push(week);
            }
            week.endAt = item.at;
            week.input += item.input;
            week.turns += item.turns;
            week.cacheRead += item.cacheRead;
            week.cacheKnown &&= item.cacheKnown;
            return weeks;
        }, [])
        : data;
    if (mode === 'cumulative') {
        let input = 0;
        for (const item of points) {
            input += item.input;
            item.input = input;
        }
    }
    // Ratios of an empty bucket are unknown, not zero: leave a gap instead of dragging the line down.
    const valueOf = (point) => {
        if (metric === 'turns')
            return point.turns;
        if (metric === 'averageInput')
            return point.turns ? point.input / point.turns : undefined;
        if (metric === 'cacheRate')
            return point.turns === 0 || !point.cacheKnown ? undefined : point.input ? point.cacheRead / point.input * 100 : 0;
        return point.input;
    };
    const values = points.map(valueOf);
    const scale = metric === 'cacheRate'
        ? { top: 100, ticks: [0, 25, 50, 75, 100] }
        : niceScale(Math.max(0, ...values.filter((value) => value !== undefined)), metric === 'turns');
    const xOf = (index) => PLOT_LEFT + (points.length === 1 ? PLOT_WIDTH / 2 : index * PLOT_WIDTH / (points.length - 1));
    const yOf = (value) => PLOT_BOTTOM - value / scale.top * PLOT_HEIGHT;
    // Contiguous runs of known values; each draws one line and one filled area.
    const runs = [];
    values.forEach((value, index) => {
        if (value === undefined)
            return;
        if (index === 0 || values[index - 1] === undefined)
            runs.push([]);
        runs.at(-1)?.push(index);
    });
    const linePath = (run) => run.map((index, position) => `${position === 0 ? 'M' : 'L'} ${xOf(index)} ${yOf(values[index] ?? 0)}`).join(' ');
    const activeIndex = hovered !== undefined && hovered < points.length ? hovered : undefined;
    const active = activeIndex === undefined ? undefined : points[activeIndex];
    const activeValue = activeIndex === undefined ? undefined : values[activeIndex];
    const activeX = activeIndex === undefined ? undefined : xOf(activeIndex);
    const updateHover = (clientX, width, left) => {
        const x = (clientX - left) / width * 790;
        setHovered(points.length === 1 ? 0 : Math.max(0, Math.min(points.length - 1, Math.round((x - PLOT_LEFT) / PLOT_WIDTH * (points.length - 1)))));
    };
    const format = (value) => value === undefined ? '—'
        : metric === 'cacheRate' ? `${value.toFixed(1)}%`
            : `${metric === 'turns' ? fmt.integer(value) : fmt.amount(value)} ${metric === 'turns' ? t('turns') : t('tokenUnit')}`;
    const pointLabel = (point) => mode === 'weekly' ? `${fmt.dayShort(point.at)} – ${fmt.dayShort(point.endAt)}` : fmt.dayMedium(point.at);
    const labelIndexes = spreadIndexes(points.length, 6);
    return _jsxs("div", { className: css.chartWrap, children: [_jsxs("svg", { className: css.chart, viewBox: "0 0 790 176", role: "img", "aria-label": label, tabIndex: 0, onPointerMove: event => { const bounds = event.currentTarget.getBoundingClientRect(); updateHover(event.clientX, bounds.width, bounds.left); }, onPointerLeave: () => { setHovered(undefined); }, onFocus: () => { setHovered(points.length - 1); }, onBlur: () => { setHovered(undefined); }, onKeyDown: event => {
                    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
                        return;
                    event.preventDefault();
                    setHovered(index => Math.max(0, Math.min(points.length - 1, (index ?? points.length - 1) + (event.key === 'ArrowLeft' ? -1 : 1))));
                }, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: gradientId, x1: "0", x2: "0", y1: "0", y2: "1", children: [_jsx("stop", { offset: "0%", style: { stopColor: 'var(--usage-input)', stopOpacity: 0.22 } }), _jsx("stop", { offset: "100%", style: { stopColor: 'var(--usage-input)', stopOpacity: 0 } })] }) }), _jsx("rect", { width: "790", height: "176", fill: "transparent" }), scale.ticks.map(tick => _jsxs("g", { children: [_jsx("line", { x1: PLOT_LEFT, x2: PLOT_LEFT + PLOT_WIDTH, y1: yOf(tick), y2: yOf(tick), className: tick === 0 ? css.baseLine : css.gridLine }), _jsx("text", { x: PLOT_LEFT - 10, y: yOf(tick) + 4, textAnchor: "end", className: css.chartTick, children: metric === 'cacheRate' ? `${tick}%` : fmt.amount(tick) })] }, tick)), labelIndexes.map((index, position) => {
                        const point = points[index];
                        if (point === undefined)
                            return null;
                        const anchorSide = labelIndexes.length === 1 ? 'middle' : position === 0 ? 'start' : position === labelIndexes.length - 1 ? 'end' : 'middle';
                        return _jsx("text", { x: xOf(index), y: 170, textAnchor: anchorSide, className: css.chartTick, children: fmt.dayShort(point.at) }, index);
                    }), runs.map(run => run.length > 1 && _jsx("path", { fill: `url(#${gradientId})`, d: `${linePath(run)} L ${xOf(run.at(-1) ?? 0)} ${PLOT_BOTTOM} L ${xOf(run[0] ?? 0)} ${PLOT_BOTTOM} Z` }, `a${run[0]}`)), runs.map(run => _jsx("path", { d: linePath(run), className: css.inputLine }, `l${run[0]}`)), runs.map(run => run.length === 1 && _jsx("circle", { cx: xOf(run[0] ?? 0), cy: yOf(values[run[0] ?? 0] ?? 0), r: "3", className: css.chartPoint }, `p${run[0]}`)), activeX !== undefined && _jsxs(_Fragment, { children: [_jsx("line", { x1: activeX, x2: activeX, y1: PLOT_BOTTOM - PLOT_HEIGHT, y2: PLOT_BOTTOM, className: css.chartGuide }), activeValue !== undefined && _jsx("circle", { cx: activeX, cy: yOf(activeValue), r: "4.5", className: css.chartPoint })] })] }), active && activeX !== undefined && _jsxs("div", { className: css.chartTooltip, style: { left: `${Math.max(10, Math.min(90, activeX / 790 * 100))}%` }, role: "status", children: [_jsx("span", { children: pointLabel(active) }), _jsxs("strong", { children: [label, " \u00B7 ", format(activeValue)] })] })] });
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
    return rows.length === 0 ? _jsx("p", { className: css.empty, children: empty }) : _jsx("div", { className: css.rankList, children: rows.slice(0, 6).map((row, index) => _jsx(Tooltip, { label: `${row.name}\n${fmt.integer(row.total)} ${unit} · ${share(row.total, total)}`, side: "top", portal: true, children: _jsxs("div", { className: css.rankRow, children: [_jsxs("div", { className: css.rankMeta, children: [_jsx("span", { children: row.name }), _jsxs("strong", { children: [fmt.amount(row.total), _jsx("small", { children: share(row.total, total) })] })] }), _jsx("div", { className: css.track, children: _jsx("span", { style: { width: `${row.total / total * 100}%`, background: PROJECT_COLORS[index % PROJECT_COLORS.length] } }) })] }) }, row.name)) });
}
function ShareDonut({ rows, empty, other, colors, unit, fmt }) {
    const [hovered, setHovered] = useState();
    const total = rows.reduce((sum, row) => sum + row.total, 0);
    if (total === 0)
        return _jsx("p", { className: css.empty, children: empty });
    const shown = rows.length <= 6 ? rows : [
        ...rows.slice(0, 5),
        { name: other, total: rows.slice(5).reduce((sum, row) => sum + row.total, 0) },
    ];
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
    const [trendModel, setTrendModel] = useState('');
    const [efficiencyMetric, setEfficiencyMetric] = useState('turns');
    const [efficiencyMode, setEfficiencyMode] = useState('daily');
    const [efficiencyModel, setEfficiencyModel] = useState('');
    const [sessionMode, setSessionMode] = useState('high');
    useEffect(() => activate(), [activate]);
    const fmt = formattersFor(locale());
    const unknown = t('unknown');
    const today = snapshot === undefined ? dayStart(Date.now()) : dayStart(snapshot.capturedAt);
    const customRange = custom ?? { first: shiftDay(today, -29), last: today };
    const view = useMemo(() => snapshot === undefined ? undefined : deriveDashboard(snapshot, { period, custom: customRange, selectedDay, project, model, trendModel, efficiencyModel, sessionMode }, unknown), [snapshot, period, customRange.first, customRange.last, selectedDay, project, model, trendModel, efficiencyModel, sessionMode, unknown]);
    const setCustomEnd = (end, value) => {
        const day = parseIsoDay(value);
        if (day !== undefined)
            setCustom(orderedRange(day, end === 'first' ? customRange.last : customRange.first));
    };
    const efficiencyLabel = efficiencyMetric === 'turns' ? t('completedTurns')
        : efficiencyMetric === 'averageInput' ? t('averageInputPerTurn') : t('cacheReadShare');
    const issueCount = view === undefined ? 0 : view.unreadable + view.missing + view.unattributed;
    return _jsx("main", { className: css.page, children: _jsxs("div", { className: css.content, children: [_jsxs("header", { className: css.pageHead, children: [_jsxs("div", { className: css.titleBlock, children: [_jsx("h1", { children: t('title') }), _jsx("p", { children: t('subtitle') })] }), snapshot && view && _jsxs("div", { className: css.headControls, children: [_jsxs("div", { className: css.filters, children: [_jsxs("span", { className: css.periodGroup, children: [_jsxs("select", { className: `${css.select} ${selectedDay === undefined ? '' : css.selectActive}`, "aria-label": t('period'), value: selectedDay === undefined ? period : 'selected', onChange: (event) => {
                                                        const value = event.target.value;
                                                        setSelectedDay(undefined);
                                                        setPeriod(value === 'custom' ? 'custom' : Number(value));
                                                        setTrendModel('');
                                                    }, children: [selectedDay !== undefined && _jsx("option", { value: "selected", children: fmt.dayNumeric(selectedDay) }), _jsx("option", { value: 7, children: t('days7') }), _jsx("option", { value: 30, children: t('days30') }), _jsx("option", { value: 90, children: t('days90') }), _jsx("option", { value: 365, children: t('days365') }), _jsx("option", { value: "custom", children: t('customRange') })] }), period === 'custom' && selectedDay === undefined && _jsxs("span", { className: css.dateRange, children: [_jsx("input", { type: "date", className: css.dateInput, "aria-label": t('rangeStart'), value: isoDay(customRange.first), min: isoDay(view.earliestDay), max: isoDay(today), onChange: event => { setCustomEnd('first', event.target.value); } }), _jsx("span", { "aria-hidden": "true", children: "\u2013" }), _jsx("input", { type: "date", className: css.dateInput, "aria-label": t('rangeEnd'), value: isoDay(customRange.last), min: isoDay(view.earliestDay), max: isoDay(today), onChange: event => { setCustomEnd('last', event.target.value); } })] }), selectedDay !== undefined && _jsx("button", { className: css.clearDay, onClick: () => { setSelectedDay(undefined); }, title: t('clearDay'), "aria-label": t('clearDay'), children: "\u2715" })] }), _jsxs("select", { className: css.select, "aria-label": t('project'), value: project, onChange: (event) => { setProject(event.target.value); setModel(''); setTrendModel(''); }, children: [_jsx("option", { value: "", children: t('allProjects') }), snapshot.projects.map(item => _jsx("option", { value: item.id, children: item.title }, item.id))] }), _jsxs("select", { className: css.select, "aria-label": t('model'), value: model, onChange: (event) => { setModel(event.target.value); setTrendModel(''); }, children: [_jsx("option", { value: "", children: t('allModels') }), view.models.map(item => _jsx("option", { value: item, children: item }, item))] })] }), _jsxs("div", { className: css.status, children: [_jsx("span", { children: refreshing
                                                ? _jsxs(_Fragment, { children: [_jsx("i", { className: css.spinner }), t('refreshing'), _jsx(ProgressCount, { useProgress: useProgress, prefix: " " })] })
                                                : `${error ? t('staleAsOf') : t('updatedAt')} ${fmt.dateTime(snapshot.capturedAt)}` }), _jsx("button", { className: css.linkButton, disabled: refreshing, onClick: retry, children: t('refresh') }), _jsx("span", { className: css.divider }), _jsxs("button", { className: `${css.linkButton} ${issueCount > 0 ? css.qualityWarn : ''}`, "aria-expanded": qualityOpen, onClick: () => { setQualityOpen(!qualityOpen); }, title: `${view.unreadable} ${t('sessionsUnit')} / ${view.missing} ${t('turns')} / ${view.unattributed} ${t('unattributedShort')}`, children: [_jsx("i", { className: css.qualityDot }), t('dataQuality'), " \u00B7 ", issueCount] })] })] })] }), error && _jsxs("div", { className: css.notice, role: "alert", children: [snapshot ? t('staleError') : t('error'), " ", _jsx("button", { className: css.button, onClick: retry, children: t('retry') })] }), !snapshot && !error && _jsxs("div", { className: css.loading, role: "status", children: [_jsx("i", {}), t('loading'), _jsx(ProgressCount, { useProgress: useProgress, prefix: " \u00B7 " })] }), snapshot && view && _jsxs(_Fragment, { children: [qualityOpen && _jsx(QualityPanel, { issues: view.qualityIssues, refreshing: refreshing, onOpen: openSession, onRebuild: rebuild, fmt: fmt, t: t }), _jsxs("section", { className: css.summary, "aria-label": t('title'), children: [[
                                    [t('total'), fmt.amount(view.total), '', delta(view.total, view.prior)],
                                    [t('average'), fmt.amount(Math.round(view.total / view.daysInView)), '', delta(view.total, view.prior)],
                                    [t('peak'), fmt.amount(view.peak), '', delta(view.peak, view.priorPeak)],
                                    [t('active'), String(view.activeDays), t('days'), delta(view.activeDays, view.priorActiveDays)],
                                ].map(([label, value, unit, change]) => _jsxs("div", { className: css.stat, children: [_jsx("span", { children: label }), _jsxs("strong", { children: [value, unit && _jsx("small", { children: unit })] }), _jsx("small", { children: change === undefined ? t('noPrior') : _jsxs(_Fragment, { children: [t('compared'), " ", _jsxs("b", { children: [change.up ? '↑' : '↓', " ", change.text] })] }) })] }, label)), _jsxs("div", { className: css.stat, children: [_jsx("span", { children: t('cacheRate') }), _jsx("strong", { children: percent(view.cacheRate) }), _jsx("small", { children: view.cacheRate === undefined
                                                ? (view.selected.length > 0 ? t('cacheUnknown') : t('noPrior'))
                                                : view.cacheRateDelta === undefined ? t('noPrior')
                                                    : _jsxs(_Fragment, { children: [t('compared'), " ", _jsxs("b", { children: [view.cacheRateDelta >= 0 ? '↑' : '↓', " ", Math.abs(view.cacheRateDelta).toFixed(1), " ", t('percentagePoints')] })] }) })] })] }), _jsx(Heatmap, { records: view.scoped, years: view.heatYears, year: heatYear, today: view.today, selectedDay: selectedDay, onYearChange: value => { setHeatYear(value); setSelectedDay(undefined); }, onSelectDay: value => { setSelectedDay(current => current === value ? undefined : value); setTrendModel(''); }, fmt: fmt, t: t }), _jsxs("section", { className: css.card, children: [_jsxs("div", { className: css.cardHead, children: [_jsxs("div", { children: [_jsx("h2", { children: t('trend') }), _jsx("p", { children: t('trendNote') })] }), _jsxs("div", { className: css.cardControls, children: [_jsxs("select", { className: css.select, "aria-label": t('trendScope'), value: view.activeTrendModel, onChange: (event) => { setTrendModel(event.target.value); }, children: [_jsx("option", { value: "", children: t('allModels') }), view.trendModels.map(item => _jsx("option", { value: item, children: item }, item))] }), _jsx(Segments, { modes: ['daily', 'weekly', 'cumulative'], value: trend, onChange: setTrend, label: t })] })] }), view.trendRecords.length ? _jsx(TrendChart, { records: view.trendRecords, days: view.daysInView, anchorAt: view.anchor, mode: trend, metric: "input", label: `${t('input')} · ${view.activeTrendModel || t('allModels')}`, fmt: fmt, t: t }) : _jsx("p", { className: css.empty, children: t('noData') })] }), _jsxs("section", { className: css.card, children: [_jsxs("div", { className: css.cardHead, children: [_jsxs("div", { children: [_jsx("h2", { children: t('efficiency') }), _jsx("p", { children: t('efficiencyNote') })] }), _jsxs("div", { className: css.cardControls, children: [_jsxs("select", { className: css.select, "aria-label": t('trendScope'), value: view.activeEfficiencyModel, onChange: event => { setEfficiencyModel(event.target.value); }, children: [_jsx("option", { value: "", children: t('allModels') }), view.trendModels.map(item => _jsx("option", { value: item, children: item }, item))] }), _jsx(Segments, { modes: ['daily', 'weekly'], value: efficiencyMode, onChange: setEfficiencyMode, label: t })] })] }), _jsxs("div", { className: css.efficiencyStats, role: "tablist", "aria-label": t('efficiencyMetric'), children: [[
                                            ['turns', t('completedTurns'), fmt.integer(view.completedTurns)],
                                            ['averageInput', t('averageInputPerTurn'), view.averageInputPerTurn === undefined ? '—' : fmt.amount(view.averageInputPerTurn)],
                                            ['cacheRate', t('cacheReadShare'), percent(view.efficiencyCacheShare)],
                                        ].map(([metric, label, value]) => _jsxs("button", { role: "tab", "aria-selected": efficiencyMetric === metric, className: efficiencyMetric === metric ? css.metricActive : '', onClick: () => { setEfficiencyMetric(metric); }, children: [_jsx("span", { children: label }), _jsx("strong", { children: value })] }, metric)), _jsxs("div", { children: [_jsx(Tooltip, { label: t('coverageExplanation'), side: "top", portal: true, children: _jsxs("span", { children: [t('measuredCoverage'), " \u24D8"] }) }), _jsx("strong", { children: percent(view.coverage) })] })] }), view.efficiencyRecords.length ? _jsx(TrendChart, { records: view.efficiencyRecords, days: view.daysInView, anchorAt: view.anchor, mode: efficiencyMode, metric: efficiencyMetric, label: `${efficiencyLabel} · ${view.activeEfficiencyModel || t('allModels')}`, fmt: fmt, t: t })
                                    : _jsx("p", { className: css.empty, children: t('noData') })] }), _jsx(HourlyCard, { hourly: view.hourly, fmt: fmt, t: t }), _jsxs("div", { className: css.twoCols, children: [_jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('composition') }), _jsxs("div", { className: css.composition, children: [[
                                                    [t('uncached'), view.composition.uncached, COMPOSITION_COLORS[0]],
                                                    [t('cacheRead'), view.composition.cacheRead, COMPOSITION_COLORS[1]],
                                                    [t('cacheWrite'), view.composition.cacheWrite, COMPOSITION_COLORS[2]],
                                                    [t('output'), view.composition.output, COMPOSITION_COLORS[3]],
                                                    [t('unknownInput'), view.composition.other, COMPOSITION_COLORS[4]],
                                                ].filter(([, value]) => value > 0).map(([name, value, color]) => _jsx(Tooltip, { label: `${name}\n${fmt.integer(value)} ${t('tokenUnit')} · ${share(value, view.total)}`, side: "top", portal: true, children: _jsxs("div", { className: css.compRow, children: [_jsx("span", { children: name }), _jsx("div", { className: css.track, children: _jsx("span", { style: { width: `${view.total ? value / view.total * 100 : 0}%`, background: color } }) }), _jsxs("strong", { children: [fmt.amount(value), _jsx("small", { children: share(value, view.total) })] })] }) }, name)), view.total === 0 && _jsx("p", { className: css.empty, children: t('noData') })] })] }), _jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('models') }), _jsx(ShareDonut, { rows: view.modelRows, empty: t('noData'), other: t('other'), colors: MODEL_COLORS, unit: t('tokenUnit'), fmt: fmt })] }), _jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('projects') }), _jsx(RankBars, { rows: view.projectRows, empty: t('noData'), unit: t('tokenUnit'), fmt: fmt })] }), _jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('providers') }), _jsx(ShareDonut, { rows: view.providerRows, empty: t('noData'), other: t('other'), colors: PROVIDER_COLORS, unit: t('tokenUnit'), fmt: fmt })] })] }), _jsxs("section", { className: css.card, children: [_jsxs("div", { className: css.cardHead, children: [_jsx("h2", { children: t('sessions') }), _jsx(Segments, { modes: ['high', 'recent'], value: sessionMode, onChange: setSessionMode, label: mode => t(mode === 'high' ? 'highUsage' : 'recent') })] }), view.sessions.length === 0 ? _jsx("p", { className: css.empty, children: t('noData') }) : _jsx("div", { className: css.sessionList, children: view.sessions.map(({ session, total, route }, index) => _jsxs("button", { className: css.sessionRow, onClick: () => { openSession(session.id); }, title: t('openSession'), children: [_jsx("span", { className: css.sessionIndex, children: index + 1 }), _jsxs("span", { className: css.sessionText, children: [_jsx("strong", { children: session.title }), _jsxs("small", { children: [view.projectById.get(session.projectId ?? '') ?? unknown, " \u00B7 ", sessionMode === 'recent' ? `${t('lastChat')} ${fmt.dayShort(session.lastAt)}` : route] })] }), _jsxs("span", { className: css.sessionTotal, children: [_jsxs("span", { children: [fmt.amount(total), " ", t('tokenUnit')] }), _jsx("i", { className: css.sessionBar, children: _jsx("i", { style: { width: `${view.total ? total / view.total * 100 : 0}%` } }) })] }), _jsx("span", { className: css.sessionArrow, "aria-hidden": "true", children: "\u203A" })] }, session.id)) })] })] })] }) });
}
//# sourceMappingURL=UsagePage.js.map