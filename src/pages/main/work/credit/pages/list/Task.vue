<template>
  <div class="q-pa-md">
    <!-- Header credit -->
    <div class="row infoBlock">
      <div class="infoBlockItem">
        <h6 class="titleCredit">Дата</h6>
        <span class="creditInfo">{{date}}</span>
      </div>

      <div class="infoBlockItem">
        <h6 class="titleCredit">Номер протокола</h6>
        <span class="creditInfo">{{protocolNumber}}</span>
      </div>

      <div class="infoBlockItem">
        <h6 class="titleCredit">Номер заявления</h6>
        <span class="creditInfo">{{applicationNumber}}</span>
      </div>
    </div>

    <!-- Form credit -->
    <div class="row q-col-gutter-md">
      <div class="col-lg-6 col-sm-12">
        <h4 class="titleForm">Личные данные клиента</h4>
        
        <div class="formBlock"> 
          <div class="row rowForm">
            <div class="col-2 field">Фамилия</div>
            <div class="col-10 data">Петров</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">Имя</div>
            <div class="col-10 data">Иван</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">Отчество</div>
            <div class="col-10 data">Петрович</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">Дата рождения</div>
            <div class="col-10 data">12.12.1992</div>
          </div>

           <div class="row rowForm">
            <div class="col-2 field" >Пол</div>
            <div class="col-4 data">Мужчина</div>
            <div class="col-2 field" >Резидентство</div>
            <div class="col-4 data">Да</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">Серия паспорта</div>
            <div class="col-1 data">AA</div>
            <div class="col-2 field">Номер паспорта</div>
            <div class="col-2 data">656581</div>
            <div class="col-2 field">Дата выдачи</div>
            <div class="col-3 data">24.12.1996</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">ИНН</div>
            <div class="col-10 data">45445156151</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">ПНФЛ</div>
            <div class="col-10 data">45151515151</div>
          </div>

        </div>
      
        <!-- Контакты -->
        <h4 class="titleForm">Контактные данные</h4>
        <div class="formBlock"> 
          <div class="row rowForm">
            <div class="col-3 field">Номер телефона</div>
            <div class="col-9 data">+998 90 575 88 55</div>
          </div>
          <div class="row rowForm">
            <div class="col-3 field">Номер телефона</div>
            <div class="col-9 data">+998 90 575 88 55</div>
          </div>
          <div class="row rowForm">
            <div class="col-3 field">Номер телефона</div>
            <div class="col-9 data">+998 90 575 88 55</div>
          </div>
        
        

        <h5 class="subTitleForm"><span class="titleValue">Адрес постоянной регистрации</span></h5>
        
          <div class="row rowForm">
            <div class="col-4 field">Регион / область</div>
            <div class="col-8 data" colspan="6">Кашкадарьинская область</div>
          </div>
          <div class="row rowForm">
            <div class="col-4 field">Город / район</div>
            <div class="col-8 data" colspan="6">Карши</div>
          </div>
          <div class="row rowForm">
            <div class="col-4 field">Улица / микрорайон</div>
            <div class="col-8 data" colspan="6">Кашкадарьинская область</div>
          </div>

          <div class="row rowForm">
            <div class="col-4 field">Номер дома</div>
            <div class="col-1 data">101</div>
            <div class="col-2 field">Корпус</div>
            <div class="col-1 data">4</div>
            <div class="col-3 field">Номер квартиры</div>
            <div class="col-1 data">22</div>
          </div>

          <div class="row rowForm">
            <div class="col-4 field">Вид владения</div>
            <div class="col-8 data"></div>
          </div>
        
        <h5 class="subTitleForm"><span class="titleValue">Адрес фактического проживания</span></h5>
         
          <div class="row rowForm">
            <div class="col-4 field">Регион / область</div>
            <div class="col-8 data" colspan="6">Кашкадарьинская область</div>
          </div>
          <div class="row rowForm">
            <div class="col-4 field">Город / район</div>
            <div class="col-8 data" colspan="6">Карши</div>
          </div>
          <div class="row rowForm">
            <div class="col-4 field">Улица / микрорайон</div>
            <div class="col-8 data" colspan="6">Кашкадарьинская область</div>
          </div>

          <div class="row rowForm">
            <div class="col-4 field">Номер дома</div>
            <div class="col-1 data">101</div>
            <div class="col-2 field">Корпус</div>
            <div class="col-1 data">4</div>
            <div class="col-3 field">Номер квартиры</div>
            <div class="col-1 data">22</div>
          </div>

          <div class="row rowForm">
            <div class="col-4 field">Вид владения</div>
            <div class="col-8 data"></div>
          </div>
        </div>
        

        <!-- Родственники -->
        <h4 class="titleForm">Родственники</h4>

        <div class="formBlock">
          <div class="row rowForm">
            <div class="col-4 field">Семейное положение</div>
            <div class="col-2 data">Женат</div>
            <div class="col-4 field">Если ли дети</div>
            <div class="col-2 data">3</div>
          </div>
      
        <h5 class="subTitleForm"><span class="titleValue">Родственник 1</span></h5>
  
          <div class="row rowForm">
            <div class="col-2 field">Отношение к клиенту</div>
            <div class="col-10 data">Отец</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">Фамилия</div>
            <div class="col-10 data">Петров</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">Имя</div>
            <div class="col-10 data">Иван</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">Отчество</div>
            <div class="col-10 data">Петрович</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">Дата рождения</div>
            <div class="col-10 data">12.12.1992</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">Серия паспорта</div>
            <div class="col-1 data">AA</div>
            <div class="col-2 field">Номер паспорта</div>
            <div class="col-2 data">656581</div>
            <div class="col-2 field">Дата выдачи</div>
            <div class="col-3 data">24.12.1996</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">ИНН</div>
            <div class="col-10 data">45445156151</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">ПНФЛ</div>
            <div class="col-10 data">45151515151</div>
          </div>

        </div>

      </div>

      <!-- Вторая колонка  -->

      <div class="col-lg-6 col-sm-12">
        <h4 class="titleForm">Сведения по основной работе и ежемесячных доходах/расходах</h4>
        <div class="formBlock">
          <div class="row rowForm">
            <div class="col-6 field">Вид деятельности</div>
            <div class="col-6 data">Рабочий</div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Подвержденный ежемесячный доход</div>
            <div class="col-6 data">30 000 000</div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Периодические расходы</div>
            <div class="col-6 data">47 000 000</div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Наличие дополнительного дохода</div>
            <div class="col-6 data">Нет</div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Плата за обслуживание других обязательств</div>
            <div class="col-6 data">3 500 000</div>
          </div>
        </div>

        <h4 class="titleForm">Сведения об имуществе</h4>
        <div class="formBlock">
          <div class="row rowForm">
            <div class="col-12 field">Данные о недвижемости отсутсвтуют</div>
          </div>
          <div class="row rowForm">
            <div class="col-12 field">Данные по транспортным средствам отсутсвтуют</div>
          </div>
        </div>

        <h4 class="titleForm">Сведения о запрашиваемом кредите</h4>
        <div class="formBlock">
          <div class="row rowForm">
            <div class="col-6 field">Кредитный продукт</div>
            <div class="col-6 data">Микрозайм</div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Запрашиваемая сумма кредита</div>
            <div class="col-6 data">40 000 000</div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Тип погашения</div>
            <div class="col-6 data">Аннуитет</div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Валюта</div>
            <div class="col-6 data">Сум</div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Процентная ставка по кредиту (максимальная)</div>
            <div class="col-6 data">32</div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Процентная ставка по кредиту (минимальная)</div>
            <div class="col-6 data">28</div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Льготный период по погашению кредита</div>
            <div class="col-6 data">Да</div>
          </div>
        </div>

        <h4 class="titleForm">Гарантии и поручительства</h4>
        <div class="formBlock">
          <div class="row rowForm">
            <div class="col-6 field">Вид обеспечения</div>
            <div class="col-6 data">Страхование</div>
          </div>
          <div class="row rowForm">
            <div class="col-6 field">Наименование страховой компании</div>
            <div class="col-6 data">Global Insurance</div>
          </div>
          <div class="row rowForm">
            <div class="col-6 field">ИНН страховой компании</div>
            <div class="col-6 data">265146151515</div>
          </div>
          <div class="row rowForm">
            <div class="col-6 field">Сумма страхового полиса</div>
            <div class="col-6 data">60 000 000</div>
          </div>
        </div>

        <h4 class="titleForm">Документы</h4>
        <div class="formBlock">
          <div class="row rowForm">
            <div class="col-12 field">Приложение документа отсутсвтует</div>
          </div>
        </div>

        <h4 class="titleForm">Коментарии</h4>
        <div class="formBlock">
          <div class="row rowForm">
            <div class="col-12 field">Коментарии кредитного менеджера</div>
          </div>
        </div>
      </div>

    </div>

    <div class="row q-col-gutter-md">
      <div class="col-3 "></div>
      <div class="col-3">
        <q-btn
          type="submit"
          color="green"
          label="Одобрить"
          class="q-ml-md full-width"
        />
      </div>
      <div class="col-3">
        <q-btn
          color="red"
          label="Отклонить"
          class="q-ml-md full-width"
          @click="taskFailure"
        />
      </div>
      <div class="col-3"></div>
    </div>

    <q-dialog v-model="confirm" persistent>
      <q-card class="failureCredit">
        <q-card-section class="row titleFailureCredit">
          <span class="q-ml-sm">Выберите причину отказа</span>
        </q-card-section>
        <form class="failureCreditForm row q-col-gutter-md" @submit.prevent.stop="submitHandler">
          <div class="col-12">
            <q-select
            ref="reson"
            square
            outlined
            v-model="reason"
            :options="options.reason"
            dense
            label="Причина отказа"
            lazy-rules
            :rules="[val => !!val || 'Выберите причину отказа']"
            class="q-pb-sm"
          />

          <div
            v-if="reason === options.reason[3]"
            style="max-width: 100%"
          >
            <q-input
              ref="comment"
              square
              outlined
              dense
              v-model="text"
              label="Комментарий"
              type="textarea"
              lazy-rules
              :rules="[val => !!val || 'Напишите комментарий']"
              class="q-pb-sm"
            />
          </div>
          </div>
          

          <div class="col-6">
            <q-btn class="btnFailureCredit full-width" label="Отмена" color="red" v-close-popup />
          </div>
          <div class="col-6">
            <q-btn class="btnFailureCredit full-width" type="submit" label="Отправить" color="green" />
          </div>
        </form>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      confirm: false,
      reason: "",
      text: "",
      options: {
        reason: ["причина 1", "причина 2", "причина 3", "другое"]
      }
    };
  },
  mounted() {
    const creditTitles = document.querySelectorAll('.titleForm')
    for (let title of creditTitles) {
      title.addEventListener('click', () => this.toggleCreditBlock(title))
    }
  },
  computed: {
    date() {
      return this.$route.query.date
    },
    applicationNumber() {
      return this.$route.query.applicationNumber
    },
    protocolNumber() {
      return this.$route.query.protocolNumber
    }
  },
  methods: {
    taskFailure() {
      this.confirm = true;
    },

    toggleCreditBlock(event) {
      event.classList.toggle('closeBlock')
      event.nextSibling.classList.toggle('close')
    },

    submitHandler(event) {
      console.log(this.$refs);
      this.$refs.reson.validate();

      if (this.reason === this.options.reason[3]) {
        this.$refs.comment.validate();
      } else {
        this.validItems("comment");
      }

      if (this.$refs.reson.hasError || this.$refs.comment.hasError) {
        this.formHasError = true;
      } else {
        alert("Success");
        this.confirm = false;
      }
    },

    validItems(itemsValid, itemValid = true) {
      if (!itemValid) {
        this.$refs[itemsValid] = {
          hasError: true //не валидный
        };
      } else {
        this.$refs[itemsValid] = {
          hasError: false //валидный
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.infoBlock {
  margin: 20px 0 10px 0;
  padding: 10px 0;
  border-top: 1px solid #0054a6;
  border-bottom: 1px solid #0054a6;
}

.infoBlockItem {
  margin-right: 200px;
}

.titleCredit {
  margin: 0px;
}

.titleForm {
  cursor: pointer;
  margin: 10px 0 0 0;
  padding-left: 20px;
  font-size: 16px;
  color: #0054a6;
  background: #ededed;

  &:after {
    content: "";
    float: right;
    border: 1px solid #0054a6;
    border-width: 0 3px 3px 0;
    margin: 13px 20px 13px;
    padding: 4px;
    transform: rotate(45deg);
  }

}

.closeBlock {
  &:after {
    content: "";
    float: right;
    border: 1px solid #0054a6;
    border-width: 0 3px 3px 0;
    margin: 13px 20px 13px;
    padding: 4px;
    transform: rotate(-135deg);
  }
}

.formBlock {
  font-size: 16px;
}

.rowForm {
  margin: 8px 0 4px 0;
}

.field {
  color: #817878;
  padding: 0 5px;
}

.data {
  color: #0054a6;
  padding: 5px 20px;
  border: 1px solid #acacac;
  background: #f8f8f8;
}

.subTitleForm {
  position: relative;
  height: 20px;
  margin: 20px 0;
  font-size: 16px;
  color: #0054a6;
  border-bottom: 1px solid #0054a6;
}

.titleValue {
  position: absolute;
  padding-right: 5px;
  background: #fff;
  z-index: 1;
}

.q-btn--rectangle {
  margin-top: 20px;
  padding: 2px 0;
  border-radius: 0;
}

.titleFailureCredit {
  font-size: 16px;
  color: #868686;
  background: #ebebeb;
  padding: 15px 20px;
  margin-bottom: 20px;
}

.failureCredit {
  width: 600px;
}

.failureCreditForm {
  padding: 0 40px 20px 40px;
}

.btnFailureCredit {
  margin: 0;
}

.close {
  display: none;
}

</style>
