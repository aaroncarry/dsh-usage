/** Interactive charts over one Host observation of durable token usage. */
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { HostObservable, InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import type { UsageIssue, UsageProgress, UsageRecord, UsageSnapshot } from '@deepseek-ai/dsh-client-ui-usage/types'
import { Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import { deriveDashboard, dayStart, orderedRange, shiftDay, streaks, type DayRange, type HourlyDistribution, type Period, type Rank, type SessionMode } from './derive.ts'
import { formattersFor, heatLevel, isoDay, niceScale, parseIsoDay, spreadIndexes, type Formatters } from './format.ts'
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
  /** Active UI language id, read on every render so a language switch reformats dates. */
  readonly locale: () => string
}

type Props = PropsRuntime<'main'> & PropsLocale<'usageStatistics'> & InjectFace<UsagePageInjected>
type Trend = 'daily' | 'weekly' | 'cumulative'
type ChartMetric = 'input' | 'turns' | 'averageInput' | 'cacheRate'
const MODEL_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-model-${index})`)
const PROJECT_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-project-${index})`)
const PROVIDER_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-provider-${index})`)
const COMPOSITION_COLORS = Array.from({ length: 5 }, (_, index) => `var(--usage-composition-${index})`)
// Chart geometry in viewBox units: plot spans x 68–758 and y 30–150; date labels sit below.
const PLOT_LEFT = 68
const PLOT_WIDTH = 690
const PLOT_BOTTOM = 150
const PLOT_HEIGHT = 120

function percent(value: number | undefined): string {
  return value === undefined ? '—' : `${value.toFixed(1)}%`
}

function share(value: number, total: number): string {
  return `${(total ? value / total * 100 : 0).toFixed(1)}%`
}

/** Period-over-period change, or undefined when the previous period has nothing to compare against. */
function delta(current: number, previous: number): { text: string; up: boolean } | undefined {
  if (previous <= 0) return undefined
  const change = (current - previous) / previous * 100
  return { text: `${Math.abs(change).toFixed(1)}%`, up: change >= 0 }
}

function Segments<T extends string>({ modes, value, onChange, label }: {
  modes: readonly T[]; value: T; onChange: (mode: T) => void; label: (mode: T) => string
}) {
  return <div className={css.segments}>{modes.map(mode => <button key={mode} className={value === mode ? css.selected : ''}
    aria-pressed={value === mode} onClick={() => { onChange(mode) }}>{label(mode)}</button>)}</div>
}

/** Subscribes to progress alone so 500 ms progress ticks do not re-render the dashboard. */
function ProgressCount({ useProgress, prefix }: { useProgress: Props['useProgress']; prefix: string }) {
  const progress = useProgress(state => state.progress)
  return <>{progress?.total ? `${prefix}${progress.completed}/${progress.total}` : ''}</>
}

function TrendChart({ records, days, anchorAt, mode, metric, label, fmt, t }: {
  records: readonly UsageRecord[]; days: number; anchorAt: number; mode: Trend; metric: ChartMetric; label: string; fmt: Formatters; t: Props['t']
}) {
  const [hovered, setHovered] = useState<number | undefined>()
  const gradientId = useId()
  const anchor = dayStart(anchorAt)
  type Point = { at: number; endAt: number; input: number; turns: number; cacheRead: number; cacheKnown: boolean }
  const data: Point[] = []
  for (let offset = days - 1; offset >= 0; offset--) {
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
  const scale = metric === 'cacheRate'
    ? { top: 100, ticks: [0, 25, 50, 75, 100] }
    : niceScale(Math.max(0, ...values.filter((value): value is number => value !== undefined)), metric === 'turns')
  const xOf = (index: number) => PLOT_LEFT + (points.length === 1 ? PLOT_WIDTH / 2 : index * PLOT_WIDTH / (points.length - 1))
  const yOf = (value: number) => PLOT_BOTTOM - value / scale.top * PLOT_HEIGHT
  // Contiguous runs of known values; each draws one line and one filled area.
  const runs: number[][] = []
  values.forEach((value, index) => {
    if (value === undefined) return
    if (index === 0 || values[index - 1] === undefined) runs.push([])
    runs.at(-1)?.push(index)
  })
  const linePath = (run: number[]) => run.map((index, position) => `${position === 0 ? 'M' : 'L'} ${xOf(index)} ${yOf(values[index] ?? 0)}`).join(' ')
  const activeIndex = hovered !== undefined && hovered < points.length ? hovered : undefined
  const active = activeIndex === undefined ? undefined : points[activeIndex]
  const activeValue = activeIndex === undefined ? undefined : values[activeIndex]
  const activeX = activeIndex === undefined ? undefined : xOf(activeIndex)
  const updateHover = (clientX: number, width: number, left: number): void => {
    const x = (clientX - left) / width * 790
    setHovered(points.length === 1 ? 0 : Math.max(0, Math.min(points.length - 1, Math.round((x - PLOT_LEFT) / PLOT_WIDTH * (points.length - 1)))))
  }
  const format = (value: number | undefined): string => value === undefined ? '—'
    : metric === 'cacheRate' ? `${value.toFixed(1)}%`
      : `${metric === 'turns' ? fmt.integer(value) : fmt.amount(value)} ${metric === 'turns' ? t('turns') : t('tokenUnit')}`
  const pointLabel = (point: Point) => mode === 'weekly' ? `${fmt.dayShort(point.at)} – ${fmt.dayShort(point.endAt)}` : fmt.dayMedium(point.at)
  const labelIndexes = spreadIndexes(points.length, 6)
  return <div className={css.chartWrap}>
    <svg className={css.chart} viewBox="0 0 790 176" role="img" aria-label={label} tabIndex={0}
      onPointerMove={event => { const bounds = event.currentTarget.getBoundingClientRect(); updateHover(event.clientX, bounds.width, bounds.left) }}
      onPointerLeave={() => { setHovered(undefined) }}
      onFocus={() => { setHovered(points.length - 1) }}
      onBlur={() => { setHovered(undefined) }}
      onKeyDown={event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
        event.preventDefault()
        setHovered(index => Math.max(0, Math.min(points.length - 1, (index ?? points.length - 1) + (event.key === 'ArrowLeft' ? -1 : 1))))
      }}>
      <defs><linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" style={{ stopColor: 'var(--usage-input)', stopOpacity: 0.22 }} />
        <stop offset="100%" style={{ stopColor: 'var(--usage-input)', stopOpacity: 0 }} />
      </linearGradient></defs>
      <rect width="790" height="176" fill="transparent" />
      {scale.ticks.map(tick => <g key={tick}>
        <line x1={PLOT_LEFT} x2={PLOT_LEFT + PLOT_WIDTH} y1={yOf(tick)} y2={yOf(tick)} className={tick === 0 ? css.baseLine : css.gridLine} />
        <text x={PLOT_LEFT - 10} y={yOf(tick) + 4} textAnchor="end" className={css.chartTick}>{metric === 'cacheRate' ? `${tick}%` : fmt.amount(tick)}</text>
      </g>)}
      {labelIndexes.map((index, position) => {
        const point = points[index]
        if (point === undefined) return null
        const anchorSide = labelIndexes.length === 1 ? 'middle' : position === 0 ? 'start' : position === labelIndexes.length - 1 ? 'end' : 'middle'
        return <text key={index} x={xOf(index)} y={170} textAnchor={anchorSide} className={css.chartTick}>{fmt.dayShort(point.at)}</text>
      })}
      {runs.map(run => run.length > 1 && <path key={`a${run[0]}`} fill={`url(#${gradientId})`}
        d={`${linePath(run)} L ${xOf(run.at(-1) ?? 0)} ${PLOT_BOTTOM} L ${xOf(run[0] ?? 0)} ${PLOT_BOTTOM} Z`} />)}
      {runs.map(run => <path key={`l${run[0]}`} d={linePath(run)} className={css.inputLine} />)}
      {runs.map(run => run.length === 1 && <circle key={`p${run[0]}`} cx={xOf(run[0] ?? 0)} cy={yOf(values[run[0] ?? 0] ?? 0)} r="3" className={css.chartPoint} />)}
      {activeX !== undefined && <><line x1={activeX} x2={activeX} y1={PLOT_BOTTOM - PLOT_HEIGHT} y2={PLOT_BOTTOM} className={css.chartGuide} />
        {activeValue !== undefined && <circle cx={activeX} cy={yOf(activeValue)} r="4.5" className={css.chartPoint} />}</>}
    </svg>
    {active && activeX !== undefined && <div className={css.chartTooltip} style={{ left: `${Math.max(10, Math.min(90, activeX / 790 * 100))}%` }} role="status">
      <span>{pointLabel(active)}</span>
      <strong>{label} · {format(activeValue)}</strong>
    </div>}
  </div>
}

