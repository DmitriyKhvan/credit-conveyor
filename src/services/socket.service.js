import store from '@/store/index';
import NotifyService from './notify.service';

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
    this.runNotifications(socket, empId);
    this.runChat(socket);

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
  },
  runNotifications(socket, empId) {
    socket.on("notifications", data => {
      if (data) {
        data.forEach(msg => {
          console.log(msg)
          store.dispatch("dicts/addNotification", msg);
          if (msg.status == 0) {
            NotifyService.showNotification(msg.title)
          }
        });
      }
    });
  },
  runChat(socket) {
    socket.on("chat", data => {
      console.log(data);
    })
  }
};
export default SocketService;
