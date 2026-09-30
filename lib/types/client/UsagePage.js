import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/** Interactive charts over one Host observation of durable token usage. */
import { useEffect, useMemo, useState } from 'react';
import { Tooltip } from '@deepseek-ai/dsh-client-ui-primitives';
import css from './UsagePage.module.css';
const MODEL_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-model-${index})`);
const PROJECT_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-project-${index})`);
const PROVIDER_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-provider-${index})`);
const COMPOSITION_COLORS = Array.from({ length: 5 }, (_, index) => `var(--usage-composition-${index})`);
function dayStart(time) {
    const date = new Date(time);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}
function dayLabel(time) {
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(time);
}
function amount(value) {
    return new Intl.NumberFormat(undefined, { notation: value >= 10_000 ? 'compact' : 'standard', maximumFractionDigits: 1 }).format(value);
}
function change(current, previous) {
    return previous > 0 ? `${current >= previous ? '+' : ''}${((current - previous) / previous * 100).toFixed(1)}%` : '—';
}
function grouped(records, getName) {
    const sums = new Map();
    for (const record of records) {
        const name = getName(record);
        sums.set(name, (sums.get(name) ?? 0) + record.totalTokens);
    }
    return [...sums].map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total);
}
function streaks(days) {
    const active = new Set(days);
    const today = dayStart(Date.now());
    let current = 0;
    let cursor = active.has(today) ? today : new Date(today).setDate(new Date(today).getDate() - 1);
    while (active.has(cursor)) {
        current++;
        const date = new Date(cursor);
        cursor = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1).getTime();
    }
    let longest = 0;
    let run = 0;
    const first = new Date(today);
    first.setDate(first.getDate() - 364);
    for (let offset = 0; offset < 365; offset++) {
        const date = new Date(first.getFullYear(), first.getMonth(), first.getDate() + offset);
        run = active.has(date.getTime()) ? run + 1 : 0;
        longest = Math.max(longest, run);
    }
    return { current, longest };
}
function TrendChart({ records, period, anchorAt, mode, metric, label, t }) {
    const [hovered, setHovered] = useState();
    const anchor = dayStart(anchorAt);
    const data = [];
    for (let offset = period - 1; offset >= 0; offset--) {
        const date = new Date(anchor);
        const at = new Date(date.getFullYear(), date.getMonth(), date.getDate() - offset).getTime();
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
            const date = new Date(item.at);
            const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() + 6) % 7).getTime();
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
    const valueOf = (point) => {
        if (metric === 'turns')
            return point.turns;
        if (metric === 'averageInput')
            return point.turns ? point.input / point.turns : 0;
        if (metric === 'cacheRate')
            return point.turns && !point.cacheKnown ? undefined : point.input ? point.cacheRead / point.input * 100 : 0;
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
            : `${new Intl.NumberFormat(undefined, { maximumFractionDigits: metric === 'averageInput' ? 1 : 0 }).format(value)} ${metric === 'turns' ? t('turns') : t('tokenUnit')}`;
    return _jsxs("div", { className: css.chartWrap, children: [_jsxs("svg", { className: css.chart, viewBox: "0 0 790 180", role: "img", "aria-label": label, tabIndex: 0, onPointerMove: event => { const bounds = event.currentTarget.getBoundingClientRect(); updateHover(event.clientX, bounds.width, bounds.left); }, onPointerLeave: () => { setHovered(undefined); }, onFocus: () => { setHovered(points.length - 1); }, onBlur: () => { setHovered(undefined); }, onKeyDown: event => {
                    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
                        return;
                    event.preventDefault();
                    setHovered(index => Math.max(0, Math.min(points.length - 1, (index ?? points.length - 1) + (event.key === 'ArrowLeft' ? -1 : 1))));
                }, children: [_jsx("rect", { width: "790", height: "180", fill: "transparent" }), [0, 1, 2, 3].map(tick => {
                        const y = 150 - tick * 40;
                        const value = maximum * tick / 3;
                        return _jsxs("g", { children: [_jsx("line", { x1: "68", x2: "758", y1: y, y2: y, className: css.gridLine }), _jsx("text", { x: "60", y: y + 4, textAnchor: "end", className: css.chartTick, children: metric === 'cacheRate' ? `${Math.round(value)}%` : amount(value) })] }, tick);
                    }), _jsx("path", { d: line, className: css.inputLine }), points.length === 1 && values[0] !== undefined && _jsx("circle", { cx: position(0).x, cy: position(0).y, r: "3", className: css.chartPoint }), activePosition && _jsxs(_Fragment, { children: [_jsx("line", { x1: activePosition.x, x2: activePosition.x, y1: "30", y2: "150", className: css.chartGuide }), values[activeIndex ?? 0] !== undefined && _jsx("circle", { cx: activePosition.x, cy: activePosition.y, r: "5", className: css.chartPoint })] })] }), active && activePosition && _jsxs("div", { className: css.chartTooltip, style: { left: `${Math.max(10, Math.min(90, activePosition.x / 790 * 100))}%` }, role: "status", children: [_jsx("span", { children: mode === 'weekly' ? `${dayLabel(active.at)} – ${dayLabel(active.endAt)}` : new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(active.at) }), _jsxs("strong", { children: [label, " \u00B7 ", format(values[activeIndex ?? 0])] })] }), _jsxs("div", { className: css.chartAxis, children: [_jsx("span", { children: dayLabel(points[0]?.at ?? anchor) }), _jsx("span", { children: dayLabel(points.at(-1)?.endAt ?? anchor) })] })] });
}
function Heatmap({ records, years, year, selectedDay, onYearChange, onSelectDay, t }) {
    const totals = new Map();
    for (const record of records) {
        const day = dayStart(record.at);
        totals.set(day, (totals.get(day) ?? 0) + record.totalTokens);
    }
    const today = dayStart(Date.now());
    const first = year === 'rolling'
        ? new Date(new Date(today).getFullYear(), new Date(today).getMonth(), new Date(today).getDate() - 364)
        : new Date(year, 0, 1);
    const last = year === 'rolling' ? today : new Date(year, 11, 31).getTime();
    const start = new Date(first.getFullYear(), first.getMonth(), first.getDate() - first.getDay());
    const cells = [];
    for (const day = new Date(start); day.getTime() <= last; day.setDate(day.getDate() + 1)) {
        cells.push({ at: day.getTime(), total: totals.get(day.getTime()) ?? 0,
            visible: day.getTime() >= first.getTime() && day.getTime() <= today,
            future: day.getTime() >= first.getTime() && day.getTime() > today });
    }
    while (cells.length % 7 !== 0)
        cells.push({ at: today, total: 0, visible: false, future: false });
    const weeks = cells.length / 7;
    const months = Array.from({ length: weeks }, (_, week) => {
        const cell = cells[week * 7];
        if (cell === undefined)
            return '';
        const date = new Date(Math.max(cell.at, first.getTime()));
        const previousCell = week === 0 ? undefined : cells[(week - 1) * 7];
        const previous = previousCell === undefined ? undefined : new Date(Math.max(previousCell.at, first.getTime()));
        return previous === undefined || date.getMonth() !== previous.getMonth()
            ? new Intl.DateTimeFormat(undefined, { month: 'short' }).format(date)
            : '';
    });
    const active = [...totals].filter(([day, total]) => day >= first.getTime() && day <= last && total > 0);
    const max = Math.max(1, ...active.map(([, total]) => total));
    const streak = streaks(active.map(([day]) => day));
    return _jsxs("section", { className: css.card, children: [_jsxs("div", { className: css.cardHead, children: [_jsxs("div", { children: [_jsx("h2", { children: t('heatmap') }), _jsx("p", { children: year === 'rolling' ? t('heatmapNote') : `${year} · ${t('oneCellDay')}` })] }), _jsxs("label", { className: css.heatYear, children: [t('heatmapRange'), _jsxs("select", { value: year, onChange: event => { onYearChange(event.target.value === 'rolling' ? 'rolling' : Number(event.target.value)); }, children: [_jsx("option", { value: "rolling", children: t('rollingYear') }), years.map(item => _jsx("option", { value: item, children: item }, item))] })] })] }), _jsxs("div", { className: css.heatScroll, children: [_jsx("div", { className: css.monthLabels, style: { gridTemplateColumns: `repeat(${weeks}, minmax(var(--usage-heat-cell-size), 1fr))`, minWidth: `${weeks * 12 + (weeks - 1) * 3}px` }, children: months.map((month, index) => _jsx("span", { children: month }, index)) }), _jsx("div", { className: css.heatmap, style: { gridTemplateColumns: `repeat(${weeks}, minmax(var(--usage-heat-cell-size), 1fr))`, minWidth: `${weeks * 12 + (weeks - 1) * 3}px` }, children: Array.from({ length: weeks }, (_, week) => _jsx("div", { className: css.heatWeek, children: cells.slice(week * 7, week * 7 + 7).map((cell, day) => {
                                const level = cell.total === 0 ? 0 : Math.max(1, Math.ceil(cell.total / max * 4));
                                const date = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric' }).format(cell.at);
                                const detail = `${date}\n${new Intl.NumberFormat(undefined).format(cell.total)} ${t('tokenUnit')}`;
                                return _jsx(Tooltip, { label: detail, side: "top", portal: true, delayMs: 80, disabled: !cell.visible, children: _jsx("span", { className: `${css.heatCell} ${cell.visible ? css[`heat${level}`] : cell.future ? css.heatFuture : css.heatHidden} ${selectedDay === cell.at ? css.heatSelected : ''}`, role: cell.visible ? 'button' : undefined, tabIndex: cell.visible && (cell.at === (selectedDay ?? today)) ? 0 : -1, "aria-label": cell.visible ? detail : undefined, "aria-pressed": cell.visible ? selectedDay === cell.at : undefined, onClick: () => { if (cell.visible)
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
                            }) }, week)) })] }), _jsxs("div", { className: css.heatFoot, children: [_jsxs("span", { children: [t('currentStreak'), " ", _jsxs("strong", { children: [streak.current, " ", t('days')] }), " \u00B7 ", t('longestStreak'), " ", _jsxs("strong", { children: [streak.longest, " ", t('days')] })] }), _jsxs("span", { children: [t('less'), " ", _jsx("i", { className: css.heat0 }), _jsx("i", { className: css.heat1 }), _jsx("i", { className: css.heat2 }), _jsx("i", { className: css.heat3 }), _jsx("i", { className: css.heat4 }), " ", t('more')] })] })] });
}
function RankBars({ rows, empty, unit }) {
    const total = Math.max(1, rows.reduce((sum, row) => sum + row.total, 0));
    return rows.length === 0 ? _jsx("p", { className: css.empty, children: empty }) : _jsx("div", { className: css.rankList, children: rows.slice(0, 6).map((row, index) => _jsx(Tooltip, { label: `${row.name}\n${new Intl.NumberFormat(undefined).format(row.total)} ${unit} · ${(row.total / total * 100).toFixed(1)}%`, side: "top", portal: true, children: _jsxs("div", { className: css.rankRow, children: [_jsxs("div", { className: css.rankMeta, children: [_jsx("span", { children: row.name }), _jsxs("strong", { children: [amount(row.total), " \u00B7 ", (row.total / total * 100).toFixed(1), "%"] })] }), _jsx("div", { className: css.track, children: _jsx("span", { style: { width: `${row.total / total * 100}%`, background: PROJECT_COLORS[index % PROJECT_COLORS.length] } }) })] }) }, row.name)) });
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
    const detail = (row) => `${row.name}\n${new Intl.NumberFormat(undefined).format(row.total)} ${unit} · ${(row.total / total * 100).toFixed(1)}%`;
    const onDonutMove = (clientX, clientY, element) => {
        const bounds = element.getBoundingClientRect();
        const angle = (Math.atan2(clientX - bounds.left - bounds.width / 2, -(clientY - bounds.top - bounds.height / 2)) + 2 * Math.PI) % (2 * Math.PI);
        const share = angle / (2 * Math.PI) * total;
        let used = 0;
        setHovered(shown.findIndex(row => (used += row.total) > share));
    };
    return _jsxs("div", { className: css.share, children: [_jsx(Tooltip, { label: hovered === undefined || hovered < 0 ? `${new Intl.NumberFormat(undefined).format(total)} ${unit}` : detail(shown[hovered]), side: "top", portal: true, children: _jsx("div", { className: css.donut, style: { background: `conic-gradient(${stops.join(', ')})` }, onPointerMove: event => { onDonutMove(event.clientX, event.clientY, event.currentTarget); }, onPointerLeave: () => { setHovered(undefined); }, children: _jsx("span", { children: amount(total) }) }) }), _jsx("div", { className: css.shareLegend, children: shown.map((row, index) => _jsx(Tooltip, { label: detail(row), side: "top", portal: true, children: _jsxs("div", { children: [_jsx("i", { style: { background: colors[index % colors.length] } }), _jsx("span", { children: row.name }), _jsxs("strong", { children: [(row.total / total * 100).toFixed(1), "%"] })] }) }, `${index}:${row.name}`)) })] });
}
function sessionRoute(records, id, unknown) {
    const own = records.filter(record => record.sessionId === id);
    const provider = grouped(own, record => record.provider ?? unknown)[0]?.name ?? unknown;
    const model = grouped(own, record => record.model ?? unknown)[0]?.name ?? unknown;
    return `${provider} / ${model}`;
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
                return _jsxs("div", { className: css.qualityGroup, children: [_jsxs("div", { className: css.qualityGroupHead, children: [_jsxs("strong", { children: [label, " \u00B7 ", own.length] }), _jsx("span", { children: explanation })] }), sessions.size > 0 && _jsx("div", { className: css.qualityList, children: [...sessions].sort((a, b) => (b[1].at ?? 0) - (a[1].at ?? 0)).map(([id, item]) => _jsxs("button", { onClick: () => { onOpen(id); }, children: [_jsx("span", { children: item.title }), _jsx("small", { children: kind === 'unreadable-session' ? t('openSession') : `${item.count} ${t('turns')}${item.at === undefined ? '' : ` · ${dayLabel(item.at)}`}` })] }, id)) })] }, kind);
            })] });
}
/** Render token activity, trends, breakdowns, and session navigation. @param props - localized page services. @returns dashboard. */
export function UsagePage({ useUsage, activate, retry, rebuild, openSession, t }) {
    const { snapshot, error, refreshing, progress } = useUsage(state => state);
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
    const now = snapshot?.capturedAt ?? Date.now();
    const today = dayStart(now);
    const anchor = selectedDay ?? today;
    const anchorDate = new Date(anchor);
    const daysInView = selectedDay === undefined ? period : 1;
    const start = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), anchorDate.getDate() - daysInView + 1).getTime();
    const end = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), anchorDate.getDate() + 1).getTime();
    const previousStart = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), anchorDate.getDate() - 2 * daysInView + 1).getTime();
    const sessionById = useMemo(() => new Map(snapshot?.sessions.map(session => [session.id, session]) ?? []), [snapshot]);
    const projectById = useMemo(() => new Map(snapshot?.projects.map(item => [item.id, item.title]) ?? []), [snapshot]);
    const projectRecords = (snapshot?.records ?? []).filter(record => !project || sessionById.get(record.sessionId)?.projectId === project);
    const models = [...new Set(projectRecords.map(record => record.model).filter((value) => value !== undefined))].sort();
    const scoped = projectRecords.filter(record => !model || record.model === model);
    const selected = scoped.filter(record => record.at >= start && record.at < end);
    const trendModels = [...new Set(selected.map(record => record.model).filter((value) => value !== undefined))].sort();
    const activeTrendModel = trendModels.includes(trendModel) ? trendModel : '';
    const trendRecords = selected.filter(record => !activeTrendModel || record.model === activeTrendModel);
    const activeEfficiencyModel = trendModels.includes(efficiencyModel) ? efficiencyModel : '';
    const efficiencyRecords = selected.filter(record => !activeEfficiencyModel || record.model === activeEfficiencyModel);
    const efficiencyInput = efficiencyRecords.reduce((sum, record) => sum + record.totalTokens - record.outputTokens, 0);
    const efficiencyCacheKnown = efficiencyRecords.length > 0 && efficiencyRecords.every(record => record.cacheReadTokens !== undefined);
    const efficiencyCacheShare = efficiencyCacheKnown && efficiencyInput > 0
        ? `${(efficiencyRecords.reduce((sum, record) => sum + (record.cacheReadTokens ?? 0), 0) / efficiencyInput * 100).toFixed(1)}%` : '—';
    const previous = scoped.filter(record => record.at >= previousStart && record.at < start);
    const allHeat = scoped;
    const total = selected.reduce((sum, record) => sum + record.totalTokens, 0);
    const prior = previous.reduce((sum, record) => sum + record.totalTokens, 0);
    const dayTotals = grouped(selected, record => String(dayStart(record.at)));
    const peak = Math.max(0, ...dayTotals.map(day => day.total));
    const priorDays = grouped(previous, record => String(dayStart(record.at)));
    const priorPeak = Math.max(0, ...priorDays.map(day => day.total));
    const cacheComplete = selected.length > 0 && selected.every(record => record.cacheReadTokens !== undefined);
    const cacheRead = selected.reduce((sum, record) => sum + (record.cacheReadTokens ?? 0), 0);
    const prompt = selected.reduce((sum, record) => sum + record.totalTokens - record.outputTokens, 0);
    const cacheRate = cacheComplete && prompt > 0 ? `${(cacheRead / prompt * 100).toFixed(1)}%` : '—';
    const previousCacheComplete = previous.length > 0 && previous.every(record => record.cacheReadTokens !== undefined);
    const previousPrompt = previous.reduce((sum, record) => sum + record.totalTokens - record.outputTokens, 0);
    const previousRate = previousCacheComplete && previousPrompt > 0
        ? previous.reduce((sum, record) => sum + (record.cacheReadTokens ?? 0), 0) / previousPrompt * 100
        : undefined;
    const cacheDelta = previousRate === undefined || cacheRate === '—' ? '—' : `${(Number.parseFloat(cacheRate) - previousRate).toFixed(1)} ${t('percentagePoints')}`;
    const projectIssues = (snapshot?.issues ?? []).filter(issue => !project || issue.projectId === project);
    const qualityIssues = projectIssues.filter(issue => issue.at === undefined || (issue.at >= start && issue.at < end));
    const unreadableIssues = qualityIssues.filter(issue => issue.kind === 'unreadable-session');
    const missingIssues = qualityIssues.filter(issue => issue.kind === 'missing-turn');
    const unattributedIssues = qualityIssues.filter(issue => issue.kind === 'unattributed-turn');
    const completedTurns = efficiencyRecords.length;
    const averageInputPerTurn = completedTurns ? efficiencyInput / completedTurns : 0;
    const coverage = !model && !activeEfficiencyModel && unreadableIssues.length === 0 && completedTurns + missingIssues.length > 0
        ? `${(completedTurns / (completedTurns + missingIssues.length) * 100).toFixed(1)}%` : '—';
    const modelRows = grouped(selected, record => record.model ?? t('unknown'));
    const heatYears = [...new Set([new Date(today).getFullYear(), ...(snapshot?.records ?? []).map(record => new Date(record.at).getFullYear())])].sort((a, b) => b - a);
    const providerRows = grouped(selected, record => record.provider ?? t('unknown'));
    const projectRows = grouped(selected, record => projectById.get(sessionById.get(record.sessionId)?.projectId ?? '') ?? t('unknown'));
    const sessionTotals = new Map();
    for (const record of selected)
        sessionTotals.set(record.sessionId, (sessionTotals.get(record.sessionId) ?? 0) + record.totalTokens);
    const sessions = (snapshot?.sessions ?? []).filter((session) => {
        if (project && session.projectId !== project)
            return false;
        if (model && !sessionTotals.has(session.id))
            return false;
        return sessionMode === 'high' ? sessionTotals.has(session.id) : session.lastAt >= start && session.lastAt < end;
    }).sort((a, b) => sessionMode === 'high'
        ? (sessionTotals.get(b.id) ?? 0) - (sessionTotals.get(a.id) ?? 0)
        : b.lastAt - a.lastAt).slice(0, 10);
    return _jsx("main", { className: css.page, children: _jsxs("div", { className: css.content, children: [_jsx("header", { className: css.pageHead, children: _jsxs("div", { children: [_jsx("h1", { children: t('title') }), _jsx("p", { children: t('subtitle') })] }) }), error && _jsxs("div", { className: css.notice, role: "alert", children: [snapshot ? t('staleError') : t('error'), " ", _jsx("button", { onClick: retry, children: t('retry') })] }), !snapshot && !error && _jsxs("div", { className: css.loading, role: "status", children: [_jsx("i", {}), t('loading'), progress?.total ? ` · ${progress.completed}/${progress.total}` : ''] }), snapshot && _jsxs(_Fragment, { children: [_jsxs("div", { className: css.toolbar, children: [_jsxs("div", { className: css.toolbarStatus, children: [_jsx("span", { children: refreshing
                                                ? `${t('refreshing')}${progress?.total ? ` ${progress.completed}/${progress.total}` : ''}`
                                                : `${error ? t('staleAsOf') : t('updatedAt')} ${new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(snapshot.capturedAt)}` }), _jsx("button", { disabled: refreshing, onClick: retry, children: t('refresh') }), _jsxs("button", { className: css.qualityToggle, "aria-expanded": qualityOpen, onClick: () => { setQualityOpen(!qualityOpen); }, children: [t('dataQuality'), " \u00B7 ", unreadableIssues.length, " ", t('sessionsUnit'), " / ", missingIssues.length, " ", t('turns'), " / ", unattributedIssues.length, " ", t('unattributedShort')] })] }), _jsxs("div", { className: css.filters, children: [_jsxs("label", { children: [t('period'), _jsxs("select", { value: selectedDay === undefined ? period : 'selected', onChange: (event) => { setSelectedDay(undefined); setPeriod(Number(event.target.value)); setTrendModel(''); }, children: [selectedDay !== undefined && _jsx("option", { value: "selected", children: new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' }).format(selectedDay) }), _jsx("option", { value: 7, children: t('days7') }), _jsx("option", { value: 30, children: t('days30') }), _jsx("option", { value: 90, children: t('days90') }), _jsx("option", { value: 365, children: t('days365') })] })] }), _jsxs("label", { children: [t('project'), _jsxs("select", { value: project, onChange: (event) => { setProject(event.target.value); setModel(''); setTrendModel(''); }, children: [_jsx("option", { value: "", children: t('allProjects') }), snapshot.projects.map(item => _jsx("option", { value: item.id, children: item.title }, item.id))] })] }), _jsxs("label", { children: [t('model'), _jsxs("select", { value: model, onChange: (event) => { setModel(event.target.value); setTrendModel(''); }, children: [_jsx("option", { value: "", children: t('allModels') }), models.map(item => _jsx("option", { value: item, children: item }, item))] })] })] })] }), selectedDay !== undefined && _jsx("button", { className: css.clearDay, onClick: () => { setSelectedDay(undefined); }, children: t('clearDay') }), qualityOpen && _jsx(QualityPanel, { issues: qualityIssues, refreshing: refreshing, onOpen: openSession, onRebuild: rebuild, t: t }), _jsx("section", { className: css.summary, "aria-label": t('title'), children: [
                                [t('total'), amount(total), `${t('compared')} ${change(total, prior)}`],
                                [t('average'), amount(Math.round(total / daysInView)), `${t('compared')} ${change(total, prior)}`],
                                [t('peak'), amount(peak), `${t('compared')} ${change(peak, priorPeak)}`],
                                [t('active'), `${dayTotals.length} ${t('days')}`, `${t('compared')} ${change(dayTotals.length, priorDays.length)}`],
                                [t('cacheRate'), cacheRate, `${t('compared')} ${cacheDelta}`],
                            ].map(([label, value, note]) => _jsxs("div", { className: css.stat, children: [_jsx("span", { children: label }), _jsx("strong", { children: value }), _jsx("small", { children: note })] }, label)) }), _jsx(Heatmap, { records: allHeat, years: heatYears, year: heatYear, selectedDay: selectedDay, onYearChange: value => { setHeatYear(value); setSelectedDay(undefined); }, onSelectDay: value => { setSelectedDay(current => current === value ? undefined : value); setTrendModel(''); }, t: t }), _jsxs("section", { className: css.card, children: [_jsxs("div", { className: css.cardHead, children: [_jsxs("div", { children: [_jsx("h2", { children: t('trend') }), _jsx("p", { children: t('trendNote') })] }), _jsxs("div", { className: css.trendControls, children: [_jsxs("label", { className: css.trendSelect, children: [t('trendScope'), _jsxs("select", { value: activeTrendModel, onChange: (event) => { setTrendModel(event.target.value); }, children: [_jsx("option", { value: "", children: t('trendTotal') }), trendModels.map(item => _jsx("option", { value: item, children: item }, item))] })] }), _jsx("div", { className: css.segments, children: ['daily', 'weekly', 'cumulative'].map(mode => _jsx("button", { className: trend === mode ? css.selected : '', onClick: () => { setTrend(mode); }, children: t(mode) }, mode)) })] })] }), _jsxs("div", { className: css.legend, children: [_jsx("span", { className: css.inputDot }), t('input')] }), trendRecords.length ? _jsx(TrendChart, { records: trendRecords, period: daysInView, anchorAt: anchor, mode: trend, metric: "input", label: `${t('input')} · ${activeTrendModel || t('trendTotal')}`, t: t }) : _jsx("p", { className: css.empty, children: t('noData') })] }), _jsxs("section", { className: css.card, children: [_jsxs("div", { className: css.cardHead, children: [_jsxs("div", { children: [_jsx("h2", { children: t('efficiency') }), _jsx("p", { children: t('efficiencyNote') })] }), _jsxs("div", { className: css.trendControls, children: [_jsxs("label", { className: css.trendSelect, children: [t('trendScope'), _jsxs("select", { value: activeEfficiencyModel, onChange: event => { setEfficiencyModel(event.target.value); }, children: [_jsx("option", { value: "", children: t('trendTotal') }), trendModels.map(item => _jsx("option", { value: item, children: item }, item))] })] }), _jsxs("label", { className: css.trendSelect, children: [t('efficiencyMetric'), _jsxs("select", { value: efficiencyMetric, onChange: event => { setEfficiencyMetric(event.target.value); }, children: [_jsx("option", { value: "turns", children: t('completedTurns') }), _jsx("option", { value: "averageInput", children: t('averageInputPerTurn') }), _jsx("option", { value: "cacheRate", children: t('cacheReadShare') })] })] }), _jsx("div", { className: css.segments, children: ['daily', 'weekly'].map(mode => _jsx("button", { className: efficiencyMode === mode ? css.selected : '', onClick: () => { setEfficiencyMode(mode); }, children: t(mode) }, mode)) })] })] }), _jsxs("div", { className: css.efficiencyStats, children: [_jsxs("div", { children: [_jsx("span", { children: t('completedTurns') }), _jsx("strong", { children: new Intl.NumberFormat(undefined).format(completedTurns) })] }), _jsxs("div", { children: [_jsx("span", { children: t('averageInputPerTurn') }), _jsx("strong", { children: completedTurns ? amount(averageInputPerTurn) : '—' })] }), _jsxs("div", { children: [_jsx("span", { children: t('cacheReadShare') }), _jsx("strong", { children: efficiencyCacheShare })] }), _jsxs("div", { children: [_jsx(Tooltip, { label: t('coverageExplanation'), side: "top", portal: true, children: _jsxs("span", { children: [t('measuredCoverage'), " \u24D8"] }) }), _jsx("strong", { children: coverage })] })] }), efficiencyRecords.length ? _jsx(TrendChart, { records: efficiencyRecords, period: daysInView, anchorAt: anchor, mode: efficiencyMode, metric: efficiencyMetric, label: `${efficiencyMetric === 'turns' ? t('completedTurns') : efficiencyMetric === 'averageInput' ? t('averageInputPerTurn') : t('cacheReadShare')} · ${activeEfficiencyModel || t('trendTotal')}`, t: t })
                                    : _jsx("p", { className: css.empty, children: t('noData') })] }), _jsxs("div", { className: css.twoCols, children: [_jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('composition') }), _jsx("div", { className: css.composition, children: [
                                                [t('uncached'), selected.reduce((sum, record) => sum + record.inputTokens, 0)],
                                                [t('cacheRead'), cacheRead],
                                                [t('cacheWrite'), selected.reduce((sum, record) => sum + (record.cacheWriteTokens ?? 0), 0)],
                                                [t('output'), selected.reduce((sum, record) => sum + record.outputTokens, 0)],
                                                [t('unknownInput'), selected.reduce((sum, record) => sum + Math.max(0, record.totalTokens - record.inputTokens - record.outputTokens - (record.cacheReadTokens ?? 0) - (record.cacheWriteTokens ?? 0)), 0)],
                                            ].map(([name, value], index) => _jsx(Tooltip, { label: `${name}\n${new Intl.NumberFormat(undefined).format(value)} ${t('tokenUnit')} · ${total ? (value / total * 100).toFixed(1) : '0.0'}%`, side: "top", portal: true, children: _jsxs("div", { className: css.compRow, children: [_jsx("span", { children: name }), _jsx("div", { className: css.track, children: _jsx("span", { style: { width: `${total ? value / total * 100 : 0}%`, background: COMPOSITION_COLORS[index] } }) }), _jsx("strong", { children: amount(value) })] }) }, name)) })] }), _jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('models') }), _jsx(ShareDonut, { rows: modelRows, empty: t('noData'), other: t('other'), colors: MODEL_COLORS, unit: t('tokenUnit') })] }), _jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('projects') }), _jsx(RankBars, { rows: projectRows, empty: t('noData'), unit: t('tokenUnit') })] }), _jsxs("section", { className: css.card, children: [_jsx("h2", { children: t('providers') }), _jsx(ShareDonut, { rows: providerRows, empty: t('noData'), other: t('other'), colors: PROVIDER_COLORS, unit: t('tokenUnit') })] })] }), _jsxs("section", { className: css.card, children: [_jsxs("div", { className: css.cardHead, children: [_jsx("h2", { children: t('sessions') }), _jsxs("div", { className: css.segments, children: [_jsx("button", { className: sessionMode === 'high' ? css.selected : '', onClick: () => { setSessionMode('high'); }, children: t('highUsage') }), _jsx("button", { className: sessionMode === 'recent' ? css.selected : '', onClick: () => { setSessionMode('recent'); }, children: t('recent') })] })] }), sessions.length === 0 ? _jsx("p", { className: css.empty, children: t('noData') }) : _jsx("div", { className: css.sessionList, children: sessions.map((session, index) => _jsxs("button", { className: css.sessionRow, onClick: () => { openSession(session.id); }, title: t('openSession'), children: [_jsx("span", { className: css.sessionIndex, children: index + 1 }), _jsxs("span", { className: css.sessionText, children: [_jsx("strong", { children: session.title }), _jsxs("small", { children: [projectById.get(session.projectId ?? '') ?? t('unknown'), " \u00B7 ", sessionMode === 'recent' ? `${t('lastChat')} ${dayLabel(session.lastAt)}` : sessionRoute(selected, session.id, t('unknown'))] })] }), _jsxs("span", { className: css.sessionTotal, children: [amount(sessionTotals.get(session.id) ?? 0), " ", t('tokenUnit')] })] }, session.id)) })] })] })] }) });
}
//# sourceMappingURL=UsagePage.js.map