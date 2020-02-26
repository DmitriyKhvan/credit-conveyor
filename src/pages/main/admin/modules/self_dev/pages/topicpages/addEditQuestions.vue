<template>
  <div id="addEditQuestionsPage">
    <div style="display:none">{{topicId}}</div>
    <grid-table v-bind="props" @addEdit="addEditRow" @delRow="deleteRow" ref="gridTable"></grid-table>
    <router-view />
  </div>
</template>

<script>
import GridTable from "../../../../../../../components/GridTable";
import AddEditTopic from "./../../dialogs/AddEditQuestionDialog";
import { Dialog } from "quasar";
import ApiService from "../../../../../../../services/api.service";
import NotifyService from "../../../../../../../services/notify.service";
import GridService from "../../../../../../../services/grid.service";

export default {
  name: "addEditQuestionPage",
  data() {
    return {
      tab: "Edit question",
      props: {
        caption: "Edit question",
        tablePath: "test/question",
        rowId: "id",
        addEdit: "test/question", // url
        delete: "test/question", //
        defaultSort: [], // TODO
        excludedColumns: [
          "id",
          "status",
          "created_by",
          "creation_date",
          "updated_by",
          "update_date",
          "timer",
          "topic_id",
          "variants"
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
        },
        filterColumn: [
          // {
          //   column: "topic_id",
          //   operator: "==",
          //   value: "2"
          // }
        ]
      }
    };
  },
  components: {
    GridTable
  },
  // mounted() {
  //   this.tablePath =
  //     "test/question?topic=" + this.$store.state.education.topicId;
  // },
  computed: {
    topicId() {
      // return console.log(this.$store.state.education.topicId);

      this.props.tablePath =
        "test/question?topic=" + this.$store.state.education.topicId;
      this.refreshContent();

      return this.$store.state.education.topicId;
    }
  },
  methods: {
    refreshContent() {
      console.log(this.props.tablePath);
      // console.log(this.$refs.gridTable);
      //this.$refs.gridTable.refreshTable();
    },
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
            //console.log(this);
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
