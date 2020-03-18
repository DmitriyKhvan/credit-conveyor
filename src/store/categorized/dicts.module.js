// import {
//   DictService
// } from "../services/dict.service";
// import TokenService from "../services/storage.service";

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
  dictTypes: []
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
        text: val.name, //<i class="${val.class}"></i> ${val.name}
        value: val.class
      };
    });
  },
  getParentMenus(state) {
    return state.parentMenus.map(val => {
      return {
        text: val.name[0], // TODO add lang <i class="${val.class}"></i> ${val.name}
        value: val.menu_id
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
        text: val.name, // TODO add lang <i class="${val.class}"></i> ${val.name}
        value: val.user_id
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
  },
  setDictTypes(state, types) {
    state.dictTypes = types
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
