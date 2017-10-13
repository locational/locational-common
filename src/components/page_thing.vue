<template>
  <div>
    <h1>I'm a page_thing, and I will figure out what view_things need to be rendered </h1>
    <h3>{{title}} - {{id}} </h3>
    <view_thing
       v-for="view_thing in view_things"
       :key="view_thing.id"
       :view_thing="view_thing"
       @view_thing_event="handle_event"
    >

    </view_thing>
  </div>
</template>

<script>
  import get from 'lodash/get'
  import view_thing from './view_thing.vue'

  export default {
    name: 'page_thing',
    components: {view_thing},
    props: {
      page_thing_id: String
    },
    computed: {
      page_thing () {
        return this.$store.getters['current_page_thing'](this.page_thing_id)
      },
      view_things () {
        return get(this.page_thing, 'view_things', [])
      },
      title () {
        return get(this.page_thing, 'title', 'Title')
      },
      id () {
        return get(this.page_thing, 'id', 'ID')
      }
    },
    methods: {
      handle_event (event) {
        this.$emit('parent_event', event)
      }
    }
  }
</script>

<style scoped>

</style>