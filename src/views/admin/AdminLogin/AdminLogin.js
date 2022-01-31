import { mapActions } from "vuex"
import User from '@/models/user'

export default {
  name: 'admin-login',
  components: {},
  props: [],
  data () {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({name:'adminDashboard'})
    }
    localStorage.name = 'anais';
  },
  mounted () {

  },
  methods: {
    ...mapActions(["login"]),
    async handleLogin() {
      this.loading = true;
      if (!this.user.username && !this.user.password) {
        this.loading = false;
        this.message = 'Username & password shall not be empty';
      }
      else {
        try {
          await this.login(this.user);
          this.$router.push({name:'adminDashboard'})
        } catch (err) {
          console.log(err);
          this.loading = false;
          this.message = err.error
        }
      }
    }
  }
}


