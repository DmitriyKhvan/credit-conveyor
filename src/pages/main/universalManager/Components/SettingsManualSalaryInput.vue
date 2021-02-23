<template>
  <div class="settingsProcess" :id="title.id">
    <pre>
      {{filialsAllowSalary}}
      ________________________________
      {{addEditFilials}}
    </pre>
    
    <q-expansion-item
      class="settingBlock"
      :header-class="'headerBlock'"
      :label="title.name"
      v-model="expanded"
    >
      <q-card class="contentBlock">
        <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-8 toogleBtn">
                <p>Разрешить Ручной ввод ЗП на уточнение </p>

                <q-toggle
                  class="customeToggle"
                  :false-value=0
                  :label="options[MANUAL_SALARY_INPUT.applied]"
                  :true-value=1
                  v-model="MANUAL_SALARY_INPUT.applied"
                  @input="setManualSalaryInput($event)"
                />
              </div>
              <!-- <div class="col-4">
                <q-input
                  class="customInput"
                  ref=""
                  outlined
                  dense
                  label="Для кого"
                  :rules="[val => !!val || 'Введите данные']"
                />
              </div> -->
              
            </div>

            <template v-if="MANUAL_SALARY_INPUT.applied == 0">
              <div class="borderRow"></div>
              <div 
                v-for="(filial, index) of filialsAllowSalary" 
                :key="'filial' + index" 
                class="row q-col-gutter-md add2"
              >
                
                  <div class="col-5">
                    <q-select
                      ref="filials"
                      outlined
                      clearable
                      v-model="filial.mfo"
                      use-input
                      :options="Filials"
                      :option-value="(item) => item === null ? null : item.value"
                      :option-disable="(item) => item.value === '99999' || 
                                                  filialsAllowSalary.find(i => i.mfo === item.value)
                                                    ? true 
                                                    : false"
                      :option-label="(item) => filial.mfo != '' && filials.length
                                  ? fil(filial.mfo)
                                  : item.label"
                      @filter="filterFn"
                      @input="setAddEditFilials(filial.mfo, index)"
                      label="Филиал"
                      emit-value
                      map-options
                      options-selected-class="text-deep-blue"
                      :rules="[val => !!val || 'Выберите данные']"  
                    >
                      <template v-slot:option="scope">
                      <q-item
                        v-bind="scope.itemProps"
                        v-on="scope.itemEvents"
                      >
                        <q-item-section>
                          <div :class="scope.opt.class">
                            <q-item-label v-html="scope.opt.label" />
                          </div>
                        </q-item-section>
                      </q-item>
                    </template>
                    </q-select>
                  </div>

                  <div class="col-6">
                    <q-select
                      ref="productIds"
                      outlined
                      v-model="filial.product_ids"
                      multiple
                      :options="settings.LOAN_PRODUCT_CHAR"
                        :option-value="(item) => item === null ? null : item.id"
                        option-label="name"
                        emit-value
                        map-options
                      use-chips
                      stack-label
                      label="Вид кредита"
                      @input="setAddEditFilials(filial.mfo, index)"
                      :rules="[val => val.length || 'Выберите данные']"  
                    />
                  </div>
                  <div class="col-1 removeItem">
                    <q-btn flat round icon="close" @click="removeItem(filial.mfo, index)">
                      <q-tooltip>Удалить</q-tooltip>
                    </q-btn>
                  </div>
                
              </div>
              <div class="btnBlockAdmin">
                <q-btn
                  unelevated
                  label="Добавить филиал"
                  class="addItem add"
                  @click="addFilial"
                />
              </div>
            
            </template>
           
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>
<script>
import creditSettings from "../mixins/creditSettings";
import AlertMessage from '../Components/AlertMessage'

