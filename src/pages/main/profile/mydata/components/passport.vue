<template>
  <div class="col-lg-10 col-md-9 col-sm-8 q-pa-lg">

      <div v-if="mydata" class="row table_border">
        <div class="table_title"><q-icon name="account_box" size="sm" class="q-pr-sm" /> ПАСПОРТ</div>
        <div class="col-12 q-pa-md table_bg">


          <div
            class="block_global"
            v-for="(d, key, index) in mydata"
            :key="index"
          >
            <div class="left_bg" v-html="titles[index]"></div>
            <div class="right_bg" v-html="d"></div>
          </div>


        </div>
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
        'Серия и номер паспорта',
        'Когда выдан',
        'Действителен до',
        'Выдан органом',
        'Табельный номер',
        'Лицевой накопительный счёт',
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
        .get("/emps/data/passport?uid=" + this.emp_id)
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
    background: url('../../../../../assets/images/table_dot.png') repeat-x;
    background-position: 0 12px;
    margin: 5px 0;
  }
</style>
