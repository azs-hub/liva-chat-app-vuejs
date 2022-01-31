import AdminService from '@/api/admin.service';

export default {
  name: 'admin-dashboard',
  components: {},
  props: [],
  data () {
    return {
      fields: ['username', 'start_date', 'status'],
      chatList: []
    }
  },
  computed: {

  },
  mounted () {
    console.log('mounted');
  },
  created () {
    console.log('created');
    AdminService.getChatList().then(
      chats => {
        console.log('chats:', chats);
        this.chatList = chats.data;
      },
      error => {
        console.log('error:', error);
      });
  },
  methods: {

  }
}


