/** Interactive charts over one Host observation of durable token usage. */
import { useEffect, useMemo, useState } from 'react'
import type { HostObservable, InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import type { UsageIssue, UsageProgress, UsageRecord, UsageSnapshot } from '@deepseek-ai/dsh-client-ui-usage/types'
import { Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import { deriveDashboard, dayStart, shiftDay, streaks, type Period, type Rank, type SessionMode } from './derive.ts'
import css from './UsagePage.module.css'

/** Dashboard observation shared with the page while it is mounted. */
export interface UsagePageState {
  readonly snapshot?: UsageSnapshot
  readonly error: boolean
  readonly refreshing: boolean
}

/** Transient progress of the current observation; never persisted. */
export interface UsagePageProgress {
  readonly progress?: UsageProgress
}

/** Operations and observable data supplied by the browser plugin. */
export interface UsagePageInjected {
  readonly hooks: {
    readonly usage: HostObservable<UsagePageState>
    readonly progress: HostObservable<UsagePageProgress>
  }
  readonly activate: () => () => void
  readonly retry: () => void
  readonly rebuild: () => void
  readonly openSession: (id: SessionId) => void
}

type Props = PropsRuntime<'main'> & PropsLocale<'usageStatistics'> & InjectFace<UsagePageInjected>
type Trend = 'daily' | 'weekly' | 'cumulative'
type ChartMetric = 'input' | 'turns' | 'averageInput' | 'cacheRate'
const MODEL_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-model-${index})`)
const PROJECT_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-project-${index})`)
const PROVIDER_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-provider-${index})`)
const COMPOSITION_COLORS = Array.from({ length: 5 }, (_, index) => `var(--usage-composition-${index})`)

// Formatters are costly to construct; the heatmap alone formats hundreds of dates per render.
const INTEGER = new Intl.NumberFormat(undefined)
const DECIMAL = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 })
const COMPACT = new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 })
const DAY_SHORT = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' })
const DAY_MEDIUM = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
const DAY_LONG = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
const DAY_NUMERIC = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' })
const MONTH_SHORT = new Intl.DateTimeFormat(undefined, { month: 'short' })
const DATE_TIME = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })

function amount(value: number): string {
  return (value >= 10_000 ? COMPACT : DECIMAL).format(value)
}

function percent(value: number | undefined): string {
  return value === undefined ? '—' : `${value.toFixed(1)}%`
}

function signed(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}`
}

function change(current: number, previous: number): string {
  return previous > 0 ? `${signed((current - previous) / previous * 100)}%` : '—'
}

function share(value: number, total: number): string {
  return `${(total ? value / total * 100 : 0).toFixed(1)}%`
}

/** Subscribes to progress alone so 500 ms progress ticks do not re-render the dashboard. */
function ProgressCount({ useProgress, prefix }: { useProgress: Props['useProgress']; prefix: string }) {
  const progress = useProgress(state => state.progress)
  return <>{progress?.total ? `${prefix}${progress.completed}/${progress.total}` : ''}</>
}

