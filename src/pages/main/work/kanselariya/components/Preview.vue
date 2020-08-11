<template>
  <div class="q-pa-lg fontSize">
    <div class="row q-col-gutter-md">
      <div class="col title q-pb-lg">
        <strong>Предпросмотр</strong>
      </div>
    </div>
    <div class="row q-pb-md">
      <div class="col leftBlock">Журнал:</div>
      <div class="col">{{form.journal !== null ? form.journal.label : ''}}</div>
    </div>
    <div class="row q-pb-md">
      <div class="col leftBlock">Регион:</div>
      <div class="col">{{form.region !== null ? form.region.label : ''}}</div>
    </div>
    <div class="row q-pb-md">
      <div class="col leftBlock">Организация:</div>
      <div class="col">{{form.organs !== null ? form.organs.label : ''}}</div>
    </div>
    <div class="row q-pb-md">
      <div class="col leftBlock">Отправитель:</div>
      <div class="col">{{form.whoIsText !== null ? form.whoIsText : ''}}</div>
    </div>
    <div class="row q-pb-md">
      <div class="col leftBlock">Вх. номер:</div>
      <div class="col">{{form.in_number !== null ? form.in_number : ''}}</div>
    </div>
    <div class="row q-pb-md">
      <div class="col leftBlock">Вх. дата:</div>
      <div class="col">{{form.in_date !== null ? form.in_date : ''}}</div>
    </div>
    <div class="row q-pb-md">
      <div class="col leftBlock">Исх. номер:</div>
      <div class="col">{{form.out_number !== null ? form.out_number : ''}}</div>
    </div>
    <div class="row q-pb-md">
      <div class="col leftBlock">Исх. дата:</div>
      <div class="col">{{form.out_date !== null ? form.out_date : ''}}</div>
    </div>
    <div class="row q-pb-md">
      <div class="col leftBlock">Формат:</div>
      <div class="col">{{form.format !== null ? form.format.label : ''}}</div>
    </div>
    <div class="row q-pb-md">
      <div class="col leftBlock">Кол. лист:</div>
      <div class="col">{{form.listCount !== null ? form.listCount : ''}}</div>
    </div>
    <div class="row q-pb-md">
      <div class="col leftBlock">Файл:</div>
      <div class="col">{{file !== null ? file : ''}}</div>
    </div>
    <div class="row q-pb-md">
      <div class="col leftBlock">Кто подписал:</div>
      <div class="col">{{form.whoIsText !== null ? form.signedby : ''}}</div>
    </div>
    <div class="row q-pb-md">
      <div class="col leftBlock">Содержание:</div>
      <div class="col">{{form.description !== null ? form.description : ''}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["form", "file"]
};
</script>
<style scoped>
.fontSize {
  font-size: 16px;
}
.fontSize .title {
  font-size: 15px;
}
.leftBlock {
  color: #787e8c;
}
</style>
