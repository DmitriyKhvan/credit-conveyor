<template>
  <div>

    <div class="row q-col-gutter-x-md">
      <div class="col-3">
        <q-select filled v-model="model" :options="options" label="Все руководства" bg-color="white" />
      </div>
      <div class="col-3">
        <q-select filled v-model="model" :options="options" label="Все регионы" bg-color="white" />
      </div>
      <div class="col-2">
        <q-select filled v-model="model" :options="options" label="Все органы" bg-color="white" />
      </div>
      <div class="col-3 offset-md-1">
        <q-input filled bottom-slots v-model="text" label="Поиск" bg-color="white">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row q-col-gutter-x-md">
      <div class="col-4">
        <q-select filled v-model="model" :options="options" label="Все управление" bg-color="white" />
      </div>
      <div class="col-2">
        <q-select filled v-model="model" :options="options" label="Любой статус" bg-color="white" />
      </div>
      <div class="col-3">
        <q-select filled v-model="model" :options="options" label="Любой тип" bg-color="white" />
      </div>
      <div class="col-3 text-right buttonFilter"><q-btn color="blue-14" size="lg" label="Применить фильтр" /></div>
    </div>

  </div>
</template>
<script>
export default {
  data(){
    return {
      text: '',
      model: '',
      options: []
    }
  }
}
</script>
<style scoped>

</style>
