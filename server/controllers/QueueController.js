/* specifications

Allows update of queue list for each USER
Allows for different operations to be performed (upvoting etc) on songs in QUEUE
    checked against user permissions
Notifies endpoint API to play songs
Adds new songs to queue from song search list

*/

module.exports = function() {   //exporting queue controller object
    var Router = require("./../utilities/router.js");
    var Response = require("./../utilities/response.js");

    var that = this;

    that.router = new Router();

    that.router.register("addSong", (req, res) => {
        r.table("users").filter({username : req.body.username}).run().then((data) => {
            sapi.setAccessToken(data[0].accessToken);
            sapi.setRefreshToken(data[0].refreshToken);
        });
    });
}
