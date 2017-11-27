<template>
  <div>
      <h1> Welcome to {{groupName}} </h1>
  </div>
</template>

<script>
import SongList from "./SongList.vue";

export default {
    data() {
        return {
            groupName : 'Fake Frat'
        }
    },
    components: {
        SongList
    }
}
</script>

<style lang="css">
</style>
