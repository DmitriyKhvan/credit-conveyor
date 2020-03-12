<template>
  <div>
    <grid-table v-bind="props" @addEdit="addEditRow" @delRow="deleteRow" ref="gridTable"></grid-table>
  </div>
</template>

<script>
import GridTable from "./../../../../../components/GridTable";
import AddEditDeviceDetail from "./dialogs/AddEditDeviceDetail";

import { Dialog } from "quasar";
import ApiService from "./../../../../../services/api.service";
import NotifyService from "./../../../../../services/notify.service";
import GridService from "./../../../../../services/grid.service";

export default {
  created() {},
  data() {
    return {
      props: {
        caption: this.$t("tables.device_details._self"),
        tablePath: "devices/detail",
        rowId: "id",
        addEdit: "devices/detail", // url
        delete: "devices/detail", //
        defaultSort: [], // TODO
        excludedColumns: ["id", "type_id"],
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
      GridService.addEditRecord(AddEditDeviceDetail, selected, this.props, this)
        .then(res => {
          if (res) {
            this.$refs.gridTable.refreshTable();
          }
        })
        .catch(err => {
          console.error(err);
          throw err;
        });
    },

    deleteRow(row) {
      GridService.deleteRecord(row, this.props)
        .then(res => {
          if (res) {
            this.$refs.gridTable.refreshTable();
          }
        })
        .catch(err => {
          console.error(err);
          throw err;
        });
    }
  }
};
</script>

<style></style>
