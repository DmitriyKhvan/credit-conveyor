<template>
  <div>
    <div class="row header" v-if="!viewTasks">
      <div class="bg-white row no-wrap justify-between full-width q-pa-md">
        <div
          class="flexBlock q-px-md"
          :class="menu === 1 ? 'filterActive': ''"
          @click="menuSelect(1)"
        >
          <div class="q-pr-sm">
            <q-icon v-if="menu === 1" name="r_article" size="20px" style="color: #0054FE" />
            <q-icon v-else name="r_article" size="20px" style="color: #A0A5BA" />
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
          :class="menu === 2 ? 'filterActive': ''"
          @click="menuSelect(2)"
        >
          <div class="q-pr-sm">
            <q-icon
              v-if="menu === 2"
              name="r_assignment_turned_in"
              size="20px"
              style="color: #0054FE"
            />
            <q-icon v-else name="r_assignment_turned_in" size="20px" style="color: #A0A5BA" />
          </div>
          <div>
            <b>Принял(а) задания</b>
          </div>
        </div>
        <div
          class="flexBlock q-px-md"
          :class="menu === 3 ? 'filterActive': ''"
          @click="menuSelect(3)"
        >
          <div class="q-pr-sm">
            <q-icon v-if="menu === 3" name="r_assignment" size="20px" style="color: #0054FE" />
            <q-icon v-else name="r_assignment" size="20px" style="color: #A0A5BA" />
          </div>
          <div>
            <b>Работаю</b>
          </div>
        </div>
        <div
          class="flexBlock q-px-md"
          :class="menu === 4 ? 'filterActive': ''"
          @click="menuSelect(4)"
        >
          <div class="q-pr-sm">
            <q-icon v-if="menu === 4" name="r_check_circle" size="20px" style="color: #0054FE" />
            <q-icon v-else name="r_check_circle" size="20px" style="color: #A0A5BA" />
          </div>
          <div>
            <b>Завершенные задания</b>
          </div>
        </div>
        <div
          class="flexBlock q-px-md"
          :class="menu === 5 ? 'filterActive': ''"
          @click="menuSelect(5)"
        >
          <div class="q-pr-sm">
            <q-icon v-if="menu === 5" name="r_check_circle" size="20px" style="color: #0054FE" />
            <q-icon v-else name="r_check_circle" size="20px" style="color: #A0A5BA" />
          </div>
          <div>
            <b>Мои задачи</b>
          </div>
        </div>
      </div>
    </div>

    <div
      class="row header q-pb-md justify-between no-wrap"
      :class="viewTasks ? 'q-pt-none': 'q-pt-md'"
    >
      <div class="row no-wrap">
        <div @click="viewList" @mouseup="setTab(1)" v-if="!viewTasks">
          <q-btn
            v-if="list"
            size="90"
            icon="apps"
            color="white"
            :text-color="dtab === 1 ? 'blue-6' : 'grey'"
            flat
            class="bg-white q-py-sm"
          />
          <q-btn
            v-else
            size="90"
            icon="list"
            color="white"
            :text-color="dtab === 1 ? 'blue-6' : 'grey'"
            flat
            class="bg-white q-py-sm"
          />
        </div>
        <div @click="setTab(2)">
          <q-btn
            size="90"
            icon="check_box_outline_blank"
            color="white"
            :text-color="dtab === 2 ? 'blue-6' : 'grey'"
            flat
            class="bg-white q-ml-md q-py-sm"
          />
        </div>
      </div>

      <div class="row no-wrap">
        <q-input v-if="searchChek" standout v-model="text" label="Поиск" bg-color="white">
          <template v-slot:append>
            <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
            <q-icon name="search" />
          </template>
        </q-input>
        <div v-else class="q-pa-md bg-white flexBlock" @click="searchChange">
          <img src="@/assets/icons/Search.svg" alt />
        </div>
        <q-select
          filled
          v-model="model"
          :options="options"
          label="Сортировать по"
          bg-color="white"
          style="width: 200px"
          class="q-ml-sm"
        />
      </div>
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
      // edit
      text: "",
      model: "",
      options: ["Вид список"],
      tab: 1,
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
      countNew: "getCountNew",
    }),
    // edit
    ...mapState({
      viewTasks: (state) => state.tasks.tViewTasks,
      list: (state) => state.tasks.tList,
      menu: (state) => state.tasks.tMenu,
      searchChek: (state) => state.tasks.tSearch,
      dtab: (state) => state.tasks.tTab,
    }),
  },
  methods: {
    menuSelect(num) {
      //done
      this.$store.dispatch("onTabChange", num);
    },
    setTab(n) {
      this.$store.dispatch("tTabChange", n);
    },
    menuSelect(num) {
      this.$store.dispatch("tMenuChange", num);
    },
    changeListView() {
      //console.log(this.isListView);
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
    onClearSearch() {
      this.searchText = "";
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
