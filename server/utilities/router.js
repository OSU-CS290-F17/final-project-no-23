/*
    This modules handles
*/

module.exports = function() {
    var that = this;

    that.callbook = {};             //json object for storing name/function key/value pairs
    that.router = (req, res) => {   //function to interpret name and call matching function
        if(callbook[req.params.name]) {
            callbook[req.params.name](req, res);
        } else {
            res.status(404).send("Endpoint not found.");    //end with 404 and send message
        }
    }

    that.register = (name, f) => {  //utility function for adding new api endpoints
        that.callbook[name] = f;
    }
}