type HeatCell = { at: number; total: number; visible: boolean; future: boolean }

function Heatmap({ records, years, year, today, selectedDay, onYearChange, onSelectDay, fmt, t }: {
  records: readonly UsageRecord[]
  years: readonly number[]
  year: number | 'rolling'
  today: number
  selectedDay: number | undefined
  onYearChange: (year: number | 'rolling') => void
  onSelectDay: (day: number) => void
  fmt: Formatters
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
        ? fmt.month(date) : ''
    })
    const active = [...totals].filter(([day, total]) => day >= first && day <= last && total > 0)
    const max = Math.max(1, ...active.map(([, total]) => total))
    const lastShown = Math.min(last, today)
    return { cells, weeks, months, max, first, lastShown, streak: streaks(active.map(([day]) => day), first, lastShown) }
  }, [records, year, today, fmt])
  const { cells, weeks, months, max, first, lastShown, streak } = grid
  // When the grid overflows, show the most recent weeks rather than the oldest.
  const scroller = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const element = scroller.current
    if (element === null) return
    const toLatest = () => { element.scrollLeft = element.scrollWidth }
    toLatest()
    // Resizing the window or sidebar can start the overflow after the first render.
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(toLatest)
    observer?.observe(element)
    return () => { observer?.disconnect() }
  }, [weeks, year])
  // Exactly one cell is a tab stop; fall back to the range's last day when the selection or today is outside it.
  const tabStop = selectedDay !== undefined && selectedDay >= first && selectedDay <= lastShown ? selectedDay : lastShown
  const size = { gridTemplateColumns: `repeat(${weeks}, minmax(var(--usage-heat-cell-size), 1fr))`, minWidth: `${weeks * 12 + (weeks - 1) * 3}px` }
  return <section className={css.card}>
    <div className={css.cardHead}><div><h2>{t('heatmap')}</h2><p>{year === 'rolling' ? t('heatmapNote') : `${year} · ${t('oneCellDay')}`}</p></div>
      <select className={css.select} aria-label={t('heatmapRange')} value={year} onChange={event => { onYearChange(event.target.value === 'rolling' ? 'rolling' : Number(event.target.value)) }}>
        <option value="rolling">{t('rollingYear')}</option>{years.map(item => <option key={item} value={item}>{item}</option>)}
      </select>
    </div>
    <div className={css.heatScroll} ref={scroller}><div className={css.monthLabels} style={size}>
      {months.map((month, index) => <span key={index}>{month}</span>)}
    </div><div className={css.heatmap} style={size}>
      {Array.from({ length: weeks }, (_, week) => <div className={css.heatWeek} key={week}>{cells.slice(week * 7, week * 7 + 7).map((cell, day) => {
        const level = heatLevel(cell.total, max)
        const detail = `${fmt.dayLong(cell.at)}\n${fmt.integer(cell.total)} ${t('tokenUnit')}`
        return <Tooltip key={day} label={detail} side="top" portal delayMs={80} disabled={!cell.visible}>
          <span className={`${css.heatCell} ${cell.visible ? css[`heat${level}`] : cell.future ? css.heatFuture : css.heatHidden} ${selectedDay === cell.at ? css.heatSelected : ''}`}
            role={cell.visible ? 'button' : undefined} tabIndex={cell.visible && cell.at === tabStop ? 0 : -1}
            aria-label={cell.visible ? detail : undefined} aria-pressed={cell.visible ? selectedDay === cell.at : undefined}
            onClick={() => { if (cell.visible) onSelectDay(cell.at) }}
            onKeyDown={event => {
              if (!cell.visible) return
              if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelectDay(cell.at); return }
              const step = event.key === 'ArrowRight' ? 7 : event.key === 'ArrowLeft' ? -7
                : event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0
              if (step === 0) return
              event.preventDefault()
              const target = cells[week * 7 + day + step]
              if (target?.visible) event.currentTarget.closest(`.${css.heatmap}`)
                ?.querySelector<HTMLElement>(`[data-day="${target.at}"]`)?.focus()
            }} data-day={cell.at} />
        </Tooltip>
      })}</div>)}
    </div></div>
    <div className={css.heatFoot}><span>{lastShown === today && <>{t('currentStreak')} <strong>{streak.current} {t('days')}</strong> · </>}{t('longestStreak')} <strong>{streak.longest} {t('days')}</strong></span><span>{t('less')} <i className={css.heat0} /><i className={css.heat1} /><i className={css.heat2} /><i className={css.heat3} /><i className={css.heat4} /> {t('more')}</span></div>
  </section>
}

