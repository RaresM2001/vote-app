import axios from 'axios';
window.axios = require('axios')
axios.defaults.withCredentials = true;

axios.interceptors.response.use(response => {
  return response;
}, function(error) {
  if(error.response.status == 401) {
    window.location = '/'
    return Promise.resolve('User is not authorized');
  }
});
