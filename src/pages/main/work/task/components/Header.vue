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
            <div><b>Новые задания</b> <span class="subRed q-pl-sm"><b>+3</b></span></div>
          </div>
          <div class="flexBlock q-px-md" :class="menu === 2 ? 'filterActive': ''" @click="menuSelect(2)">
            <div class="q-pr-sm">
              <img v-if="menu === 2" src="@/assets/icons/Task-Completed-active.svg" alt="">
              <img v-else src="@/assets/icons/Task-Completed.svg" alt="">
            </div>
            <div><b>Принял(а) задания</b></div>
          </div>
          <div class="flexBlock q-px-md" :class="menu === 3 ? 'filterActive': ''" @click="menuSelect(3)">
            <div class="q-pr-sm">
              <img v-if="menu === 3" src="@/assets/icons/Clipboard-active.svg" alt="">
              <img v-else src="@/assets/icons/Clipboard.svg" alt="">
            </div>
            <div><b>Работаю</b></div>
          </div>
          <div class="flexBlock q-px-md" :class="menu === 4 ? 'filterActive': ''" @click="menuSelect(4)">
            <div class="q-pr-sm">
              <img v-if="menu === 4" src="@/assets/icons/Ok-active.svg" alt="">
              <img v-else src="@/assets/icons/Ok.svg" alt="">
            </div>
            <div><b>Завершенные задания</b></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row q-gutter-lg header q-pb-md" :class="viewTasks ? 'q-pt-none': 'q-pt-md'">
      <div class="q-pa-sm bg-white vList" @click="viewList" v-if="!viewTasks">
        <img v-if="list" src="@/assets/icons/apps.svg" alt="">
        <img v-else src="@/assets/icons/List-1.svg" alt="">
      </div>


      <div class="col"></div>
      <q-input v-if="searchChek" standout v-model="text" label="Поиск" bg-color="white">
        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>
      </q-input>
      <div v-else class="q-pa-md bg-white flexBlock" @click="searchChange">
        <img src="@/assets/icons/Search.svg" alt="">
      </div>
      <q-select filled v-model="model" :options="options" label="Сортировать по" bg-color="white" style="width: 200px"/>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
export default {
  data () {
    return {
      text: '',
      model: '',
      options: ['Вид список'],
    }
  },
  computed: {
    ...mapState({
        viewTasks: state => state.tasks.tViewTasks,
        list: state => state.tasks.tList,
        menu: state => state.tasks.tMenu,
        searchChek: state => state.tasks.tSearch,
      }),
  },
  methods: {
    menuSelect(num){
      this.$store.dispatch('tMenuChange', num)
    },
    viewList(){
      this.$store.dispatch('tChangeView')
    },
    viewChangeTasks(){
      this.$store.dispatch('tChangeManegment')
    },
    searchChange(){
      this.$store.dispatch('tSearchChange')
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
