<template>
  <div class="q-pa-md">
    <q-card class="primary">
      <q-card-section>{{caption}}</q-card-section>

      <q-card-section>
        <q-table
          :title="caption"
          :data="itemsArray"
          :columns="fields"
          :selection="selectMode"
          :selected.sync="selectedRows"
          :row-key="rowId"
          :visible-columns="visibleColumns"
          :pagination.sync="paginationConfig"
          :filter="filter"
          :loading="loading"
        >
          <template v-slot:top>
            <q-btn
              class="q-ml-sm"
              color="primary"
              :disable="loading"
              label="Add"
              @click="addRow"
              :icon="'add'"
            >
              <q-tooltip
                transition-show="scale"
                transition-hide="scale"
                anchor="top middle"
                self="bottom middle"
              >Add a new record to table</q-tooltip>
            </q-btn>
            <q-btn
              class="q-ml-sm"
              color="primary"
              :disable="loading"
              label="Edit"
              @click="updateRow"
              :icon="'edit'"
            >
              <q-tooltip
                transition-show="scale"
                transition-hide="scale"
                anchor="top middle"
                self="bottom middle"
              >Edit and Update table record</q-tooltip>
            </q-btn>
            <q-btn
              class="q-ml-sm"
              color="primary"
              label="Delete"
              :disable="loading"
              @click="removeRow"
              :icon="'delete'"
            >
              <q-tooltip
                transition-show="scale"
                transition-hide="scale"
                anchor="top middle"
                self="bottom middle"
              >Remove selected rows</q-tooltip>
            </q-btn>
            <q-btn
              class="q-ml-sm"
              color="primary"
              label="View"
              :disable="loading"
              @click="viewRow"
              :icon="'remove_red_eye'"
            >
              <q-tooltip
                transition-show="scale"
                transition-hide="scale"
                anchor="top middle"
                self="bottom middle"
              >View data</q-tooltip>
            </q-btn>

            <q-space />
            <q-input borderless dense debounce="300" color="primary" v-model="filter">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import ApiService from "../services/api.service";

export default {
  async created() {
    await this.initialize();
  },
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
    addEdit: {
      type: String,
      default: "span"
    }, // url
    delete: {
      type: String,
      default: "auth/users/delete"
    }, //
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
    enableAddEdit: {
      type: Boolean,
      default: true
    },
    enableDelete: {
      type: Boolean,
      default: true
    },
    enableRead: {
      type: Boolean,
      default: true
    },
    enableView: {
      type: Boolean,
      default: true
    },
    enableSelect: {
      type: Boolean,
      default: true
    },
    selectMode: {
      type: String,
      default: "single"
    },
    pageSize: {
      type: Number,
      default: 5
    },
    extraButtons: {
      type: [Array, Object],
      default: () => []
    }
  },
  data() {
    return {
      isBusy: false,
      itemsArray: [],
      fields: [],
      selectedRows: [],
      visibleColumns: [],
      paginationConfig: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 100
        //rowsNumber: 4 // if getting data from a server
      },
      filter: "",
      loading: false
    };
  },
  methods: {
    async initialize() {
      return new Promise(async (res, rej) => {
        this.isBusy = !this.isBusy;
        await this.allTableData();
        this.isBusy = !this.isBusy;
        res(true);
      });
    },
    allTableData: function() {
      return ApiService.get(this.tablePath)
        .then(res => {
          let data = res.data;
          data.forEach(element => {
            this.itemsArray.push(element);
          });
          Object.keys(data[0]).map(async (k, index) => {
            this.fields.push({
              name: k,
              required: false,
              label: k,
              align: "center",
              sortable: true,
              field: k
            });
            if (!this.excludedColumns.includes(k)) {
              this.visibleColumns.push(k);
            }
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    async removeExcludedFields() {
      return new Promise(resolve => {
        //let index = this.fields.indexOf(el);
        this.fields.forEach(el => {
          this.excludeColoumns.forEach(element => {
            if (el.key == element) {
              let index = this.fields.indexOf(el);
              this.fields.splice(index, 1);
            }
          });
        });
        resolve();
      });
    },
    addRow() {
      console.log("add Row");
    },
    removeRow() {
      console.log("remove Row");
    },
    updateRow() {
      console.log("update Row");
    },
    viewRow() {
      console.log("view Row");
    }
  }
};
</script>

<style></style>
