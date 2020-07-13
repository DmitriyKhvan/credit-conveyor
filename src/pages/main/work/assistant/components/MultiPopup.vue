<template>
  <div>
    <q-btn color="blue-14" size="lg" label="Отправить выбранное: ( 1 )" @click="dialog = true" />
    <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="cardBlock q-pa-md"  style="width: 920px; max-width: 80vw;">
        <q-card-section>
          <div class="row">
            <div class="col title">
              <q-scroll-area style="height: 560px;">
                <a-document v-for="n in 10" :key="n"></a-document>
              </q-scroll-area>

            </div>
            <div class="col-5 q-pl-md rightBlock">

              <div class="row">
                <div class="col q-pb-xs">
                  Изменить статус:
                </div>
              </div>
              <div class="row">
                <div class="col q-pb-md">
                  <q-input standout v-model="text" label="Исполнитель">
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="row">
                <div class="col q-pb-xs">
                  Выберите главного исполнителя
                </div>
              </div>
              <div class="row">
                <div class="col q-pb-md q-pt-sm q-px-md users">
                  <div class="active"><span>Баратов С. У.</span> <q-icon name="close" size="xs" class="icon_btn" /></div>
                  <div><span>Ахмедов Б. А.</span>  <q-icon name="close" size="xs" class="icon_btn" /></div>
                  <div><span>Драгунов А. С.</span>  <q-icon name="close" size="xs" class="icon_btn" /></div>
                  <div><span>Иванов И. А.</span>  <q-icon name="close" size="xs" class="icon_btn" /></div>
                </div>
              </div>

              <div class="row">
                <div class="col q-pb-xs q-pt-md">
                  Выберите руководителя
                </div>
              </div>
              <div class="row">
                <div class="col q-pb-md">
                  <q-select filled v-model="model" :options="options" label="Руководитель" />
                </div>
              </div>

              <div class="row">
                <div class="col q-pb-xs">
                  Выберите шаблон
                </div>
              </div>
              <div class="row">
                <div class="col q-pb-md">
                  <q-select filled v-model="model" :options="options" label="Шаблон" />
                </div>
              </div>

              <div class="row desp">
                <div class="col">
                  <q-toggle
                    v-model="value"
                    color="amber-4"
                    label="Не подписан"
                    left-label
                    size="74px"
                  />
                </div>
              </div>

            </div>
          </div>

          <div class="row q-pt-lg q-mt-sm bottomBlock">
            <div class="col text-center">
              <q-btn color="blue-14" label="Отправить" size="lg" class="q-mr-lg" @click="dialog = false" />
              <q-btn color="white" text-color="black" label="Отменить" size="lg" @click="dialog = false" />
            </div>
          </div>

        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Document from './MultiDocument'
export default {
  components: {
    ADocument: Document
  },
  data(){
    return {
      dialog: false,
      date: '2019/02/01',
      value: true,
      text: '',
      options: [],
      model: ''
    }
  }
}
</script>
<style scoped>
  .users {
    background: #F8F8F8;
    border-radius: 5px;
  }
  .files {font-size: 15px;}
  .desp {font-size: 14px;}
  .cardBlock {
    width: 860px;
    font-size: 16px;
    line-height: 27px;
  }
  .font-14 {
    font-size: 14px;
  }
  .colorGrey {
    color: #787E8C
  }
  .flexBlock {
    display: flex;
  }
  .pad-3 {padding-top: 3px;}
  .pad-2 {padding-top: 2px;}
  .green {color: #47B881;}
  .blue {color: #3576CB;}
  .lineH {line-height: 22px;}

  .rightBlock {
    font-size: 14px;
  }
  .users div {
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 4px;
    padding: 5px 10px;
    float: left;
    margin: 10px 10px 0 0;
    cursor: pointer;
  }
  .users div span {
    padding-right: 10px;
  }
  .users div.active {
    color: #fff;
    background: #0054FE;
  }
  .bottomBlock {
    box-shadow: 0 -5px 10px -10px #999;
  }
</style>
<style>
  .custom_btn div {text-transform: none;}
</style>
