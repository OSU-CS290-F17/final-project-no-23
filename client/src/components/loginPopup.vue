<template>
  <div v-if="isOpen" id = "loginModal">
    <div class =  "modalContent">
      <div class = "inputcontainer">
        <h2>Login</h2>
        <input v-model = "username" placeholder="Username"><br>
        <input v-model = "password" placeholder="Password">
        <button id = "loginButton" v-on:click = "loginRequest">Log In</button>
        <!-- TODO make cancel button !-->
      </div>
    </div>
  </div>
</template>

<script>
    var Globals = require("./../Globals.json");
    const axios = require("axios");

    export default{
        data(){
            return {
                username: "",
                password: "",
            }
        },
        props : {
            isOpen : Boolean,
            loginType : Boolean //false = join true=create
        },
        methods : {
            loginRequest : function(){
                var that = this;
                console.log(Globals.apiHost);
                var userInfo = {
                    username: that.$data.username,
                    password: that.$data.password,
                };

                axios.post(Globals.apiHost + '/user/new', userInfo).then((response) => {
                    if(response.data.success) {
                        Cookies.set("username", that.$data.username);
                        that.$emit("login-success");
                        if(that.$props.loginType) {
                            axios.post(Globals.apiHost + '/user/getAuthURL', userInfo).then((response) => {
                                window.location.replace(response.data.authURL);
                            }).catch((error) => {
                                console.log(error);
                            })
                        }
                    } else {
                        console.log("User login failed: " + response.data.message);
                    }
                });



            }
        }
    }
</script>
