/*

Allows for users to perform searches

Displays songs, artists, albums (playlists??)

Expands results in each category on click

*/


exports.router = (req, res, next) => {
    console.log("Recieved Search Request");
    res.json({success : true});
}
