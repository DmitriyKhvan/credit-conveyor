<template>
 <div class="q-pa-md fontb greyf">
   <div class="row justify-between">
     <div class="text-h4 blackf text-weight-bolder">Поступления</div>
     <div class="raw bg-white shadow-1" style="border-radius: 5px;">
       <q-icon name="date_range" class="text-h5 text-red-6 q-ml-md" />
       <q-item class="text-caption q-py-md text-grey-7">май 02.2020 - июнь 02.2020</q-item>
     </div>
   </div>
   <!-- Card Section -->
    <div class="row q-py-xs" style="display: flex; flex: auto; justify-content: space-between; ">
    <!-- First card -->
      <q-item 
        v-ripple
        class="col items-center q-ml-none q-my-md q-mr-md topBlock" 
        active-class="act" clickable @click="tab = 'tab1'" >
        <q-icon 
          size="90px" 
          style="position:absolute;top:30%;left:auto;right:10%;bottom:0;">
          <svg width="87" height="62" viewBox="0 0 87 62" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="28" width="12" height="34" rx="2" fill="#EEF6FD"/><rect x="15" y="31" width="12" height="31" rx="2" fill="#EEF6FD"/><rect x="30" y="20" width="12" height="42" rx="2" fill="#EEF6FD"/><rect x="45" width="12" height="62" rx="2" fill="#EEF6FD"/><rect x="60" y="8" width="12" height="54" rx="2" fill="#EEF6FD"/><rect x="75" y="5" width="12" height="57" rx="2" fill="#61A4E4"/></svg>
        </q-icon>
        <q-item class="cal1">
          <q-item-label 
            class="text-body1 text-weight-bolder nowrap">
            Начисленя
          </q-item-label>
          <q-item-label 
            class="text-h5 q-pt-sm q-pb-md">
            6.000.000
          </q-item-label>
          <div class="raw">
            <q-avatar 
              size="20px" 
              color="green" 
              text-color="white" 
              icon="north_east" />
            <q-item-label 
              class="text-green q-ml-sm">
              0.22%
              </q-item-label>
          </div>
        </q-item>
        <q-item class="cal2">
          <q-avatar 
            class="tooltip"
            size="20px" 
            font-size="20px" 
            color="white" 
            text-color="grey-3" 
            icon="help" >
              <span class="tooltiptext text-caption">
                tooltip message
              </span>
            </q-avatar>
        </q-item>
      </q-item>
      <!-- Second card -->
      <q-item 
        class="col items-center q-ma-md topBlock" 
        :active="active" 
        active-class="act" 
        clickable 
        @click="tab = 'tab2'" >
        <q-icon  
          size="90px" 
          style="position:absolute;top:30%;left:auto;right:10%;bottom:0;">
          <svg width="87" height="54" viewBox="0 0 87 54" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="20" width="12" height="34" rx="2" fill="#FEF4F4"/><rect x="15" y="23" width="12" height="31" rx="2" fill="#FEF4F4"/><rect x="30" y="20" width="12" height="34" rx="2" fill="#FEF4F4"/><rect x="45" y="12" width="12" height="42" rx="2" fill="#FEF4F4"/><rect x="60" y="6" width="12" height="48" rx="2" fill="#FEF4F4"/><rect x="75" width="12" height="54" rx="2" fill="#FFC5C5"/></svg>
        </q-icon>
        <q-item class="cal1">
          <q-item-label 
            class="text-body1 text-weight-bolder nowrap">
            Удержано
          </q-item-label>
          <q-item-label 
            class="text-h5 q-pt-sm q-pb-md">
            5.000.000
          </q-item-label>
          <div class="raw">
            <q-avatar 
              size="20px" 
              color="green" 
              text-color="white" 
              icon="north_east" />
            <q-item-label 
            class="text-green q-ml-sm">
            5.16%
          </q-item-label>
          </div>
        </q-item>
        <q-item class="cal2">
          <q-avatar 
            class="tooltip"
            size="20px" 
            font-size="20px" 
            color="white" 
            text-color="grey-3" 
            icon="help" >
              <span class="tooltiptext text-caption">
                tooltip message
              </span>
            </q-avatar>
        </q-item>
      </q-item>
      <!-- Third card -->
      <q-item 
        class="col items-center q-ma-md topBlock" 
        :active="active" 
        active-class="act" 
        clickable 
        @click="tab = 'tab3'" >
        <q-icon  
          size="90px" 
          style="position:absolute;top:30%;left:auto;right:10%;bottom:0;">
          <svg width="87" height="50" viewBox="0 0 87 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="16" width="12" height="34" rx="2" fill="#FEF3E7"/><rect x="15" y="19" width="12" height="31" rx="2" fill="#FEF3E7"/><rect x="30" y="8" width="12" height="42" rx="2" fill="#FEF3E7"/><rect x="45" width="12" height="50" rx="2" fill="#FEF3E7"/><rect x="60" y="3" width="12" height="47" rx="2" fill="#FEF3E7"/><rect x="75" y="5" width="12" height="45" rx="2" fill="#FFA958"/></svg>
        </q-icon>
        <q-item class="cal1">
          <q-item-label 
            class="text-body1 text-weight-bolder nowrap">
            С начала года
          </q-item-label>
          <q-item-label class="text-h5 q-pt-sm q-pb-md">
            14.000.000
          </q-item-label>
          <div class="raw">
            <q-avatar 
              size="20px" 
              color="red" 
              text-color="white" 
              icon="south_west" />
            <q-item-label class="text-red q-ml-sm">
              0.74%
            </q-item-label>
          </div>
        </q-item>
        <q-item class="cal2">
          <q-avatar 
            class="tooltip"
            size="20px" 
            font-size="20px" 
            color="white" 
            text-color="grey-3" 
            icon="help" >
              <span class="tooltiptext text-caption">
                tooltip message
              </span>
            </q-avatar>
        </q-item>
      </q-item>
      <!-- Fourth card -->
      <q-item 
        class="col items-center q-mr-none q-my-md q-ml-md topBlock" 
        :active="active" 
        active-class="act" 
        clickable 
        @click="tab = 'tab4'" >
        <q-icon size="255px" style="position:absolute;top:0;left:0;right:0;bottom:0;">
          <svg width="260" height="40" viewBox="0 0 260 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.118234" fill-rule="evenodd" clip-rule="evenodd" d="M1.01239 26.8377C1.01305 25.5871 2.12998 24.7168 3.28547 25.1951C6.36537 26.4701 12.4723 29.7593 20.9637 37.9433C33.1381 49.6771 48.6081 32.4294 49.6393 31.2509C49.6779 31.2067 49.7044 31.1775 49.7467 31.1368C51.0582 29.8741 76.5299 5.82582 101.888 17.8996C127.924 30.2968 146.63 -0.781618 162.016 8.559C177.403 17.8996 181.646 44.6985 192.918 37.9433C197.122 35.4233 202.89 35.2372 207.683 29.8405C210.659 26.4884 215.536 16.4767 217.46 12.4041C217.921 11.427 219.069 10.9843 220.065 11.4028L224.267 13.1674C224.433 13.2372 224.589 13.3292 224.731 13.4408L229.876 17.4975C230.678 18.1304 231.829 18.0562 232.544 17.3255L244.012 5.60149C244.388 5.21682 244.903 5 245.441 5H258C259.105 5 260 5.89543 260 7V48C260 49.1046 259.105 50 258 50H3.00107C1.89608 50 1.00048 49.1039 1.00107 47.9989L1.01239 26.8377Z" fill="url(#paint0_linear)"/><path d="M1 22.6955C1 22.6955 8.35924 24.0651 20.9751 36.238C33.5909 48.4109 49.7413 29.4667 49.7413 29.4667C49.7413 29.4667 75.9312 3.7199 102.001 16.1466C128.07 28.5733 146.799 -2.57912 162.205 6.78374C177.611 16.1466 181.86 43.0092 193.145 36.238C204.43 29.4667 208.39 36.4584 213.198 20.1098C218.006 3.76117 222.746 11.2792 228.091 16.1466C233.435 21.014 240 8.79878 240 8.79878" stroke="url(#paint1_linear)" stroke-width="2.5"/><path fill-rule="evenodd" clip-rule="evenodd" d="M244 12C246.761 12 249 9.76142 249 7C249 4.23858 246.761 2 244 2C241.239 2 239 4.23858 239 7C239 9.76142 241.239 12 244 12Z" stroke="#5997E6" stroke-width="2.5"/><defs><linearGradient id="paint0_linear" x1="253.452" y1="8.00363" x2="14.0648" y2="77.6713" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="0.0423345" stop-color="#D9E2F2"/><stop offset="1" stop-color="#5187E0"/></linearGradient><linearGradient id="paint1_linear" x1="240" y1="5" x2="1" y2="5" gradientUnits="userSpaceOnUse"><stop stop-color="#60ADFA"/><stop offset="1" stop-color="#4A71E1"/></linearGradient></defs></svg>
        </q-icon>
        <q-item class="cal1">
          <q-item-label 
            class="text-caption text-weight-bolder nowrap"
            style="padding: 4px 0;"
            >
            Должностной оклад
          </q-item-label>
          <q-item-label class="text-h5 q-pt-sm q-pb-md">
            5.000.000 
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
      <q-tab-panels v-model="tab" style="display: flex; flex: auto;">
        <!-- Tabs start -->
        <q-tab-panel name="tab1" class="lined-box">
          <q-item-section class="raw q-my-md" style="justify-content: space-between">
            <q-item class="cal1">
              <q-item-label class="text-weight-bold text-h5">Начисленя</q-item-label>
              <q-item-label class="text-weight-bold text-h5">+6.000.000</q-item-label>
            </q-item>
            <q-item class="cal2">
              <q-item-label class="tex-h6 text-weight-bolder">
                ВЫ РАБОТАЛИ:
                <span style="color:orange">
                  <strong class="text-h5"> 20 </strong>
                  дня
                </span>
                  <span style="color:grey">
                    <strong class="text-h5"> 160 </strong>
                    ЧАСОВ
                  </span>
                </q-item-label>
              <q-item-label class="text-wight-bolder" style="color:grey">
                Рабочих дней в Июне месяце - <Strong>22</Strong> дня; Выходных - <strong>9</strong>
              </q-item-label>
            </q-item>
          </q-item-section>
          <q-separator class="q-mb-md" />
          <q-item class="lined-content" v-for="(i, j) in data1" :key="j">
            <q-item-label class="lined-text text-weight-bold">
              {{j}}
            </q-item-label>
            <q-item-label class="lined-value text-light-green-14 text-weight-bold">
              {{i}}
            </q-item-label>
          </q-item>
          
        </q-tab-panel>
        <q-tab-panel name="tab2" class="lined-box">
          
          <q-item-section class="raw q-my-md" style="justify-content: space-between">
            <q-item class="cal1">
              <q-item-label class="text-weight-bold text-h5">Удержано</q-item-label>
              <q-item-label class="text-weight-bold text-h5">+5.000.000</q-item-label>
            </q-item>
            <q-item class="cal2">
              <q-item-label class="tex-h6 text-weight-bolder">
                ВЫ РАБОТАЛИ:
                <span style="color:orange">
                  <strong class="text-h5"> 20 </strong>
                  дня
                </span>
                  <span style="color:grey">
                    <strong class="text-h5"> 160 </strong>
                    ЧАСОВ
                  </span>
                </q-item-label>
              <q-item-label class="text-wight-bolder" style="color:grey">
                Рабочих дней в Июне месяце - <Strong>22</Strong> дня; Выходных - <strong>9</strong>
              </q-item-label>
            </q-item>
          </q-item-section>
          <q-separator class="q-mb-md" />
          <q-item class="lined-content" v-for="(i, j) in data1" :key="j">
            <q-item-label class="lined-text text-weight-bold">
              {{j}}
            </q-item-label>
            <q-item-label class="lined-value text-light-green-14 text-weight-bold">
              {{i}}
            </q-item-label>
          </q-item>
          
          
        </q-tab-panel>
        <q-tab-panel name="tab3" class="lined-box">
          
          <q-item-section class="raw q-my-md" style="justify-content: space-between">
            <q-item class="cal1">
              <q-item-label class="text-weight-bold text-h5">Начисления с начала года</q-item-label>
              <q-item-label class="text-weight-bold text-h5">+14.000.000</q-item-label>
            </q-item>
            <q-item class="cal2">
              <q-item-label class="tex-h6 text-weight-bolder">
                ВЫ РАБОТАЛИ:
                <span style="color:orange">
                  <strong class="text-h5"> 20 </strong>
                  дня
                </span>
                  <span style="color:grey">
                    <strong class="text-h5"> 160 </strong>
                    ЧАСОВ
                  </span>
                </q-item-label>
              <q-item-label class="text-wight-bolder" style="color:grey">
                Рабочих дней в Июне месяце - <Strong>22</Strong> дня; Выходных - <strong>9</strong>
              </q-item-label>
            </q-item>
          </q-item-section>
          <q-separator class="q-mb-md" />
          <q-item class="lined-content" v-for="(i, j) in data1" :key="j">
            <q-item-label class="lined-text text-weight-bold">
              {{j}}
            </q-item-label>
            <q-item-label class="lined-value text-light-green-14 text-weight-bold">
              {{i}}
            </q-item-label>
          </q-item>
          
          
        </q-tab-panel>
        <q-tab-panel name="tab4" class="lined-box">
          
          <q-item-section class="raw q-my-md" style="justify-content: space-between">
            <q-item class="cal1">
              <q-item-label class="text-weight-bold text-h5">Текущая оклад составляет</q-item-label>
              <q-item-label class="text-weight-bold text-h5">+5.000.000</q-item-label>
            </q-item>
            <q-item class="cal2">
              <q-item-label class="tex-h6 text-weight-bolder">
                ВЫ РАБОТАЛИ:
                <span style="color:orange">
                  <strong class="text-h5"> 20 </strong>
                  дня
                </span>
                  <span style="color:grey">
                    <strong class="text-h5"> 160 </strong>
                    ЧАСОВ
                  </span>
                </q-item-label>
              <q-item-label class="text-wight-bolder text-grey-8">
                Рабочих дней в Июне месяце - <Strong>22</Strong> дня; Выходных - <strong>9</strong>
              </q-item-label>
            </q-item>
          </q-item-section>
          <q-separator class="q-mb-md" />
          <q-item class="lined-content" v-for="(i, j) in data1" :key="j">
            <q-item-label class="lined-text text-weight-bold">
              {{j}}
            </q-item-label>
            <q-item-label class="lined-value text-light-green-14 text-weight-bold">
              {{i}}
            </q-item-label>
          </q-item>
          
          
        </q-tab-panel>
        
        <!-- Tabs end -->
      </q-tab-panels>

      <div class="right_pane">
        <q-item class="card1 cal1">
          <q-item-label>Курс валют</q-item-label>
          <q-item class="rowline text-caption q-gutter-sm vertical-top">
            <q-item-label class="text-h6  text-wight-bold">USD</q-item-label>
            <q-avatar size="25px" color="green" text-color="white" icon="north_east" />
            <q-item-label class="text-body1 text-wight-bold ">
              10210.00
            </q-item-label>
            <q-avatar size="25px" color="red" text-color="white" icon="south_west" />
            <q-item-label class="text-body1 text-wight-bold ">
              10251.00
            </q-item-label>  
          </q-item>
          <q-item class="rowline text-caption q-gutter-sm vertical-top">
            <q-item-label class="text-h6 text-wight-bold ">EUR</q-item-label>
            <q-avatar size="25px" color="green" text-color="white" icon="north_east" />
            <q-item-label class="text-body1 text-wight-bold ">
              11000.00
            </q-item-label>
            <q-avatar size="25px" color="red" text-color="white" icon="south_west" />
            <q-item-label class="text-body1 text-wight-bold ">
              11700.00
            </q-item-label>  
          </q-item>
          
        </q-item>
        <q-item class="q-pa-lg bg-white text-grey-7 cal1" style="border-radius: 5px;">
          <div class="raw h6 q-my-sm">
            <div class="bg-blue-2 h5 q-pa-md q-mr-md rounded-borders text-center" style="min-width:83px">679.330</div>
            <div class="q-pa-xs">Базовая расчетная величина (сум)</div>
          </div>
          <div class="raw h6 q-my-sm">
            <div class="bg-blue-2 h5 q-pa-md q-mr-md rounded-borders text-center" style="min-width:83px">223.000</div>
            <div class="q-pa-xs">Минимальный размер заработной платы (сум)</div>
          </div>
          <div class="raw h6 q-my-sm">
            <div class="bg-blue-2 h5 q-pa-md q-mr-md rounded-borders text-center" style="min-width:83px">12.5%</div>
            <div class="q-pa-xs">Подоходный налог %</div>
          </div>
          <div class="text-caption text-grey-4 q-pa-sm">Обновлено: 01.02.2020</div>
          
        </q-item>
      </div>
    </div>
 </div>
</template>
<script>
import axios from "axios";
export default {
  data () {
    return {
      active: false,
      tab: 'tab1',
      data1: {
        "Оклад по штатному расписанию" : "+ 2.000.000",
        "Персональная надбавка" : "+ 350.000",
        "Надбавка за выслогулет сотрудника" : "+ 200.000",
        "Ежемесячная премия" : "+ 800.000",
        "Квартальная премия" : "+ 2.100.000",
        "Социальная защита (Питание)" : "+ 150.000"
      }
    }
  }
}
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
    border-color:  transparent transparent #555 transparent


.tooltip
  &:hover .tooltiptext 
    visibility: visible
    opacity: 1

</style>
