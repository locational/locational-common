<template>
  <div>
    <h3>I will figure out how to render the view_thing</h3>
    <component is="loc_table" :data_things="data_things"></component>
  </div>
</template>

<script>
  import get from 'lodash/get'
  import loc_table from '../view_thing_components/loc_table.vue'

  export default {
    name: 'view_thing',
    props: {
      view_thing: Object
    },
    components: {loc_table},
    computed: {
      data_things () {
        return get(this.view_thing, 'data_things', [])
      }
    }
  }
</script>

<style scoped>

</style>