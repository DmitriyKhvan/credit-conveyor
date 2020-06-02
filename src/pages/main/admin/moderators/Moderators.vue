<template>
  <div>
    <grid-table v-bind="props" @addEdit="addEditRow" @delRow="deleteRow" ref="gridTable"></grid-table>
  </div>
</template>

<script>
import GridTable from "@/components/GridTable";
import AddEditModerator from "./dialogs/AddEditModerator";

import { Dialog } from "quasar";
import ApiService from "@/services/api.service";
import NotifyService from "@/services/notify.service";
import GridService from "@/services/grid.service";

export default {
  created() {
    // let modList = this.$store.getters["auth/moderatorsList"];
    // let onlyMenuIds = [];
    // modList.forEach(element => {
    //   onlyMenuIds.push(element.menu_id);
    // });
    // ApiService.get("menus/user").then(res => {
    //   let filtered = res.data.filter(x => {
    //     return !onlyMenuIds.includes(x.menu_id);
    //   });
    //   console.log(filtered);
    // });
  },
  data() {
    return {
      props: {
        caption: "Moderator Table",
        tablePath: "roles/moderator",
        rowId: "id",
        addEdit: "roles/moderator", // url
        delete: "roles/moderator", //
        defaultSort: [], //
        excludedColumns: [
          "id",
          "emp_id",
          "menu_id",
          "branch_code",
          "filial_code"
        ],
        excludeSortingColoumns: [],
        enableAddEdit: true,
        enableDelete: true,
        enableRead: true,
        enableView: true,
        enableSelect: true,
        selectMode: "single",
        extraButtons: [],
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
      GridService.addEditRecord(AddEditModerator, selected, this.props, this)
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
    }
  }
};
</script>

<style></style>
