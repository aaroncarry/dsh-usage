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
