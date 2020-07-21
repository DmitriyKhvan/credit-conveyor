<template>
  <div class="q-pa-lg fontSize">
    <div class="row q-col-gutter-md">
      <div class="col title q-pb-lg">
        <strong>Предпросмотр</strong>
      </div>
    </div>
    <div
      v-for="n in data"
      :key="n.name"
      class="row q-pb-md"
    >
      <div class="col leftBlock">
        {{n.name}}
      </div>
      <div class="col">
        {{n.text}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      data: [
        {name: 'Журнал:', text: 'Journal name'},
        {name: 'Регион:', text: 'Region name'},
        {name: 'Организация:', text: 'Org Name'},
        {name: 'Отправитель:', text: 'Sender'},
        {name: 'Вх. номер:', text: 'Inc number'},
        {name: 'Вх. дата:', text: 'Inc date'},
        {name: 'Исх. номер:', text: 'Out number'},
        {name: 'Исх. дата:', text: 'Out date'},
        {name: 'Формат:', text: 'Format'},
        {name: 'Кол. лист:', text: 'List'},
        {name: 'Файл:', text: 'file.png'},
        {name: 'Кто подписал:', text: 'Signature'},
        {name: 'Содержание:', text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'},
      ]
    }
  }
}
</script>
<style scoped>
  .fontSize {font-size: 16px;}
  .fontSize .title {font-size: 15px;}
  .leftBlock {color: #787E8C}
</style>
