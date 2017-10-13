<template>
  <div>
      <md-input-container>
          <label for="event_type">Event to emit</label>
          <md-select name="event_type" id="event_type" v-model="event_type">
              <md-option value="select">Select</md-option>
              <md-option value="add_row">Add</md-option>
              <md-option value="edit">Edit</md-option>
          </md-select>
      </md-input-container>

    <component
      :is="component_type"
      :data_things="data_things"
      :title="title"
      :event_bus="event_bus"
      @event="handle_event"
    >
    </component>
  </div>
</template>

<script>
  import get from 'lodash/get'
  import loc_table from 'view_thing_components/loc_table.vue'
  import loc_map from 'view_thing_components/loc_map/loc_map.vue'
  import loc_form from 'view_thing_components/loc_form/loc_form.vue'

  export default {
    name: 'view_thing',
    props: {
      view_thing: Object,
      event_bus: Object
    },
    components: {loc_table, loc_map, loc_form},
    data () {
      return {
        event_type: 'select'
      }
    },
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
      }
    }
  }
</script>

<style scoped>

</style>