import AdminService from '@/api/admin.service';
import ChatDialog from '@/components/ChatDialog/index.vue'

export default {
  name: 'admin-chat',
  components: {
    ChatDialog
  },
  props: ['chat_id'],
  data () {
    return {
      messages: []
    }
  },
  computed: {

  },
  mounted () {

  },
  created () {
    AdminService.getChatMessages(this.chat_id).then(
      chats => {
        let allMsg = [];
        chats.data.forEach(function (msg) {
          allMsg.push({
            content: msg.content,
            author: (msg.sendby == 0) ? 'you' : 'them'
          })
        })
        this.messages = [ ...this.messages, ...allMsg];
      },
      error => {
        console.log('error:', error);
    });
  },
  methods: {
    handleMessageReceived(message) {
      this.messages.push({
        content: message,
        author: 'you'
      })
    },
  }
}


