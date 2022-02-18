import AdminService from '@/api/admin.service';
import ChatDialog from '@/components/ChatDialog/index.vue'
import Message from '@/models/message'

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
  
  methods: {
    // Load the first part of the list of chats
    async getChatsPagination() {
      try {
        this.loading = true;
        // Get the list of chats
        const newChatList = await AdminService.getChatList(this.page);
          
        this.page += 1;
        this.chatList = [ ...this.chatList, ...newChatList.data];
           
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

    // when a chat is selected
    // get all the messages
    async getMessagesChat(record) {
      this.selectedChat = record;

      try {
        const { data: messages } = await AdminService.getChatMessages(record); 
        
        this.messages = messages.map((msg) => {
          return new Message(msg.content, !msg.sendby);
        });

      } catch (error) {
        console.log('error:', error);
      }
    },
    
    // TODO: use service to send a message
    async sendMessage(content) {
      console.log('selectedChat', this.selectedChat)

      try {
        let newmsg = new Message(content, 1);
        newmsg = {...newmsg, chat_id: this.selectedChat}
        const { data } = await AdminService.postChatMessage(newmsg);
        this.messages.push(new Message(data.content, 0));
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  }
}


