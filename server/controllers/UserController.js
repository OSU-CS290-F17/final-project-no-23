//control user API endpoints
var spotify = require("../utilities/spotify.js")

module.exports = function(connection) {
    var router = require("./router.js");
    var User = require("../types/user.js");
    var r = require("rethinkdb");

    var that = this;

    that.router = router();

    that.router.register("new", (req, res) => {
        var tmp = new User();
        r.db(""
    });

    that.router.register("getAuthURL", (req, res) => {
        var url = spotify.getUserAuthURL(req.data.username);
        res.status(200).send(JSON.stringify({authURL : url}));
    })

    that.router.register("sendAuthCode", (req, res) => {
        var tokenStatus = spotify.getuserAuthToken(req.data.username, req.data.queryCode);
    })
}
