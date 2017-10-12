<template>
  <div>
    <h1>I'm a page_thing, and I will figure out what view_things need to be rendered </h1>
    <h3>{{current_page_thing.title}} - {{page_thing_id}} </h3>

    <view_thing v-for="view_thing_id in current_page_thing.view_things" :key="view_thing_id" :id="view_thing_id"></view_thing>

  </div>
</template>

<script>
  import get from 'lodash/get'
  import view_thing from './view_thing.vue'

  export default {
    name: 'page_thing',
    components: {view_thing},
    props: {
      page: String
    },
    computed: {
      current_page_thing () {
        const page_things = get(this.$store.state.config, 'page_things', [])
        return page_things.find(p => p.id === this.page_thing_id)
      },
    }
  }
</script>

<style scoped>

</style>