import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Interactive charts over one Host observation of durable token usage. */
import { useEffect, useMemo, useState } from 'react';
import { Tooltip } from '@deepseek-ai/dsh-client-ui-primitives';
import { deriveDashboard, dayStart, shiftDay, streaks } from "./derive.js";
import css from './UsagePage.module.css';
const MODEL_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-model-${index})`);
const PROJECT_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-project-${index})`);
const PROVIDER_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-provider-${index})`);
const COMPOSITION_COLORS = Array.from({ length: 5 }, (_, index) => `var(--usage-composition-${index})`);
// Formatters are costly to construct; the heatmap alone formats hundreds of dates per render.
const INTEGER = new Intl.NumberFormat(undefined);
const DECIMAL = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });
const COMPACT = new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 });
const DAY_SHORT = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' });
const DAY_MEDIUM = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
const DAY_LONG = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
const DAY_NUMERIC = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' });
const MONTH_SHORT = new Intl.DateTimeFormat(undefined, { month: 'short' });
const DATE_TIME = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
function amount(value) {
    return (value >= 10_000 ? COMPACT : DECIMAL).format(value);
}
function percent(value) {
    return value === undefined ? '—' : `${value.toFixed(1)}%`;
}
function signed(value) {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}`;
}
function change(current, previous) {
    return previous > 0 ? `${signed((current - previous) / previous * 100)}%` : '—';
}
function share(value, total) {
    return `${(total ? value / total * 100 : 0).toFixed(1)}%`;
}
/** Subscribes to progress alone so 500 ms progress ticks do not re-render the dashboard. */
function ProgressCount({ useProgress, prefix }) {
    const progress = useProgress(state => state.progress);
    return _jsx(_Fragment, { children: progress?.total ? `${prefix}${progress.completed}/${progress.total}` : '' });
}
function TrendChart({ records, period, anchorAt, mode, metric, label, t }) {
    const [hovered, setHovered] = useState();
    const anchor = dayStart(anchorAt);
    const data = [];
    for (let offset = period - 1; offset >= 0; offset--) {
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
    const maximum = metric === 'cacheRate' ? 100 : Math.max(1, ...values.filter((value) => value !== undefined));
    const position = (index) => {
        const x = 68 + (points.length === 1 ? 345 : index * 690 / (points.length - 1));
        return { x, y: 150 - (values[index] ?? 0) / maximum * 120 };
    };
    const line = values.map((value, index) => value === undefined ? '' : `${index === 0 || values[index - 1] === undefined ? 'M' : 'L'} ${position(index).x} ${position(index).y}`).join(' ');
    const activeIndex = hovered !== undefined && hovered < points.length ? hovered : undefined;
    const active = activeIndex === undefined ? undefined : points[activeIndex];
    const activePosition = activeIndex === undefined ? undefined : position(activeIndex);
    const updateHover = (clientX, width, left) => {
        const x = (clientX - left) / width * 790;
        setHovered(points.length === 1 ? 0 : Math.max(0, Math.min(points.length - 1, Math.round((x - 68) / 690 * (points.length - 1)))));
    };
    const format = (value) => value === undefined ? '—'
        : metric === 'cacheRate' ? `${value.toFixed(1)}%`
            : `${(metric === 'averageInput' ? DECIMAL : INTEGER).format(value)} ${metric === 'turns' ? t('turns') : t('tokenUnit')}`;
    return _jsxs("div", { className: css.chartWrap, children: [_jsxs("svg", { className: css.chart, viewBox: "0 0 790 180", role: "img", "aria-label": label, tabIndex: 0, onPointerMove: event => { const bounds = event.currentTarget.getBoundingClientRect(); updateHover(event.clientX, bounds.width, bounds.left); }, onPointerLeave: () => { setHovered(undefined); }, onFocus: () => { setHovered(points.length - 1); }, onBlur: () => { setHovered(undefined); }, onKeyDown: event => {
                    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
                        return;
                    event.preventDefault();
                    setHovered(index => Math.max(0, Math.min(points.length - 1, (index ?? points.length - 1) + (event.key === 'ArrowLeft' ? -1 : 1))));
                }, children: [_jsx("rect", { width: "790", height: "180", fill: "transparent" }), [0, 1, 2, 3].map(tick => {
                        const y = 150 - tick * 40;
                        const value = maximum * tick / 3;
                        return _jsxs("g", { children: [_jsx("line", { x1: "68", x2: "758", y1: y, y2: y, className: css.gridLine }), _jsx("text", { x: "60", y: y + 4, textAnchor: "end", className: css.chartTick, children: metric === 'cacheRate' ? `${Math.round(value)}%` : amount(value) })] }, tick);
                    }), _jsx("path", { d: line, className: css.inputLine }), values.map((value, index) => value !== undefined && values[index - 1] === undefined && values[index + 1] === undefined
                        ? _jsx("circle", { cx: position(index).x, cy: position(index).y, r: "3", className: css.chartPoint }, index) : null), activePosition && _jsxs(_Fragment, { children: [_jsx("line", { x1: activePosition.x, x2: activePosition.x, y1: "30", y2: "150", className: css.chartGuide }), values[activeIndex ?? 0] !== undefined && _jsx("circle", { cx: activePosition.x, cy: activePosition.y, r: "5", className: css.chartPoint })] })] }), active && activePosition && _jsxs("div", { className: css.chartTooltip, style: { left: `${Math.max(10, Math.min(90, activePosition.x / 790 * 100))}%` }, role: "status", children: [_jsx("span", { children: mode === 'weekly' ? `${DAY_SHORT.format(active.at)} – ${DAY_SHORT.format(active.endAt)}` : DAY_MEDIUM.format(active.at) }), _jsxs("strong", { children: [label, " \u00B7 ", format(values[activeIndex ?? 0])] })] }), _jsxs("div", { className: css.chartAxis, children: [_jsx("span", { children: DAY_SHORT.format(points[0]?.at ?? anchor) }), _jsx("span", { children: DAY_SHORT.format(points.at(-1)?.endAt ?? anchor) })] })] });
}
function Heatmap({ records, years, year, today, selectedDay, onYearChange, onSelectDay, t }) {
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
                ? MONTH_SHORT.format(date) : '';
        });
        const active = [...totals].filter(([day, total]) => day >= first && day <= last && total > 0);
        const max = Math.max(1, ...active.map(([, total]) => total));
        const lastShown = Math.min(last, today);
        return { cells, weeks, months, max, first, lastShown, streak: streaks(active.map(([day]) => day), first, lastShown) };
    }, [records, year, today]);
    const { cells, weeks, months, max, first, lastShown, streak } = grid;
    // Exactly one cell is a tab stop; fall back to the range's last day when the selection or today is outside it.
    const tabStop = selectedDay !== undefined && selectedDay >= first && selectedDay <= lastShown ? selectedDay : lastShown;
    const size = { gridTemplateColumns: `repeat(${weeks}, minmax(var(--usage-heat-cell-size), 1fr))`, minWidth: `${weeks * 12 + (weeks - 1) * 3}px` };
    return _jsxs("section", { className: css.card, children: [_jsxs("div", { className: css.cardHead, children: [_jsxs("div", { children: [_jsx("h2", { children: t('heatmap') }), _jsx("p", { children: year === 'rolling' ? t('heatmapNote') : `${year} · ${t('oneCellDay')}` })] }), _jsxs("label", { className: css.heatYear, children: [t('heatmapRange'), _jsxs("select", { value: year, onChange: event => { onYearChange(event.target.value === 'rolling' ? 'rolling' : Number(event.target.value)); }, children: [_jsx("option", { value: "rolling", children: t('rollingYear') }), years.map(item => _jsx("option", { value: item, children: item }, item))] })] })] }), _jsxs("div", { className: css.heatScroll, children: [_jsx("div", { className: css.monthLabels, style: size, children: months.map((month, index) => _jsx("span", { children: month }, index)) }), _jsx("div", { className: css.heatmap, style: size, children: Array.from({ length: weeks }, (_, week) => _jsx("div", { className: css.heatWeek, children: cells.slice(week * 7, week * 7 + 7).map((cell, day) => {
                                // Square-root scale keeps ordinary days visible next to a single extreme peak.
                                const level = cell.total === 0 ? 0 : Math.min(4, Math.max(1, Math.ceil(Math.sqrt(cell.total / max) * 4)));
                                const detail = `${DAY_LONG.format(cell.at)}\n${INTEGER.format(cell.total)} ${t('tokenUnit')}`;
                                return _jsx(Tooltip, { label: detail, side: "top", portal: true, delayMs: 80, disabled: !cell.visible, children: _jsx("span", { className: `${css.heatCell} ${cell.visible ? css[`heat${level}`] : cell.future ? css.heatFuture : css.heatHidden} ${selectedDay === cell.at ? css.heatSelected : ''}`, role: cell.visible ? 'button' : undefined, tabIndex: cell.visible && cell.at === tabStop ? 0 : -1, "aria-label": cell.visible ? detail : undefined, "aria-pressed": cell.visible ? selectedDay === cell.at : undefined, onClick: () => { if (cell.visible)
                                            onSelectDay(cell.at); }, onKeyDown: event => {
                                            if (!cell.visible)
                                                return;
                                            if (event.key === 'Enter' || event.key === ' ') {
                                                event.preventDefault();
                                                onSelectDay(cell.at);
                                                return;
                                            }
                                            const delta = event.key === 'ArrowRight' ? 7 : event.key === 'ArrowLeft' ? -7
                                                : event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
                                            if (delta === 0)
                                                return;
                                            event.preventDefault();
                                            const target = cells[week * 7 + day + delta];
                                            if (target?.visible)
                                                event.currentTarget.closest(`.${css.heatmap}`)
                                                    ?.querySelector(`[data-day="${target.at}"]`)?.focus();
                                        }, "data-day": cell.at }) }, day);
                            }) }, week)) })] }), _jsxs("div", { className: css.heatFoot, children: [_jsxs("span", { children: [lastShown === today && _jsxs(_Fragment, { children: [t('currentStreak'), " ", _jsxs("strong", { children: [streak.current, " ", t('days')] }), " \u00B7 "] }), t('longestStreak'), " ", _jsxs("strong", { children: [streak.longest, " ", t('days')] })] }), _jsxs("span", { children: [t('less'), " ", _jsx("i", { className: css.heat0 }), _jsx("i", { className: css.heat1 }), _jsx("i", { className: css.heat2 }), _jsx("i", { className: css.heat3 }), _jsx("i", { className: css.heat4 }), " ", t('more')] })] })] });
}
function RankBars({ rows, empty, unit }) {
    const total = Math.max(1, rows.reduce((sum, row) => sum + row.total, 0));
    return rows.length === 0 ? _jsx("p", { className: css.empty, children: empty }) : _jsx("div", { className: css.rankList, children: rows.slice(0, 6).map((row, index) => _jsx(Tooltip, { label: `${row.name}\n${INTEGER.format(row.total)} ${unit} · ${share(row.total, total)}`, side: "top", portal: true, children: _jsxs("div", { className: css.rankRow, children: [_jsxs("div", { className: css.rankMeta, children: [_jsx("span", { children: row.name }), _jsxs("strong", { children: [amount(row.total), " \u00B7 ", share(row.total, total)] })] }), _jsx("div", { className: css.track, children: _jsx("span", { style: { width: `${row.total / total * 100}%`, background: PROJECT_COLORS[index % PROJECT_COLORS.length] } }) })] }) }, row.name)) });
}
function ShareDonut({ rows, empty, other, colors, unit }) {
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
    const detail = (row) => `${row.name}\n${INTEGER.format(row.total)} ${unit} · ${share(row.total, total)}`;
    const onDonutMove = (clientX, clientY, element) => {
        const bounds = element.getBoundingClientRect();
        const angle = (Math.atan2(clientX - bounds.left - bounds.width / 2, -(clientY - bounds.top - bounds.height / 2)) + 2 * Math.PI) % (2 * Math.PI);
        const portion = angle / (2 * Math.PI) * total;
        let used = 0;
        setHovered(shown.findIndex(row => (used += row.total) > portion));
    };
    return _jsxs("div", { className: css.share, children: [_jsx(Tooltip, { label: hovered === undefined || hovered < 0 ? `${INTEGER.format(total)} ${unit}` : detail(shown[hovered]), side: "top", portal: true, children: _jsx("div", { className: css.donut, style: { background: `conic-gradient(${stops.join(', ')})` }, onPointerMove: event => { onDonutMove(event.clientX, event.clientY, event.currentTarget); }, onPointerLeave: () => { setHovered(undefined); }, children: _jsx("span", { children: amount(total) }) }) }), _jsx("div", { className: css.shareLegend, children: shown.map((row, index) => _jsx(Tooltip, { label: detail(row), side: "top", portal: true, children: _jsxs("div", { children: [_jsx("i", { style: { background: colors[index % colors.length] } }), _jsx("span", { children: row.name }), _jsx("strong", { children: share(row.total, total) })] }) }, `${index}:${row.name}`)) })] });
}
function QualityPanel({ issues, refreshing, onOpen, onRebuild, t }) {
    const groups = [
        ['unreadable-session', t('unreadableSessions'), t('unreadableExplanation')],
        ['missing-turn', t('missingTurns'), t('missingExplanation')],
        ['unattributed-turn', t('unattributedTurns'), t('unattributedExplanation')],
    ];
    return _jsxs("section", { className: css.qualityPanel, "aria-label": t('dataQuality'), children: [_jsxs("div", { className: css.qualityHead, children: [_jsx("p", { children: t('qualityIntro') }), _jsx("button", { disabled: refreshing, onClick: onRebuild, children: t('rebuild') })] }), groups.map(([kind, label, explanation]) => {
                const own = issues.filter(issue => issue.kind === kind);
                const sessions = new Map();
                for (const issue of own) {
                    const previous = sessions.get(issue.sessionId);
                    const at = Math.max(previous?.at ?? 0, issue.at ?? 0) || undefined;
                    sessions.set(issue.sessionId, { title: issue.title, count: (previous?.count ?? 0) + 1,
                        ...(at === undefined ? {} : { at }) });
                }
                return _jsxs("div", { className: css.qualityGroup, children: [_jsxs("div", { className: css.qualityGroupHead, children: [_jsxs("strong", { children: [label, " \u00B7 ", own.length] }), _jsx("span", { children: explanation })] }), sessions.size > 0 && _jsx("div", { className: css.qualityList, children: [...sessions].sort((a, b) => (b[1].at ?? 0) - (a[1].at ?? 0)).map(([id, item]) => _jsxs("button", { onClick: () => { onOpen(id); }, children: [_jsx("span", { children: item.title }), _jsx("small", { children: kind === 'unreadable-session' ? t('openSession') : `${item.count} ${t('turns')}${item.at === undefined ? '' : ` · ${DAY_SHORT.format(item.at)}`}` })] }, id)) })] }, kind);
            })] });
}
/** Render token activity, trends, breakdowns, and session navigation. @param props - localized page services. @returns dashboard. */
export function UsagePage({ useUsage, useProgress, activate, retry, rebuild, openSession, t }) {
    const snapshot = useUsage(state => state.snapshot);
    const error = useUsage(state => state.error);
    const refreshing = useUsage(state => state.refreshing);
    const [period, setPeriod] = useState(30);
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
    const unknown = t('unknown');
    const view = useMemo(() => snapshot === undefined ? undefined : deriveDashboard(snapshot, { period, selectedDay, project, model, trendModel, efficiencyModel, sessionMode }, unknown), [snapshot, period, selectedDay, project, model, trendModel, efficiencyModel, sessionMode, unknown]);
    const efficiencyLabel = efficiencyMetric === 'turns' ? t('completedTurns')
        : efficiencyMetric === 'averageInput' ? t('averageInputPerTurn') : t('cacheReadShare');
    return _jsx("main", { className: css.page, children: _jsxs("div", { className: css.content, children: [_jsx("header", { className: css.pageHead, children: _jsxs("div", { children: [_jsx("h1", { children: t('title') }), _jsx("p", { children: t('subtitle') })] }) }), error && _jsxs("div", { className: css.notice, role: "alert", children: [snapshot ? t('staleError') : t('error'), " ", _jsx("button", { onClick: retry, children: t('retry') })] }), !snapshot && !error && _jsxs("div", { className: css.loading, role: "status", children: [_jsx("i", {}), t('loading'), _jsx(ProgressCount, { useProgress: useProgress, prefix: " \u00B7 " })] }), snapshot && view && _jsxs(_Fragment, { children: [_jsxs("div", { className: css.toolbar, children: [_jsxs("div", { className: css.toolbarStatus, children: [_jsx("span", { children: refreshing
                                                ? _jsxs(_Fragment, { children: [t('refreshing'), _jsx(ProgressCount, { useProgress: useProgress, prefix: " " })] })
                                                : `${error ? t('staleAsOf') : t('updatedAt')} ${DATE_TIME.format(snapshot.capturedAt)}` }), _jsx("button", { disabled: refreshing, onClick: retry, children: t('refresh') }), _jsxs("button", { className: css.qualityToggle, "aria-expanded": qualityOpen, onClick: () => { setQualityOpen(!qualityOpen); }, children: [t('dataQuality'), " \u00B7 ", view.unreadable, " ", t('sessionsUnit'), " / ", view.missing, " ", t('turns'), " / ", view.unattributed, " ", t('unattributedShort')] })] }), _jsxs("div", { className: css.filters, children: [_jsxs("label", { children: [t('period'), _jsxs("select", { value: selectedDay === undefined ? period : 'selected', onChange: (event) => { setSelectedDay(undefined); setPeriod(Number(event.target.value)); setTrendModel(''); }, children: [selectedDay !== undefined && _jsx("option", { value: "selected", children: DAY_NUMERIC.format(selectedDay) }), _jsx("option", { value: 7, children: t('days7') }), _jsx("option", { value: 30, children: t('days30') }), _jsx("option", { value: 90, children: t('days90') }), _jsx("option", { value: 365, children: t('days365') })] })] }), _jsxs("label", { children: [t('project'), _jsxs("select", { value: project, onChange: (event) => { setProject(event.target.value); setModel(''); setTrendModel(''); }, children: [_jsx("option", { value: "", children: t('allProjects') }), snapshot.projects.map(item => _jsx("option", { value: item.id, children: item.title }, item.id))] })] }), _jsxs("label", { children: [t('model'), _jsxs("select", { value: model, onChange: (event) => { setModel(event.target.value); setTrendModel(''); }, children: [_jsx("option", { value: "", children: t('allModels') }), view.models.map(item => _jsx("option", { value: item, children: item }, item))] })] })] })] }), selectedDay !== undefined && _jsx("button", { className: css.clearDay, onClick: () => { setSelectedDay(undefined); }, children: t('clearDay') }), qualityOpen && _jsx(QualityPanel, { issues: view.qualityIssues, refreshing: refreshing, onOpen: openSession, onRebuild: rebuild, t: t }), _jsx("section", { className: css.summary, "aria-label": t('title'), children: [
                                [t('total'), amount(view.total), `${t('compared')} ${change(view.total, view.prior)}`],
                                [t('average'), amount(Math.round(view.total / view.daysInView)), `${t('compared')} ${change(view.total, view.prior)}`],
                                [t('peak'), amount(view.peak), `${t('compared')} ${change(view.peak, view.priorPeak)}`],
                                [t('active'), `${view.activeDays} ${t('days')}`, `${t('compared')} ${change(view.activeDays, view.priorActiveDays)}`],
                                [t('cacheRate'), percent(view.cacheRate), `${t('compared')} ${view.cacheRateDelta === undefined ? '—' : `${signed(view.cacheRateDelta)} ${t('percentagePoints')}`}`],
                            ].map(([label, value, note]) => _jsxs("div", { className: css.stat, children: [_jsx("span", { children: label }), _jsx("strong", { children: value }), _jsx("small", { children: note })] }, label)) }), _jsx(Heatmap, { records: view.scoped, years: view.heatYears, year: heatYear, today: view.today, selectedDay: selectedDay, onYearChange: value => { setHeatYear(value); setSelectedDay(undefined); }, onSelectDay: value => { setSelectedDay(current => current === value ? undefined : value); setTrendModel(''); }, t: t }), _jsxs("section", { className: css.card, children: [_jsxs("div", { className: css.cardHead, children: [_jsxs("div", { children: [_jsx("h2", { children: t('trend') }), _jsx("p", { children: t('trendNote') })] }), _jsxs("div", { className: css.trendControls, children: [_jsxs("label", { className: css.trendSelect, children: [t('trendScope'), _jsxs("select", { value: view.activeTrendModel, onChange: (event) => { setTrendModel(event.target.value); }, children: [_jsx("option", { value: "", children: t('trendTotal') }), view.trendModels.map(item => _jsx("option", { value: item, children: item }, item))] })] }), _jsx("div", { className: css.segments, children: ['daily', 'weekly', 'cumulative'].map(mode => _jsx("button", { className: trend === mode ? css.selected : '', onClick: () => { setTrend(mode); }, children: t(mode) }, mode)) })] })] }), _jsxs("div", { className: css.legend, children: [_jsx("span", { className: css.inputDot }), t('input')] }), view.trendRecords.length ? _jsx(TrendChart, { records: view.trendRecords, period: view.daysInView, anchorAt: view.anchor, mode: trend, metric: "input", label: `${t('input')} · ${view.activeTrendModel || t('trendTotal')}`, t: t }) : _jsx("p", { className: css.empty, children: t('noData') })] }), _jsxs("section", { className: css.card, children: [_jsxs("div", { className: css.cardHead, children: [_jsxs("div", { children: [_jsx("h2", { children: t('efficiency') }), _jsx("p", { children: t('efficiencyNote') })] }), _jsxs("div", { className: css.trendControls, children: [_jsxs("label", { className: css.trendSelect, children: [t('trendScope'), _jsxs("select", { value: view.activeEfficiencyModel, onChange: event => { setEfficiencyModel(event.target.value); }, children: [_jsx("option", { value: "", children: t('trendTotal') }), view.trendModels.map(item => _jsx("option", { value: item, children: item }, item))] })] }), _jsxs("label", { className: css.trendSelect, children: [t('efficiencyMetric'), _jsxs("select", { value: efficiencyMetric, onChange: event => { setEfficiencyMetric(event.target.value); }, children: [_jsx("option", { value: "turns", children: t('completedTurns') }), _jsx("option", { value: "averageInput", children: t('averageInputPerTurn') }), _jsx("option", { value: "cacheRate", children: t('cacheReadShare') })] })] }), _jsx("div", { className: css.segments, children: ['daily', 'weekly'].map(mode => _jsx("button", { className: efficiencyMode === mode ? css.selected : '', onClick: () => { setEfficiencyMode(mode); }, children: t(mode) }, mode)) })] })] }), _jsxs("div", { className: css.efficiencyStats, children: [_jsxs("div", { children: [_jsx("span", { children: t('completedTurns') }), _jsx("strong", { children: INTEGER.format(view.completedTurns) })] }), _jsxs("div", { children: [_jsx("span", { children: t('averageInputPerTurn') }), _jsx("strong", { children: view.averageInputPerTurn === undefined ? '—' : amount(view.averageInputPerTurn) })] }), _jsxs("div", { children: [_jsx("span", { children: t('cacheReadShare') }), _jsx("strong", { children: percent(view.efficiencyCacheShare) })] }), _jsxs("div", { children: [_jsx(Tooltip, { label: t('coverageExplanation'), side: "top", portal: true, children: _jsxs("span", { children: [t('measuredCoverage'), " \u24D8"] }) }), _jsx("strong", { children: percent(view.coverage) })] })] }), view.efficiencyRecords.length ? _jsx(TrendChart, { records: view.efficiencyRecords, period: view.daysInView, anchorAt: view.anchor, mode: efficiencyMode, metric: efficiencyMetric, label: `${efficiencyLabel} · ${view.activeEfficiencyModel || t('trendTotal')}`, t: t })
                                    : _jsx("p", { className: css.empty, children: t('noData') })] }), _jsxs("div", { className: css.twoCols, children: [_jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('composition') }), _jsx("div", { className: css.composition, children: [
                                                [t('uncached'), view.composition.uncached],
                                                [t('cacheRead'), view.composition.cacheRead],
                                                [t('cacheWrite'), view.composition.cacheWrite],
                                                [t('output'), view.composition.output],
                                                [t('unknownInput'), view.composition.other],
                                            ].map(([name, value], index) => _jsx(Tooltip, { label: `${name}\n${INTEGER.format(value)} ${t('tokenUnit')} · ${share(value, view.total)}`, side: "top", portal: true, children: _jsxs("div", { className: css.compRow, children: [_jsx("span", { children: name }), _jsx("div", { className: css.track, children: _jsx("span", { style: { width: `${view.total ? value / view.total * 100 : 0}%`, background: COMPOSITION_COLORS[index] } }) }), _jsx("strong", { children: amount(value) })] }) }, name)) })] }), _jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('models') }), _jsx(ShareDonut, { rows: view.modelRows, empty: t('noData'), other: t('other'), colors: MODEL_COLORS, unit: t('tokenUnit') })] }), _jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('projects') }), _jsx(RankBars, { rows: view.projectRows, empty: t('noData'), unit: t('tokenUnit') })] }), _jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('providers') }), _jsx(ShareDonut, { rows: view.providerRows, empty: t('noData'), other: t('other'), colors: PROVIDER_COLORS, unit: t('tokenUnit') })] })] }), _jsxs("section", { className: css.card, children: [_jsxs("div", { className: css.cardHead, children: [_jsx("h2", { children: t('sessions') }), _jsxs("div", { className: css.segments, children: [_jsx("button", { className: sessionMode === 'high' ? css.selected : '', onClick: () => { setSessionMode('high'); }, children: t('highUsage') }), _jsx("button", { className: sessionMode === 'recent' ? css.selected : '', onClick: () => { setSessionMode('recent'); }, children: t('recent') })] })] }), view.sessions.length === 0 ? _jsx("p", { className: css.empty, children: t('noData') }) : _jsx("div", { className: css.sessionList, children: view.sessions.map(({ session, total, route }, index) => _jsxs("button", { className: css.sessionRow, onClick: () => { openSession(session.id); }, title: t('openSession'), children: [_jsx("span", { className: css.sessionIndex, children: index + 1 }), _jsxs("span", { className: css.sessionText, children: [_jsx("strong", { children: session.title }), _jsxs("small", { children: [view.projectById.get(session.projectId ?? '') ?? unknown, " \u00B7 ", sessionMode === 'recent' ? `${t('lastChat')} ${DAY_SHORT.format(session.lastAt)}` : route] })] }), _jsxs("span", { className: css.sessionTotal, children: [amount(total), " ", t('tokenUnit')] })] }, session.id)) })] })] })] }) });
}
//# sourceMappingURL=UsagePage.js.map