<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ChatLive />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ChatLive from '@/components/ChatLive/index.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    ChatLive
  }
}
</script>
