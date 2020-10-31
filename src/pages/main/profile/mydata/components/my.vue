<template>
  <div class="col-12">
    <div
      class="block_global OpenSansBold"
      v-for="(d, key, index) in mydata"
      :key="index"
    >
      <div class="left_bg" v-html="titles[index]"></div>
      <div class="right_bg" v-html="d"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import { mapGetters } from "vuex"

export default {
  data () {
    return {
      titles: [
        'Место рождение',
        'Адрес прописки',
        'Адрес проживания',
        'Срок прописки',
        'Гражданство',
        'День рождения',
        'Пол',
        'Национальность',
        'Семейное положение',
        'Судимость',
        'Партийность',
        'Телефон (домашний)',
        'Мобильный телефон',
        'Мобильный телефон',
        'Рабочий телефон',
        'Член профсоюза',
        'Электронная почта',
        'Дополнительный заработок',
        'Знания компьютера',
        'Знания интернета',
        'Владеет ли имуществом',
        'Общественные работы',
        'Занимался ли бизнесом'
      ],
      mydata: null
    }
  },
  computed: {
    ...mapGetters({
    emp_id: "auth/empId"
    }),

  },
  created () {
      axios
        .get("/emps/data/personal?uid=" + this.emp_id)
        .then(response => {
          this.mydata = response.data[0].data
        })
        .catch(error => {
            console.log('error')
        });
  }

}
</script>
<style scoped>
 @font-face {
    font-family: 'Avant';
    src: url('~assets/fonts/avant.ttf') format('truetype');
  }
  @font-face {
    font-family: 'OpenSansBold';
    src: url('~assets/fonts/OpenSans-Bold.ttf') format('truetype');
  }
  .OpenSansBold {
    font-family: 'OpenSansBold';
    font-weight: 500;
  }
  .Avant {
    font-family: 'Avant';
  }
  .left_bg {
    background: #F8FAFF;
    color: #122E9C;
    padding: 3px 10px;
    float: left;
    border-radius: 15px;
    max-width: 49%;
  }
  .right_bg {
    float: right;
    background: #fff;
    color: #273959;
    padding: 3px 10px;
    border-radius: 15px;
    max-width: 49%;
  }
  .block_global {
    float: left;
    width: 100%;
    background: url('~assets/images/table_dot.svg') repeat-x;
    background-position: 0 12px;
    margin: 5px 0;
  }
</style>
