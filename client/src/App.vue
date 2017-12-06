<template>
  <div>
      <h1> Welcome to {{groupname}} </h1>
      <song-list></song-list>
  </div>
</template>

<script>
import Player from "./components/Player.vue";
import SongList from "./components/SongList.vue";

export default {
    data() {
        return {
            groupname : ""
        }
    },
    created : function() {
        this.$data.groupname = Cookies.get("groupname");
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
font-size: 72px;
font-style: strong;
}
</style>
