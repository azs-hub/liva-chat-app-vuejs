import axios from 'axios';

class AuthService {
  login(user) {
    return axios
      .post('users/singup', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();
