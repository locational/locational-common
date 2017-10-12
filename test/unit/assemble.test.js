import test from 'ava'
import foci from '../../static/configs/foci.json'
import { assemble_config } from '../../src/assemble_config'

test('empty', t => {
  const actual = assemble_config(foci)
  const expected = {
    'page_things': [{
      'id': '1214141212',
      'title': 'Heading for this page',
      'view_things': [{
        'id': '4534534',
        'title': 'Table all responses',
        'type': 'loc_table',
        'data_things': [{
          'id': '45345345345',
          'title': 'Sample data',
          'columns': [{'label': 'Name', 'field': 'name'}, {
            'label': 'Age',
            'field': 'age',
            'type': 'number',
            'html': false
          }, {
            'label': 'Created On',
            'field': 'createdAt',
            'type': 'date',
            'inputFormat': 'YYYYMMDD',
            'outputFormat': 'MMM Do YY'
          }, {'label': 'Percent', 'field': 'score', 'type': 'percentage', 'html': false}],
          'rows': [{'id': 1, 'name': 'John', 'age': 20, 'createdAt': '20171031', 'score': 0.03343}, {
            'id': 2,
            'name': 'Jane',
            'age': 24,
            'createdAt': '20171112',
            'score': 0.23343
          }]
        }],
        'data_view_things': []
      }, {
        'id': '45345341342',
        'title': 'Table all responses',
        'type': 'loc_table',
        'data_things': [{
          'id': '45345345345',
          'title': 'Sample data',
          'columns': [{'label': 'Name', 'field': 'name'}, {
            'label': 'Age',
            'field': 'age',
            'type': 'number',
            'html': false
          }, {
            'label': 'Created On',
            'field': 'createdAt',
            'type': 'date',
            'inputFormat': 'YYYYMMDD',
            'outputFormat': 'MMM Do YY'
          }, {'label': 'Percent', 'field': 'score', 'type': 'percentage', 'html': false}],
          'rows': [{'id': 1, 'name': 'John', 'age': 20, 'createdAt': '20171031', 'score': 0.03343}, {
            'id': 2,
            'name': 'Jane',
            'age': 24,
            'createdAt': '20171112',
            'score': 0.23343
          }]
        }],
        'data_view_things': []
      }]
    }]
  }

  t.deepEqual(actual, expected)
})
