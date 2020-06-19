import store from '@/store/index';
import NotifyService from './notify.service';
import CommonUtils from '@/shared/utils/CommonUtils';
import { AuthService } from './auth.service';
import axios from "axios";

//let connection = store.getters["socket/usersCount"];
//let socket = store.getters["socket/getSocket"];

const SocketService = {

  //socket: store.state.socket.getSocket,//.getters["socket/getSocket"],

  runAllSocketListeners() {
    this.runUsersCounter();
    console.log('runUsersCounter', store);
  },
  runUsersCounter() {
    let socket = store.getters["socket/getSocket"];
    socket.on("count", data => {
      //console.log("countinRUN: ", data);
      store.dispatch("socket/setUserCount", data);
    });
  },
  runConnection() {
    let socket = store.getters["socket/getSocket"];
    let empId = store.getters["auth/empId"]
    //this.runNotifications(socket, empId);
    this.runChat(socket, empId)
    //this.runGroup(socket, empId)
    this.runChatList(socket, empId)
    this.runOnlineUsers(socket);
    this.runActiveUsers(socket);
    this.runLogout(socket);

    socket.emit("chat/all", empId)

    socket.on("msg/send", data => {
      console.log('.ON - msg/send', data)
      store.dispatch('addMessage', data)
      const activeChat = store.getters.getActiveChat ? store.getters.getActiveChat : 0


      if(activeChat === data.chat_id && data.messages[0].from_uid !== empId){
        console.log('Reset Count')
        const chat = {
          chat_id: data.chat_id,
          emp_id: empId
        }
        axios
          .post("/chat/resetcount", chat)
          .then(response => {
            console.log('reset log')
            store.dispatch('delChatCount', data.chat_id)
          })
          .catch(error => {
            console.log('error')
          });
      }

      if(activeChat !== data.chat_id){
        store.dispatch('addCount', data.chat_id)
      }

    })


    this.runOnline(socket, empId);


    //store.dispatch("socket/setOnline", true);
    //console.log("user is online");

  },
  stopConnection() {
    let socket = store.getters["socket/getSocket"];
    let empId = store.getters["auth/empId"];

    socket.emit("offline", empId);
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
          //console.log(msg)
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
  runOnlineUsers(socket) {
    socket.on("users/online", userList => {
      store.dispatch("auth/setOnlineUsers", userList);
    });
  },
  runActiveUsers(socket) {
    socket.on("users/active", userList => {
      store.dispatch("auth/setActiveUsers", userList);
    });
  },
  runOnline(socket, empId) {
    let uname = store.getters['auth/fullName'];

    let data = {
      emp_id: empId,
      emp_name: uname,
      socket_id: socket.id,
      login_time: CommonUtils.formattedDate(new Date)
    };

    // console.log({ online: data });
    socket.emit("online", data);
  },
  runLogout(socket) {
    socket.on('logout', _ => {
      AuthService.logout();
    });
  },
  // function calls from other files
  removeVisitor(socketId) {
    let socket = store.getters["socket/getSocket"];
    socket.emit('users/remove', socketId);
  }

};

export default SocketService;
