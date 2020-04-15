import store from '@/store/index';

//let connection = store.getters["socket/usersCount"];
//let socket = store.getters["socket/getSocket"];

const SocketService = {

  //socket: store.state.socket.getSocket,//.getters["socket/getSocket"],

  runAllSocketListeners() {
    this.runUsersCounter();
    console.log(store);
  },
  runUsersCounter() {
    let socket = store.getters["socket/getSocket"];
    socket.on("count", data => {
      console.log("countinRUN: ", data);
      store.dispatch("socket/setUserCount", data);
    });
  },
  runConnection(empId) {
    let socket = store.getters["socket/getSocket"];
    socket.emit("online", empId);
    store.dispatch("socket/setOnline", true);
    console.log("user is online");
  },
  stopConnection() {
    let socket = store.getters["socket/getSocket"];
    socket.emit("offline");
    store.dispatch("socket/setOnline", false);
    console.log("user is offline");
  },
  isOnline() {
    if (store.getters["socket/isOnline"]) {
      return true;
    } else {
      let empId = store.getters["auth/empId"]
      this.runConnection(empId);
      return true;
    }
  }
};
export default SocketService;
