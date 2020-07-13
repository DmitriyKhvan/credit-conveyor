<template>
  <div class="q-pa-lg">
    <div class="row q-col-gutter-md">
      <div class="col title q-pb-lg">
        <strong>Регистрация канцелярии</strong>
      </div>
    </div>
    <div class="row q-col-gutter-xl q-pb-lg">
      <div class="col">
        <q-select outlined v-model="model" :options="options" label="Журнал" />
      </div>
      <div class="col">
        <q-select outlined v-model="model" :options="options" label="Выбрать регион">
          <template v-slot:append>
            <q-icon color="grey-4" name="place" />
          </template>
        </q-select>
      </div>
    </div>
    <div class="row q-col-gutter-xl q-pb-lg">
      <div class="col">
        <q-select outlined v-model="model" :options="options" label="Выберите организацию" />
      </div>
      <div class="col">
        <q-input outlined v-model="text" label="Написать откуда" />
      </div>
    </div>
    <div class="row q-col-gutter-xl q-pb-lg">
      <div class="col">
        <q-input outlined v-model="text" label="Вх. номер" />
      </div>
      <div class="col">
        <q-input outlined v-model="text" label="Вх. Дата">
          <template v-slot:append>
            <img src="@/assets/icons/InDate.svg">
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-col-gutter-xl q-pb-lg">
      <div class="col">
        <q-input outlined v-model="text" label="Исх. номер">
          <template v-slot:prepend>
            <q-checkbox color="blue-14" v-model="val" />
          </template>
        </q-input>
      </div>
      <div class="col">
        <q-input outlined v-model="text" label="Исх. дата">
          <template v-slot:prepend>
            <q-checkbox color="blue-14" v-model="val" />
          </template>
          <template v-slot:append>
            <img src="@/assets/icons/OutDate.svg">
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-col-gutter-xl q-pb-lg">
      <div class="col">
        <q-input outlined v-model="text" label="Формат" />
      </div>
      <div class="col">
        <q-input outlined v-model="text" label="Кол. лист" />
      </div>
    </div>
    <div class="row q-col-gutter-xl q-pb-lg">
      <div class="col">
        <q-btn push icon="cloud_upload" class="full-width" color="blue-14" label="Загрузить файл" size="lg"/>
      </div>
      <div class="col">
        <q-btn push flat color="grey" label="Посмотреть файл" size="lg" />
      </div>
    </div>
    <div class="row q-col-gutter-xl q-pb-lg">
      <div class="col">
        <q-input
          v-model="text"
          outlined
          type="textarea"
          label="Содержание"
        />
      </div>
    </div>
    <div class="row q-col-gutter-xl q-pb-lg">
      <div class="col">
        <q-input outlined v-model="text" label="Кто подписал" />
      </div>
    </div>
    <div class="row q-col-gutter-xl q-pb-lg">
      <div class="col">
        <q-btn push class="full-width" outline  style="color: #787E8C;" label="Очистить все" size="lg"/>
      </div>
      <div class="col">
        <q-btn push class="full-width" color="blue-14" label="Зарегистрировать" size="lg"/>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data(){
    return {
      val: true,
      text: '',
      options: [],
      model: ''
    }
  }
}
</script>
<style scoped>
  .title {font-size: 15px;}
</style>
