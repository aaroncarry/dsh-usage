/** Interactive charts over one Host observation of durable token usage. */
import { useEffect, useMemo, useState } from 'react'
import type { HostObservable, InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import type { UsageIssue, UsageProgress, UsageRecord, UsageSnapshot } from '@deepseek-ai/dsh-client-ui-usage/types'
import { Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import css from './UsagePage.module.css'

/** Dashboard observation shared with the page while it is mounted. */
export interface UsagePageState {
  readonly snapshot?: UsageSnapshot
  readonly error: boolean
  readonly refreshing: boolean
  readonly progress?: UsageProgress
}

/** Operations and observable data supplied by the browser plugin. */
export interface UsagePageInjected {
  readonly hooks: { readonly usage: HostObservable<UsagePageState> }
  readonly activate: () => () => void
  readonly retry: () => void
  readonly rebuild: () => void
  readonly openSession: (id: SessionId) => void
}

type Props = PropsRuntime<'main'> & PropsLocale<'usageStatistics'> & InjectFace<UsagePageInjected>
type Period = 1 | 7 | 30 | 90 | 365
type Trend = 'daily' | 'weekly' | 'cumulative'
type ChartMetric = 'input' | 'turns' | 'averageInput' | 'cacheRate'
type Rank = { name: string; total: number }
const MODEL_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-model-${index})`)
const PROJECT_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-project-${index})`)
const PROVIDER_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-provider-${index})`)
const COMPOSITION_COLORS = Array.from({ length: 5 }, (_, index) => `var(--usage-composition-${index})`)

function dayStart(time: number): number {
  const date = new Date(time)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

function dayLabel(time: number): string {
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(time)
}

function amount(value: number): string {
  return new Intl.NumberFormat(undefined, { notation: value >= 10_000 ? 'compact' : 'standard', maximumFractionDigits: 1 }).format(value)
}

function change(current: number, previous: number): string {
  return previous > 0 ? `${current >= previous ? '+' : ''}${((current - previous) / previous * 100).toFixed(1)}%` : '—'
}

function grouped(records: readonly UsageRecord[], getName: (record: UsageRecord) => string): Rank[] {
  const sums = new Map<string, number>()
  for (const record of records) {
    const name = getName(record)
    sums.set(name, (sums.get(name) ?? 0) + record.totalTokens)
  }
  return [...sums].map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total)
}

function streaks(days: readonly number[]): { current: number; longest: number } {
  const active = new Set(days)
  const today = dayStart(Date.now())
  let current = 0
  let cursor = active.has(today) ? today : new Date(today).setDate(new Date(today).getDate() - 1)
  while (active.has(cursor)) {
    current++
    const date = new Date(cursor)
    cursor = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1).getTime()
  }
  let longest = 0
  let run = 0
  const first = new Date(today)
  first.setDate(first.getDate() - 364)
  for (let offset = 0; offset < 365; offset++) {
    const date = new Date(first.getFullYear(), first.getMonth(), first.getDate() + offset)
    run = active.has(date.getTime()) ? run + 1 : 0
    longest = Math.max(longest, run)
  }
  return { current, longest }
}

function TrendChart({ records, period, anchorAt, mode, metric, label, t }: {
  records: readonly UsageRecord[]; period: Period; anchorAt: number; mode: Trend; metric: ChartMetric; label: string; t: Props['t']
}) {
  const [hovered, setHovered] = useState<number | undefined>()
  const anchor = dayStart(anchorAt)
  type Point = { at: number; endAt: number; input: number; turns: number; cacheRead: number; cacheKnown: boolean }
  const data: Point[] = []
  for (let offset = period - 1; offset >= 0; offset--) {
    const date = new Date(anchor)
    const at = new Date(date.getFullYear(), date.getMonth(), date.getDate() - offset).getTime()
    data.push({ at, endAt: at, input: 0, turns: 0, cacheRead: 0, cacheKnown: true })
  }
  const byDay = new Map(data.map((item, index) => [item.at, index]))
  for (const record of records) {
    const index = byDay.get(dayStart(record.at))
    if (index === undefined) continue
    const item = data[index]
    if (item === undefined) continue
    item.input += record.totalTokens - record.outputTokens
    item.turns++
    item.cacheRead += record.cacheReadTokens ?? 0
    item.cacheKnown &&= record.cacheReadTokens !== undefined
  }
  const points = mode === 'weekly'
    ? data.reduce<Point[]>((weeks, item) => {
      const date = new Date(item.at)
      const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() + 6) % 7).getTime()
      let week = weeks.at(-1)
      if (week?.at !== monday) {
        week = { at: monday, endAt: item.at, input: 0, turns: 0, cacheRead: 0, cacheKnown: true }
        weeks.push(week)
      }
      week.endAt = item.at
      week.input += item.input
      week.turns += item.turns
      week.cacheRead += item.cacheRead
      week.cacheKnown &&= item.cacheKnown
      return weeks
    }, [])
    : data
  if (mode === 'cumulative') {
    let input = 0
    for (const item of points) {
      input += item.input
      item.input = input
    }
  }
  const valueOf = (point: Point): number | undefined => {
    if (metric === 'turns') return point.turns
    if (metric === 'averageInput') return point.turns ? point.input / point.turns : 0
    if (metric === 'cacheRate') return point.turns && !point.cacheKnown ? undefined : point.input ? point.cacheRead / point.input * 100 : 0
    return point.input
  }
  const values = points.map(valueOf)
  const maximum = metric === 'cacheRate' ? 100 : Math.max(1, ...values.filter((value): value is number => value !== undefined))
  const position = (index: number) => {
    const x = 68 + (points.length === 1 ? 345 : index * 690 / (points.length - 1))
    return { x, y: 150 - (values[index] ?? 0) / maximum * 120 }
  }
  const line = values.map((value, index) => value === undefined ? '' : `${index === 0 || values[index - 1] === undefined ? 'M' : 'L'} ${position(index).x} ${position(index).y}`).join(' ')
  const activeIndex = hovered !== undefined && hovered < points.length ? hovered : undefined
  const active = activeIndex === undefined ? undefined : points[activeIndex]
  const activePosition = activeIndex === undefined ? undefined : position(activeIndex)
  const updateHover = (clientX: number, width: number, left: number): void => {
    const x = (clientX - left) / width * 790
    setHovered(points.length === 1 ? 0 : Math.max(0, Math.min(points.length - 1, Math.round((x - 68) / 690 * (points.length - 1)))))
  }
  const format = (value: number | undefined): string => value === undefined ? '—'
    : metric === 'cacheRate' ? `${value.toFixed(1)}%`
      : `${new Intl.NumberFormat(undefined, { maximumFractionDigits: metric === 'averageInput' ? 1 : 0 }).format(value)} ${metric === 'turns' ? t('turns') : t('tokenUnit')}`
  return <div className={css.chartWrap}>
    <svg className={css.chart} viewBox="0 0 790 180" role="img" aria-label={label} tabIndex={0}
      onPointerMove={event => { const bounds = event.currentTarget.getBoundingClientRect(); updateHover(event.clientX, bounds.width, bounds.left) }}
      onPointerLeave={() => { setHovered(undefined) }}
      onFocus={() => { setHovered(points.length - 1) }}
      onBlur={() => { setHovered(undefined) }}
      onKeyDown={event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
        event.preventDefault()
        setHovered(index => Math.max(0, Math.min(points.length - 1, (index ?? points.length - 1) + (event.key === 'ArrowLeft' ? -1 : 1))))
      }}>
      <rect width="790" height="180" fill="transparent" />
      {[0, 1, 2, 3].map(tick => {
        const y = 150 - tick * 40
        const value = maximum * tick / 3
        return <g key={tick}><line x1="68" x2="758" y1={y} y2={y} className={css.gridLine} />
          <text x="60" y={y + 4} textAnchor="end" className={css.chartTick}>{metric === 'cacheRate' ? `${Math.round(value)}%` : amount(value)}</text></g>
      })}
      <path d={line} className={css.inputLine} />
      {points.length === 1 && values[0] !== undefined && <circle cx={position(0).x} cy={position(0).y} r="3" className={css.chartPoint} />}
      {activePosition && <><line x1={activePosition.x} x2={activePosition.x} y1="30" y2="150" className={css.chartGuide} />
        {values[activeIndex ?? 0] !== undefined && <circle cx={activePosition.x} cy={activePosition.y} r="5" className={css.chartPoint} />}</>}
    </svg>
    {active && activePosition && <div className={css.chartTooltip} style={{ left: `${Math.max(10, Math.min(90, activePosition.x / 790 * 100))}%` }} role="status">
      <span>{mode === 'weekly' ? `${dayLabel(active.at)} – ${dayLabel(active.endAt)}` : new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(active.at)}</span>
      <strong>{label} · {format(values[activeIndex ?? 0])}</strong>
    </div>}
    <div className={css.chartAxis}><span>{dayLabel(points[0]?.at ?? anchor)}</span><span>{dayLabel(points.at(-1)?.endAt ?? anchor)}</span></div>
  </div>
}

function Heatmap({ records, years, year, selectedDay, onYearChange, onSelectDay, t }: {
  records: readonly UsageRecord[]
  years: readonly number[]
  year: number | 'rolling'
  selectedDay: number | undefined
  onYearChange: (year: number | 'rolling') => void
  onSelectDay: (day: number) => void
  t: Props['t']
}) {
  const totals = new Map<number, number>()
  for (const record of records) {
    const day = dayStart(record.at)
    totals.set(day, (totals.get(day) ?? 0) + record.totalTokens)
  }
  const today = dayStart(Date.now())
  const first = year === 'rolling'
    ? new Date(new Date(today).getFullYear(), new Date(today).getMonth(), new Date(today).getDate() - 364)
    : new Date(year, 0, 1)
  const last = year === 'rolling' ? today : new Date(year, 11, 31).getTime()
  const start = new Date(first.getFullYear(), first.getMonth(), first.getDate() - first.getDay())
  const cells: { at: number; total: number; visible: boolean; future: boolean }[] = []
  for (const day = new Date(start); day.getTime() <= last; day.setDate(day.getDate() + 1)) {
    cells.push({ at: day.getTime(), total: totals.get(day.getTime()) ?? 0,
      visible: day.getTime() >= first.getTime() && day.getTime() <= today,
      future: day.getTime() >= first.getTime() && day.getTime() > today })
  }
  while (cells.length % 7 !== 0) cells.push({ at: today, total: 0, visible: false, future: false })
  const weeks = cells.length / 7
  const months = Array.from({ length: weeks }, (_, week) => {
    const cell = cells[week * 7]
    if (cell === undefined) return ''
    const date = new Date(Math.max(cell.at, first.getTime()))
    const previousCell = week === 0 ? undefined : cells[(week - 1) * 7]
    const previous = previousCell === undefined ? undefined : new Date(Math.max(previousCell.at, first.getTime()))
    return previous === undefined || date.getMonth() !== previous.getMonth()
      ? new Intl.DateTimeFormat(undefined, { month: 'short' }).format(date)
      : ''
  })
  const active = [...totals].filter(([day, total]) => day >= first.getTime() && day <= last && total > 0)
  const max = Math.max(1, ...active.map(([, total]) => total))
  const streak = streaks(active.map(([day]) => day))
  return <section className={css.card}>
    <div className={css.cardHead}><div><h2>{t('heatmap')}</h2><p>{year === 'rolling' ? t('heatmapNote') : `${year} · ${t('oneCellDay')}`}</p></div>
      <label className={css.heatYear}>{t('heatmapRange')}<select value={year} onChange={event => { onYearChange(event.target.value === 'rolling' ? 'rolling' : Number(event.target.value)) }}>
        <option value="rolling">{t('rollingYear')}</option>{years.map(item => <option key={item} value={item}>{item}</option>)}
      </select></label>
    </div>
    <div className={css.heatScroll}><div className={css.monthLabels} style={{ gridTemplateColumns: `repeat(${weeks}, minmax(var(--usage-heat-cell-size), 1fr))`, minWidth: `${weeks * 12 + (weeks - 1) * 3}px` }}>
      {months.map((month, index) => <span key={index}>{month}</span>)}
    </div><div className={css.heatmap} style={{ gridTemplateColumns: `repeat(${weeks}, minmax(var(--usage-heat-cell-size), 1fr))`, minWidth: `${weeks * 12 + (weeks - 1) * 3}px` }}>
      {Array.from({ length: weeks }, (_, week) => <div className={css.heatWeek} key={week}>{cells.slice(week * 7, week * 7 + 7).map((cell, day) => {
        const level = cell.total === 0 ? 0 : Math.max(1, Math.ceil(cell.total / max * 4))
        const date = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric' }).format(cell.at)
        const detail = `${date}\n${new Intl.NumberFormat(undefined).format(cell.total)} ${t('tokenUnit')}`
        return <Tooltip key={day} label={detail} side="top" portal delayMs={80} disabled={!cell.visible}>
          <span className={`${css.heatCell} ${cell.visible ? css[`heat${level}`] : cell.future ? css.heatFuture : css.heatHidden} ${selectedDay === cell.at ? css.heatSelected : ''}`}
            role={cell.visible ? 'button' : undefined} tabIndex={cell.visible && (cell.at === (selectedDay ?? today)) ? 0 : -1}
            aria-label={cell.visible ? detail : undefined} aria-pressed={cell.visible ? selectedDay === cell.at : undefined}
            onClick={() => { if (cell.visible) onSelectDay(cell.at) }}
            onKeyDown={event => {
              if (!cell.visible) return
              if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelectDay(cell.at); return }
              const delta = event.key === 'ArrowRight' ? 7 : event.key === 'ArrowLeft' ? -7
                : event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0
              if (delta === 0) return
              event.preventDefault()
              const target = cells[week * 7 + day + delta]
              if (target?.visible) event.currentTarget.closest(`.${css.heatmap}`)
                ?.querySelector<HTMLElement>(`[data-day="${target.at}"]`)?.focus()
            }} data-day={cell.at} />
        </Tooltip>
      })}</div>)}
    </div></div>
    <div className={css.heatFoot}><span>{t('currentStreak')} <strong>{streak.current} {t('days')}</strong> · {t('longestStreak')} <strong>{streak.longest} {t('days')}</strong></span><span>{t('less')} <i className={css.heat0} /><i className={css.heat1} /><i className={css.heat2} /><i className={css.heat3} /><i className={css.heat4} /> {t('more')}</span></div>
  </section>
}

function RankBars({ rows, empty, unit }: { rows: readonly Rank[]; empty: string; unit: string }) {
  const total = Math.max(1, rows.reduce((sum, row) => sum + row.total, 0))
  return rows.length === 0 ? <p className={css.empty}>{empty}</p> : <div className={css.rankList}>
    {rows.slice(0, 6).map((row, index) => <Tooltip key={row.name} label={`${row.name}\n${new Intl.NumberFormat(undefined).format(row.total)} ${unit} · ${(row.total / total * 100).toFixed(1)}%`} side="top" portal>
      <div className={css.rankRow}>
      <div className={css.rankMeta}>
        <span>{row.name}</span>
        <strong>{amount(row.total)} · {(row.total / total * 100).toFixed(1)}%</strong>
      </div>
      <div className={css.track}>
        <span style={{ width: `${row.total / total * 100}%`, background: PROJECT_COLORS[index % PROJECT_COLORS.length] }} />
      </div>
    </div></Tooltip>)}
  </div>
}

function ShareDonut({ rows, empty, other, colors, unit }: {
  rows: readonly Rank[]
  empty: string
  other: string
  colors: readonly string[]
  unit: string
}) {
  const [hovered, setHovered] = useState<number | undefined>()
  const total = rows.reduce((sum, row) => sum + row.total, 0)
  if (total === 0) return <p className={css.empty}>{empty}</p>
  const shown = rows.length <= 6 ? rows : [
    ...rows.slice(0, 5),
    { name: other, total: rows.slice(5).reduce((sum, row) => sum + row.total, 0) },
  ]
  let offset = 0
  const stops = shown.map((row, index) => {
    const from = offset
    offset += row.total / total * 100
    return `${colors[index % colors.length]} ${from}% ${offset}%`
  })
  const detail = (row: Rank): string => `${row.name}\n${new Intl.NumberFormat(undefined).format(row.total)} ${unit} · ${(row.total / total * 100).toFixed(1)}%`
  const onDonutMove = (clientX: number, clientY: number, element: HTMLElement): void => {
    const bounds = element.getBoundingClientRect()
    const angle = (Math.atan2(clientX - bounds.left - bounds.width / 2, -(clientY - bounds.top - bounds.height / 2)) + 2 * Math.PI) % (2 * Math.PI)
    const share = angle / (2 * Math.PI) * total
    let used = 0
    setHovered(shown.findIndex(row => (used += row.total) > share))
  }
  return <div className={css.share}>
    <Tooltip label={hovered === undefined || hovered < 0 ? `${new Intl.NumberFormat(undefined).format(total)} ${unit}` : detail(shown[hovered]!)} side="top" portal>
      <div className={css.donut} style={{ background: `conic-gradient(${stops.join(', ')})` }}
        onPointerMove={event => { onDonutMove(event.clientX, event.clientY, event.currentTarget) }}
        onPointerLeave={() => { setHovered(undefined) }}><span>{amount(total)}</span></div>
    </Tooltip>
    <div className={css.shareLegend}>{shown.map((row, index) => <Tooltip key={`${index}:${row.name}`} label={detail(row)} side="top" portal><div>
      <i style={{ background: colors[index % colors.length] }} />
      <span>{row.name}</span>
      <strong>{(row.total / total * 100).toFixed(1)}%</strong>
    </div></Tooltip>)}</div>
  </div>
}

function sessionRoute(records: readonly UsageRecord[], id: SessionId, unknown: string): string {
  const own = records.filter(record => record.sessionId === id)
  const provider = grouped(own, record => record.provider ?? unknown)[0]?.name ?? unknown
  const model = grouped(own, record => record.model ?? unknown)[0]?.name ?? unknown
  return `${provider} / ${model}`
}

function QualityPanel({ issues, refreshing, onOpen, onRebuild, t }: {
  issues: readonly UsageIssue[]
  refreshing: boolean
  onOpen: (id: SessionId) => void
  onRebuild: () => void
  t: Props['t']
}) {
  const groups = [
    ['unreadable-session', t('unreadableSessions'), t('unreadableExplanation')],
    ['missing-turn', t('missingTurns'), t('missingExplanation')],
    ['unattributed-turn', t('unattributedTurns'), t('unattributedExplanation')],
  ] as const
  return <section className={css.qualityPanel} aria-label={t('dataQuality')}>
    <div className={css.qualityHead}><p>{t('qualityIntro')}</p><button disabled={refreshing} onClick={onRebuild}>{t('rebuild')}</button></div>
    {groups.map(([kind, label, explanation]) => {
      const own = issues.filter(issue => issue.kind === kind)
      const sessions = new Map<SessionId, { title: string; count: number; at?: number }>()
      for (const issue of own) {
        const previous = sessions.get(issue.sessionId)
        const at = Math.max(previous?.at ?? 0, issue.at ?? 0) || undefined
        sessions.set(issue.sessionId, { title: issue.title, count: (previous?.count ?? 0) + 1,
          ...(at === undefined ? {} : { at }) })
      }
      return <div className={css.qualityGroup} key={kind}>
        <div className={css.qualityGroupHead}><strong>{label} · {own.length}</strong><span>{explanation}</span></div>
        {sessions.size > 0 && <div className={css.qualityList}>{[...sessions].sort((a, b) => (b[1].at ?? 0) - (a[1].at ?? 0)).map(([id, item]) =>
          <button key={id} onClick={() => { onOpen(id) }}>
            <span>{item.title}</span><small>{kind === 'unreadable-session' ? t('openSession') : `${item.count} ${t('turns')}${item.at === undefined ? '' : ` · ${dayLabel(item.at)}`}`}</small>
          </button>)}</div>}
      </div>
    })}
  </section>
}

/** Render token activity, trends, breakdowns, and session navigation. @param props - localized page services. @returns dashboard. */
export function UsagePage({ useUsage, activate, retry, rebuild, openSession, t }: Props) {
  const { snapshot, error, refreshing, progress } = useUsage(state => state)
  const [period, setPeriod] = useState<Period>(30)
  const [selectedDay, setSelectedDay] = useState<number | undefined>()
  const [heatYear, setHeatYear] = useState<number | 'rolling'>('rolling')
  const [qualityOpen, setQualityOpen] = useState(false)
  const [project, setProject] = useState('')
  const [model, setModel] = useState('')
  const [trend, setTrend] = useState<Trend>('daily')
  const [trendModel, setTrendModel] = useState('')
  const [efficiencyMetric, setEfficiencyMetric] = useState<Exclude<ChartMetric, 'input'>>('turns')
  const [efficiencyMode, setEfficiencyMode] = useState<'daily' | 'weekly'>('daily')
  const [efficiencyModel, setEfficiencyModel] = useState('')
  const [sessionMode, setSessionMode] = useState<'high' | 'recent'>('high')
  useEffect(() => activate(), [activate])

  const now = snapshot?.capturedAt ?? Date.now()
  const today = dayStart(now)
  const anchor = selectedDay ?? today
  const anchorDate = new Date(anchor)
  const daysInView = selectedDay === undefined ? period : 1
  const start = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), anchorDate.getDate() - daysInView + 1).getTime()
  const end = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), anchorDate.getDate() + 1).getTime()
  const previousStart = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), anchorDate.getDate() - 2 * daysInView + 1).getTime()
  const sessionById = useMemo(() => new Map(snapshot?.sessions.map(session => [session.id, session]) ?? []), [snapshot])
  const projectById = useMemo(() => new Map(snapshot?.projects.map(item => [item.id, item.title]) ?? []), [snapshot])
  const projectRecords = (snapshot?.records ?? []).filter(record => !project || sessionById.get(record.sessionId)?.projectId === project)
  const models = [...new Set(projectRecords.map(record => record.model).filter((value): value is string => value !== undefined))].sort()
  const scoped = projectRecords.filter(record => !model || record.model === model)
  const selected = scoped.filter(record => record.at >= start && record.at < end)
  const trendModels = [...new Set(selected.map(record => record.model).filter((value): value is string => value !== undefined))].sort()
  const activeTrendModel = trendModels.includes(trendModel) ? trendModel : ''
  const trendRecords = selected.filter(record => !activeTrendModel || record.model === activeTrendModel)
  const activeEfficiencyModel = trendModels.includes(efficiencyModel) ? efficiencyModel : ''
  const efficiencyRecords = selected.filter(record => !activeEfficiencyModel || record.model === activeEfficiencyModel)
  const efficiencyInput = efficiencyRecords.reduce((sum, record) => sum + record.totalTokens - record.outputTokens, 0)
  const efficiencyCacheKnown = efficiencyRecords.length > 0 && efficiencyRecords.every(record => record.cacheReadTokens !== undefined)
  const efficiencyCacheShare = efficiencyCacheKnown && efficiencyInput > 0
    ? `${(efficiencyRecords.reduce((sum, record) => sum + (record.cacheReadTokens ?? 0), 0) / efficiencyInput * 100).toFixed(1)}%` : '—'
  const previous = scoped.filter(record => record.at >= previousStart && record.at < start)
  const allHeat = scoped
  const total = selected.reduce((sum, record) => sum + record.totalTokens, 0)
  const prior = previous.reduce((sum, record) => sum + record.totalTokens, 0)
  const dayTotals = grouped(selected, record => String(dayStart(record.at)))
  const peak = Math.max(0, ...dayTotals.map(day => day.total))
  const priorDays = grouped(previous, record => String(dayStart(record.at)))
  const priorPeak = Math.max(0, ...priorDays.map(day => day.total))
  const cacheComplete = selected.length > 0 && selected.every(record => record.cacheReadTokens !== undefined)
  const cacheRead = selected.reduce((sum, record) => sum + (record.cacheReadTokens ?? 0), 0)
  const prompt = selected.reduce((sum, record) => sum + record.totalTokens - record.outputTokens, 0)
  const cacheRate = cacheComplete && prompt > 0 ? `${(cacheRead / prompt * 100).toFixed(1)}%` : '—'
  const previousCacheComplete = previous.length > 0 && previous.every(record => record.cacheReadTokens !== undefined)
  const previousPrompt = previous.reduce((sum, record) => sum + record.totalTokens - record.outputTokens, 0)
  const previousRate = previousCacheComplete && previousPrompt > 0
    ? previous.reduce((sum, record) => sum + (record.cacheReadTokens ?? 0), 0) / previousPrompt * 100
    : undefined
  const cacheDelta = previousRate === undefined || cacheRate === '—' ? '—' : `${(Number.parseFloat(cacheRate) - previousRate).toFixed(1)} ${t('percentagePoints')}`
  const projectIssues = (snapshot?.issues ?? []).filter(issue => !project || issue.projectId === project)
  const qualityIssues = projectIssues.filter(issue => issue.at === undefined || (issue.at >= start && issue.at < end))
  const unreadableIssues = qualityIssues.filter(issue => issue.kind === 'unreadable-session')
  const missingIssues = qualityIssues.filter(issue => issue.kind === 'missing-turn')
  const unattributedIssues = qualityIssues.filter(issue => issue.kind === 'unattributed-turn')
  const completedTurns = efficiencyRecords.length
  const averageInputPerTurn = completedTurns ? efficiencyInput / completedTurns : 0
  const coverage = !model && !activeEfficiencyModel && unreadableIssues.length === 0 && completedTurns + missingIssues.length > 0
    ? `${(completedTurns / (completedTurns + missingIssues.length) * 100).toFixed(1)}%` : '—'
  const modelRows = grouped(selected, record => record.model ?? t('unknown'))
  const heatYears = [...new Set([new Date(today).getFullYear(), ...(snapshot?.records ?? []).map(record => new Date(record.at).getFullYear())])].sort((a, b) => b - a)
  const providerRows = grouped(selected, record => record.provider ?? t('unknown'))
  const projectRows = grouped(selected, record => projectById.get(sessionById.get(record.sessionId)?.projectId ?? '') ?? t('unknown'))
  const sessionTotals = new Map<SessionId, number>()
  for (const record of selected) sessionTotals.set(record.sessionId, (sessionTotals.get(record.sessionId) ?? 0) + record.totalTokens)
  const sessions = (snapshot?.sessions ?? []).filter((session) => {
    if (project && session.projectId !== project) return false
    if (model && !sessionTotals.has(session.id)) return false
    return sessionMode === 'high' ? sessionTotals.has(session.id) : session.lastAt >= start && session.lastAt < end
  }).sort((a, b) => sessionMode === 'high'
    ? (sessionTotals.get(b.id) ?? 0) - (sessionTotals.get(a.id) ?? 0)
    : b.lastAt - a.lastAt).slice(0, 10)

  return <main className={css.page}><div className={css.content}>
    <header className={css.pageHead}><div><h1>{t('title')}</h1><p>{t('subtitle')}</p></div></header>
    {error && <div className={css.notice} role="alert">{snapshot ? t('staleError') : t('error')} <button onClick={retry}>{t('retry')}</button></div>}
    {!snapshot && !error && <div className={css.loading} role="status"><i />{t('loading')}{progress?.total ? ` · ${progress.completed}/${progress.total}` : ''}</div>}
    {snapshot && <>
      <div className={css.toolbar}>
        <div className={css.toolbarStatus}><span>{refreshing
          ? `${t('refreshing')}${progress?.total ? ` ${progress.completed}/${progress.total}` : ''}`
          : `${error ? t('staleAsOf') : t('updatedAt')} ${new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(snapshot.capturedAt)}`}</span>
          <button disabled={refreshing} onClick={retry}>{t('refresh')}</button>
          <button className={css.qualityToggle} aria-expanded={qualityOpen} onClick={() => { setQualityOpen(!qualityOpen) }}>
            {t('dataQuality')} · {unreadableIssues.length} {t('sessionsUnit')} / {missingIssues.length} {t('turns')} / {unattributedIssues.length} {t('unattributedShort')}
          </button>
        </div>
        <div className={css.filters}>
          <label>{t('period')}<select value={selectedDay === undefined ? period : 'selected'} onChange={(event) => { setSelectedDay(undefined); setPeriod(Number(event.target.value) as Period); setTrendModel('') }}>
            {selectedDay !== undefined && <option value="selected">{new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' }).format(selectedDay)}</option>}
            <option value={7}>{t('days7')}</option><option value={30}>{t('days30')}</option><option value={90}>{t('days90')}</option><option value={365}>{t('days365')}</option>
          </select></label>
          <label>{t('project')}<select value={project} onChange={(event) => { setProject(event.target.value); setModel(''); setTrendModel('') }}>
            <option value="">{t('allProjects')}</option>{snapshot.projects.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
          </select></label>
          <label>{t('model')}<select value={model} onChange={(event) => { setModel(event.target.value); setTrendModel('') }}>
            <option value="">{t('allModels')}</option>{models.map(item => <option key={item} value={item}>{item}</option>)}
          </select></label>
        </div>
      </div>
      {selectedDay !== undefined && <button className={css.clearDay} onClick={() => { setSelectedDay(undefined) }}>{t('clearDay')}</button>}
      {qualityOpen && <QualityPanel issues={qualityIssues} refreshing={refreshing} onOpen={openSession} onRebuild={rebuild} t={t} />}
      <section className={css.summary} aria-label={t('title')}>
        {[
          [t('total'), amount(total), `${t('compared')} ${change(total, prior)}`],
          [t('average'), amount(Math.round(total / daysInView)), `${t('compared')} ${change(total, prior)}`],
          [t('peak'), amount(peak), `${t('compared')} ${change(peak, priorPeak)}`],
          [t('active'), `${dayTotals.length} ${t('days')}`, `${t('compared')} ${change(dayTotals.length, priorDays.length)}`],
          [t('cacheRate'), cacheRate, `${t('compared')} ${cacheDelta}`],
        ].map(([label, value, note]) => <div className={css.stat} key={label}>
          <span>{label}</span><strong>{value}</strong><small>{note}</small>
        </div>)}
      </section>
      <Heatmap records={allHeat} years={heatYears} year={heatYear} selectedDay={selectedDay}
        onYearChange={value => { setHeatYear(value); setSelectedDay(undefined) }}
        onSelectDay={value => { setSelectedDay(current => current === value ? undefined : value); setTrendModel('') }} t={t} />
      <section className={css.card}><div className={css.cardHead}><div><h2>{t('trend')}</h2><p>{t('trendNote')}</p></div><div className={css.trendControls}>
        <label className={css.trendSelect}>{t('trendScope')}<select value={activeTrendModel} onChange={(event) => { setTrendModel(event.target.value) }}>
          <option value="">{t('trendTotal')}</option>{trendModels.map(item => <option key={item} value={item}>{item}</option>)}
        </select></label>
        <div className={css.segments}>{(['daily', 'weekly', 'cumulative'] as const).map(mode => <button key={mode} className={trend === mode ? css.selected : ''} onClick={() => { setTrend(mode) }}>{t(mode)}</button>)}</div>
      </div></div>
        <div className={css.legend}><span className={css.inputDot} />{t('input')}</div>
        {trendRecords.length ? <TrendChart records={trendRecords} period={daysInView} anchorAt={anchor} mode={trend} metric="input" label={`${t('input')} · ${activeTrendModel || t('trendTotal')}`} t={t} /> : <p className={css.empty}>{t('noData')}</p>}
      </section>
      <section className={css.card}>
        <div className={css.cardHead}><div><h2>{t('efficiency')}</h2><p>{t('efficiencyNote')}</p></div><div className={css.trendControls}>
          <label className={css.trendSelect}>{t('trendScope')}<select value={activeEfficiencyModel} onChange={event => { setEfficiencyModel(event.target.value) }}>
            <option value="">{t('trendTotal')}</option>{trendModels.map(item => <option key={item} value={item}>{item}</option>)}
          </select></label>
          <label className={css.trendSelect}>{t('efficiencyMetric')}<select value={efficiencyMetric} onChange={event => { setEfficiencyMetric(event.target.value as typeof efficiencyMetric) }}>
            <option value="turns">{t('completedTurns')}</option><option value="averageInput">{t('averageInputPerTurn')}</option><option value="cacheRate">{t('cacheReadShare')}</option>
          </select></label>
          <div className={css.segments}>{(['daily', 'weekly'] as const).map(mode => <button key={mode} className={efficiencyMode === mode ? css.selected : ''} onClick={() => { setEfficiencyMode(mode) }}>{t(mode)}</button>)}</div>
        </div></div>
        <div className={css.efficiencyStats}>
          <div><span>{t('completedTurns')}</span><strong>{new Intl.NumberFormat(undefined).format(completedTurns)}</strong></div>
          <div><span>{t('averageInputPerTurn')}</span><strong>{completedTurns ? amount(averageInputPerTurn) : '—'}</strong></div>
          <div><span>{t('cacheReadShare')}</span><strong>{efficiencyCacheShare}</strong></div>
          <div><Tooltip label={t('coverageExplanation')} side="top" portal><span>{t('measuredCoverage')} ⓘ</span></Tooltip><strong>{coverage}</strong></div>
        </div>
        {efficiencyRecords.length ? <TrendChart records={efficiencyRecords} period={daysInView} anchorAt={anchor} mode={efficiencyMode} metric={efficiencyMetric}
          label={`${efficiencyMetric === 'turns' ? t('completedTurns') : efficiencyMetric === 'averageInput' ? t('averageInputPerTurn') : t('cacheReadShare')} · ${activeEfficiencyModel || t('trendTotal')}`} t={t} />
          : <p className={css.empty}>{t('noData')}</p>}
      </section>
      <div className={css.twoCols}>
        <section className={css.card}><h2>{t('composition')}</h2><div className={css.composition}>
          {([
            [t('uncached'), selected.reduce((sum, record) => sum + record.inputTokens, 0)],
            [t('cacheRead'), cacheRead],
            [t('cacheWrite'), selected.reduce((sum, record) => sum + (record.cacheWriteTokens ?? 0), 0)],
            [t('output'), selected.reduce((sum, record) => sum + record.outputTokens, 0)],
            [t('unknownInput'), selected.reduce((sum, record) => sum + Math.max(0, record.totalTokens - record.inputTokens - record.outputTokens - (record.cacheReadTokens ?? 0) - (record.cacheWriteTokens ?? 0)), 0)],
          ] as const).map(([name, value], index) => <Tooltip key={name} label={`${name}\n${new Intl.NumberFormat(undefined).format(value)} ${t('tokenUnit')} · ${total ? (value / total * 100).toFixed(1) : '0.0'}%`} side="top" portal>
            <div className={css.compRow}><span>{name}</span><div className={css.track}><span style={{ width: `${total ? value / total * 100 : 0}%`, background: COMPOSITION_COLORS[index] }} /></div><strong>{amount(value)}</strong></div>
          </Tooltip>)}
        </div></section>
        <section className={css.card}><h2>{t('models')}</h2><ShareDonut rows={modelRows} empty={t('noData')} other={t('other')} colors={MODEL_COLORS} unit={t('tokenUnit')} /></section>
        <section className={css.card}><h2>{t('projects')}</h2><RankBars rows={projectRows} empty={t('noData')} unit={t('tokenUnit')} /></section>
        <section className={css.card}><h2>{t('providers')}</h2><ShareDonut rows={providerRows} empty={t('noData')} other={t('other')} colors={PROVIDER_COLORS} unit={t('tokenUnit')} /></section>
      </div>
      <section className={css.card}><div className={css.cardHead}><h2>{t('sessions')}</h2><div className={css.segments}><button className={sessionMode === 'high' ? css.selected : ''} onClick={() =>{  setSessionMode('high') }}>{t('highUsage')}</button><button className={sessionMode === 'recent' ? css.selected : ''} onClick={() =>{  setSessionMode('recent') }}>{t('recent')}</button></div></div>
        {sessions.length === 0 ? <p className={css.empty}>{t('noData')}</p> : <div className={css.sessionList}>{sessions.map((session, index) => <button key={session.id} className={css.sessionRow} onClick={() =>{  openSession(session.id) }} title={t('openSession')}>
          <span className={css.sessionIndex}>{index + 1}</span><span className={css.sessionText}><strong>{session.title}</strong><small>{projectById.get(session.projectId ?? '') ?? t('unknown')} · {sessionMode === 'recent' ? `${t('lastChat')} ${dayLabel(session.lastAt)}` : sessionRoute(selected, session.id, t('unknown'))}</small></span><span className={css.sessionTotal}>{amount(sessionTotals.get(session.id) ?? 0)} {t('tokenUnit')}</span>
        </button>)}</div>}
      </section>
    </>}
  </div></main>
}
