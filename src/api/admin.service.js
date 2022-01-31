import axios from 'axios';
import { adminHeader } from './authHeader';

class AdminService {
  getChatList() {
    return axios.get('/chats', {headers: adminHeader() });
  }

  getChat() {
    // return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    // return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    // return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new AdminService();