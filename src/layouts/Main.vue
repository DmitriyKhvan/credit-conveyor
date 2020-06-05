<template>
  <q-layout view="hHh Lpr lFf" class="contentBg">
    <s-header />
    <s-leftbar />
    <s-content />
    <!-- <s-footer /> -->
  </q-layout>
</template>

<script>
import axios from "axios";
import store from "../store/index";
export default {
  components: {
    SHeader: () => import("./Header"),
    SLeftbar: () => import("./Leftbar"),
    SContent: () => import("./Content"),
    SFooter: () => import("./Footor")
  },

  data() {
    return {};
  },
  beforeCreate: function() {}
};
</script>

<style>
.contentBg {
  background: #f5f6fa;
}
</style>
