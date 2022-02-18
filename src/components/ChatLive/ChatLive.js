/*
** CHAT COMPONENT
** Usage of the ext. comp vue-chat-widget
** Show a popup dialog - Msg from guest to admin
** 
** TODO: Create own dialog component
*/

import { mapGetters, mapActions } from "vuex"
import { Chat } from 'vue-chat-widget'

export default {
  name: 'chat-live',
  components: {
    Chat
  },
  data () {
    return {
      initOpen: false,
      toggledOpen: false,
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
    
    // Connect to the chat
    async createChat() {
      try {
        await this.ConnectUser(this.chat.username);
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


