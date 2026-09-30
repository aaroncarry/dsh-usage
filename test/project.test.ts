import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createWorkspaceMatcher, withProject } from '../src/project.ts'

const match = createWorkspaceMatcher([
  { id: 'outer', path: '/work/app' },
  { id: 'inner', path: '/work/app/packages/ui/' },
])

test('matches subdirectories, separators, and trailing slashes', () => {
  assert.equal(match('/work/app'), 'outer')
  assert.equal(match('/work/app/src/deep'), 'outer')
  assert.equal(match('\\work\\app\\src'), 'outer')
})

test('the deepest containing workspace wins', () => {
  assert.equal(match('/work/app/packages/ui/src'), 'inner')
})

test('does not match on a shared name prefix', () => {
  assert.equal(match('/work/application'), undefined)
})

test('withProject keeps the field absent when unknown', () => {
  assert.deepEqual(withProject({ a: 1 }, undefined), { a: 1 })
  assert.deepEqual(withProject({ a: 1 }, 'p'), { a: 1, projectId: 'p' })
})
