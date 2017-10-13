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
      event_bus: Object,
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
      for (const data_thing of this.data_things) {
        const events = get(data_thing, 'events', [])
        events.forEach(event_definition => {
          this.event_bus.$on(event_definition.type, this[event_definition.handler])
        })
      }
    },
    methods: {
      edit (e) {
        this.fields = e
        this.open_dialog()
      },
      add () {
        this.fields = {}
        this.open_dialog()
      },
      open_dialog () {
        this.$refs.dialog.open()
      },
      close_dialog () {
        this.$refs.dialog.close()
      },
      save () {
        this.close_dialog()

        const columns = get(this.data_things, '[0].columns', [])

        const data_to_emit = input_field_to_data(this.fields, columns)

        this.event_bus.$emit('event', data_to_emit)
      }
    }
  }
</script>

<style scoped>

</style>