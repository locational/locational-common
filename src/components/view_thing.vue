<template>
  <div>
    <h3>I will figure out how to render the view_thing</h3>
    <component is="loc_table"></component>
  </div>
</template>

<script>
  import loc_table from '../view_thing_components/loc_table.vue'

  export default {
    name: 'view_thing',
    props: {

    },
    components: {loc_table},
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