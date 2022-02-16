import { mapActions } from "vuex"
import User from '@/models/user'

export default {
  name: 'admin-login',
  components: {},
  props: [],
  data () {
    return {
      // use of a model to structure de form
      user: new User('', ''),
      loading: false,
      errorMsg: false
    }
  },
  computed: {
    // TODO: Only called once, can be removed
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    // If an user is already connected redirect to dashboard
    if (this.loggedIn) {
      this.$router.push({name:'adminDashboard'})
      // TODO: explore router to set rules / restriction / redirect
    }
  },
  methods: {
    ...mapActions(["login"]),
    async handleLogin() {
      // TODO: VALIDATION FORM
      try {
        // before calling api check if login info are not empty
        if (!this.user.username || !this.user.password) {
          this.errorMsg = 'Username & password shall not be empty';
          return;
        }

        // Login start, block futur call from user
        this.loading = true;
        await this.login(this.user);
        // user is connected, AuthService set the token
        // we can redirect the user to the dashboard
        this.$router.push({name:'adminDashboard'})
      
      } catch (err) {
        this.errorMsg = err.error
      
      } finally {
        this.loading = false;
      }
    }
  }
}


