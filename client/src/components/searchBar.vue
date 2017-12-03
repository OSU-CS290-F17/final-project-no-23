<template>
  <div id='searchResults'>
    <input v-model='searchQuery' placeholder='Song Name'>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        searchQuery = '';
      }
    }

    methods:{
      search = function(){

      }

      returnResults = function(){
        
      }
    }
  }
</script>