export default {
  mixins: [creditSettings],
  data() {
    return {
      model: null,
      modelMultiple: [],
      
      // filialsAllowSalary: [],
      // filialsAllowSalary: [
      //   {
      //     MFO: '00407',
      //     PROD_ID: [1,2]
      //   }
      // ],

      options: {
        1: 'Вкл',
        0: 'Выкл'
      },
      Filials: this.$store.getters["creditsAdmin/getFilials"]
    };
  },
  async created() {
    try {
      await this.$store.dispatch("creditsAdmin/getFilials")
      await this.$store.dispatch("creditSettings/getFilialsAllowSalary")
    } catch(error) {
      console.log(error)
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.commit("creditSettings/setRefs", this.$refs);
      // console.log('this.$refs.filials', this.$refs.filials[0])
      // this.$refs.filials[0].focus()
    }, 3000);

	}, 
	computed: {
    MORATORIUM_PERIODD() {
      return this.settings.APPSETTING.find(i => i.paramName == 'MORATORIUM_PERIODD')
    },
    APPLIFE_PERIOD() {
      return this.settings.APPSETTING.find(i => i.paramName == 'APPLIFE_PERIOD')
    },
    INPS_BANK() {
      return this.settings.APPSETTING.find(i => i.paramName == 'INPS_BANK')
    },
    REPEAT_INPS() {
      return this.settings.APPSETTING.find(i => i.paramName == 'REPEAT_INPS')
    },
    MANUAL_SALARY_INPUT() {
      return this.settings.APPSETTING.find(i => i.paramName == 'MANUAL_SALARY_INPUT')
    },
    REQ_RELATIVES_COUNT() {
      return this.settings.APPSETTING.find(i => i.paramName == 'REQ_RELATIVES_COUNT')
    },
    CONVENIENT_REPAYMENT() {
      return this.settings.APPSETTING.find(i => i.paramName == 'CONVENIENT_REPAYMENT')
    },
    REPEAT_ASOKI() {
      return this.settings.APPSETTING.find(i => i.paramName == 'REPEAT_ASOKI')
    },
    filials() {
      // console.log(JSON.stringify(this.$store.getters["creditsAdmin/getFilials"], null, 2))
      return this.$store.getters["creditsAdmin/getFilials"]
    },
  },
  methods: {
    filterFn (val, update) {
      
      if (val === '') {
        update(() => {
          this.Filials = this.filials
        })
        
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.Filials = this.filials.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },

    fil(MFO) {
      return this.filials.find(i => i.value === MFO) 
          ? this.filials.find(i => i.value === MFO).label
          : ""
    },

    addFilial() {
      console.log(this.filialsAllowSalary)
      this.filialsAllowSalary.push({
          mfo: '',
          product_ids: []
        })
    },

    
    setAddEditFilials(mfo, index) {
      console.log('dddddd', mfo, index)
      const idx = this.addEditFilials.findIndex(i => i.mfo === mfo) 
      if (idx !== -1 ) {
        this.addEditFilials.splice(idx, 1, this.filialsAllowSalary[index])
      } else {
        this.addEditFilials.push(this.filialsAllowSalary[index])
      }
    },

    removeItem(mfo, index) {
      const MFO = this.filialsAllowSalary[index].mfo
      const product_ids = this.filialsAllowSalary[index].product_ids
     
      const idx = this.addEditFilials.findIndex(i => i.mfo === mfo) 
      if (idx !== -1 ) {
        this.addEditFilials.splice(idx, 1)
      }

      if (MFO && product_ids.length) {
        debugger
        this.$q.dialog({
          component: AlertMessage,
          parent: this,
          data: {
            mfo
          }
        })
      } else {
        this.filialsAllowSalary.splice(index, 1)
      }
      
    },
    
    setManualSalaryInput(value) {
      setTimeout(() => {
        this.$store.commit("creditSettings/setRefs", this.$refs);
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
  .settingsProcess {
    .borderRow {
      width: 100%;
      height: 1px;
      border-bottom: 1px solid #E7E7E7;
      margin: 12px 0;
    }

    .toogleBtn {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .interval {
      font-size: 13px;
      line-height: 19px;
    }

    .customInput {
      padding-bottom: 0;
    }

    .add {
      margin-top: 12px;
    }

    .add2 {
      margin-top: 0px;
    }
    
    .removeItem {
      display: flex;
      align-items: center;
    }

  }

  .parent {
    font-weight: 600;
  }

  .child {
    padding-left: 20px;
  }

  .q-item{
    min-height: 15px;
    padding: 6px 16px;
  }
</style>
