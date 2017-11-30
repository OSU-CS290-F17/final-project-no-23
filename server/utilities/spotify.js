// Spotify endpoint utilities using spotify-web-api-node
var SpotifyWebApi = require("spotify-web-api-node");


module.exports = Spotify;


var redirectURI = "";
var connection = "";
var clientId = "2bb1f1293e834389a590ae285422f440";
var clientSecret = "93419a4d3ea44496a3d630be53674a81";

function Spotify(conn, redirect) {
    var that = this;

    redirectURI = redirect;
    connection = conn;
}

Spotify.prototype.getUserAuthURL = function(username) {
    var scopes =    ['user-modify-playback-state', 'user-read-playback-state'],
                    state = 'spotify-auth-' + username;
    console.log("EEEE:  " + redirectURI);
    // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
    var sapi = new SpotifyWebApi({
        redirectUri : redirectURI,
        clientId : clientId
    });

    // Create the authorization URL
    var authorizeURL = sapi.createAuthorizeURL(scopes, state);

    //store authorizeURL under user in the database
    return authorizeURL;
}

Spotify.prototype.getUserAuthToken = function(username, queryCode) {
    var credentials = {
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectURI
    }

    var sapi = new SpotifyWebApi(credentials);

    var acg = sapi.authorizationCodeGrant(queryCode)
    return acg.then(function(data) {

            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);

            // Set the access token on the API object to use it in later calls
            sapi.setAccessToken(data.body['access_token']);
            sapi.setRefreshToken(data.body['refresh_token']);

            //test authentication by playing songs
            sapi.play({uri : "spotify:track:4uLU6hMCjMI75M1A2tKUQC"});


            //return json data for response
            return {success: true};
        }, function(err) {
            return {success: false, message: "error retrieving auth token"};
        });
}

Spotify.prototype.getUserDevices = function(username) {

}
