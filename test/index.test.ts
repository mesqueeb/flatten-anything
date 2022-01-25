import { test, expect } from 'vitest'
import { flatten, flattenObjectProps } from '../src/index'
import { copy } from 'copy-anything'

test('flatten objects', () => {
  const target = {
    a: 1,
    b: {
      c: { d: true },
      e: 'yes',
    },
  }
  const original = copy(target)
  const res = flatten(target)
  t.deepEqual(res, {
    'a': 1,
    'b.c.d': true,
    'b.e': 'yes',
  })
  t.deepEqual(target, original)
})

test('flattenObjectProps', () => {
  const target = {
    a: { d: true },
    b: {
      c: { d: true },
      e: 'yes',
    },
  }
  const original = copy(target)
  const res = flattenObjectProps(target, ['b'])
  t.deepEqual(res, {
    'a': { d: true },
    'b.c.d': true,
    'b.e': 'yes',
  })
  t.deepEqual(target, original)
})
test('flattenObjectProps 2', () => {
  const target = {
    a: { d: true },
    b: {
      c: { d: true },
      e: { f: true },
    },
  }
  const original = copy(target)
  const res = flattenObjectProps(target, ['b.c'])
  t.deepEqual(res, {
    'a': { d: true },
    'b.c': { d: true },
    'b': { e: { f: true } },
  })
  t.deepEqual(target, original)
})
test('flattenObjectProps 3', () => {
  // 3
  const target = {
    appearence: { hair: 'orange' },
    traits: {
      strength: 9000,
      range: { min: 8000, max: 10000 },
    },
  }
  const original = copy(target)
  const res = flattenObjectProps(target, ['traits.range'])
  t.deepEqual(res, {
    'appearence': { hair: 'orange' },
    'traits': { strength: 9000 },
    'traits.range': { min: 8000, max: 10000 },
  })
  t.deepEqual(target, original)
})

test('flatten object limit', () => {
  const target = {
    a: 1,
    b: {
      c: { d: true },
      e: 'yes',
    },
  }
  const original = copy(target)
  const res = flatten(target, 1)
  t.deepEqual(res, {
    'a': 1,
    'b.c': { d: true },
    'b.e': 'yes',
  })
  t.deepEqual(target, original)
})

test('flatten special objects', () => {
  const target = {}
  const original = copy(target)
  const res = flatten(target)
  t.deepEqual(res, {})
  t.deepEqual(target, original)
})

test('flatten special objects 2', () => {
  const date = new Date()
  const target = { a: date }
  const original = copy(target)
  const res = flatten(target)
  t.deepEqual(res, { a: date })
  t.deepEqual(target, original)
})

test('flatten arrays', () => {
  const target = [1, 2, ['a', 'b', ['y', 'z']], 3, [{ a: { b: 1 } }]]
  const original = copy(target)
  const res = flatten(target)
  t.deepEqual(res, [1, 2, 'a', 'b', 'y', 'z', 3, { a: { b: 1 } }])
  t.deepEqual(target, original)
})
