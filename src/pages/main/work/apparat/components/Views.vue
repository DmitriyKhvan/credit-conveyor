<template>
  <div class="row q-pb-md">
    <div class="col">
      <div class="row q-col-gutter-x-md">
        <div class="col-4">
          <q-select filled v-model="status" :options="statuses" label="Выбрать статус" />
        </div>
        <div class="col buttonFilter">
          <q-btn
            @click="multiCheck"
            color="blue-14"
            size="lg"
            label="Применить для всех"
            :disable="status === '' || checkeds.length === 0 ? true : false"
          />
        </div>
      </div>
    </div>
    <div class="col text-right navMenu">
      <div>Показано строк:</div>
      <div>
        <q-select
          filled
          v-model="rowNum"
          :options="rowsPerPageOptions"
          bg-color="white"
          dense
          style="width:70px"
          @input="selectPagesNum()"
        />
      </div>
      <div>{{ pageStartNum }} - {{ pageEndNum }} из {{ totalRows }}</div>
      <div class="arrows">
        <div :class="isPrevActive">
          <q-icon name="keyboard_arrow_left" size="sm" @click="onPrev()" />
        </div>
        <div :class="isNextActive">
          <q-icon name="keyboard_arrow_right" size="sm" @click="onNext()" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      status: "",
      //options: [],
      selPage: 5,
      //options2: [1, 5, 10, 15, 20, 50],
      curPage: 1,
      //-------
      rowNum: 5, // default
      rowsPerPageOptions: [1, 3, 5, 10, 50], //selectRowsPerPage, rowsPerPage, page,
    };
  },
  computed: {
    ...mapState({
      statusesList: (state) => state.apparat.filters.statuses,
      checkeds: (state) => state.apparat.aChecked,
    }),
    //==== pagination
    ...mapGetters({
      totalPages: "apparat/totalPages",
      page: "apparat/page",
      rowsPerPage: "apparat/rowsPerPage",
      totalRows: "apparat/totalRows",
    }),

    pageStartNum() {
      if (this.totalRows == 0) return 0;
      else return (this.page - 1) * this.rowsPerPage + 1;
    },
    pageEndNum() {
      return this.rowsPerPage * this.page > this.totalRows
        ? this.totalRows
        : this.rowsPerPage * this.page;
    },
    isPrevActive() {
      if (this.page == 1 || this.totalRows == 0) {
        return "";
      } else return "active";
    },
    isNextActive() {
      if (this.page == this.totalPages || this.totalRows == 0) {
        return "";
      } else return "active";
    },
    // =========
    statuses() {
      return this.statusesList.filter((el) => el.value == 3 || el.value == 4);
    },
  },
  created() {
    this.rowNum = this.rowsPerPage;
  },
  methods: {
    selectPagesNum() {
      console.log({ selRow: this.rowNum });
      this.$store.dispatch("apparat/loadAllDocs", { rows: this.rowNum });
    },
    multiCheck() {
      const arr = {
        doc_id: this.checkeds,
        status: this.status.value,
      };
      this.$store.dispatch("apparat/multiUpdateDocStatus", arr);
    },
    onNext() {
      //console.log("next...");
      if (this.isNextActive) {
        this.$store.dispatch("apparat/loadAllDocs", { page: this.page + 1 });
      }
    },
    onPrev() {
      if (this.isPrevActive) {
        console.log("prev...");
        this.$store.dispatch("apparat/loadAllDocs", { page: this.page - 1 });
      }
    },
  },
};
</script>
<style scoped>
.navMenu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.navMenu div {
  padding: 0 10px;
}
.arrows {
  display: flex;
}
.arrows div {
  cursor: pointer;
  color: #ccc;
}
.arrows div.active {
  color: #000;
}
</style>
