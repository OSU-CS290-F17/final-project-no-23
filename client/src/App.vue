<template>
  <div>
      <h1> Welcome to {{groupName}} </h1>
      <song-list></song-list>
  </div>
</template>

<script>
import SongList from "./components/SongList.vue";

export default {
    data() {
        return {
            groupName : 'Music List Below'
        }
    },
    components: {
        SongList
    }
}
</script>

<style lang="css">
</style>
