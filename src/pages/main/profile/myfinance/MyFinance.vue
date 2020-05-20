<template>
  <div class="row">
    <right-block></right-block>

    <div class="col-lg-10 col-md-9 col-sm-8 q-pa-lg">

      <div class="row">
        <div class="col-6">
          <div class="row">
            <div class="col q-pa-sm">

              <div class="row table_border no_pad">
                <div class="col-12 q-pa-md table_bg">
                  <div>
                    <q-select
                      v-model="model"
                      :options="options"
                      dense
                      label="Выберите дату"
                      standout="bg-blue-grey text-white"
                      label-color="white"
                      class="selBg"
                      @input ="selected()"
                    />
                  </div>
                  <template v-if="blockOne">
                    <div
                      class="block_global"
                      v-for="a in blockOne"
                      :key="a.PAY_NAME"
                    >
                      <div class="left_bg">
                        {{a.PAY_NAME}}
                      </div>
                      <div class="right_bg">
                        {{formatNum(a.SUMM)}}
                      </div>
                    </div>
                  </template>
                </div>
              </div>

            </div>
          </div>
          <div class="row">
            <div class="col q-pa-sm">
              <div class="row table_border">
                <div class="col-12 q-pa-md table_bg">
                  <div class="table_title"><q-icon name="credit_card" size="sm" class="q-pr-sm" /> {{names[1]}}</div>

                  <template v-if="blockTwo">
                    <div
                      class="block_global"
                      v-for="b in blockTwo"
                      :key="b.PAY_NAME"
                    >
                      <div class="left_bg" v-html="b.PAY_NAME"></div>

                      <div v-if="b.HOURS" class="right_bg rbg" v-html="b.HOURS"></div>
                      <div v-if="b.DAYS" class="right_bg rbg" v-html="b.DAYS"></div>
                      <div class="right_bg" v-html="formatNum(b.SUMM)"></div>
                    </div>
                  </template>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-6">
          <div class="row">
            <div class="col q-pa-sm">

              <div class="row table_border">
                <div class="col-12 q-pa-md table_bg">
                  <div class="table_title"><q-icon name="repeat" size="sm" class="q-pr-sm" /> {{names[2]}}</div>
                  <template v-if="blockThree">
                    <div
                      class="block_global"
                      v-for="c in blockThree"
                      :key="c.PAY_NAME"
                    >
                      <div class="left_bg" v-html="c.PAY_NAME"></div>
                      <div class="right_bg" v-html="formatNum(c.SUMM)"></div>
                    </div>
                  </template>
                </div>
              </div>

            </div>
          </div>
          <div class="row">
            <div class="col q-pa-sm">
              <div class="row table_border">
                <div class="col-12 q-pa-md table_bg">
                  <div class="table_title"><q-icon name="bar_chart" size="sm" class="q-pr-sm" /> {{names[3]}}</div>
                  <template v-if="blockFour">
                    <div
                      class="block_global"
                      v-for="d in blockFour"
                      :key="d.PAY_NAME"
                    >
                      <div class="left_bg" v-html="d.PAY_NAME"></div>
                      <div class="right_bg" v-html="formatNum(d.SUMM)"></div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import { mapGetters } from "vuex"
import RightBlock from '../components/Left'
export default {
  name: 'MyFinance',
  data () {
    return {
      model: null,
      options: [],
      blockOne: [],
      blockTwo: [],
      blockThree: [],
      blockFour: [],
      names: []
    }
  },

  methods: {
    formatNum (str) {
        str = Math.round(str)
        str = String(str)
        str = str.replace(/(\.(.*))/g, '');
        var arr = str.split('');
        var str_temp = '';
        if (str.length > 3) {
            for (var i = arr.length - 1, j = 1; i >= 0; i--, j++) {
                str_temp = arr[i] + str_temp;
                if (j % 3 == 0) {
                    str_temp = ',' + str_temp;
                }
            }
            str_temp = str_temp.length === 8 ? str_temp.slice(1) : str_temp
            return str_temp;
        } else {
            return str;
        }
    },
    monthData (arr){
      axios({
        url: '/emps/kvitok/month',
        method: 'post',
        data: arr
      })
      .then(response => {

          response.data[0].array[0].forEach(el => {
            this.blockOne.push(el)
          })
          response.data[1].array[0].forEach(el => {
            this.blockTwo.push(el)
          })
          response.data[2].array[0].forEach(el => {
            this.blockThree.push(el)
          })
          response.data[3].array[0].forEach(el => {
            this.blockFour.push(el)
          })

          response.data.forEach(el => {
            this.names.push(el.title)
          })
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    selected () {
      let arr = {
                  uid: this.emp_id,
                  date: this.model.value
                }

      this.blockOne = []
      this.blockTwo = []
      this.blockThree = []
      this.blockFour = []
      this.monthData(arr)
    }
  },
  created () {
    axios
      .get("/emps/kvitok/dates?uid=" + this.emp_id)
      .then(response => {
          response.data.data.forEach(el => {
            let arr = {
              label: el.text,
              value: el.date
            }
            this.options.push(arr)
          });
          this.model = this.options[0]
          this.monthData({
              uid: this.emp_id,
              date: this.options[0].value
            })
      })
      .catch(error => {
          console.log('error')
      });


  },
  components: {
    RightBlock
  },
  computed: {
    ...mapGetters({
    emp_id: "auth/empId"
    }),

  }
}
</script>
<style>
  .selBg span {color: #fff;}
</style>
<style scoped>
  .selBg {
    background: #5B8AB7;
    border-radius: 5px;
    margin-bottom: 10px;
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
    margin-top: 20px;
  }
  .no_pad {
    padding: 10px;
    margin: 0;
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
    max-width: 45%;
  }
  .right_bg {
    float: right;
    background: #fff;
    padding: 3px 10px;
    border-radius: 15px;
    max-width: 54%;
  }
  .rbg {
    background: #9FB7CF;
    color: #fff;
  }
  .block_global {
    float: left;
    width: 100%;
    background: url('../../../../assets/images/table_dot.png') repeat-x;
    background-position: 0 12px;
    margin: 5px 0;
  }
</style>
