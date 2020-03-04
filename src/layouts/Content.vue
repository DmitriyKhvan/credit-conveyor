<template>
  <q-page-container>
    <q-layout view="hHh lpR fFf" container style="height: 100vh" class="shadow-2">
      <q-header reveal elevated class="bg-primary text-white" height-hint="98">
        <bread-crumb :list="list()" />
        <sub-header-tab :path="path()" />
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </q-page-container>
</template>

<script>
import BreadCrumb from "./../components/BreadCrumb";
import SubHeaderTab from "./../components/SubHeaderTab";
export default {
  name: "Content",
  components: {
    BreadCrumb,
    SubHeaderTab
  },
  created() {
    //console.log(this.$store.getters["dicts/getMenuList"]);
    // console.log(this.$route.path);
  },
  data() {
    return {
      data: null
    };
  },
  methods: {
    list() {
      //console.log(this.$route);
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    },
    path() {
      //console.log(this.$route.path);
      return this.$route.path;
    }
  }
};
</script>

<style></style>
