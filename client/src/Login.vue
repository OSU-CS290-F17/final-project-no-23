<template>
  <div>
    <login-popup></login-popup>
    <button id ="theme">Toggle Theme</button><br>
    <button id = "joinButton">Join</button><br>
    <button id = "createButton">Create</button><br>
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
    }
  }
</script>
