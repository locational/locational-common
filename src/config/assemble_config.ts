// import CONFIG from './common' // Defines relations e.g. 'view_things' have 'data_things'
//
// interface AssembledConfig {
//   meta: object,
//   page_things: Array<object>
// }
//
// interface ExplodedThings {
//   page_things: Array<object>
// }
//
// function explode_ids (config): ExplodedThings {
//   let assembled = {page_things: []} // write each parent back to this as its constructed
//
//   // iterate the relations
//   CONFIG.config_relations.forEach(relation => {
//     // establish keys
//     const parent_key = relation[0] // e.g. view_things for first relation
//     const child_key = relation[1] // e.g. data_things for first relation
//
//     let parents = assembled[parent_key] || config[parent_key] // no mutation
//     const children = config[child_key] // reference, read-only
//
//     // for each parent_object, take the array in the child_key
//     const replace_parents = parents.map(parent_object => {
//       const targets_to_explode = parent_object[child_key]
//       const objects_array = children
//       const replaced_child_ids = replace_ids_with_objects(targets_to_explode, objects_array)
//       parent_object[child_key] = replaced_child_ids
//       return parent_object
//     })
//
//     // write the result back to output
//     assembled[parent_key] = replace_parents
//   })
//   return assembled
// }
//
// export const assemble_config = (config) => {
//   let output: AssembledConfig = {meta: {}, page_things: []}
//
//   const exploded: ExplodedThings = explode_ids(config)
//   output.meta = config.meta
//   output.page_things = exploded.page_things
//   return output
// }
//
// interface Things {
//   target: object,
//   object: object
// }
//
// function replace_ids_with_objects (targets_to_explode, objects_array): Array<Things> {
//   return targets_to_explode.map(target => {
//     const object = objects_array.find(object => object.id === target.id)
//     return {
//       ...target,
//       ...object
//     }
//   })
// }
