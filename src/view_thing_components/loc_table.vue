<template>
  <div>
    <vue-good-table
        :title="title"
        :columns="columns"
        :rows="rows"
        :paginate="true"
        :lineNumbers="true"/>
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
    mounted () {
      this.$parent.$on('parent_event', (event) => {
        for (const data_thing of this.data_things) {
          const events = get(data_thing, 'events', [])
          events.forEach(event_definition => {
            if (event.type === event_definition.type) {
              console.log('parent event handled in table', event)
            }
          })
        }
      })
    },
    methods: {
      simulate_click () {
        this.$emit('event', {
          type: 'click',
          payload: {}
        })
      }
    }
  }
</script>