<template>
  <div v-if="list" class="row bg-white q-pt-sm q-pb-lg q-mt-md q-mb-sm task">
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
            <!-- <div class="flexBlock q-pr-sm q-py-sm">
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
            </div> -->
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
      <div class="row">
        <div class="col"><b>Организация по кибербезопасности направляет вам...</b></div>
        <div><img src="@/assets/icons/help.svg" /></div>
      </div>
    </div>
    <div class="flexBlock q-px-md q-mb-md">
      <div class="q-pr-sm"><img src="@/assets/icons/Send.svg" /></div>
      <div>
        <b>От:</b><br>
        С. Баратов
      </div>
    </div>
    <div class="flexBlock q-px-md q-mb-md">
      <div class="q-pr-sm"><img src="@/assets/icons/Calendar.svg" /></div>
      <div>
        <b>Входящая дата:</b><br>
        28.03.2020
      </div>
    </div>

    <div class="row q-pb-md">
      <div class="col text-center">
        <a-popup></a-popup>
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
  computed: {
    ...mapState({
          list: state => state.assistant.aList,
          menu: state => state.assistant.aMenu,
        }),
  },
  data(){
    return {
      val: false
    }
  }
}
</script>
<style scoped>
  .flexBlock {
    display: flex;
    align-items: center;
    align-content: center;
  }
  .task {
    border-bottom: 1px #E3E4E8 solid;
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
<style>
  .q-btn__content {
    text-transform: none;
    font-size: 14px;
  }
</style>
