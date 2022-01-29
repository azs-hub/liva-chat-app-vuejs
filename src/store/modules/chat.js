import { CreateChatRoom } from '@/api/chat.api';

// default data value
const state = {
	session: false,
	chat: {
		id: null,
		username: null,
		start_date: null,
		end_date: null,
		is_closed: null,
	},
	messages: new Array()
};

// Get localdata
const getters = {
	StateChatRoom: state => state.chat,
	StateMessagesRoom: state => state.messages,
	StateSession: state => state.session,
};

// API call
const actions = {

	async ConnectUser({commit}, name) {
		try {
      var newChat = await CreateChatRoom({username: name});
      commit('setChat', newChat.data);
    } catch (err) {
      console.log(err);
      return err;
    }
	}

};

// Changes of our local data
const mutations = {
	setChat(state, chat){
		state.chat = chat
		state.session = chat.token
	}

};

export default {
	state,
	getters,
	actions,
	mutations
};