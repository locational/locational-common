<template>
  <div>
    <vue-good-table
        title="Demo Table"
        :columns="columns"
        :rows="rows"
        :paginate="true"
        :lineNumbers="true"/>
  </div>
</template>

<script>
  export default {
    name: 'loc_table',
    props: {
      columns: Array,
      rows: Array
    },
  }
</script>