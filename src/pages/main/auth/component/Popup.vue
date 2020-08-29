<template>
    <q-dialog v-model="popup" persistent>
      <q-carousel
        v-if="start !== false"
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="grey-5"
        control-type="flat"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation
        navigation-icon="fiber_manual_record"
        padding
        arrows
        class="shadow-1 rounded-borders no-scroll"
        style="min-height: 500px"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <img src="../assets/welicon/G1.svg" class="q-my-md" width="300px" />
          <div class="q-mt-md text-center OpenSans text-weight-bold" style="font-size: 20px">
            Добро пожаловать в Personal
          </div>
          <div class="q-mt-md text-center OpenSans" style="font-size: 20px">
            Personal разработан департаментом информационных технологий
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <img src="../assets/welicon/G2.svg" class="q-my-md" width="300px" />
          <div class="q-mt-md text-center OpenSans text-weight-bold" style="font-size: 20px">
            Предупреждение о проблеме
          </div>
          <div class="q-mt-md text-center OpenSans" style="font-size: 20px">
            Если вы найдете ошибку при использовании системы Personal, пожалуйста обратитесь в поддержку
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <img src="../assets/welicon/G3.svg" class="q-my-md" width="300px" />
          <div class="q-mt-md text-center OpenSans text-weight-bold" style="font-size: 20px">
            Политика безопасности
          </div>
          <div class="q-mt-md text-center OpenSans" style="font-size: 20px">
            Используя систему Personal, вы автоматически принимаете и соблюдаете <a class="text-blue-7" href="#">политику безопасности.</a>
          </div>
          <q-btn color="primary q-mt-md" size="25px" @click="start =  false">
            <label class="text-normal q-py-sm q-px-lg" style="font-size: 20px">Принмаю</label>
          </q-btn>
        </q-carousel-slide>
      </q-carousel>
      <div v-else class="col-1 column no-wrap OpenSans bg-white rounded-borders items-center">
        <div style="width: 70vw" class="row items-center justify-around">
          <div class="col column items-center q-ml-lg q-pl-lg q-mt-lg" style="font-size: 16px">
            <img src="../assets/welicon/G1.svg" width="170px" />
            <b class="text-center q-my-md">Добро пожаловать на корпоративный портал Personal АО «Национальный банк ВЭД РУ»!</b>
            <p class="">Корпоративный портал Personal разработан Отделом разработки ПО совместно с Отделом управления проектов и бизнес анализа Управления инновационного развития и внедрения новых продуктов Департамента ИТ</p>

            <img src="../assets/welicon/G2.svg" class="q-mt-md" width="170px" />
            <b class="text-center q-my-md">Важная информация!</b>
            <p class="">Если Вы обнаружили ошибки в своих персональных данных на корпоративном портале Personal, пожалуйста обратитесь в Департамент по работе с персоналом для внесения исправлений.</p>
            
          </div>

          <div class="col row items-center justify-center">
            <img src="../assets/welicon/GG.svg" />
          </div>

        </div>
        <q-btn rounded label="ПРОДОЛЖИТЬ" text-color="white" color="primary" size="20px" @click="popup = false" />
        <div class="q-py-lg text-caption">
          Используя систему Personal, вы автоматически принимаете и соблюдаете политику  безопасности.
        </div>
      </div>
    </q-dialog>    
</template>
<script>
export default {
    name: 'CPopup' ,
    data () {
        return {
            popup: true,    // if true Shows popup dialog, otherwise
            start: true,    // Intro slider mode
            slide: 'style',
        }
    }
}
</script>