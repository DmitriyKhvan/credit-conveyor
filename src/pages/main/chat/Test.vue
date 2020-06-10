<template>
  <div>
    <q-btn label="Delete" @click="submitBut()" />
    <q-btn label="create" @click="create()" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {
    console.log(this.socket);
    this.socket.on("group/create", data => {
      console.log({ create: data });
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
      //this.socket.emit("chat/delete", 61);
    },
    create() {
      let data = {
        name: "New test group",
        description: "description about group",
        creator: 18073,
        users: [14365, 16415, 8722]
      };
      this.socket.emit("group/create", data);
    }
  }
};
</script>


<style>
</style>
