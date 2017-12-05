// Spotify endpoint utilities using spotify-web-api-node
var SpotifyWebApi = require("spotify-web-api-node");
var r = require("rethinkdbdash")({db : "groupify"});

//defining export as singleton so only single spotify web api instance is used for all API calls
//NEVERMING IT DIDNT WORK
module.exports = Spotify;

var redirectURI = "";
var connection = "";
var clientId = "2bb1f1293e834389a590ae285422f440";  //all of these should be imported from locally stored json but yknow also storing this online is terrible
var clientSecret = "93419a4d3ea44496a3d630be53674a81";
var redirectURI = "http://localhost:8080/auth";

var credentials = null;

var sapi = null;

function Spotify() {
    var that = this;

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

    // Create the authorization URL
    var authorizeURL = sapi.createAuthorizeURL(scopes, state);

    //store authorizeURL under user in the database
    return authorizeURL;
}

Spotify.prototype.getUserAuthToken = function(username, queryCode) {
    var that = this;
    let acg = sapi.authorizationCodeGrant(queryCode);
    return new Promise((resolve, reject) => {
        acg.then(function(data) {

            console.log('Token aquired for user \"' + username + "\"");

            // Set the access token on the API object to use it in later calls

            var token = {accessToken : data.body['access_token'], refreshToken : data.body['refresh_token']};
            that.refreshUserAuthToken(username);   //get longer lasting token
            //return json data for response
            resolve({response : {success : true}, tokens : token});
        }).catch((err) => {
            console.log(err);
            reject({success: false, message: "error retrieving auth token"});
        });
    });
}

Spotify.prototype.refreshUserAuthToken= function(username) {
    // Save the access token so that it's used in future calls
    r.table("users").filter({username : username}).run().then((data) => {
        if(data.length && data[0].accessToken) {
            sapi.setAccessToken(data[0].accessToken);
            sapi.setRefreshToken(data[0].refreshToken);
            sapi.refreshAccessToken().then(() => {
                r.table("users").filter({username : username}).update({accessToken : tokens.body['access_token']}).run().then(res => {
                    //nothing
                })
            });
        }
    });

}

Spotify.prototype.play = function(uri, tokens) {
    sapi.setAccessToken(tokens.accessToken); sapi.setRefreshToken(tokens.refreshToken);
    sapi.play({uris : ["spotify:track:" + uri]}).then(data => {}).catch(err => {console.log(err)});
}

Spotify.prototype.do = function(method, params, tokens, thener, catcher=(err)=>{console.log(err)}) {
    console.log(params);
    console.log(tokens);
    sapi.setAccessToken(tokens.accessToken); sapi.setRefreshToken(tokens.refreshToken);
    sapi[method](params).then(thener).catch(catcher);
}

Spotify.prototype.search = function(params, tokens, thener, catcher=(err)=>{console.log(err)}) {
    console.log(params);
    console.log(tokens);
    sapi.setAccessToken(tokens.accessToken); sapi.setRefreshToken(tokens.refreshToken);
    sapi.search(params.query, params.types, params.limit).then(thener).catch(catcher);
}

Spotify.prototype.test = function(tokens, catcher=(err)=>{console.log(err)}) {
    sapi.setAccessToken(tokens.accessToken); sapi.setRefreshToken(tokens.refreshToken);
    sapi.search("ultimate", ['track'], {limit : 15}).then((data) => {
    }).catch(catcher);
}
