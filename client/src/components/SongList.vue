<template>
    <div>
        <ol id="Queue">
            <li v-for="song in queue" class="queueElement">
            	<div v-if="!playing" class="voteButtons">
                    <button class="upvote">+</button>
                    <button class="downvote">-</button>
                </div>
                <div v-if="playing" class="voteButtons">
                    <button class="playing">></button>
                </div>
                <div class='infoText'>
                    <h3 class="queueSongTitle">{{song.title}}</h3>
                    <h4 class="queueSongArtist">{{song.artist}}</h4>
                    <h4 class="queueSongDuration">{{song.duration}}</h4>
                </div>
            </li>
         </ol>
         <button id="addSongButton" class="bigButton">Add Song</button>
    </div>
</template>

<script>
import player from "./Player.vue";
export default {
    data() {
        return {
            current : {},
            queue : [
                {
                    title : "Ultimate",
                    artist : "Denzel Currry",
                    duration: "0:00/0:00"
                },
                {
                    title: "Lighthouse",
                    artist : "Young trungus ft. Swetti Boy & Afternoon T.",
                    duration: "69:69/69:69"
                }
            ],
            updateTime : 3000  //update time in ms
        }
    },
    methods : {
        updateQueueList : function(song) {
            axios.post(Globals.apiHost + '/queue/getQueue', {
                username : Cookies.get("username"),
                groupname : group
            }).then((data) => {
                queue = data.body;
            });
            if(queue.length) {
                queue[0].playing = true;
            }
            setTimeout(function() {updateQueueList() }, that.$data.updateTime);
        }
    },
    created : function() {
        that.updateQueueList();
    },
}
</script>

<style lang="css">

ol {
    font-size: 20px;
    white-space: nowrap;
    padding: 0 40px;
}

li {
    vertical-align: text-bottom;
    white-space: normal;
    display: block;
}

.queueElement {
    background-color: #D9DBF1;
    border-radius: 10px;
    margin: 10px;
    width: 550px;
}

.voteButtons{
    display: inline-block;
    margin: 0px;
}

.upvote {
    -moz-transition: all .1s ease-in;
    -o-transition: all .1s ease-in;
    -webkit-transition: all .1s ease-in;
    transition: all .1s ease-in;
    display: block;
    height: 50px;
    width: 50px;
  color: #eee;
  border-radius:5px;
  margin: 10px;
  text-align: center;
  display: block;
}

.upvote:hover {
    background-color: #0ccc1f;
    cursor:pointer;
}

.upvote:active {
    background-color: #098715;
}

.downvote {
    -moz-transition: all .1s ease-in;
    -o-transition: all .1s ease-in;
    -webkit-transition: all .1s ease-in;
    transition: all .1s ease-in;
    display: block;
    height: 50px;
    width: 50px;
  color: #eee;
  border-radius:5px;
  margin: 10px;
  display: block;
}

.downvote:hover {
    background-color: #f44242;
    cursor:pointer;
}

.downvote:active {
    background-color: #a52929;
}

.infoText{
    display: inline-block;
    vertical-align: text-bottom;
    margin: 0px;
}

.queueSongTitle {
    font-size: 35px;
    margin: 0px;
}

.queueSongArtist {
    font-size: 20px;
    margin: 0px 0px 0px 0px;
}

.queueSongDuration {
    margin: 0px;
}

</style>


<specifications>
    Desired functionality
        displays updated group queue song list
        allows various functions on each song (upvote remove etc) depending on permission
            reordering of songs within queue
        allows addition of new song to queue from search area (what this means changes based on group)

</specifications>
