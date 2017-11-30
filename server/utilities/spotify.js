// Spotify endpoint utilities using spotify-web-api-node




module.exports = function(connection, redirect) {
    var that = this;

    that.redirectURI = url;
    that.connection = connection;
    that.clientId = "2bb1f1293e834389a590ae285422f440";
    that.clientSecret = "93419a4d3ea44496a3d630be53674a81";

    var SpotifyWebApi = require("spotify-web-api-node");

    that.getUserAuthURL = function(username) {
        var scopes =    ['user-read-private', 'user-read-email'],
                        state = 'spotify-auth-' + username;

        // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
        var sapi = new SpotifyWebApi({
            redirectUri : that.redirectURI,
            clientId : that.clientId
        });

        // Create the authorization URL
        var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

        //store authorizeURL under user in the database
        console.log(authorizeURL);
    }

    that.getUserAuthToken = function(username, queryCode) {
        var credentials = {
            clientId: that.clientId,
            clientSecret: that.clientSecret,
            redirectUri: that.redirectURI
        }

        var sapi = new SpotifyWebApi(credentials);

        sapi.authorizationCodeGrant(queryCode)
            .then(function(data) {

                console.log('The token expires in ' + data.body['expires_in']);
                console.log('The access token is ' + data.body['access_token']);
                console.log('The refresh token is ' + data.body['refresh_token']);

                // Set the access token on the API object to use it in later calls
                spotifyApi.setAccessToken(data.body['access_token']);
                spotifyApi.setRefreshToken(data.body['refresh_token']);
            }, function(err) {
                console.log('Something went wrong!', err);
            });
    }


}
