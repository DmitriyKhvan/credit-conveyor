<template>
  <div class="column">
    <div class="row">
      <div class="col" style="background: red">First column</div>
      <div class="col" style="background: blue">Second column</div>
      <div class="col" style="background: green">Third column</div>
    </div>
    <div class="row">
      <div class="col" style="background: red">First column</div>
      <div class="col" style="background: blue">Second column</div>
      <div class="col" style="background: green">Third column</div>
    </div>
    <q-btn @click="showMessage()"></q-btn>
  </div>
</template>

<script>
import NotifyService from "./../../../../services/notify.service";
export default {
  methods: {
    showMessage() {
      NotifyService.showErrorMessage("hello");
    }
  }
};
</script>

<style></style>
