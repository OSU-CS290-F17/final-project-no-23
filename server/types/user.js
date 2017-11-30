//user data type


module.exports = function() {
    var that = this;

    that.name = null;        //unique name
    that.hasAPIAuth = false; //whether or not the user has authenticated with API
    that.apiType = 0;        //music api type they use CURRENT OPTIONS(0=spotify) future.... (1=apple music, 2=google music, 3=amazon music)
    that.APIAuthKey = null;  //authorization key object for api of choice
    that.group = null;       //currently joined group


}
