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
            groupName : ""
        }
    },
    created : function() {
        groupname = Cookies.get("groupname");
    },
    components: {
        Player,
        SongList
    }
}
</script>

<style lang="css">
</style>
