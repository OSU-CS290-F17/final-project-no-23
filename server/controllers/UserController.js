//control user API endpoints

module.exports = function(host) {
    var Router = require("./../utilities/router.js");
    var User = require("../types/user.js");
    var r = require("rethinkdbdash")({db : "groupify"});
    var Spotify = require("./../utilities/spotify.js");
    var spotify = new Spotify(null, host + "/auth");
    var Response = require("./../utilities/response.js");

    var that = this;

    that.router = new Router();

    that.router.register("new", (req, res) => {
        var tmp = new User();
        r.table("users").filter({username : req.body.username}).run().then((data) => {
            if(data.length) {
                if(data[0].password == req.body.password) {
                    res.status(200);
                    res.send(JSON.stringify({success : true, message : "Successfully logged in, welcome back."}));
                    res.end();
                } else {
                    res.status(409);
                    res.send(JSON.stringify({success : false, message : "Password does not match."}))
                }
            } else {
                r.table("users").insert({
                    username : req.body.username,
                    password : req.body.password
                }).run().then((data) => {
                    res.status(200);
                    res.send(JSON.stringify({success : true, message : "Successfully created account, welcome."}));
                    res.end();
                });
            }

        });

    });

    that.router.register("getAuthURL", (req, res) => {  //requires username
        var url = spotify.getUserAuthURL(req.body.username);
        Response.send(200, {authURL : url}, res);
    })

    that.router.register("sendAuthCode", (req, res) => {    //requires username and code
        let status = spotify.getUserAuthToken(req.body.username, req.body.code);
        status.then((data) => {
            spotify.test(); //test spotify api authentication by playing song

            //update user data with auth and refresh tokens
            r.table("users").filter({username : req.body.username}).update(data.tokens)
                .run().then((data) => {});

            Response.send(200, data.response, res);
        }).catch((error) => {
            Response.send(200, error, res);
        });

    });

    that.router.register("makeGroup", (req, res) => {   //requires groupname and username
        r.table("groups").filter({groupname : req.body.groupname}).run().then((data) => {
            console.log("DATA" + JSON.stringify(data));

            if(data.length) {
                Response.send(409, {success : false, message : "Cannot create group - allready exists."}, res);
                return;
            }
            r.table("groups").insert({
                groupname : req.body.groupname,
                creator : req.body.username
            }).run().then((data) => {
                Response.send(200, data, res);
            });
        });

    });

    that.router.register("joinGroup", (req, res) => {   //requires groupname and username
        r.table("groups").filter({groupname : req.body.groupname}).run().then((data) => {
            if(!data.length) {
                Response.send(409, {success : false, message : "Cannot join group - does not exist."}, error);
                return;
            }

            r.table("users").filter({username : req.body.username}).update({
                currentGroup : req.body.groupname
            }).run().then((data) => {
                Response.send(200, {success : true, message : "Joined group successfully"}, error);
            });
        });

    });
}
