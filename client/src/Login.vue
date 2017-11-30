<template>
  <div>
    <login-popup></login-popup>
    <button id ="theme">Toggle Theme</button><br>
    <button id = "joinButton" v-on:click="login">Join</button><br>
    <button id = "createButton" v-on:click="login">Create</button><br>
  </div>
</template>

<script>
  import loginPopup from "./components/loginPopup.vue";
  const axios = require('axios');

  export default{
    data(){
        return{
          message: "Works"
        }
    },
    created: function() {
        function getParameterByName(name, url) {    //magic regex copy pasterino
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        if (window.location.pathname == "/auth") {
            axios.post("http://localhost:3000/api/user/sendAuthCode", {code : getParameterByName('code')}).then((response) => {
                if (!response.success) console.log(response);
            }).catch((error) => {console.log(error);});
        }




    },
    components: {
      loginPopup
    },
    methods: {
        login : function(){
          loginModal.style.display = "block";
        }
    }

  }
</script>
