
<template>
    <ol id="current-queue">
        <li v-for="song in currentQueue">{{song.title}}</li>
        <button
    </ol>
</template>

<script>
export default {
    data() {
        return {
            currentQueue : [
                {
                    title : "Ultimate",
                    artist : "Denzel Currry"
                },
                {
                    title: "Lighthouse",
                    artist : "Young trungus ft. Swettiboy & Afternoon T."
                }
            ]
        }
    },
    methods : {
        updateQueueList : function(song) {
            $.post("localhost:3000/api/queue/getlist", {user : user, group : group}, (err, data) => {
                if (!err) {
                    currentQueue = data.currentQueue;
                }
            })
        }
    }
}
</script>

<style lang="css">
</style>


<specifications>
    Desired functionality
        displays updated group queue song list
        allows various functions on each song (upvote remove etc) depending on permission
            reordering of songs within queue
        allows addition of new song to queue from search area (what this means changes based on group)

</specifications>
