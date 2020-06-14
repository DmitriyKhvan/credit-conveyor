<template>
  <div class="column fonts items-center">
    <div class="title">
      Мои результаты
    </div>
    <q-circular-progress
      show-value
      :value="value"
      size="160px"
      :thickness="0.1"
      color="pink-12"
      track-color="grey-3"
      class="q-ma-md"
    >
      <span style="font-size: 26px;"><b>{{ value }}%</b></span>
      <br><span class="text">{{text}}</span>
    </q-circular-progress>
  </div>
  <!-- <q-card square flat bordered class="height100">
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
  </q-card> -->
</template>

<script>
export default {
  data() {
    return {
      value: 63,
      text: 'Выполнено заданий'
    };
  }
};
</script>

<style scoped>
  @font-face {
    font-family: 'OpenSans';
    src: url(../../../../assets/fonts/OpenSans-Regular.ttf);
  }
  .fonts {
    font-family: 'OpenSans';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #20253A;
  }
  .title {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .text {
    font-size: 16px;
    padding: 10px 20px 0 20px;
    text-align: center;
    line-height: 26px;
  }
</style>
