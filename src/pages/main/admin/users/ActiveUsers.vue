<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="index"
      selection="single"
      :selected.sync="selected"
    >
      <template v-slot:top>
        <q-btn color="primary" label="Remove" @click="removeUser" :disable="!isSelected" />
      </template>
    </q-table>

    <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
    <div class="q-mt-md">Users: {{ JSON.stringify(activeUsers) }}</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

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
        { name: "socket_id", label: "Socket Id", field: "socket_id" },
        { name: "login_time", label: "Login Time", field: "login_time" }
      ],
      data: [
        {
          emp_id: 159,
          emp_name: "namaeee",
          socket_id: 24,
          login_time: 4.0
        },
        {
          emp_id: 159,
          emp_name: "namaeee2",
          socket_id: 24,
          login_time: 4.0
        }
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
      console.log(this.selected);
    }
  }
};
</script>

<style>
</style>