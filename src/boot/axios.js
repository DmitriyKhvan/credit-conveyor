import Vue from 'vue'
import axios from 'axios'
import ApiService from './../services/api.service'
//axios.defaults.baseURL = 'http://10.8.8.70:4000/'

ApiService.init(process.env.VUE_APP_BASE_URL);

//ApiService.mount401Interceptor();

Vue.prototype.$axios = axios
