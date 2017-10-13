<template>
  <div>
    <md-button class="md-icon-button md-raised md-accent">
      <md-icon>add</md-icon>
    </md-button>
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
      data_thing () {
        return this.data_things[0]
      },
      rows () {
        return get(this.data_thing, 'rows', [])
      },
      columns () {
        return get(this.data_thing, 'columns', [])
      },
    },
    methods: {
      on_click (e) {
        console.log('e', e)
      }
    }
  }
</script>