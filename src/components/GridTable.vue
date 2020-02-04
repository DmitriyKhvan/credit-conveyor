<template>
  <div class="q-pa-md">
    <q-card class="primary">
      <q-card-section>{{caption}}</q-card-section>
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
          <template v-slot:top="props">
            <q-btn
              class="q-ml-sm"
              color="primary"
              :disable="loading"
              @click="addRow"
              :icon="'add'"
              :disabled="enableAddEdit"
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
              @click="updateRow"
              :icon="'edit'"
              :disabled="enableAddEdit"
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
              :disable="loading"
              @click="removeRow"
              :icon="'delete'"
              :disabled="enableDelete"
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
              :disable="loading"
              @click="viewRow"
              :icon="'remove_red_eye'"
              v-if="enableView"
            >
              <q-tooltip
                transition-show="scale"
                transition-hide="scale"
                anchor="top middle"
                self="bottom middle"
              >View data</q-tooltip>
            </q-btn>
            <q-btn
              class="q-ml-sm"
              color="primary"
              :disable="loading"
              @click="refreshTable"
              :icon="'refresh'"
              v-if="enableView"
            >
              <q-tooltip
                transition-show="scale"
                transition-hide="scale"
                anchor="top middle"
                self="bottom middle"
              >Refresh Table</q-tooltip>
            </q-btn>
            <!-- Dynamic Buttons -->
            <q-btn
              v-for="i in extraButtons"
              :key="i.functionName"
              class="q-ml-sm"
              color="primary"
              :icon="i.icon"
              @click="$emit(`${i.functionName}`)"
            >
              <q-tooltip
                transition-show="scale"
                transition-hide="scale"
                anchor="top middle"
                self="bottom middle"
              >{{i.tooltip}}</q-tooltip>
            </q-btn>
            <!--  -->

            <q-space />

            <q-input borderless dense debounce="300" color="primary" v-model="filter">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              class="q-ml-md"
            />
          </template>
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
    </q-card>
  </div>
</template>

<script>
import ApiService from "../services/api.service";

export default {
  async created() {
    await this.initialize();
  },
  mixins: [],
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
    extraButtons: {
      type: [Array, Object], // name, i18n, icon, functionName
      default: () => []
    },
    paginationConfig: {
      type: Object,
      default: () => {
        return {};
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
      defaultPaginationConfig: this.paginationConfig
    };
  },
  computed: {
    selectionKey() {
      return this.enableSelect ? "selection" : "";
    }
  },
  methods: {
    callMethod() {
      console.log(this.extraButtons);
      let fn = this.extraButtons[0].functionName;
      console.log(this);
      this.saveFile();
    },
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
          data.forEach(element => {
            this.itemsArray.push(element);
          });
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
        })
        .catch(err => {
          console.error(err);
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
    }
  }
};
</script>

<style></style>
