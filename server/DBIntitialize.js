//initializing/resetting database

var r = require("rethinkdb");
var rethink = require("./utilities/rethink.js");
var connection = null;

r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;

    r.dbDrop("test").run(connection, (err, res) => {    //drop any existing database that would conflict
        if(err) return rethink.handleError(err);
        console.log(res);
    });

    r.dbDrop("groupify").run(connection, (err, res) => {    //drop any existing database that would conflict
        if(err) return rethink.handleError(err);
        console.log(res);
    });

    r.dbCreate("groupify").run(connection, (err, res) => {  //create new groupify database
        if(err) return rethink.handleError(err);
        console.log(res);
    });

    r.db("groupify").tableCreate("users").run(connection, (err, res) => {   //create users table
        if(err) return rethink.handleError(err);
        console.log(res);
    });

    r.db("groupify").tableCreate("groups").run(connection, (err, res) => {  //create groups table
        if(err) return rethink.handleError(err);
        console.log(res);
    });
});
