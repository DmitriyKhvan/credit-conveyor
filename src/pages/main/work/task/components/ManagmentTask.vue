<template>
  <draggable class="list-group" :list="list" group="tasks" @change="log">
    <div
      class="col bg-white q-py-sm q-px-md q-mb-sm title"
      v-for="element in list"
      :key="element.name"
    >
      {{element.name}}
      <div class="row q-pt-sm ">
        <div class="col dflex q-pr-sm q-py-sm justify-center">
          <div>
            <img src="@/assets/icons/List.svg" />
            <!-- <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" content-class="bg-green">
              7 листов бумаги
            </q-tooltip> -->
          </div>
          <div class="dflex q-px-sm">7</div>
        </div>
        <div class="col dflex twoBorders q-pr-sm q-py-sm justify-center">
          <div>
            <img src="@/assets/icons/Comments.svg" />
            <!-- <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" content-class="bg-light-blue">
              25 комментариев
            </q-tooltip> -->
          </div>
          <div class="desp q-px-sm">25</div>
        </div>
        <div class="col dflex q-pr-sm q-py-sm justify-center">
          <div>
            <img src="@/assets/icons/User-Account.svg" />
            <!-- <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" content-class="bg-deep-purple text-center">
              <b>Ответственные:</b><br>
              Баратов С. У. Абдуллаев И. А. Драгунов А. С.
            </q-tooltip> -->
          </div>
          <div class="desp q-px-sm">25</div>
        </div>
      </div>
    </div>
  </draggable>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  props: ['list'],
  components: {
    draggable
  },
  methods: {
    // add: function() {
    //   this.list.push({ name: "Juan" });
    // },
    // replace: function() {
    //   this.list = [{ name: "Edgard" }];
    // },
    // clone: function(el) {
    //   return {
    //     name: el.name + " cloned"
    //   };
    // },
    log: function(evt) {
      window.console.log(evt);
    }
  }
}
</script>
<style scoped>
  .dflex {
    display: flex;
    align-items: center;
  }
  .list-group {
    min-height: 100px;
    cursor: move;
  }
</style>
