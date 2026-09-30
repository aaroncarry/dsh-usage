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

import { dayCount, deriveDashboard, hourlyDistribution, orderedRange } from '../src/client/derive.ts'
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
    project: '', model: '', trendModel: '', efficiencyModel: '', sessionMode: 'high',
  }, '?')
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
