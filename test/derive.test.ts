import { test } from 'node:test'
import assert from 'node:assert/strict'
import { shiftDay, streaks } from '../src/client/derive.ts'

const day = (month: number, date: number, year = 2025) => new Date(year, month - 1, date).getTime()

test('streaks are measured inside the requested range', () => {
  const days = [day(10, 1), day(10, 2), day(10, 3), day(12, 30), day(12, 31)]
  // A past-year view must not be clipped to the trailing 365 days from today.
  assert.deepEqual(streaks(days, day(1, 1), day(12, 31)), { current: 2, longest: 3 })
})

test('current streak may end the day before the range end', () => {
  assert.equal(streaks([day(3, 8), day(3, 9)], day(3, 1), day(3, 10)).current, 2)
})

test('shiftDay steps whole calendar days across month ends', () => {
  assert.equal(shiftDay(day(1, 31), 1), day(2, 1))
})

import { dayCount, deriveDashboard, hourlyDistribution, orderedRange, topWithOther, trendBuckets } from '../src/client/derive.ts'
import type { UsageRecord, UsageSnapshot } from '../src/types.ts'

const record = (at: number, totalTokens: number): UsageRecord =>
  ({ sessionId: 's', at, inputTokens: totalTokens, outputTokens: 0, totalTokens }) as unknown as UsageRecord

test('dayCount and orderedRange treat ranges as inclusive calendar days', () => {
  assert.equal(dayCount({ first: day(3, 1), last: day(3, 1) }), 1)
  assert.equal(dayCount({ first: day(3, 1), last: day(3, 31) }), 31) // spans the March DST change
  assert.deepEqual(orderedRange(day(3, 9), day(3, 2)), { first: day(3, 2), last: day(3, 9) })
})

test('a custom range selects its days and compares with the equally long period before it', () => {
  const snapshot = {
    capturedAt: day(6, 30), projects: [], sessions: [], issues: [], unreadableSessions: 0,
    records: [record(day(6, 5) + 3600e3, 100), record(day(6, 11) + 3600e3, 999), record(day(6, 1) + 3600e3, 40)],
  } as unknown as UsageSnapshot
  const view = deriveDashboard(snapshot, {
    period: 'custom', custom: { first: day(6, 5), last: day(6, 10) }, selectedDay: undefined,
    project: '', model: '', sessionMode: 'high',
  }, { unknown: '?', other: 'other' })
  assert.equal(view.daysInView, 6)
  assert.equal(view.total, 100, 'June 11 is outside the range')
  assert.equal(view.prior, 40, 'previous period is May 30 – June 4')
})

test('hourlyDistribution buckets by local weekday (Monday first) and hour', () => {
  const monday9 = new Date(2024, 0, 1, 9, 30).getTime()
  const sunday23 = new Date(2024, 0, 7, 23, 5).getTime()
  const hourly = hourlyDistribution([record(monday9, 10), record(monday9, 5), record(sunday23, 7)])
  assert.equal(hourly.tokens[0]?.[9], 15)
  assert.equal(hourly.turns[0]?.[9], 2)
  assert.equal(hourly.tokens[6]?.[23], 7)
  assert.deepEqual(hourly.peak, { weekday: 0, hour: 9, tokens: 15 })
  assert.equal(hourly.byHour[23], 7)
  assert.equal(hourlyDistribution([]).peak, undefined)
})

test('topWithOther keeps the largest rows and folds the rest into one slot', () => {
  const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((name, index) => ({ name, total: 70 - index * 10 }))
  assert.deepEqual(topWithOther(rows.slice(0, 6), 'other').map(row => row.name), ['a', 'b', 'c', 'd', 'e', 'f'])
  const folded = topWithOther(rows, 'other')
  assert.deepEqual(folded.map(row => row.name), ['a', 'b', 'c', 'd', 'e', 'other'])
  assert.equal(folded.at(-1)?.total, 20 + 10, 'f and g are folded')
})

test('trendBuckets stacks per series by day, week, and running total', () => {
  // 2024-01-03 is a Wednesday; the range runs Wed 3rd – Tue 9th.
  const d = (date: number, hour = 12) => new Date(2024, 0, date, hour).getTime()
  const range = { first: new Date(2024, 0, 3).getTime(), last: new Date(2024, 0, 9).getTime() }
  const records = [record(d(3), 10), record(d(3), 5), record(d(8), 7)]
  const seriesOf = (item: UsageRecord) => item.totalTokens === 5 ? 1 : 0
  const daily = trendBuckets(records, range, 'daily', seriesOf, 2)
  assert.equal(daily.length, 7, 'empty days still get a bar slot')
  assert.deepEqual(daily[0]?.values, [10, 5])
  assert.equal(daily[0]?.total, 15)
  assert.deepEqual(daily[5]?.values, [7, 0])

  const weekly = trendBuckets(records, range, 'weekly', seriesOf, 2)
  assert.equal(weekly.length, 2, 'Wed–Sun, then Mon–Tue')
  assert.equal(weekly[0]?.at, range.first, 'partial first week starts at the range, not the Monday before')
  assert.equal(weekly[0]?.endAt, new Date(2024, 0, 7).getTime())
  assert.deepEqual(weekly[1]?.values, [7, 0])

  const cumulative = trendBuckets(records, range, 'cumulative', seriesOf, 2)
  assert.deepEqual(cumulative.map(bucket => bucket.total), [15, 15, 15, 15, 15, 22, 22])
  assert.deepEqual(cumulative.at(-1)?.values, [17, 5])
})

test('models beyond the named slots share the "other" series in the dashboard', () => {
  const at = day(6, 20) + 3600e3
  const records = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'].map((model, index) =>
    ({ ...record(at, 700 - index * 100), model }) as UsageRecord)
  const snapshot = { capturedAt: day(6, 30), projects: [], sessions: [], issues: [], unreadableSessions: 0, records } as unknown as UsageSnapshot
  const view = deriveDashboard(snapshot, {
    period: 30, custom: { first: day(6, 1), last: day(6, 30) }, selectedDay: undefined, project: '', model: '', sessionMode: 'high',
  }, { unknown: '?', other: 'other' })
  assert.deepEqual(view.modelSeries.map(row => row.name), ['m1', 'm2', 'm3', 'm4', 'm5', 'other'])
  assert.equal(view.modelSeriesOf(records[6]!), 5)
  assert.equal(view.modelSeriesOf(records[0]!), 0)
})
