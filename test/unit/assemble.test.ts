import test from 'ava'
import {assemble} from '../../src/app_thing/config/assemble_config/index'

test('empty', async t => {
  const foci = await fetch('/static/configs/foci.json')
  const actual = assemble(foci)
  const expected = ''
  t.deepEqual(actual, {})
})
