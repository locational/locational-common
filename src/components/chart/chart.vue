<template>
  <div id='chart' @click="emit"></div>
</template>

<script lang="ts">
  export default {
    mixin: {LocationalComponent},
    name: 'chart',
    props: {
      subscribe: Object // already partially applied with `config`
    },
    mounted () {
      this.subscribe().then((data) => {
        this.inject_data_into_component(data)
      })
    },
    methods: {
      inject_data_into_component (data) {
        this.chart = new Chart({
          el: '#chart'
        })
        // console.log('rendering chart with', data)
      },
      emit (e) {
        this.$emit(e)
      }
    },
  }
</script>

<style scoped>

</style>