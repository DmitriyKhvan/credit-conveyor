// import {
//   DictService
// } from "../services/dict.service";
// import TokenService from "../services/storage.service";

import store from "../index";

const state = {
  menus: [],
  parentMenus: [],
  roles: [],
  iconTypes: [],
  icons: [],
  isAllSet: false,
  menuList: [],
  userList: [],
  receivedNotifications: [],
  testTopicList: [],
  dictTypes: [],
  countNotifications: 0,

  formats: null,
  journals: null,
  organs: null,
  regions: null
};

const getters = {
  isAllSet(state) {
    return state.isAllSet;
  },
  getRolesDict(state) {
    return state.roles.map(val => {
      return {
        text: val.authority,
        value: val.role_id
      };
    });
  },
  getIconTypes(state) {
    return state.iconTypes.map(val => {
      return {
        text: val.name,
        value: val.id
      };
    });
  },
  getIconsDict(state) {
    return state.icons.map(val => {
      return {
        text: val.name,
        value: val.class
      };
    });
  },
  getParentMenus(state) {
    let lang = store.state.common.langNum;

    return state.parentMenus.map(val => {
      return {
        text: val.name[lang] + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + val.url,
        value: val.menu_id,
        url: val.url
      };
    });
  },
  getTestTopicList: state => {
    return state.testTopicList.map(
      val => {
        return {
          text: val.name,
          value: val.id
        }
      }
    );
  },
  getMenuList: state => {
    return state.menuList;
  },
  getUserList: state => {
    return state.userList.map(val => {
      return {
        text: val.name,
        value: val.emp_id
      };
    });
  },
  receivedNotifications: state => {
    return state.receivedNotifications;
  },
  getDictTypes: state => {
    return state.dictTypes.map(val => {
      return {
        text: val.name,
        value: val.id
      };
    });
  },
  getCountNotifications: (state) => {
    return state.countNotifications;
  },
  getFormat: (state) => {
    return state.formats
  },
  getJournal: (state) => {
    return state.journals
  },
  getOrgan: (state) => {
    return state.organs
  },
  getRegion: (state) => {
    return state.regions
  }

};

const mutations = {
  setRolesDict(state, roles) {
    state.roles = roles;
  },
  setIconTypes(state, iconTypes) {
    state.iconTypes = iconTypes;
  },
  setIconsDict(state, icons) {
    state.icons = icons;
  },
  setIsAllSet(state, isSet) {
    state.isAllSet = isSet;
  },
  setParentMenus(state, parentMenus) {
    state.parentMenus = parentMenus;
  },
  setMenuList(state, menuList) {
    state.menuList = menuList;
  },
  setUserList(state, userList) {
    state.userList = userList
  },
  setReceivedNotifications(state, notifications) {
    state.receivedNotifications = notifications;
  },
  setTopicList(state, topicList) {
    state.testTopicList = topicList
  },
  addNotification(state, noty) {
    state.receivedNotifications = [noty, ...state.receivedNotifications];
    if (noty.status == 0) {
      state.countNotifications++;
    }
  },
  setDictTypes(state, types) {
    state.dictTypes = types
  },
  setCountNotifications(state, count) {
    state.countNotifications = count;
  },
  setFormat: (state, payload) => {
    state.formats = payload
  },
  setJournal: (state, payload) => {
    state.journals = payload
  },
  setOrgan: (state, payload) => {
    state.organs = payload
  },
  setRegion: (state, payload) => {
    state.regions = payload
  }
};

const actions = {

  setIsAllSet({
    commit
  }, isSet) {
    commit("setIsAllSet", isSet);
  },
  setMenuList({
    commit
  }, menuList) {
    commit("setMenuList", menuList);
  },
  setRolesDict({
    commit
  }, allDictRoles) {
    commit("setRolesDict", allDictRoles);
  },
  setIconTypes({
    commit
  }, iconTypes) {
    commit("setIconTypes", iconTypes);
  },
  setIconsDict({
    commit
  }, icons) {
    commit("setIconsDict", icons)
  },
  setCountNotifications({
    commit
  }, count) {
    commit("setCountNotifications", count)
  },
  setParentMenus({
    commit
  }, parentMenus) {
    commit("setParentMenus", parentMenus)
  },
  setUserList({
    commit
  }, userList) {
    commit("setUserList", userList);
  },
  setTestTopicList({
    commit
  }, topicList) {
    commit("setTopicList", topicList);
  },
  setReceivedNotifications({
    commit
  }, receivedNotifications) {
    commit("setReceivedNotifications", receivedNotifications);
  },
  addNotification({
    commit
  }, noty) {
    commit("addNotification", noty);
  },
  setDictTypes({
    commit
  }, types) {
    commit("setDictTypes", types);
  },
  setFormat: ({ commit }, formats) => {
    commit("setFormat", formats)
  },
  setJournal: ({ commit }, journals) => {
    commit("setJournal", journals)
  },
  setOrgan: ({ commit }, organs) => {
    commit("setOrgan", organs)
  },
  setRegion: ({ commit }, regions) => {
    commit("setRegion", regions)
  }
};
//
export const dicts = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
