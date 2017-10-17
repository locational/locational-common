import schema from 'js-schema'

export const meta_schema = schema({
  id: String,
  title: String
})

const page_things_schema = schema({
  id: String,
  title: String,
  view_things: Array.of_x({
    id: String
  })
})

export const view_things_schema = schema({
  id: String,
  title: String,
  type: String,
  data_things: Array.of_x({
    id: String
  }),
  data_view_things: Array.of_x({
    id: String
  })
})

export const data_view_things_schema = schema({
  id: String,
  title: String,
  data_thing: Array.of_x({
    id: String,
  }),
  filters: Array
})

export const data_things_schema = schema({
  id: String,
  title: String,
  columns: Array.of_x({
    label: String,
    field: String,
    '?type': String,
    '?html': Boolean,
    '?inputFormat': String,
    '?outputFormat': String,
  })
})

export const config_schema = schema({
  meta: meta_schema,
  page_things: Array.of_x(page_things_schema),
  view_things: Array.of_x(view_things_schema),
  data_view_things: Array.of_x(data_view_things_schema),
  data_things: Array.of_x(data_things_schema)
})
