<template>
  <q-tabs align="left">
    <q-route-tab
      :to="menu.url"
      :key="index"
      v-for="(menu, index) in getSubMenus"
      class="bg-primary text-white"
    >
      <span>
        <q-icon v-if="menu.icon" :name="menu.icon" />
        {{menu.name}}
      </span>
    </q-route-tab>
  </q-tabs>
</template>

<script>
import CommonUtils from "../shared/utils/CommonUtils";
export default {
  props: {
    path: {
      type: String,
      default: "/main"
    }
  },
  data() {
    return {
      menus: this.$store.getters["dicts/getMenuList"],
      temp: []
    };
  },
  created() {
    //console.log(this.getSubMenus());
  },
  computed: {
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

<style>
</style>
