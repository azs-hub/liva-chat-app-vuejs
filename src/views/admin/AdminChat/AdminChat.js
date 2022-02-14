import ChatDialog from '@/components/ChatDialog/index.vue'

export default {
  name: 'admin-chat',
  components: {
    ChatDialog
  },
  props: [],
  data () {
    return {
      messages: [
        {content: 'hello', author: 'you'},
        {content: 'hi', author: 'them'},
        {content: 'Whats up', author: 'you'},
      ]
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {

  }
}


