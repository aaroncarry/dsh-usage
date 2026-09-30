/** Local-calendar midnight of the day containing `time`. */
export function dayStart(time) {
    const date = new Date(time);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}
/** Move a local-calendar midnight by whole days, honoring DST. */
export function shiftDay(time, days) {
    const date = new Date(time);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days).getTime();
}
/** Number of calendar days in an inclusive range, counted by local dates so DST changes do not skew it. */
export function dayCount(range) {
    let count = 1;
    for (let day = range.first; day < range.last; day = shiftDay(day, 1))
        count++;
    return count;
}
/** Order a possibly reversed pair of days into an inclusive range. */
export function orderedRange(a, b) {
    return a <= b ? { first: a, last: b } : { first: b, last: a };
}
/** Bucket usage by the local weekday and hour its turn ended. */
export function hourlyDistribution(records) {
    const tokens = Array.from({ length: 7 }, () => new Array(24).fill(0));
    const turns = Array.from({ length: 7 }, () => new Array(24).fill(0));
    const byHour = new Array(24).fill(0);
    for (const record of records) {
        const date = new Date(record.at);
        const weekday = (date.getDay() + 6) % 7;
        const hour = date.getHours();
        tokens[weekday][hour] += record.totalTokens;
        turns[weekday][hour]++;
        byHour[hour] += record.totalTokens;
    }
    let peak;
    tokens.forEach((row, weekday) => row.forEach((value, hour) => {
        if (value > 0 && (peak === undefined || value > peak.tokens))
            peak = { weekday, hour, tokens: value };
    }));
    return { tokens, turns, byHour, max: peak?.tokens ?? 0, ...(peak === undefined ? {} : { peak }) };
}
/** Prompt-side tokens of one record: uncached, cache read, and cache write input. */
export function inputOf(record) {
    return record.totalTokens - record.outputTokens;
}
function sum(records, pick) {
    let total = 0;
    for (const record of records)
        total += pick(record);
    return total;
}
/** Sum total tokens per key, largest first. */
export function grouped(records, getName) {
    const sums = new Map();
    for (const record of records) {
        const name = getName(record);
        sums.set(name, (sums.get(name) ?? 0) + record.totalTokens);
    }
    return [...sums].map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total);
}
/** Cache-read share of input in percent; undefined unless every record reports cache reads. */
export function cacheRatePercent(records) {
    if (records.length === 0 || !records.every(record => record.cacheReadTokens !== undefined))
        return undefined;
    const prompt = sum(records, inputOf);
    return prompt > 0 ? sum(records, record => record.cacheReadTokens ?? 0) / prompt * 100 : undefined;
}
/**
 * Consecutive active days inside `[first, last]`.
 * @param days - local-calendar midnights with usage.
 * @param first - first day of the range.
 * @param last - last day of the range.
 * @returns longest run in the range and the run ending at `last` (or the day before it).
 */
export function streaks(days, first, last) {
    const active = new Set(days);
    let longest = 0;
    let run = 0;
    for (let day = first; day <= last; day = shiftDay(day, 1)) {
        run = active.has(day) ? run + 1 : 0;
        longest = Math.max(longest, run);
    }
    let current = 0;
    for (let day = active.has(last) ? last : shiftDay(last, -1); active.has(day); day = shiftDay(day, -1))
        current++;
    return { current, longest };
}
function modelsOf(records) {
    return [...new Set(records.map(record => record.model).filter((value) => value !== undefined))].sort();
}
/** Most-used `provider / model` route among one session's records. */
function dominantRoute(records, unknown) {
    return grouped(records, record => `${record.provider ?? unknown} / ${record.model ?? unknown}`)[0]?.name
        ?? `${unknown} / ${unknown}`;
}
/**
 * Derive every figure shown by the dashboard from one Host observation.
 * @param snapshot - complete Host observation.
 * @param filters - period, day, project, model, and ranking selections.
 * @param unknown - localized label for unattributed values.
 * @returns immutable view model; recompute only when an input changes.
 */
