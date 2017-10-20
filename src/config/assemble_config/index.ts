import {ConfigThing} from "./index.d"
import {pluck} from "../../util/pluck"

export function assemble(source: any): ConfigThing {
  let destination: ConfigThing = pluck(source, 'meta') // Start with `meta` copied
  Object.freeze(source) // Does this do what I think it does?

  const step = [{parent_key: 'view_things', child_key: 'data_things'}, {parent_key: 'page_things', child_key: 'view_things'}]
  
  // Decorate onto fattened_array
  let fattened_array = [] // To hold the ids-replaced-with-objects
  step.forEach(step => {
    const parent_key = step.parent_key
    const child_key = step.child_key
    // get the ids-only version of the parent from the source
    const parent_objects: any[] = source[step.parent_key]
    // create the objects-version
    const objects_version = iterate_a_level({source, parent_objects, child_key})
    // write the objects-version to the fattened_array
    fattened_array[parent_key] = objects_version
  })
  
  console.log('fattened_array', fattened_array)
  debugger

  return destination
}

function iterate_a_level({source, parent_objects, child_key}): any[] {
  return parent_objects.map(level => {
    const ids_array = parent_objects
    const objects_array = source[child_key]
    const result = replace_ids_with_objects(ids_array, objects_array)

  })
}

function replace_ids_with_objects(ids_array: number[], objects_array: any[]): any[] {
  return ids_array.map(id => {
    const found = objects_array.find(o => o.id === id)
  }).filter(i => i)
}


// decorate in place
// assemble according to recipe