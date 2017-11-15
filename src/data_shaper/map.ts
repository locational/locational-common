import {featureCollection, feature} from "@turf/helpers";
import {cloneDeep} from 'lodash'

export function transform_for_map(data) {
    const formatted_rows = data.map(row => {
        const copy = cloneDeep(row)
        delete copy.$geom

        const f = feature(row.$geom, copy)
        return f
    })

    return featureCollection(formatted_rows)
}