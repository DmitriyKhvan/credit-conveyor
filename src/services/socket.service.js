import store from '@/store/index';
import NotifyService from './notify.service';
import CommonUtils from '../shared/utils/CommonUtils';
import { AuthService } from './auth.service';

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
  runConnection(token) {
    let socket = store.getters["socket/getSocket"];
    this.runNotifications(socket);
    this.runChat(socket);
    this.runOnline(socket, token);
    this.runUserConnect(socket);
    this.runUserDisconnect(socket);
    this.runRemoveUser(socket);

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
  runNotifications(socket) {
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
  },
  runOnline(socket, atoken) {
    let uname = store.getters['auth/fullName'];
    //let token = store.getters['auth/token'];
    let empId = store.getters["auth/empId"]

    let data = {
      emp_id: empId,
      emp_name: uname,
      socket_id: socket.id,
      token: atoken,
      login_time: CommonUtils.formattedDate(new Date)
    };

    console.log({ online: data });
    socket.emit("online", data);
  },
  runUserConnect(socket) {
    socket.on("uconnect", usr => {
      store.dispatch("auth/setActiveUsers", usr);
    });
  },
  runUserDisconnect(socket) {
    socket.on("udisconnect", socketId => {
      store.dispatch("auth/disconnectActiveUser", socketId);
    });
  },
  runRemoveUser(socket) {
    socket.on("uremove", () => {
      AuthService.logout();
    });
  },
  killActiveUser(usr) {
    let socket = store.getters["socket/getSocket"];
    //console.log(usr);
    socket.emit("uremove", usr);
  }
};
export default SocketService;