export function deriveDashboard(snapshot, filters, unknown) {
    const { period, custom, selectedDay, project, model, trendModel, efficiencyModel, sessionMode } = filters;
    const today = dayStart(snapshot.capturedAt);
    const range = selectedDay !== undefined ? { first: selectedDay, last: selectedDay }
        : period === 'custom' ? custom : { first: shiftDay(today, 1 - period), last: today };
    const anchor = range.last;
    const daysInView = dayCount(range);
    const start = range.first;
    const end = shiftDay(range.last, 1);
    // The comparison period has the same length and ends the day before this one starts.
    const previousStart = shiftDay(range.first, -daysInView);
    const sessionById = new Map(snapshot.sessions.map(session => [session.id, session]));
    const projectById = new Map(snapshot.projects.map(item => [item.id, item.title]));
    const projectRecords = project
        ? snapshot.records.filter(record => sessionById.get(record.sessionId)?.projectId === project)
        : snapshot.records;
    const models = modelsOf(projectRecords);
    const scoped = model ? projectRecords.filter(record => record.model === model) : projectRecords;
    const selected = scoped.filter(record => record.at >= start && record.at < end);
    const previous = scoped.filter(record => record.at >= previousStart && record.at < start);
    const trendModels = modelsOf(selected);
    const activeTrendModel = trendModels.includes(trendModel) ? trendModel : '';
    const trendRecords = activeTrendModel ? selected.filter(record => record.model === activeTrendModel) : selected;
    const activeEfficiencyModel = trendModels.includes(efficiencyModel) ? efficiencyModel : '';
    const efficiencyRecords = activeEfficiencyModel
        ? selected.filter(record => record.model === activeEfficiencyModel) : selected;
    const total = sum(selected, record => record.totalTokens);
    const prior = sum(previous, record => record.totalTokens);
    const dayTotals = grouped(selected, record => String(dayStart(record.at)));
    const priorDays = grouped(previous, record => String(dayStart(record.at)));
    const peak = Math.max(0, ...dayTotals.map(day => day.total));
    const priorPeak = Math.max(0, ...priorDays.map(day => day.total));
    const cacheRate = cacheRatePercent(selected);
    const previousCacheRate = cacheRatePercent(previous);
    const issuesInProject = project ? snapshot.issues.filter(issue => issue.projectId === project) : snapshot.issues;
    const qualityIssues = issuesInProject.filter(issue => issue.at === undefined || (issue.at >= start && issue.at < end));
    const unreadable = qualityIssues.filter(issue => issue.kind === 'unreadable-session').length;
    const missing = qualityIssues.filter(issue => issue.kind === 'missing-turn').length;
    const unattributed = qualityIssues.filter(issue => issue.kind === 'unattributed-turn').length;
    const completedTurns = efficiencyRecords.length;
    const efficiencyInput = sum(efficiencyRecords, inputOf);
    const coverage = !model && !activeEfficiencyModel && unreadable === 0 && completedTurns + missing > 0
        ? completedTurns / (completedTurns + missing) * 100 : undefined;
    const sessionTotals = new Map();
    for (const record of selected)
        sessionTotals.set(record.sessionId, (sessionTotals.get(record.sessionId) ?? 0) + record.totalTokens);
    const sessions = snapshot.sessions.filter(session => {
        if (project && session.projectId !== project)
            return false;
        if (model && !sessionTotals.has(session.id))
            return false;
        return sessionMode === 'high' ? sessionTotals.has(session.id) : session.lastAt >= start && session.lastAt < end;
    }).sort((a, b) => sessionMode === 'high'
        ? (sessionTotals.get(b.id) ?? 0) - (sessionTotals.get(a.id) ?? 0)
        : b.lastAt - a.lastAt).slice(0, 10).map(session => ({
        session,
        total: sessionTotals.get(session.id) ?? 0,
        route: dominantRoute(selected.filter(record => record.sessionId === session.id), unknown),
    }));
    return {
        today, range, anchor, daysInView, start, end, projectById,
        hourly: hourlyDistribution(selected),
        models, scoped, selected, trendModels, activeTrendModel, trendRecords, activeEfficiencyModel, efficiencyRecords,
        total, prior, peak, priorPeak, activeDays: dayTotals.length, priorActiveDays: priorDays.length,
        cacheRate, cacheRateDelta: cacheRate === undefined || previousCacheRate === undefined ? undefined : cacheRate - previousCacheRate,
        qualityIssues, unreadable, missing, unattributed,
        completedTurns, averageInputPerTurn: completedTurns ? efficiencyInput / completedTurns : undefined,
        efficiencyCacheShare: cacheRatePercent(efficiencyRecords), coverage,
        composition: {
            uncached: sum(selected, record => record.inputTokens),
            cacheRead: sum(selected, record => record.cacheReadTokens ?? 0),
            cacheWrite: sum(selected, record => record.cacheWriteTokens ?? 0),
            output: sum(selected, record => record.outputTokens),
            other: sum(selected, record => Math.max(0, record.totalTokens - record.inputTokens - record.outputTokens
                - (record.cacheReadTokens ?? 0) - (record.cacheWriteTokens ?? 0))),
        },
        modelRows: grouped(selected, record => record.model ?? unknown),
        providerRows: grouped(selected, record => record.provider ?? unknown),
        projectRows: grouped(selected, record => projectById.get(sessionById.get(record.sessionId)?.projectId ?? '') ?? unknown),
        earliestDay: dayStart(snapshot.records.reduce((earliest, record) => Math.min(earliest, record.at), today)),
        heatYears: [...new Set([new Date(today).getFullYear(), ...snapshot.records.map(record => new Date(record.at).getFullYear())])]
            .sort((a, b) => b - a),
        sessions,
    };
}
//# sourceMappingURL=derive.js.map