import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example'

import {
  auth
} from "./categorized/auth.module";
import {
  dicts
} from "./categorized/dicts.module";
import {
  socket
} from "./categorized/socket.module";
import {
  common
} from './categorized/common.module';


Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    example,
    auth,
    dicts,
    socket,
    common
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
});

export default store;
