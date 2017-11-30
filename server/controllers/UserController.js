//control user API endpoints
var spotify = require("../utilities/spotify.js")

module.exports = function(connection) {
    var Router = require("./../utilities/router.js");
    var User = require("../types/user.js");
    var r = require("rethinkdb");
    var spotify = require("./../utilities/spotify.js")(null, "localhost:8080");

    var that = this;

    that.router = new Router();

    that.router.register("new", (req, res) => {
        var tmp = new User();
    });

    that.router.register("getAuthURL", (req, res) => {
        var url = spotify.getUserAuthURL(req.data.username);
        res.status(200).send(JSON.stringify({authURL : url}));
    })

    that.router.register("sendAuthCode", (req, res) => {
        var tokenStatus = spotify.getuserAuthToken(req.data.username, req.data.queryCode);
        if (tokenStatus.success) res.status(200);
        else res.status(400);

        res.send(JSON.stringify(tokenStatus));
    })
}
