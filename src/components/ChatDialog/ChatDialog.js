
export default {
  name: 'chat-dialog',
  components: {},
  props: ['messagesList'],
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
    async sendMessage () {
      this.messagesList.push({
        content: this.message,
        author: 'you'
      })
    }
  }
}


