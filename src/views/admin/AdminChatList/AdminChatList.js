import AdminService from '@/api/admin.service';

export default {
  name: 'admin-chat-list',
  components: {},
  props: [],
  data () {
    return {
      chatList: [],
      fields: ['username', 'status', 'is_closed'],
      perPage: 10,
      currentPage: 1,
      selectedChat: null,
      loading: false,
      rows: 0,
      pageVisited: []
    }
  },
  computed: {
  },
  mounted () {
    this.getChatsPagination();
  },
  methods: {
    myRowClickHandler(record) {
      // this.selectedChat = record[0].id;
      console.log(record);
    },

    async getChatsPagination() {
      if(this.pageVisited.includes(this.currentPage))
        return;
      try {
        this.loading = true;
        this.pageVisited.push(this.currentPage);
        const { data } = await AdminService.getAllChatList(this.currentPage);
        
        this.chatList = [...this.chatList, ...data];
        this.rows = data.shift().count;

      } catch (error) {
        console.log('error:', error);
      } finally {
        this.loading = false;
      }
    },
  }
}


