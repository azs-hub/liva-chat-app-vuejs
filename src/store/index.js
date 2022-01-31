import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from "vuex-persistedstate";
import chat from './modules/chat';
import auth from './modules/auth';

Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    chat,
    auth
  },
  plugins: [createPersistedState()]
});