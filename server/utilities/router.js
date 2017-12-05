/*
    This modules handles
*/

var callbook = {};             //json object for storing name/function key/value pairs

module.exports = Router;

function Router() {
    var that = this;
}

Router.prototype.router = (req, res) => {   //function to interpret name and call matching function
    var that = this;
    
    if(callbook[req.params.name]) {
        callbook[req.params.name](req, res);
    } else {
        res.status(404).send("Endpoint not found.");    //end with 404 and send message
    }
}

Router.prototype.register = (name, f) => {  //utility function for adding new api endpoints
    var that = this;
    callbook[name] = f;
}
