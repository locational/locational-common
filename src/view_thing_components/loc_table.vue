<template>
  <div>
    <vue-good-table
        :title="title"
        :columns="columns"
        :rows="rows"
        :paginate="true"
        :lineNumbers="true"
        :onClick="on_click"
    />
  </div>
</template>

<script>
  import get from 'lodash/get'

  export default {
    name: 'loc_table',
    props: {
      data_things: Array,
      title: String,
    },
    computed: {
      rows () {
        return get(this.data_things, '[0].rows', [])
      },
      columns () {
        return get(this.data_things, '[0].columns', [])
      }
    },
    methods: {
      on_click (e) {
        console.log('e', e)
      }
    }
  }
</script>