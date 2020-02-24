<template>
  <div id="addEditTopicPage">
    <grid-table v-bind="props" @addEdit="addEditRow" @delRow="deleteRow" ref="gridTable"></grid-table>
    <router-view />
  </div>
</template>

<script>
import GridTable from "../../../../../../components/GridTable";
import AddEditTopic from "./../dialogs/AddEditTopicDialog";
import { Dialog } from "quasar";
import ApiService from "../../../../../../services/api.service";
import NotifyService from "../../../../../../services/notify.service";
import GridService from "../../../../../../services/grid.service";

export default {
  name: "addEditTopicPage",
  data() {
    return {
      tab: "EditTopic",
      props: {
        caption: "Test Topics Page",
        tablePath: "test/topic",
        rowId: "id",
        addEdit: "test/topic", // url
        delete: "test/topic", //
        defaultSort: [], // TODO
        excludedColumns: [
          "id",
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
      GridService.addEditRecord(AddEditTopic, selected, this.props).then(ok => {
        if (ok) {
          this.$refs.gridTable.refreshTable();
        }
      });
    },

    deleteRow(row) {
      GridService.deleteRecord(row, this.props).then(ok => {
        if (ok) {
          this.$refs.gridTable.refreshTable();
        }
      });
    }
  }
};
</script>
