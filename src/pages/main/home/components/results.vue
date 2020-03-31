<template>
  <q-card square flat bordered class="height100">
    <q-card-section class="bg-grey-3">
      <div class="text-h6">{{$t('main.results.myResults')}}</div>
    </q-card-section>

    <div class="row">
      <div class="col q-pa-lg text-center">
        <q-circular-progress
          show-value
          :value="value"
          size="250px"
          :thickness="0.22"
          color="teal"
          track-color="grey-3"
          class="q-ma-md"
        >
          <span style="font-size: 30px">{{ value }}%</span>
        </q-circular-progress>
      </div>
    </div>
    <div class="row justify-between text-center">
      <div class="col-4">
        <q-circular-progress
          show-value
          :value="value"
          size="100px"
          :thickness="0.22"
          color="warning"
          track-color="grey-3"
          class="q-ma-md"
        >
          <span style="font-size: 22px">{{ value }}</span>
        </q-circular-progress>
      </div>
      <div class="col-4">
        <q-circular-progress
          show-value
          :value="value"
          size="100px"
          :thickness="0.22"
          color="negative"
          track-color="grey-3"
          class="q-ma-md"
        >
          <span style="font-size: 22px">{{ value }}</span>
        </q-circular-progress>
      </div>
      <div class="col-4">
        <q-circular-progress
          show-value
          :value="value"
          size="100px"
          :thickness="0.22"
          color="positive"
          track-color="grey-3"
          class="q-ma-md"
        >
          <span style="font-size: 22px">{{ value }}</span>
        </q-circular-progress>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      value: 63,
      planned: "",
      relevant: "",
      completed: ""
    };
  }
};
</script>

<style lang="sass">

</style>