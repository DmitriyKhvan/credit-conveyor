<template>
  <div class="row">
    <right-block></right-block>
    <div class="col column q-my-lg q-mr-md">
      <div class="row justify-end" 
      style="background-color: #EDF1FF; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249); border-radius: 5px;">
        <div  class="col column justify-center q-pa-lg Avant"
              style="color: #254EE6;">
          <div  class="text-center"  
                style="font-size: 20px">
            Мы рады вас видеть снва, {{cat(user)}} 
          </div>
          <div  class="text-center"
                style="font-size: 16px">
            <p>Вы закончили <span class="text-orange">12</span> задач в этом месяце!</p>
            <p>Продолжайте в том же духе!</p>
          </div>
        </div>
        <img src="~assets/proficon/top-cor.png" class="rounded-borders"/>
      </div>
      <div class="bg-white rounded-borders q-mt-lg">
        <info       v-if="menuId == 0"></info>
        <documents  v-if="menuId == 1"></documents>
        <mywork     v-if="menuId == 2"></mywork>
        <career     v-if="menuId == 3"></career>
        <others     v-if="menuId == 4"></others>
      </div>
    </div>
  </div>



      <!-- <personal v-if="menuId == 0"></personal>
      <passport v-if="menuId == 3"></passport>
      <relatives v-if="menuId == 4"></relatives>
      <work v-if="menuId == 8"></work>
      <trips v-if="menuId == 5"></trips>
      <career v-if="menuId == 7"></career>
      <education v-if="menuId == 6"></education>
      <contract v-if="menuId == 9"></contract>
      <businesstrip v-if="menuId == 11"></businesstrip>
      <medicallist v-if="menuId == 12"></medicallist>
      <vacations v-if="menuId == 13"></vacations> -->

</template>
<script>
// import personal from './components/my'
// import passport from './components/passport'
// import relatives from './components/relatives'
// import work from './components/work'
// import trips from './components/trips'
// import career from './components/career'
// import education from './components/education'
// import contract from './components/contract'
// import businesstrip from './components/businesstrip'
// import medicallist from './components/medicallist'
// import vacations from './components/vacations'
import axios from "axios"
import { mapGetters } from "vuex"
import RightBlock from '../components/Left'

import info from './info'
import documents from './documents'
import mywork from './myWork'
import career from './career'
import others from './others'

export default {
  name: 'MyData',
  components: {
    RightBlock,
    // personal,
    // passport,
    // relatives,
    // work,
    // trips,
    // career,
    // education,
    // contract,
    // businesstrip,
    // medicallist,
    // vacations,

    info,
    documents,
    mywork,
    career,
    others
  },
  data () {
    return {
    }
  },
  computed: {
    menuId () {
      return this.$store.getters.getMenuId
    },
    ...mapGetters({
      user: "auth/fullName"
    })
  },
  methods: {
    cat(e) {
      if (e.length > 0) {
        let a = this.user.split(' ');
        return a[0];
      }
      return a;
    }
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
  .sscroller {
    position: fixed;
    top: 20px;
    bottom: 20px;

  }
  /* .table_bg {
    background: #EAF3FC;
    border-radius: 5px;
  }
  .table_border {
    border: 1px #9FB7CF solid;
    border-radius: 5px;
    position: relative;
    padding: 30px 10px 10px;
    margin-top: 20px;
  }
  .table_title {
    text-transform: uppercase;
    color: #fff;
    background: #5B8AB7;
    border-radius: 5px;
    position: absolute;
    top: -25px;
    left: 10px;
    padding: 10px 15px;
  }
  .left_bg {
    background: #9FB7CF;
    color: #fff;
    padding: 3px 10px;
    float: left;
    border-radius: 15px;
    max-width: 49%;
  }
  .right_bg {
    float: right;
    background: #fff;
    padding: 3px 10px;
    border-radius: 15px;
    max-width: 49%;
  }
  .block_global {
    float: left;
    width: 100%;
    background: url('../../../../assets/images/table_dot.png') repeat-x;
    background-position: 0 12px;
    margin: 5px 0;
  } */
</style>
