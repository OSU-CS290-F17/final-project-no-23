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
        };

        console.log(userInfo);

        $.ajax({
          type: "POST",
          url: 'http://localhost:3000/api/user/getAuthURL',
          data: userInfo,
          crossDomain: true,
          dataType: 'application/json',
          success : (data) => {
              var json = JSON.parse(data);
              console.log(json.authURL);
          },
          error : (err) => {
              console.log("ERROR");
              console.log(err.statusText);
          }
        });

      }
    }
  }
</script>
