
export default {
  name: 'chat-dialog',
  components: {},
  props: ['messagesList', 'onMessageWasSent'],
  data () {
    return {
      message: ''
    }
  },
  updated() {
      // whenever data changes and the component re-renders, this is called.
      this.$nextTick(() => this.scrollToEnd());
  },
  mounted () {
  },
  methods: {
    sendMessage () {
      this.$emit('onMessageWasSent', this.message);
      this.message = '';
    },

    scrollToEnd(){
      var element = this.$refs.messageList;
      element.scrollTop = element.scrollHeight;
  }
  }
}


