const express = require('express');
const path = require('path');
const url = require('url');
const http = require('http');
const websocket = require('ws');
const bodyparser = require('body-parser');


//loading database info
var database = {
    host : "localhost",
    port : 28015,
    db : "groupify"
}
var r = require("rethinkdbdash")(database);

var clientHost = "http://localhost:8080";

//importing control modules for API endpoints
var QueueController = require("./controllers/QueueController.js");
var SearchController = require("./controllers/SearchController.js");
var UserController = require("./controllers/UserController.js");

var queue = new QueueController();      //endpoint controller for queue functionality
var search = new SearchController();    //endpoint controller for search functionality
var user = new UserController(clientHost);        //endpoint controller for user functionality


const app = express();  //defining express app instance to route calls

var Router = require("./utilities/router"); var router = new Router();    //router for some /api/:name endpoints


app.use(bodyparser.json()); //apply middleware to parse request body data
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    next();
});

//defining api entrance points
app.post('/api/queue/:name', queue.router.router);

app.post('/api/search/:name', search.router.router);

app.post('/api/user/:name', user.router.router);

app.post('/api/:name', router.router);



/*
const wss = new websocket.Server({server});

wss.on('connection', function(ws) {
    CLIENTS.push(ws);
    ws.on('message', function(message) {
        console.log('received: %s', message);
        sendAll(message);
    });
    ws.send("NEW USER JOINED");
});
*/
app.listen(3000, () => console.log("Listening on port 3000!"))
