<template>
  <div class="row">
    <right-block></right-block>

    <div class="col-lg-10 col-md-9 col-sm-8 q-pa-lg">
      <div class="row table_border">
        <div class="table_title"><q-icon name="account_box" size="sm" class="q-pr-sm" /> ДОКУМЕНТЫ</div>
        <div class="col-12 q-pa-md table_bg">

          <div class="block_global">
            <div class="left_bg">
              Место рождения
            </div>
            <div class="right_bg">
              Узбекистан Ташкент Мерзо Улугбекский р-н
            </div>
          </div>

          <div class="block_global">
            <div class="left_bg">
              Место рождения
            </div>
            <div class="right_bg">
              Узбекистан Ташкент Мерзо Улугбекский р-н
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>

import RightBlock from '../components/Left'
export default {
  name: 'MyData',
  created () {
    console.log('My Data')
  },
  components: {
    RightBlock
  },

}
</script>
<style scoped>
  .table_bg {
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
  }
</style>
