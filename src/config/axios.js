import axios from 'axios';
window.axios = require('axios')
axios.defaults.withCredentials = true;

axios.interceptors.response.use(response => {
  return response;
}, function(error) {
  if(error.response.status == 401) {
    window.location = '/login'
    console.log('401111111111111111');
    return Promise.resolve('User is not authorized');
  }
});
