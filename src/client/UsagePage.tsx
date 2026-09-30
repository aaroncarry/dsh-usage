/** Interactive charts over one Host observation of durable token usage. */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { HostObservable, InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import type { UsageIssue, UsageProgress, UsageRecord, UsageSnapshot } from '@deepseek-ai/dsh-client-ui-usage/types'
import { Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import {
  deriveDashboard, dayStart, orderedRange, shiftDay, streaks, topWithOther, trendBuckets,
  type DayRange, type HourlyDistribution, type Period, type Rank, type SessionMode, type TrendBucket, type TrendMode,
} from './derive.ts'
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
const MODEL_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-model-${index})`)
const PROJECT_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-project-${index})`)
const PROVIDER_COLORS = Array.from({ length: 6 }, (_, index) => `var(--usage-provider-${index})`)
const COMPOSITION_COLORS = Array.from({ length: 5 }, (_, index) => `var(--usage-composition-${index})`)

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

// Stacked trend geometry in viewBox units; date labels sit below the plot.
const TREND = { width: 790, height: 224, left: 56, right: 776, top: 18, bottom: 190 } as const
const TREND_PLOT_WIDTH = TREND.right - TREND.left
const TREND_PLOT_HEIGHT = TREND.bottom - TREND.top

/** Bar outline with rounded top corners only, so a stack reads as one column. */
function roundedTop(x: number, y: number, width: number, height: number, radius: number): string {
  const r = Math.max(0, Math.min(radius, width / 2, height))
  return `M${x} ${y + height}V${y + r}Q${x} ${y} ${x + r} ${y}H${x + width - r}Q${x + width} ${y} ${x + width} ${y + r}V${y + height}Z`
}

