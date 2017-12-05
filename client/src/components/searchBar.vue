<template>
  <div id='searchResults'>
    <input v-model='searchQuery' placeholder='Song Name' @change = 'search()'>
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
</template>
//'/queue/addSong(groupName, data)'
<script>
  const axios = require('axios');

  var Globals = require("../Globals.json")

  export default{
    data(){
      return {
        searchQuery: '',
        songInfo: [],
        username: "",
        tracks : {
          "href" : "https://api.spotify.com/v1/search?query=threatz&type=track&market=US&offset=0&limit=2",
          "items" : [ {
            "album" : {
              "album_type" : "single",
              "artists" : [ {
                "external_urls" : {
                  "spotify" : "https://open.spotify.com/artist/6fxyWrfmjcbj5d12gXeiNV"
                },
                "href" : "https://api.spotify.com/v1/artists/6fxyWrfmjcbj5d12gXeiNV",
                "id" : "6fxyWrfmjcbj5d12gXeiNV",
                "name" : "Denzel Curry",
                "type" : "artist",
                "uri" : "spotify:artist:6fxyWrfmjcbj5d12gXeiNV"
              } ],
              "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
              "external_urls" : {
                "spotify" : "https://open.spotify.com/album/5D37EAY4aXsW2j6lEGc3zL"
              },
              "href" : "https://api.spotify.com/v1/albums/5D37EAY4aXsW2j6lEGc3zL",
              "id" : "5D37EAY4aXsW2j6lEGc3zL",
              "images" : [ {
                "height" : 640,
                "url" : "https://i.scdn.co/image/4777ba114974b3a195b9876c2566f2f2bfb7e881",
                "width" : 640
              }, {
                "height" : 300,
                "url" : "https://i.scdn.co/image/a485374d0e711e8e3fe04c58eac0b243fc849fa1",
                "width" : 300
              }, {
                "height" : 64,
                "url" : "https://i.scdn.co/image/5efe415b9326b398af0560caf23d8fa571e5c1df",
                "width" : 64
              } ],
              "name" : "Threatz",
              "type" : "album",
              "uri" : "spotify:album:5D37EAY4aXsW2j6lEGc3zL"
            },
            "artists" : [ {
              "external_urls" : {
                "spotify" : "https://open.spotify.com/artist/6fxyWrfmjcbj5d12gXeiNV"
              },
              "href" : "https://api.spotify.com/v1/artists/6fxyWrfmjcbj5d12gXeiNV",
              "id" : "6fxyWrfmjcbj5d12gXeiNV",
              "name" : "Denzel Curry",
              "type" : "artist",
              "uri" : "spotify:artist:6fxyWrfmjcbj5d12gXeiNV"
            }, {
              "external_urls" : {
                "spotify" : "https://open.spotify.com/artist/44mzV1KxYq8i2S4LHZxQAp"
              },
              "href" : "https://api.spotify.com/v1/artists/44mzV1KxYq8i2S4LHZxQAp",
              "id" : "44mzV1KxYq8i2S4LHZxQAp",
              "name" : "Yung Simmie",
              "type" : "artist",
              "uri" : "spotify:artist:44mzV1KxYq8i2S4LHZxQAp"
            }, {
              "external_urls" : {
                "spotify" : "https://open.spotify.com/artist/7KduBCxhfAMiQlhMOHL3IZ"
              },
              "href" : "https://api.spotify.com/v1/artists/7KduBCxhfAMiQlhMOHL3IZ",
              "id" : "7KduBCxhfAMiQlhMOHL3IZ",
              "name" : "Robb Bank$",
              "type" : "artist",
              "uri" : "spotify:artist:7KduBCxhfAMiQlhMOHL3IZ"
            } ],
            "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
            "disc_number" : 1,
            "duration_ms" : 190000,
            "explicit" : true,
            "external_ids" : {
              "isrc" : "TCABQ1316598"
            },
            "external_urls" : {
              "spotify" : "https://open.spotify.com/track/4SMx7LkOPBlTC5UfJl3zSe"
            },
            "href" : "https://api.spotify.com/v1/tracks/4SMx7LkOPBlTC5UfJl3zSe",
            "id" : "4SMx7LkOPBlTC5UfJl3zSe",
            "name" : "Threatz",
            "popularity" : 48,
            "preview_url" : null,
            "track_number" : 1,
            "type" : "track",
            "uri" : "spotify:track:4SMx7LkOPBlTC5UfJl3zSe"
          }, {
            "album" : {
              "album_type" : "album",
              "artists" : [ {
                "external_urls" : {
                  "spotify" : "https://open.spotify.com/artist/4XqfpACObRB5AsBcUYjL8X"
                },
                "href" : "https://api.spotify.com/v1/artists/4XqfpACObRB5AsBcUYjL8X",
                "id" : "4XqfpACObRB5AsBcUYjL8X",
                "name" : "MC Eiht",
                "type" : "artist",
                "uri" : "spotify:artist:4XqfpACObRB5AsBcUYjL8X"
              } ],
              "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
              "external_urls" : {
                "spotify" : "https://open.spotify.com/album/4wcDwoz8FiMTMQDNHsnA8R"
              },
              "href" : "https://api.spotify.com/v1/albums/4wcDwoz8FiMTMQDNHsnA8R",
              "id" : "4wcDwoz8FiMTMQDNHsnA8R",
              "images" : [ {
                "height" : 640,
                "url" : "https://i.scdn.co/image/d5cc7971c11d18bb2600c9d6325d190c151bd2fb",
                "width" : 640
              }, {
                "height" : 300,
                "url" : "https://i.scdn.co/image/90678f3903eb6b10c535566049849d021d7a92af",
                "width" : 300
              }, {
                "height" : 64,
                "url" : "https://i.scdn.co/image/5ab081876cae551258d435cb2f29ff40fa2c1d8c",
                "width" : 64
              } ],
              "name" : "Death Threatz",
              "type" : "album",
              "uri" : "spotify:album:4wcDwoz8FiMTMQDNHsnA8R"
            },
            "artists" : [ {
              "external_urls" : {
                "spotify" : "https://open.spotify.com/artist/4XqfpACObRB5AsBcUYjL8X"
              },
              "href" : "https://api.spotify.com/v1/artists/4XqfpACObRB5AsBcUYjL8X",
              "id" : "4XqfpACObRB5AsBcUYjL8X",
              "name" : "MC Eiht",
              "type" : "artist",
              "uri" : "spotify:artist:4XqfpACObRB5AsBcUYjL8X"
            } ],
            "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
            "disc_number" : 1,
            "duration_ms" : 313466,
            "explicit" : false,
            "external_ids" : {
              "isrc" : "USSM19502406"
            },
            "external_urls" : {
              "spotify" : "https://open.spotify.com/track/5s7QQ6PxeMyz3wggjiYde2"
            },
            "href" : "https://api.spotify.com/v1/tracks/5s7QQ6PxeMyz3wggjiYde2",
            "id" : "5s7QQ6PxeMyz3wggjiYde2",
            "name" : "Ain't Nuthin' To It",
            "popularity" : 20,
            "preview_url" : "https://p.scdn.co/mp3-preview/a433aac6e7147e3ddc770879ce28e583c583e153?cid=8897482848704f2a8f8d7c79726a70d4",
            "track_number" : 2,
            "type" : "track",
            "uri" : "spotify:track:5s7QQ6PxeMyz3wggjiYde2"
          } ],
          "limit" : 2,
          "next" : "https://api.spotify.com/v1/search?query=threatz&type=track&market=US&offset=2&limit=2",
          "offset" : 0,
          "previous" : null,
          "total" : 85
      }
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
        axios.post(Globals.apiHost + "/search/searchTracks", {
            username : that.$data.username,
            query: this.$data.searchQuery
        }).then((data) => {
            console.log("Track searched");
            var that = this;
            var songs = data.results;
            var track, artist;

            for(var i = 0; i < song.items.length; i++) {
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