function HourlyCard({ hourly, fmt, t }: { hourly: HourlyDistribution; fmt: Formatters; t: Props['t'] }) {
  const slot = (hour: number) => `${String(hour).padStart(2, '0')}:00–${String(hour + 1).padStart(2, '0')}:00`
  const hourMax = Math.max(1, ...hourly.byHour)
  const { peak } = hourly
  return <section className={css.card}>
    <div className={css.cardHead}><div><h2>{t('hourly')}</h2><p>{t('hourlyNote')}</p></div>
      {peak && <p className={css.hourlyPeak}>{t('peakHour')} <strong>{fmt.weekday(peak.weekday)} {slot(peak.hour)}</strong> · {fmt.amount(peak.tokens)} {t('tokenUnit')}</p>}
    </div>
    {hourly.max === 0 ? <p className={css.empty}>{t('noData')}</p> : <div className={css.hourly}>
      <span />
      {Array.from({ length: 24 }, (_, hour) => <span key={hour} className={css.hourLabel}>{hour % 3 === 0 ? hour : ''}</span>)}
      {hourly.tokens.map((row, weekday) => <div key={weekday} className={css.hourRow}>
        <span className={css.weekdayLabel}>{fmt.weekday(weekday)}</span>
        {row.map((value, hour) => {
          const detail = `${fmt.weekday(weekday)} ${slot(hour)}\n${fmt.integer(value)} ${t('tokenUnit')} · ${fmt.integer(hourly.turns[weekday]?.[hour] ?? 0)} ${t('turns')}`
          return <Tooltip key={hour} label={detail} side="top" portal delayMs={80}>
            <span className={`${css.hourCell} ${css[`heat${heatLevel(value, hourly.max)}`]}`} aria-label={detail} role="img" />
          </Tooltip>
        })}
      </div>)}
      <span className={css.weekdayLabel} title={t('hourTotal')}>Σ</span>
      {hourly.byHour.map((value, hour) => <Tooltip key={hour} label={`${slot(hour)}\n${fmt.integer(value)} ${t('tokenUnit')}`} side="top" portal delayMs={80}>
        <span className={css.hourBar}><i style={{ height: `${value / hourMax * 100}%` }} /></span>
      </Tooltip>)}
    </div>}
  </section>
}

