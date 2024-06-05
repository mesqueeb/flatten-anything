import { copy } from 'copy-anything'
import { expect, test } from 'vitest'
import { flatten, flattenObjectProps } from '../src/index.js'

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
  expect(res).toEqual({
    'a': 1,
    'b.c.d': true,
    'b.e': 'yes',
  })
  expect(target).toEqual(original)
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
  expect(res).toEqual({
    'a': { d: true },
    'b.c.d': true,
    'b.e': 'yes',
  })
  expect(target).toEqual(original)
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
  expect(res).toEqual({
    'a': { d: true },
    'b.c': { d: true },
    'b': { e: { f: true } },
  })
  expect(target).toEqual(original)
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
  expect(res).toEqual({
    'appearence': { hair: 'orange' },
    'traits': { strength: 9000 },
    'traits.range': { min: 8000, max: 10000 },
  })
  expect(target).toEqual(original)
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
  expect(res).toEqual({
    'a': 1,
    'b.c': { d: true },
    'b.e': 'yes',
  })
  expect(target).toEqual(original)
})

test('flatten special objects', () => {
  const target = {}
  const original = copy(target)
  const res = flatten(target)
  expect(res).toEqual({})
  expect(target).toEqual(original)
})

test('flatten special objects 2', () => {
  const date = new Date()
  const target = { a: date }
  const original = copy(target)
  const res = flatten(target)
  expect(res).toEqual({ a: date })
  expect(target).toEqual(original)
})

test('flatten arrays', () => {
  const target = [1, 2, ['a', 'b', ['y', 'z']], 3, [{ a: { b: 1 } }]]
  const original = copy(target)
  const res = flatten(target)
  expect(res).toEqual([1, 2, 'a', 'b', 'y', 'z', 3, { a: { b: 1 } }])
  expect(target).toEqual(original)
})
