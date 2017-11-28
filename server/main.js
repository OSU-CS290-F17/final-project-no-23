const express = require('express');
const path = require('path');

const app = express();

const queue = new QueueController();
const search = new SearchController();

var apiRegister = {};



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
    app.post()
}

app.post('/api', (req, res, next) => {
    console.log("Recieved api request!");
    next();
});

app.post('/api/queue', queue.router, (req, res, next) => {

}
app.post('/api/search', search.router), (req, res, next) => {

}

//app.get('/', (req, res) => res.sendFile(path.join(__dirname, "../client/index.html")));



app.listen(3000, () => console.log("Listening on port 3000!"))
