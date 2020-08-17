<template>
  <div class="row q-pb-md">
    <div class="col">
      <div class="row q-col-gutter-x-md">
        <div class="col buttonFilter">
          <!-- <a-popup></a-popup> -->
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
      <div>{{ pageStartNum }} - {{ pageEndNum }} из {{ totalPages }}</div>
      <div class="arrows">
        <div>
          <q-icon name="keyboard_arrow_left" size="sm" />
        </div>
        <div class="active">
          <q-icon name="keyboard_arrow_right" size="sm" />
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
      rowNum: 5, // default
      rowsPerPageOptions: [1, 3, 5, 10, 50] //selectRowsPerPage, rowsPerPage, page,
    };
  },
  created() {
    console.log({ totalPages: this.totalPages, rowsPerPage: this.rowsPerPage });
    this.rowNum = this.rowsPerPage;
  },
  computed: {
    ...mapState({
      //page: state => state.assistant.page,
      //rowsPerPage: state => state.assistant.rowsPerPage,
      //totalRows: state => state.assistant.totalRows
    }),
    ...mapGetters({
      totalPages: "totalPages",
      page: "page",
      rowsPerPage: "rowsPerPage",
      totalRows: "totalRows"
    }),
    pageStartNum() {
      return (this.page - 1) * this.rowsPerPage + 1;
    },
    pageEndNum() {
      console.log({
        totalRows: this.totalRows,
        rowsPerPage: this.rowsPerPage
      });
      return this.rowsPerPage * this.page > this.totalRows
        ? this.totalRows
        : this.rowsPerPage * this.page;
    },
    pageNext() {
      console.log({});
    }
  },
  methods: {
    selectPagesNum() {
      this.$store.dispatch("getADocs", { rows: this.rowNum });
    }
  }
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
