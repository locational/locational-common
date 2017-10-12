<template>
  <div id="map"></div>
</template>

<script>
  import {basic_map} from 'view_thing_components/loc_map/basic_map'

  export default {
    name: 'loc_map',
    mounted () {
      basic_map()
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>
 #map {
   height: 600px;
 }
</style>