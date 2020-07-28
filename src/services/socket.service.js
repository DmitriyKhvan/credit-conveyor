import store from "@/store/index";
import NotifyService from "./notify.service";
import CommonUtils from "@/shared/utils/CommonUtils";
import { AuthService } from "./auth.service";
import axios from "axios";

//let connection = store.getters["socket/usersCount"];
//let socket = store.getters["socket/getSocket"];

const SocketService = {
  //socket: store.state.socket.getSocket,//.getters["socket/getSocket"],

  runAllSocketListeners() {
    this.runUsersCounter();
    console.log("runUsersCounter", store);
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
    let empId = store.getters["auth/empId"];
    let user = store.getters["auth/fullName"];
    //this.runNotifications(socket, empId);
    this.runChat(socket, empId);
    //this.runGroup(socket, empId)
    this.runChatList(socket, empId);
    this.runOnlineUsers(socket);
    this.runActiveUsers(socket);
    this.runLogout(socket);

    socket.on("chat/all", data => {
      const chats = [];
      if (data) {
        let ch = {};
        data.forEach(el => {
          if (el.type === 2) {
            console.log(data);
            let myData = {
              emp_name: user,
              emp_id: empId,
              chat_id: el.chat_id
            };
            socket.emit("grp/join", myData);

            ch = {
              count: el.count,
              type: 2,
              chat_id: el.chat_id,
              emp_id: el.details !== null ? el.details[0].creator : [],
              to_name: el.details !== null ? el.details[0].name : [],
              members: el.details !== null ? el.details[0].members : [],
              messages: el.messages !== null ? el.messages : [],
              creator_fio: el.details !== null ? el.details[0].creator_fio : "",
              creator: el.details !== null ? el.details[0].creator : ""
            };
          } else {
            ch = {
              count: el.count,
              type: 1,
              chat_id: el.chat_id,
              emp_id: el.details !== null ? el.details[0].creator : [],
              to_name: el.details !== null ? el.details[0].name : [],
              to_uid: el.details !== null ? el.details[0].emp_id : [],
              members: el.details !== null ? el.details[0].members : [],
              messages: el.messages !== null ? el.messages : []
            };
          }
          chats.push(ch);
        });
        store.dispatch("setChat", chats);
      }
    });

    socket.emit("chat/all", empId);

    socket.on("msg/send", data => {
      console.log(".ON - msg/send", data);
      store.dispatch("addMessage", data);
      const activeChat = store.getters.getActiveChat
        ? store.getters.getActiveChat
        : 0;

      if (activeChat === data.chat_id && data.messages[0].from_uid !== empId) {
        console.log("Reset Count");
        const chat = {
          chat_id: data.chat_id,
          emp_id: empId
        };
        axios
          .post("/chat/resetcount", chat)
          .then(response => {
            console.log("reset log");
            store.dispatch("delChatCount", data.chat_id);
          })
          .catch(error => {
            console.log("error");
          });
      }

      if (activeChat !== data.chat_id) {
        store.dispatch("addCount", data.chat_id);
      }
    });
  },
  runGroupMessageOn(socket, empId) {
    socket.on("grp/msg", data => {
      console.log(data);
      store.dispatch("addMessage", data);
      const activeChat = store.getters.getActiveChat
        ? store.getters.getActiveChat
        : 0;

      if (activeChat === data.chat_id && data.messages[0].from_uid !== empId) {
        console.log("Reset Count");
        const chat = {
          chat_id: data.chat_id,
          emp_id: empId
        };
        axios
          .post("/chat/resetcount", chat)
          .then(response => {
            console.log("reset log");
            store.dispatch("delChatCount", data.chat_id);
          })
          .catch(error => {
            console.log("error");
          });
      }

      if (activeChat !== data.chat_id) {
        store.dispatch("addCount", data.chat_id);
      }
    });
    this.runOnline(socket, empId);
  },
  stopConnection() {
    let socket = store.getters["socket/getSocket"];
    let empId = store.getters["auth/empId"];
    let user = store.getters["auth/fullName"];

    const chats = store.getters.getChats;

    chats.forEach(ch => {
      if (ch.type === 2) {
        const chat = {
          chat_id: ch.chat_id,
          emp_name: user
        };
        socket.emit("grp/leave", chat);
      }
    });
    setTimeout(() => socket.emit("offline", empId));

    console.log("user is offline");
  },
  isOnline() {
    if (store.getters["socket/isOnline"]) {
      return true;
    } else {
      let empId = store.getters["auth/empId"];
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
            NotifyService.showNotification(msg.title);
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
    let uname = store.getters["auth/fullName"];

    let data = {
      emp_id: empId,
      emp_name: uname,
      socket_id: socket.id,
      login_time: CommonUtils.formattedDate(new Date())
    };

    // console.log({ online: data });
    socket.emit("online", data);
  },
  runLogout(socket) {
    socket.on("logout", _ => {
      AuthService.logout();
    });
  },
  // function calls from other files
  removeVisitor(socketId) {
    let socket = store.getters["socket/getSocket"];
    socket.emit("users/remove", socketId);
  }
};

export default SocketService;
