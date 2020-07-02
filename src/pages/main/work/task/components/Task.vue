<template>

  <div v-if="list" class="row bg-white q-pa-sm q-mt-md q-mb-sm task">
    <div>
      <q-checkbox v-model="val" />
    </div>
    <div class="col">
      <div class="title q-py-sm"><b>Организация по кибербезопасности направляет вам документы по зашиты внутренних систем для ознакомления и принятие соответствующие меры</b></div>
      <div class="row desp">
        <div class="col-6">
          <div class="row">
            <div class="col flexBlock">
              <div class="q-pr-sm"><img src="@/assets/icons/Enter-1.svg" /></div>
              <div class="q-py-sm">
                <b>Исходящий номер:</b><br>
                03-1/15064
              </div>
            </div>
            <div class="col flexBlock">
              <div class="q-pr-sm"><img src="@/assets/icons/Enter.svg" /></div>
              <div class="q-py-sm">
                <b>Входящий номер:</b><br>
                517_ц
              </div>
            </div>
            <div class="col flexBlock">
              <div class="q-pr-sm"><img src="@/assets/icons/Send.svg" /></div>
              <div class="q-py-sm">
                <b>От:</b><br>
                С. Баратов
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col flexBlock">
              <div class="q-pr-sm"><img src="@/assets/icons/Calendar.svg" /></div>
              <div class="q-py-sm">
                <b>Исходящая дата:</b><br>
                02.06.2020
              </div>
            </div>
            <div class="col flexBlock">
              <div class="q-pr-sm"><img src="@/assets/icons/Calendar.svg" /></div>
              <div class="q-py-sm">
                <b>Входящая дата:</b><br>
                02.06.2020
              </div>
            </div>
            <div class="col flexBlock">
              <div class="q-pr-sm"><img src="@/assets/icons/Time-Limit.svg" /></div>
              <div class="q-py-sm">
                <b>Срок сдачи:</b><br>
                <span class="subGreen"><b>Осталось 2 дня</b></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row q-pl-lg q-pt-xs">
            <div class="flexBlock q-pr-sm q-py-sm">
              <div>
                <img src="@/assets/icons/List-active.svg" />
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" content-class="bg-green">
                  7 листов бумаги
                </q-tooltip>
              </div>
              <div class="flexBlock q-px-sm">7</div>
            </div>
            <div class="flexBlock q-pr-sm q-py-sm">
              <div>
                <img src="@/assets/icons/Comments-active.svg" />
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" content-class="bg-light-blue">
                  25 комментариев
                </q-tooltip>
              </div>
              <div class="desp q-px-sm">25</div>
            </div>
            <div class="flexBlock q-pr-sm q-py-sm">
              <div>
                <img src="@/assets/icons/User-Account-active.svg" />
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" content-class="bg-deep-purple text-center">
                  <b>Ответственные:</b><br>
                  Баратов С. У. Абдуллаев И. А. Драгунов А. С.
                </q-tooltip>
              </div>
              <div class="desp q-px-sm">25</div>
            </div>
          </div>
          <div class="row q-pt-sm">
            <div class="col subject q-py-sm q-px-lg">
              Прошу рассмотреть в установленном порядке и принять необходимые меры
            </div>
          </div>
        </div>
        <div class="col-2 q-pr-md q-pa-md">
          <div class="row">
            <div class="col text-right q-pr-md">
              <img src="@/assets/icons/Download-Cloud.svg" alt="">
            </div>
            <div>
              <img src="@/assets/icons/Print.svg" alt="">
            </div>
          </div>
          <div class="row q-pt-md">
            <div class="col text-right fontBtn">
              <a-popup></a-popup>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="bg-white task q-py-sm">
    <div class="title q-pa-md">
      <b>Организация по кибербезопасности направляет вам...</b>
    </div>
    <div class="flexBlock q-px-md q-mb-md">
      <div class="q-pr-sm"><img src="@/assets/icons/Send.svg" /></div>
      <div>
        <b>От:</b><br>
        С. Баратов
      </div>
    </div>
    <div class="flexBlock q-px-md q-mb-md">
      <div class="q-pr-sm"><img src="@/assets/icons/Enter.svg" /></div>
      <div>
        <b>Входящий номер:</b><br>
        517_ц
      </div>
    </div>
    <div class="flexBlock q-px-md q-mb-lg">
      <div class="q-pr-sm"><img src="@/assets/icons/Time-Limit.svg" /></div>
      <div>
        <b>Срок сдачи:</b><br>
        <span class="subGreen"><b>Осталось 2 дня</b></span>
      </div>
    </div>
    <div class="footerBlock">
      <div class="row q-my-sm">
        <div class="col flexBlock q-pr-sm q-py-sm justify-center">
          <div>
            <img src="@/assets/icons/List-active.svg" />
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" content-class="bg-green">
              7 листов бумаги
            </q-tooltip>
          </div>
          <div class="flexBlock q-px-sm">7</div>
        </div>
        <div class="col flexBlock twoBorders q-pr-sm q-py-sm justify-center">
          <div>
            <img src="@/assets/icons/Comments-active.svg" />
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" content-class="bg-light-blue">
              25 комментариев
            </q-tooltip>
          </div>
          <div class="desp q-px-sm">25</div>
        </div>
        <div class="col flexBlock q-pr-sm q-py-sm justify-center">
          <div>
            <img src="@/assets/icons/User-Account-active.svg" />
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" content-class="bg-deep-purple text-center">
              <b>Ответственные:</b><br>
              Баратов С. У. Абдуллаев И. А. Драгунов А. С.
            </q-tooltip>
          </div>
          <div class="desp q-px-sm">25</div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { mapState, mapGetters } from 'vuex';
import Popup from './Popup'
export default {
  components: {
    APopup: Popup
  },
  data() {
    return {
      val: false,
    }
  },
  computed: {
    ...mapState({
          list: state => state.tasks.tList,
        }),
  }
}
</script>
<style scoped>
  .flexBlock {
    display: flex;
    align-items: center;
    align-content: center;
  }
  .task img {vertical-align: bottom;}
  .title {
    font-size: 16px;
  }
  .desp {
    color: #606060;
  }
  .subject {
    background: #F8F8F8;
    border-radius: 30px;
    color: #FF4A4A;
    line-height: 19px;
    font-weight: 600;
  }
  .task {color: #333}
  .task b {font-weight: 600;}
  .subGreen {color: #47B881}
  .subYellow {color: #FDCC0C}
  .subRed {color: #FF4A4A}
  .footerBlock {border-top: 1px #E3E4E8 solid ;}
  .twoBorders {
    border-left: 1px #E3E4E8 solid;
    border-right: 1px #E3E4E8 solid;
  }
</style>

