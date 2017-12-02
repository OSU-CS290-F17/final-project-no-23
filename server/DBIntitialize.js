//initializing/resetting database

var r = require("rethinkdbdash");
require("rethinkdb-init")(r);

r.init({
    host: 'localhost',
    port: 28015,
    db: 'groupify'
  }, [
    {
      name: 'users',
      indexes: ['username']
    },
    {
        name: "groups",
        indexes: ['groupname']
    }
  ]
)
.then(function (conn) {
  console.log("Database Initialized...");
});
