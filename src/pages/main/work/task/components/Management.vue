<template>
  <!-- <div class="row">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable v-bind="dragOptions" class="list-group" :list="list1" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list1"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable v-bind="dragOptions" class="list-group" :list="list2" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list2"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
      </draggable>
    </div>
  </div> -->

  <div class="row q-py-md q-col-gutter-md management">

    <div class="col-md-3 col-sm-6">
      <div class="row column q-pa-sm bgGrey">
        <div class="col q-pt-sm q-pb-md dflex">
          <div class="q-pr-sm"><img src="@/assets/icons/New-Document-active.svg" alt=""></div>
          <div><b>Новые задания</b> <span class="subRed q-pl-sm"><b>+3</b></span></div>
        </div>
        <a-task :list="list1"></a-task>
      </div>
    </div>

    <div class="col-md-3 col-sm-6">
      <div class="row column q-pa-sm bgGrey">
        <div class="col q-pt-sm q-pb-md dflex">
          <div class="q-pr-sm"><img src="@/assets/icons/Task-Completed-active.svg" alt=""></div>
          <div><b>Принял(а) задания</b> <span class="subRed q-pl-sm"><b>+3</b></span></div>
        </div>
        <a-task :list="list2"></a-task>
      </div>
    </div>

    <div class="col-md-3 col-sm-6">
      <div class="row column q-pa-sm bgGrey">
        <div class="col q-pt-sm q-pb-md dflex">
          <div class="q-pr-sm"><img src="@/assets/icons/Clipboard-active.svg" alt=""></div>
          <div><b>Работаю</b> <span class="subRed q-pl-sm"><b>+3</b></span></div>
        </div>
        <a-task :list="list3"></a-task>
      </div>
    </div>

    <div class="col-md-3 col-sm-6">
      <div class="row column q-pa-sm bgGrey">
        <div class="col q-pt-sm q-pb-md dflex">
          <div class="q-pr-sm"><img src="@/assets/icons/Ok-active.svg" alt=""></div>
          <div><b>Завершенные задания</b> <span class="subRed q-pl-sm"><b>+3</b></span></div>
        </div>
        <a-task :list="list4"></a-task>
      </div>
    </div>


  </div>
</template>
<script>

import Task from './ManagmentTask'

export default {
  components: {
    ATask: Task
  },
  data(){
    return {

      list1: [
        { name: "Задача 1", id: 1 },
        { name: "Задача 2", id: 2 },
        { name: "задача 3", id: 3 },
        { name: "Задача 4", id: 4 }
      ],
      list2: [
        { name: "Задача 5", id: 5 },
        { name: "Задача 6", id: 6 },
        { name: "Задача 7", id: 7 }
      ],
      list3: [
        { name: "Задача 8", id: 8 },
      ],
      list4: []
    }
  },
  methods: {
    add: function() {
      this.list.push({ name: "Juan" });
    },
    replace: function() {
      this.list = [{ name: "Edgard" }];
    },
    clone: function(el) {
      return {
        name: el.name + " cloned"
      };
    },
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
        ghostClass: "ghost"
      };
    }
  }
}
</script>
<style scoped>


  .management img {vertical-align: bottom;}
  .list-group-item {
    cursor: move;
  }
  .bgGrey {
    background: #EBEDF4;
    border-radius: 2px;
  }
  .dflex {
    display: flex;
    align-items: center;
  }
  .subRed {color: #FF4A4A}
  .title {
    border: 1px solid #E3E4E8;
    border-radius: 2px;
  }
</style>
