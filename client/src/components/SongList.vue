<template>
    <div>
        <searchBar v-on:song-added="addSong" v-if="searching"></searchBar>
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
                    <h4 class="queueSongTitle">{{song.title}}</h4>
                    <h4 class="queueSongArtist">{{song.artist}}</h4>
                    <h4 class="queueSongDuration">{{song.duration}}</h4>
                </div>
            </li>
         </ol>
         <button v-on:click="searching=true" id="addSongButton" class="bigButton">Add Song</button>
    </div>
</template>

<script>
import player from "./Player.vue";
import searchBar from "./searchBar.vue"

export default {
    data() {
        return {
            searching : false,
            queue : [
                {
                    title : "Ultimate",
                    artist : "Denzel Currry",
                },
                {
                    title: "Lighthouse",
                    artist : "Young trungus ft. Swetti Boy & Afternoon T.",
                }
            ],
            updateTime : 3000,  //update time in ms
            groupname : "",
            username : ""
        }
    },
    components : {
        searchBar
    },
    methods : {
        updateQueueList : function() {
            axios.post(Globals.apiHost + '/queue/getQueue', {
                username : that.$data.username,
                groupname : that.$data.groupname
            }).then((data) => {
                queue = data.body;
            });
            if(queue.length) {
                queue[0].playing = true;
            }
            setTimeout(function() {updateQueueList() }, that.$data.updateTime);
        },
        addSong : function(song) {
            searching = false;
            axios.post(Globals.apiHost + '/queue/addSong', {
                username : username,
                groupname : groupname,
            }).then((res) => {
                console.log("song added");
            }).catch((err) => {
                console.log("err");
            });
        }
    },
    created : function() {
        that.$data.username = Cookies.get("username");
        that.$data.groupname = Cookies.get("groupname");
        that.updateQueueList();
    },
}
</script>

<style lang="css">

#addSongButton{
    position: absolute;
    left: 80%;
    top: 0px;
    width: 200px;
    height: 200px;
}

ol {
    font-size: 20px;
    white-space: nowrap;
    padding: 0 40px;
    justify-content: center;
    align-items: center;
    align-self: center;
    left: 25%;
    position: absolute;
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
    margin-left: 10%;
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
    vertical-align: center;
    align-items: center;
    justify-content: center;
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
