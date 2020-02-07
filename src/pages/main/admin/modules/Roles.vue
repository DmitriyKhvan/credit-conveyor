<template>
  <div>
    <grid-table v-bind="props" @saveFile="saveFile" @addEdit="addEditRow" @delRow="deleteRow"></grid-table>
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
        caption: "Roles Table",
        tablePath: "auth/users",
        rowId: "user_id",
        addEdit: "auth/users", // url
        delete: "auth/users", //
        defaultSort: [], // TODO
        excludedColumns: [],
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
            tooltip: "Saves  SVG File"
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
      this.addEditRecord(AddEditUser, selected, this.props);
    },

    deleteRow(row) {
      this.deleteRecord(row, this.props);
    },

    saveFile() {
      console.log("save File emitted");
    },

    addEditRecord(dialogComponent, selected, props) {
      this.$q
        .dialog({
          component: AddEditUser,
          parent: this,
          data: {
            selectedRow: selected,
            props: props
          }
        })
        .onOk(res => {
          if (res.data.status == 1) {
            NotifyService.showSuccessMessage(res.data.message);
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
          message: "Do you really want to delete?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          ApiService.delete(props.delete + "?id=" + row.id).then(
            res => {
              if (res.data.status == 1) {
                NotifyService.showSuccessMessage(res.data.message);
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
