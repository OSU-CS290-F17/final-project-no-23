<template>
  <div id='searchResults'>
    <input v-model='searchQuery' placeholder='Song Name' @change = 'search()'>
    <div id = 'resultsModal'>
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
        axios.post(Globals.apiHost + 'queue/addSong', {
          song: song
        }).then((data)=> {
            console.log(data);
        });
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
  h2{
    font-size: 32px;
    font-family: "cabin";
    color: var(--highlight);
    margin-bottom: 12px;
  }
  h3{
    font-size: 20px;
    font-family: "cabin";
    color: var(--baseColor);
    text-align: center;
    margin-top: 12px;
  }
  ol li{
    list-style: none;
  }
  .songContainer{
    background-color: var(--offwhite);
    margin: 1px;
    border: solid;
    border-width: 0 1px;
    border: 2px;
    border-radius: 15px;
    border-color: var(--baseColor);
    width: 50%;
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
  .songText{
    width: 40%;
  }


</style>
