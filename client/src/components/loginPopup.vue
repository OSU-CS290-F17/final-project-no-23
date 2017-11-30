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
  export default{
    data(){
      return {
        username: "",
        password: ""
      }
    },

    methods : {
      loginRequest : function(){
        var userInfo = {
          username: this.$data.username,
          password: this.$data.password,
          token: ""
        };

        console.log(userInfo);

        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'localhost:3000/api/user/', userInfo);

        var url = "localhost:3000/?usertoken=69420";
        var urlParams = new URLSearchParams(window.location.search);

        userInfo.token = urlParams.toString();
        console.log(userInfo);

        xhr.open('POST', 'localhost:3000/api/user/', userInfo);
      }
    }
  }
</script>
