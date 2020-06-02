<template>
  <div>
    <grid-table
      v-bind="props"
      @saveFile="saveFile"
      @addEdit="addEditRow"
      @delRow="deleteRow"
      ref="gridTable"
    ></grid-table>

    <q-scroll-area style="height: 500px; max-width: 100%; margin-top: 10px;">
      <q-list bordered>
        <q-item class="row" v-for="(item,index) in activeUsers" :key="index" clickable>
          <q-item-section class="col-1">{{index +1 }}</q-item-section>
          <q-item-section class="col-1">{{item.emp_id}}</q-item-section>
          <q-item-section class="col-2">{{item.emp_name}}</q-item-section>
          <q-item-section class="col-2">{{item.socket_id}}</q-item-section>
          <!-- <q-item-section class="col-2">{{item.token}}</q-item-section> -->
          <q-item-section class="col-2">{{item.login_time}}</q-item-section>
          <q-item-section class="col-1">
            <q-btn color="primary" label="KILL" @click="killUser(item, index)" />
          </q-item-section>

          <q-item-section></q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
import GridTable from "@/components/GridTable";
import AddEditUser from "./dialogs/AddEditUser";

import { Dialog } from "quasar";
import ApiService from "@/services/api.service";
import NotifyService from "@/services/notify.service";
import GridService from "@/services/grid.service";
import SocketService from "@/services/socket.service";
import { mapGetters } from "vuex";

export default {
  created() {},
  data() {
    return {
      props: {
        caption: this.$t("tables.users._self"),
        tablePath: "auth/users",
        rowId: "user_id",
        addEdit: "auth/users", // url
        delete: "auth/users", //
        defaultSort: [],
        excludedColumns: [
          "user_id",
          "roles",
          "first_name",
          "last_name",
          "middle_name",
          "status",
          "created_by",
          "creation_date",
          "updated_by",
          "update_date"
        ],
        excludeSortingColoumns: [],
        enableAddEdit: true,
        enableDelete: true,
        enableRead: true,
        enableView: true,
        enableSelect: true,
        selectMode: "single",
        extraButtons: [
          {
            name: "download",
            i18n: "",
            icon: "save",
            functionName: "saveFile",
            tooltip: this.$t("actions.save")
          }
        ],
        paginationConfig: {
          sortBy: "username",
          descending: false,
          page: 1,
          rowsPerPage: 5
          //rowsNumber: 4 // if getting data from a server
        }
      }
    };
  },
  components: {
    GridTable
  },
  computed: {
    ...mapGetters({
      activeUsers: "auth/activeUsers"
    })
  },
  methods: {
    addEditRow(selected) {
      GridService.addEditRecord(AddEditUser, selected, this.props, this)
        .then(
          ok => {
            if (ok) {
              this.$refs.gridTable.refreshTable();
            }
          },
          err => {
            console.log(err);
          }
        )
        .catch(error => {
          console.error(error);
          throw error;
        });
    },

    deleteRow(row) {
      GridService.deleteRecord(row, this.props)
        .then(
          ok => {
            if (ok) {
              this.$refs.gridTable.refreshTable();
            }
          },
          err => {
            console.log(err);
          }
        )
        .catch(error => {
          console.error(error);
          throw error;
        });
    },
    saveFile() {
      console.log("save File emitted");
    },
    killUser(item, index) {
      item.index = index;
      SocketService.killActiveUser(item);
    }
  }
};
</script>

<style></style>