function StackedTrend({ buckets, series, colors, mode, fmt, t }: {
  buckets: readonly TrendBucket[]
  series: readonly Rank[]
  colors: readonly string[]
  mode: TrendMode
  fmt: Formatters
  t: Props['t']
}) {
  const [hovered, setHovered] = useState<number | undefined>()
  const [focused, setFocused] = useState<number | undefined>()
  const [hidden, setHidden] = useState<ReadonlySet<number>>(() => new Set())
  const shown = (index: number) => !hidden.has(index)
  const totals = buckets.map(bucket => bucket.values.reduce((total, value, index) => shown(index) ? total + value : total, 0))
  const scale = niceScale(Math.max(0, ...totals))
  const count = Math.max(1, buckets.length)
  const slot = TREND_PLOT_WIDTH / count
  // Wide slots get airy bars; a year of days packs them nearly edge to edge.
  const barWidth = Math.max(1, Math.min(28, slot * (count > 120 ? 0.82 : 0.62)))
  const separated = barWidth >= 6
  const centerOf = (index: number) => TREND.left + slot * (index + 0.5)
  const yOf = (value: number) => TREND.bottom - value / scale.top * TREND_PLOT_HEIGHT
  const average = mode === 'cumulative' ? 0 : totals.reduce((total, value) => total + value, 0) / count
  const grandTotal = series.reduce((total, row, index) => shown(index) ? total + row.total : total, 0)
  const labelIndexes = spreadIndexes(buckets.length, 6)
  const active = hovered === undefined ? undefined : buckets[hovered]
  const bucketLabel = (bucket: TrendBucket) => mode === 'weekly' && bucket.endAt !== bucket.at
    ? `${fmt.dayShort(bucket.at)} – ${fmt.dayShort(bucket.endAt)}` : fmt.dayMedium(bucket.at)
  const toggle = (index: number) => {
    setHidden(current => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else if (series.length - next.size > 1) next.add(index) // keep at least one series visible
      return next
    })
  }
  const pick = (clientX: number, element: SVGSVGElement): void => {
    const bounds = element.getBoundingClientRect()
    const x = (clientX - bounds.left) / bounds.width * TREND.width
    const index = Math.floor((x - TREND.left) / slot)
    setHovered(index >= 0 && index < buckets.length ? index : undefined)
  }
  const activeX = hovered === undefined ? 0 : centerOf(hovered) / TREND.width * 100
  return <div className={css.trend}>
    <div className={css.chartWrap}>
      <svg className={css.chart} viewBox={`0 0 ${TREND.width} ${TREND.height}`} role="img" tabIndex={0}
        aria-label={`${t('trend')} · ${fmt.dayShort(buckets[0]?.at ?? 0)} – ${fmt.dayShort(buckets.at(-1)?.endAt ?? 0)}`}
        onPointerMove={event => { pick(event.clientX, event.currentTarget) }}
        onPointerLeave={() => { setHovered(undefined) }}
        onFocus={() => { setHovered(buckets.length - 1) }}
        onBlur={() => { setHovered(undefined) }}
        onKeyDown={event => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
          event.preventDefault()
          setHovered(index => Math.max(0, Math.min(buckets.length - 1, (index ?? buckets.length - 1) + (event.key === 'ArrowLeft' ? -1 : 1))))
        }}>
        {scale.ticks.map(tick => <g key={tick}>
          <line x1={TREND.left} x2={TREND.right} y1={yOf(tick)} y2={yOf(tick)} className={tick === 0 ? css.baseLine : css.gridLine} />
          <text x={TREND.left - 10} y={yOf(tick) + 3.5} textAnchor="end" className={css.chartTick}>{fmt.amount(tick)}</text>
        </g>)}
        {hovered !== undefined && <rect className={css.hoverBand} x={centerOf(hovered) - slot / 2} y={TREND.top - 6}
          width={slot} height={TREND.bottom - TREND.top + 6} rx={Math.min(6, slot / 2)} />}
        <g key={`${mode}:${buckets[0]?.at}:${buckets.length}`}>
          {buckets.map((bucket, index) => {
            const x = centerOf(index) - barWidth / 2
            const visible = bucket.values.map((value, seriesIndex) => ({ value, seriesIndex })).filter(item => item.value > 0 && shown(item.seriesIndex))
            let base: number = TREND.bottom
            return <g key={bucket.at} className={css.bar} opacity={hovered === undefined || hovered === index ? 1 : 0.55}
              style={{ animationDelay: `${Math.min(index * 12, 360)}ms` }}>
              {visible.map((item, position) => {
                const height = item.value / scale.top * TREND_PLOT_HEIGHT
                const top = base - height
                base = top
                const isTop = position === visible.length - 1
                // A 1px gap between stacked segments when bars are wide enough to show it.
                const drawn = separated && !isTop ? Math.max(0, height - 1) : height
                const fade = focused === undefined || focused === item.seriesIndex ? undefined : 0.22
                const fill = colors[item.seriesIndex % colors.length]
                return isTop
                  ? <path key={item.seriesIndex} d={roundedTop(x, top, barWidth, drawn, 3)} fill={fill} opacity={fade} />
                  : <rect key={item.seriesIndex} x={x} y={top + (height - drawn)} width={barWidth} height={drawn} fill={fill} opacity={fade} />
              })}
            </g>
          })}
        </g>
        {average > 0 && <g className={css.averageLine}>
          <line x1={TREND.left} x2={TREND.right} y1={yOf(average)} y2={yOf(average)} />
          <text x={TREND.right} y={yOf(average) - 5} textAnchor="end">{t(mode === 'weekly' ? 'weeklyAverage' : 'dailyAverage')} {fmt.amount(Math.round(average))}</text>
        </g>}
        {labelIndexes.map((index, position) => {
          const bucket = buckets[index]
          if (bucket === undefined) return null
          const anchor = labelIndexes.length === 1 ? 'middle' : position === 0 ? 'start' : position === labelIndexes.length - 1 ? 'end' : 'middle'
          const x = anchor === 'start' ? centerOf(index) - barWidth / 2 : anchor === 'end' ? centerOf(index) + barWidth / 2 : centerOf(index)
          return <text key={index} x={x} y={TREND.height - 8} textAnchor={anchor} className={css.chartTick}>{fmt.dayShort(bucket.at)}</text>
        })}
      </svg>
      {active && hovered !== undefined && <div className={css.trendTooltip} role="status"
        style={{ left: `${activeX}%`, transform: activeX > 58 ? 'translateX(calc(-100% - 14px))' : 'translateX(14px)' }}>
        <div className={css.trendTooltipHead}><span>{bucketLabel(active)}</span><strong>{fmt.amount(totals[hovered] ?? 0)}</strong></div>
        {active.values.map((value, index) => ({ value, index })).filter(item => item.value > 0 && shown(item.index))
          .sort((a, b) => b.value - a.value).map(item => <div key={item.index} className={css.trendTooltipRow}>
            <i style={{ background: colors[item.index % colors.length] }} />
            <span>{series[item.index]?.name}</span>
            <strong>{fmt.amount(item.value)}</strong>
            <small>{share(item.value, totals[hovered] ?? 0)}</small>
          </div>)}
        {(totals[hovered] ?? 0) === 0 && <div className={css.trendTooltipEmpty}>{t('noUsage')}</div>}
      </div>}
    </div>
    <div className={css.trendLegend}>{series.map((row, index) => <button key={row.name} aria-pressed={shown(index)}
      className={`${shown(index) ? '' : css.legendOff} ${focused === index ? css.legendFocus : ''}`}
      onPointerEnter={() => { if (shown(index)) setFocused(index) }} onPointerLeave={() => { setFocused(undefined) }}
      onClick={() => { setFocused(undefined); toggle(index) }} title={t('legendToggle')}>
      <i style={{ background: colors[index % colors.length] }} />
      <span>{row.name}</span>
      <small>{shown(index) ? share(row.total, grandTotal) : '—'}</small>
    </button>)}</div>
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
      <div>
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
  const shown = topWithOther(rows, other)
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
  const [trend, setTrend] = useState<TrendMode>('daily')
  const [sessionMode, setSessionMode] = useState<SessionMode>('high')
  useEffect(() => activate(), [activate])

  const fmt = formattersFor(locale())
  const unknown = t('unknown')
  const other = t('other')
  const today = snapshot === undefined ? dayStart(Date.now()) : dayStart(snapshot.capturedAt)
  const customRange = custom ?? { first: shiftDay(today, -29), last: today }
  const view = useMemo(() => snapshot === undefined ? undefined : deriveDashboard(
    snapshot, { period, custom: customRange, selectedDay, project, model, sessionMode }, { unknown, other },
  ), [snapshot, period, customRange.first, customRange.last, selectedDay, project, model, sessionMode, unknown, other])
  const buckets = useMemo(() => view === undefined ? []
    : trendBuckets(view.selected, view.range, trend, view.modelSeriesOf, view.modelSeries.length), [view, trend])
  const setCustomEnd = (end: 'first' | 'last', value: string) => {
    const day = parseIsoDay(value)
    if (day !== undefined) setCustom(orderedRange(day, end === 'first' ? customRange.last : customRange.first))
  }
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
          <select className={css.select} aria-label={t('project')} value={project} onChange={(event) => { setProject(event.target.value); setModel('') }}>
            <option value="">{t('allProjects')}</option>{snapshot.projects.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
          </select>
          <select className={css.select} aria-label={t('model')} value={model} onChange={(event) => { setModel(event.target.value) }}>
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
        onSelectDay={value => { setSelectedDay(current => current === value ? undefined : value) }} fmt={fmt} t={t} />
      <section className={css.card}><div className={css.cardHead}><div><h2>{t('trend')}</h2><p>{t('trendNote')}</p></div>
        <Segments modes={['daily', 'weekly', 'cumulative'] as const} value={trend} onChange={setTrend} label={t} /></div>
        {view.selected.length ? <StackedTrend key={view.modelSeries.map(row => row.name).join('\0')} buckets={buckets}
          series={view.modelSeries} colors={MODEL_COLORS} mode={trend} fmt={fmt} t={t} /> : <p className={css.empty}>{t('noData')}</p>}
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
