import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { SessionEvent, SessionHeader } from '@deepseek-ai/dsh-session/types'
import { foldUsageSession } from '../src/fold.ts'

const ev = (type: string, data: object = {}, time = 1): SessionEvent => ({ type, time, data }) as unknown as SessionEvent
const header = { id: 's1', cwd: '/w/proj' } as unknown as SessionHeader

test('a turn replaced before its end is reported as missing', () => {
  const { issues, session } = foldUsageSession(header, [
    ev('turn/start', { turn: 1 }, 10), ev('turn/start', { turn: 2 }, 20), ev('turn/end', { turn: 2 }, 30),
  ], 0)
  // The interrupted turn 1 and the empty turn 2 are both unprovable.
  assert.deepEqual(issues.map(issue => issue.kind), ['missing-turn', 'missing-turn'])
  assert.equal(session.missingTurns, 2)
})
