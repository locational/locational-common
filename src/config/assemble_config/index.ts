import {cloneDeep} from "lodash";

interface Relation {
  parent_key: string,
  child_key: string
}

export function assemble(source: any, relations: Relation[]) {
  const cloned_source = cloneDeep(source)
  const replaced = expand_for_all_steps(cloned_source, relations)

  return {
    meta: source.meta,
    page_things: replaced['page_things']
  }
}

function expand_for_all_steps(source: any, steps: any[]) {
  let replaced = {}

  steps.forEach(({parent_key, child_key}) => {
    const parent_objects: any[] = source[parent_key]
    const source_child_objects = replaced[child_key] || source[child_key]

    const step_replaced = expand_all_parent_objects_in_step(parent_objects, child_key, source_child_objects);
    replaced[parent_key] = step_replaced
  })

  return replaced
}

function expand_all_parent_objects_in_step(parent_objects: any[], child_key: string, source_child_objects: any) {
  return parent_objects.map(parent => {
    const replaced_children = expand_child_ids_to_objects(parent, child_key, source_child_objects);
    return {
      ...parent,
      [child_key]: replaced_children
    }
  })
}

function expand_child_ids_to_objects(parent: any, child_key: string, source_child_objects: any[]) {
  const children = parent[child_key]
  return children.map(child => {
    return find_and_attach_properties(child, source_child_objects)
  })
}

function find_and_attach_properties(target: any, objects_array: any[]) {
  const found = objects_array.find(o => o.id === target.id)
  return {
    ...target, // keep all properties on original target
    ...found   // and extend with the full object, overwriting 'id' in process
  }
}
