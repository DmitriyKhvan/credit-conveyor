<template>
  <div class>
    <!-- <q-card class="primary">
      <q-card-section>{{caption}}</q-card-section>
    <q-card-section>-->
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
          :disabled="!enableAddEdit"
          v-if="showAdd"
        >
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="top middle"
            self="bottom middle"
            >Add a new record to table</q-tooltip
          >
        </q-btn>
        <q-btn
          class="q-ml-sm"
          color="primary"
          :disable="!enableAddEdit || !isSelected"
          @click="editRow"
          :icon="'edit'"
          v-if="showEdit"
        >
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="top middle"
            self="bottom middle"
            >Edit and Update table record</q-tooltip
          >
        </q-btn>
        <q-btn
          class="q-ml-sm"
          color="primary"
          :disable="!enableDelete || !isSelected"
          @click="removeRow"
          :icon="'delete'"
          v-if="showDelete"
        >
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="top middle"
            self="bottom middle"
            >Remove selected rows</q-tooltip
          >
        </q-btn>
        <q-btn
          class="q-ml-sm"
          color="primary"
          :disable="!isSelected"
          @click="viewRow"
          :icon="'remove_red_eye'"
          v-if="showView"
        >
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="top middle"
            self="bottom middle"
            >View data</q-tooltip
          >
        </q-btn>
        <q-btn
          class="q-ml-sm"
          color="primary"
          :disable="loading"
          @click="refreshTable"
          :icon="'refresh'"
          v-if="showRefresh"
        >
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="top middle"
            self="bottom middle"
            >Refresh</q-tooltip
          >
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
            >{{ i.tooltip }}</q-tooltip
          >
        </q-btn>
        <!--  -->

        <q-space />

        <q-input
          borderless
          dense
          debounce="300"
          color="primary"
          v-model="filter"
        >
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

      <!-- <template v-slot:body="props">
            <q-tr :props="props">
              
              <q-td v-for="key in visibleColumns" 
                :key="key" 
                :props="props">
                <q-badge color="green">
                  {{ props.row[key] }}
                </q-badge>
                <template v-if="Array.isArray(props.row[key])">
                  массив
                </template>
              </q-td>
            </q-tr>
          </template> -->

      <!-- <template v-slot:body-cell="props">
            <q-td :props="props">
              {{props}}
              <q-badge color="blue" :label="props.value" />
            </q-td>
          </template> -->

      <!-- <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="text-italic text-purple"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template> -->
    </q-table>
    <!-- </q-card-section>
    </q-card> -->
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
    showAdd: {
      type: Boolean,
      default: true
    },
    showEdit: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    showView: {
      type: Boolean,
      default: false
    },
    showRefresh: {
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
    },
    filterColumn: {
      type: [Array, Object],
      default: () => []
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
    selectionKey() {
      return this.enableSelect ? "selection" : "";
    },
    isSelected() {
      return this.selectedRows.length > 0 ? true : false;
    }
  },
  methods: {
    callMethod() {
      let fn = this.extraButtons[0].functionName;
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
          // Filter step
          this.filterColumn.forEach(param => {
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

          //console.log('data', data)
          // sorting coloumns of table
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
                format: (val, row) => {
                  if (Array.isArray(val)) {
                    const lastIdx = val.length - 1;
                    return val.map((i, idx) => {
                      if (lastIdx !== idx) {
                        return i + ", ";
                      } else {
                        return i;
                      }
                    });
                    // return `${val}`
                  } else {
                    return `${val}`;
                  }
                },
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
    addRow() {
      this.$emit("addEdit");
    },
    editRow() {
      this.$emit("addEdit", this.selectedRows);
    },
    removeRow() {
      this.$emit("delRow", { id: this.selectedRows[0][this.rowId] });
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
      this.selectedRows = [];
    }
  }
};
</script>

<style></style>
