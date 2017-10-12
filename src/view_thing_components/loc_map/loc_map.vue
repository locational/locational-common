<template>
  <div id="map"></div>
</template>

<script>
  import {basic_map} from 'view_thing_components/loc_map/basic_map'
  import {render_data_thing} from 'view_thing_components/loc_map/render_data_thing'

  export default {
    name: 'loc_map',
    props: {
      data_things: Array,
      title: String,
    },
    mounted () {
      this._map = basic_map()

      const fc = render_data_thing(this.data_things[0])

      this._map.on('load', () => {
        this._map.addLayer({
          'id': 'layer',
          'type': 'circle',
          'source': {
            'type': 'geojson',
            'data': fc
          },
          paint: {
            'circle-color': 'blue',
            'circle-radius': 10,
            'circle-opacity': 0.9,
          }
        })
      })
    }
  }
</script>

<style scoped>
 #map {
   height: 600px;
 }
</style>