import test from 'ava'
import {assemble} from '../../src/assembler/index'

test('empty', async t => {
  const foci = await fetch('/static/configs/foci.json')
  const actual = assemble(foci)
  const expected = ''
  t.deepEqual(actual, {})
})
