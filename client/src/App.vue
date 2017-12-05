<template>
  <div>
      <h1> Welcome to {{groupName}} </h1>
      <song-list></song-list>
  </div>
</template>

<script>
import Player from "./components/Player.vue";
import SongList from "./components/SongList.vue";

export default {
    data() {
        return {
            groupName : 'Music List Below'
        }
    },
    components: {
        Player,
        SongList
    }
}
</script>

<style lang="css">
h1{
text-align: center;
}
</style>
