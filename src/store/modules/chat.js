/*
** VUEX GUEST CHAT
** create chat and send messages
*/

import { CreateChatRoom } from '@/api/chat.api';
import { PostMessage, GetChatMessages } from '@/api/message.api';
import Message from '@/models/message'
import Chat from '@/models/chat'

// default data value for a guest user
// Chat & Session data
const state = {
	session: false,
	chat: new Chat(),
	messages: []
};

// Get localdata
const getters = {
	StateChat: state => state.chat,
	StateMessages: state => state.messages,
	StateSession: state => state.session,
};

// API call
const actions = {

	// Create a chat 
	// and store auth token and chat info
	async ConnectUser({commit}, name) {
		try {
      const { data } = await CreateChatRoom({username: name});
      commit('setChat', data);
      commit('setSession', data.token);
    } catch (err) {
      console.log(err);
      return err;
    }
	},

	async SendMessage({state, commit}, msg) {
		try {
			let newmsg = new Message(msg, 0);
			newmsg = {...newmsg, chat_id: state.chat.id}
      const { data } = await PostMessage(newmsg);
      commit('addMessage', data);
    } catch (err) {
      console.log(err);
      return err;
    }
	},
	
	async GetAllMessages({state, commit}) {
		try {
      const { data } = await GetChatMessages(state.chat.id);
      commit('setMessage', data);
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
	setMessage(state, allMsg){
		state.messages = allMsg.map((msg) => {
			return new Message(msg.content, msg.sendby);
    });
	},
	addMessage(state, msg){
		const newMsg = new Message(msg.content, msg.sendby);
		state.messages = [...state.messages, newMsg];
	},

};

export default {
	state,
	getters,
	actions,
	mutations
};