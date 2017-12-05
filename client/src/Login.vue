<template>
  <div>
    <button id ="theme">Toggle Theme</button>
    <login-popup v-if='loginOpen' v-on:login-success="loginOpen=false;" v-bind:loginType="isCreating" v-bind:isOpen="loginOpen"></login-popup>
    <button v-if="typeSelect" class = 'darkButton' id = "joinButton" v-on:click="login(false)">Join</button><br>
    <button v-if="typeSelect" class = 'darkButton' id = "createButton" v-on:click="login(true)">Create</button><br>
    <div v-if="!typeSelect && !loginOpen" class = 'modalContent'>
      <div class = 'inputcontainer'>
        <h2>Sco Beavs</h2>
        <input v-model="groupName" placeholder="Enter Group Name"><br>
        <input v-if='isCreating' v-model="groupCap" placeholder="Enter Member Cap"><br>
        <button id="groupButton" class = 'smallButton' v-on:click="isCreating ? makeGroup() : joinGroup()">{{isCreating ? "Create" : "Join"}} Group</button>
      </div>
    </div>
  </div>
</template>

<script>
  import loginPopup from "./components/loginPopup.vue";
  var Globals = require("./Globals.json")
  const axios = require('axios');


  export default{
    data(){
        return{
          message: "Works",
          hasAPIAuth: false,    //true if the user has successfully authenticated with spotify
          typeSelect: true,     //false once the user has selected to create or join a group
          isCreating: null,      //whether the user is creating or joining a group
          loginOpen: false,
          groupName: "",
          username: "",
          groupCap : ''
      }
    },
    created: function() {
        var that = this;

        that.$data.username = Cookies.get("username");

        function getParameterByName(name, url) {    //magic regex copy pasterino to parse querystring
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        if (window.location.pathname == "/auth") {
            that.login(true);
            that.$data.loginOpen = false;

            var req = {
                code : getParameterByName('code'),
                username : that.$data.username
            }

            axios.post(Globals.apiHost + "/user/sendAuthCode", req).then((response) => {
                if (!response.data.success) {
                    that.$data.hasAPIAuth = false;
                    that.$data.loginOpen = true;
                    window.location.replace("app");
                    return;
                } else {
                    that.$data.hasAPIAuth = true;
                    window.history.pushState('group', 'Title', '/group');
                }
            }).catch((error) => {console.log(error);});
        } else if (window.location.pathname == "/group") {
            that.login(true);
            that.$data.loginOpen = false;
        }

    },

    components: {
      loginPopup
    },

    methods: {
        login : function(type){
            var that = this;
            console.log(type);
            that.$data.isCreating = type;
            that.$data.loginOpen = true;
            that.$data.typeSelect = false;
        },
        loginData : function(data) {
            var that = this;
            that.$data.loginOpen = false;
            that.$data.username = data.username;
        },
        makeGroup : function() {
            var that = this;
            console.log(that.$data.isCreating);
            if(that.$data.isCreating && that.$data.hasAPIAuth) {    //if we are creating a group and the user has been properly authenticated
                axios.post(Globals.apiHost + "/user/makeGroup", {
                    username : that.$data.username,
                    groupname : that.$data.groupName
                }).then((response) => {  //request to endpoint that will add group to DB
                    console.log("Created Group");
                    that.joinGroup();
                }).catch((error) => {console.log(error);});
            }
        },
        joinGroup : function() {
            var that = this;
            axios.post(Globals.apiHost + "/user/joinGroup", {
                username : that.$data.username,
                groupname : that.$data.groupName
            }).then((response) => { //actually join group
                console.log("Joined Group");
                //need to store cookie with username/auth here
                Cookies.set("groupname", that.$data.groupname)
                window.location.replace("/app"); //redirect user to app
            }).catch((error) => {console.log(error);});
        }
    }

  }
</script>
