import ApiService from './api.service'
import TokenService from './storage.service'
import store from "@/store/index";

const UserService = {
  getUserProfilePhotoUrl(emp_id) {
    return `http://10.8.88.219/index.php?module=Tools&file=phones&prefix=profile&act=img&uid=${emp_id}`;
  },
  isUserOnline(empId) {
    let userList = store.getters["auth/onlineUsers"];
    return userList.includes(empId) ? true : false;
  }
}

export default UserService