function TrendChart({ records, period, anchorAt, mode, metric, label, t }: {
  records: readonly UsageRecord[]; period: Period; anchorAt: number; mode: Trend; metric: ChartMetric; label: string; t: Props['t']
}) {
  const [hovered, setHovered] = useState<number | undefined>()
  const anchor = dayStart(anchorAt)
  type Point = { at: number; endAt: number; input: number; turns: number; cacheRead: number; cacheKnown: boolean }
  const data: Point[] = []
  for (let offset = period - 1; offset >= 0; offset--) {
    const at = shiftDay(anchor, -offset)
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
      const monday = shiftDay(item.at, -((new Date(item.at).getDay() + 6) % 7))
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
  // Ratios of an empty bucket are unknown, not zero: leave a gap instead of dragging the line down.
  const valueOf = (point: Point): number | undefined => {
    if (metric === 'turns') return point.turns
    if (metric === 'averageInput') return point.turns ? point.input / point.turns : undefined
    if (metric === 'cacheRate') return point.turns === 0 || !point.cacheKnown ? undefined : point.input ? point.cacheRead / point.input * 100 : 0
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
      : `${(metric === 'averageInput' ? DECIMAL : INTEGER).format(value)} ${metric === 'turns' ? t('turns') : t('tokenUnit')}`
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
      {values.map((value, index) => value !== undefined && values[index - 1] === undefined && values[index + 1] === undefined
        ? <circle key={index} cx={position(index).x} cy={position(index).y} r="3" className={css.chartPoint} /> : null)}
      {activePosition && <><line x1={activePosition.x} x2={activePosition.x} y1="30" y2="150" className={css.chartGuide} />
        {values[activeIndex ?? 0] !== undefined && <circle cx={activePosition.x} cy={activePosition.y} r="5" className={css.chartPoint} />}</>}
    </svg>
    {active && activePosition && <div className={css.chartTooltip} style={{ left: `${Math.max(10, Math.min(90, activePosition.x / 790 * 100))}%` }} role="status">
      <span>{mode === 'weekly' ? `${DAY_SHORT.format(active.at)} – ${DAY_SHORT.format(active.endAt)}` : DAY_MEDIUM.format(active.at)}</span>
      <strong>{label} · {format(values[activeIndex ?? 0])}</strong>
    </div>}
    <div className={css.chartAxis}><span>{DAY_SHORT.format(points[0]?.at ?? anchor)}</span><span>{DAY_SHORT.format(points.at(-1)?.endAt ?? anchor)}</span></div>
  </div>
}

type HeatCell = { at: number; total: number; visible: boolean; future: boolean }

function Heatmap({ records, years, year, today, selectedDay, onYearChange, onSelectDay, t }: {
  records: readonly UsageRecord[]
  years: readonly number[]
  year: number | 'rolling'
  today: number
  selectedDay: number | undefined
  onYearChange: (year: number | 'rolling') => void
  onSelectDay: (day: number) => void
  t: Props['t']
}) {
  const grid = useMemo(() => {
    const totals = new Map<number, number>()
    for (const record of records) {
      const day = dayStart(record.at)
      totals.set(day, (totals.get(day) ?? 0) + record.totalTokens)
    }
    const first = year === 'rolling' ? shiftDay(today, -364) : new Date(year, 0, 1).getTime()
    const last = year === 'rolling' ? today : new Date(year, 11, 31).getTime()
    // Weeks start on Monday, like the weekly trend buckets.
    const start = shiftDay(first, -((new Date(first).getDay() + 6) % 7))
    const cells: HeatCell[] = []
    for (let day = start; day <= last; day = shiftDay(day, 1)) {
      cells.push({ at: day, total: totals.get(day) ?? 0, visible: day >= first && day <= today, future: day >= first && day > today })
    }
    while (cells.length % 7 !== 0) cells.push({ at: today, total: 0, visible: false, future: false })
    const weeks = cells.length / 7
    const months = Array.from({ length: weeks }, (_, week) => {
      const cell = cells[week * 7]
      if (cell === undefined) return ''
      const date = Math.max(cell.at, first)
      const previousCell = week === 0 ? undefined : cells[(week - 1) * 7]
      const previous = previousCell === undefined ? undefined : Math.max(previousCell.at, first)
      return previous === undefined || new Date(date).getMonth() !== new Date(previous).getMonth()
        ? MONTH_SHORT.format(date) : ''
    })
    const active = [...totals].filter(([day, total]) => day >= first && day <= last && total > 0)
    const max = Math.max(1, ...active.map(([, total]) => total))
    const lastShown = Math.min(last, today)
    return { cells, weeks, months, max, first, lastShown, streak: streaks(active.map(([day]) => day), first, lastShown) }
  }, [records, year, today])
  const { cells, weeks, months, max, first, lastShown, streak } = grid
  // Exactly one cell is a tab stop; fall back to the range's last day when the selection or today is outside it.
  const tabStop = selectedDay !== undefined && selectedDay >= first && selectedDay <= lastShown ? selectedDay : lastShown
  const size = { gridTemplateColumns: `repeat(${weeks}, minmax(var(--usage-heat-cell-size), 1fr))`, minWidth: `${weeks * 12 + (weeks - 1) * 3}px` }
  return <section className={css.card}>
    <div className={css.cardHead}><div><h2>{t('heatmap')}</h2><p>{year === 'rolling' ? t('heatmapNote') : `${year} · ${t('oneCellDay')}`}</p></div>
      <label className={css.heatYear}>{t('heatmapRange')}<select value={year} onChange={event => { onYearChange(event.target.value === 'rolling' ? 'rolling' : Number(event.target.value)) }}>
        <option value="rolling">{t('rollingYear')}</option>{years.map(item => <option key={item} value={item}>{item}</option>)}
      </select></label>
    </div>
    <div className={css.heatScroll}><div className={css.monthLabels} style={size}>
      {months.map((month, index) => <span key={index}>{month}</span>)}
    </div><div className={css.heatmap} style={size}>
      {Array.from({ length: weeks }, (_, week) => <div className={css.heatWeek} key={week}>{cells.slice(week * 7, week * 7 + 7).map((cell, day) => {
        // Square-root scale keeps ordinary days visible next to a single extreme peak.
        const level = cell.total === 0 ? 0 : Math.min(4, Math.max(1, Math.ceil(Math.sqrt(cell.total / max) * 4)))
        const detail = `${DAY_LONG.format(cell.at)}\n${INTEGER.format(cell.total)} ${t('tokenUnit')}`
        return <Tooltip key={day} label={detail} side="top" portal delayMs={80} disabled={!cell.visible}>
          <span className={`${css.heatCell} ${cell.visible ? css[`heat${level}`] : cell.future ? css.heatFuture : css.heatHidden} ${selectedDay === cell.at ? css.heatSelected : ''}`}
            role={cell.visible ? 'button' : undefined} tabIndex={cell.visible && cell.at === tabStop ? 0 : -1}
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
    <div className={css.heatFoot}><span>{lastShown === today && <>{t('currentStreak')} <strong>{streak.current} {t('days')}</strong> · </>}{t('longestStreak')} <strong>{streak.longest} {t('days')}</strong></span><span>{t('less')} <i className={css.heat0} /><i className={css.heat1} /><i className={css.heat2} /><i className={css.heat3} /><i className={css.heat4} /> {t('more')}</span></div>
  </section>
}

function RankBars({ rows, empty, unit }: { rows: readonly Rank[]; empty: string; unit: string }) {
  const total = Math.max(1, rows.reduce((sum, row) => sum + row.total, 0))
  return rows.length === 0 ? <p className={css.empty}>{empty}</p> : <div className={css.rankList}>
    {rows.slice(0, 6).map((row, index) => <Tooltip key={row.name} label={`${row.name}\n${INTEGER.format(row.total)} ${unit} · ${share(row.total, total)}`} side="top" portal>
      <div className={css.rankRow}>
      <div className={css.rankMeta}>
        <span>{row.name}</span>
        <strong>{amount(row.total)} · {share(row.total, total)}</strong>
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
  const detail = (row: Rank): string => `${row.name}\n${INTEGER.format(row.total)} ${unit} · ${share(row.total, total)}`
  const onDonutMove = (clientX: number, clientY: number, element: HTMLElement): void => {
    const bounds = element.getBoundingClientRect()
    const angle = (Math.atan2(clientX - bounds.left - bounds.width / 2, -(clientY - bounds.top - bounds.height / 2)) + 2 * Math.PI) % (2 * Math.PI)
    const portion = angle / (2 * Math.PI) * total
    let used = 0
    setHovered(shown.findIndex(row => (used += row.total) > portion))
  }
  return <div className={css.share}>
    <Tooltip label={hovered === undefined || hovered < 0 ? `${INTEGER.format(total)} ${unit}` : detail(shown[hovered]!)} side="top" portal>
      <div className={css.donut} style={{ background: `conic-gradient(${stops.join(', ')})` }}
        onPointerMove={event => { onDonutMove(event.clientX, event.clientY, event.currentTarget) }}
        onPointerLeave={() => { setHovered(undefined) }}><span>{amount(total)}</span></div>
    </Tooltip>
    <div className={css.shareLegend}>{shown.map((row, index) => <Tooltip key={`${index}:${row.name}`} label={detail(row)} side="top" portal><div>
      <i style={{ background: colors[index % colors.length] }} />
      <span>{row.name}</span>
      <strong>{share(row.total, total)}</strong>
    </div></Tooltip>)}</div>
  </div>
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
            <span>{item.title}</span><small>{kind === 'unreadable-session' ? t('openSession') : `${item.count} ${t('turns')}${item.at === undefined ? '' : ` · ${DAY_SHORT.format(item.at)}`}`}</small>
          </button>)}</div>}
      </div>
    })}
  </section>
}

/** Render token activity, trends, breakdowns, and session navigation. @param props - localized page services. @returns dashboard. */
export function UsagePage({ useUsage, useProgress, activate, retry, rebuild, openSession, t }: Props) {
  const snapshot = useUsage(state => state.snapshot)
  const error = useUsage(state => state.error)
  const refreshing = useUsage(state => state.refreshing)
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
  const [sessionMode, setSessionMode] = useState<SessionMode>('high')
  useEffect(() => activate(), [activate])

  const unknown = t('unknown')
  const view = useMemo(() => snapshot === undefined ? undefined : deriveDashboard(
    snapshot, { period, selectedDay, project, model, trendModel, efficiencyModel, sessionMode }, unknown,
  ), [snapshot, period, selectedDay, project, model, trendModel, efficiencyModel, sessionMode, unknown])
  const efficiencyLabel = efficiencyMetric === 'turns' ? t('completedTurns')
    : efficiencyMetric === 'averageInput' ? t('averageInputPerTurn') : t('cacheReadShare')

  return <main className={css.page}><div className={css.content}>
    <header className={css.pageHead}><div><h1>{t('title')}</h1><p>{t('subtitle')}</p></div></header>
    {error && <div className={css.notice} role="alert">{snapshot ? t('staleError') : t('error')} <button onClick={retry}>{t('retry')}</button></div>}
    {!snapshot && !error && <div className={css.loading} role="status"><i />{t('loading')}<ProgressCount useProgress={useProgress} prefix=" · " /></div>}
    {snapshot && view && <>
      <div className={css.toolbar}>
        <div className={css.toolbarStatus}><span>{refreshing
          ? <>{t('refreshing')}<ProgressCount useProgress={useProgress} prefix=" " /></>
          : `${error ? t('staleAsOf') : t('updatedAt')} ${DATE_TIME.format(snapshot.capturedAt)}`}</span>
          <button disabled={refreshing} onClick={retry}>{t('refresh')}</button>
          <button className={css.qualityToggle} aria-expanded={qualityOpen} onClick={() => { setQualityOpen(!qualityOpen) }}>
            {t('dataQuality')} · {view.unreadable} {t('sessionsUnit')} / {view.missing} {t('turns')} / {view.unattributed} {t('unattributedShort')}
          </button>
        </div>
        <div className={css.filters}>
          <label>{t('period')}<select value={selectedDay === undefined ? period : 'selected'} onChange={(event) => { setSelectedDay(undefined); setPeriod(Number(event.target.value) as Period); setTrendModel('') }}>
            {selectedDay !== undefined && <option value="selected">{DAY_NUMERIC.format(selectedDay)}</option>}
            <option value={7}>{t('days7')}</option><option value={30}>{t('days30')}</option><option value={90}>{t('days90')}</option><option value={365}>{t('days365')}</option>
          </select></label>
          <label>{t('project')}<select value={project} onChange={(event) => { setProject(event.target.value); setModel(''); setTrendModel('') }}>
            <option value="">{t('allProjects')}</option>{snapshot.projects.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
          </select></label>
          <label>{t('model')}<select value={model} onChange={(event) => { setModel(event.target.value); setTrendModel('') }}>
            <option value="">{t('allModels')}</option>{view.models.map(item => <option key={item} value={item}>{item}</option>)}
          </select></label>
        </div>
      </div>
      {selectedDay !== undefined && <button className={css.clearDay} onClick={() => { setSelectedDay(undefined) }}>{t('clearDay')}</button>}
      {qualityOpen && <QualityPanel issues={view.qualityIssues} refreshing={refreshing} onOpen={openSession} onRebuild={rebuild} t={t} />}
      <section className={css.summary} aria-label={t('title')}>
        {[
          [t('total'), amount(view.total), `${t('compared')} ${change(view.total, view.prior)}`],
          [t('average'), amount(Math.round(view.total / view.daysInView)), `${t('compared')} ${change(view.total, view.prior)}`],
          [t('peak'), amount(view.peak), `${t('compared')} ${change(view.peak, view.priorPeak)}`],
          [t('active'), `${view.activeDays} ${t('days')}`, `${t('compared')} ${change(view.activeDays, view.priorActiveDays)}`],
          [t('cacheRate'), percent(view.cacheRate), `${t('compared')} ${view.cacheRateDelta === undefined ? '—' : `${signed(view.cacheRateDelta)} ${t('percentagePoints')}`}`],
        ].map(([label, value, note]) => <div className={css.stat} key={label}>
          <span>{label}</span><strong>{value}</strong><small>{note}</small>
        </div>)}
      </section>
      <Heatmap records={view.scoped} years={view.heatYears} year={heatYear} today={view.today} selectedDay={selectedDay}
        onYearChange={value => { setHeatYear(value); setSelectedDay(undefined) }}
        onSelectDay={value => { setSelectedDay(current => current === value ? undefined : value); setTrendModel('') }} t={t} />
      <section className={css.card}><div className={css.cardHead}><div><h2>{t('trend')}</h2><p>{t('trendNote')}</p></div><div className={css.trendControls}>
        <label className={css.trendSelect}>{t('trendScope')}<select value={view.activeTrendModel} onChange={(event) => { setTrendModel(event.target.value) }}>
          <option value="">{t('trendTotal')}</option>{view.trendModels.map(item => <option key={item} value={item}>{item}</option>)}
        </select></label>
        <div className={css.segments}>{(['daily', 'weekly', 'cumulative'] as const).map(mode => <button key={mode} className={trend === mode ? css.selected : ''} onClick={() => { setTrend(mode) }}>{t(mode)}</button>)}</div>
      </div></div>
        <div className={css.legend}><span className={css.inputDot} />{t('input')}</div>
        {view.trendRecords.length ? <TrendChart records={view.trendRecords} period={view.daysInView} anchorAt={view.anchor} mode={trend} metric="input" label={`${t('input')} · ${view.activeTrendModel || t('trendTotal')}`} t={t} /> : <p className={css.empty}>{t('noData')}</p>}
      </section>
      <section className={css.card}>
        <div className={css.cardHead}><div><h2>{t('efficiency')}</h2><p>{t('efficiencyNote')}</p></div><div className={css.trendControls}>
          <label className={css.trendSelect}>{t('trendScope')}<select value={view.activeEfficiencyModel} onChange={event => { setEfficiencyModel(event.target.value) }}>
            <option value="">{t('trendTotal')}</option>{view.trendModels.map(item => <option key={item} value={item}>{item}</option>)}
          </select></label>
          <label className={css.trendSelect}>{t('efficiencyMetric')}<select value={efficiencyMetric} onChange={event => { setEfficiencyMetric(event.target.value as typeof efficiencyMetric) }}>
            <option value="turns">{t('completedTurns')}</option><option value="averageInput">{t('averageInputPerTurn')}</option><option value="cacheRate">{t('cacheReadShare')}</option>
          </select></label>
          <div className={css.segments}>{(['daily', 'weekly'] as const).map(mode => <button key={mode} className={efficiencyMode === mode ? css.selected : ''} onClick={() => { setEfficiencyMode(mode) }}>{t(mode)}</button>)}</div>
        </div></div>
        <div className={css.efficiencyStats}>
          <div><span>{t('completedTurns')}</span><strong>{INTEGER.format(view.completedTurns)}</strong></div>
          <div><span>{t('averageInputPerTurn')}</span><strong>{view.averageInputPerTurn === undefined ? '—' : amount(view.averageInputPerTurn)}</strong></div>
          <div><span>{t('cacheReadShare')}</span><strong>{percent(view.efficiencyCacheShare)}</strong></div>
          <div><Tooltip label={t('coverageExplanation')} side="top" portal><span>{t('measuredCoverage')} ⓘ</span></Tooltip><strong>{percent(view.coverage)}</strong></div>
        </div>
        {view.efficiencyRecords.length ? <TrendChart records={view.efficiencyRecords} period={view.daysInView} anchorAt={view.anchor} mode={efficiencyMode} metric={efficiencyMetric}
          label={`${efficiencyLabel} · ${view.activeEfficiencyModel || t('trendTotal')}`} t={t} />
          : <p className={css.empty}>{t('noData')}</p>}
      </section>
      <div className={css.twoCols}>
        <section className={css.card}><h2>{t('composition')}</h2><div className={css.composition}>
          {([
            [t('uncached'), view.composition.uncached],
            [t('cacheRead'), view.composition.cacheRead],
            [t('cacheWrite'), view.composition.cacheWrite],
            [t('output'), view.composition.output],
            [t('unknownInput'), view.composition.other],
          ] as const).map(([name, value], index) => <Tooltip key={name} label={`${name}\n${INTEGER.format(value)} ${t('tokenUnit')} · ${share(value, view.total)}`} side="top" portal>
            <div className={css.compRow}><span>{name}</span><div className={css.track}><span style={{ width: `${view.total ? value / view.total * 100 : 0}%`, background: COMPOSITION_COLORS[index] }} /></div><strong>{amount(value)}</strong></div>
          </Tooltip>)}
        </div></section>
        <section className={css.card}><h2>{t('models')}</h2><ShareDonut rows={view.modelRows} empty={t('noData')} other={t('other')} colors={MODEL_COLORS} unit={t('tokenUnit')} /></section>
        <section className={css.card}><h2>{t('projects')}</h2><RankBars rows={view.projectRows} empty={t('noData')} unit={t('tokenUnit')} /></section>
        <section className={css.card}><h2>{t('providers')}</h2><ShareDonut rows={view.providerRows} empty={t('noData')} other={t('other')} colors={PROVIDER_COLORS} unit={t('tokenUnit')} /></section>
      </div>
      <section className={css.card}><div className={css.cardHead}><h2>{t('sessions')}</h2><div className={css.segments}>
        <button className={sessionMode === 'high' ? css.selected : ''} onClick={() => { setSessionMode('high') }}>{t('highUsage')}</button>
        <button className={sessionMode === 'recent' ? css.selected : ''} onClick={() => { setSessionMode('recent') }}>{t('recent')}</button></div></div>
        {view.sessions.length === 0 ? <p className={css.empty}>{t('noData')}</p> : <div className={css.sessionList}>{view.sessions.map(({ session, total, route }, index) => <button key={session.id} className={css.sessionRow} onClick={() => { openSession(session.id) }} title={t('openSession')}>
          <span className={css.sessionIndex}>{index + 1}</span><span className={css.sessionText}><strong>{session.title}</strong><small>{view.projectById.get(session.projectId ?? '') ?? unknown} · {sessionMode === 'recent' ? `${t('lastChat')} ${DAY_SHORT.format(session.lastAt)}` : route}</small></span><span className={css.sessionTotal}>{amount(total)} {t('tokenUnit')}</span>
        </button>)}</div>}
      </section>
    </>}
  </div></main>
}
