/** Pure derivations behind the usage dashboard; no React or DOM access. */
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import type { UsageIssue, UsageRecord, UsageSession, UsageSnapshot } from 'dsh-usage/types'

export type Period = 7 | 30 | 90 | 365
/** Inclusive local-calendar day range; both ends are midnights. */
export type DayRange = { readonly first: number; readonly last: number }
export type SessionMode = 'high' | 'recent'
export type Rank = { name: string; total: number }

/** User-selected scope of the dashboard. */
export interface Filters {
  readonly period: Period | 'custom'
  /** Used when `period` is `custom`. */
  readonly custom: DayRange
  /** A heatmap day selection overrides the period. */
  readonly selectedDay: number | undefined
  readonly project: string
  readonly model: string
  readonly sessionMode: SessionMode
}

/** One ranked session with its period total and dominant route. */
export interface RankedSession {
  readonly session: UsageSession
  readonly total: number
  readonly route: string
}

/** Local-calendar midnight of the day containing `time`. */
export function dayStart(time: number): number {
  const date = new Date(time)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

/** Move a local-calendar midnight by whole days, honoring DST. */
export function shiftDay(time: number, days: number): number {
  const date = new Date(time)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days).getTime()
}

/** Number of calendar days in an inclusive range, counted by local dates so DST changes do not skew it. */
export function dayCount(range: DayRange): number {
  let count = 1
  for (let day = range.first; day < range.last; day = shiftDay(day, 1)) count++
  return count
}

/** Order a possibly reversed pair of days into an inclusive range. */
export function orderedRange(a: number, b: number): DayRange {
  return a <= b ? { first: a, last: b } : { first: b, last: a }
}

/** Token and turn totals per weekday (Monday first) and local hour. */
export interface HourlyDistribution {
  /** `tokens[weekday][hour]`, weekday 0 = Monday. */
  readonly tokens: readonly (readonly number[])[]
  readonly turns: readonly (readonly number[])[]
  readonly max: number
  /** Busiest slot, absent when there is no usage. */
  readonly peak?: { readonly weekday: number; readonly hour: number; readonly tokens: number }
  /** Tokens per hour of day across all weekdays. */
  readonly byHour: readonly number[]
}

/** Bucket usage by the local weekday and hour its turn ended. */
export function hourlyDistribution(records: readonly UsageRecord[]): HourlyDistribution {
  const tokens = Array.from({ length: 7 }, () => new Array<number>(24).fill(0))
  const turns = Array.from({ length: 7 }, () => new Array<number>(24).fill(0))
  const byHour = new Array<number>(24).fill(0)
  for (const record of records) {
    const date = new Date(record.at)
    const weekday = (date.getDay() + 6) % 7
    const hour = date.getHours()
    tokens[weekday]![hour]! += record.totalTokens
    turns[weekday]![hour]!++
    byHour[hour]! += record.totalTokens
  }
  let peak: HourlyDistribution['peak']
  tokens.forEach((row, weekday) => row.forEach((value, hour) => {
    if (value > 0 && (peak === undefined || value > peak.tokens)) peak = { weekday, hour, tokens: value }
  }))
  return { tokens, turns, byHour, max: peak?.tokens ?? 0, ...(peak === undefined ? {} : { peak }) }
}

/** Localized labels for aggregated buckets. */
export interface DashboardLabels {
  /** Values without a model, provider, or project. */
  readonly unknown: string
  /** Everything beyond the named slots of a breakdown. */
  readonly other: string
}

/**
 * Keep the largest rows and fold the rest into one trailing "other" row, so a breakdown never
 * needs more colors than it has slots. Shared by the donuts and the stacked trend so a model
 * keeps the same color everywhere.
 * @param rows - rows sorted largest first.
 * @param other - label of the folded row.
 * @param slots - maximum rows returned, including the folded one.
 */
export function topWithOther(rows: readonly Rank[], other: string, slots = 6): Rank[] {
  if (rows.length <= slots) return [...rows]
  const kept = rows.slice(0, slots - 1)
  return [...kept, { name: other, total: rows.slice(slots - 1).reduce((total, row) => total + row.total, 0) }]
}

export type TrendMode = 'daily' | 'weekly' | 'cumulative'

/** One bar of the stacked trend: per-series totals for a day or a week. */
export interface TrendBucket {
  readonly at: number
  /** Last day covered; equals `at` for daily buckets. */
  readonly endAt: number
  /** Tokens per series, aligned with the series list. */
  readonly values: readonly number[]
  readonly total: number
}

/**
 * Bucket records into stacked bars.
 * @param records - records inside `range`.
 * @param range - inclusive day range; every day or week in it gets a bucket, empty ones included.
 * @param mode - daily bars, Monday-based weekly bars, or running totals per day.
 * @param seriesOf - series index for a record.
 * @param seriesCount - number of series.
 */
