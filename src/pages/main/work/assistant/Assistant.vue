<template>
  <div class="q-pa-lg">
    <a-header></a-header>
    <template v-if="list">
      <div class="row bg-white q-pa-md q-my-lg">
        <div class="col">
          <a-views></a-views>
          <a-document v-for="d in docList" :key="d.doc_id" :doc="d"></a-document>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row q-my-xs q-col-gutter-lg">
        <div class="col-3" v-for="d in docList" :key="d.doc_id">
          <a-document :doc="d"></a-document>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import Header from "./components/Header";
import Document from "./components/Document";
import Views from "./components/Views";

export default {
  name: "assistant",
  components: {
    AHeader: Header,
    ADocument: Document,
    AViews: Views,
  },
  data() {
    return {
      selectedDocs: [],
    };
  },
  created() {
    this.$store.dispatch("getADocs", { num: 1 });
    //console.log({ docList: this.docList });
  },
  computed: {
    ...mapState({
      //list: (state) => state.assistant.isListView,
      // docs: (state) => state.assistant.aAllDocs,
    }),
    ...mapGetters({
      searchText: "getDocSearchText",
      docs: "getAllDocs",
      list: "isListView",
    }),
    docList() {
      // let filtered = state.taskList.filter(el =>
      //   el.f_task_data.description.includes(searchText)
      // );
      //console.log({ docs: this.docs });
      if (!!this.docs)
        return this.docs.filter((el) => {
          return el.description.includes(this.searchText);
        });
      else return this.docs;
    },
  },
};
</script>
<style lang="scss" scoped></style>
