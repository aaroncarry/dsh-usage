import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formattersFor, niceScale, spreadIndexes } from '../src/client/format.ts'

test('niceScale rounds the axis to readable ticks', () => {
  assert.deepEqual(niceScale(1_520_000), { top: 2_000_000, ticks: [0, 500_000, 1_000_000, 1_500_000, 2_000_000] })
  assert.deepEqual(niceScale(13, true), { top: 15, ticks: [0, 5, 10, 15] })
  assert.deepEqual(niceScale(2, true), { top: 2, ticks: [0, 1, 2] })
  assert.deepEqual(niceScale(0, true).ticks, [0, 1])
  assert.deepEqual(niceScale(0).ticks, [0, 1])
})

test('spreadIndexes keeps both ends and never repeats', () => {
  assert.deepEqual(spreadIndexes(30, 6), [0, 6, 12, 17, 23, 29])
  assert.deepEqual(spreadIndexes(3, 6), [0, 1, 2])
  assert.deepEqual(spreadIndexes(1, 6), [0])
})

test('formatters follow the DSH locale, not the browser', () => {
  const march = new Date(2026, 2, 5).getTime()
  assert.match(formattersFor('zh').dayShort(march), /3月5日/)
  assert.match(formattersFor('en').dayShort(march), /Mar 5/)
  assert.equal(formattersFor('zh'), formattersFor('zh'), 'cached per locale')
})

import { heatLevel, isoDay, parseIsoDay } from '../src/client/format.ts'

test('heatLevel uses a square-root scale and keeps any usage visible', () => {
  assert.equal(heatLevel(0, 100), 0)
  assert.equal(heatLevel(1, 1_000_000), 1)
  assert.equal(heatLevel(25, 100), 2)
  assert.equal(heatLevel(100, 100), 4)
})

test('isoDay and parseIsoDay round-trip local days and reject bad input', () => {
  const day = new Date(2026, 8, 5).getTime()
  assert.equal(isoDay(day), '2026-09-05')
  assert.equal(parseIsoDay('2026-09-05'), day)
  assert.equal(parseIsoDay(''), undefined)
  assert.equal(parseIsoDay('2026-02-30'), undefined)
})

test('weekday names start on Monday', () => {
  assert.equal(formattersFor('en').weekday(0), 'Mon')
  assert.equal(formattersFor('zh').weekday(6), '周日')
})
