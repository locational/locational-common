<template>
  <div>

    <controls></controls>

    <component
      :is="component_type"
      :data_things="transform_data(data_things)"
      :title="title"
      :event_bus="event_bus"
      @event="handle_event"
    >
    </component>


  </div>
</template>

<script>
  import {get} from 'lodash'

  import controls from 'view/components/controls'
  import loc_table from 'components/table/table.vue'
  import loc_map from 'components/map/map.vue'
  import loc_form from 'components/form/form.vue'

  import { transform } from 'data_processor/pipeline/pipeline'

  export default {
    name: 'view_thing',
    props: {
      view_thing: Object,
      event_bus: Object, // This is key - link to fruitplate/store, subscriptions, etc.
      data: Object
    },
    components: {controls, loc_table, loc_map, loc_form},
    computed: {
      component_type () {
        return get(this.view_thing, 'type', 'span')
      },
      title () {
        return get(this.view_thing, 'title', 'Title')
      },
      data () {
        return get(this.$store.state, 'data', [])
      },
      data_things () {
        const data_things = get(this.view_thing, 'data_things', [])
        return data_things.map(data_thing => {
          const data = this.data.find(d => d.id === data_thing.id) || {}
          return {
            ...data,
            ...data_thing
          }
        })
      }
    },
    created () {
      this.get_data()
    },
    methods: {
      async get_data () {
        const data_things = get(this.view_thing, 'data_things', [])
        for (const data_thing of data_things) {
          await this.$store.dispatch('get_data', data_thing.id)
        }
      },
      handle_event (e) {
        this.event_bus.$emit(this.event_type, e)
      },
      transform_data (data_things) {
        const steps = this.view_thing.steps

        return data_things.map(data_thing => {
          if (data_thing.hasOwnProperty('rows')) {
            data_thing.rows = transform(data_thing.rows, steps)
            return data_thing
          }

          if (!data_thing.hasOwnProperty('steps')) {
            return data_thing
          }

          data_thing.rows = []
          return data_thing
        })
      }
    }
  }
</script>

<style scoped>

</style>