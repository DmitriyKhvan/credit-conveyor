import store from './../store/index';
import jwtDecode from "jwt-decode";

//let connection = store.getters["socket/usersCount"];

const SocketService = {

  // socket: store.getters["socket/getSocket"],

  // runAllSocketListeners() {
  //   //this.runUsersCounter();
  //   // console.log(store);
  // },

  // runUsersCounter() {
  //   //let socket = store.getters["socket/getSocket"];
  //   this.socket.on("count", data => {
  //     console.log("countinRUN: ", data);
  //     //this.setUserCount(data);
  //     store.dispatch("socket/setUserCount", data);
  //   });
  //   //console.log(store);
  // },

  // runConnection(userId) {
  //   //let socket = store.getters["socket/getSocket"];
  //   this.socket.emit("online", userId);
  //   store.dispatch("socket/setOnline", true);
  //   console.log("user is online");
  // },
  // stopConnection() {
  //   //let socket = store.getters["socket/getSocket"];
  //   this.socket.emit("offline");
  //   store.dispatch("socket/setOnline", false);
  //   console.log("user is offline");
  // },
  // isOnline() {
  //   if (store.getters["socket/isOnline"]) {
  //     return true;
  //   } else {
  //     this.runConnection(jwtDecode(store.state.auth.accessToken).user_id);
  //     return true;
  //   }
  // }
};
export default SocketService;
