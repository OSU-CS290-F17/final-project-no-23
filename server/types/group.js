//defining group data object

module.exports = function() {
    var that = this;

    that.ID = null;         //unique identifier
    that.users = [];        //list of currently joined users
    that.apiType = null;    //what music app is being used
    that.apiAuthUser = null;//userID of authorized user

    that.queue = [];        //list of songs in queue
}
