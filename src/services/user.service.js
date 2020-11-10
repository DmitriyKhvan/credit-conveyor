import store from "@/store/index";

const UserService = {
  getUserProfilePhotoUrl(emp_id) {
    return `http://10.8.8.70:4000/emps/img/${emp_id}`;
  },
  isUserOnline(empId) {
    let userList = store.getters["auth/onlineUsers"];
    return userList.includes(empId); // ? true : false;
  }
};

export default UserService;
