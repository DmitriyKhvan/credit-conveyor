<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-6">
        <devices-types />
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6">
        <devices-marks />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <devices-models />
      </div>
    </div>
  </div>
</template>

<script>
import DevicesTypes from "./modules/Devices";
import DevicesMarks from "./modules/DeviceMarks";
import DevicesModels from "./modules/DeviceModels";

export default {
  components: {
    DevicesTypes,
    DevicesMarks,
    DevicesModels
  }
};
</script>

<style></style>
