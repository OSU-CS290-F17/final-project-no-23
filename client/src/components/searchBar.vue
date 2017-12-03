<template>
  <div id='searchResults'>
    <input v-model='searchQuery' placeholder='Song Name'>
    <ol id ='songs'>
      <li v-for="song in songInfo">
        <div>
          <h2>{{song.name}}</h2>
          <h2>{{song.artist}}</h2>
          <button id ='addSong' class = 'smallButton'></button>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
  const axios = require('axios');


  export default{
    data(){
      return {
        searchQuery = '',
        songInfo = {},
        username = ""
      }
    },
    created : function(){
      this.$data.username = Cookies.get('username');
    },
    methods:{
      search = function(){
        axios.post(Globals.apiHost + "/search/searchtracks", {
            username : that.$data.username,
            query: searchQuery
        }).then((data) => {  //request to endpoint that will add group to DB
            console.log("Track searched");
            for (track in data.tracks.items) {
              for(artist in track.artists){
                songInfo.push({
                  name : track.name,
                  artist: artists.name,
                  id: artists.id
                });
              }
            }
        }).catch((error) => {console.log(error);});
      }

      returnResults = function(){

      }
    }
  }
</script>
