<template>
  <div>
    <h1>I'm a page_thing, and I will figure out what view_things need to be rendered for {{page_thing_id}} </h1>
  </div>
</template>

<script>
  export default {
    name: 'page_thing',
    props: {
      page_thing_id: String
    },
    mounted () {
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>

</style>