/*
** CHAT COMPONENT
** Usage of the ext. comp vue-chat-widget
** Show a popup dialog - Msg from guest to admin
** 
** TODO: Create own dialog component
*/

import { mapGetters, mapActions } from "vuex"
import { Chat } from 'vue-chat-widget'

import io from 'socket.io-client';

export default {
  name: 'chat-live',
  components: {
    Chat
  },
  data () {
    return {
      initOpen: false,
      toggledOpen: false,
      socket : io('localhost:3000', {
        withCredentials: false,
        extraHeaders: {
          "Content-Type": "application/json",
          "Access-Contol-Allow-Origin": "*",
        }
      })
    }
  },
  computed: {
    // chat & messages are given/linked by the vuex
    ...mapGetters({chat: "StateChat", messageList: "StateMessages"}),
  },
  mounted () {
    // get the messages if a chat is already connected
    if (this.chat.id) {
      this.loadMessage();
      this.initOpen = true;
      
      this.socket.emit('join server', this.chat.username);

      this.socket.emit('join room', this.chat.id, (msg, room) => {
        console.log('FR[socket join room]', msg, room);
      });

    }

    // new chat had been created
    // update chatist
    this.socket.on('new user', allUsers => {
      console.log('FR[socket.on new user]', allUsers);
    });
    this.socket.on('new msg', newMsg => {
      console.log('FR[socket.on new msg', newMsg);
      this.messageList.push({
        body: newMsg.content,
        author: 'them'
      });
    });
  },
  methods: {
    ...mapActions(["ConnectUser", "SendMessage", "GetAllMessages"]),
    
    // Load message through the vuex
    // To have them stored
    async loadMessage() {
      try {
        await this.GetAllMessages();
      } catch (err) {
        console.log(err);
        this.error = err.error
      }
    },
    
    // Connect to the chat
    async createChat() {
      try {
        await this.ConnectUser(this.chat.username);
        this.socket.emit('join server', this.chat.username);

        this.socket.emit('join room', this.chat.id, (msg, room) => {
          console.log('FR[socket join room]', msg, room);
        });
      } catch (err) {
        console.log(err);
        this.error = err.error
      }
    },

    // Send message through the vuex
    // And have them stored
    async handleMessageReceived(message) {
      try {
        await this.SendMessage(message.body);
        
        this.socket.emit('send msg', {
          content: message.body,
          to: this.chat.id,
          chatName: this.chat.id,
          sender: this.chat.id,
          isChannel: false
        });
      } catch (err) {
        console.log(err);
        this.error = err.error
      }
    },
    
    // Receive message from them 
    // TODO: socket.io
    handleMessageResponse(message) {
       if (message.length > 0) {
          this.messageList.push({ body: message, author: 'them' })
        }
    },
    
    // Chat toggled open event emitted
    handleToggleOpen(open) {
      this.toggledOpen = open
      // TODO: connect/disconnect websocket or something
    },

  }
}


