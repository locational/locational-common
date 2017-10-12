import test from 'ava'
import foci from '../../static/configs/foci.json'
import { assemble_config } from '../../src/assemble_config'

test('empty', t => {
  const actual = assemble_config(foci)
  const expected = ''
  t.deepEqual(actual, expected)
})
