import {cloneDeep} from "lodash";

function replace_id_with_object(target: any, objects_array: any[]) {
  const found = objects_array.find(o => o.id === target.id)
  return {
    ...target, // keep all properties on original target
    ...found
  }
}
const steps = [
  {parent_key: 'view_things', child_key: 'data_things'},
  {parent_key: 'page_things', child_key: 'view_things'}
]

function replace_all_ids_with_objects(source: any) {
  let replaced = {}

  steps.forEach(({parent_key, child_key}) => {
    const parent_objects: any[] = source[parent_key]
    const source_child_objects = replaced[child_key] || source[child_key]
    const things = parent_objects.map(parent => {
      const children = parent[child_key]
      const replaced_children = children.map(child => {
        return replace_id_with_object(child, source_child_objects)
      })
      return {
        ...parent,
        [child_key]: replaced_children
      }
    })
    replaced[parent_key] = things
  })

  return replaced
}

export function assemble(source: any) {
  const cloned_source = cloneDeep(source)
  const replaced = replace_all_ids_with_objects(cloned_source)

  return {
    meta: source.meta,
    page_things: replaced['page_things']
  }
}
