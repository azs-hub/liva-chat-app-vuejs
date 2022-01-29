import axios from 'axios';
import { authHeader } from './authHeader';

const PostMessage = (msg) => axios.post('messages/', msg, {headers: authHeader() })
//let response = await axios.get('messages/', {headers: authHeader() })
export {
  PostMessage
}