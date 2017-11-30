// Spotify endpoint utilities using spotify-web-api-node
var SpotifyWebApi = require("spotify-web-api-node");


module.exports = Spotify;


var redirectURI = "";
var connection = "";
var clientId = "2bb1f1293e834389a590ae285422f440";
var clientSecret = "93419a4d3ea44496a3d630be53674a81";

var credentials = null;

var sapi = null;

function Spotify(conn, redirect) {
    var that = this;

    redirectURI = redirect;
    connection = conn;

    credentials = {
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectURI
    }

    sapi = new SpotifyWebApi(credentials);
}

Spotify.prototype.getUserAuthURL = function(username) {
    var scopes =    ['user-modify-playback-state', 'user-read-playback-state'],
                    state = 'spotify-auth-' + username;
    // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.

    // Create the authorization URL
    var authorizeURL = sapi.createAuthorizeURL(scopes, state);

    //store authorizeURL under user in the database
    return authorizeURL;
}

Spotify.prototype.getUserAuthToken = function(username, queryCode) {

    let acg = sapi.authorizationCodeGrant(queryCode)
    return new Promise((resolve, reject) => {
        acg.then(function(data) {

            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);

            // Set the access token on the API object to use it in later calls
            sapi.setAccessToken(data.body['access_token']);
            sapi.setRefreshToken(data.body['refresh_token']);

            //test authentication by playing songs
            sapi.pause().then(data => {}).catch(err => {console.log(err)});


            //return json data for response
            resolve({success : true}, sapi);
        }, function(err) {
            console.log(err);
            reject({success: false, message: "error retrieving auth token"});
        });
    });
}

Spotify.prototype.test = function(username) {
    sapi.play({uri : "spotify:track:4uLU6hMCjMI75M1A2tKUQC"});
}