export function trendBuckets(
  records: readonly UsageRecord[],
  range: DayRange,
  mode: TrendMode,
  seriesOf: (record: UsageRecord) => number,
  seriesCount: number,
): TrendBucket[] {
  type Mutable = { at: number; endAt: number; values: number[]; total: number }
  const days: Mutable[] = []
  const indexByDay = new Map<number, number>()
  for (let day = range.first; day <= range.last; day = shiftDay(day, 1)) {
    indexByDay.set(day, days.length)
    days.push({ at: day, endAt: day, values: new Array<number>(seriesCount).fill(0), total: 0 })
  }
  for (const record of records) {
    const bucket = days[indexByDay.get(dayStart(record.at)) ?? -1]
    if (bucket === undefined) continue
    bucket.values[seriesOf(record)]! += record.totalTokens
    bucket.total += record.totalTokens
  }
  if (mode === 'cumulative') {
    const running = new Array<number>(seriesCount).fill(0)
    return days.map(day => {
      day.values.forEach((value, index) => { running[index]! += value })
      return { ...day, values: [...running], total: running.reduce((total, value) => total + value, 0) }
    })
  }
  if (mode === 'daily') return days
  const weeks: Mutable[] = []
  for (const day of days) {
    const monday = shiftDay(day.at, -((new Date(day.at).getDay() + 6) % 7))
    let week = weeks.at(-1)
    if (week?.at !== monday) {
      week = { at: monday, endAt: day.at, values: new Array<number>(seriesCount).fill(0), total: 0 }
      weeks.push(week)
    }
    week.endAt = day.at
    day.values.forEach((value, index) => { week.values[index]! += value })
    week.total += day.total
  }
  // A partial first week starts at the range's first day, not the Monday before it.
  if (weeks[0] !== undefined) weeks[0].at = Math.max(weeks[0].at, range.first)
  return weeks
}

/** Prompt-side tokens of one record: uncached, cache read, and cache write input. */
export function inputOf(record: UsageRecord): number {
  return record.totalTokens - record.outputTokens
}

function sum(records: readonly UsageRecord[], pick: (record: UsageRecord) => number): number {
  let total = 0
  for (const record of records) total += pick(record)
  return total
}

/** Sum total tokens per key, largest first. */
export function grouped(records: readonly UsageRecord[], getName: (record: UsageRecord) => string): Rank[] {
  const sums = new Map<string, number>()
  for (const record of records) {
    const name = getName(record)
    sums.set(name, (sums.get(name) ?? 0) + record.totalTokens)
  }
  return [...sums].map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total)
}

/** Cache-read share of input in percent; undefined unless every record reports cache reads. */
export function cacheRatePercent(records: readonly UsageRecord[]): number | undefined {
  if (records.length === 0 || !records.every(record => record.cacheReadTokens !== undefined)) return undefined
  const prompt = sum(records, inputOf)
  return prompt > 0 ? sum(records, record => record.cacheReadTokens ?? 0) / prompt * 100 : undefined
}

/**
 * Consecutive active days inside `[first, last]`.
 * @param days - local-calendar midnights with usage.
 * @param first - first day of the range.
 * @param last - last day of the range.
 * @returns longest run in the range and the run ending at `last` (or the day before it).
 */
export function streaks(days: Iterable<number>, first: number, last: number): { current: number; longest: number } {
  const active = new Set(days)
  let longest = 0
  let run = 0
  for (let day = first; day <= last; day = shiftDay(day, 1)) {
    run = active.has(day) ? run + 1 : 0
    longest = Math.max(longest, run)
  }
  let current = 0
  for (let day = active.has(last) ? last : shiftDay(last, -1); active.has(day); day = shiftDay(day, -1)) current++
  return { current, longest }
}

function modelsOf(records: readonly UsageRecord[]): string[] {
  return [...new Set(records.map(record => record.model).filter((value): value is string => value !== undefined))].sort()
}

/** Most-used `provider / model` route among one session's records. */
function dominantRoute(records: readonly UsageRecord[], unknown: string): string {
  return grouped(records, record => `${record.provider ?? unknown} / ${record.model ?? unknown}`)[0]?.name
    ?? `${unknown} / ${unknown}`
}

/**
 * Derive every figure shown by the dashboard from one Host observation.
 * @param snapshot - complete Host observation.
 * @param filters - period, day, project, model, and ranking selections.
 * @param unknown - localized label for unattributed values.
 * @returns immutable view model; recompute only when an input changes.
 */
