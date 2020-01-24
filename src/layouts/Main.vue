<template>
  <q-layout view="hHh Lpr lFf">
    <s-header />
    <s-leftbar v-bind:menu="menu" />
    <s-content />
  </q-layout>
</template>

<script>
import axios from "axios";
export default {
  components: {
    SHeader: () => import("./Header"),
    SLeftbar: () => import("./Leftbar"),
    SContent: () => import("./Content")
  },

  data() {
    return {
      menu: null
    };
  },
  beforeCreate: function() {
    //console.log(decoded)
    axios({
      method: "GET",
      url: "menus/list?lang=2",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    }).then(res => {
      this.menu = res.data[0].items;
      // eslint-disable-next-line
      //console.log(this.menu)
    });
  }
};
</script>

<style></style>
