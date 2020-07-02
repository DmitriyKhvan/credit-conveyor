<template>
  <div>
    <q-btn color="white" text-color="black" size="lg" label="Подробнее" @click="dialog = true" />
    <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="cardBlock q-pa-md"  style="width: 760px; max-width: 80vw;">
        <q-card-section>
          <div class="row">
            <div class="col title">
              Организация по кибербезопасности направляет вам документы по зашиты внутренних систем для ознакомления и принятие соответствующие меры
            </div>
            <div class="col-1 text-right">
              <q-btn round color="white" text-color="black" icon="clear" flat v-close-popup  />
            </div>
          </div>

          <div class="row font-14 colorGrey q-pt-md">
            <div class="col-8">

              <div class="row q-py-xs">
                <div class="col">
                  <div class="row justify-center">
                    <div class="col">
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

              <div class="row q-py-xs">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="pad-3"><img src="@/assets/icons/Send.svg" /></div>
                      <div class="q-px-sm">Статус:</div>
                      <div class="blue"><strong>В работе</strong></div>
                    </div>
                    <div class="col flexBlock">
                      <div class="pad-2"><img src="@/assets/icons/List.svg" /></div>
                      <div class="q-px-sm">7 листов</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-xs">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="pad-3"><img src="@/assets/icons/Time-Limit.svg" /></div>
                      <div class="q-px-sm">Срок сдачи:</div>
                      <div><strong>23.06.2020</strong></div>
                    </div>
                    <div class="col green">
                      <strong>Осталось 2 дня</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-xs">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="pad-3"><img src="@/assets/icons/Send.svg" /></div>
                      <div class="q-px-sm">От:</div>
                      <div><strong>С. Баратов</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-xs">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="self-center"><img src="@/assets/icons/Enter-1.svg" /></div>
                      <div class="q-px-sm lineH">Исходящий номер:<br><strong>23.06.2020</strong></div>
                    </div>
                    <div class="col flexBlock">
                      <div class="self-center"><img src="@/assets/icons/Enter.svg" /></div>
                      <div class="q-px-sm lineH">Входящий номер:<br><strong>001_к</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-sm">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="self-center"><img src="@/assets/icons/Enter-1.svg" /></div>
                      <div class="q-px-sm lineH">Исходящая дата:<br><strong>28.03.2020</strong></div>
                    </div>
                    <div class="col flexBlock">
                      <div class="self-center"><img src="@/assets/icons/Enter.svg" /></div>
                      <div class="q-px-sm lineH">Входящая дата:<br><strong>28.03.2020</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row comments">
                <div class="col">
                  <div class="row">
                    <div class="col com_title">Комментарии:</div>
                  </div>
                  <div class="row q-pb-md com_block">
                    <div class="col-1">
                      <q-avatar size="32px">
                        <img src="https://cdn.quasar.dev/img/avatar.png">
                      </q-avatar>
                    </div>
                    <div class="col q-px-sm">
                      <div class="com_author">Ибрагим Абдуллаев Акрамович <span>03.06.2020</span></div>
                      <div class="com_text">
                        Направляет вам указание по оптимизацию внутренных банковских систем
                      </div>
                      <div class="com_action flexBlock">
                        <div>редактирвоать</div>
                        <div>удалить</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="col-4 rightBlock">
              <div class="row">
                <div class="col">
                  Отвественные:
                </div>
              </div>

              <div class="row">
                <div class="col users">
                  <div>
                    Абдуллаев И. А.
                  </div>
                  <div>
                    Баратов С. У.
                  </div>
                </div>
              </div>

              <div class="row q-pt-md">
                <div class="col">
                  Изменить статус:
                </div>
              </div>
              <div class="row">
                <div class="col q-py-sm">
                  <q-select filled v-model="model" :options="options" label="Filled" dense />
                </div>
              </div>

              <div class="row q-pt-sm">
                <div class="col">
                  Установить новый срок:
                </div>
              </div>
              <div class="row">
                <div class="col q-py-sm">
                  <q-input filled v-model="date" mask="date" :rules="['date']" dense>
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="row">
                <div class="col custom_btn">
                  <q-btn color="blue-9" size="md" label="Сохранить" class="full-width" />
                </div>
              </div>

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
      date: '2019/02/01'
    }
  }
}
</script>
<style scoped>
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
    padding: 4px 0 4px 15px;
  }
  .users div {
    background: #3576CB;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
    float: left;
    margin: 5px 0;
  }

</style>
<style>
  .custom_btn div {text-transform: none;}
</style>
