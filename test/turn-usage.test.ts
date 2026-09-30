import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { SessionEvent } from '@deepseek-ai/dsh-session/types'
import { deriveTurnTokenUsage } from '../src/turn-usage.ts'

/** Minimal durable events; only the fields read by the state machine are populated. */
const ev = (type: string, data: object = {}, time = 1): SessionEvent => ({ type, time, data }) as unknown as SessionEvent
const usage = { inputTokens: 10, outputTokens: 5, cacheReadTokens: 0, cacheWriteTokens: 0 }
const message = (step: number, sample?: object) => ev('assistant/message', {
  turn: 1, step, message: { source: { provider: 'p', model: 'm' } }, stream: [], ...(sample === undefined ? {} : { usage: sample }),
})

test('sums a single attempt and attributes its route', () => {
  const result = deriveTurnTokenUsage([
    ev('turn/start', { turn: 1 }), ev('step/start', { turn: 1, step: 0 }), message(0, usage),
    ev('step/end', { turn: 1, step: 0 }), ev('turn/end', { turn: 1 }),
  ])
  assert.equal(result?.totalTokens, 15)
  assert.deepEqual(result?.routes, [{ provider: 'p', model: 'm' }])
})

test('an attempt retried before any usage was reported counts as zero, not as missing', () => {
  const result = deriveTurnTokenUsage([
    ev('turn/start', { turn: 1 }), ev('step/start', { turn: 1, step: 0 }),
    ev('llm/retry', { turn: 1, step: 0 }), ev('llm/retry-started', { turn: 1, step: 0 }),
    message(0, usage), ev('step/end', { turn: 1, step: 0 }), ev('turn/end', { turn: 1 }),
  ])
  assert.equal(result?.totalTokens, 15)
  assert.deepEqual(result?.routes, [{ provider: 'p', model: 'm' }])
})

test('an attempt without usage that ends its step stays unprovable', () => {
  assert.equal(deriveTurnTokenUsage([
    ev('turn/start', { turn: 1 }), ev('step/start', { turn: 1, step: 0 }),
    ev('step/end', { turn: 1, step: 0 }), ev('turn/end', { turn: 1 }),
  ]), undefined)
})

test('a turn missing its end is unavailable', () => {
  assert.equal(deriveTurnTokenUsage([ev('turn/start', { turn: 1 })]), undefined)
})
