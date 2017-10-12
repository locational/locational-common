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
