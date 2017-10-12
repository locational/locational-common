import test from 'ava'

test('empty', t => {
  const arr = [1, 2, 3]
  const a = {arr}
  const b = a
  arr.push(4)
  t.is(a, b)
})
