import axios from 'axios';
import { authHeader } from './authHeader';

const PostMessage = (msg) => axios.post('messages/', msg, {headers: authHeader() })
const GetChatMessages = (id) => axios.get('messages/'+ id, {headers: authHeader() })

export {
  PostMessage,
  GetChatMessages
}