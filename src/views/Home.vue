<template>
  <div class="home">
    <b-row>
      <b-col>
        <img alt="Vue logo" src="../assets/logo.png">
      </b-col>
    </b-row>
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
