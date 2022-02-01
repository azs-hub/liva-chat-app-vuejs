import {Chat} from 'vue-chat-widget'

export default {
  name: 'chat-admin',
  components: {
    Chat
  },
  props: [
    'id',
  ],
  data () {
    return {
      messageList: [],
      initOpen: true,
      toggledOpen: false
    }
  },
  computed: {

  },
  mounted () {
    this.messageList.push({ body: 'Welcome to the chat, I\'m David!', author: 'them' })
  },
  methods: {
    // Send message from you
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
  },
  watch: {
    messageList: function(newList) {
      const nextMessage = newList[newList.length - 1]
      const isIncoming = (nextMessage || {}).author !== 'you'
      if (isIncoming && this.toggledOpen) {
        this.handleMessageResponseSound()
      }
    }
  }
}


