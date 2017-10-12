// Define relations e.g. 'view_things' have 'data_things'
const relations = [['view_things', 'data_things'], ['view_things', 'data_view_things'], ['page_things', 'view_things']]

function explode_ids (config) {
  let assembled = {} // write each parent back to this as its constructed

  // iterate the relations
  relations.forEach(relation => {
    // establish keys
    const parent_key = relation[0] // e.g. view_things for first relation
    const child_key = relation[1] // e.g. data_things for first relation

    let parents = assembled[parent_key] || config[parent_key] // no mutation
    const children = config[child_key] // reference, read-only

    // for each parent_object, take the array in the child_key
    const replace_parents = parents.map(parent_object => {
      const ids_array = parent_object[child_key]
      const objects_array = children
      const replaced_child_ids = replace_ids_with_objects(ids_array, objects_array)
      parent_object[child_key] = replaced_child_ids
      return parent_object
    })

    // write the result back to output
    assembled[parent_key] = replace_parents
  })
  return assembled
}

export const assemble_config = (config) => {
  let output = {}
  const exploded = explode_ids(config)
  output.meta = config.meta
  output.page_things = exploded.page_things
  return output
}

function replace_ids_with_objects (ids_array, objects_array) {
  return ids_array.map(id => {
    return objects_array.find(object => object.id === id)
  })
}
