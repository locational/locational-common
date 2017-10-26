import test from 'ava'

import {common} from 'data_things/models/common'

test('commonModel should exist', t => {
  const actual = typeof common
  t.is(actual, 'object')
})
