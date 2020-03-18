<template>
  <div>
    <grid-table v-bind="props" @addEdit="addEditRow" @delRow="deleteRow" ref="gridTable"></grid-table>
  </div>
</template>

<script>
import GridTable from "@/components/GridTable";
import AddEditType from "./dialogs/AddEditType";

import { Dialog } from "quasar";
import GridService from "@/services/grid.service";

export default {
  created() {},
  data() {
    return {
      props: {
        caption: "Dict Types",
        tablePath: "dicts/type",
        rowId: "id",
        addEdit: "dicts/type", // url
        delete: "dicts/type", //
        defaultSort: [],
        excludedColumns: ["id"],
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
      GridService.addEditRecord(AddEditType, selected, this.props, this)
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
