import test from 'ava'
import flatten from '../dist/index.cjs'
import { flattenObjectProps } from '../dist/index.cjs'
import copy from 'copy-anything'

test('flatten objects', t => {
  let res, target, original
  target = {
    a: 1,
    b: {
      c: {d: true},
      e: 'yes'
    }
  }
  original = copy(target)
  res = flatten(target)
  t.deepEqual(res, {
    'a': 1,
    'b.c.d': true,
    'b.e': 'yes'
  })
  t.deepEqual(target, original)
})

test('flattenObjectProps', t => {
  let res, target, original
  target = {
    a: {d: true},
    b: {
      c: {d: true},
      e: 'yes'
    }
  }
  original = copy(target)
  res = flattenObjectProps(target, ['b'])
  t.deepEqual(res, {
    'a': {d: true},
    'b.c.d': true,
    'b.e': 'yes'
  })
  t.deepEqual(target, original)
})

test('flatten object limit', t => {
  let res, target, original
  target = {
    a: 1,
    b: {
      c: {d: true},
      e: 'yes'
    }
  }
  original = copy(target)
  res = flatten(target, 1)
  t.deepEqual(res, {
    'a': 1,
    'b.c': {d: true},
    'b.e': 'yes'
  })
  t.deepEqual(target, original)
})

test('flatten special objects', t => {
  let res, target, original
  target = {}
  original = copy(target)
  res = flatten(target)
  t.deepEqual(res, {})
  t.deepEqual(target, original)
  const date = new Date()
  target = {a: date}
  original = copy(target)
  res = flatten(target)
  t.deepEqual(res, {a: date})
  t.deepEqual(target, original)
})

test('flatten arrays', t => {
  let res, target, original
  target = [1, 2, ['a', 'b', ['y', 'z']], 3, [{a: {b: 1}}]]
  original = copy(target)
  res = flatten(target)
  t.deepEqual(res, [1, 2, 'a', 'b', 'y', 'z', 3, {a: {b: 1}}])
  t.deepEqual(target, original)
})
