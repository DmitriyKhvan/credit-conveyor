<template>
  <div class="q-pa-md">
    <q-table
      title="Monitoring"
      class="my-sticky-header-table"
      :data="data"
      separator="cell"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
      :loading="loading"
      @row-click="clickRow"
      binary-state-sort
      rows-per-page-label="Записей на странице:"
    >
      <template v-slot:top="props">
        <q-btn color="primary" :disable="isBackDisabled" icon="arrow_back" @click="goBack()">
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">Назад</q-tooltip>
        </q-btn>

        <q-space />

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props" class="bg-blue-2">
            <div class="text-black text-bold text-subtitle1">{{ col.label }}</div>
          </q-th>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  // !!! 1.check coloumn data is object if so prettify

  created() {
    if (this.step == 0) {
      this.loadTestList(done => {
        if (done) {
          this.step++;
        }
        this.loading = false;
      });
    }
  },
  data() {
    return {
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      step: 0,
      loading: false,
      columns: [],
      data: [],
      selectedTest: null,
      depCode: null,
      empId: null
    };
  },
  computed: {
    isBackDisabled() {
      console.log(this.step);
      return this.step > 1 ? false : true;
    }
  },
  methods: {
    clickRow(evt, row) {
      console.log({ clicked: row });
      console.log({ step: this.step });

      if (this.step == 0) {
        this.loadTestList(done => {
          console.log({ done });
          if (done) {
            this.step++;
          }
          this.loading = false;
        });
      } else if (this.step == 1) {
        this.selectedTest = row.id;

        this.loadParentDeps(this.selectedTest, done => {
          if (done) {
            this.step++;
            //this.depCode = row.CODE;
          }
          this.loading = false;
        });
      } else if (this.step == 2) {
        this.depCode = row.CODE;

        this.loadDepEmps(this.selectedTest, this.depCode, done => {
          if (done) {
            this.step++;
          }
          this.loading = false;
        });
      } else if (this.step == 3) {
        this.empId = row.EMP_ID;
        this.loadEmpData(this.selectedTest, this.empId, done => {
          if (done) {
            this.step++;
          }
          this.loading = false;
        });
      } else {
        console.log("else case met");
      }
    },
    prepareTableProperties(data) {
      if (data.length > 0) {
        // initializing columns
        let col = {
          name: "#",
          label: "#",
          align: "center",
          field: "no"
        };
        this.columns.push(col);

        Object.keys(data[0]).forEach(key => {
          let col = {
            name: key.toUpperCase(),
            align: "center",
            label: key.toUpperCase(),
            field: key
          };
          this.columns.push(col);
        });
        // === initializing data
        data.forEach((val, index) => {
          data[index].no = index + 1;
        });
        this.data = data;
      }
      //this.loading = false;
    },
    goBack() {
      if (this.step == 2) {
        this.loadTestList(done => {
          console.log({ done });
          if (done) {
            this.step--;
          }
          this.loading = false;
        });
      } else if (this.step == 3) {
        this.loadParentDeps(this.selectedTest, done => {
          if (done) {
            this.step--;
          }
          this.loading = false;
        });
      } else if (this.step == 4) {
        this.loadDepEmps(this.selectedTest, this.depCode, done => {
          if (done) {
            this.step--;
          }
          this.loading = false;
        });
      } else if (this.step == 5) {
        this.loadEmpData(this.selectedTest, this.empId, done => {
          if (done) {
            this.step--;
          }
          this.loading = false;
        });
      }
    },

    loadTestList(callback) {
      this.loading = true;
      this.columns = [];
      this.data = [];

      this.$axios
        .get("test/monitoring/list")
        .then(
          resp => {
            this.prepareTableProperties(resp.data);
            callback(true);
          },
          error => {
            console.log(error);
            callback(false);
          }
        )
        .catch(error => {
          console.log(error);
          callback(false);
        });
    },
    loadParentDeps(testId, callback) {
      this.loading = true;
      this.columns = [];
      this.data = [];

      this.$axios
        .get(`test/monitoring/pdeps?testId=${testId}`)
        .then(
          resp => {
            this.prepareTableProperties(resp.data);
            callback(true);
          },
          error => {
            console.log(error);
            callback(false);
          }
        )
        .catch(error => {
          console.log(error);
          callback(false);
        });
    },
    loadDepEmps(testId, depCode, callback) {
      this.loading = true;
      this.columns = [];
      this.data = [];

      console.log({
        test_id: testId,
        dep_code: depCode
      });
      this.$axios
        .post("test/monitoring/demps", {
          test_id: testId,
          dep_code: depCode
        })
        .then(
          resp => {
            this.prepareTableProperties(resp.data);
            callback(true);
          },
          error => {
            console.log(error);
            callback(false);
          }
        )
        .catch(error => {
          console.log(error);
          callback(false);
        });
    },
    loadEmpData(testId, empId, callback) {
      this.loading = true;
      this.columns = [];
      this.data = [];

      this.$axios
        .post("test/monitoring/emp", {
          test_id: testId,
          emp_id: empId
        })
        .then(
          resp => {
            this.prepareTableProperties(resp.data);
            callback(true);
          },
          error => {
            console.log(error);
            callback(false);
          }
        )
        .catch(error => {
          console.log(error);
          callback(false);
        });
    }
  }
};
</script>

<style lang="sass">
.my-table-details
  font-size: 0.85em;
  font-style: italic;
  max-width: auto !important;
  white-space: normal;
  min-width: 100px;
  color: #555;
  margin-top: 4px;

.my-sticky-header-table
  height: 100vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: white

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0
  &.q-table--loading thead tr:last-child th
    top: 48px
</style>
