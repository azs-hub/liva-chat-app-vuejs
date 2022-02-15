import axios from 'axios';
import { adminHeader } from './authHeader';

class AdminService {
  getChatList(page) {
    console.log('AdminService - getChatList', page)
    return axios.get('/chats/' + page , {headers: adminHeader() });
  }

  getChatMessages(chat_id) {
    return axios.get('/messages/' + chat_id, {headers: adminHeader() });
  }
}

export default new AdminService();