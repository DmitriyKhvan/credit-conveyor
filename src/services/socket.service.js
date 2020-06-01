import store from '@/store/index';
import NotifyService from './notify.service';
import CommonUtils from "@/shared/utils/CommonUtils"
//let connection = store.getters["socket/usersCount"];
//let socket = store.getters["socket/getSocket"];

const SocketService = {

  //socket: store.state.socket.getSocket,//.getters["socket/getSocket"],

  runAllSocketListeners() {
    this.runUsersCounter();
    console.log('runUsersCounter',store);
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
    this.runChat(socket, empId)
    this.runGroup(socket, empId)
    this.runChatList(socket, empId)
    this.runOnline(socket);

    socket.emit("chat/all", empId)
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
          store.dispatch("dicts/addNotification", msg);
          if (msg.status == 0) {
            NotifyService.showNotification(msg.title)
          }
        });
      }
    });
  },
  runChat(socket, empId) {
    // socket.on("chat", data => {
    //   console.log('chats',data)
    //   store.dispatch('addMessage', data)
    //   // logic...
    // });
  },
  runChatList(socket, empId) {
    // socket.on("chat/all", data => {
    //   console.log('List',data)
    //   store.dispatch('setChats', data)

    //   // logic...
    // });
  },
  runGroup(socket, empId) {
    socket.on("group", data => {

      // logic...
    });
  },
  runOnline(socket) {
    let uname = store.getters['auth/fullName'];
    let empId = store.getters["auth/empId"]

    let data = {
      emp_id: empId,
      emp_name: uname,
      socket_id: socket.id,
      login_time: CommonUtils.formattedDate(new Date)
    };

    console.log({ online: data });
    socket.emit("online", data);
  },
};
export default SocketService;
