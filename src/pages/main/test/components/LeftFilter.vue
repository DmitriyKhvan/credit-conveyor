<template>
    <div class="OpenSans col bg-white rounded-borders" style="max-width: 300px">
       <div class="text-weight-bolder f16 q-ma-lg">Сортировка</div>
       <div class="column col q-ma-sm">
           <div class="row no-wrap items-center f16">
               <q-checkbox v-model="check" />
                <p>Для кредитных карт</p>
           </div>
           <div class="row no-wrap items-center f16">
               <q-checkbox v-model="check" />
                <p>Обучающие</p>
           </div>
           <div class="row no-wrap items-center f16">
               <q-checkbox v-model="check" />
                <p>Помощник</p>
           </div>
           <div class="row no-wrap items-center f16">
               <q-checkbox v-model="check" />
                <p>Вспомогательные</p>
           </div>
           <div class="row no-wrap items-center f16">
               <q-checkbox v-model="check" />
                <p>Для отдела разработки</p>
           </div>
           <div class="row no-wrap items-center f16">
               <q-checkbox v-model="check" />
                <p>Вклады</p>
           </div>
           <div class="row no-wrap items-center f16">
               <q-checkbox v-model="check" />
                <p>Кредитный отдел</p>
           </div>
       </div>
    </div>
</template>
<script>
// import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      check: false
    }
  }
}
</script>
<style scoped>
@font-face {
    font-family: 'OpenSans';
    src: url('~assets/fonts/OpenSans-Regular.ttf') format(truetype);
}
.gcl {
    color: #A0A5BA;
}
.OpenSans {
    font-family: 'OpenSans';
}

.f12 {
    font-size: 12px;
}
.f14 {
    font-size: 14px;
}
.f16 {
    font-size: 16px;
}
.f18 {
    font-size: 18px;
}
.f20 {
    font-size: 20px;
}
.f22 {
    font-size: 22px;
}
.f24 {
    font-size: 24px;
}
.click:hover {
    background-color: rgb(228, 228, 228);
    cursor: pointer;
    transition: 0.3s;
}
.click:hover > .gcl {
    color: #000000;
}
.active {
    color: #0054FE;
}
p {
    user-select: none;
}
</style>
