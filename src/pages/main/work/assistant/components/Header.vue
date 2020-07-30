<template>
  <div>
    <div class="row header" v-if="!viewTasks">
      <div class="col q-py-md q-px-sm bg-white flexBlock">
        <div class="flexBlock">
          <div class="flexBlock q-px-md" :class="menu === 1 ? 'filterActive': ''" @click="menuSelect(1)">
            <div class="q-pr-sm">
              <img v-if="menu === 1" src="@/assets/icons/New-Document-active.svg" alt="">
              <img v-else src="@/assets/icons/New-Document.svg" alt="">
            </div>
            <div><b>Новые документы</b> <span class="subRed q-pl-sm"><b>+3</b></span></div>
          </div>
          <div class="flexBlock q-px-md" :class="menu === 2 ? 'filterActive': ''" @click="menuSelect(2)">
            <div class="q-pr-sm">
              <img v-if="menu === 2" src="@/assets/icons/Task-Completed-active.svg" alt="">
              <img v-else src="@/assets/icons/Task-Completed.svg" alt="">
            </div>
            <div><b>Готов к отправке</b></div>
          </div>
          <div class="flexBlock q-px-md" :class="menu === 3 ? 'filterActive': ''" @click="menuSelect(3)">
            <div class="q-pr-sm">
              <img v-if="menu === 3" src="@/assets/icons/Ok-active.svg" alt="">
              <img v-else src="@/assets/icons/Ok.svg" alt="">
            </div>
            <div><b>Отправленные</b></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row q-gutter-lg header q-pb-md" :class="viewTasks ? 'q-pt-none': 'q-pt-md'">
      <div class="q-pa-md bg-white flexBlock">
        <img src="@/assets/icons/Search.svg" alt="">
      </div>
      <q-select
        filled
        v-model="model"
        :options="options"
        bg-color="white"
        style="width: 200px"
        @input = change()
      />
      <div class="col"></div>
      <q-select filled v-model="model2" :options="options2" label="Сортировать по" bg-color="white" style="width: 200px"/>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
export default {
  data(){
    return {
      options: ['Вид Список', 'Вид Карточный'],
      options2: ['Вид Список', 'Вид Карточный'],
      model: 'Вид Список',
      model2: '',
      viewTasks: false,
      selectedDocs: [],
    }
  },
  computed: {
    ...mapState({
          list: state => state.assistant.aList,
          docs: state => state.assistant.aAllDocs,
          menu: state => state.assistant.aMenu,
        }),
  },
  methods: {
    menuSelect(num){
      this.$store.dispatch('getADocs', num)
    },
    change(value){
      if(this.model === 'Вид Карточный') {this.$store.dispatch('aChangeList', false)}
      else {this.$store.dispatch('aChangeList', true)}
    }
  },
  created(){

  }
}
</script>
<style scoped>
  .flexBlock {
    display: flex;
    align-items: center;
    align-content: center;
  }
  .header {
    display: flex;
    color: #A0A5BA
  }
  .header img {
    vertical-align: bottom;
  }
  .header .filterActive {color: #000}
  .subGreen {color: #47B881}
  .subYellow {color: #FDCC0C}
  .subRed {color: #FF4A4A}
  .vList, .flexBlock {cursor: pointer;}
</style>
