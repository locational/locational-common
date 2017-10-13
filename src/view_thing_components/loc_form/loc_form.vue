<template>
    <div>
      <md-dialog ref="dialog">
        <md-dialog-title>I am a form</md-dialog-title>

        <md-dialog-content>
            <md-input-container v-for="field in fields_for_form" :key="field.field">
                <label>{{field.label}}</label>
                <md-input v-model="fields[field.field]" :type="field.type"></md-input>
            </md-input-container>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="save">Save</md-button>
          <md-button @click="close_dialog">Cancel</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
</template>

<script>
  import get from 'lodash/get'
  import {colums_to_form, input_field_to_data} from './form_helper'

  export default {
    name: 'loc_form',
    props: {
      data_things: Array,
      title: String,
    },
    data () {
      return {
        fields: {}
      }
    },
    computed: {
      fields_for_form () {
        const data_thing = get(this.data_things, '[0].columns', [])
        return colums_to_form(data_thing)
      }
    },
    mounted () {
      this.$parent.$on('parent_event', (event) => {
        for (const data_thing of this.data_things) {
          const events = get(data_thing, 'events', [])
          events.forEach(event_definition => {
            if (event.type === event_definition.type) {
              console.log('parent event handled in form', event)
              this[event_definition.handler]()
            }
          })
        }
      })
    },
    methods: {
      open_dialog () {
        this.$refs.dialog.open()
      },
      close_dialog () {
        this.$refs.dialog.close()
      },
      save () {
        this.close_dialog()

        const data_thing = get(this.data_things, '[0]', {})

        this.$store.commit('add_data', {
          id: data_thing.id,
          row: input_field_to_data(this.fields, this.data_things[0].columns)
        })
      },
      simulate_click () {
        this.$emit('event', {
          type: 'click',
          payload: {}
        })
      }
    }
  }
</script>

<style scoped>

</style>