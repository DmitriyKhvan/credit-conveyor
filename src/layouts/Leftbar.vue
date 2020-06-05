<template>
<div class="leftBar">
  <q-drawer
    show-if-above
    :mini="isLeftDrawerClosed"
    bordered
    content-class="white drawOver"
    :width="255"
    :mini-width="77"
  >
    <q-list>
      <!-- <q-item-label header>{{ $t("layout.menu_label") }}</q-item-label> -->
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <!-- <q-icon name="inbox" /> -->
            <q-img src="~assets/statics/logo.png" style="width:25px" class="titleLogo" />
          </q-item-section>

          <q-item-section>
            <span class="logo__title">Национальный банк</span>
          </q-item-section>
        </q-item>
      </q-list>
      <div v-for="(menus, index) in menusList" :key="index" class="menuLabel">
        <q-list
          v-if="getChildMenus(menus).length !== 0"
          class="menuItem subPopup"
          :id="menus.menu_id"
        >
          <q-item
            v-for="(menuss, index) in getChildMenus(menus)"
            :key="index"
            clickable
            :to="menuss.url"
            active-class="text-black"
            v-ripple
          >
            <q-item-section>{{ menuss.name }}</q-item-section>
          </q-item>
        </q-list>

        <!-- :caption="$t('layout.menu_caption')" описание -->
        <q-expansion-item
          expand-separator
          :icon="menus.icon"
          :label="menus.name"
          @show="eventShow(menus.menu_id)"
          @hide="eventHide(menus.menu_id)"
          group="somegroup"
          :to="menus.url"
          exact-active-class="icon-style"
          :class="'id-' + menus.menu_id"
        >
          <div
            v-for="(menuss, index) in menus.children"
            :key="index"
            class="subMenu"
          >
            <q-item clickable :to="menuss.url">
              <q-item-section avatar>
                <q-icon :name="menuss.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ menuss.name }}</q-item-label>
                <!-- <q-item-label caption>
                  {{ $t("layout.menu_caption") }}
                </q-item-label> -->
              </q-item-section>
            </q-item>
          </div>
        </q-expansion-item>
      </div>
    </q-list>
    <q-page-sticky>
      <q-btn
        fab
        color="blue"
        style="width: 30px; height: 30px;"
        @click="isLeftDrawerClosed = !isLeftDrawerClosed"
      >
        <q-icon
          :name="
            isLeftDrawerClosed ? 'keyboard_arrow_right' : 'keyboard_arrow_left'
          "
          class="absolute-center"
        />
      </q-btn>
    </q-page-sticky>
  </q-drawer>
  </div>
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
      isExpansionOpen: [],
      show: null
    };
  },

  methods: {
    eventShow(id) {
      const popup = document.getElementById(id);
      if (popup) {
        popup.setAttribute("style", "display:none;");
        this.show = id;
      }
    },
    eventHide(id) {
      const popup = document.getElementById(id);
      if (popup) {
        popup.removeAttribute("style");
        this.show = null;
      }
    },
    mOver(id) {
      console.log("mOver ", id);
    },
    mLeave(id) {
      console.log("mLeave ", id);
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
      if (this.isLeftDrawerClosed) {
        const popup = document.getElementsByClassName("menuItem");
        for (var i = 0; i < popup.length; i++) {
          popup[i].removeAttribute("style");
        }
      }
      if (this.show) {
        const popup = document.getElementById(this.show);
        popup.setAttribute("style", "display:none;");
      }
    }
  }
};
</script>

<style lang="scss">
.leftBar {
  .q-item {
    padding: 8px 16px 8px 26px;
  }

  .logo__title {
    font-weight: bold;
    color: #000000;
  }

  .q-item__section--avatar {
    min-width: 50px;
  }

  .q-item__section--side, .cursor-pointer {
    color: #74798C;
  }

  .q-item.q-router-link--active, .q-item--active {
    color: #000000;
    padding-left: 0;

    .q-item__section--avatar {
      color: #0054FE;
      padding-left: 22px;
      padding-right: 26px;
    }

    &::before {
      content: "";
      // height: 48px;
      width: 4px;
      background: #0054FE;
    }
  }

  .subMenu {
    .cursor-pointer::before {
      content: "";
      width: 6px;
      height: 6px;
      border: 1px solid #74798C;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      margin-top: -3px;
      margin-left: 29px;
      background: none;
    }

    .q-item.q-router-link--active::before, .q-item--active::before {
      border: 1px solid #0054FE;
      background: #0054FE;
    }

    .q-item__section--avatar {
      padding-left: 0!important;
    }

    .q-item.q-router-link--active, .q-item--active {
      padding-left: 26px;
    }
  }

  .q-expansion-item--standard.q-expansion-item--expanded > div > .q-expansion-item__border {
    opacity: 0;
  }

  .button1 {
    position: fixed;
    background-color: red;
  }
  .menuLabel {
    position: relative;
  }
  .menuLabel .menuItem {
    display: none;
    position: absolute;
    left: 100%;
    top: 0;
    background: #fff;
    z-index: 10000;
    border: 1px solid rgba(0, 0, 0, 0.12);

    .q-item {
      padding: 8px 26px;
    }
  }
  .menuLabel:hover .menuItem {
    display: block;
  }
  .drawOver {
    overflow: visible;
  }

  .menuItem .q-item__section--main {
    display: block !important;
    text-align: left !important;
    align-self: center;
  }
  .q-item__section {
    position: relative;
  }

  .q-item__label {
    text-align: left;
  }

  .fixed-bottom-right, .absolute-bottom-right {
    bottom: 50%;
    right: 0;
    transform: translate(50%, 0)!important;
  }
}
</style>
