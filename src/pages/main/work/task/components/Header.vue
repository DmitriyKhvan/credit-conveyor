<template>
  <div>
    <div class="row header" v-if="!isBoardView">
      <div class="col q-py-md q-px-sm bg-white flexBlock">
        <div class="flexBlock">
          <div
            class="flexBlock q-px-md"
            :class="tabNo === 1 ? 'filterActive': ''"
            @click="menuSelect(1)"
          >
            <div class="q-pr-sm">
              <img v-if="tabNo === 1" src="@/assets/icons/New-Document-active.svg" alt />
              <img v-else src="@/assets/icons/New-Document.svg" alt />
            </div>
            <div>
              <b>Новые задания</b>
              <span class="subRed q-pl-sm">
                <b>+3</b>
              </span>
            </div>
          </div>
          <div
            class="flexBlock q-px-md"
            :class="tabNo === 2 ? 'filterActive': ''"
            @click="menuSelect(2)"
          >
            <div class="q-pr-sm">
              <img v-if="tabNo === 2" src="@/assets/icons/Task-Completed-active.svg" alt />
              <img v-else src="@/assets/icons/Task-Completed.svg" alt />
            </div>
            <div>
              <b>Принял(а) задания</b>
            </div>
          </div>
          <div
            class="flexBlock q-px-md"
            :class="tabNo === 3 ? 'filterActive': ''"
            @click="menuSelect(3)"
          >
            <div class="q-pr-sm">
              <img v-if="tabNo === 3" src="@/assets/icons/Clipboard-active.svg" alt />
              <img v-else src="@/assets/icons/Clipboard.svg" alt />
            </div>
            <div>
              <b>Работаю</b>
            </div>
          </div>
          <div
            class="flexBlock q-px-md"
            :class="tabNo === 4 ? 'filterActive': ''"
            @click="menuSelect(4)"
          >
            <div class="q-pr-sm">
              <img v-if="tabNo === 4" src="@/assets/icons/Ok-active.svg" alt />
              <img v-else src="@/assets/icons/Ok.svg" alt />
            </div>
            <div>
              <b>Завершенные задания</b>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row q-gutter-lg header q-pb-md" :class="isBoardView ? 'q-pt-none': 'q-pt-md'">
      <div class="q-pa-sm bg-white vList" @click="changeListView" v-if="!isBoardView">
        <img v-if="isListView" src="@/assets/icons/apps.svg" alt />
        <img v-else src="@/assets/icons/List-1.svg" alt />
      </div>

      <div class="col"></div>
      <q-input
        v-if="isSearchOpen"
        standout
        v-model="searchText"
        label="Поиск"
        bg-color="white"
        @input="searchTask()"
      >
        <template v-slot:append>
          <q-icon
            v-if="searchText !== ''"
            name="close"
            @click="searchText = ''"
            class="cursor-pointer"
          />
          <q-icon name="search" />
        </template>
      </q-input>
      <div v-else class="q-pa-md bg-white flexBlock" @click="setSearchOpen">
        <img src="@/assets/icons/Search.svg" alt />
      </div>
      <q-select
        filled
        v-model="filterType"
        :options="filterTypeOptions"
        label="Сортировать по"
        bg-color="white"
        style="width: 200px"
      />
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      searchText: "",
      filterType: "",
      filterTypeOptions: ["Вид список"],
    };
  },
  created() {
    this.menuSelect(1);
  },
  computed: {
    ...mapState({
      //viewTasks: state => state.tasks.tViewTasks
      //list: state => state.tasks.tList
    }),
    ...mapGetters({
      isSearchOpen: "isSearchOpen",
      tabNo: "tabMenuNo",
      isListView: "getListView",
      isBoardView: "getBoardView",
    }),
  },
  methods: {
    menuSelect(num) {
      //done
      this.$store.dispatch("onTabChange", num);
    },
    changeListView() {
      console.log(this.isListView);
      this.$store.dispatch("changeListView");
    },
    viewChangeTasks() {
      this.$store.dispatch("tChangeManegment");
    },
    setSearchOpen() {
      // done
      this.$store.dispatch("setSearchOpen");
    },
    searchTask() {
      this.$store.commit("setSearchText", this.searchText);
    },
  },
};
</script>
<style scoped>
.flexBlock {
  display: flex;
  align-items: center;
  align-content: center;
}
.header {
  display: flex;
  color: #a0a5ba;
}
.header img {
  vertical-align: bottom;
}
.header .filterActive {
  color: #000;
}
.subGreen {
  color: #47b881;
}
.subYellow {
  color: #fdcc0c;
}
.subRed {
  color: #ff4a4a;
}
.vList,
.flexBlock {
  cursor: pointer;
}
</style>
