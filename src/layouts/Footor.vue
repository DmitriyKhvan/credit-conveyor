<template>
  <q-footer elevated class="bg-grey-8" :style="'background' + themes.footerColor">
    <q-bar>
      <div>
        <span class="ml-1">NBU &copy; 2020 IT Department.</span>
      </div>
      <div class="ml-auto">
        <span class="ml-1">Personal Plus</span>
      </div>
    </q-bar>
  </q-footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   computed: {
    ...mapGetters({
      themes: "themes/themes"
    })
  }
};
</script>

<style>
</style>
