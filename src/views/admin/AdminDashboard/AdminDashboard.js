import AdminService from '@/api/admin.service';
import ChatDialog from '@/components/ChatDialog/index.vue'

export default {
  name: 'admin-dashboard',
  components: {
    ChatDialog
  },
  data () {
    return {
      chatList: [],
      selectedChat: null,
      messages: [],
      page: 1,
      loading: false
    }
  },
  beforeMount() {
    // Load the first part of the list of chats
    this.getChatsPagination();
  },
  mounted () {
    // trigger on the scroll list to load more chats
    this.getNextChats();
  },
  created () {
    
  },
  methods: {
    // Load the first part of the list of chats
    async getChatsPagination() {
      try {
        this.loading = true;
        // Get the list of chats
        const chatsList = await AdminService.getChatList(this.page);
          
        this.page += 1;
        this.chatList = [ ...this.chatList, ...chatsList.data];
           
      } catch (error) {
        console.log('error:', error);
      } finally {
        this.loading = false;
      }
    },
    // watch scroll on the list to load more chats
    getNextChats() {
      document.getElementById("chatList").onscroll = () => {
        var scrollDiv = document.getElementById("chatList");
        if ( (scrollDiv.scrollTop + scrollDiv.offsetHeight) + 50 >= scrollDiv.scrollHeight && !this.loading) {
          this.getChatsPagination();
        }
      };
    },
    // return who is the author of the message
    getAuthor(author) {
      if (author == 0) 
        return 'them';
      return 'you';
    },
    // when a chat is selected
    // get all the messages
    async getMessagesChat(record) {
      this.selectedChat = record;

      try {
        const chats = await AdminService.getChatMessages(record); 
        this.messages = chats.data.map((msg) => {
            return {content: msg.content, author: this.getAuthor(msg.sendby)}
          });
      } catch (error) {
        console.log('error:', error);
      }
    },
    handleMessageReceived(message) {
      this.messages.push({
        content: message,
        author: 'you'
      })
    },
  }
}


