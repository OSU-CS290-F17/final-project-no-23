/* specifications

Allows update of queue list for each USER
Allows for different operations to be performed (upvoting etc) on songs in QUEUE
    checked against user permissions
Notifies endpoint API to play songs
Adds new songs to queue from song search list

*/

//local includes
var Router = require("./../utilities/router.js");
var Response = require("./../utilities/response.js");
var spotify = new (require("./../utilities/spotify.js"))();

//initializing database connection
var r = require("rethinkdbdash")({db : "groupify"});

module.exports = QueueController;

function QueueController() {   //exporting queue controller object



    var that = this;

    that.router = new Router();

    setInterval(that.updateSpotify, 20000);  //update spotify queue every 5 seconds

    that.router.register("addSong", (req, res) => {
        console.log("adding song" + req.body.queue);
        r.table('users').filter({username : req.body.username}).run().then(data => {
            r.table("groups").filter({groupname : data[0].currentGroup}).update({queue : req.body.queue}).run().then((data) => {
                Response.send(200, {success : true, message : "Successfully added song."}, res);
            }).catch(err => {
                Response.send(200, {success : false, message : "Failed to add song to queue."}, res);
            });
        })

    });

    that.router.register("getQueue", (req, res) => {
        r.table("groups").filter({groupname: req.body.groupname})("queue").run().then(data => {
            Response.send(200, {success : true, queue : data}, res);
        }).catch((err) => {
            Response.send(400, {success : false, message : "Failed to retrieve queue."}, res);
        });
    })

    that.router.register("stopQueue", (req, res) => {

    });

    that.router.register("vote", (req, res) => {
        console.log("VOTING");
        r.table('users').filter({username : req.body.username}).run().then(data => {
            r.table("groups").filter({groupname : data[0].currentGroup})("queue").run().then((queue) => {
                for(var i = 0; i < queue.length; i++) { //find and update right song
                    if(queue[i].uri == req.body.uri)  {
                        queue[i].votes += Number(req.body.vote);
                        break;
                    }
                }
                r.table("groups").filter({groupname : data[0].currentGroup}).update({queue : queue}).run().then((update) => {
                    Response.send(200, {success : true, message : "Successfully voted."}, res);
                }).catch(err => {
                    Response.send(200, {success : false, message : "Failed to vote."}, res);
                });
            }).catch(err => {
                console.log("Error getting queue to vote.");
            });
        })
    });
}

QueueController.prototype.getAuthUserTokens = function(username) {
    r.table("users").filter({username : username}).run().then(data => {
        return(data[0]);
    });
}

QueueController.prototype.getGroupAuthUserTokens = function(groupname) {
    r.table("groups").filter({groupname : groupname}).run().then((data) => {

    });
}

QueueController.prototype.updateSpotify = function(){
    var thener = function() {
        console.log("playing song now");
    }
    r.table("groups").run().then(data => {
        for (var i = 0; i < data.length; i++) { //iterate through all groups
            var group = data[i];
            r.table('users').filter({username : group.creator}).run().then((tokens) => {
                if(group.queue.length) {  //if there is a first ssong
                    spotify.play(group.queue[0].uri, tokens[0], thener)
                }
            })

        }
    });
}
