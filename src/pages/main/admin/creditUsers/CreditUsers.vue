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
import GridTable from "@/components/GridTable";
import AddEditUser from "./dialogs/AddEditUser";

// import { Dialog } from "quasar";
// import ApiService from "@/services/api.service";
// import NotifyService from "@/services/notify.service";
import GridService from "@/services/grid.service";

export default {
  created() {},
  data() {
    return {
      props: {
        caption: this.$t("tables.users._self"),
        tablePath: "credit/config",
        rowId: "id",
        addEdit: "credit/config", // url
        delete: "/credit/config", //
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
          sortBy: "name",
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
      console.log(row)
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
    }
  }
};
</script>

<style></style>
