<template>
  <draggable v-bind="dragOptions" class="list-group" :list="list" group="tasks" @change="log">
    <div
      class="col bg-white q-py-sm q-px-md q-mb-sm title text-body1"
      v-for="element in list"
      :key="element.name"
      @click="dialog = true"
    >
      {{element.name}}
      <div class="row q-pt-sm ">
        <div class="col dflex q-pr-sm q-py-sm justify-center">
          <div>
            <q-icon name="list" class="img" color="grey-5" size="25px" />
            <!-- <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" content-class="bg-green">
              7 листов бумаги
            </q-tooltip> -->
          </div>
          <div class="dflex q-px-sm">7</div>
        </div>
        <div class="col dflex twoBorders q-pr-sm q-py-sm justify-center">
          <div>
            <q-icon name="chat" class="img" color="grey-5" size="25px" />
            <!-- <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" content-class="bg-light-blue">
              25 комментариев
            </q-tooltip> -->
          </div>
          <div class="desp q-px-sm">25</div>
        </div>
        <div class="col dflex q-pr-sm q-py-sm justify-center">
          <div>
            <q-icon name="group" class="img" color="grey-5" size="25px" />
            <!-- <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" content-class="bg-deep-purple text-center">
              <b>Ответственные:</b><br>
              Баратов С. У. Абдуллаев И. А. Драгунов А. С.
            </q-tooltip> -->
          </div>
          <div class="desp q-px-sm">25</div>
        </div>
      </div>
    </div>

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

                        <div class="row q-py-sm">
                            <div class="col">
                            <div class="row">
                                <div class="col flexBlock">
                                <div class="self-center"><img src="@/assets/icons/Send.svg" /></div>
                                <div class="q-px-sm lineH"><strong>От:</strong><br>С. Баратов</div>
                                </div>
                                <div class="col flexBlock">
                                <div class="self-center"><img src="@/assets/icons/Time-Limit.svg" /></div>
                                <div class="q-px-sm lineH"><strong>Срок сдачи:</strong><br>Осталось 2 дня</div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="row q-py-sm">
                            <div class="col">
                            <div class="row">
                                <div class="col flexBlock">
                                <div class="self-center"><img src="@/assets/icons/Enter.svg" /></div>
                                <div class="q-px-sm lineH"><strong>Входящий номер:</strong><br>001_к</div>
                                </div>
                                <div class="col flexBlock">
                                <div class="self-center"><img src="@/assets/icons/Enter-1.svg" /></div>
                                <div class="q-px-sm lineH"><strong>Исходящий номер:</strong><br>03-1/15064</div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="row q-py-sm">
                            <div class="col">
                            <div class="row">
                                <div class="col flexBlock">
                                <div class="self-center"><img src="@/assets/icons/Enter-1.svg" /></div>
                                <div class="q-px-sm lineH"><strong>Исходящая дата:</strong><br>28.03.2020</div>
                                </div>
                                <div class="col flexBlock">
                                <div class="self-center"><img src="@/assets/icons/Enter.svg" /></div>
                                <div class="q-px-sm lineH"><strong>Входящая дата:</strong><br>28.03.2020</div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="row q-py-sm">
                            <div class="col subject q-py-sm q-px-lg">
                            Прошу рассмотреть в установленном порядке и принять необходимые меры
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

                            <div class="row q-mt-md com_block">
                                <div class="col-1">
                                <q-avatar size="32px">
                                    <img src="https://cdn.quasar.dev/img/avatar.png">
                                </q-avatar>
                                </div>
                                <div class="col q-px-sm">
                                <q-input filled v-model="text" dense label="Напишите комментарий..." />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>

                        <div class="col-4 rightBlock">
                        <div class="row">
                            <div class="col">
                            Изменить статус:
                            </div>
                        </div>
                        <div class="row">
                            <div class="col q-py-sm">
                            <q-select filled v-model="model" :options="options" dense />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                            Отвественные:
                            </div>
                        </div>

                        <div class="row">
                            <div class="col q-py-sm">
                            <q-input standout v-model="text" label="Поиск" dense>
                                <template v-slot:append>
                                <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
                                <q-icon name="search" />
                                </template>
                            </q-input>
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
                        </div>
                    </div>

                    </q-card-section>

                </q-card>
                </q-dialog>


  </draggable>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  data () {
    return {
      dialog: false,
      date: '2019/02/01',
      model: 'Новые задания',
      options: ['Новые задания'],
      text: ''
    }
  },
  props: ['list'],
  components: {
    draggable,
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
        dragClass: 'sDrag',
      };
    }
  }
}
</script>
<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: 0.6 !important;
  background: #fff !important;
  color: #fff;
}
.ghost .img {display: none;}

.sDrag {
  opacity: 1 !important;
  background: #fff !important;
  transition: transform 0.18s ease !important;
  transform: rotateZ(30deg) !important;
}
.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg)
}

.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg)
}
.dflex {
  display: flex;
  align-items: center;
}
.list-group {
  min-height: 100px;
  cursor: move;
}

</style>
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
    padding: 20px 0 0 0;
    margin: 20px 0 0 0;
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
  .subject {
    background: #F8F8F8;
    border-radius: 30px;
    color: #FF4A4A;
    line-height: 19px;
    font-weight: 600;
  }
</style>
<style>
  .fontBtn .q-btn__content{
    text-transform: none;
  }
</style>
