// Define relations e.g. 'view_things' have 'data_things'
import CONFIG from 'config/config'

function explode_ids (config) {
  let assembled = {} // write each parent back to this as its constructed

  // iterate the relations
  CONFIG.relations.forEach(relation => {
    // establish keys
    const parent_key = relation[0] // e.g. view_things for first relation
    const child_key = relation[1] // e.g. data_things for first relation

    let parents = assembled[parent_key] || config[parent_key] // no mutation
    const children = config[child_key] // reference, read-only

    // for each parent_object, take the array in the child_key
    const replace_parents = parents.map(parent_object => {
      const targets_to_explode = parent_object[child_key]
      const objects_array = children
      const replaced_child_ids = replace_ids_with_objects(targets_to_explode, objects_array)
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

function replace_ids_with_objects (targets_to_explode, objects_array) {
  return targets_to_explode.map(target => {
    const object = objects_array.find(object => object.id === target.id)
    return {
      ...target,
      ...object
    }
  })
}
