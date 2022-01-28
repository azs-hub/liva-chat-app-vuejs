import {Chat} from 'vue-chat-widget'
// import incomingMessageSound from '../assets/notification.mp3' 

export default {
  name: 'chat-live',
  components: {
    Chat
  },
  props: [],
  data () {
    return {
      messageList: [],
      initOpen: false,
      toggledOpen: false,
      chat: null
    }
  },
  computed: {

  },
  mounted () {
    this.messageList.push({ body: 'Welcome to the chat, I\'m David!', author: 'them' })
  },
  watch: {
    messageList: function(newList) {
      const nextMessage = newList[newList.length - 1]
      const isIncoming = (nextMessage || {}).author !== 'you'
      if (isIncoming && this.toggledOpen) {
        this.handleMessageResponseSound()
      }
    },
    initOpen: function(newVal) {
      console.log(this.initOpen , 'vs', newVal);
    }
  },
  methods: {
    async enterTheChat() {
      console.log('enter the chat');
      try {
        await this.ConnectUser({username: this.username});
      } catch (err) {
        console.log(err);
        this.error = err.error
      }
    },
    handleMessageReceived(message) {
      this.messageList.push(message)
    },
    // Receive message from them (handled by you with your backend)
    handleMessageResponse(message) {
       if (message.length > 0) {
            this.messageList.push({ body: message, author: 'them' })
        }
    },
    // Chat toggled open event emitted
    handleToggleOpen(open) {
      this.toggledOpen = open
      // connect/disconnect websocket or something
    },
    // Audible chat response noise, use whatever noise you want
    handleMessageResponseSound() {
      // const audio = new Audio(incomingMessageSound)
      // audio.addEventListener('loadeddata', () => {
      //   audio.play()
      // })
    },

  }
}


