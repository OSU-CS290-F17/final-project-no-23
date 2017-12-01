//control user API endpoints

module.exports = function(host) {
    var Router = require("./../utilities/router.js");
    var User = require("../types/user.js");
    var r = require("rethinkdbdash")({db : "groupify"});
    var Spotify = require("./../utilities/spotify.js");
    var spotify = new Spotify(null, host + "/auth");

    var that = this;

    that.router = new Router();

    that.router.register("new", (req, res) => {
        var tmp = new User();
        //check if user matches or if allready exists
        r.table("users").insert({
            username : req.body.username,
            password : req.body.password
        }).run().then((data) => {
            res.status(200);
            res.send({success : true});
            res.end();
        });
    });

    that.router.register("getAuthURL", (req, res) => {  //requires username
        var url = spotify.getUserAuthURL(req.body.username);

        res.status(200);
        res.send(JSON.stringify({authURL : url}));
        res.end();
    })

    that.router.register("sendAuthCode", (req, res) => {    //requires username and code
        let status = spotify.getUserAuthToken(req.body.username, req.body.code);
        status.then((data) => {
            spotify.test(); //test spotify api authentication by playing song

            console.log("data: " + data);

            //update user data with auth and refresh tokens
            r.table("users").filter({username : req.body.username}).update(data.tokens)
                .run().then((data) => {});

            res.status(200);
            res.send(JSON.stringify(data.response));
            res.end();
        }).catch((error) => {
            res.status(400);
            res.send(JSON.stringify(error));
            res.end();
        });

    });

    that.router.register("makeGroup", (req, res) => {   //requires groupname and username
        r.table("groups").insert({
            groupname : req.body.groupname,
            creator : req.body.username
        }).run().then((data) => {
            res.status(200);
            res.send(JSON.stringify(data));
            res.end();
        });
    });

    that.router.register("joinGroup", (req, res) => {   //requires groupname and username
        r.table("users").filter({username : req.body.username}).update({
            currentGroup : req.body.groupname
        }).run().then((data) => {
            res.status(200);
            res.send(JSON.stringify(data));
            res.end();
        });
    });
}
