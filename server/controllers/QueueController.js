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

    that.router.register("addSong", (req, res) => {
        r.table("users").filter({username : req.body.username}).run().then((data) => {

        });
    });

    that.router.register("getQueue", (req, res) => {
        r.table("groups").filter({groupname: req.body.groupname}).run().then(data => {

        })
    })

    that.router.register("stopQueue", (req, res) => {

    })
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
    r.table("groups").run().then(data => {
        for (group in data) {
            //update
        }
    });
}
