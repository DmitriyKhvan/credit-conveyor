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
      <div class="col-sm-12 col-md-6 col-lg-6">
        <devices-models />
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6">
        <devices-details />
      </div>
    </div>
  </div>
</template>

<script>
import DevicesTypes from "./DeviceTypes/DeviceTypes";
import DevicesMarks from "./DeviceMarks/DeviceMarks";
import DevicesModels from "./DeviceModels/DeviceModels";
import DevicesDetails from "./DeviceDetails/DeviceDetails";

export default {
  components: {
    DevicesTypes,
    DevicesMarks,
    DevicesModels,
    DevicesDetails
  }
};
</script>

<style></style>
