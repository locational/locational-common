import {cloneDeep} from "lodash";

interface Relation {
  parent_key: string,
  child_key: string
}

export function assemble(source: any, relations: Relation[]) {
  const cloned_source: any = cloneDeep(source)
  const replaced: any = fatten_every_step(cloned_source, relations)

  // Assemble desired return structure
  return {
    meta: source.meta,
    page_things: replaced.page_things
  }
}

function fatten_every_step(source: any, steps: any[]) {
  let fattened = {}

  steps.forEach(({parent_key, child_key}) => {
    const parent_objects: any[] = source[parent_key]
    const source_child_objects = fattened[child_key] || source[child_key]

    fattened[parent_key] = fatten_children(parent_objects, child_key, source_child_objects)
  })

  return fattened
}

function fatten_children(parent_objects: any[], child_key: string, source_child_objects: any) {
  return parent_objects.map(parent => {
    const children = parent[child_key]
    const fattened_children = children.map(child => fatten(child, source_child_objects))
    return {
      ...parent,                      // keep original parent
      [child_key]: fattened_children  // and attach the expanded children
    }
  })
}

function fatten(target: any, objects_array: any[]) {
  const found = objects_array.find(o => o.id === target.id)
  return {
    ...target, // keep all properties on original target
    ...found   // and extend with the full object, overwriting 'id' in process
  }
}
