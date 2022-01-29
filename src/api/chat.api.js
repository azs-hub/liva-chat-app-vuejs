import axios from 'axios';

const CreateChatRoom = (username) => axios.post('chats/', username);

export {
  CreateChatRoom
}