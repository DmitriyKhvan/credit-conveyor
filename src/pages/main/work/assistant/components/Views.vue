<template>
  <div class="row q-pb-md">
    <div class="col">
      <div class="row q-col-gutter-x-md">
        <div class="col buttonFilter" v-if="isNewDocsSection">
          <q-btn
            color="blue-14"
            size="lg"
            :label="selectedDocs.length !== 0 ? 'Отправить выбранное: ( '+selectedDocs.length+' )':'Отправить выбранное'"
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
      <div>{{ pageStartNum }} - {{ pageEndNum }} из {{ totalRows }}</div>
      <div class="arrows">
        <div :class="isPrevActive">
          <q-icon name="keyboard_arrow_left" size="sm" @click="onPrev" />
        </div>
        <div :class="isNextActive">
          <q-icon name="keyboard_arrow_right" size="sm" @click="onNext" />
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
      rowsPerPageOptions: [1, 3, 5, 10, 50], //selectRowsPerPage, rowsPerPage, page,
    };
  },
  created() {
    this.rowNum = this.rowsPerPage;
  },
  computed: {
    ...mapState({
      selectedDocs: (state) => state.assistant.selectedDocs,
    }),

    ...mapGetters({
      totalPages: "assistant/totalPages",
      page: "assistant/page",
      rowsPerPage: "assistant/rowsPerPage",
      totalRows: "assistant/totalRows",
      menuNo: "assistant/menuNo",
    }),
    isNewDocsSection() {
      return this.menuNo == 1 ? true : false;
    },
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
      if (this.page == 1) {
        return "";
      } else return "active";
    },
    isNextActive() {
      if (this.page == this.totalPages) {
        return "";
      } else return "active";
    },
  },
  methods: {
    selectPagesNum() {
      this.$store.dispatch("assistant/getADocs", { rows: this.rowNum });
    },
    showMultiDocPopup() {
      console.log("multi popup");
      this.$q
        .dialog({
          component: MultiPopup,
          parent: this,
          // doc: this.doc
        })
        .onOk((res) => {
          console.log({ res: res });
          //obnobvit dokumenti na tekushiy tab
          if (res.status == 1) {
            this.$store.dispatch("assistant/getADocs", { num: this.menuNo });
            this.$store.dispatch("assistant/resetSelectedDocs");
          }
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    },
    onNext() {
      console.log("next...");
      if (this.isNextActive) {
        this.$store.dispatch("assistant/getADocs", { page: this.page + 1 });
      }
    },
    onPrev() {
      if (this.isPrevActive) {
        console.log("prev...");
        this.$store.dispatch("assistant/getADocs", { page: this.page - 1 });
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
