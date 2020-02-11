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
  beforeCreate: function() {}
};
</script>

<style></style>
