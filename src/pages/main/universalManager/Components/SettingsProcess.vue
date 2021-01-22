<template>
  <div class="settingsProcess" :id="title.id">
    <q-expansion-item
      class="settingBlock"
      :header-class="'headerBlock'"
      :label="title.name"
      v-model="expanded"
    >
      <q-card class="contentBlock">
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-4">
              <q-input
                ref="moratory"
                outlined
                v-model="moratory"
                dense
                label="Срок моратория по отказанным клиентам"
                :rules="[val => !!val || 'Введите данные']"
              />
            </div>

						<div class="col-4">
              <q-input
                ref="periodLifeApp"
                outlined
                v-model="moratory"
                dense
                label="Срок жизни заявки"
                :rules="[val => !!val || 'Введите данные']"
              />
            </div>
          </div>


          <div class="row q-col-gutter-md">
              <div class="col-8 toogleBtn">
                <p>Банк ИНПС по умолчанию</p>

                <q-toggle
                  class="customeToggle"
                  :false-value="false"
                  :label="options[blueModel]"
                  :true-value="true"
                  v-model="blueModel2"
                />
              </div>
              <div class="col-4">
                <q-input
                  class="customInput"
                  ref=""
                  outlined
                  dense
                  label="ИНПС"
                  :rules="[val => !!val || 'Введите данные']"
                />
              </div>
              <div class="borderRow"></div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-8 toogleBtn">
                <p>Разрешить повторный запрос в Халк Банк</p>

                <q-toggle
                  class="customeToggle"
                  :false-value="false"
                  :label="options[blueModel]"
                  :true-value="true"
                  v-model="blueModel2"
                />
              </div>
              <div class="col-4">
                
              </div>
              <div class="borderRow"></div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-8 toogleBtn">
                <p>Разрешить Ручной ввод ЗП на уточнение </p>

                <q-toggle
                  class="customeToggle"
                  :false-value="false"
                  :label="options[blueModel]"
                  :true-value="true"
                  v-model="blueModel2"
                />
              </div>
              <div class="col-4">
                <q-input
                  class="customInput"
                  ref=""
                  outlined
                  dense
                  label="Для кого"
                  :rules="[val => !!val || 'Введите данные']"
                />
              </div>
              <div class="borderRow"></div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  ref=""
                  outlined
                  dense
                  label="Филиал"
                  :rules="[val => !!val || 'Введите данные']"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref=""
                  outlined
                  dense
                  label="№ заявки"
                  :rules="[val => !!val || 'Введите данные']"
                />
              </div>
              <div class="col-4"></div>
              <div class="borderRow"></div>
            </div>

            <div class="row q-col-gutter-x-md">
              <div class="col-4"></div>
              <div class="col-4">
                <p class="interval">Диапазон для удобного числа погашения кредита </p>
              </div>
              <div class="col-4"></div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  ref=""
                  outlined
                  dense
                  label="Количество обязательных родственников"
                  :rules="[val => !!val || 'Введите данные']"
                />
              </div>
              <div class="col-4">
                <div class="row q-col-gutter-md">
                  <div class="col-6">
                    <q-input
                      ref=""
                      outlined
                      dense
                      label="От"
                      :rules="[val => !!val || 'Введите данные']"
                    />                  
                  </div>
                  <div class="col-6">
                    <q-input
                      ref=""
                      outlined
                      dense
                      label="До"
                      :rules="[val => !!val || 'Введите данные']"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4"></div>
              <div class="borderRow"></div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-8 toogleBtn">
                <p>Разрешить повторный запрос в АСОКИ</p>

                <q-toggle
                  class="customeToggle"
                  :false-value="false"
                  :label="options[blueModel]"
                  :true-value="true"
                  v-model="blueModel2"
                />
              </div>
              <div class="col-4"></div>
            </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>
<script>
import creditSettings from "../mixins/creditSettings";

export default {
  mixins: [creditSettings],
  data() {
    return {
      moratory: null,
      blueModel: true,
      blueModel2: true,
      options: {
        true: 'Вкл',
        false: 'Выкл'
      } 
    };
  },
  mounted() {
    setTimeout(() => {
      this.$store.commit("creditSettings/setRefs", this.$refs);
    }, 3000);
	}, 
	computed: {}
};
</script>
<style lang="scss">
  .settingsProcess {
    .borderRow {
      width: 100%;
      height: 1px;
      border-bottom: 1px solid #E7E7E7;
      margin-left: 16px;
      margin-bottom: 12px;
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
  }
</style>
