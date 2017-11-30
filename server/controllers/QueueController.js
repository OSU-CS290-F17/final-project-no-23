/* specifications

Allows update of queue list for each USER
Allows for different operations to be performed (upvoting etc) on songs in QUEUE
    checked against user permissions
Notifies endpoint API to play songs
Adds new songs to queue from song search list

*/

module.exports = function() {   //exporting queue controller object
    var router = require("./router.js");

    var that = this;

    that.router = router();

    that.router.register("getQueue", (req, res) => {
        res.json({success : true, currentQueue : [{title: "Twinkle Twinkle Little Star"}, {title : "Mary Had a Little Lamb"}]});
    });
}
