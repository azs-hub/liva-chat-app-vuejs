import { mapGetters } from "vuex"
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
      }),
      onlineUsers: []
    }
  },
  computed: {
    ...mapGetters({user: "StateUser"})
  },
  
  beforeMount() {
    // Load the first items in the list of chats
    this.getChatsPagination();
  },
  
  mounted () {
    // trigger on the scroll list to load more chats
    this.getNextChats();

    this.socket.emit('join server', this.user);
    
    // new chat had been created by a guest
    // update chatist
    this.socket.on('new user', allUsers => {
      console.log('socket.on new user is', allUsers);
      this.onlineUsers = allUsers.filter((x) => x.userid != this.user.id);
    });
    
    this.socket.on('new msg', newMsg => {
      console.log('[socket.on new msg]', newMsg);
      if (newMsg.to == this.selectedChat.id)
        this.messages = [...this.messages, new Message(newMsg.content, 'them')];
    });
  },
  
  methods: {
    // Load the first part of the list of chats
    async getChatsPagination() {
      try {
        this.loading = true;
        // Get the list of chats
        const { data } = await AdminService.getChatList(this.page);
          
        this.page += 1;
        this.chatList = [ ...this.chatList, ...data];
           
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
      this.socket.emit('join room', record.id);

      try {
        const { data: messages } = await AdminService.getChatMessages(record.id); 
        
        this.messages = messages.map((msg) => {
          return new Message(msg.content, !msg.sendby);
        });

      } catch (error) {
        console.log('error:', error);
      }
    },
    
    async sendMessage(content) {
      try {
        let newmsg = new Message(content, 1);
        newmsg = {...newmsg, chat_id: this.selectedChat.id}
        await AdminService.postChatMessage(newmsg);
        this.messages.push(new Message(content, 0));
        
        this.socket.emit('send msg', {
          content: content,
          to: this.selectedChat.id
        });
      } catch (err) {
        console.log(err);
        return err;
      }

    },

    isOnline(user) {
      return this.onlineUsers.some((chat) => {
        return user.id == chat.userid;
      })
    },

    getOnlineClass(user) {
      if (this.isOnline(user))
        return 'success';
      return 'default';
    },

    scrollIntoView(id) {
      var el = this.$refs['chat'+id];
      if (el) {
        this.$refs.chatList.scrollTop = el[0].offsetTop;
      }
    }
  }
}


