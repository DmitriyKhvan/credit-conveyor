<template>
  <div v-if="list" class="row bg-white q-pt-sm q-pb-lg q-mt-md q-mb-sm task">
    <div>
      <q-checkbox v-model="val" @input="changeVal" />
    </div>
    <div class="col">
      <div class="title q-py-sm"><b>{{doc.description}}</b></div>
      <div class="row desp">
        <div class="col-6">
          <div class="row">
            <div class="col flexBlock">
              <div class="q-pr-sm"><img src="@/assets/icons/Enter-1.svg" /></div>
              <div class="q-py-sm">
                <b>Исходящий номер:</b><br>
                {{doc.out_number}}
              </div>
            </div>
            <div class="col flexBlock">
              <div class="q-pr-sm"><img src="@/assets/icons/Enter.svg" /></div>
              <div class="q-py-sm">
                <b>Входящий номер:</b><br>
                {{doc.in_number}}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col flexBlock">
              <div class="q-pr-sm"><img src="@/assets/icons/Calendar.svg" /></div>
              <div class="q-py-sm">
                <b>Исходящая дата:</b><br>
                {{doc.out_date}}
              </div>
            </div>
            <div class="col flexBlock">
              <div class="q-pr-sm"><img src="@/assets/icons/Calendar.svg" /></div>
              <div class="q-py-sm">
                <b>Входящая дата:</b><br>
                {{doc.in_date}}
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
                  {{doc.paper_count}} листов бумаги
                </q-tooltip>
              </div>
              <div class="flexBlock q-px-sm">{{doc.paper_count}}</div>
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
            <div class="col text-right q-pr-md cursor-pointer" @click="newFile">
              <img src="@/assets/icons/Download-Cloud.svg" alt="">
            </div>
            <div class="cursor-pointer">
              <img src="@/assets/icons/Print.svg" alt="">
            </div>
          </div>
          <div class="row q-pt-md">
            <div class="col text-right fontBtn">
              <a-popup :doc="doc"></a-popup>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="bg-white task q-py-sm">
    <div class="title q-pa-md">
      <div class="row">
        <div class="col"><b>{{doc.description}}</b></div>
        <div><img src="@/assets/icons/help.svg" /></div>
      </div>
    </div>
    <div class="flexBlock q-px-md q-mb-md">
      <div class="q-pr-sm"><img src="@/assets/icons/Send.svg" /></div>
      <div>
        <b>От:</b><br>
        {{doc.signed_by}}
      </div>
    </div>
    <div class="flexBlock q-px-md q-mb-md">
      <div class="q-pr-sm"><img src="@/assets/icons/Calendar.svg" /></div>
      <div>
        <b>Входящая дата:</b><br>
        {{doc.in_date}}
      </div>
    </div>

    <div class="row q-pb-md">
      <div class="col text-center">
        <a-popup :doc="doc"></a-popup>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import Popup from './Popup'
export default {
  props:['doc'],
  components: {
    APopup: Popup
  },
  computed: {
    ...mapState({
          list: state => state.assistant.aList,
          menu: state => state.assistant.aMenu,
          selectedDocs: state => state.assistant.selectedDocs,
        }),
  },
  methods: {
    changeVal(){
      this.$store.dispatch('selVal', this.doc.doc_id)
    },
    newFile() {
      if(this.doc.file){
        let blob = new Blob([this.doc.file], { type: "application/pdf" });
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = this.doc.file.name;
        link.click();
      }
    }
  },
  data(){
    return {
      val: false
    }
  },
  created(){
    if(this.selectedDocs.find(id => id === this.doc.doc_id)) {
      this.val = true
    } else {
      this.val = false
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
