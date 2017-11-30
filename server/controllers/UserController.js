//control user API endpoints

module.exports = function(connection) {
    var Router = require("./../utilities/router.js");
    var User = require("../types/user.js");
    var r = require("rethinkdb");
    var Spotify = require("./../utilities/spotify.js");
    var spotify = new Spotify(null, "http://localhost:8080");
    var that = this;

    that.router = new Router();

    that.router.register("new", (req, res) => {
        var tmp = new User();
    });

    that.router.register("getAuthURL", (req, res) => {
        var url = spotify.getUserAuthURL(req.query.username);
        console.log(url);
        res.status(200).send(JSON.stringify({authURL : url}));
        res.end();
    })

    that.router.register("sendAuthCode", (req, res) => {
        var tokenStatus = spotify.getuserAuthToken(req.query.username, req.query.queryCode);
        if (tokenStatus.success) res.status(200);
        else res.status(400);

        res.send(JSON.stringify(tokenStatus));
    })
}
