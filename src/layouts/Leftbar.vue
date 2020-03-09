<template>
  <q-drawer
    show-if-above
    :mini="isLeftDrawerClosed"
    bordered
    content-class="bg-grey-2"
    :width="250"
  >
    <q-list>
      <q-item-label header>{{ $t("layout.menu_label") }}</q-item-label>
      <div
        v-for="(menus, index) in menusList"
        :key="index"
        @mouseenter="showMenu(index)"
        @mouseleave="closeMenu(index)"
      >
        <q-menu
          anchor="top right"
          self="top left"
          ref="qmenu"
          @mouseenter="showMenu(index)"
          @mouseleave="closeMenu(index)"
        >
          <q-list style="min-width: 100px">
            <q-item
              v-for="(menuss, index) in getChildMenus(menus)"
              :key="index"
              clickable
              :to="menuss.url"
              :active="(index == 0) ? true:false"
              active-class="text-orange"
              v-ripple
            >
              <q-item-section>{{ menuss.name }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>

        <q-expansion-item
          expand-separator
          :icon="menus.icon"
          :label="menus.name"
          :caption="$t('layout.menu_caption')"
          group="somegroup"
          :to="menus.url"
          exact-active-class="icon-style"
          @show="openExtention(index)"
          @hide="closeExtention(index)"
        >
          <div
            v-for="(menuss, index) in menus.children"
            :key="index"
            style="background-color:#D6DBDF;"
          >
            <q-item clickable :to="menuss.url">
              <q-item-section avatar>
                <q-icon :name="menuss.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ menuss.name }}</q-item-label>
                <q-item-label caption>
                  {{
                  $t("layout.menu_caption")
                  }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-expansion-item>
      </div>
    </q-list>
    <q-page-sticky position="bottom-right" :offset="[-15, 55]">
      <q-btn
        fab
        color="blue"
        style="width: 30px; height: 30px;"
        @click="isLeftDrawerClosed = !isLeftDrawerClosed"
      >
        <q-icon
          :name="isLeftDrawerClosed ? 'keyboard_arrow_right' : 'keyboard_arrow_left'"
          class="absolute-center"
        />
      </q-btn>
    </q-page-sticky>
  </q-drawer>
</template>

<script>
export default {
  name: "Leftbar",
  computed: {
    //menu: this.$store.getters["dicts/getMenuList"],
    isLeftDrawerClosed: {
      get() {
        return this.$store.getters["common/isLeftDrawerClosed"];
      },
      set(val) {
        this.$store.dispatch("common/setLeftDrawerClosed", val);
      }
    },
    menusList() {
      return this.$store.getters["dicts/getMenuList"];
    }
  },
  created() {},
  data() {
    return {
      isExpansionOpen: []
    };
  },
  methods: {
    showMenu(index) {
      this.$refs.qmenu[index].show();
    },
    closeMenu(index) {
      this.$refs.qmenu[index].hide();
    },
    getChildMenus(menus) {
      let myMenuList = [];

      if (this.isLeftDrawerClosed) {
        myMenuList.push(menus);
        if (menus.children) {
          menus.children.forEach(element => {
            myMenuList.push(element);
          });
        }
      } else {
        if (menus.children) {
          menus.children.forEach(element => {
            myMenuList.push(element);
          });
        }
      }
      return myMenuList;
    },
    openExtention(index) {
      this.$refs.qmenu[index].hide();
    },
    closeExtention(index) {
      this.$refs.qmenu[index].show();
    }
  },
  watch: {
    isLeftDrawerClosed() {
      console.log(this.isLeftDrawerClosed);
    }
  }
};
</script>

<style>
.button1 {
  position: fixed;
  background-color: red;
}
</style>
