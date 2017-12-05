<template>
    <div>
    <ol id="Queue">
        <li v-for="song in queue" class="queueElement">
        	<div class="voteButtons">
                <button class="upvote">+</button>
                <button class="downvote">-</button>
            </div>
            <div class='infoText'>
                <h3 class="queueSongTitle">{{song.songname}}</h3>
                <h4 class="queueSongArtist">{{song.artistname}}</h4>
            </div>
        </li>
     </ol>
     <button id="addSongButton" class="bigButton">Add Song</button>
 </div>
</template>

<script>
export default {
    data() {
        return {
            queue : [
                {
                    songname : "Ultimate",
                    artistname : "Denzel Currry"
                },
                {
                    songname: "Lighthouse",
                    artistname : "Young trungus ft. Swetti Boy & Afternoon T."
                }
            ]
        }
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

.voteButtons{
    display: inline-block;
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
}
</style>


<specifications>
    Desired functionality
        displays updated group queue song list
        allows various functions on each song (upvote remove etc) depending on permission
            reordering of songs within queue
        allows addition of new song to queue from search area (what this means changes based on group)

</specifications>
