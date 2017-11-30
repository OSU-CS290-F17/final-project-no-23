

module.exports.handleError = function(err) {
    console.log("Error manipulating rethink database....");
    console.log("=== " + err);
}

module.exports.getConnection = function(hostP, portP, dbP) {
    var r = require("rethinkdb");
    r.connect( {host: hostP, port: portP, db: dbP}, function(err, conn) {
        if (err) throw err;
        return conn;
    });
}
