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
        return colums_to_form(this.data_things[0].columns)
      }
    },
    methods: {
      close_dialog () {
        this.$refs.dialog.close()
      },
      save () {
        this.close_dialog()
        // save something
        this.$store.commit('add_data', input_field_to_data(this.fields, this.data_things[0].columns))
      }
    }
  }
</script>

<style scoped>

</style>