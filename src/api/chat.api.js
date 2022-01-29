import axios from 'axios';

const CreateChatRoom = (username) => axios.post('chats/', username);
const ConnectChatRoom = (user) => axios.post('chats/connect', user);

export {
  CreateChatRoom,
  ConnectChatRoom
}