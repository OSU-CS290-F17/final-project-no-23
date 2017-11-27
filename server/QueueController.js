/* specifications

Allows update of queue list for each USER
Allows for different operations to be performed (upvoting etc) on songs in QUEUE
    checked against user permissions
Notifies endpoint API to play songs
Adds new songs to queue from song search list

*/

exports.router = (req, res, next) => {
    console.log("Recieved Queue Request");
    res.json({success : true, currentQueue : [{title: "Twinkle Twinkle Little Star"}, {title : "Mary Had a Little Lamb"}]});
}
