<template>
  <q-dialog ref="dialog" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin" style="width:60vw; max-width: 80vw;">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">Header</div>
          <q-btn flat :icon="'clear'" @click="onCancelClick"></q-btn>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-table
          :dense="$q.screen.lt.md"
          :grid="$q.screen.xs"
          :title="caption"
          :data="itemsArray"
          :columns="fields"
          :[selectionKey]="selectMode"
          :selected.sync="selectedRows"
          :row-key="rowId"
          :visible-columns="visibleColumns"
          :pagination.sync="defaultPaginationConfig"
          :filter="filter"
          :loading="loading"
        >
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
      <q-card-actions align="right">
        <q-btn color="primary" :disable="!isSelected" label="Ok" @click="onOkClick">
          <q-spinner color="white" size="1em" v-show="isLoading" />
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
  mixins: [dialogMix],
  props: {
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
  },
  data() {
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
      return ApiService.get(this.tablePath)
        .then(res => {
          let data = res.data;
          // Filter step
          this.filterColumn.forEach(param => {
            data = data.filter(item => {
              //console.log(item);
              return this.operators[param.operator](
                item[param.column],
                param.value
              );
            });
          });
          // data adding step
          data.forEach(element => {
            this.itemsArray.push(element);
          });

          // filtering and sorting coloumns of table
          if (data.length > 0) {
            Object.keys(data[0]).map(async (k, index) => {
              let sortable = this.excludeSortingColoumns.includes(k) //sortable filter
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
              if (!this.excludedColumns.includes(k)) {
                this.visibleColumns.push(k);
              }
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    clearTableData() {
      this.itemsArray = [];
      this.fields = [];
      this.visibleColumns = [];
      this.selectedRows = [];
    },
    onOkClick() {
      console.log("Ok Clicked");
    },
    onCancelClick() {
      console.log("Cancel Clicked");
    }
  }
};
</script>

<style>
</style>