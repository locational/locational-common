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
    watch: {
      'data_things': 'redraw_layer'
    },
    mounted () {
      this._map = basic_map()
      this._map.on('load', () => {
        this.redraw_layer()
      })
    },
    methods: {
      redraw_layer () {
        console.log('redraw layer')
        for (const layer of this.data_things) {
          this.clear_map(layer)
          this.draw_layer(layer)
        }
      },
      clear_map (layer) {
        if (this._map.getLayer(layer.id)) {
          this._map.removeLayer(layer.id)
        }

        if (this._map.getSource(layer.id)) {
          this._map.removeSource(layer.id)
        }
      },
      draw_layer (layer) {
        const fc = render_data_thing(layer)
        this._map.addLayer({
          'id': layer.id,
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
      }
    }
  }
</script>

<style scoped>
 #map {
   height: 600px;
 }
</style>