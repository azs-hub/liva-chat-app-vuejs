import axios from 'axios';

// Set AXIOS API
axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Middleware to redirect user if 404
axios.interceptors.response.use(undefined, function (error) {

  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
      // store.dispatch('LogOut')
      // return router.push('/admin/login')
    }

  }
  // request is rejected and will direct logic to the catch() method
  return Promise.reject(error.response.data)
});