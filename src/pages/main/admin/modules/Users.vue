<template>
  <div>
    <grid-table v-bind="props" @saveFile="saveFile()"></grid-table>
  </div>
</template>

<script>
import GridTable from "./../../../../components/GridTable";
import AddEditUser from "./../dialogs/AddEditUser";

import { Dialog } from "quasar";

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
    GridTable,
    AddEditUser
  },
  methods: {
    saveFile() {
      this.$q
        .dialog({
          component: AddEditUser,
          parent: this,
          message: "some text"
        })
        .onOk(res => {
          console.log("OK");
          console.log(res);
        })
        .onCancel(() => {
          console.log("Cancel");
        })
        .onDismiss(() => {
          console.log("Called on OK or Cancel");
        });
    }
  }
};
</script>

<style></style>
