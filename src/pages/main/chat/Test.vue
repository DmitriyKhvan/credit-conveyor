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
    this.socket.on("chat/delete", data => {
      console.log("del: ", data);
    });
    this.socket.on("private/create", data => {
      console.log(data);
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
      this.socket.emit("chat/delete", 61);
    },
    create() {
      let data = {
        from_uid: 14365,
        to_uid: 18073
      };
      this.socket.emit("private/create", data);
    }
  }
};
</script>


<style>
</style>
