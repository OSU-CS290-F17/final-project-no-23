<template>
    <div>
        <div class="songInfo">
          <h1 class="playingSongTitle">{{song.title}}</h1>
          <h2 class="artist">{{song.artist}}</h2>
          <h3 class="duration">{{song.duration}}</h3>
        </div>

        <button id="skip">Skip</button>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props : {
        song : Object
    },
    created : {
      //make update be called every 3 seconds
    },
    methods : {
        updateQueueList : function(song) {
            axios.post("localhost:3000/api/queue/getQueue", {username : Cookies.get("username"), groupname : group}, (err, data) => {
                queue = data.body;
            })
        }
    }
}
</script>

<style lang="css">

</style>

<specifications>
    plays the damn song
</specifications>
