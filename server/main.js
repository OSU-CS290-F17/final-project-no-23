const express = require('express');
const path = require('path');
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

// Connection URL
var databaseURL = "mongodb://localhost:27017/test"; //port and database name are passed in
// Use connect method to connect to the Server
MongoClient.connect(databaseURL, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server at: " + databaseURL);

  db.close();
});

const app = express();

//const queue = new QueueController();
//const search = new SearchController();



var registerAPIFunction = function(name, func) {
    var path = name.split("/"); //split path into all components
    var p = apiRegister;
    for(var i = 0; i < path.length-1; i++) {
        if(path[i] in p) {
            p = p[path[i]];
        } else {
            p[path[i]] = {};
            p = p[path[i]];
        }
    }
    if(path[i] in p) {return;} //function allready exists
    else {
        p[path[i]] = func;     //add API endpoint
    }
}

var generateMiddleware = function() {
    var middleware = function(req, res, next) {
        if(p in apiRegister) {

        }
    }
    var iter = function(json) {
        for (var p in json) {
            if (json.hasOwnProperty(p)) {

            }
        }
    }

}


var apiRegister = {};


app.post('/api/queue/:name', (req, res) => {    //could pass routing function from different managers into thsi
    if(apiRegister["queue"][req.params.name])  {
        apiRegister["queue"][req.params.name](req, res);
    }
});
app.post('/api/search/:name', (req, res) => {
    if(apiRegister["search"][req.params.name])  {
        apiRegister["search"][req.params.name](req, res);
    }
});

app.post('/api/:name', (req, res) => {
    if(apiRegister[req.params.name])  {
        apiRegister[req.params.name](req, res);
    }
});


//app.get('/', (req, res) => res.sendFile(path.join(__dirname, "../client/index.html")));



app.listen(3000, () => console.log("Listening on port 3000!"))
