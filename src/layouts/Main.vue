<template>
  <q-layout view="hHh Lpr lFf">
    <s-header />
    <s-leftbar />
    <s-content />
  </q-layout>
</template>

<script>
import axios from "axios";
import store from "../store/index";
export default {
  components: {
    SHeader: () => import("./Header"),
    SLeftbar: () => import("./Leftbar"),
    SContent: () => import("./Content")
  },

  data() {
    return {};
  },
  beforeCreate: function() {
    //    console.log({ men: this.$store.getters["dicts/getMenuList"] });
    // axios({
    //   method: "GET",
    //   url: "menus/list?lang=2",
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("access_token")
    //   }
    // }).then(res => {
    //   this.menu = res.data[0].items;
    //   // eslint-disable-next-line
    // });
  }
};
</script>

<style></style>
