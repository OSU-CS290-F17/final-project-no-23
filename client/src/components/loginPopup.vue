<template>
  <div id = "loginModal" class = "modal">
    <div class =  "modalContent">
      <div class = "inputcontainer">
        <h2>Sco Beavs</h2>
        <input v-model = "username" placeholder="Username"><br>
        <input v-model = "password" placeholder="Password">
        <button id = "loginButton" v-on:click = "loginRequest">Log In</button>
      </div>
    </div>
  </div>
</template>

<script>
    var axios = require("axios");
  export default{
    data(){
      return {
        username: "",
        password: ""
      }
    },
    methods : {
      loginRequest : function(){
        var that = this;

        var userInfo = {
            username: that.$data.username,
            password: that.$data.password,
        };

        console.log(userInfo);


        axios.post('http://localhost:3000/api/user/getAuthURL', userInfo).then((response) => {
            window.location.replace(response.data.authURL);
        }).catch((error) => {
            console.log(error);
        })


      }
    }
  }
</script>
