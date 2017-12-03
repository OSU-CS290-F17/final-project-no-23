/*
    This module wraps the responses
*/

module.exports = {
    send : function(code, message, response) {
        response.status(code);
        response.send(JSON.stringify(message));
        response.end();
    }
}
