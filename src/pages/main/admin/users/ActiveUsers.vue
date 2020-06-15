<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="activeUsers"
      :columns="columns"
      row-key="index"
      selection="single"
      :selected.sync="selected"
    >
      <template v-slot:top>
        <q-btn color="primary" label="Remove" @click="removeUser()" :disable="!isSelected" />
      </template>
    </q-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SocketService from "@/services/socket.service";
export default {
  created() {},
  data() {
    return {
      selected: [],
      loading: false,

      columns: [
        {
          name: "index",
          label: "#",
          field: "index"
        },
        {
          name: "emp_id",
          label: "Employee Id",
          align: "center",
          field: "emp_id"
        },
        { name: "emp_name", label: "Employee Name", field: "emp_name" },
        { name: "ip", label: "IP address", field: "ip" },
        { name: "socket_id", label: "Socket Id", field: "socket_id" },
        { name: "login_time", label: "Login Time", field: "login_time" }
      ]
    };
  },
  computed: {
    isSelected() {
      return this.selected.length > 0 ? true : false;
    },
    ...mapGetters({
      activeUsers: "auth/activeUsers"
    })
  },
  methods: {
    removeUser() {
      let socketId = this.selected[0].socket_id;
      SocketService.removeVisitor(socketId);
    }
  }
};
</script>

<style>
</style>