export function deriveDashboard(snapshot: UsageSnapshot, filters: Filters, labels: DashboardLabels) {
  const { unknown, other } = labels
  const { period, custom, selectedDay, project, model, sessionMode } = filters
  const today = dayStart(snapshot.capturedAt)
  const range: DayRange = selectedDay !== undefined ? { first: selectedDay, last: selectedDay }
    : period === 'custom' ? custom : { first: shiftDay(today, 1 - period), last: today }
  const anchor = range.last
  const daysInView = dayCount(range)
  const start = range.first
  const end = shiftDay(range.last, 1)
  // The comparison period has the same length and ends the day before this one starts.
  const previousStart = shiftDay(range.first, -daysInView)
  const sessionById = new Map(snapshot.sessions.map(session => [session.id, session]))
  const projectById = new Map(snapshot.projects.map(item => [item.id, item.title]))

  const projectRecords = project
    ? snapshot.records.filter(record => sessionById.get(record.sessionId)?.projectId === project)
    : snapshot.records
  const models = modelsOf(projectRecords)
  const scoped = model ? projectRecords.filter(record => record.model === model) : projectRecords
  const selected = scoped.filter(record => record.at >= start && record.at < end)
  const previous = scoped.filter(record => record.at >= previousStart && record.at < start)


  const total = sum(selected, record => record.totalTokens)
  const prior = sum(previous, record => record.totalTokens)
  const dayTotals = grouped(selected, record => String(dayStart(record.at)))
  const priorDays = grouped(previous, record => String(dayStart(record.at)))
  const peak = Math.max(0, ...dayTotals.map(day => day.total))
  const priorPeak = Math.max(0, ...priorDays.map(day => day.total))
  const cacheRate = cacheRatePercent(selected)
  const previousCacheRate = cacheRatePercent(previous)

  const issuesInProject = project ? snapshot.issues.filter(issue => issue.projectId === project) : snapshot.issues
  const qualityIssues: UsageIssue[] = issuesInProject.filter(issue => issue.at === undefined || (issue.at >= start && issue.at < end))
  const unreadable = qualityIssues.filter(issue => issue.kind === 'unreadable-session').length
  const missing = qualityIssues.filter(issue => issue.kind === 'missing-turn').length
  const unattributed = qualityIssues.filter(issue => issue.kind === 'unattributed-turn').length

  const modelRows = grouped(selected, record => record.model ?? unknown)
  const modelSeries = topWithOther(modelRows, other)
  const namedSeries = new Map(modelSeries.map((row, index) => [row.name, index]))
  // Models folded into "other" share its trailing slot.
  const modelSeriesOf = (record: UsageRecord): number => namedSeries.get(record.model ?? unknown) ?? modelSeries.length - 1

  const sessionTotals = new Map<SessionId, number>()
  for (const record of selected) sessionTotals.set(record.sessionId, (sessionTotals.get(record.sessionId) ?? 0) + record.totalTokens)
  const sessions: RankedSession[] = snapshot.sessions.filter(session => {
    if (project && session.projectId !== project) return false
    if (model && !sessionTotals.has(session.id)) return false
    return sessionMode === 'high' ? sessionTotals.has(session.id) : session.lastAt >= start && session.lastAt < end
  }).sort((a, b) => sessionMode === 'high'
    ? (sessionTotals.get(b.id) ?? 0) - (sessionTotals.get(a.id) ?? 0)
    : b.lastAt - a.lastAt).slice(0, 10).map(session => ({
    session,
    total: sessionTotals.get(session.id) ?? 0,
    route: dominantRoute(selected.filter(record => record.sessionId === session.id), unknown),
  }))

  return {
    today, range, anchor, daysInView, start, end, projectById,
    hourly: hourlyDistribution(selected),
    models, scoped, selected, modelSeries, modelSeriesOf,
    total, prior, peak, priorPeak, activeDays: dayTotals.length, priorActiveDays: priorDays.length,
    cacheRate, cacheRateDelta: cacheRate === undefined || previousCacheRate === undefined ? undefined : cacheRate - previousCacheRate,
    qualityIssues, unreadable, missing, unattributed,
    composition: {
      uncached: sum(selected, record => record.inputTokens),
      cacheRead: sum(selected, record => record.cacheReadTokens ?? 0),
      cacheWrite: sum(selected, record => record.cacheWriteTokens ?? 0),
      output: sum(selected, record => record.outputTokens),
      other: sum(selected, record => Math.max(0, record.totalTokens - record.inputTokens - record.outputTokens
        - (record.cacheReadTokens ?? 0) - (record.cacheWriteTokens ?? 0))),
    },
    modelRows,
    providerRows: grouped(selected, record => record.provider ?? unknown),
    projectRows: grouped(selected, record => projectById.get(sessionById.get(record.sessionId)?.projectId ?? '') ?? unknown),
    earliestDay: dayStart(snapshot.records.reduce((earliest, record) => Math.min(earliest, record.at), today)),
    heatYears: [...new Set([new Date(today).getFullYear(), ...snapshot.records.map(record => new Date(record.at).getFullYear())])]
      .sort((a, b) => b - a),
    sessions,
  }
}
