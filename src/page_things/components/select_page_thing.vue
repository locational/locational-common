<template>
  <div>

    <!--Start rendering page_things -->
    <ul>
      <li v-for="page_thing in page_things" :key="page_thing.id">
        <router-link :to="`/pages/${page_thing.id}`">{{page_thing.title}}</router-link>
      </li>
    </ul>

  </div>
</template>

<script>
  import get from 'lodash.get'

  export default {
    name: 'select_page_thing',
    computed: {
      page_things () { return get(this.$store.state.config, 'page_things', []) }
    },
  }
</script>

<style scoped>

</style>