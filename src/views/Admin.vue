<template>
  <div class="Admin">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

// Main Admin template
export default {
  name: 'Admin',
  components: {
    HelloWorld
  },
  data () {
    return {}
  },
  created () {
  },
  computed: {
  },

}
</script>
