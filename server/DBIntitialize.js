//initializing/resetting database

var r = require("rethinkdbdash")();
var rethink = require("./utilities/rethink.js");
var connection = null;


    //drop any existing database that would conflict
    r.dbDrop("test").run().then(err) => {
        console.log(err);
    });

    //drop any existing database that would conflict
    r.dbDrop("groupify").run().then(err) => {
        console.log(err);
    });

    //create new groupify database
    r.dbCreate("groupify").run().then(err) => {
        console.log(err);
    });

    //create user data table
    r.db("groupify").tableCreate("users").run().then(err) => {
        console.log(err);
    });

    //create group data table
    r.db("groupify").tableCreate("groups").run().then(err) => {
        console.log(err);
    });
