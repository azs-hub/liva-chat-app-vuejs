import AuthService from '@/api/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
// const initialState = user
//   ? { status: { loggedIn: true }, user }
//   : { status: { loggedIn: false }, user: null };

const state = {
  status: { 
    loggedIn: (user) ? true : false 
  },
  user: (user) ? user : null
};

const getters = {
  StateUser: state => state.user,
  StateUserStatus: state => state.status
};

const actions = {
  login({ commit }, user) {
    return AuthService.login(user).then(
      user => {
        commit('loginSuccess', user.data);
        return Promise.resolve(user.data);
      },
      error => {
        commit('loginFailure');
        return Promise.reject(error);
      }
    );
  },
  logout({ commit }) {
    AuthService.logout();
    commit('logout');
  },
  register({ commit }, user) {
    return AuthService.register(user).then(
      response => {
        commit('registerSuccess');
        return Promise.resolve(response.data);
      },
      error => {
        commit('registerFailure');
        return Promise.reject(error);
      }
    );
  }
};

const mutations = {
  loginSuccess(state, user) {
    state.status.loggedIn = true;
    state.user = user;
  },
  loginFailure(state) {
    state.status.loggedIn = false;
    state.user = null;
  },
  logout(state) {
    state.status.loggedIn = false;
    state.user = null;
  },
  registerSuccess(state) {
    state.status.loggedIn = false;
  },
  registerFailure(state) {
    state.status.loggedIn = false;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
};