function RankBars({ rows, empty, unit, fmt }: { rows: readonly Rank[]; empty: string; unit: string; fmt: Formatters }) {
  const total = Math.max(1, rows.reduce((sum, row) => sum + row.total, 0))
  return rows.length === 0 ? <p className={css.empty}>{empty}</p> : <div className={css.rankList}>
    {rows.slice(0, 6).map((row, index) => <Tooltip key={row.name} label={`${row.name}\n${fmt.integer(row.total)} ${unit} · ${share(row.total, total)}`} side="top" portal>
      <div className={css.rankRow}>
      <div className={css.rankMeta}>
        <span>{row.name}</span>
        <strong>{fmt.amount(row.total)}<small>{share(row.total, total)}</small></strong>
      </div>
      <div className={css.track}>
        <span style={{ width: `${row.total / total * 100}%`, background: PROJECT_COLORS[index % PROJECT_COLORS.length] }} />
      </div>
    </div></Tooltip>)}
  </div>
}

function ShareDonut({ rows, empty, other, colors, unit, fmt }: {
  rows: readonly Rank[]
  empty: string
  other: string
  colors: readonly string[]
  unit: string
  fmt: Formatters
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
  const detail = (row: Rank): string => `${row.name}\n${fmt.integer(row.total)} ${unit} · ${share(row.total, total)}`
  const onDonutMove = (clientX: number, clientY: number, element: HTMLElement): void => {
    const bounds = element.getBoundingClientRect()
    const angle = (Math.atan2(clientX - bounds.left - bounds.width / 2, -(clientY - bounds.top - bounds.height / 2)) + 2 * Math.PI) % (2 * Math.PI)
    const portion = angle / (2 * Math.PI) * total
    let used = 0
    setHovered(shown.findIndex(row => (used += row.total) > portion))
  }
  const focused = hovered === undefined || hovered < 0 ? undefined : shown[hovered]
  return <div className={css.share}>
    <Tooltip label={focused === undefined ? `${fmt.integer(total)} ${unit}` : detail(focused)} side="top" portal>
      <div className={css.donut} style={{ background: `conic-gradient(${stops.join(', ')})` }}
        onPointerMove={event => { onDonutMove(event.clientX, event.clientY, event.currentTarget) }}
        onPointerLeave={() => { setHovered(undefined) }}>
        <span><strong>{fmt.amount(focused?.total ?? total)}</strong><small>{focused === undefined ? unit : share(focused.total, total)}</small></span>
      </div>
    </Tooltip>
    <div className={css.shareLegend}>{shown.map((row, index) => <Tooltip key={`${index}:${row.name}`} label={detail(row)} side="top" portal>
      <div className={hovered === index ? css.legendActive : undefined} onPointerEnter={() => { setHovered(index) }} onPointerLeave={() => { setHovered(undefined) }}>
        <i style={{ background: colors[index % colors.length] }} />
        <span>{row.name}</span>
        <strong>{share(row.total, total)}</strong>
      </div></Tooltip>)}</div>
  </div>
}

function QualityPanel({ issues, refreshing, onOpen, onRebuild, fmt, t }: {
  issues: readonly UsageIssue[]
  refreshing: boolean
  onOpen: (id: SessionId) => void
  onRebuild: () => void
  fmt: Formatters
  t: Props['t']
}) {
  const groups = [
    ['unreadable-session', t('unreadableSessions'), t('unreadableExplanation')],
    ['missing-turn', t('missingTurns'), t('missingExplanation')],
    ['unattributed-turn', t('unattributedTurns'), t('unattributedExplanation')],
  ] as const
  return <section className={css.qualityPanel} aria-label={t('dataQuality')}>
    <div className={css.qualityHead}><p>{t('qualityIntro')}</p><button className={css.button} disabled={refreshing} onClick={onRebuild}>{t('rebuild')}</button></div>
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
            <span>{item.title}</span><small>{kind === 'unreadable-session' ? t('openSession') : `${item.count} ${t('turns')}${item.at === undefined ? '' : ` · ${fmt.dayShort(item.at)}`}`}</small>
          </button>)}</div>}
      </div>
    })}
  </section>
}

