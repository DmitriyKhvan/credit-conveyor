<template>
  <div class="row q-pb-md">
    <div class="col">
      <div class="row q-col-gutter-x-md">
        <div class="col buttonFilter">
          <a-popup></a-popup>
        </div>
      </div>
    </div>
    <div class="col text-right navMenu">
      <div>Показано строк:</div>
      <div><q-select filled v-model="model" :options="options" label="3" bg-color="white" dense style="width:70px" /></div>
      <div>1-3 из 10</div>
      <div class="arrows">
        <div><q-icon name="keyboard_arrow_left" size="sm" /></div>
        <div class="active"><q-icon name="keyboard_arrow_right"  size="sm" /></div>
      </div>
    </div>
  </div>
</template>
<script>
import MultiPopup from './MultiPopup'
export default {
  components: {
    APopup: MultiPopup
  },
  data(){
    return {
      model: '',
      options: []
    }
  }
}
</script>
<style scoped>
  .navMenu {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .navMenu div {
    padding: 0 10px;
  }
  .arrows {
    display: flex;
  }
  .arrows div {
    cursor: pointer;
    color: #ccc;
  }
  .arrows div.active {
    color: #000;
  }
</style>
