<template>
  <q-layout view="lHh Lpr lFf" class="contentBg">
    <s-header />
    <s-leftbar />
    <s-content />
    <!-- <s-footer /> -->
  </q-layout>
</template>

<script>
export default {
  components: {
    SHeader: () => import("./Header"),
    SLeftbar: () => import("./Leftbar"),
    SContent: () => import("./Content"),
    SFooter: () => import("./Footor"),
  },

  data() {
    return {};
  },
  beforeCreate: function () {},
  async created() {
    console.log("main");
    await this.$store.dispatch("themes/getThemes");
  },
};
</script>

<style>
@font-face {
  font-family: "OpenSans";
  src: url(../assets/fonts/OpenSans-Regular.ttf);
}
@font-face {
  font-family: "OpenSans-SemiBold";
  src: url(../assets/fonts/OpenSans-SemiBold.ttf);
}

body {
  font-family: "OpenSans";
  font-size: 14px;
}
strong, b {
  font-family: "OpenSans-SemiBold";
  font-weight: normal;
}
.q-btn__content {
    text-transform: none;
    font-size: 16px;
    font-family: "OpenSans-SemiBold";
}
.q-table th {
  font-family: "OpenSans-SemiBold";
  font-size: 14px;
}

p {
  margin: 0;
}
.contentBg {
  background: #f5f6fa;
}
</style>
