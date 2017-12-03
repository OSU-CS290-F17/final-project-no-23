/*

Allows for users to perform searches

Displays songs, artists, albums (playlists??)

Expands results in each category on click

*/


module.exports = SearchController;

function SearchController() {   //exporting queue controller object
    var Router = require("./../utilities/router.js");
    var Response = require("./../utilities/response.js")

    var that = this;

    that.router = new Router();

    that.router.register("searchTracks", (req, res) => {
        r.table("users").filter({username : req.body.username}).run().then((data) => {
            sapi.setAccessToken(data[0].accessToken);
            sapi.setRefreshToken(data[0].refreshToken);
            sapi.search({q : req.body.query, type : "track", limit : "15"}).then(results => {
                Response.send(200, results, res);
            }).catch(err => {console.log(err)});
        });
    }
}
