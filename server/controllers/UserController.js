//control user API endpoints

//local includes
var Router = require("./../utilities/router.js");
var Response = require("./../utilities/response.js");
var spotify = new (require("./../utilities/spotify.js"))();

//initializing database connection
var r = require("rethinkdbdash")({db : "groupify"});

module.exports = UserController;


function UserController(host) {


    var that = this;

    that.router = new Router();

    that.router.register("new", (req, res) => {
        r.table("users").filter({username : req.body.username}).run().then((data) => {
            if(data.length) {
                if(data[0].password == req.body.password) {
                    Response.send(200, {success : true, message : "Successfully logged in, welcome back."}, res);
                } else {
                    Response.send(409, {success : false, message : "Password does not match."}, res);
                }
            } else {
                r.table("users").insert({
                    username : req.body.username,
                    password : req.body.password
                }).run().then((data) => {
                    Response.send(200, {success : true, message : "Successfully created account, welcome."}, res);
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
            Response.send(400, error, res);
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
                creator : req.body.username,
                queue : []
            }).run().then((data) => {
                Response.send(200, data, res);
            });
        });

    });

    that.router.register("joinGroup", (req, res) => {   //requires groupname and username
        r.table("groups").filter({groupname : req.body.groupname}).run().then((data) => {
            if(!data.length) {
                Response.send(409, {success : false, message : "Cannot join group - does not exist."}, res);
                return;
            }

            r.table("users").filter({username : req.body.username}).update({
                currentGroup : req.body.groupname
            }).run().then((data) => {
                Response.send(200, {success : true, message : "Joined group successfully"}, res);
            });
        });

    });

    that.router.register("deleteGroup", (req, res) => {
        r.table("groups").filter({groupname : req.body.groupname}).run().then((data) => {
            if (data[0].creator = req.body.username) {  //shitty auth check for now
                //remove group
                r.table("groups").filter({groupname : req.body.groupname}).delete().run();
                Response.send(200, {success : true, message : "Group successfully deleted"}, res);
            } else {
                Response.send(400, {success : false, message : "Could not delete group. Are you the owner?"});
            }
        })
    });
}
