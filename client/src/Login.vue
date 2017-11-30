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

  export default{
    data(){
        return{
          message: "Works"
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
