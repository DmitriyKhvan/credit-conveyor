<template>
  <div id="addEditTopicPage">
    <grid-table v-bind="props" @addEdit="addEditRow" @delRow="deleteRow" ref="gridTable"></grid-table>
    <router-view />
  </div>
</template>

<script>
import GridTable from "@/components/GridTable";
import AddEditQuestion from "./dialogs/AddEditQuestion";
import { Dialog } from "quasar";
import ApiService from "@/services/api.service";
import NotifyService from "@/services/notify.service";
import GridService from "@/services/grid.service";

export default {
  name: "QuestionPage",
  data() {
    return {
      tab: "Test Questions",
      props: {
        caption: "Test Questions Page",
        tablePath: "test/question",
        rowId: "id",
        addEdit: "test/question", // url
        delete: "test/question", //
        defaultSort: [], // TODO
        excludedColumns: [
          "variants",
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
  created() {},
  methods: {
    addEditRow(selected) {
      GridService.addEditRecord(AddEditQuestion, selected, this.props, this)
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
