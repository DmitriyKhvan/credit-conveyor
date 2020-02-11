<template>
  <div>
    <grid-table v-bind="props" @addEdit="addEditRow" @delRow="deleteRow" ref="gridTable"></grid-table>
  </div>
</template>

<script>
import GridTable from "./../../../../components/GridTable";
import AddEditRole from "./../dialogs/AddEditRole";

import { Dialog } from "quasar";
import ApiService from "../../../../services/api.service";
import NotifyService from "../../../../services/notify.service";
import GridService from "../../../../services/grid.service";

export default {
  created() {},
  data() {
    return {
      props: {
        caption: this.$t("tables.roles._self"),
        tablePath: "roles",
        rowId: "role_id",
        addEdit: "roles", // url
        delete: "roles", //
        defaultSort: [], // TODO
        excludedColumns: [
          "name",
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
      this.addEditRecord(AddEditRole, selected, this.props);
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
          console.log(res.data);
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
          message: this.$t("messages.confirm_delete"),
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          ApiService.delete(props.delete + "?id=" + row.id).then(
            res => {
              console.log(res);
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
