/*
** VUEX AUTH ADMIN
** Manage admin authentication
*/

import AuthService from '@/api/auth.service';
import User from '@/models/user'

const user = JSON.parse(localStorage.getItem('user'));

const state = {
  status: { 
    loggedIn: !!user
  },
  user: user
};

const getters = {
  StateUser: state => state.user,
  StateUserStatus: state => state.status
};

const actions = {
  async login({ commit }, user) {
    try {
      const { data } = await AuthService.login(user);
      commit('loginSuccess', data);
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  logout({ commit }) {
    AuthService.logout();
    commit('logout');
  },
  async register({ commit }, user) {
    try {
      await AuthService.register(user);
      commit('registerSuccess');
    } catch (err) {
      console.log(err);
      commit('registerFailure');
      return err;
    }
  }
};

const mutations = {
  loginSuccess(state, user) {
    state.status.loggedIn = true;
    state.user = new User(user);
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