<template>
  <div class="tabsCol">
    <div class="row">
      <div class="col-12 q-pa-lg">
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-3 text-black"
          active-color="text-white"
          indicator-color="primary"
          align="justify"
          narrow-indicator
          inline-label
        >
          <q-tab name="equipment" icon="personal_video" label="Оборудование" />
          <q-tab name="brands" icon="layers" label="Производители" />
          <q-tab name="models" icon="dvr" label="Модели" />
          <q-tab name="details" icon="settings" label="Детали" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="equipment">
            <devices-types />
          </q-tab-panel>

          <q-tab-panel name="brands">
            <devices-marks />
          </q-tab-panel>

          <q-tab-panel name="models">
            <devices-models />
          </q-tab-panel>
          
          <q-tab-panel name="details">
            <devices-details />
          </q-tab-panel>
        </q-tab-panels>

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
  },
  data () {
    return {
      tab: 'equipment'
    }
  }
};
</script>

<style>
.tabsCol .q-field  {
  border: 1px #ccc solid;
  padding-left: 10px 
}
.tabsCol .q-tab--active  {
  background:#2196f3 ;
  color: #fff;
}
.tabsCol .sortable {
  color: #2196f3;
}
.tabsCol .q-table {
  border-top:1px #2196f3 solid
}
</style>
