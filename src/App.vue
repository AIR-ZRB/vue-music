<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data(){
    return {
      music: {
        MusicId: "",
        MusicName: "",
        MusicTime: "",
        MusicVolume: 0.5,
        
      }
    }
  }
}
</script>

<style>
#app {
  
}
</style>
