<template>
  <div id='searchResults'>
    <div id = 'resultsModal'>
        <input v-model='searchQuery' id="searchBar" placeholder='Song Name' @change = 'search()'>

      <ol id ='songs'>
        <li v-for="song in songInfo">
          <div class='songContainer'>
            <div class='songText'>
              <h2>{{song.name}}</h2>
              <h3>{{song.artist}}</h3>
            </div>
            <button v-on:click = "addToQueue(song)" id ='addSong'>+</button>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  const axios = require('axios');

  var Globals = require("../Globals.json")

  export default{
    data(){
      return {
        searchQuery: '',
        songInfo: [],
        username: "",
      };
  },
    created : function(){
      this.$data.username = Cookies.get('username');
      var that = this;
    },
    methods:{
      /*
      search: function(){
        var that = this;
        var track, artist;

        for(var i = 0; i < this.$data.tracks.items.length; i++) {
          track = this.$data.tracks.items[i];
          for(var j = 0; j < track.artists.length; j++){
            artist = this.$data.tracks.items[i].artists[j];
            this.$data.songInfo.push({
              name : track.name,
              artist: artist.name,
              id: track.id,
              uri: track.uri,
              groupName: Cookies.get('groupName')
            });
          }
        }
        console.log(this.$data.songInfo);
      },
      */

      addToQueue: function(song){
        that.$emit("song-added", song);
      },
      search: function(){
        var that = this;
        console.log(that.$data);
        axios.post(Globals.apiHost + "/search/searchTracks", {
            username : that.$data.username,
            query: this.$data.searchQuery
        }).then((data) => {
            console.log("Track searched");
            var that = this;
            this.$data.songInfo = [];
            var songs = data.data.results.body.tracks;
            console.log(songs);
            var track, artist;

            for(var i = 0; i < songs.items.length; i++) {
              track = songs.items[i];

              for(var j = 0; j < track.artists.length; j++){
                artist = songs.items[i].artists[j];

                this.$data.songInfo.push({
                  name : track.name,
                  artist: artist.name,
                  id: track.id,
                  uri: track.uri,
                  groupName: Cookies.get('groupName')
                });
              }
            }
        }).catch((error) => {console.log(error);});
      },

      returnResults: function(){

      }
    }
  }
</script>
<style>
  #searchBar{
    width: 50%;
    height: 75px;
    font-size: 42px;
    position: absolute;
    left: 25%;
    display: block;
    top: 15px;
    z-index: 1;
  }

  #songs{
    position: absolute;
    top: 100px;
    width: 45%;
  }
  h2{
    font-size: 24px;
    font-family: "cabin";
    color: var(--highlight);
    margin-bottom: 12px;
  }
  h3{
    font-size: 12px;
    font-family: "cabin";
    color: var(--baseColor);
    text-align: center;
    margin-top: 12px;
  }
  ol li{
    list-style: none;
  }

  #resultsModal{
    margin-top: 100px;
    align-items: center;
    justify-content: center;
    display: flex;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding-right: 15px;
  }

  #searchResults{
    align-items: center;
    justify-content: center;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 1;
    position: fixed;
    left: 0px;
    top: 0px;
  }

  .songContainer{
    align-self: center;
    background-color: var(--offwhite);
    margin: 1px;
    border: solid;
    border-width: 0 1px;
    border: 2px;
    border-radius: 15px;
    border-color: var(--baseColor);
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }

  button{
    width: 100px;
    height: 100px;
  }

  button:hover{
    background-color: var(--bg);
    color: var(--offwhite);
    cursor: pointer;
  }
  .songText{
    width: 40%;
  }


</style>
