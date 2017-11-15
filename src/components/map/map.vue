<template>
  <div id="map"></div>
</template>

<script>
  import get from 'lodash.get'

  import {basic_map} from 'components/map/basic_map'
  import {render_data_thing} from 'components/map/render_data_thing'

  export default {
    name: 'loc_map',
    props: {
      event_bus: Object,
      data_things: Array,
      title: String,
    },
    watch: {
      'data_things': 'redraw_layer'
    },
    mounted () {
      this._map = basic_map('map')
      this._map.on('load', () => {
        this.redraw_layer()
      })

      for (const data_thing of this.data_things) {
        const events = get(data_thing, 'events', [])
        events.forEach(event_definition => {
          this.event_bus.$on(event_definition.type, this[event_definition.handler])
        })
      }
    },
    methods: {
      select (e) {
        console.log('select something from map', e)
      },
      redraw_layer () {
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
        this._map.on('click', (e) => {
          // TODO: @feature handle click and send some data
          this.$emit('event', e)
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