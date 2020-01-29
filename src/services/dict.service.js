import ApiService from "./api.service";
import store from './../store/index';

const DictService = {

  loadAll: async function () {

    return new Promise(async (resolve, reject) => {

      console.log("dicts/setIsAllSet is ", store.getters["dicts/isAllSet"]);

      if (!store.getters["dicts/isAllSet"]) {

        let allroles = await this.allRoles();
        store.dispatch("dicts/setRolesDict", allroles);

        let menuItems = await DictService.menuList();
        store.dispatch("dicts/setMenuList", menuItems.items);

        let iconTypes = await this.iconTypes();
        store.dispatch("dicts/setIconTypes", iconTypes);

        let icons = await this.icons();
        store.dispatch("dicts/setIconsDict", icons);

        let parentMenus = await this.parentMenus();
        store.dispatch("dicts/setParentMenus", parentMenus);

        let userList = await this.userList();
        store.dispatch("dicts/setUserList", userList);

        let receivedNotifications = await this.receivedNotifications();
        store.dispatch("dicts/setReceivedNotifications", receivedNotifications);

        store.dispatch("dicts/setIsAllSet", true);

        resolve(true)

      } else {
        // leave it as is
        resolve(true);
      }
    });
  },

  allRoles() {
    return new Promise((resolve, reject) => {
      ApiService.get("roles/all")
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },

  iconTypes() {
    return new Promise((resolve, reject) => {
      ApiService.get("dicts/icontype")
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },

  icons() {
    return new Promise((resolve, reject) => {
      ApiService.get("dicts/icons")
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },

  parentMenus() {
    return new Promise((resolve, reject) => {
      ApiService.get("dicts/menus")
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },

  menuList() {
    return new Promise((resolve, reject) => {
      ApiService.get("menus/list?lang=2")
        .then(res => {
          resolve(res.data[0]);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },
  userList() {
    return new Promise((resolve, reject) => {
      ApiService.get("auth/users")
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },
  receivedNotifications() {
    return new Promise((resolve, reject) => {
      let uid = store.getters["auth/userId"];
      ApiService.get(`chat/notifications/${uid}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  }
};

export default DictService;
