import axios from 'axios';

// Send requests with credentials
// axios.defaults.withCredentials = true,

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Middleware to redirect user if 404
axios.interceptors.response.use(undefined, function (error) {
	console.log('axios.interceptors');

  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			console.log('axios.interceptors.error', error);
      // store.dispatch('LogOut')
      // return router.push('/admin/login')
    }

  }
  // request is rejected and will direct logic to the catch() method
  return Promise.reject(error.response.data)
});

axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('authtoken');
    console.log('axios.interceptors.request');
    console.log(localStorage, token);
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${ token }`;
    // }

    return config;
  }, 

  (error) => {
    return Promise.reject(error);
  }
);
