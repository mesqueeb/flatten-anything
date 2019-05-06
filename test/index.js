import test from 'ava'
import flatten from '../dist/index.cjs'

test('flatten', t => {
  let res, target
  target = {
    a: 1,
    b: {
      c: {d: true},
      e: 'yes'
    }
  }
  res = flatten(target)
  t.deepEqual(res, {
    'a': 1,
    'b.c.d': true,
    'b.e': 'yes'
  })
})
test('flatten special objects', t => {
  let res, target
  target = {}
  res = flatten(target)
  t.deepEqual(res, {})
  const date = new Date()
  target = {a: date}
  res = flatten(target)
  t.deepEqual(res, {a: date})
})

test('flatten arrays', t => {
  let res, target
  target = [1, 2, ['a', 'b', ['y', 'z']], 3, [{a: {b: 1}}]]
  res = flatten(target)
  t.deepEqual(res, [1, 2, 'a', 'b', 'y', 'z', 3, {a: {b: 1}}])
})
