<template>
  <div>
    <q-btn label="Delete" @click="submitBut()" />
    <q-btn label="create" @click="create()" />
    <q-btn label="leave" @click="leave()" />
    <q-btn label="active" @click="active()" />
    <q-btn label="isoNline" @click="isUserOnline()" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserService from "@/services/user.service";

export default {
  created() {
    console.log(this.socket);
    this.socket.on("chat/create", data => {
      console.log({ create: data });
    });
    this.socket.on("chat/detele", data => {
      console.log({ delete: data });
    });
    this.socket.on("group/usr/leave", data => {
      console.log({ usrLeave: data });
    });
    this.socket.on("group/grp/leave", data => {
      console.log({ usrLeave: data });
    });
    this.socket.on("users/active", data => {
      console.log({ activeUsers: data });
    });
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      socket: "socket/getSocket"
    })
  },
  methods: {
    submitBut() {
      this.socket.emit("chat/delete", 135);
    },
    create() {
      let data = {
        name: "New test group",
        description: "description about group",
        creator: 18073,
        users: [14365, 16415, 8722]
      };
      this.socket.emit("group/create", data);
    },
    leave() {
      let data = {
        chat_id: 147,
        emp_id: 1184
      };
      this.socket.emit("group/usr/leave", data);
    },
    active() {
      this.socket.emit("users/active");
    },
    isUserOnline() {
      let isOnline = UserService.isUserOnline(18073);
      console.log(isOnline);
    }
  }
};
</script>


<style>
</style>
