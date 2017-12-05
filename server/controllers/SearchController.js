/*

Allows for users to perform searches

Displays songs, artists, albums (playlists??)

Expands results in each category on click

*/

//local includes
var Router = require("./../utilities/router.js");
var Response = require("./../utilities/response.js");
var spotify = new (require("./../utilities/spotify.js"))();

//initializing database connection
var r = require("rethinkdbdash")({db : "groupify"});


module.exports = SearchController;

function SearchController() {   //exporting queue controller object
    var that = this;

    that.router = new Router();

    that.router.register("searchTracks", (req, res) => {
        r.table("users").filter({username : req.body.username}).run().then((data) => {
            var data = {q : req.body.query, type : "track", limit : "15"};
            var thener = results => {
                Response.send(200, results, res);
            }
            spotify.do("search", data, data[0], thener);

        });
    });
}
