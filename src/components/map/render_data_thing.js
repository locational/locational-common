import { featureCollection } from '@turf/helpers'
import get from 'lodash.get'

export const render_data_thing = (data_thing) => {
  const rows = get(data_thing, 'rows', [])
  const features = rows.map(data_thing_thing => {
    return data_thing_thing.$geom
  })

  return featureCollection(features)
}
