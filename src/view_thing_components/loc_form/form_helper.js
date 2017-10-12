export const colums_to_form = (columns) => {
  return columns.map(col => {
    return {
      label: col.label,
      field: col.field,
      type: field_type_to_input_type(col.type)
    }
  })
}

const field_type_to_input_type = (field_type) => {
  switch (field_type) {
    case 'number':
      return 'number'
    case 'percentage':
      return 'number'
    default:
      return 'text'
  }
}

export const input_field_to_data = (fields, columns) => {
  const output = {}
  for (const field_name in fields) {
    const field = fields[field_name]
    output[field_name] = process_field(field_name, field, columns)
  }
  return output
}

const process_field = (field_name, field, columns) => {
  const field_config = columns.find(a => a.field === field_name)
  switch (field_config.type) {
    case 'geometry':
      return JSON.parse(field)
    default:
      return field
  }
}
