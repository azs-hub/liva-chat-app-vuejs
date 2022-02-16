
export default {
  name: 'chat-dialog',
  components: {},
  props: ['messagesList', 'onMessageWasSent'],
  data () {
    return {
      message: ''
    }
  },
  computed: {

  },
  mounted () {
  },
  methods: {
    sendMessage () {
      this.$emit('onMessageWasSent', this.message);
      this.message = '';
    },
  }
}


