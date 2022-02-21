
export default {
  name: 'nav-bar',
  components: {},
  props: [],
  data () {
    return {

    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role.includes('admin');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role.includes('manager');
      }

      return false;
    }
  },
  mounted () {

  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/admin/login');
    }
  }
}


