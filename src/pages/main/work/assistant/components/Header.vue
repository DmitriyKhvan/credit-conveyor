<template>
  <div>
    <div class="row header">
      <div class="col q-py-md q-px-sm bg-white flexBlock">
        <div class="flexBlock">
          <div
            class="flexBlock q-px-md"
            :class="menu === 1 ? 'filterActive' : ''"
            @click="menuSelect(1)"
          >
            <div class="q-pr-sm">
              <img v-if="menu === 1" src="@/assets/icons/New-Document-active.svg" alt />
              <img v-else src="@/assets/icons/New-Document.svg" alt />
            </div>
            <div>
              <b>Новые документы</b>
              <span class="subRed q-pl-sm">
                <b>{{countNew}}</b>
              </span>
            </div>
          </div>
          <div
            class="flexBlock q-px-md"
            :class="menu === 2 ? 'filterActive' : ''"
            @click="menuSelect(2)"
          >
            <div class="q-pr-sm">
              <img v-if="menu === 2" src="@/assets/icons/Task-Completed-active.svg" alt />
              <img v-else src="@/assets/icons/Task-Completed.svg" alt />
            </div>
            <div>
              <b>Готов к отправке</b>
              <span class="subRed q-pl-sm">
                <b>{{countReady}}</b>
              </span>
            </div>
          </div>
          <div
            class="flexBlock q-px-md"
            :class="menu === 3 ? 'filterActive' : ''"
            @click="menuSelect(3)"
          >
            <div class="q-pr-sm">
              <img v-if="menu === 3" src="@/assets/icons/Ok-active.svg" alt />
              <img v-else src="@/assets/icons/Ok.svg" alt />
            </div>
            <div>
              <b>Отправленные</b>
              <span class="subRed q-pl-sm">
                <b>{{countSent}}</b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row q-gutter-lg header q-pb-md q-pt-md">
      <!-- search input -->
      <q-input
        v-if="isSearchOpen"
        standout
        v-model="searchText"
        label="Поиск"
        bg-color="white"
        color="grey-3"
        label-color="black"
        @input="searchDoc()"
      >
        <template v-slot:append>
          <q-icon
            v-if="searchText !== ''"
            name="close"
            @click="onClearSearch"
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
        v-model="listView"
        :options="listViewOptions"
        bg-color="white"
        style="width: 200px"
        @input="onSelectListView()"
      />
      <div class="col"></div>
      <q-select
        filled
        v-model="sortBy"
        :options="sortOptions"
        label="Сортировать по"
        bg-color="white"
        style="width: 200px"
        @input="onSelectSortBy()"
      />
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      listView: null,
      listViewOptions: [
        {
          label: "Вид Список",
          value: 1
        },
        {
          label: "Вид Карточный",
          value: 2
        }
      ],
      searchText: "",
      sortOptions: [
        {
          label: "Date",
          value: 1
        },
        {
          label: "Name",
          value: 2
        }
      ],
      sortBy: null
    };
  },
  created() {
    this.sortBy = this.sortOptions[0];
    this.listView = this.listViewOptions[0];
  },
  computed: {
    ...mapState({
      menu: state => state.assistant.aMenu
    }),
    ...mapGetters({
      isSearchOpen: "assistant/isSearchOpen",
      countNew: "assistant/getCountNew",
      countReady: "assistant/getCountReady",
      countSent: "assistant/getCountSent"
    })
  },
  methods: {
    menuSelect(num) {
      this.$store.dispatch("assistant/getADocs", { num: num });
    },
    onSelectListView() {
      if (this.listView.value == 1) {
        this.$store.dispatch("assistant/setIsListView", true);
      } else {
        this.$store.dispatch("assistant/setIsListView", false);
      }
    },
    onSelectSortBy() {
      console.log({ sortBy: this.sortBy });

      this.$store.dispatch("assistant/getADocs", { sortBy: this.sortBy.value });
      //
    },
    setSearchOpen() {
      // done
      this.$store.commit("assistant/setSearchOpen");
    },
    searchDoc() {
      //console.log({ text: this.searchText });
      //this.$store.commit("assistant/setDocSearchText", this.searchText);
      this.$store.dispatch("assistant/getADocs", { search: this.searchText });
    },
    onClearSearch() {
      this.searchText = "";
      this.$store.dispatch("assistant/getADocs", { search: this.searchText });

      //this.$store.commit("assistant/setDocSearchText", this.searchText);
    }
  }
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
