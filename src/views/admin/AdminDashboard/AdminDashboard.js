import AdminService from '@/api/admin.service';
import ChatAdmin from '@/components/ChatAdmin/index.vue'

export default {
  name: 'admin-dashboard',
  components: {
    ChatAdmin
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
      selectedChat: null
    }
  },
  computed: {

  },
  mounted () {
  },
  created () {
    AdminService.getChatList().then(
      chats => {
        this.chatList = chats.data;
      },
      error => {
        console.log('error:', error);
      });
  },
  methods: {
    myRowClickHandler(record) {
      this.selectedChat = record[0].id;
      console.log(record);
      this.$router.push('/admin/chat/' + record[0].id);
    }
  }
}


