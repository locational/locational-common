<template>
  <div>
    <component :is="component_type" :data_things="data_things" :title="title"></component>
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
      component_type () {
        return get(this.view_thing, 'type', 'span')
      },
      title () {
        return get(this.view_thing, 'title', 'Title')
      },
      data_things () {
        return get(this.view_thing, 'data_things', [])
      }
    }
  }
</script>

<style scoped>

</style>