/** Render token activity, trends, breakdowns, and session navigation. @param props - localized page services. @returns dashboard. */
export function UsagePage({ useUsage, useProgress, activate, retry, rebuild, openSession, locale, t }: Props) {
  const snapshot = useUsage(state => state.snapshot)
  const error = useUsage(state => state.error)
  const refreshing = useUsage(state => state.refreshing)
  const [period, setPeriod] = useState<Period | 'custom'>(30)
  const [custom, setCustom] = useState<DayRange | undefined>()
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

  const fmt = formattersFor(locale())
  const unknown = t('unknown')
  const today = snapshot === undefined ? dayStart(Date.now()) : dayStart(snapshot.capturedAt)
  const customRange = custom ?? { first: shiftDay(today, -29), last: today }
  const view = useMemo(() => snapshot === undefined ? undefined : deriveDashboard(
    snapshot, { period, custom: customRange, selectedDay, project, model, trendModel, efficiencyModel, sessionMode }, unknown,
  ), [snapshot, period, customRange.first, customRange.last, selectedDay, project, model, trendModel, efficiencyModel, sessionMode, unknown])
  const setCustomEnd = (end: 'first' | 'last', value: string) => {
    const day = parseIsoDay(value)
    if (day !== undefined) setCustom(orderedRange(day, end === 'first' ? customRange.last : customRange.first))
  }
  const efficiencyLabel = efficiencyMetric === 'turns' ? t('completedTurns')
    : efficiencyMetric === 'averageInput' ? t('averageInputPerTurn') : t('cacheReadShare')
  const issueCount = view === undefined ? 0 : view.unreadable + view.missing + view.unattributed

  return <main className={css.page}><div className={css.content}>
    <header className={css.pageHead}>
      <div className={css.titleBlock}><h1>{t('title')}</h1><p>{t('subtitle')}</p></div>
      {snapshot && view && <div className={css.headControls}>
        <div className={css.filters}>
          <span className={css.periodGroup}>
            <select className={`${css.select} ${selectedDay === undefined ? '' : css.selectActive}`} aria-label={t('period')} value={selectedDay === undefined ? period : 'selected'} onChange={(event) => {
              const value = event.target.value
              setSelectedDay(undefined)
              setPeriod(value === 'custom' ? 'custom' : Number(value) as Period)
              setTrendModel('')
            }}>
              {selectedDay !== undefined && <option value="selected">{fmt.dayNumeric(selectedDay)}</option>}
              <option value={7}>{t('days7')}</option><option value={30}>{t('days30')}</option><option value={90}>{t('days90')}</option><option value={365}>{t('days365')}</option>
              <option value="custom">{t('customRange')}</option>
            </select>
            {period === 'custom' && selectedDay === undefined && <span className={css.dateRange}>
              <input type="date" className={css.dateInput} aria-label={t('rangeStart')} value={isoDay(customRange.first)}
                min={isoDay(view.earliestDay)} max={isoDay(today)} onChange={event => { setCustomEnd('first', event.target.value) }} />
              <span aria-hidden="true">–</span>
              <input type="date" className={css.dateInput} aria-label={t('rangeEnd')} value={isoDay(customRange.last)}
                min={isoDay(view.earliestDay)} max={isoDay(today)} onChange={event => { setCustomEnd('last', event.target.value) }} />
            </span>}
            {selectedDay !== undefined && <button className={css.clearDay} onClick={() => { setSelectedDay(undefined) }} title={t('clearDay')} aria-label={t('clearDay')}>✕</button>}
          </span>
          <select className={css.select} aria-label={t('project')} value={project} onChange={(event) => { setProject(event.target.value); setModel(''); setTrendModel('') }}>
            <option value="">{t('allProjects')}</option>{snapshot.projects.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
          </select>
          <select className={css.select} aria-label={t('model')} value={model} onChange={(event) => { setModel(event.target.value); setTrendModel('') }}>
            <option value="">{t('allModels')}</option>{view.models.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div className={css.status}>
          <span>{refreshing
            ? <><i className={css.spinner} />{t('refreshing')}<ProgressCount useProgress={useProgress} prefix=" " /></>
            : `${error ? t('staleAsOf') : t('updatedAt')} ${fmt.dateTime(snapshot.capturedAt)}`}</span>
          <button className={css.linkButton} disabled={refreshing} onClick={retry}>{t('refresh')}</button>
          <span className={css.divider} />
          <button className={`${css.linkButton} ${issueCount > 0 ? css.qualityWarn : ''}`} aria-expanded={qualityOpen} onClick={() => { setQualityOpen(!qualityOpen) }}
            title={`${view.unreadable} ${t('sessionsUnit')} / ${view.missing} ${t('turns')} / ${view.unattributed} ${t('unattributedShort')}`}>
            <i className={css.qualityDot} />{t('dataQuality')} · {issueCount}
          </button>
        </div>
      </div>}
    </header>
    {error && <div className={css.notice} role="alert">{snapshot ? t('staleError') : t('error')} <button className={css.button} onClick={retry}>{t('retry')}</button></div>}
    {!snapshot && !error && <div className={css.loading} role="status"><i />{t('loading')}<ProgressCount useProgress={useProgress} prefix=" · " /></div>}
    {snapshot && view && <>
      {qualityOpen && <QualityPanel issues={view.qualityIssues} refreshing={refreshing} onOpen={openSession} onRebuild={rebuild} fmt={fmt} t={t} />}
      <section className={css.summary} aria-label={t('title')}>
        {([
          [t('total'), fmt.amount(view.total), '', delta(view.total, view.prior)],
          [t('average'), fmt.amount(Math.round(view.total / view.daysInView)), '', delta(view.total, view.prior)],
          [t('peak'), fmt.amount(view.peak), '', delta(view.peak, view.priorPeak)],
          [t('active'), String(view.activeDays), t('days'), delta(view.activeDays, view.priorActiveDays)],
        ] as const).map(([label, value, unit, change]) => <div className={css.stat} key={label}>
          <span>{label}</span><strong>{value}{unit && <small>{unit}</small>}</strong>
          <small>{change === undefined ? t('noPrior') : <>{t('compared')} <b>{change.up ? '↑' : '↓'} {change.text}</b></>}</small>
        </div>)}
        <div className={css.stat}>
          <span>{t('cacheRate')}</span><strong>{percent(view.cacheRate)}</strong>
          <small>{view.cacheRate === undefined
            ? (view.selected.length > 0 ? t('cacheUnknown') : t('noPrior'))
            : view.cacheRateDelta === undefined ? t('noPrior')
              : <>{t('compared')} <b>{view.cacheRateDelta >= 0 ? '↑' : '↓'} {Math.abs(view.cacheRateDelta).toFixed(1)} {t('percentagePoints')}</b></>}</small>
        </div>
      </section>
      <Heatmap records={view.scoped} years={view.heatYears} year={heatYear} today={view.today} selectedDay={selectedDay}
        onYearChange={value => { setHeatYear(value); setSelectedDay(undefined) }}
        onSelectDay={value => { setSelectedDay(current => current === value ? undefined : value); setTrendModel('') }} fmt={fmt} t={t} />
      <section className={css.card}><div className={css.cardHead}><div><h2>{t('trend')}</h2><p>{t('trendNote')}</p></div><div className={css.cardControls}>
        <select className={css.select} aria-label={t('trendScope')} value={view.activeTrendModel} onChange={(event) => { setTrendModel(event.target.value) }}>
          <option value="">{t('allModels')}</option>{view.trendModels.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
        <Segments modes={['daily', 'weekly', 'cumulative'] as const} value={trend} onChange={setTrend} label={t} />
      </div></div>
        {view.trendRecords.length ? <TrendChart records={view.trendRecords} days={view.daysInView} anchorAt={view.anchor} mode={trend} metric="input" label={`${t('input')} · ${view.activeTrendModel || t('allModels')}`} fmt={fmt} t={t} /> : <p className={css.empty}>{t('noData')}</p>}
      </section>
      <section className={css.card}>
        <div className={css.cardHead}><div><h2>{t('efficiency')}</h2><p>{t('efficiencyNote')}</p></div><div className={css.cardControls}>
          <select className={css.select} aria-label={t('trendScope')} value={view.activeEfficiencyModel} onChange={event => { setEfficiencyModel(event.target.value) }}>
            <option value="">{t('allModels')}</option>{view.trendModels.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
          <Segments modes={['daily', 'weekly'] as const} value={efficiencyMode} onChange={setEfficiencyMode} label={t} />
        </div></div>
        <div className={css.efficiencyStats} role="tablist" aria-label={t('efficiencyMetric')}>
          {([
            ['turns', t('completedTurns'), fmt.integer(view.completedTurns)],
            ['averageInput', t('averageInputPerTurn'), view.averageInputPerTurn === undefined ? '—' : fmt.amount(view.averageInputPerTurn)],
            ['cacheRate', t('cacheReadShare'), percent(view.efficiencyCacheShare)],
          ] as const).map(([metric, label, value]) => <button key={metric} role="tab" aria-selected={efficiencyMetric === metric}
            className={efficiencyMetric === metric ? css.metricActive : ''} onClick={() => { setEfficiencyMetric(metric) }}>
            <span>{label}</span><strong>{value}</strong>
          </button>)}
          <div><Tooltip label={t('coverageExplanation')} side="top" portal><span>{t('measuredCoverage')} ⓘ</span></Tooltip><strong>{percent(view.coverage)}</strong></div>
        </div>
        {view.efficiencyRecords.length ? <TrendChart records={view.efficiencyRecords} days={view.daysInView} anchorAt={view.anchor} mode={efficiencyMode} metric={efficiencyMetric}
          label={`${efficiencyLabel} · ${view.activeEfficiencyModel || t('allModels')}`} fmt={fmt} t={t} />
          : <p className={css.empty}>{t('noData')}</p>}
      </section>
      <HourlyCard hourly={view.hourly} fmt={fmt} t={t} />
      <div className={css.twoCols}>
        <section className={css.card}><h2>{t('composition')}</h2><div className={css.composition}>
          {([
            [t('uncached'), view.composition.uncached, COMPOSITION_COLORS[0]],
            [t('cacheRead'), view.composition.cacheRead, COMPOSITION_COLORS[1]],
            [t('cacheWrite'), view.composition.cacheWrite, COMPOSITION_COLORS[2]],
            [t('output'), view.composition.output, COMPOSITION_COLORS[3]],
            [t('unknownInput'), view.composition.other, COMPOSITION_COLORS[4]],
          ] as const).filter(([, value]) => value > 0).map(([name, value, color]) => <Tooltip key={name} label={`${name}\n${fmt.integer(value)} ${t('tokenUnit')} · ${share(value, view.total)}`} side="top" portal>
            <div className={css.compRow}><span>{name}</span><div className={css.track}><span style={{ width: `${view.total ? value / view.total * 100 : 0}%`, background: color }} /></div><strong>{fmt.amount(value)}<small>{share(value, view.total)}</small></strong></div>
          </Tooltip>)}
          {view.total === 0 && <p className={css.empty}>{t('noData')}</p>}
        </div></section>
        <section className={css.card}><h2>{t('models')}</h2><ShareDonut rows={view.modelRows} empty={t('noData')} other={t('other')} colors={MODEL_COLORS} unit={t('tokenUnit')} fmt={fmt} /></section>
        <section className={css.card}><h2>{t('projects')}</h2><RankBars rows={view.projectRows} empty={t('noData')} unit={t('tokenUnit')} fmt={fmt} /></section>
        <section className={css.card}><h2>{t('providers')}</h2><ShareDonut rows={view.providerRows} empty={t('noData')} other={t('other')} colors={PROVIDER_COLORS} unit={t('tokenUnit')} fmt={fmt} /></section>
      </div>
      <section className={css.card}><div className={css.cardHead}><h2>{t('sessions')}</h2>
        <Segments modes={['high', 'recent'] as const} value={sessionMode} onChange={setSessionMode} label={mode => t(mode === 'high' ? 'highUsage' : 'recent')} /></div>
        {view.sessions.length === 0 ? <p className={css.empty}>{t('noData')}</p> : <div className={css.sessionList}>{view.sessions.map(({ session, total, route }, index) => <button key={session.id} className={css.sessionRow} onClick={() => { openSession(session.id) }} title={t('openSession')}>
          <span className={css.sessionIndex}>{index + 1}</span>
          <span className={css.sessionText}><strong>{session.title}</strong><small>{view.projectById.get(session.projectId ?? '') ?? unknown} · {sessionMode === 'recent' ? `${t('lastChat')} ${fmt.dayShort(session.lastAt)}` : route}</small></span>
          <span className={css.sessionTotal}><span>{fmt.amount(total)} {t('tokenUnit')}</span>
            <i className={css.sessionBar}><i style={{ width: `${view.total ? total / view.total * 100 : 0}%` }} /></i></span>
          <span className={css.sessionArrow} aria-hidden="true">›</span>
        </button>)}</div>}
      </section>
    </>}
  </div></main>
}
