

module.exports.handleError = function(err) {
    console.log("Error manipulating rethink database....");
    console.log("=== " + err);
}

module.exports.getConnection = function(config) {
    var r = require("rethinkdb");
    r.connect( {host: config.host, port: config.port, db: config.db}, function(err, conn) {
        if (err) throw err;
        return conn;
    });
}
