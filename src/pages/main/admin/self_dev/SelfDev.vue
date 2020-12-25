<template>
  <div>
    <sub-header-tab :path="path" />
    <router-view />
  </div>
</template>

<script>
import SubHeaderTab from "@/components/SubHeaderTab";

export default {
  components: {
    SubHeaderTab
  },
  computed: {
    path() {
      //console.log(this.$route.path);
      return this.$route.path;
    }
  }
};
</script>

<style></style>
