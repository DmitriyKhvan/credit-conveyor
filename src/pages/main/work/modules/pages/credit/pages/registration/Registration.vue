<template>
  <div class="q-pa-md">
    <div class="row q-gutter-md">
      <div class="col-7">
        <q-stepper v-model="step" color="primary" animated>
          <q-step
            :name="1"
            title="Персональные данные"
            icon="settings"
            :done="step > 1"
          >
            <q-form @submit="step = 2">
              <q-input
                square
                outlined
                v-model="personalData.surname"
                dense
                label="Фамилия"
                style="width: 50%"
                lazy-rules
                :rules="[val => (val && val.length > 3) || 'Наберите фамилию']"
              />
              <q-input
                square
                outlined
                v-model="personalData.name"
                dense
                label="Имя"
                style="width: 50%"
                lazy-rules
                :rules="[val => (val && val.length > 3) || 'Наберите имю']"
              />
              <q-input
                square
                outlined
                v-model="personalData.mname"
                dense
                label="Отчество"
                style="width: 50%"
                lazy-rules
                :rules="[val => (val && val.length > 3) || 'Наберите отчество']"
              />
              <q-input
                square
                outlined
                v-model="personalData.inn"
                dense
                label="ИНН"
                mask="#########"
                style="width: 50%"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length >= 9) ||
                    'Количество символов должно быт болше или ровно 9'
                ]"
              />
              <q-input
                square
                outlined
                v-model="personalData.phone"
                dense
                label="Тел. номер"
                mask="+############"
                lazy-rules
                style="width: 50%"
                :rules="[
                  val => (val && val.length === 13) || 'Наберите отчество'
                ]"
              />

              <q-stepper-navigation>
                <q-btn type="submit" color="primary" label="Далее" />
              </q-stepper-navigation>
            </q-form>
          </q-step>

          <q-step
            :name="2"
            title="Семейное положение"
            icon="create_new_folder"
            :done="step > 2"
          >
            <q-form>
              <q-select
                square
                outlined
                v-model="personalData.familyStatus"
                :options="options.family"
                dense
                label="Семейное положения"
                style="width: 50%"
                class="q-pb-sm"
              />
              <q-select
                square
                outlined
                v-model="personalData.children"
                :options="options.children"
                dense
                label="Есть ли дети"
                style="width: 50%"
                class="q-pb-sm"
              />
              <q-input
                v-if="personalData.children == 'Да'"
                square
                outlined
                v-model="personalData.childrenCount"
                mask="##"
                dense
                label="Количество детей до 18 лет"
                style="width: 50%"
                class="q-pb-sm"
              />
            </q-form>

            <q-stepper-navigation>
              <q-btn flat @click="step = 1" color="primary" label="Назад" />
              <q-btn
                type="submit"
                @click="step = 4"
                color="primary"
                label="Далее"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="4"
            title="Ежемесячные доходы/расходы "
            icon="add_comment"
          >
            <q-form @submit="test()">
              <q-input
                square
                outlined
                v-model="personalData.income"
                dense
                label="Подтвержденный ежемесячный доход"
                style="width: 50%"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length !== null) || 'Поля должно быт заполнено'
                ]"
              />
              <q-input
                square
                outlined
                v-model="personalData.expense"
                dense
                label="Периодические расходы "
                style="width: 50%"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length !== null) || 'Поля должно быт заполнено'
                ]"
              />
              <q-input
                square
                outlined
                v-model="personalData.otherExpenses"
                dense
                label="Плата за облуживание других обязательст"
                style="width: 50%"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length !== null) || 'Поля должно быт заполнено'
                ]"
              />
              <q-select
                square
                outlined
                v-model="personalData.externalIncome"
                :options="options.extIncOption"
                dense
                label="Наличие дополнительного дохода"
                style="width: 50%"
                class="q-pb-sm"
              />
              <q-input
                v-if="personalData.externalIncome == 'Да'"
                square
                outlined
                v-model="personalData.externalIncomeSize"
                dense
                label="Размер дополнительного дохода"
                style="width: 50%"
                class="q-pb-sm"
              />
              <q-select
                v-if="personalData.externalIncome == 'Да'"
                square
                outlined
                v-model="personalData.additionalIncomeSource"
                :options="options.additIncSourOption"
                dense
                label="Источник дополнительного дохода"
                style="width: 50%"
                class="q-pb-sm"
              />

              <q-stepper-navigation>
                <q-btn flat @click="step = 2" color="primary" label="Назад" />
                <q-btn
                  color="primary"
                  label="Финиш"
                  type="submit"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-form>
          </q-step>
          <template v-slot:message>
            <q-banner v-if="step === 1" class="bg-purple-8 text-white q-px-lg">
              Наберите персональные данные точно без ошибок...
            </q-banner>
            <q-banner
              v-else-if="step === 2"
              class="bg-orange-8 text-white q-px-lg"
            >
              Укажите если у клиента есть семя...
            </q-banner>
            <q-banner v-else class="bg-blue-8 text-white q-px-lg">
              Укажите ежемесячные доходы и расходы клиента...
            </q-banner>
          </template>
        </q-stepper>
      </div>
      <div class="col">
        <q-card style="width: 100%; height: 100%" square>
          <q-card-section class="text-white" style="background-color: #385B7E">
            <div class="text-subtitle1 q-mb-xs" style="height: 20px">
              Персональные данные
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-pa-sm">
              <div class="row">
                <div class="col-7">
                  <div class="q-pb-sm">
                    <b class="text-subtitle2 text-weight-bold">Фамилия:</b>
                  </div>
                  <div class="q-pb-sm">
                    <b class="text-subtitle2 text-weight-bold">Имя:</b>
                  </div>
                  <div class="q-pb-sm">
                    <b class="text-subtitle2 text-weight-bold">Отчество:</b>
                  </div>
                  <div class="q-pb-sm">
                    <b class="text-subtitle2 text-weight-bold">ИНН:</b>
                  </div>
                  <div class="q-pb-sm">
                    <b class="text-subtitle2 text-weight-bold">Тел. номер:</b>
                  </div>
                </div>
                <div class="col">
                  <div class="q-pb-sm">
                    <span class="text-subtitle2">{{
                      personalData.surname ? personalData.surname : "Не указано"
                    }}</span>
                  </div>
                  <div class="q-pb-sm">
                    <span class="text-subtitle2">{{
                      personalData.name ? personalData.name : "Не указано"
                    }}</span>
                  </div>
                  <div class="q-pb-sm">
                    <span class="text-subtitle2">{{
                      personalData.mname ? personalData.mname : "Не указано"
                    }}</span>
                  </div>
                  <div class="q-pb-sm">
                    <span class="text-subtitle2">{{
                      personalData.inn ? personalData.inn : "Не указано"
                    }}</span>
                  </div>
                  <div class="q-pb-sm">
                    <span class="text-subtitle2">{{
                      personalData.phone ? personalData.phone : "Не указано"
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="text-white" style="background-color: #385B7E">
            <div class="text-subtitle1 q-pt-sm">Семейное положение</div>
          </q-card-section>
          <q-card-section>
            <div class="q-pa-sm">
              <div class="row">
                <div class="col-7">
                  <div class="q-pb-sm">
                    <b class="text-subtitle2 text-weight-bold"
                      >Семейное положения:</b
                    >
                  </div>
                  <div class="q-pb-sm">
                    <b class="text-subtitle2 text-weight-bold">Есть ли дети:</b>
                  </div>
                  <div v-if="personalData.children == 'Да'" class="q-pb-sm">
                    <b class="text-subtitle2 text-weight-bold"
                      >Количество детей до 18 лет:</b
                    >
                  </div>
                </div>
                <div class="col">
                  <div class="q-pb-sm">
                    <span class="text-subtitle2">{{
                      personalData.familyStatus
                        ? personalData.familyStatus
                        : "Не указано"
                    }}</span>
                  </div>
                  <div class="q-pb-sm">
                    <span class="text-subtitle2">{{
                      personalData.children
                        ? personalData.children
                        : "Не указано"
                    }}</span>
                  </div>
                  <div v-if="personalData.children == 'Да'" class="q-pb-sm">
                    <span class="text-subtitle2">{{
                      personalData.childrenCount
                        ? personalData.childrenCount
                        : "Не указано"
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="text-white" style="background-color: #385B7E">
            <div class="text-subtitle1 q-pt-sm">Ежемесячные доходы/расходы</div>
          </q-card-section>
          <q-card-section>
            <div class="q-pa-sm">
              <div class="row">
                <div class="col-7">
                  <div class="q-pb-sm">
                    <b class="text-subtitle2 text-weight-bold"
                      >Подтвержденный ежемесячный доход:</b
                    >
                  </div>
                  <div class="q-pb-sm">
                    <b class="text-subtitle2 text-weight-bold"
                      >Периодические расходы :</b
                    >
                  </div>
                  <div class="q-pb-sm">
                    <b class="text-subtitle2 text-weight-bold"
                      >Плата за облуживание других обязательств:</b
                    >
                  </div>
                  <div class="q-pb-sm">
                    <b class="text-subtitle2 text-weight-bold"
                      >Наличие дополнительного дохода:</b
                    >
                  </div>
                  <div
                    v-if="personalData.externalIncome == 'Да'"
                    class="q-pb-sm"
                  >
                    <b class="text-subtitle2 text-weight-bold"
                      >Размер дополнительного дохода :</b
                    >
                  </div>
                  <div
                    v-if="personalData.externalIncome == 'Да'"
                    class="q-pb-sm"
                  >
                    <b class="text-subtitle2 text-weight-bold"
                      >Источник дополнительного дохода :</b
                    >
                  </div>
                </div>
                <div class="col">
                  <div class="q-pb-sm">
                    <span class="text-subtitle2">{{
                      personalData.income ? personalData.income : "Не указано"
                    }}</span>
                  </div>
                  <div class="q-pb-sm">
                    <span class="text-subtitle2">{{
                      personalData.expense ? personalData.expense : "Не указано"
                    }}</span>
                  </div>
                  <div class="q-pb-sm">
                    <span class="text-subtitle2">{{
                      personalData.otherExpenses
                        ? personalData.otherExpenses
                        : "Не указано"
                    }}</span>
                  </div>
                  <div class="q-pb-sm">
                    <span class="text-subtitle2">{{
                      personalData.externalIncome
                        ? personalData.externalIncome
                        : "Не указано"
                    }}</span>
                  </div>
                  <div
                    v-if="personalData.externalIncome == 'Да'"
                    class="q-pb-sm"
                  >
                    <span class="text-subtitle2">{{
                      personalData.externalIncomeSize
                    }}</span>
                  </div>
                  <div
                    v-if="personalData.externalIncome == 'Да'"
                    class="q-pb-sm"
                  >
                    <span class="text-subtitle2">{{
                      personalData.additionalIncomeSource
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      step: 1,
      personalData: {
        surname: "",
        name: "",
        mname: "",
        inn: "",
        phone: 998,
        // FAMILY //
        familyStatus: "",
        children: "",
        childrenCount: "",
        // MONEY //
        income: "", //подтвержденный ежемесячный доход
        expense: "", //периодические расходы
        otherExpenses: "", //плата за облуживание других обязательст
        externalIncome: "", //наличие дополнительного дохода
        externalIncomeSize: "", //размер дополнительного дохода
        additionalIncomeSource: "" //источник дополнительного дохода
      },
      options: {
        family: [
          "Женат",
          "Замужем",
          "Холост",
          "Не замужем",
          "Вдова",
          "Вдовец",
          "Разведен",
          "Разведена",
          "Вдовец",
          "Гражданский брак"
        ],
        children: ["Да", "Нет"],
        // MONEY //
        extIncOption: ["Да", "Нет"], //наличие дополнительного дохода
        additIncSourOption: [
          "Работа по найму",
          "Аренда движимого имущетсва",
          "Аренда недвижимого имущества",
          "Предпринимательская деятельность",
          "Дивиденды",
          "Другое"
        ] //источник дополнительного дохода
      }
    };
  },
  methods: {
    test() {
      // eslint-disable-next-line
      console.log("test");
    }
  }
};
</script>
