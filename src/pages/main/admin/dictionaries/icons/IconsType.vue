<template>
  <div>
    <grid-table v-bind="props" @addEdit="addEditRow" @delRow="deleteRow" ref="gridTable"></grid-table>
  </div>
</template>

<script>
import GridTable from "./../../../../../components/GridTable";
import AddEditIconType from "./../dialogs/AddEditIconType";

import { Dialog } from "quasar";
import ApiService from "../../../../../services/api.service";
import NotifyService from "../../../../../services/notify.service";
import GridService from "../../../../../services/grid.service";

export default {
  created() {},
  data() {
    return {
      props: {
        caption: this.$t("tables.icon_types._self"),
        tablePath: "dicts/icontype",
        rowId: "id",
        addEdit: "dicts/icontype", // url
        delete: "dicts/icontype", //
        defaultSort: [], // TODO
        excludedColumns: [],
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
      GridService.addEditRecord(AddEditIconType, selected, this.props, this)
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
