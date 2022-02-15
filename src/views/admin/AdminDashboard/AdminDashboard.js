import AdminService from '@/api/admin.service';
import ChatAdmin from '@/components/ChatAdmin/index.vue'
import ChatDialog from '@/components/ChatDialog/index.vue'

export default {
  name: 'admin-dashboard',
  components: {
    ChatAdmin,
    ChatDialog
  },
  props: [],
  data () {
    return {
      fields: [
        'username',
        { key: 'start_date', label: 'Date' },
        'status'
      ],
      chatList: [],
      selectedChat: null,
      messages: [],
      page: 1,
      loading: false
    }
  },
  computed: {

  },
  beforeMount() {
    this.getInitialChats(this.page);
  },
  mounted () {
    this.getNextChat();
  },
  created () {
    
  },
  methods: {
    myRowClickHandler(record) {
      this.selectedChat = record[0].id;
      this.$router.push('/admin/chat/' + record[0].id);
    },
    selectChat(record) {
      this.selectedChat = record;
      this.messages = [];
      AdminService.getChatMessages(record).then(
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
      // this.$router.push('/admin/chat/' + record[0].id);
    },
    getInitialChats(page) {
      AdminService.getChatList(page).then(
        chats => {
          this.page += 1;
          this.chatList = chats.data;
        },
        error => {
          console.log('error:', error);
      });
    },
    async getNextChat() {

      document.getElementById("chatList").onscroll = () => {
        var scrollDiv = document.getElementById("chatList");
        if ( (scrollDiv.scrollTop + scrollDiv.offsetHeight) + 50 >= scrollDiv.scrollHeight && !this.loading) {
          console.log('->', this.page);
          this.loading = true;
          AdminService.getChatList(this.page).then(
            chats => {
              this.page += 1;
              this.chatList = [ ...this.chatList, ...chats.data];
              console.log('--->', this.page);
              this.loading = false;
            },
            error => {
              console.log('error:', error);
          });
        }
      };
    },
    handleMessageReceived(message) {
      this.messages.push({
        content: message,
        author: 'you'
      })
    },
  }
}


