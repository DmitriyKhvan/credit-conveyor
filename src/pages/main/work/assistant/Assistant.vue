<template>
  <div class="q-pa-lg">
    <a-header></a-header>
    <template v-if="list">
      <div class="row bg-white q-pa-md q-my-lg">
        <div class="col">
          <a-views></a-views>
          <a-document v-for="d in docs" :key="d.doc_id" :doc="d"></a-document>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row q-my-xs q-col-gutter-lg">
        <div class="col-3" v-for="d in docs" :key="d.doc_id">
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

//import userList from "./user.json";

export default {
  name: "assistant",
  components: {
    AHeader: Header,
    ADocument: Document,
    AViews: Views
  },
  data() {
    return {
      selectedDocs: []
    };
  },
  computed: {
    ...mapState({
      list: state => state.assistant.isListView,
      docs: state => state.assistant.aAllDocs
    })
  },
  created() {
    //console.log({ docs: this.docs });
    this.$store.dispatch("getADocs", 1);
  }
};
</script>
<style lang="scss" scoped>
</style>



