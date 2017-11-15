<template>

  <!--Start rendering page_things -->
  <ul>
    <li v-for="page_thing in page_things" :key="page_thing.id">
      <router-link :to="`/pages/${page_thing.id}`">{{page_thing.title}}</router-link>
    </li>
  </ul>

</template>

<script>
  export default {
    name: 'select_page_thing',
    props: {
      page_things: Array
    }
  }
</script>

<style scoped>

</style>