<template>
  <div>
    <q-btn color="blue-14" size="lg" label="Просмотреть" @click="dialog = true" />
    <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="cardBlock q-pa-md"  style="width: 820px; max-width: 80vw;">
        <q-card-section>
          <div class="row">
            <div class="col title">

              <div class="row q-pb-md">
                <div class="col">
                  <strong>Организация по кибербезопасности направляет вам документы по зашиты внутренних систем для ознакомления и принятие соответствующие меры</strong>
                </div>
              </div>
              <div class="row q-py-md desp">
                <div class="col">
                  <div class="row justify-center files">
                    <div class="col-5">
                      <div>Документ № 6765</div>
                    </div>
                    <div class="col flexBlock">
                      <div class="pad-2"><img src="@/assets/icons/Download-Cloud.svg" /></div>
                      <div class="q-px-sm">Скачать</div>
                    </div>
                    <div class="col flexBlock">
                      <div class="pad-3"><img src="@/assets/icons/Print.svg" /></div>
                      <div class="q-px-sm">Печать</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-md desp">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="self-center"><img src="@/assets/icons/Enter-1.svg" /></div>
                      <div class="q-px-sm lineH"><b>Исходящий номер:</b><br>02-1073</div>
                    </div>
                    <div class="col flexBlock">
                      <div class="self-center"><img src="@/assets/icons/Calendar.svg" /></div>
                      <div class="q-px-sm lineH"><b>Дата создания:</b><br>28.03.2020</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-xs desp">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="self-center q-pl-xs"><img src="@/assets/icons/file.svg" /></div>
                      <div class="col q-px-sm lineH">
                        <b>Документ:</b>
                        <div class="row">
                          <div class="col">filename.pdf</div>
                          <div class="col q-px-sm"><i>2.40 мб</i></div>
                        </div>
                      </div>
                    </div>
                    <div class="col flexBlock">
                      <div class="self-center"><img src="@/assets/icons/Enter.svg" /></div>
                      <div class="q-px-sm lineH"><b>Входящий номер:</b><br>001_к</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-md desp">
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
            <div class="col-6 q-pl-md rightBlock">

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

            </div>
          </div>

          <div class="row q-pt-lg ">
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
export default {
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
  .comments {
    padding: 20px 0;
    margin: 20px 0;
    border-top: 1px solid #E3E4E8;
  }
  .com_title {
    font-size: 15px;
    color: #787E8C;
    padding-bottom: 10px;
  }
  .com_author {
    color: #282D30;
    font-weight: 600;
  }
  .com_author span {
    color: #787E8C;
    font-size: 12px;
    font-weight: normal;
    padding-left: 15px;
  }
  .com_action div {
    padding-right: 15px;
    font-size: 12px;
    color: #787E8C;
  }
  .com_text {
    line-height: 19px;
  }
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

</style>
<style>
  .custom_btn div {text-transform: none;}
</style>
