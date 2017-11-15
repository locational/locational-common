<template>
  <md-input-container>
    <label for="event_type">Event to emit</label>
    <md-select name="event_type" id="event_type" v-model="event_type">
      <md-option value="select">Select</md-option>
      <md-option value="add_row">Add</md-option>
      <md-option value="edit">Edit</md-option>
    </md-select>
  </md-input-container>
</template>

<script>
  export default {
    name: 'controls',
    data () {
      return {
        event_type: 'select'
      }
    },
  }
</script>

<style scoped>

</style>