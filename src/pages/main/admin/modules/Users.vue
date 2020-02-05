<template>
  <div>
    <grid-table v-bind="props" @saveFile="saveFile" @addEdit="addEdit"></grid-table>
  </div>
</template>

<script>
import GridTable from "./../../../../components/GridTable";
import AddEditUser from "./../dialogs/AddEditUser";

import { Dialog } from "quasar";
import ApiService from "../../../../services/api.service";

export default {
  created() {},
  data() {
    return {
      props: {
        caption: "Users Table",
        tablePath: "auth/users",
        rowId: "user_id",
        addEdit: "span", // url
        delete: "auth/users/delete", //
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
    addEdit(selected) {
      //      console.log({ userSelected: selected });
      this.$q
        .dialog({
          component: AddEditUser,
          parent: this,
          selectedRow: selected
        })
        .onOk(res => {
          console.log("OK");
          ApiService.post("auth/register", res)
            .then(response => {
              console.log(response);
              if (response.data[0].response.status == 1) {
                this.$q.notify({
                  message: response.data[0].response.message,
                  color: "green",
                  actions: [{ icon: "close", color: "white" }],
                  timeout: 1000,
                  position: "top"
                });
              } else {
                this.$q.notify({
                  message: response.data[0].response.message,
                  color: "red",
                  actions: [{ icon: "close", color: "white" }],
                  timeout: 1000,
                  position: "top"
                });
              }
            })
            .catch(error => {
              console.error(error);
              throw error;
            });
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    },
    saveFile() {
      console.log("save File emitted");
    }
  }
};
</script>

<style></style>
