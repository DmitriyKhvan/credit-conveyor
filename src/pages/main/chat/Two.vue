<template>
  <div>
    <q-btn label="create" @click="createGroup()" />
    <q-input filled v-model="chat_id" label="chat_id" />
    <q-btn label="sendMessage" @click="sendMessage()" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserService from "@/services/user.service";
import io from "socket.io-client";

export default {
  created() {
    let empId = this.$store.getters["auth/empId"];
    let name = this.$store.getters["auth/fullName"];
    this.socket.on("chat/all", data => {
      console.log(data);
      if(data){
        data.forEach(element => {
          if (element.type == 2) {
            let myData = {
              emp_name: name,
              emp_id: empId,
              chat_id: element.chat_id
            };
            this.socket.emit("grp/join", myData);
          }
        });
      }
    });
    // create group
    this.socket.on("grp/new", data => {
      console.log({ newGroup: data });

      if (data.users.includes(empId)) {
        let myData = {
          emp_name: name,
          emp_id: empId,
          chat_id: data.id
        };
        this.socket.emit("grp/join", myData);
      }
    });

    this.socket.on("grp/msg", data => {
      console.log({ sms: data });
    });

    this.socket.on("grp/join/message", data => {
      console.log({ joinmsg: data });
    });

    this.socket.on("grp/usr/join", data => {
      console.log({ joinmsg: data });

      if (data.self_uid == empId) {
        console.log(
          "you are adding " + data.new_uname + "to chat: " + data.chat_id
        );
      } else if (data.new_uid == empId) {
        console.log(
          data.self_uname + " is adding you to chat: " + data.chat_id
        );

        let myData = {
          emp_name: data.new_uname,
          emp_id: empId,
          chat_id: data.chat_id
        };

        this.socket.emit("grp/join", myData);
      } else {
        console.log(
          data.self_uname +
            " is adding " +
            data.new_uname +
            " to chat: " +
            data.chat_id
        );
      }
    });

    this.socket.on("grp/usr/leave", data => {
      console.log({ leavemsg: data });
      if (data.emp_id == emp_id) {
        console.log("you re kicked from group " + data.chat_id);
        this.socket.emit("grp/leave", data);
      } else {
        console.log(data.emp_id, " kicked form chat " + data.chat_id);
      }
    });

    this.socket.emit("chat/all", empId);
  },
  data() {
    return {
      socket: io("http://10.8.8.70:4000/"),
      chat_id: ""
    };
  },
  computed: {},
  methods: {
    createGroup() {
      // group Data
      let grpData = {
        name: "test group",
        description: "description",
        creator: 16415,
        users: [18073]
      };

      this.socket.emit("grp/create", grpData);
    },
    sendMessage() {
      let empId = this.$store.getters["auth/empId"];
      let name = this.$store.getters["auth/fullName"];

      let message = {
        chat_id: this.chat_id,
        message: "Hello room",
        from_uid: empId
      };
      console.log(message);

      this.socket.emit("grp/msg", message);
    }
  }
};
</script>


<style>
</style>
