<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin" style="width:60vw; max-width: 80vw;">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">{{data.caption}}</div>
          <q-btn flat :icon="'clear'" @click="onCancelClick"></q-btn>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-table
          :dense="$q.screen.lt.md"
          :grid="$q.screen.xs"
          :data="itemsArray"
          :columns="fields"
          :selection="data.selectMode"
          :selected.sync="selectedRows"
          :row-key="data.rowId"
          :visible-columns="visibleColumns"
          :pagination.sync="defaultPaginationConfig"
          :filter="filter"
          :loading="loading"
        >
          <q-space />
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
          <template v-slot:no-data="{ icon, message, filter }">
            <div class="full-width row flex-center text-accent q-gutter-sm">
              <q-icon size="2em" name="sentiment_dissatisfied" />
              <span>Well this is sad... {{ message }}</span>
              <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
            </div>
          </template>
        </q-table>
      </q-card-section>
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="Ok" :disable="!isSelected" @click="onOkClick">
          <!-- <q-spinner color="white" size="1em" v-show="true" /> -->
        </q-btn>
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import ApiService from "../services/api.service";
import dialogMix from "../shared/mixins/dialogMix";

export default {
  async created() {
    await this.initialize();
  },
  mixins: [],
  props: {
    data: {
      caption: {
        type: String,
        default: "Table"
      },
      tablePath: {
        type: String,
        default: "auth/users"
      }, // url,
      rowId: {
        type: String,
        default: "user_id"
      },
      defaultSort: {
        type: [Array, Object],
        default: () => []
      },
      excludedColumns: {
        type: Array,
        default: () => []
      },
      excludeSortingColoumns: {
        type: Array,
        default: () => []
      },
      selectMode: {
        type: String,
        default: "single"
      },
      paginationConfig: {
        type: Object,
        default: () => {
          return {};
        }
      },
      filterColumn: {
        type: [Array, Object],
        default: () => []
      }
    }
  },
  data: function() {
    return {
      itemsArray: [],
      fields: [],
      selectedRows: [],
      visibleColumns: [],
      filter: "",
      loading: false,
      defaultPaginationConfig: this.paginationConfig,
      operators: {
        ">": function(a, b) {
          return a > b;
        },
        "<": function(a, b) {
          return a < b;
        },
        "==": function(a, b) {
          return a == b;
        },
        "!=": function(a, b) {
          return a != b;
        }
      }
    };
  },
  computed: {
    isSelected() {
      return this.selectedRows.length > 0 ? true : false;
    }
  },
  methods: {
    initialize() {
      return new Promise(async (res, rej) => {
        this.loading = !this.loading;
        await this.allTableData();
        this.loading = !this.loading;
        res(true);
      });
    },
    allTableData: function() {
      return ApiService.get(this.data.tablePath)
        .then(res => {
          let data = res.data;
          // Filter step
          this.data.filterColumn.forEach(param => {
            if (param.value) {
              data = data.filter(item => {
                //console.log(item);
                return this.operators[param.operator](
                  item[param.column],
                  param.value
                );
              });
            }
          });
          // data adding step
          data.forEach(element => {
            this.itemsArray.push(element);
          });

          // filtering and sorting coloumns of table
          if (data.length > 0) {
            Object.keys(data[0]).map(async (k, index) => {
              let sortable = this.data.excludeSortingColoumns.includes(k) //sortable filter
                ? false
                : true;
              this.fields.push({
                name: k,
                required: false,
                label: k.replace("_", " ").toUpperCase(),
                align: "center",
                sortable: sortable,
                field: k
              });
              // exluding check filter
              if (!this.data.excludedColumns.includes(k)) {
                this.visibleColumns.push(k);
              }
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    async refreshTable() {
      this.loading = true;
      this.clearTableData();
      await this.allTableData().then(_ => {
        this.loading = false;
      });
    },
    clearTableData() {
      this.itemsArray = [];
      this.fields = [];
      this.visibleColumns = [];
      this.selectedRows = [];
    },
    onOkClick() {
      console.log("ok clicked");
      this.$emit("ok", this.selectedRows);
      this.hide();
    },
    onCancelClick() {
      this.$q
        .dialog({
          title: "Confirm",
          message: this.$t("messages.confirm_exit"),
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.hide();
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    },
    // !!! Don't change
    show() {
      this.$refs.dialog.show();
    },

    // !!! Don't change
    hide() {
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      this.$emit("hide");
    }
  }
};
</script>

<style></style>
