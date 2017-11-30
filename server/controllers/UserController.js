//control user API endpoints

module.exports = function(connection) {
    var Router = require("./../utilities/router.js");
    var User = require("../types/user.js");
    var r = require("rethinkdb");
    var Spotify = require("./../utilities/spotify.js");
    var spotify = new Spotify(null, "http://localhost:8080/auth");
    var that = this;

    that.router = new Router();

    that.router.register("new", (req, res) => {
        var tmp = new User();
    });

    that.router.register("getAuthURL", (req, res) => {
        var url = spotify.getUserAuthURL(req.body.username);

        res.status(200);
        res.set({
            "Content-Type"                 : 'application/json',
            "Access-Control-Allow-Origin"  : '*',
            "Access-Control-Allow-Headers" : 'Content-Type', // You cannot use '*'
            "Data-Type"                    : 'json'
        })
        res.send(JSON.stringify({authURL : url}));
        res.end();
    })

    that.router.register("sendAuthCode", (req, res) => {
        let status = spotify.getUserAuthToken(req.body.username, req.body.code)
        status.then((status, sapi) => {

            res.status(200);
            res.send(JSON.stringify(status));
            res.end();
        }, (error) => {
            res.status(400);
            res.send(JSON.stringify(error));
            res.end();
        })


    });

    that.router.register("testAuth", (req, res) => {
        spotify.play({uri : "spotify:track:4uLU6hMCjMI75M1A2tKUQC"});
    })
}
