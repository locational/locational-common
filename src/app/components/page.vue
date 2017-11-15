<template>
  <div>
    <h1>I'm a page_thing, and I will figure out what view_things need to be rendered </h1>
    <h3>{{title}} - {{id}} </h3>
    <view_thing
       v-for="view_thing in view_things"
       :key="view_thing.id"
       :view_thing="view_thing"
       :event_bus="event_bus"
    >
    </view_thing>
  </div>
</template>

<script>
  import get from 'lodash.get'

  import view_thing from '../../view/view.vue'

  export default {
    name: 'page_thing',
    components: {view_thing},
    props: {
      page_thing_configuration: Object
    },
    computed: {
      view_things () {
        return get(this.page_thing_configuration, 'view_things', [])
      },
      title () {
        return get(this.page_thing_configuration, 'title', 'Title')
      },
      id () {
        return get(this.page_thing_configuration, 'id', 'ID')
      }
    }
  }
</script>

<style scoped>

</style>