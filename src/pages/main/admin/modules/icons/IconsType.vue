<template>
  <div>
    <grid-table v-bind="props" @addEdit="addEditRow" @delRow="deleteRow" ref="gridTable"></grid-table>
  </div>
</template>

<script>
import GridTable from "./../../../../../components/GridTable";
import AddEditIconType from "./../../dialogs/AddEditIconType";

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
      this.addEditRecord(AddEditIconType, selected, this.props);
    },

    deleteRow(row) {
      this.deleteRecord(row, this.props);
    },

    //
    addEditRecord(dialogComponent, selected, props) {
      this.$q
        .dialog({
          component: dialogComponent,
          parent: this,
          data: {
            selectedRow: selected,
            props: props
          }
        })
        .onOk(res => {
          if (res.data.status == 1) {
            NotifyService.showSuccessMessage(res.data.message);
            this.$refs.gridTable.refreshTable();
          } else {
            NotifyService.showErrorMessage(res.data.message);
          }
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    },

    deleteRecord(row, props) {
      this.$q
        .dialog({
          title: "Confirm",
          message: $t("messages.confirm_delete"),
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          ApiService.delete(props.delete + "?id=" + row.id).then(
            res => {
              if (res.data.status == 1) {
                NotifyService.showSuccessMessage(res.data.message);
                this.$refs.gridTable.refreshTable();
              } else {
                NotifyService.showErrorMessage(res.data.message);
              }
            },
            err => {
              //console.log(err);
              NotifyService.showErrorMessage(err.toString());
            }
          );
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    }
  }
};
</script>

<style></style>
