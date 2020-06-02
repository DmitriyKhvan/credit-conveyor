<template>
  <div class="q-pa-md">
    <q-input
      filled
      v-model="headerColor"
      hint="Выберите цвет header"
      class="my-input"
    >
      <template v-slot:append>
        <q-icon name="colorize" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-color 
              v-model="headerColor" 
              no-footer
              default-view="palette"
              :palette="[
                '#019A9D', '#D9B801', '#E8045A', '#B2028A',
                '#2A0449', '#019A9D'
              ]"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input
      filled
      v-model="footerColor"
      hint="Выберите цвет footer"
      class="my-input"
    >
      <template v-slot:append>
        <q-icon name="colorize" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-color 
              v-model="footerColor" 
              no-footer
              default-view="palette"
              :palette="[
                '#019A9D', '#D9B801', '#E8045A', '#B2028A',
                '#2A0449', '#019A9D'
              ]"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input
      filled
      v-model="buttonColor"
      hint="Выберите цвет кнопки"
      class="my-input"
    >
      <template v-slot:append>
        <q-icon name="colorize" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-color 
              v-model="buttonColor" 
              no-footer
              default-view="palette"
              :palette="[
                '#019A9D', '#D9B801', '#E8045A', '#B2028A',
                '#2A0449', '#019A9D'
              ]"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headerColor: "#019A9D",
      footerColor: "#019A9D",
      buttonColor: "#019A9D",
    };
  }
};
</script>
<style lang="scss">
  .my-input {
    max-width: 250px
  }
</style>
