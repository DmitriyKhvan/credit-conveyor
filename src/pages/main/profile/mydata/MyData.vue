<template>
  <div class="row">
    <right-block></right-block>



      <personal v-if="menuId == 0"></personal>
      <passport v-if="menuId == 3"></passport>
      <relatives v-if="menuId == 4"></relatives>
      <work v-if="menuId == 8"></work>
      <trips v-if="menuId == 5"></trips>
      <career v-if="menuId == 7"></career>
      <education v-if="menuId == 6"></education>
      <contract v-if="menuId == 9"></contract>
      <businesstrip v-if="menuId == 11"></businesstrip>
      <medicallist v-if="menuId == 12"></medicallist>
      <vacations v-if="menuId == 13"></vacations>

  </div>
</template>
<script>
import personal from './components/my'
import passport from './components/passport'
import relatives from './components/relatives'
import work from './components/work'
import trips from './components/trips'
import career from './components/career'
import education from './components/education'
import contract from './components/contract'
import businesstrip from './components/businesstrip'
import medicallist from './components/medicallist'
import vacations from './components/vacations'
import axios from "axios"
import { mapGetters } from "vuex"
import RightBlock from '../components/Left'
export default {
  name: 'MyData',
  components: {
    personal,
    RightBlock,
    passport,
    relatives,
    work,
    trips,
    career,
    education,
    contract,
    businesstrip,
    medicallist,
    vacations
  },
  data () {
    return {

    }
  },
  computed: {
    menuId () {
      return this.$store.getters.getMenuId
    }
  },
  methods: {

  }

}
</script>
<style scoped>
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
