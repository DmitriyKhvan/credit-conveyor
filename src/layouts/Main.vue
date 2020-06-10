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
    SFooter: () => import("./Footor")
  },

  data() {
    return {};
  },
  async created() {
    console.log('main')
    await this.$store.dispatch("themes/getThemes")
  }
};
</script>

<style>
  @font-face {
    font-family: 'OpenSans';
    src: url(../assets/fonts/OpenSans-Regular.ttf);
  }

  body {
    font-family: 'OpenSans';
    font-size: 14px;
  }

  p {
    margin: 0;
  }

  .contentBg {
    background: #F5F6FA;
  }

</style>
