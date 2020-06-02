<template>
  <div class="row">
    <div class="col-6">
      <types />
    </div>
    <div class="col-6">
      <list />
    </div>
  </div>
</template>

<script>
// import Icons from "./icons/Icons";
// import IconsType from "./icons/IconsType";

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
