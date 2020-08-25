<template>
  <div>
    <div class="row header" v-if="!isBoardView">
      <div class="bg-white row no-wrap justify-between full-width q-pa-md">
        <div
          class="flexBlock q-px-md"
          :class="tabNo === 1 ? 'filterActive': ''"
          @click="menuSelect(1)"
        >
          <div class="q-pr-sm">
            <q-icon v-if="tabNo === 1" name="r_article" size="20px" style="color: #0054FE" />
            <q-icon v-else name="r_article" size="20px" style="color: #A0A5BA" />
          </div>
          <div>
            <b>Новые задания</b>
            <span class="subRed q-pl-sm">
              <b>+{{countNew}}</b>
            </span>
          </div>
        </div>
        <div
          class="flexBlock q-px-md"
          :class="tabNo === 2 ? 'filterActive': ''"
          @click="menuSelect(2)"
        >
          <div class="q-pr-sm">
            <q-icon
              v-if="tabNo === 2"
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
          :class="tabNo === 3 ? 'filterActive': ''"
          @click="menuSelect(3)"
        >
          <div class="q-pr-sm">
            <q-icon v-if="tabNo === 3" name="r_assignment" size="20px" style="color: #0054FE" />
            <q-icon v-else name="r_assignment" size="20px" style="color: #A0A5BA" />
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
            <q-icon v-if="tabNo === 4" name="r_check_circle" size="20px" style="color: #0054FE" />
            <q-icon v-else name="r_check_circle" size="20px" style="color: #A0A5BA" />
          </div>
          <div>
            <b>Завершенные задания</b>
          </div>
        </div>
        <div
          class="flexBlock q-px-md"
          :class="tabNo === 5 ? 'filterActive': ''"
          @click="menuSelect(5)"
        >
          <div class="q-pr-sm">
            <q-icon v-if="tabNo === 5" name="r_check_circle" size="20px" style="color: #0054FE" />
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
      :class="isBoardView ? 'q-pt-none': 'q-pt-md'"
    >
      <div class="row no-wrap">
        <!-- :text-color="dtab === 1 ? 'blue-6' : 'grey'" -->
        <div @click="changeListView">
          <q-btn
            v-if="isListView"
            size="90"
            icon="apps"
            color="grey"
            flat
            class="bg-white q-py-sm"
          />
          <!--  :text-color="dtab === 1 ? 'blue-6' : 'grey'" -->
          <q-btn v-else size="90" icon="list" color="blue-6" flat class="bg-white q-py-sm" />
        </div>
        <!-- :text-color="dtab === 2 ? 'blue-6' : 'grey'" -->
        <div @click="onBoardView()">
          <q-btn
            size="90"
            icon="check_box_outline_blank"
            color="white"
            flat
            class="bg-white q-ml-md q-py-sm"
          />
        </div>
      </div>

      <div class="row no-wrap">
        <q-input
          v-if="isSearchOpen"
          standout
          v-model="searchText"
          @input="searchTask()"
          label="Поиск"
          bg-color="white"
        >
          <template v-slot:append>
            <q-icon
              v-if="searchText !== ''"
              name="close"
              @click="onClearSearch()"
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
      filterTypeOptions: ["Вид список"], // type of brick
      // edit
      //text: "",
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
      //viewTasks: (state) => state.tasks.tViewTasks,
      //list: (state) => state.tasks.tList,
      //menu: (state) => state.tasks.tMenu,
      //searchChek: (state) => state.tasks.tSearch,
      dtab: (state) => state.tasks.tTab,
    }),
  },
  methods: {
    menuSelect(num) {
      //done
      this.$store.dispatch("onTabChange", num);
    },
    // setTab(n) {
    //   this.$store.dispatch("tTabChange", n);
    // },
    onBoardView() {
      console.log("on board click... ");
      //
      if (!this.isBoardView) {
        this.$store.dispatch("changeBoardView");
      }
    },
    // menuSelect(num) {
    //   this.$store.dispatch("tMenuChange", num);
    // },
    changeListView() {
      //console.log(this.isListView);
      //console.log("... >>");
      if (this.isBoardView) {
        this.$store.dispatch("changeBoardView");
      } else {
        this.$store.dispatch("changeListView");
      }
      //
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
