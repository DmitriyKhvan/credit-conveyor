<template>
  <div class="col-lg-10 col-md-9 col-sm-8 q-pa-lg">
    <q-scroll-area class="scrollBlock">
      <div
        v-for="(n, i) in datas"
        :key="n.title"
      >

        <template v-if="!n.data.header">
          <div class="row table_border">
            <div class="table_title"><q-icon :name="icons[i]" size="sm" class="q-pr-sm" /> {{n.title}}</div>
            <div class="col-12 q-pa-md table_bg">

              <div
                class="block_global"
                v-for="(d, key, index) in n.data"
                :key="index"
              >
                <div class="left_bg" v-html="titles[key]"></div>
                <div class="right_bg" v-html="d"></div>
              </div>

            </div>
          </div>
        </template>



        <template v-else>

          <div class="row table_border">
            <div class="table_title"><q-icon :name="icons[i]" size="sm" class="q-pr-sm" /> {{n.title}}</div>

              <table style="width:100%">
                <tr>
                  <th
                    v-for="(h, i) in n.data.header"
                    :key="i"
                    v-html="h"
                  ></th>
                </tr>
                <tr
                  v-for="(t, index) in n.data.data"
                  :key="index"
                >
                  <td
                    v-for="(b, e) in n.data.data[index]"
                    :key="e"
                    v-html="b"
                  ></td>
                </tr>
              </table>

          </div>
        </template>

      </div>
    </q-scroll-area>
    </div>
</template>
<script>
import axios from "axios"
import { mapGetters } from "vuex"

export default {
  data () {
    return {
      datas: [],
      icons: ['thumb_down', 'gavel', 'credit_card', 'pie_chart', 'playlist_add_check', 'thumb_up', 'policy', 'security'],
      titles: {
        at_the_position : 'На занимаемой должности',
        in_bank: 'В Банке',
        before_bank: 'До банка',
        salary: 'Оклад',
        discharge: 'Разряд',
        allowance: 'Надбавка',
        work_time: 'Время работы',
        lanch_time: 'Перерыв на обед',
        work_type: 'Тип времени работы',
        condition: 'Состояние',
        main: 'Основной',
        istikbol: '"Истикбол"',
        access: 'Допуск'
      }

      // [
      //   ['На занимаемой должности', 'В Банке', 'До банка'],
      //   ['Оклад', 'Разряд', 'Надбавка'],
      //   ['Время работы', 'Перерыв на обед', 'Тип времени работы'],
      //   ['Состояние', 'Основной', '"Истикбол"'],
      //   ['Допуск']
      // ]
    }
  },
  computed: {
    ...mapGetters({
      emp_id: "auth/empId"
    }),

  },
  created () {
      axios
        .get("/emps/data/career?uid=" + this.emp_id)
        .then(response => {
          console.log(response.data)
          this.datas = response.data
          // this.mydata = response.data[0].data
        })
        .catch(error => {
            console.log('error')
        });
  }

}
</script>
<style scoped>
  .scrollBlock {
    height: calc(100vh - 130px);
  }
  .table_bg {
    background: #EAF3FC;
    border-radius: 5px;
  }
  .table_border {
    border: 1px #9FB7CF solid;
    border-radius: 5px;
    position: relative;
    padding: 30px 10px 10px;
    margin-top: 25px;
    margin-bottom: 40px;
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

  .table_bg {
    background: #EAF3FC;
    border-radius: 5px;
  }
  .table_border {
    border: 1px #9FB7CF solid;
    border-radius: 5px;
    position: relative;
    padding: 30px 10px 10px;
    margin-top: 25px;
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
  table, th, td {
  border: 1px solid #9FB7CF;
  border-collapse: collapse;
  }
  th, td {padding: 10px;}
  th {
    background: #EAF3FC;
  }
</style>
