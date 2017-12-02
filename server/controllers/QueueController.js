/* specifications

Allows update of queue list for each USER
Allows for different operations to be performed (upvoting etc) on songs in QUEUE
    checked against user permissions
Notifies endpoint API to play songs
Adds new songs to queue from song search list

*/

module.exports = function() {   //exporting queue controller object
    var Router = require("./../utilities/router.js");

    var that = this;

    that.router = new Router();

    that.router.register("echo", (req, res) => {
        res.status(200);
        res.set({
            "Content-Type"                 : 'application/json',
            "Access-Control-Allow-Origin"  : '*',
            "Access-Control-Allow-Headers" : 'Content-Type', // You cannot use '*'
            "Data-Type"                    : 'json'
        })
        res.send(JSON.stringify({data : req}));
        res.end();
    });
}
