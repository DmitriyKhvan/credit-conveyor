import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = 'http://10.8.8.70:4000/'

Vue.prototype.$axios = axios
