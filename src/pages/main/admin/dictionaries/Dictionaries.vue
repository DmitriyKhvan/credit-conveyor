<template>
  <div class="row">
    <div class="col-12 q-pa-sm">
      <types />
    </div>
    <div class="col-12 q-pa-sm">
      <list />
    </div>
  </div>
</template>

<script>
import Types from "./types/Types";
import List from "./list/List";

export default {
  data() {
    return {};
  },
  created() {},
  components: {
    // Icons,
    // IconsType,
    List,
    Types
  }
};
</script>

<style>
</style>
