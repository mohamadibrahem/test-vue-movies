import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import axios from 'axios';

import { store } from './store'

axios.defaults.baseURL = 'https://test-api.storexweb.com';
axios.defaults.headers.common['Accept'] = "application/json"
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
var token = localStorage.getItem('token');
if(token){
axios.defaults.headers.common.Authorization = `Bearer ${token}`
}
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      location.assign('/login')
    }

    return Promise.reject(error)
  }
)

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
