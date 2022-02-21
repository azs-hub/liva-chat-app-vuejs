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
    // If a chat is already set
    // Connect to the socket and load the message
    if (this.chat.id) {
      this.loadMessage();
      this.initOpen = true;
      this.joinSocket();
      this.handleMessageResponse();
    }
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

    // Connect to the socket and handle message
    joinSocket() {
      // To put in a function and recall
      this.socket.emit('join server', this.chat);
      this.socket.emit('join room', this.chat.id, (msg, room) => {
        console.log('FR[socket join room]', msg, room);
      });
    },
    
    // Connect to the chat
    async createChat() {
      try {
        await this.ConnectUser(this.chat.username);
        this.joinSocket();
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
        console.log('handleMessageReceived', message, this.chat)
        this.socket.emit('send msg', {
          content: message.body,
          to: this.chat.id
        });
      } catch (err) {
        console.log(err);
        this.error = err.error
      }
    },
    
    // Receive message from them 
    handleMessageResponse() {
      this.socket.on('new msg', newMsg => {
        console.log('FR[socket.on new msg]', newMsg);
        this.messageList.push({
          body: newMsg.content,
          author: 'them'
        });
      });
    },
    
    // Chat toggled open event emitted
    handleToggleOpen(open) {
      this.toggledOpen = open
      // TODO: connect/disconnect websocket or something
    },

  }
}


