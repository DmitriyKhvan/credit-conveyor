<template>
  <!-- <q-page-container>
    <q-layout
      view="hHh lpR fFf"
      container
      style="height: calc(100vh - 70px)"
      class="shadow-2"
      id="eee"
    > -->
      <!-- <q-header reveal elevated class="bg-primary text-white" height-hint="98"> -->
        <!-- <bread-crumb :list="list()" /> -->
        <!-- <sub-header-tab :path="path" />
      </q-header> -->

      <!-- <q-header reveal elevated class="bg-white text-white" height-hint="98"> -->
        <!-- <bread-crumb :list="list()" /> -->
        <!-- <sub-header-tab :path="path" />
      </q-header> -->
      

      <q-page-container 
        v-if="
          path === '/work/credit/sub/profile' || 
          path === '/work/credit/applications' || 
          path === '/universal_manager' ||
          path.indexOf('/work/credit/sub/task') == 0 
        "
      >
        <q-layout
          view="hHh lpR fFf"
          container
          style="height: calc(100vh - 70px)"
          class="shadow-2"
          id="eee"
        >
          <!-- <sub-header-tab :path="path" /> -->
        <router-view />
        </q-layout>
      </q-page-container>
      <q-page-container v-else>
        <router-view />
      </q-page-container>
    <!-- </q-layout>
  </q-page-container> -->
</template>

<script>
// import BreadCrumb from "@/components/BreadCrumb";
import SubHeaderTab from "@/components/SubHeaderTab";

export default {
  name: "Content",
  components: {
    // BreadCrumb,
    SubHeaderTab
  },
  created() {
    //console.log(this.$store.getters["dicts/getMenuList"]);
    // console.log(this.$route.path);
    //this.path = this.$route.path;
  },

  data() {
    return {
      data: null
    };
  },
  computed: {
    path() {
      //console.log(this.$route.path);
      return this.$route.path;
    }
  },
  methods: {
    list() {
      //console.log(this.$route);
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    }
  }
};
</script>

<style></style>
