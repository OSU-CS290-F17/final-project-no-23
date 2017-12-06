<template>
    <div>
        <searchBar v-on:song-added="addSong" v-if="searching"></searchBar>
        <ol id="Queue">
            <li v-for="song in queue" class="queueElement">
            	<div v-if="!playing" class="voteButtons">
                    <button v-on:click="vote(1, song.uri)" class="upvote">+</button>
                    <button v-on:click="vote(-1, song.uri)" class="downvote">-</button>
                </div>
                <div v-if="playing" class="voteButtons">
                    <button class="playing"></button>
                </div>
                <div class='infoText'>
                    <h4 class="queueSongTitle">{{song.name}}</h4>
                    <h4 class="queueSongArtist">{{song.artist}}</h4>
                    <h4 class="queueSongDuration">Votes : {{song.votes}}</h4>
                </div>

            </li>
         </ol>
         <button v-on:click="searching=true" id="addSongButton" class="bigButton">Add Song</button>
    </div>
</template>

<script>
import player from "./Player.vue";
import searchBar from "./searchBar.vue"

var Globals = require("./../Globals.json");
const axios = require("axios");

export default {
    data() {
        return {
            searching : false,
            queue : [],
            updateTime : 3000,  //update time in ms
            groupname : "",
            username : "",
            votes : 10,
            voteTimer : 10000
        }
    },
    components : {
        searchBar
    },
    created : function() {
        var that = this;
        that.$data.username = Cookies.get("username");
        that.$data.groupname = Cookies.get("groupname");
        window.setInterval(that.updateQueueList, that.$data.updateTime);
        window.setInterval(that.moreVotes, that.$data.voteTimer)
        that.updateQueueList();
    },
    methods : {

        updateQueueList : function() {
            var that = this;
            axios.post(Globals.apiHost + '/queue/getQueue', {
                username : Cookies.get("username"),
                groupname : that.$data.groupname
            }).then((data) => {
                var trueData = [];
                console.log(data);
                that.$data.queue = data.data.queue[0];

            });
            if(that.$data.queue.length) {
                that.$data.queue[0].playing = true;
            }
        },
        addSong : function(song) {
            var that = this;
            song.votes = 0;
            that.$data.queue.push(song);
            that.$data.searching = false;
            axios.post(Globals.apiHost + '/queue/addSong', {
                username : Cookies.get("username"),
                groupname : Cookies.get("groupname"),
                queue : that.$data.queue
            }).then((res) => {
                console.log("song added");
                that.updateQueueList();
            }).catch((err) => {
                console.log("err");
            });
        },
        vote : function(updown, uri) {
            var that = this;
            if(votes > 0) {
                axios.post(Globals.apiHost + '/queue/addSong', {
                    username : Cookies.get("username"),
                    vote : updown,
                    song : uri
                }).then((res) => {
                    console.log("votes");
                    that.updateQueueList();
                })
            }

        },
        moreVotes : function() {
            var that = this;
            that.$data.votes += 1;
        }
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
    display: block;
    vertical-align: middle;
}

h4{
    word-wrap: break-word;
    max-width: 420px;
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
    display: table-cell;
    vertical-align: middle;
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
