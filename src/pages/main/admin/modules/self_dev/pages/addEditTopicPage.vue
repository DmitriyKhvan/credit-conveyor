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
        caption: "Edit Topic",
        tablePath: "test/topic",
        rowId: "id",
        addEdit: "test/topic", // url
        delete: "test/topic", //
        defaultSort: [], // TODO
        excludedColumns: [
          "id",
          "status",
          "created_by",
          "creation_date",
          "updated_by",
          "update_date",
          "timer"
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
      this.addEditRecord(AddEditTopic, selected, this.props);
    },

    deleteRow(row) {
      this.deleteRecord(row, this.props);
    },

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

    deleteRecord(row, propsTopiC) {
      this.$q
        .dialog({
          title: "Confirm",
          message: this.$t("messages.confirm_delete"),
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          ApiService.delete(propsTopiC.delete + "?id=" + row.id).then(
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
