<template>
  <q-dialog v-model="confirmCredit" persistent>
    <q-card>
      <q-card-section class="row item-center justify-center">
        <div id="form">
        <div class="fullProfile">
          <h4>Анкета-заявления</h4>
          <div class="row q-col-gutter-md">
            <div class="col-3">Номер анкеты</div>
            <div class="col-9">132131231</div>
            <div class="col-12 profileTitle">1. Персональные данные</div>
            <div class="col-3">Фамилия</div>
            <div class="col-9">{{fullProfileDate.surname}}</div>
            <div class="col-3">Имя</div>
            <div class="col-9">{{fullProfileDate.name}}</div>
            <div class="col-3">Отчество</div>
            <div class="col-9">{{fullProfileDate.mname}}</div>
            <div class="col-3">Дата рождения</div>
            <div class="col-9"></div>
            <div class="col-3">ИНН</div>
            <div class="col-9">{{fullProfileDate.inn}}</div>
            <div class="col-3">ПИНФЛ</div>
            <div class="col-9">{{fullProfileDate.pinpp}}</div>
            <div class="col-3">Пол</div>
            <div class="col-9">{{fullProfileDate.sex}}</div>
            <div class="col-3">Резидентсво</div>
            <div class="col-9">{{fullProfileDate.residency}}</div>

            <div class="col-12 profileTitle">2. Паспортные данные</div>
            <div class="col-3">Вид документа</div>
            <div class="col-9"></div>
            <div class="col-3">Наименование документа</div>
            <div class="col-9"></div>
            <div class="col-3">Серия</div>
            <div class="col-9">{{fullProfileDate.passportData.series}}</div>
            <div class="col-3">Номер</div>
            <div class="col-9">{{fullProfileDate.passportData.number}}</div>
            <div class="col-3">Дата выдачи</div>
            <div class="col-9">{{fullProfileDate.passportData.date}}</div>
            <div class="col-3">Кем выдан документ</div>
            <div class="col-9"></div>
            <div class="col-3">Срок действия документа</div>
            <div class="col-9"></div>

            <div class="col-12 profileTitle">3. Контактная информация</div>

            <div class="col-12 dataList">
              <div class="row" v-for="(phone, index) of fullProfileDate.phones" :key="phone.phone">
                <div class="col-3">Телефон {{index + 1}}</div>
                <div class="col-9">{{phone.phone}}</div>
              </div>  
            </div>

            <div class="col-3">e-mail адрес</div>
            <div class="col-9">{{fullProfileDate.email}}</div>

            <div class="col-12 profileTitle">4. Образование</div>
            <div class="col-3">Степень Образования</div>
            <div class="col-9">{{fullProfileDate.education}}</div>

            <div class="col-12 profileTitle">5. Адреса</div>
            <div class="col-12 profileSubTitle">
              5.1 Адрес постоянной регистрации
            </div>
            <div class="col-3">Индекс</div>
            <div class="col-9">{{fullProfileDate.permanentRegistration.index}}</div>
            <div class="col-3">Регион / область</div>
            <div class="col-9">{{fullProfileDate.permanentRegistration.region}}</div>
            <div class="col-3">Город / район</div>
            <div class="col-9">{{fullProfileDate.permanentRegistration.city}}</div>
            <div class="col-3">Улица / мкр.</div>
            <div class="col-9">{{fullProfileDate.permanentRegistration.street}}</div>
            <div class="col-3">Номер дома</div>
            <div class="col-9">{{fullProfileDate.permanentRegistration.houseNumber}}</div>
            <div class="col-3">Квартира</div>
            <div class="col-9">{{fullProfileDate.permanentRegistration.apartmentNumber}}</div>
            <div class="col-3">Вид владения</div>
            <div class="col-9">{{fullProfileDate.permanentRegistration.typeOfOwnership}}</div>

            <div class="col-12 profileSubTitle">
              5.2 Адрес фактического проживания
            </div>
            <div class="col-3">Индекс</div>
            <div class="col-9">{{fullProfileDate.actualRegistration.index}}</div>
            <div class="col-3">Регион / область</div>
            <div class="col-9">{{fullProfileDate.actualRegistration.region}}</div>
            <div class="col-3">Город / район</div>
            <div class="col-9">{{fullProfileDate.actualRegistration.city}}</div>
            <div class="col-3">Улица / мкр.</div>
            <div class="col-9">{{fullProfileDate.actualRegistration.street}}</div>
            <div class="col-3">Номер дома</div>
            <div class="col-9">{{fullProfileDate.actualRegistration.houseNumber}}</div>
            <div class="col-3">Квартира</div>
            <div class="col-9">{{fullProfileDate.actualRegistration.apartmentNumber}}</div>
            <div class="col-3">Вид владения</div>
            <div class="col-9">{{fullProfileDate.actualRegistration.typeOfOwnership}}</div>

            <div class="col-12 profileSubTitle">
              5.3 Адрес временной регистрации
            </div>
            <div class="col-3">Индекс</div>
            <div class="col-9">{{fullProfileDate.temporaryRegistration.index}}</div>
            <div class="col-3">Регион / область</div>
            <div class="col-9">{{fullProfileDate.temporaryRegistration.region}}</div>
            <div class="col-3">Город / район</div>
            <div class="col-9">{{fullProfileDate.temporaryRegistration.city}}</div>
            <div class="col-3">Улица / мкр.</div>
            <div class="col-9">{{fullProfileDate.temporaryRegistration.street}}</div>
            <div class="col-3">Номер дома</div>
            <div class="col-9">{{fullProfileDate.temporaryRegistration.houseNumber}}</div>
            <div class="col-3">Квартира</div>
            <div class="col-9">{{fullProfileDate.temporaryRegistration.apartmentNumber}}</div>
            <div class="col-3">Вид владения</div>
            <div class="col-9">{{fullProfileDate.temporaryRegistration.typeOfOwnership}}</div>

            <div class="col-12 profileTitle">6 Семейное положение</div>
            <div class="col-3">Семейное положение</div>
            <div class="col-9">{{fullProfileDate.family.familyStatus}}</div>
            <div class="col-3">Количество иждивенцев</div>
            <div class="col-9"></div>
            <div class="col-3">Количество детей</div>
            <div class="col-9">{{fullProfileDate.family.childrenCount}}</div>

            <div class="col-12 profileTitle">
              7 Родственники (обязательно указать данные супруга/супруги)
            </div>
            <div class="col-12 dataList">
              <div class="row" v-for="(relative, index) of fullProfileDate.relatives" :key="'relatives' + index">
                <div class="col-12 profileSubTitle">Родственник {{index + 1}}</div>
                <div class="col-3">Тип родственной связи</div>
                <div class="col-9">{{relative.relative}}</div>
                <div class="col-3">Фамилия</div>
                <div class="col-9">{{relative.surname}}</div>
                <div class="col-3">Имя</div>
                <div class="col-9">{{relative.name}}</div>
                <div class="col-3">Отчество</div>
                <div class="col-9">{{relative.mname}}</div>
                <div class="col-3">Дата рождения</div>
                <div class="col-9">{{relative.birthday}}</div>
                <div class="col-3">ИНН</div>
                <div class="col-9">{{relative.inn}}</div>
                <div class="col-3">Вид документа</div>
                <div class="col-9">{{relative.relative}}</div>
                <div class="col-3">Серия</div>
                <div class="col-9">{{relative.passportData.series}}</div>
                <div class="col-3">Номер</div>
                <div class="col-9">{{relative.passportData.number}}</div>
                <div class="col-3">Дата выдачи</div>
                <div class="col-9">{{relative.passportData.date}}</div>
              </div>
            </div>

            <!-- Поменять структуру -->

            <div class="col-12 profileTitle">8 Сведения по основной работе</div>
            <div class="col-3">8.1 Вид деятельности</div>
            <div class="col-9"></div>

            <div class="col-12 profileSubTitle">8.2 Работа по найму</div>
            <div class="col-3">Наименование работодателя</div>
            <div class="col-9"></div>
            <div class="col-3">ИНН работодателя</div>
            <div class="col-9"></div>
            <div class="col-3">Вид деятельности организации</div>
            <div class="col-9"></div>
            <div class="col-3">Должность</div>
            <div class="col-9"></div>
            <div class="col-3">Количество работников в организации</div>
            <div class="col-9"></div>
            <div class="col-3">Стаж на последнем месте работы в месяцах</div>
            <div class="col-9"></div>
            <div class="col-3">Общий трудовой стаж в месяцах</div>
            <div class="col-9"></div>

            <div class="col-12 profileSubTitle">
              8.3 Предпринимательская деятельность
            </div>
            <div class="col-3">Вид деятельности</div>
            <div class="col-9"></div>
            <div class="col-3">Срок деятельности</div>
            <div class="col-9"></div>

            <div class="col-12 profileSubTitle">
              8.4 Личное подсобное хозяйство
            </div>
            <div class="col-3">Вид деятельности</div>
            <div class="col-9"></div>
            <div class="col-3">Срок деятельности</div>
            <div class="col-9"></div>

            <div class="col-12 profileTitle">
              9 Сведения о ежемесячных доходах/расходах
            </div>
            <div class="col-3">Подтвержденный ежемесячный доход</div>
            <div class="col-9">{{fullProfileDate.expenseIncome.income}}</div>
            <div class="col-3">
              Периодические расходы (доля расходов на налоги, содержание семьи,
              оплата аренды, образование, алименты и др.)
            </div>
            <div class="col-9">{{fullProfileDate.expenseIncome.expense}}</div>
            <div class="col-3">
              Плата за облуживание других обязательств (погашение кредитов в
              банках, фин. организациях и др.)
            </div>
            <div class="col-9">{{fullProfileDate.expenseIncome.otherExpenses}}</div>
            <div class="col-3">Наличие дополнительного дохода</div>
            <div class="col-9"></div>
            <div class="col-3">Размер дополнительного дохода</div>
            <div class="col-9"></div>
            <div class="col-3">
              Источник дополнительного дохода (появляются при наличии доп.
              дохода)
            </div>
            <div class="col-9"></div>

            <div class="col-12 profileTitle">10 Сведения об имуществе</div>
            <div class="col-12 profileSubTitle">10.1 Недвижимость</div>
            <div class="col-3">Вид недвижимости</div>
            <div class="col-9"></div>
            <div class="col-3">Регион/ область</div>
            <div class="col-9"></div>
            <div class="col-3">Рыночная стоимость</div>
            <div class="col-9"></div>

            <div class="col-12 profileSubTitle">10.2 Транспортное средства</div>
            <div class="col-3">Вид транспортного средства</div>
            <div class="col-9"></div>
            <div class="col-3">Марка транспортного средства</div>
            <div class="col-9"></div>
            <div class="col-3">Год выпуска</div>
            <div class="col-9"></div>
            <div class="col-3">Рыночная стоимость</div>
            <div class="col-9"></div>

            <div class="col-12 profileTitle">
              11 Поручительство и страхование
            </div>
            <div class="col-12 profileSubTitle">11.1 Поручительство</div>
            <div class="col-3">Вид поручителя</div>
            <div class="col-9"></div>

            <div class="col-12 profileSubSubTitle">11.1 Физ. лицо</div>
            <div class="col-3">Отношение к клиенту</div>
            <div class="col-9"></div>
            <div class="col-3">Фамилия</div>
            <div class="col-9"></div>
            <div class="col-3">Имя</div>
            <div class="col-9"></div>
            <div class="col-3">Отчество</div>
            <div class="col-9"></div>
            <div class="col-3">Тип родственной связи</div>
            <div class="col-9"></div>
            <div class="col-3">Дата рождения</div>
            <div class="col-9"></div>
            <div class="col-3">ИНН</div>
            <div class="col-9"></div>
            <div class="col-3">ПИНФЛ</div>
            <div class="col-9"></div>
            <div class="col-3">Резиденство</div>
            <div class="col-9"></div>

            <div class="col-12 dataBlock">Паспортные данные:</div>
            <div class="col-3">Серия</div>
            <div class="col-9"></div>
            <div class="col-3">Номер</div>
            <div class="col-9"></div>
            <div class="col-3">Дата выдачи</div>
            <div class="col-9"></div>
            <div class="col-3">Кем выдан паспорт</div>
            <div class="col-9"></div>

            <div class="col-12 dataBlock">Контактная информация:</div>
            <div class="col-3">Телефон</div>
            <div class="col-9"></div>

            <div class="col-12 dataBlock">Адрес:</div>
            <div class="col-3">Индекс</div>
            <div class="col-9"></div>
            <div class="col-3">Регион/ область</div>
            <div class="col-9"></div>
            <div class="col-3">Город / район</div>
            <div class="col-9"></div>
            <div class="col-3">Улица / мкр.</div>
            <div class="col-9"></div>
            <div class="col-3">Номер дома</div>
            <div class="col-9"></div>
            <div class="col-3">Квартира</div>
            <div class="col-9"></div>
            <div class="col-3">Сумма поручительства</div>
            <div class="col-9"></div>

            <div class="col-12 profileSubSubTitle">11.2 Юр. лицо</div>
            <div class="col-3">Наименование организации</div>
            <div class="col-9"></div>
            <div class="col-12 dataBlock">Адрес:</div>
            <div class="col-3">Индекс</div>
            <div class="col-9"></div>
            <div class="col-3">Регион/ область</div>
            <div class="col-9"></div>
            <div class="col-3">Город / район</div>
            <div class="col-9"></div>
            <div class="col-3">Улица / мкр.</div>
            <div class="col-9"></div>
            <div class="col-3">Номер дома</div>
            <div class="col-9"></div>
            <div class="col-3">Сумма поручительства</div>
            <div class="col-9"></div>
            <div class="col-3">Телефон</div>
            <div class="col-9"></div>

            <div class="col-12 profileSubSubTitle">11.3 Страхование</div>
            <div class="col-3">Наименование организации</div>
            <div class="col-9"></div>
            <div class="col-3">ИНН страховой компании</div>
            <div class="col-9"></div>
            <div class="col-3">Сумма страхового полиса</div>
            <div class="col-9"></div>

            <div class="col-12 profileTitle">
              12. Сведения о запрашиваемом кредите
            </div>
            <div class="col-3">Вид кредита</div>
            <div class="col-9"></div>
            <div class="col-3">Кредитный продукт</div>
            <div class="col-9"></div>
            <div class="col-3">Запрашиваемая сумма кредита</div>
            <div class="col-9"></div>
            <div class="col-3">Валюта</div>
            <div class="col-9"></div>
            <div class="col-3">Срок в месяцах</div>
            <div class="col-9"></div>
            <div class="col-3">Тип погашения</div>
            <div class="col-9"></div>
            <div class="col-3">Процентная ставка по кредиту</div>
            <div class="col-9"></div>
            <div class="col-3">Удобная дата погашения (число месяца)</div>
            <div class="col-9"></div>
            <div class="col-3">Льготный период по погашению кредита</div>
            <div class="col-9"></div>
            <div class="col-3">Льготный период в месяцах</div>
            <div class="col-9"></div>
            <div class="col-3">Цель кредитования</div>
            <div class="col-9"></div>
            <div class="col-3">Первоначальный взнос</div>
            <div class="col-9"></div>
            <div class="col-3">% первоначального взноса</div>
            <div class="col-9"></div>
            <div class="col-3">
              Наименование продавца/производителя товара/работы/услуги
            </div>
            <div class="col-9"></div>
            <div class="col-3">Наименование товара/работы/услуги</div>
            <div class="col-9"></div>
            <div class="col-3">
              Наименование банка продавца/производителя товара/работы/услуги
            </div>
            <div class="col-9"></div>
            <div class="col-3">Источник финансирования</div>
            <div class="col-9"></div>
            <div class="col-3">В рамках специальной программы</div>
            <div class="col-9"></div>
            <div class="col-3">Название программы</div>
            <div class="col-9"></div>

            <div class="col-12 profileTitle">13. Вложенные документы</div>
            <div class="col-3">Наименование документа</div>
            <div class="col-9"></div>
            <div class="col-3">Скан документа</div>
            <div class="col-9"></div>

            <div class="col-12 profileTitle">
              14. Заключение сотрудника бек-офиса
            </div>
            <div class="col-3">Резюме</div>
            <div class="col-9"></div>
          </div>

          <h6>
            Подписав настоящую анкету, я принимаю и соглашаюсь с тем, что:
          </h6>
          <ol>
            <li>Предоставил в Банк Анкету-заявление на получение кредита;</li>
            <li>
              Информация, предоставленная мной Банку в связи с кредитованием (в
              том числе в Анкете-заявлении), является полной, точной и
              достоверной во всех отношениях;
            </li>
            <li>
              Обязуюсь незамедлительно уведомлять Банк о любых изменениях в
              информации, предоставленной мною Банку;
            </li>
            <li>
              Мне известно, что сокрытие и/или искажение мною информации в
              составленной Анкете-Заявлении влечет отказ в предоставлении
              кредита.
            </li>
            <li>
              Банк проводит любые требуемые, по мнению Банка, проверки (в
              частности, может связаться в любой момент времени (в том числе в
              случае принудительного исполнения прав по Кредитному договору /
              Договору поручительства) с моим работодателем для проверки и
              получения любой необходимой информации);
            </li>
            <li>
              Выражаю согласие предоставлять Банку право обращаться в бюро
              кредитных историй (АСОКИ) для проверки сведений, указанных в
              настоящей Анкете-Заявлении, и получения информации обо мне;
            </li>
            <li>Оформляю заем в собственных интересах;</li>
            <li>
              Издержки, пошлины и накладные расходы, связанные с предоставлением
              кредита, несет Заемщик;
            </li>
            <li>
              Принятие Акционерным обществом «Национальный Банк
              Внешнеэкономический деятельности Республики Узбекистан»
              (далее-Банк) к рассмотрению настоящей Анкеты-Заявления не означает
              возникновения у Банка обязательства по предоставлению банковского
              займа;
            </li>
            <li>
              1Банк оставляет за собой право не мотивировать причины отказа;
            </li>
            <li>
              В случае принятия отрицательного решения Банк не обязан возвращать
              мне настоящую Анкету-заявление;
            </li>
            <li>
              В случае принятия положительного решения и получения мною
              банковского займа я буду обязан выполнить обязательства,
              предусмотренные соответствующими договорами с Банком;
            </li>
            <li>
              Выражаю согласие на сбор и обработку моих персональных данных с
              целью оказания Банком банковских услуг в соответствии с Законом
              РУз. от 02.07.2019 № №ЗРУ-547 «О персональных данных»;
            </li>
          </ol>
        </div>

        <div class="row signature">
          <div class="col-6">
            <p class="bor"></p>
            <p>Полностью Фамилия, Имя, Отчество</p>
          </div>
          <div class="col-6">
            <p class="bor"></p>
            <p>Подпись, дата</p>
          </div>
        </div>

        <h6>Служебная информация</h6>
        <div class="row">
          <div class="col-6">
            Филиал / Подразделение
          </div>
          <div class="col-6"></div>
          <div class="col-6">
            ФИО работника банка, принявшего заявление
          </div>
          <div class="col-6"></div>
          <div class="col-6">
            Должность кредитного специалиста
          </div>
          <div class="col-6"></div>
          <div class="col-6">
            Подпись работника банка
          </div>
          <div class="col-6"></div>
          <div class="col-6">
            Дата
          </div>
          <div class="col-6"></div>
        </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          label="Распечатать"
          color="primary"
          @click="callPrint('form')"
        />
        <!-- <q-btn flat label="Закрыть" color="primary" v-close-popup /> -->
        <q-btn flat label="Закрыть" color="primary" @click="() => this.$router.push('/work/credit/sub/task/1')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      confirmCredit: true
    };
  },
  computed: {
    fullProfileDate() {
      return this.$store.state.profile.personalData
    }
  },
  methods: {
    callPrint(strid) {
      const head = document.querySelector('head')
      console.log(head)
      const prtContent = document.getElementById(strid);
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=640,toolbar=0,scrollbars=1,status=0"
      );
      //WinPrint.document.write("<html><head><title>Полная анкета</title>");
      WinPrint.document.write("<html>");
      WinPrint.document.write(head.innerHTML);
      WinPrint.document.write("<body>");
      WinPrint.document.write('<div id="print" class="contentpane">');
      WinPrint.document.write(prtContent.innerHTML);
      WinPrint.document.write("</div>");
      WinPrint.document.write("</body></html>");
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      //WinPrint.close();
      //prtContent.innerHTML = strOldOne;
    }
  }
};
</script>

<style scoped>
.q-dialog__inner--minimized > div {
  max-width: 50%;
}
.fullProfile {
  /* min-width: 700px; */
}

.fullProfile .row .col-12.dataList {
  padding: 0;
  border: none;
}

.fullProfile .row > div {
  border: 1px solid #ccc;
  margin-top: -1px;
}

.fullProfile .row > .col-3 {
  border-right: none;
}

.fullProfile .row > div:not(.profileTitle) {
  padding: 5px 20px;
}

.profileTitle {
  text-align: center;
  background-color: #ededed;
  color: #0e3475;
  padding: 10px;
  font-size: 18px;
}

.profileSubTitle {
  background: #ededed87;
  color: #0e3475;
}

.profileSubSubTitle {
  color: #0e3475;
}

.dataBlock {
}

.signature {
  width: 100%;
}

.bor::after {
  content: " ";
  display: block;
  height: 1px;
  width: 90%;
  background: #ccc;
}
</style>
