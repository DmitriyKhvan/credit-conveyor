<template>
  <div>
    <div class="row items-center q-pa-lg">
      <div class="labelFilter">
        Всего документов
      </div>
      <div class="col-3 q-px-md">
        <q-select outlined v-model="model" :options="options" label="За текущий год" />
      </div>
      <div class="labelFilter q-pl-lg">
        Журнал
      </div>
      <div class="col-3 q-px-md">
        <q-select outlined v-model="model" :options="options" label="Центральный банк" />
      </div>
      <div class="col"></div>
    </div>

    <div class="row items-center q-pb-lg q-px-lg">
      <div class="labelFilter">
        Регион
      </div>
      <div class="col-3 q-px-md">
        <q-select outlined v-model="model" :options="options" label="За текущий год" />
      </div>
      <div class="labelFilter q-pl-lg">
        Организация
      </div>
      <div class="col-3 q-px-md">
        <q-select outlined v-model="model" :options="options" label="Центральный банк" />
      </div>
      <div class="col q-pl-md">
        <q-btn color="blue-14" label="Применить фильтр" size="lg"/>
      </div>
    </div>

    <div class="row q-pa-lg q-mt-lg text-center bg_botbg">
      <div class="col-11">
        <div class="row items-center">
          <div class="col title">
            <strong>1 376 документов</strong>
          </div>
          <div>
            <q-knob
              readonly
              v-model="value"
              size="125px"
              :thickness="0.15"
              color="green-6"
              track-color="grey-4"
              class="text-orange q-ma-md"
              show-value
            >
              <div class="numBlock"><strong>{{value}}%</strong><br><span class="num">Готово</span></div>
            </q-knob>
          </div>
          <div>
            <q-knob
              readonly
              v-model="value2"
              size="125px"
              :thickness="0.15"
              color="green-6"
              track-color="grey-4"
              class="text-orange q-ma-md"
              show-value
            >
              <div class="numBlock"><strong>{{value2}}%</strong><br><span class="num">В процессе</span></div>
            </q-knob>
          </div>
          <div>
            <q-knob
              readonly
              v-model="value3"
              size="125px"
              :thickness="0.15"
              color="green-6"
              track-color="grey-4"
              class="text-orange q-ma-md"
              show-value
            >
              <div class="numBlock"><strong>{{value3}}%</strong><br><span class="num">Исправлено</span></div>
            </q-knob>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      value: 75,
      value2: 50,
      value3: 75,
      options: [],
      model: ''
    }
  }
}
</script>
<style scoped>
  .labelFilter {
    font-size: 24px;
  }
  .numBlock {
    font-size: 20px;
    color:#282D30;
    text-align: center;
    line-height: 26px;
  }
  .num {font-size: 16px;}
  .title {
    font-size: 32px;
    color: #74798C;
  }
  .bg_botbg {
    background: #F9FBFF;
  }
</style>
