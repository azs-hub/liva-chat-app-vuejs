import AdminService from '@/api/admin.service';
import ChatDialog from '@/components/ChatDialog/index.vue'
import Message from '@/models/message'

import io from 'socket.io-client';

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
      loading: false,
      socket : io('localhost:3000', {
        withCredentials: false,
        extraHeaders: {
          "Content-Type": "application/json",
          "Access-Contol-Allow-Origin": "*",
        }
      })
    }
  },
  
  beforeMount() {
    // Load the first part of the list of chats
    this.getChatsPagination();
  },
  
  mounted () {
    // trigger on the scroll list to load more chats
    this.getNextChats();

    this.socket.emit('join server', 'anais');
    // new chat had been created
    // update chatist
    this.socket.on('new user', allUsers => {
      console.log('[socket.on new user', allUsers);
    });
    this.socket.on('new msg', newMsg => {
      console.log('[socket.on new msg', newMsg);
      if (newMsg.sender == this.selectedChat)
        this.messages = [...this.messages, new Message(newMsg.content, 'them')];
    });
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
      if (this.selectedChat) {
        this.socket.emit('leave room');
      }

      this.selectedChat = record;
      this.socket.emit('join room', record);

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
      console.log('sendMessage to chatId', this.selectedChat)

      try {
        let newmsg = new Message(content, 1);
        newmsg = {...newmsg, chat_id: this.selectedChat}
        const { data } = await AdminService.postChatMessage(newmsg);
        this.messages.push(new Message(data.content, 0));

        // this.socket.emit('SEND_MESSAGE', newmsg);
        this.socket.emit('send msg', {
          content: content,
          to: this.selectedChat,
          chatName: this.selectedChat,
          sender: 1,
          isChannel: false
        });
      } catch (err) {
        console.log(err);
        return err;
      }

    },
  }
}


