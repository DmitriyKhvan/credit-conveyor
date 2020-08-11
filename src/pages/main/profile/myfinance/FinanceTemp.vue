<template>
  <div class="q-pa-md fontb greyf">
    <div class="row justify-between">
      <div class="text-h4 blackf text-weight-bolder">Поступления</div>
      <div class="raw bg-white shadow-4" style="border-radius: 5px;">
        <!-- <q-icon name="date_range" class="text-h5 text-red-6 q-ml-md" />
        <q-item class="text-caption q-py-md text-grey-7">май 02.2020 - июнь 02.2020</q-item>-->
        <q-select
          class="q-px-md justify-center"
          color="black-3"
          dense
          borderless
          v-model="selectedMonth"
          :options="dateSelectOptions"
          @input="selected()"
        >
          <template v-slot:prepend>
            <q-icon name="date_range" color="red-5" />
          </template>
        </q-select>
      </div>
    </div>
    <!-- Card Section -->
    <div class="row q-py-xs" style="display: flex; flex: auto; justify-content: space-between; ">
      <!-- First card -->
      <q-item
        v-ripple
        class="col items-center q-ml-none q-my-md q-mr-md topBlock"
        active-class="act"
        clickable
        @click="shiftTab(0)"
      >
        <q-icon
          :size="heightGlobalBlock+'px'"
          style="position:absolute;top:auto;left:auto;right:15%;bottom:10%;"
        >
          <div class="global" ref="global" :style="{height: heightGlobalBlock+'px'}">
            <div class="content" :style="{height: heightGlobalBlock+'px'}">
              <div
                class="centerBlock"
                v-for="(block, i) in graf"
                :key="i+block"
                :style="widthBlock()"
              >
                <div
                  class="block"
                  v-for="(b, e) in block"
                  :key="e"
                  :style="{height: grafBlockHight(b), width: widthMinBlock(), backgroundColor: aColor(e)}"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >сумма: {{formatNum(b)}}</q-tooltip>
                </div>
              </div>
            </div>
          </div>
        </q-icon>
        <q-item class="cal1" v-if="allMonthData">
          <q-item-label
            class="text-body1 text-weight-bolder nowrap"
          >{{allMonthData.sections[0].title}}</q-item-label>
          <q-item-label class="text-h5 q-pt-sm q-pb-md">{{formatNum(allMonthData.sections[0].summ)}}</q-item-label>
          <div class="raw">
            <q-avatar size="20px" color="green" text-color="white" icon="arrow_upward" />
            <q-item-label class="text-green q-ml-sm">0.22%</q-item-label>
          </div>
        </q-item>
        <q-item class="cal2">
          <q-avatar
            class="tooltip"
            size="20px"
            font-size="20px"
            color="white"
            text-color="grey-3"
            icon="help"
          >
            <span class="tooltiptext text-caption">tooltip message</span>
          </q-avatar>
        </q-item>
      </q-item>
      <!-- Second card -->
      <q-item
        class="col items-center q-ma-md topBlock"
        :active="active"
        active-class="act"
        clickable
        @click="shiftTab(1)"
      >
        <q-icon
          :size="heightGlobalBlock+'px'"
          style="position:absolute;top:auto;left:auto;right:15%;bottom:10%;"
        >
          <div class="global" ref="global" :style="{height: heightGlobalBlock+'px'}">
            <div class="content" :style="{height: heightGlobalBlock+'px'}">
              <div
                class="centerBlock"
                v-for="(block, i) in grafb"
                :key="i+block"
                :style="widthBlock()"
              >
                <div
                  class="block"
                  v-for="(b, e) in block"
                  :key="e"
                  :style="{height: grafBlockHight(b), width: widthMinBlock(), backgroundColor: bColor(e)}"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >сумма: {{formatNum(b)}}</q-tooltip>
                </div>
              </div>
            </div>
          </div>
        </q-icon>
        <q-item class="cal1" v-if="allMonthData">
          <q-item-label
            class="text-body1 text-weight-bolder nowrap"
          >{{allMonthData.sections[1].title}}</q-item-label>
          <q-item-label
            class="text-h5 q-pt-sm q-pb-md"
          >{{ formatNum(allMonthData.sections[1].summ) }}</q-item-label>
          <div class="raw">
            <q-avatar size="20px" color="green" text-color="white" icon="arrow_upward" />
            <q-item-label class="text-green q-ml-sm">5.16%</q-item-label>
          </div>
        </q-item>
        <q-item class="cal2">
          <q-avatar
            class="tooltip"
            size="20px"
            font-size="20px"
            color="white"
            text-color="grey-3"
            icon="help"
          >
            <span class="tooltiptext text-caption">tooltip message</span>
          </q-avatar>
        </q-item>
      </q-item>
      <!-- Third card -->
      <q-item
        class="col items-center q-ma-md topBlock"
        :active="active"
        active-class="act"
        clickable
        @click="shiftTab(2)"
      >
        <q-icon
          :size="heightGlobalBlock+'px'"
          style="position:absolute;top:auto;left:auto;right:15%;bottom:10%;"
        >
          <div class="global" ref="global" :style="{height: heightGlobalBlock+'px'}">
            <div class="content" :style="{height: heightGlobalBlock+'px'}">
              <div
                class="centerBlock"
                v-for="(block, i) in grafc"
                :key="i+block"
                :style="widthBlock()"
              >
                <div
                  class="block"
                  v-for="(b, e) in block"
                  :key="e"
                  :style="{height: grafBlockHight(b), width: widthMinBlock(), backgroundColor: cColor(e)}"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >сумма: {{formatNum(b)}}</q-tooltip>
                </div>
              </div>
            </div>
          </div>
        </q-icon>
        <q-item class="cal1" v-if="allMonthData">
          <q-item-label
            class="text-body1 text-weight-bolder nowrap"
          >{{allMonthData.sections[2].title}}</q-item-label>
          <q-item-label
            class="text-h5 q-pt-sm q-pb-md"
          >{{ formatNum(allMonthData.sections[2].summ) }}</q-item-label>
          <div class="raw">
            <q-avatar size="20px" color="red" text-color="white" icon="arrow_downward" />
            <q-item-label class="text-red q-ml-sm">0.74%</q-item-label>
          </div>
        </q-item>
        <q-item class="cal2">
          <q-avatar
            class="tooltip"
            size="20px"
            font-size="20px"
            color="white"
            text-color="grey-3"
            icon="help"
          >
            <span class="tooltiptext text-caption">tooltip message</span>
          </q-avatar>
        </q-item>
      </q-item>
      <!-- Fourth card -->
      <q-item
        class="col items-center q-mr-none q-my-md q-ml-md topBlock"
        :active="active"
        active-class="act"
        clickable
        @click="shiftTab(3)"
      >
        <q-icon size="255px" style="position:absolute;top:0;left:0;right:0;bottom:0;">
          <svg
            width="260"
            height="40"
            viewBox="0 0 260 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.118234"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.01239 26.8377C1.01305 25.5871 2.12998 24.7168 3.28547 25.1951C6.36537 26.4701 12.4723 29.7593 20.9637 37.9433C33.1381 49.6771 48.6081 32.4294 49.6393 31.2509C49.6779 31.2067 49.7044 31.1775 49.7467 31.1368C51.0582 29.8741 76.5299 5.82582 101.888 17.8996C127.924 30.2968 146.63 -0.781618 162.016 8.559C177.403 17.8996 181.646 44.6985 192.918 37.9433C197.122 35.4233 202.89 35.2372 207.683 29.8405C210.659 26.4884 215.536 16.4767 217.46 12.4041C217.921 11.427 219.069 10.9843 220.065 11.4028L224.267 13.1674C224.433 13.2372 224.589 13.3292 224.731 13.4408L229.876 17.4975C230.678 18.1304 231.829 18.0562 232.544 17.3255L244.012 5.60149C244.388 5.21682 244.903 5 245.441 5H258C259.105 5 260 5.89543 260 7V48C260 49.1046 259.105 50 258 50H3.00107C1.89608 50 1.00048 49.1039 1.00107 47.9989L1.01239 26.8377Z"
              fill="url(#paint0_linear)"
            />
            <path
              d="M1 22.6955C1 22.6955 8.35924 24.0651 20.9751 36.238C33.5909 48.4109 49.7413 29.4667 49.7413 29.4667C49.7413 29.4667 75.9312 3.7199 102.001 16.1466C128.07 28.5733 146.799 -2.57912 162.205 6.78374C177.611 16.1466 181.86 43.0092 193.145 36.238C204.43 29.4667 208.39 36.4584 213.198 20.1098C218.006 3.76117 222.746 11.2792 228.091 16.1466C233.435 21.014 240 8.79878 240 8.79878"
              stroke="url(#paint1_linear)"
              stroke-width="2.5"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M244 12C246.761 12 249 9.76142 249 7C249 4.23858 246.761 2 244 2C241.239 2 239 4.23858 239 7C239 9.76142 241.239 12 244 12Z"
              stroke="#5997E6"
              stroke-width="2.5"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="253.452"
                y1="8.00363"
                x2="14.0648"
                y2="77.6713"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" />
                <stop offset="0.0423345" stop-color="#D9E2F2" />
                <stop offset="1" stop-color="#5187E0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear"
                x1="240"
                y1="5"
                x2="1"
                y2="5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#60ADFA" />
                <stop offset="1" stop-color="#4A71E1" />
              </linearGradient>
            </defs>
          </svg>
        </q-icon>
        <q-item class="cal1" v-if="allMonthData">
          <q-item-label
            class="text-caption text-weight-bolder nowrap"
            style="padding: 4px 0;"
          >Должностной оклад</q-item-label>
          <q-item-label class="text-h5 q-pt-sm q-pb-md">
            {{formatNum(allMonthData.staff_salary)}}
            <span class="text-caption">СУМ</span>
          </q-item-label>
        </q-item>
        <q-item class="cal2" style="position: absolute; left: 10vw; bottom:25%;">
          <div class="cal2">
            <strong style="color:green">+37%</strong>
            <q-item-label class="text-caption text-grey-6 nowrap">
              <span>В этом месяце</span>
            </q-item-label>
          </div>
        </q-item>
      </q-item>
    </div>
    <!-- Card Section End -->

    <div class="row">
      <q-tab-panels v-model="tab" style="display: flex; flex: auto;" v-if="allMonthData">
        <!-- Tabs start -->
        <q-tab-panel
          :name="j"
          class="lined-box"
          v-for="(data, j) in allMonthData.sections"
          :key="j"
        >
          <q-item-section class="raw q-my-md" style="justify-content: space-between">
            <q-item class="cal1">
              <q-item-label class="text-weight-bold text-h5">{{data.title}}</q-item-label>
              <q-item-label class="text-weight-bold text-h5">{{data.summ}}</q-item-label>
            </q-item>
            <q-item class="cal2">
              <q-item-label class="tex-h6 text-weight-bolder">
                ВЫ РАБОТАЛИ:
                <span style="color:orange">
                  <strong class="text-h5">{{allMonthData.worked_days}}</strong>
                  дня
                </span>
                <span style="color:grey">
                  <strong class="text-h5">{{allMonthData.worked_hours}}</strong>
                  ЧАСОВ
                </span>
              </q-item-label>
              <q-item-label class="text-wight-bolder" style="color:grey">
                Рабочих дней в Июне месяце -
                <strong>{{allMonthData.work_days}}</strong>дня; Выходных -
                <strong>{{allMonthData.day_offs}}</strong>
              </q-item-label>
            </q-item>
          </q-item-section>
          <q-separator class="q-mb-md" />
          <q-item class="lined-content" v-for="(detail, k) in data.details" :key="k">
            <q-item-label class="lined-text text-weight-bold">{{detail.PAY_NAME}}</q-item-label>
            <q-item-label class="lined-value text-light-green-14 text-weight-bold">{{detail.SUMM}}</q-item-label>
          </q-item>
        </q-tab-panel>

        <!-- Tabs end -->
      </q-tab-panels>

      <div class="right_pane">
        <!-- kurs valyuta -->
        <q-item class="card1 cal1">
          <q-item-label>Курс валют</q-item-label>
          <q-item
            class="rowline text-caption q-gutter-sm vertical-top"
            v-for="(note, j) in exchangeRate"
          >
            <q-item-label class="text-h6 text-wight-bold">{{note.code}}</q-item-label>
            <q-avatar size="25px" color="green" text-color="white" icon="arrow_upward" />
            <q-item-label class="text-body1 text-wight-bold">{{formatNum(note.nbu_buy_price)}}</q-item-label>
            <q-avatar size="25px" color="red" text-color="white" icon="arrow_downward" />
            <q-item-label class="text-body1 text-wight-bold">{{formatNum(note.nbu_cell_price)}}</q-item-label>
          </q-item>
        </q-item>
        <!-- kurs valyuta end-->

        <q-item class="q-pa-lg bg-white text-grey-7 cal1" style="border-radius: 5px;">
          <div class="raw h6 q-my-sm">
            <div
              class="bg-blue-2 h5 q-pa-md q-mr-md rounded-borders text-center"
              style="min-width:83px"
            >679.330</div>
            <div class="q-pa-xs">Базовая расчетная величина (сум)</div>
          </div>
          <div class="raw h6 q-my-sm">
            <div
              class="bg-blue-2 h5 q-pa-md q-mr-md rounded-borders text-center"
              style="min-width:83px"
            >223.000</div>
            <div class="q-pa-xs">Минимальный размер заработной платы (сум)</div>
          </div>
          <div class="raw h6 q-my-sm">
            <div
              class="bg-blue-2 h5 q-pa-md q-mr-md rounded-borders text-center"
              style="min-width:83px"
            >12.5%</div>
            <div class="q-pa-xs">Подоходный налог %</div>
          </div>
          <div class="text-caption text-grey-4 q-pa-sm">Обновлено: 01.02.2020</div>
        </q-item>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      active: false,
      tab: 0,
      graf: [[10, 8, 13, 19, 18, 11.5]],
      grafb: [[11, 8, 14, 10, 15, 12]],
      grafc: [[9, 8, 16, 13, 12, 17]],
      //months: null,
      //names: null,
      colora: [
        "#EEF6FD",
        "#EEF6FD",
        "#EEF6FD",
        "#EEF6FD",
        "#EEF6FD",
        "#61A4E4"
      ],
      colorb: [
        "#FEF4F4",
        "#FEF4F4",
        "#FEF4F4",
        "#FEF4F4",
        "#FEF4F4",
        "#FFC5C5"
      ],
      colorc: [
        "#FEF3E7",
        "#FEF3E7",
        "#FEF3E7",
        "#FEF3E7",
        "#FEF3E7",
        "#FFA958"
      ],
      heightGlobalBlock: 90,

      selectedMonth: null,
      dateSelectOptions: [],
      allMonthData: null,
      exchangeRate: []
    };
  },
  created() {
    this.$axios
      .get("/emps/kvitok/dates?uid=" + this.emp_id)
      .then(
        response => {
          response.data.data.forEach(el => {
            let arr = {
              label: el.text,
              value: el.date
            };
            this.dateSelectOptions.push(arr);
          });
          this.selectedMonth = this.dateSelectOptions[0];
          this.monthData({
            uid: this.emp_id,
            date: this.selectedMonth.value
          });
        },
        error => {
          console.log({ error });
        }
      )
      .catch(error => {
        console.log({ error });
      });
    this.$axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://nbu.uz/exchange-rates/json/"
      )
      .then(
        res => {
          this.exchangeRate = res.data.filter(el => {
            return el.code == "EUR" || el.code == "USD";
          });
        },
        err => {
          console.error({ err });
        }
      )
      .catch(error => {
        console.error({ error });
      });
  },
  mounted() {
    // this.graf = this.tables.graf;
    // if (this.tables.months) this.months = this.tables.months;
    // if (this.tables.heightGlobalBlock)
    //   this.heightGlobalBlock = this.tables.heightGlobalBlock;
    // this.names = this.tables.names;
  },
  computed: {
    ...mapGetters({
      emp_id: "auth/empId"
    })
  },
  methods: {
    monthData(params) {
      this.$axios({
        url: "/emps/kvitok/month",
        method: "post",
        data: params
      })
        .then(response => {
          this.allMonthData = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    shiftTab(tabNo) {
      this.tab = tabNo;
    },
    selected() {
      let arr = {
        uid: this.emp_id,
        date: this.selectedMonth.value
      };
      this.monthData(arr);
    },
    aColor(num) {
      return this.colora[num];
    },
    bColor(num) {
      return this.colorb[num];
    },
    cColor(num) {
      return this.colorc[num];
    },
    widthBlock() {
      const width = 100 / this.graf.length - 4 + "%";
      return `width: ${width}`;
    },
    widthMinBlock() {
      const width = 100 / this.graf.length + "%";
      return width;
    },
    maxNum() {
      let arr = [];
      for (let i = 0; i < this.graf.length; i++) {
        for (let e = 0; e < this.graf[i].length; e++) {
          arr.push(this.graf[i][e]);
        }
      }
      return Math.max.apply(null, arr);
    },
    grid() {
      let maxNum = this.maxNum();

      let numMin = ["1"];
      for (let i = 1; i < String(maxNum).length; i++) {
        numMin.push("0");
      }

      let resMaxNum = maxNum / Number(numMin.join(""));

      if (String(resMaxNum)[2] >= 5) {
        resMaxNum = Number(String(resMaxNum)[0]) + 1;
      } else if (String(resMaxNum)[2] > 0) {
        resMaxNum = Number(String(resMaxNum)[0] + "." + "5");
      } else {
        resMaxNum = Number(String(resMaxNum)[0]);
      }

      if (String(maxNum).length == 1) {
        if (resMaxNum >= 5) {
          resMaxNum = 10;
        } else {
          resMaxNum = 5;
        }
      } else {
        if (resMaxNum >= 3 && resMaxNum < 5) {
          resMaxNum = 5;
        } else if (resMaxNum > 5 && resMaxNum < 10) {
          resMaxNum = 10;
        } else if (resMaxNum == 1) {
          resMaxNum = resMaxNum + 0.5;
        }
      }

      let del = resMaxNum < 10 ? (resMaxNum * 10) / 5 : resMaxNum / 5;
      if (del > 4) del = 5;

      if (numMin.length > 1) resMaxNum *= Number(numMin.join(""));

      let delArr = [0];
      for (let i = 0; i < del; i++) {
        delArr.push(delArr[i] + resMaxNum / del);
      }
      return delArr;
    },
    grafBlockHight(num) {
      const proc = Math.max.apply(null, this.grid()) / this.heightGlobalBlock;
      return num / proc + "px";
    },
    gridTableHeight(num) {
      const proc = Math.max.apply(null, this.grid()) / this.heightGlobalBlock;
      return num / proc + "px";
    },
    leftWidth() {
      const num = String(this.maxNum()).length;
      return Number(num) * 5 + "px";
    },
    formatNum(str) {
      str = Math.round(str);
      str = String(str);
      // str = str.replace(/(\.(.*))/g, '');
      var arr = str.split("");
      var str_temp = "";
      if (str.length > 3) {
        for (var i = arr.length - 1, j = 1; i >= 0; i--, j++) {
          str_temp = arr[i] + str_temp;
          if (j % 3 == 0) {
            str_temp = "," + str_temp;
          }
        }
        return str_temp;
      } else {
        return str;
      }
    }
  }
};
// Avenir Next;
</script>
<style lang="sass" scoped>
@font-face
  font-family: 'Avant'
  src: url('~assets/fonts/avant.ttf') format('truetype')

.right_pane
  width: 300px
  min-width: 300px
  margin-left: 20px
  justify-items: center

.topBlock 
  background: #fff
  display: flex
  border-radius: 5px
  font-style: normal
  font-weight: normal
  font-size: 14px
  min-height: 150px
  overflow: hidden

.card1
  color: $grey-7
  max-width: 300px
  padding: 10px
  background-color: #fff
  display: flex
  flex: auto
  flex-direction: column
  justify-content: flex-start
  margin-bottom: 20px
  border-radius: 5px

.q-tabs__content--align-center
  justify-content: space-between  

.fontb
  font-family: 'Avant'

.blackf
  color: #000000

.greyf
  color: #414141

.orangef
  color: orange

.act
  background-color: #f00

.nowrap
  white-space: nowrap

.topcard
  background-color: #ffffff
  display: flex
  flex-wrap: nowrap
  flex-direction: row
  border-radius: 4px
  margin: 2px
  min-width: 250px
  max-width: 250px
  max-height: 114px
  min-height: 114px
  vertical-align: baseline
  justify-content: space-between
  &::before
    content: ''
    top: 0
    left: 0
    right: 0
    bottom: 0
    position: absolute
    outline: 2px solid transparent
    -moz-outline-radius: 4px
  &:active
    -moz-outline-radius: 4px
    outline: 2px solid #0000ff
  &:hover + .topcard
    -moz-outline-radius: 4px
    
.lined-box
  display: flex
  flex-direction: column
  flex-grow: 1
  
.lined-content
  display: flex
  flex-direction: row
  flex: auto
  align-items: center
  justify-content: space-between

.lined-text
  background-color: #ffffff
  padding-right: 10px
  z-index: 2

.lined-value
  background-color: #ffffff
  &:after
    content: ''
    position: absolute
    top: 40%
    right: 15%
    left: 5%
    height: 1px
    background: rgba(0,0,0,0.12)
    z-index: 1
      
.raw
  display: flex
  flex-direction: row
  align-items: center
  justify-content: flex-start

.rowline
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-between

.row
  display: flex
  flex-direction: row
  align-items: flex-start 
  justify-content: space-between
  flex-wrap: nowrap

.cal1
  display: flex
  flex-direction: column
  

.cal2
  display: flex
  flex-direction: column
  align-items: flex-end
  justify-content: flex-start

.date-text
  font-family: Arial, Helvetica, sans-serif
  font-size: 14px
  color: gray
  padding: 0px 16px
  align-items: center

.font
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif

.tooltip .tooltiptext 
  visibility: hidden
  width: 120px
  background-color: #555
  color: #fff
  text-align: center
  border-radius: 6px
  padding: 5px 0
  position: absolute
  z-index: 1
  bottom: -160%
  left: 50%
  margin-left: -102px
  opacity: 0
  transition: opacity 0.3s


.tooltip .tooltiptext
  &::after 
    content: ""
    position: absolute
    bottom: 100%
    right: 10%
    margin-left: -5px
    border-width: 5px
    border-style: solid
    border-color: transparent transparent #555 transparent


.tooltip
  &:hover .tooltiptext 
    visibility: visible
    opacity: 1

</style>
<style scoped>
.global {
  width: 100%;
  height: 300px;
  display: flex;
  margin-bottom: 15px;
  padding-right: 20px;
}
.content {
  flex-grow: 10;
  height: 300px;
  min-width: 100px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  position: relative;
}
.centerBlock {
  display: flex;
  width: 50px;
  align-items: flex-end;
  position: relative;
}
.block {
  height: 50px;
  z-index: 1;
  border-radius: 2px;
  margin-right: 2px;
}
</style>