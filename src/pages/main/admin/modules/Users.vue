<template>
  <div>
    <grid-table v-bind="props" @saveFile="saveFile()"></grid-table>
  </div>
</template>

<script>
import GridTable from "./../../../../components/GridTable";

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
    saveFile() {
      console.log("Parent method (saveFile) is called from Child");
    }
  }
};
</script>

<style></style>
