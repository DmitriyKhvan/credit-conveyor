<template>
  <div class="subMenuCont">
    <q-tabs align="left">
      <q-route-tab
        :to="menu.url"
        :key="index"
        v-for="(menu, index) in getSubMenus"
        class="bg-white text-grey"
        :class="menu.url == '/work/credit/registration' ? 'createCredit' : null"
      >
        <span>
          <q-icon v-if="menu.icon" :name="menu.icon" />
          {{menu.name}}
        </span>
      </q-route-tab>
    </q-tabs>                               
  </div>
</template>

<script>
import CommonUtils from "@/shared/utils/CommonUtils";
import { mapGetters } from "vuex";

export default {
  props: {
    path: {
      type: String,
      default: "/main"
    }
  },
  data() {
    return {
      temp: []
    };
  },
  created() {
    //console.log(this.getSubMenus());
  },
  computed: {
    ...mapGetters({
      menus: "dicts/getMenuList"
    }),
    currentPath() {
      return this.path;
    },
    getSubMenus() {
      if (CommonUtils.getChildMenus(this.menus, this.path)) {
        this.temp = CommonUtils.getChildMenus(this.menus, this.path);
        return this.temp;
      } else {
        return this.temp;
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss">
  .subMenuCont {
    background: #ffffff;
    margin: 30px 10px;
    border-radius: 5px;
    .q-tab--active .q-tab__indicator {
      opacity: 0;
    }

    .q-tab--active {
      color: #282D30!important;

      .q-icon {
        color: #0054FE;
      }
    }

    .q-tab {
      text-transform: none;
      font-size: 16px;
      font-weight: 600;
    }

    .createCredit {
      background: #47B881!important;
      color: #ffffff!important;
      border-radius: 5px;

      .q-icon {
        color: #ffffff;
      }
    }

    .q-icon {
      font-size: 20px;
    }
  }
</style>
