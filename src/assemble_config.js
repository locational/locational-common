const def = [['view_things', 'data_things'], ['page_things', 'view_things']] // 'view_things' have 'data_things'

export const assemble_config = (config) => {
  let output = {}

  for (const sub_definition of def) {
    const src_object_name = sub_definition[0] // view_things
    const property_with_ids_from_src_object = sub_definition[1] // data_things

    // start by copying entire object across
    output[src_object_name] = config[src_object_name]

    // find the actual_objects from property_with_ids_from_src_object
    for (const object_from_config_to_find_id_for of config[src_object_name]) {
      // object_from_config_to_find_id_for is a view_thing
      const ids_to_find = object_from_config_to_find_id_for[property_with_ids_from_src_object]

      for (const id of ids_to_find) {
        const found = config[property_with_ids_from_src_object].find(o => o.id === id)
        const found_index = config[property_with_ids_from_src_object].findIndex(o => o.id === id)
        object_from_config_to_find_id_for[property_with_ids_from_src_object][found_index] = found
      }
    }
  }
  delete output[def[0][0]]
  return output
}
