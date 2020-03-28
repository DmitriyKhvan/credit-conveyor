import Vue from "vue";
import Vuex from "vuex";

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
} from "./categorized/common.module";

import credits from './categorized/credits';

import profile from './categorized/profile';

import education from './categorized/education';

import birthdays from './birthdays'


Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    auth,
    dicts,
    socket,
    common,
    credits,
    profile,
    education,
    birthdays
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  //strict: process.env.DEV
});

export default store;
