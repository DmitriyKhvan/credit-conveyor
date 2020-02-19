<template>
  <div>
    <grid-table
      v-bind="props"
      @saveFile="saveFile"
      @addEdit="addEditRow"
      @delRow="deleteRow"
      ref="gridTable"
    ></grid-table>
  </div>
</template>

<script>
import GridTable from "./../../../../components/GridTable";
import AddEditUser from "./../dialogs/AddEditUser";

import { Dialog } from "quasar";
import ApiService from "../../../../services/api.service";
import NotifyService from "../../../../services/notify.service";
import GridService from "../../../../services/grid.service";

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
        defaultSort: [], // TODO
        excludedColumns: [
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
  methods: {
    addEditRow(selected) {
      GridService.addEditRecord(AddEditUser, selected, this.props, this);
    },

    deleteRow(row) {
      GridService.deleteRecord(row, this.props);
    },

    saveFile() {
      console.log("save File emitted");
    }
  }
};
</script>

<style></style>
