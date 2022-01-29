import { CreateChatRoom } from '@/api/chat.api';
import { PostMessage } from '@/api/message.api';

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
      const newChat = await CreateChatRoom({username: name});
      commit('setChat', newChat.data);
      commit('setSession', newChat.data.token);
    } catch (err) {
      console.log(err);
      return err;
    }
	},
	async SendMessage({state, commit}, msg) {
		try {
			const message = { 
				content: msg,
				sendby: 0,
				chat_id: state.chat.id
			};
      const newMsg = await PostMessage(message);
      console.log('SendMessage', newMsg);
      commit('addMessage', newMsg.data);
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
	},
	setSession(state, token){
		state.session = token
	},
	addMessage(state, msg){
		console.log('addMessage', msg);
		state.messages.push(msg)
	}

};

export default {
	state,
	getters,
	actions,
	mutations
};