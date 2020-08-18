<template>
  <div class="row q-pb-md">
    <div class="col">
      <div class="row q-col-gutter-x-md">
        <div class="col buttonFilter" v-if="isNewDocsSection">
          <q-btn
            color="blue-14"
            size="lg"
            :label="'Отправить выбранное: ( '+selectedDocs.length+' )'"
            @click="showMultiDocPopup()"
            :disable="selectedDocs.length === 0"
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
import MultiPopup from "./MultiPopup";
export default {
  data() {
    return {
      rowNum: 5, // default
      rowsPerPageOptions: [1, 3, 5, 10, 50] //selectRowsPerPage, rowsPerPage, page,
    };
  },
  created() {
    this.rowNum = this.rowsPerPage;
  },
  computed: {
    ...mapState({
      selectedDocs: state => state.assistant.selectedDocs
    }),

    ...mapGetters({
      totalPages: "totalPages",
      page: "page",
      rowsPerPage: "rowsPerPage",
      totalRows: "totalRows",
      menuNo: "menuNo"
    }),
    isNewDocsSection() {
      return this.menuNo == 1 ? true : false;
    },
    pageStartNum() {
      return (this.page - 1) * this.rowsPerPage + 1;
    },
    pageEndNum() {
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
    },
    showMultiDocPopup() {
      console.log("multi popup");
      this.$q
        .dialog({
          component: MultiPopup,
          parent: this
          // doc: this.doc
        })
        .onOk(res => {
          console.log({ res: res });
          //obnobvit dokumenti na tekushiy tab
          if (res.status == 1) {
            this.$store.dispatch("getADocs", { num: this.menuNo });
            this.$store.dispatch("resetSelectedDocs");
          }
        })
        .onCancel(() => {
          console.log("Cancel");
        });
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
