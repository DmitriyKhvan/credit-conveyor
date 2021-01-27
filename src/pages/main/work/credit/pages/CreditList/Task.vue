<template>
  <div class="q-pa-md taskBlock">
    <div class="loaderForm" v-if="loaderForm">
      <appLoader />
    </div>
    <div v-else>
      <!-- Header credit -->
      <div class="row infoBlock">
        <div class="infoBlockItem">
          <h6 class="titleCredit">Дата</h6>
          <span class="creditInfo">{{ date | formatDate("datetime") }}</span>
        </div>

        <div class="infoBlockItem">
          <h6 class="titleCredit">Номер протокола</h6>
          <span class="creditInfo">{{ protocolNumber }}</span>
        </div>

        <div class="infoBlockItem">
          <h6 class="titleCredit">Номер заявления</h6>
          <span class="creditInfo">{{ applicationNumber }}</span>
        </div>

        <div class="infoBlockItem">
          <h6 class="titleCredit">Филиал / Подразделение</h6>
          <span class="creditInfo">{{ filial }} {{ filialName }}</span>
        </div>
      </div>

      <!-- Form credit -->
      <div class="row q-col-gutter-md">
        <div class="col-9">
          <div class="row q-col-gutter-md">
            <!-- Первая колонка -->
            <div class="col-md-12 col-sm-12">
              <div id="privatData">
                <h4 class="titleForm">Личные данные клиента</h4>

                <div class="formBlock">
                  <div class="row rowForm">
                    <div class="col-3 field">Фамилия</div>
                    <div class="col-9 data">{{ Customer.LastName }}</div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-3 field">Имя</div>
                    <div class="col-9 data">{{ Customer.FirstName }}</div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-3 field">Отчество</div>
                    <div class="col-9 data">{{ Customer.MiddleName }}</div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-3 field">Дата рождения</div>
                    <div class="col-9 data">{{ Customer.BirthDate }}</div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-3 field">Страна рождения</div>
                    <div class="col-9 data">
                      {{
                        dictionaries.Countries.items.find(
                          i => i.value == Customer.Country
                        ).label
                      }}
                    </div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-3 field">Место рождения</div>
                    <div class="col-9 data">{{ Customer.BirthCity }}</div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-3 field">Пол</div>
                    <div class="col-3 data">
                      <template
                        v-if="
                          dictionaries.Gender.items.find(
                            i => i.value == Customer.Gender
                          )
                        "
                      >
                        {{
                          dictionaries.Gender.items.find(
                            i => i.value == Customer.Gender
                          ).label
                        }}
                      </template>
                    </div>
                    <div class="col-3 field add">Резидентство</div>
                    <div class="col-3 data">
                      <template
                        v-if="
                          credits.options.confirmation.find(
                            i => i.value == Customer.ResidentFlag
                          )
                        "
                      >
                        {{
                          credits.options.confirmation.find(
                            i => i.value == Customer.ResidentFlag
                          ).label
                        }}
                      </template>
                    </div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-3 field">Вид документа</div>
                    <div class="col-9 data">
                      <template
                        v-if="
                          dictionaries.DocumentType.items.find(
                            i => i.value == Customer.Document.documentType
                          )
                        "
                      >
                        {{
                          dictionaries.DocumentType.items.find(
                            i => i.value == Customer.Document.documentType
                          ).label
                        }}
                      </template>
                    </div>
                  </div>

                  <div class="row rowForm" v-if="Customer.Document.documentType == 7">
                    <div class="col-3 field">Наименование документа</div>
                    <div class="col-9 data">
                      {{ Customer.Document.DocumentName }}
                    </div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-3 field">Серия</div>
                    <div class="col-2 data">{{ Customer.Document.Series }}</div>
                    <div class="col-3 field add">Номер</div>
                    <div class="col-4 data">{{ Customer.Document.Number }}</div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-3 field">Дата выдачи</div>
                    <div class="col-3 data">{{ Customer.Document.GivenDate }}</div>
                    <div class="col-3 field add">Дата окончания</div>
                    <div class="col-3 data">
                      {{ Customer.Document.ExpirationDate }}
                    </div>
                  </div>

                  <!-- <div class="row rowForm">
                    <div class="col-3 field">Регион / область выдачи документа</div>
                    <div class="col-9 data">
                      <template
                        v-if="
                          dictionaries.Region.items.find(
                            i => i.value == Customer.Document.Region
                          )
                        "
                      >
                        {{
                          dictionaries.Region.items.find(
                            i => i.value == Customer.Document.Region
                          ).label
                        }}
                      </template>
                    </div>
                  </div> -->

                  <div class="row rowForm">
                    <div class="col-3 field">Кем выдан документ</div>
                    <div class="col-9 data">
                      {{
                        getDistrict(
                          Customer.Document.Region,
                          Customer.Document.GivenPlace
                        )
                      }}
                    </div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-3 field">Номер карты</div>
                    <div class="col-9 data">{{ Customer.CardNumber }}</div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-3 field">Номер карты поручителя</div>
                    <div class="col-9 data">{{ Customer.BankInps }}</div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-3 field">ИНН</div>
                    <div class="col-9 data">{{ Customer.INN }}</div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-3 field">ПНФЛ</div>
                    <div class="col-9 data">{{ Customer.PINPP }}</div>
                  </div>
                  <div class="row rowForm">
                    <div class="col-3 field">Степень Образования</div>
                    <div class="col-9 data">
                      <template
                        v-if="
                          dictionaries.Graduation.items.find(
                            i => i.value == Customer.Education
                          )
                        "
                      >
                        {{
                          dictionaries.Graduation.items.find(
                            i => i.value == Customer.Education
                          ).label
                        }}
                      </template>
                    </div>
                  </div>

                  <template v-if="Customer.LSBO">
                    <div class="row rowForm">
                      <div class="col-12 field">
                        <q-checkbox
                          disable
                          left-label
                          v-model="Customer.LSBO"
                          label="ЛСБО"
                        />
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-3 field">Номер филиала</div>
                      <div class="col-3 data">
                        {{ Customer.filial }}
                      </div>
                      <div class="col-3 field add">Должность</div>
                      <div class="col-3 data">
                        {{ Customer.role }}
                      </div>
                    </div>
                  </template>

                </div>
              </div>
              

              <!-- Контакты -->
              <div id="contactData">
                <h4 class="titleForm">Контактные данные</h4>
                <div class="formBlock">
                  <div
                    class="row rowForm"
                    v-for="(phone, index) of Customer.PhoneList.items"
                    :key="phone.Number"
                  >
                    <div class="col-3 field">Номер телефона {{ index + 1 }}</div>
                    <div class="col-9 data">{{ phone.Number }}</div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-3 field">E-mail адрес</div>
                    <div class="col-9 data">{{ Customer.Email }}</div>
                  </div>

                  <div
                    v-for="(address, index) of Customer.AddressList.items"
                    :key="address.AddressType"
                  >
                    <h5 class="subTitleForm">
                      <span class="titleValue">{{ address.AddressType }}</span>
                    </h5>

                    <div class="row rowForm">
                      <div class="col-4 field">Регион / область</div>
                      <div class="col-8 data" colspan="6">
                        <template
                          v-if="
                            dictionaries.Region.items.find(
                              i => i.value == address.Region
                            )
                          "
                        >
                          {{
                            dictionaries.Region.items.find(
                              i => i.value == address.Region
                            ).label
                          }}
                        </template>
                      </div>
                    </div>
                    <div class="row rowForm">
                      <div class="col-4 field">Город</div>
                      <div class="col-8 data" colspan="6">{{ address.City }}</div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-4 field">Район</div>
                      <div class="col-8 data" colspan="6">
                        {{ getDistrict(address.Region, address.District) }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-4 field">Улица / микрорайон</div>
                      <div class="col-8 data" colspan="6">{{ address.Street }}</div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-4 field">Номер дома</div>
                      <div class="col-2 data">{{ address.House }}</div>
                      <!-- <div class="col-3 field">Корпус</div>
                      <div class="col-3 data">{{ address.Block }}</div> -->
                    </div>

                    <div class="row rowForm">
                      <div class="col-4 field">Номер квартиры</div>
                      <div class="col-2 data">{{ address.Apartment }}</div>
                      <div class="col-3 field add">Вид владения</div>
                      <div class="col-3 data">
                        <template
                          v-if="
                            dictionaries.PropertyType.items.find(
                              i => i.value == address.OwnershipType
                            )
                          "
                        >
                          {{
                            dictionaries.PropertyType.items.find(
                              i => i.value == address.OwnershipType
                            ).label
                          }}
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              

              <!-- Родственники -->
              <div id="relatives">
                <h4 class="titleForm">Родственники</h4>

                <div class="formBlock">
                  <div class="row rowForm">
                    <div class="col-3 field">Семейное положение</div>
                    <div class="col-3 data">
                      <template
                        v-if="
                          dictionaries.MaritalStatus.items.find(
                            i => i.value == Customer.MaritalStatus
                          )
                        "
                      >
                        {{
                          dictionaries.MaritalStatus.items.find(
                            i => i.value == Customer.MaritalStatus
                          ).label
                        }}
                      </template>
                    </div> 
                    <div class="col-3 field add">Количество детей</div>
                    <div class="col-3 data">{{ Customer.UnderAgeChildrenNum }}</div>
                  </div>

                  <div
                    v-for="(relative, index) of Customer.Relatives.items"
                    :key="'Relatives' + index"
                  >
                    <h5 class="subTitleForm">
                      <span class="titleValue">Родственник {{ index + 1 }}</span>
                    </h5>

                    <div class="row rowForm">
                      <div class="col-3 field">Отношение к клиенту</div>
                      <div class="col-9 data">
                        <template
                          v-if="
                            dictionaries.FamilyRelation.items.find(
                              i => i.value == relative.FamilyConnectionType
                            )
                          "
                        >
                          {{
                            dictionaries.FamilyRelation.items.find(
                              i => i.value == relative.FamilyConnectionType
                            ).label
                          }}
                        </template>
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-3 field">Фамилия</div>
                      <div class="col-9 data">{{ relative.LastName }}</div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-3 field">Имя</div>
                      <div class="col-9 data">{{ relative.FirstName }}</div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-3 field">Отчество</div>
                      <div class="col-9 data">{{ relative.MiddleName }}</div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-3 field">Дата рождения</div>
                      <div class="col-9 data">{{ relative.BirthDate }}</div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-3 field">Вид документа</div>
                      <div class="col-9 data">
                        <template
                          v-if="
                            dictionaries.DocumentType.items.find(
                              i => i.value == relative.Document.documentType
                            )
                          "
                        >
                          {{
                            dictionaries.DocumentType.items.find(
                              i => i.value == relative.Document.documentType
                            ).label
                          }}
                        </template>
                      </div>
                    </div>

                    <template v-if="relative.Document.documentType == 7">
                      <div class="row rowForm">
                        <div class="col-3 field">Наименование документа</div>
                        <div class="col-9 data">
                          {{ relative.Document.DocumentName }}
                        </div>
                      </div>
                    </template>

                    <div class="row rowForm">
                      <div class="col-3 field">Серия паспорта</div>
                      <div class="col-2 data">{{ relative.Document.Series }}</div>
                      <div class="col-3 field add">Номер паспорта</div>
                      <div class="col-4 data">{{ relative.Document.Number }}</div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-3 field">Дата выдачи</div>
                      <div class="col-3 data">{{ relative.Document.GivenDate }}</div>
                      <div class="col-3 field add">Дата окончания</div>
                      <div class="col-3 data">
                        {{ relative.Document.ExpirationDate }}
                      </div>
                    </div>

                    <!-- <div class="row rowForm">
                      <div class="col-3 field">Кем выдан документ</div>
                      <div class="col-9 data">{{ relative.Document.GivenPlace }}</div>
                    </div> -->

                    <div class="row rowForm">
                      <div class="col-3 field">Регион / область выдачи документа</div>
                      <div class="col-9 data">
                        {{
                          dictionaries.Region.items.find(
                            i => i.value == relative.Document.Region
                          ).label
                        }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-3 field">Кем выдан документ</div>
                      <div class="col-9 data">
                        {{
                          getDistrict(
                            relative.Document.Region,
                            relative.Document.GivenPlace
                          )
                        }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-12 field">
                        <q-checkbox
                          disable
                          left-label
                          v-model="relative.LSBO"
                          label="ЛСБО"
                        />
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-3 field">Номер филиала</div>
                      <div class="col-3 data">
                        {{ relative.filial }}
                      </div>
                      <div class="col-3 field add">Должность</div>
                      <div class="col-3 data">
                        {{ relative.role }}
                      </div>
                    </div>

                    <!-- <div class="row rowForm">
                  <div class="col-2 field">ИНН</div>
                  <div class="col-10 data">45445156151</div>
                </div> -->

                    <!-- <div class="row rowForm">
                  <div class="col-2 field">ПНФЛ</div>
                  <div class="col-10 data">45151515151</div>
                </div> -->
                  </div>
                </div>
              </div>
              
            
              <div id="infoWork">
                <h4  class="titleForm">
                  Сведения по основной работе и ежемесячных доходах/расходах
                </h4>
                <div class="formBlock">
                  <div v-if="Customer.JobInfo.type == '1'">
                    <div class="row rowForm">
                      <div class="col-6 field">Вид деятельности</div>
                      <div class="col-6 data">
                        {{ dictionaries.MainWorkType.items[0].label }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">Наименование работодателя</div>
                      <div class="col-6 data">
                        {{ Customer.JobInfo.employerName }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">ИНН работодателя</div>
                      <div class="col-6 data">{{ Customer.JobInfo.INN }}</div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">Вид деятельности организации</div>
                      <div class="col-6 data">
                        {{
                          dictionaries.BusinessType.items.find(
                            i => i.value == Customer.JobInfo.employerActivityType
                          ).label
                        }}
                      </div>
                    </div>

                    <!-- <div class="row rowForm">
                      <div class="col-6 field">Должность</div>
                      <div class="col-6 data">{{ Customer.JobInfo.position }}</div>
                    </div> -->

                    <div class="row rowForm">
                      <div class="col-6 field">
                        Количество работников в организации
                      </div>
                      <div class="col-6 data">
                        {{ 
                          dictionaries.employeesNum.items.find(
                            i => i.value == Customer.JobInfo.employeesNum
                          ).label
                        }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">
                        Стаж на последнем месте работы в месяцах
                      </div>
                      <div class="col-6 data">
                        {{
                          dictionaries.jobPeriods.items.find(
                            i => i.value == Customer.JobInfo.lastJobExperienceMonths
                          ).label
                        }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">Общий трудовой стаж в месяцах</div>
                      <div class="col-6 data">
                        {{
                          dictionaries.jobPeriods.items.find(
                            i => i.value == Customer.JobInfo.totalJobExperienceMonths
                          ).label
                        }}
                      </div>
                    </div>
                  </div>

                  <div
                    v-else-if="
                      Customer.JobInfo.type == '2' || Customer.JobInfo.type == '3'
                    "
                  >
                    <div class="row rowForm">
                      <div class="col-6 field">Вид деятельности</div>
                      <div class="col-6 data" v-if="Customer.JobInfo.type == '2'">
                        {{ dictionaries.MainWorkType.items[1].label }}
                      </div>
                      <div class="col-6 data" v-else>
                        {{ dictionaries.MainWorkType.items[2].label }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">Вид деятельности организации</div>
                      <div class="col-6 data">
                        {{
                          dictionaries.BusinessType.items.find(
                            i => i.value == Customer.JobInfo.employerActivityType
                          ).label
                        }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">Срок деятельности</div>
                      <div class="col-6 data">
                        {{
                          dictionaries.jobPeriods.items.find(
                            i => i.value == Customer.JobInfo.activeYears
                          ).label
                        }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">Наименование организации</div>
                      <div class="col-6 data">
                        {{Customer.JobInfo.employerName}}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">ИНН организации</div>
                      <div class="col-6 data">
                        {{Customer.JobInfo.INN}}
                      </div>
                    </div>
                  </div>

                  <div v-else>
                    <div class="row rowForm">
                      <div class="col-6 field">Вид деятельности</div>
                      <div class="col-6 data">
                        <template v-if="dictionaries.MainWorkType.items[3]">
                          {{ dictionaries.MainWorkType.items[3].label }}
                        </template>
                      </div>
                    </div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-6 field">Подтвержденный ежемесячный доход</div>
                    <div class="col-6 data">
                      {{ Customer.MonthlyIncome.confirmMonthlyIncome | formatNumber }}
                    </div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-6 field">Периодические расходы</div>
                    <div class="col-6 data">
                      {{ Customer.MonthlyExpenses.recurringExpenses | formatNumber }}
                    </div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-6 field">Наличие дополнительного дохода</div>
                    <div class="col-6 data">
                      <template
                        v-if="
                          credits.options.confirmation.find(
                            i => i.value == Customer.MonthlyIncome.hasAdditionalIncome
                          )
                        "
                      >
                        {{
                          credits.options.confirmation.find(
                            i => i.value == Customer.MonthlyIncome.hasAdditionalIncome
                          ).label
                        }}
                      </template>
                    </div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-6 field">
                      Плата за обслуживание других обязательств
                    </div>
                    <div class="col-6 data">
                      {{ Customer.MonthlyExpenses.obligations | formatNumber }}
                    </div>
                  </div>
                
                  <template v-if="Customer.MonthlyIncome.hasAdditionalIncome">
                    <div class="row rowForm">
                      <div class="col-6 field">Размер дополнительного дохода</div>
                      <div class="col-6 data">
                        {{ Customer.MonthlyIncome.additionalIncome.sum | formatNumber }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">Источник дополнительного дохода</div>
                      <div class="col-6 data">
                        <template
                          v-if="
                            dictionaries.additionalIncomeSource.items.find(
                              i =>
                                i.value ==
                                Customer.MonthlyIncome.additionalIncome.incomeType
                            )
                          "
                        >
                          {{
                            dictionaries.additionalIncomeSource.items.find(
                              i =>
                                i.value ==
                                Customer.MonthlyIncome.additionalIncome.incomeType
                            ).label
                          }}
                        </template>
                      </div>
                    </div>
                  </template> 

                    <!-- <div v-if="creditRole !== 'ROLE_CCC'" class="row rowForm"> -->
                    <div class="row rowForm">
                      <div class="col-12 field">
                        <div class="btnBlock">
                          <q-btn
                            :loading="bankLoading"
                            color="primary"
                            label="Посмотреть заработные поступления"
                            @click="getDataINPS"
                            class="btnGet"
                          >
                            <template v-slot:loading>
                              <q-spinner-facebook />
                            </template>
                          </q-btn>
                        </div>
                      </div>
                    </div>
                  
                </div>
              </div>
              

              <div id="properties">
                <h4 class="titleForm">Сведения об имуществе</h4>
                <div class="formBlock">
                  <div
                    v-for="(property, index) of Customer.PropertyInformation
                      .Realty_new.items"
                    :key="'Realty_new' + index"
                  >
                    <h5 class="subTitleForm">
                      <span class="titleValue">Недвижимость {{ index + 1 }}</span>
                    </h5>

                    <div class="row rowForm">
                      <div class="col-4 field">Вид недвижимости</div>
                      <div class="col-8 data">
                        <template
                          v-if="
                            dictionaries.PropertyType.items.find(
                              i => i.value == property.PropertyType
                            )
                          "
                        >
                          {{
                            dictionaries.PropertyType.items.find(
                              i => i.value == property.PropertyType
                            ).label
                          }}
                        </template>
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-4 field">Регион / область</div>
                      <div class="col-8 data">
                        <template
                          v-if="
                            dictionaries.Region.items.find(
                              i => i.value == property.Region
                            )
                          "
                        >
                          {{
                            dictionaries.Region.items.find(
                              i => i.value == property.Region
                            ).label
                          }}
                        </template>
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-4 field">Рыночная стоимость</div>
                      <div class="col-8 data">{{ property.MarketValue | formatNumber }}</div>
                    </div>
                  </div>

                  <div
                    v-for="(vehicle, index) of Customer.PropertyInformation
                      .Transport_new.items"
                    :key="'Transport_new' + index"
                  >
                    <h5 class="subTitleForm">
                      <span class="titleValue"
                        >Транспортное средство {{ index + 1 }}</span
                      >
                    </h5>

                    <div class="row rowForm">
                      <div class="col-4 field">Вид транспортного средства</div>
                      <div class="col-8 data">
                        <template
                          v-if="
                            dictionaries.VehicleType.items.find(
                              i => i.value == vehicle.VehicleType
                            )
                          "
                        >
                          {{
                            dictionaries.VehicleType.items.find(
                              i => i.value == vehicle.VehicleType
                            ).label
                          }}
                        </template>
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-4 field">Марка транспортного средства</div>
                      <div class="col-8 data">
                        {{ vehicle.transportBrand }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-4 field">Год выпуска</div>
                      <div class="col-8 data">{{ vehicle.yearOfRelease }}</div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-4 field">Рыночная стоимость</div>
                      <div class="col-8 data">{{ vehicle.MarketValue | formatNumber }}</div>
                    </div>
                  </div>
                </div>
              </div>
              

              <div id="guarantees"> 
                <h4 class="titleForm">Гарантии и поручительства</h4>
                <div class="formBlock">
                  <template v-if="fullProfile.Guarantee.RelatedPerson.items.length">
                    <div
                      v-for="(guarantee, index) of fullProfile.Guarantee.RelatedPerson
                        .items"
                      :key="'RelatedPerson' + index"
                    >
                      <div class="row rowForm">
                        <div class="col-6 field">Вид обеспечения</div>
                        <div class="col-6 data">Физ. лицо {{ index + 1 }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Отношение к клиенту</div>
                        <div class="col-6 data">
                          {{
                            dictionaries.ClientRelationType.items.find(
                              i => i.value == guarantee.ClientRelation
                            ).label
                          }}
                        </div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Фамилия</div>
                        <div class="col-6 data">{{ guarantee.LastName }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Имя</div>
                        <div class="col-6 data">{{ guarantee.FirstName }}</div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">Отчество</div>
                        <div class="col-6 data">{{ guarantee.MiddleName }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Тип родственной связи</div>
                        <div class="col-6 data">
                          {{
                            dictionaries.ClientRelationType.items.find(
                              i => i.value == guarantee.ClientRelation
                            ).label
                          }}
                        </div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Дата рождения</div>
                        <div class="col-6 data">{{ guarantee.BirthDate }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">ИНН</div>
                        <div class="col-6 data">{{ guarantee.INN }}</div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">ПИНФЛ</div>
                        <div class="col-6 data">{{ guarantee.PINPP }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Резиденство</div>
                        <div class="col-6 data">
                          <template
                            v-if="
                              credits.options.confirmation.find(
                                i => i.value == guarantee.Resident
                              )
                            "
                          >
                            {{
                              credits.options.confirmation.find(
                                i => i.value == guarantee.Resident
                              ).label
                            }}
                          </template>
                        </div>
                      </div>

                      <!-- <div class="row rowForm">
                        <div class="col-12 field">Данные документа:</div>
                      </div> -->

                      <div class="row rowForm">
                        <div class="col-6 field">Вид документа</div>
                        <div class="col-6 data">
                          <template
                            v-if="
                              dictionaries.DocumentType.items.find(
                                i => i.value == guarantee.Document.documentType
                              )
                            "
                          >
                            {{
                              dictionaries.DocumentType.items.find(
                                i => i.value == guarantee.Document.documentType
                              ).label
                            }}
                          </template>
                        </div>
                      </div>

                      <div
                        class="row rowForm"
                        v-if="guarantee.Document.documentType == 7"
                      >
                        <div class="col-6 field">Наименование документа</div>
                        <div class="col-6 data">
                          {{ guarantee.Document.DocumentName }}
                        </div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">Серия</div>
                        <div class="col-6 data">{{ guarantee.Document.Series }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Номер</div>
                        <div class="col-6 data">{{ guarantee.Document.Number }}</div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">Дата выдачи</div>
                        <div class="col-6 data">
                          {{ guarantee.Document.GivenDate }}
                        </div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Дата окончания</div>
                        <div class="col-6 data">
                          {{ guarantee.Document.ExpirationDate }}
                        </div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">
                          Регион / область выдачи документа
                        </div>
                        <div class="col-6 data">
                          {{
                            dictionaries.Region.items.find(
                              i => i.value == guarantee.Document.Region
                            ).label
                          }}
                        </div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">Кем выдан документ</div>
                        <div class="col-6 data">
                          {{
                            getDistrict(
                              guarantee.Document.Region,
                              guarantee.Document.GivenPlace
                            )
                          }}
                        </div>
                      </div>

                      <!-- <div class="row rowForm">
                        <div class="col-6 field">Номер карты</div>
                        <div class="col-6 data">
                          {{ guarantee.CardNumber }}
                        </div>
                      </div> -->

                      <div class="row rowForm">
                        <div class="col-6 field">Номер карты поручителя</div>
                        <div class="col-6 data">
                          {{ guarantee.CardNumber }}
                        </div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">Наименование банка</div>
                        <div class="col-6 data">
                          {{ guarantee.bank_name }}
                        </div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">МФО банка</div>
                        <div class="col-6 data">
                          {{ guarantee.mfo }}
                        </div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">Расчетный счет</div>
                        <div class="col-6 data">
                          {{ guarantee.relatedPersonBill }}
                        </div>
                      </div>

                      <!-- <div class="row rowForm">
                        <div class="col-12 field">Адрес:</div>
                      </div> -->

                      <!-- <div class="row rowForm">
                        <div class="col-6 field">Индекс</div>
                        <div class="col-6 data">
                          {{ guarantee.Address.PostalCode }}
                        </div>
                      </div> -->
                      <div class="row rowForm">
                        <div class="col-6 field">Регион/ область</div>
                        <div class="col-6 data">
                          {{
                            dictionaries.Region.items.find(
                              i => i.value == guarantee.Address.Region
                            ).label
                          }}
                        </div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Город</div>
                        <div class="col-6 data">{{ guarantee.Address.City }}</div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">Район</div>
                        <div class="col-6 data">
                          {{
                            getDistrict(
                              guarantee.Address.Region,
                              guarantee.Address.District
                            )
                          }}
                        </div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">Улица / мкр.</div>
                        <div class="col-6 data">{{ guarantee.Address.Street }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Номер дома</div>
                        <div class="col-6 data">{{ guarantee.Address.House }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Квартира</div>
                        <div class="col-6 data">
                          {{ guarantee.Address.Apartment }}
                        </div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Сумма поручительства</div>
                        <div class="col-6 data">{{ guarantee.Sum | formatNumber }}</div>
                      </div>

                      <!-- <div class="row rowForm">
                        <div class="col-12 field">Контактная информация:</div>
                      </div> -->

                      <div
                        class="row rowForm"
                        v-for="(phone, phoneIndex) of guarantee.PhoneList.items"
                        :key="phone.Number"
                      >
                        <div class="col-6 field">Телефон {{ phoneIndex + 1 }}</div>
                        <div class="col-6 data">{{ phone.Number }}</div>
                      </div>
                    </div>
                  </template>

                  <template
                    v-if="fullProfile.Guarantee.RelatedLegalPerson.items.length"
                  >
                    <div
                      v-for="(guarantee, index) of fullProfile.Guarantee
                        .RelatedLegalPerson.items"
                      :key="'RelatedLegalPerson' + index"
                    >
                      <div class="row rowForm">
                        <div class="col-6 field">Вид обеспечения</div>
                        <div class="col-6 data">Юр. лицо {{ index + 1 }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Фамилия</div>
                        <div class="col-6 data">{{ guarantee.CEOLastName }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Имя</div>
                        <div class="col-6 data">{{ guarantee.CEOFirstName }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Отчество</div>
                        <div class="col-6 data">{{ guarantee.CEOMiddleName }}</div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">Наименование организации</div>
                        <div class="col-6 data">{{ guarantee.Name }}</div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">ИНН</div>
                        <div class="col-6 data">{{ guarantee.INN }}</div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">Номер карты</div>
                        <div class="col-6 data">{{ guarantee.cardNumber }}</div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">Наименование банка</div>
                        <div class="col-6 data">{{ guarantee.bank_name }}</div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">МФО банка</div>
                        <div class="col-6 data">{{ guarantee.mfo }}</div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">Расчетный счет</div>
                        <div class="col-6 data">{{ guarantee.relatedLegalPersonBill }}</div>
                      </div>

                      <!-- <div class="row rowForm">
                        <div class="col-12 field">Адрес:</div>
                      </div> -->

                      <!-- <div class="row rowForm">
                        <div class="col-6 field">Индекс</div>
                        <div class="col-6 data">
                          {{ guarantee.Address.PostalCode }}
                        </div>
                      </div> -->
                      <div class="row rowForm">
                        <div class="col-6 field">Регион/ область</div>
                        <div class="col-6 data">
                          {{
                            dictionaries.Region.items.find(
                              i => i.value == guarantee.Address.Region
                            ).label
                          }}
                        </div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Город</div>
                        <div class="col-6 data">{{ guarantee.Address.City }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Район</div>
                        <div class="col-6 data">
                          {{ getDistrict(guarantee.Address.Region, guarantee.Address.District) }}
                        </div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Улица / мкр.</div>
                        <div class="col-6 data">{{ guarantee.Address.Street }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Номер дома</div>
                        <div class="col-6 data">{{ guarantee.Address.House }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Сумма поручительства</div>
                        <div class="col-6 data">{{ guarantee.Sum | formatNumber }}</div>
                      </div>

                      <!-- <div class="row rowForm">
                        <div class="col-12 field">Контактная информация:</div>
                      </div> -->

                      <div
                        class="row rowForm"
                        v-for="(phone, phoneIndex) of guarantee.PhoneList.items"
                        :key="phone.Number"
                      >
                        <div class="col-6 field">Телефон {{ phoneIndex + 1 }}</div>
                        <div class="col-6 data">{{ phone.Number }}</div>
                      </div>
                    </div>
                  </template>

                  <template v-if="fullProfile.Guarantee.Insurance.items.length">
                    <div
                      v-for="(guarantee, index) of fullProfile.Guarantee.Insurance
                        .items"
                      :key="'Insurance' + index"
                    >
                      <div class="row rowForm">
                        <div class="col-6 field">Вид обеспечения</div>
                        <div class="col-6 data">Страхование {{ index + 1 }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Наименование организации</div>
                        <div class="col-6 data">
                          <!-- {{
                            dictionaries.Insurance_company.items.find(
                              i => i.value == guarantee.OrgName
                            ).label
                          }} -->

                          {{ guarantee.OrgName }}
                        </div>
                      </div>


                      <div class="row rowForm">
                        <div class="col-6 field">ИНН страховой компании</div>
                        <div class="col-6 data">{{ guarantee.INN }}</div>
                      </div>
                      <div class="row rowForm">
                        <div class="col-6 field">Сумма страхового полиса</div>
                        <div class="col-6 data">{{ guarantee.Sum | formatNumber }}</div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">Страховой платёж</div>
                        <div class="col-6 data">{{ guarantee.sec_payment | formatNumber }}</div>
                      </div>


                      <div class="row rowForm">
                        <div class="col-6 field">Номер страхового договора</div>
                        <div class="col-6 data">{{ guarantee.ContractNumber }}</div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">Дата начала действия договора</div>
                        <div class="col-6 data">{{ guarantee.StartDate }}</div>
                      </div>

                      <div class="row rowForm">
                        <div class="col-6 field">Дата истечения действия договора</div>
                        <div class="col-6 data">{{ guarantee.ExpDate }}</div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              

              <div id="infoCredit">
                <h4 class="titleForm">Сведения о запрашиваемом кредите</h4>
                <div class="formBlock">
                  <div class="row rowForm">
                    <div class="col-6 field">Кредитный продукт</div>
                    <div class="col-6 data">
                      <template
                        v-if="
                          dictionaries.LoanProduct.items.find(
                            i => i.value == fullProfile.LoanInfo.LoanProduct
                          )
                        "
                      >
                        {{
                          dictionaries.LoanProduct.items.find(
                            i => i.value == fullProfile.LoanInfo.LoanProduct
                          ).label
                        }}
                      </template>
                    </div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-6 field">Запрашиваемая сумма кредита</div>
                    <div class="col-6 data">{{ fullProfile.LoanInfo.Sum | formatNumber }}</div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-6 field">Валюта</div>
                    <div class="col-6 data">{{ fullProfile.LoanInfo.Currency }}</div>
                  </div>

                  <template
                    v-if="
                      !!fullProfile.LoanInfo.LoanProduct &&
                        fullProfile.LoanInfo.LoanProduct !== 3
                    "
                  >
                    <div class="row rowForm">
                      <div class="col-6 field">Тип пошагового кредита</div>
                      <div class="col-6 data">
                        <template
                          v-if="
                            dictionaries.PaymentsType.items.find(
                              i => i.value == fullProfile.LoanInfo.RepaymentType
                            )
                          "
                        >
                          {{
                            dictionaries.PaymentsType.items.find(
                              i => i.value == fullProfile.LoanInfo.RepaymentType
                            ).label
                          }}
                        </template>
                      </div>
                    </div>
                  </template>

                  <div class="row rowForm">
                    <div class="col-6 field">
                      Процентная ставка по кредиту
                    </div>
                    <div class="col-6 data">
                      {{ fullProfile.LoanInfo.MaxInterestRate }}
                    </div>
                  </div>

                  <!-- <div class="row rowForm">
                    <div class="col-6 field">
                      Процентная ставка по кредиту (минимальная)
                    </div>
                    <div class="col-6 data">
                      {{ fullProfile.LoanInfo.MinInterestRate }}
                    </div>
                  </div> -->

                  <div class="row rowForm">
                    <div class="col-6 field">
                      Льготный период по погашению кредита (число месяцев)
                    </div>
                    <div class="col-6 data">
                      {{ fullProfile.LoanInfo.MaxDefferalRepaymentPeriod }}
                    </div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-6 field">Срок кредита в мес</div>
                    <div class="col-6 data">
                      {{ fullProfile.LoanInfo.TermInMonth }}
                    </div>
                  </div>

                  <!-- <div class="row rowForm">
                    <div class="col-6 field">
                      Максимальное количество месяцев на кредит
                    </div>
                    <div class="col-6 data">
                      {{ fullProfile.LoanInfo.MaxTermInMonths }}
                    </div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-6 field">
                      Минимальное количество месяцев на кредит
                    </div>
                    <div class="col-6 data">
                      {{ fullProfile.LoanInfo.MinTermInMonths }}
                    </div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-6 field">Первоначальный взнос</div>
                    <div class="col-6 data">
                      {{ fullProfile.LoanInfo.InitialPayment }}
                    </div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-6 field">
                      Процент первоначального взноса (максимальный)
                    </div>
                    <div class="col-6 data">
                      {{ fullProfile.LoanInfo.MaxInitialPaymentPercent }}
                    </div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-6 field">
                      Процент первоначального взноса (минимальный)
                    </div>
                    <div class="col-6 data">
                      {{ fullProfile.LoanInfo.MinInitialPaymentPercent }}
                    </div>
                  </div> -->

                  <div class="row rowForm">
                    <div class="col-6 field">Цель кредитования</div>
                    <div class="col-6 data">
                      <template
                        v-if="
                          dictionaries.LoanPurpose.items.find(
                            i => i.value == fullProfile.LoanInfo.LoanPurpose
                          )
                        "
                      >
                        {{
                          dictionaries.LoanPurpose.items.find(
                            i => i.value == fullProfile.LoanInfo.LoanPurpose
                          ).label
                        }}
                      </template>
                    </div>
                  </div>

                  <div class="row rowForm">
                    <div class="col-6 field">Источник финансирования</div>
                    <div class="col-6 data">
                      <template
                        v-if="
                          dictionaries.FinancialSources.items.find(
                            i => i.value == fullProfile.LoanInfo.FundingSource
                          )
                        "
                      >
                        {{
                          dictionaries.FinancialSources.items.find(
                            i => i.value == fullProfile.LoanInfo.FundingSource
                          ).label
                        }}
                      </template>
                    </div>
                  </div>

                  <div class="row rowForm">
                      <div class="col-6 field">Комиссия за организацию кредита</div>
                      <div class="col-6 data">
                        {{ fullProfile.LoanInfo.loan_org_comission | formatNumber }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">Другие услуги</div>
                      <div class="col-6 data">
                        {{ fullProfile.LoanInfo.other_services | formatNumber }}
                      </div>
                    </div>

                  <template v-if="!!fullProfile.Customer.CardNumber && fullProfile.LoanInfo.LoanProduct != 136 && this.fullProfile.LoanInfo.LoanProduct != 1715">
                    <div class="row rowForm">
                      <div class="col-6 field">
                        Номер карты
                      </div>
                      <div class="col-6 data">
                        {{ fullProfile.Customer.CardNumber }}
                      </div>
                    </div>
                  </template>

                  <template v-else-if="fullProfile.LoanInfo.LoanProduct != 136 && this.fullProfile.LoanInfo.LoanProduct != 1715">
                    <div class="row rowForm">
                      <div class="col-6 field">
                        Наименование банка
                      </div>
                      <div class="col-6 data">
                        {{ fullProfile.LoanInfo.microloan_details.bank_name }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">
                        МФО банка
                      </div>
                      <div class="col-6 data">
                        {{ fullProfile.LoanInfo.microloan_details.mfo }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">
                        Расчетный счет клиента
                      </div>
                      <div class="col-6 data">
                        {{ fullProfile.LoanInfo.microloan_details.customer_bill }}
                      </div>
                    </div>
                  </template>

                  <template v-if="fullProfile.LoanInfo.LoanProduct == 136 || this.fullProfile.LoanInfo.LoanProduct == 1715">
                    <div class="row rowForm">
                      <div class="col-6 field">
                        МФО банка продавца
                      </div>
                      <div class="col-6 data">
                        {{ fullProfile.LoanInfo.microloan_details.mfo }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">
                        Наименование продавца/производителя товара/работы/услуги
                      </div>
                      <div class="col-6 data">
                        {{ fullProfile.LoanInfo.consumerLoan.nameProduction }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">Наименование товара/работы/услуги</div>
                      <div class="col-6 data">
                        {{ fullProfile.LoanInfo.consumerLoan.nameService }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">
                        Наименование банка продавца/производителя товара/работы/услуги
                      </div>
                      <div class="col-6 data">
                        {{ fullProfile.LoanInfo.consumerLoan.nameBankProd }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">
                        Расчетный счет продавца/производителя товара/работы/услуги
                      </div>
                      <div class="col-6 data">
                        {{ fullProfile.LoanInfo.consumerLoan.billProd }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">
                        Номер договора с продавцом/поставщиком товара/работы/услуги
                      </div>
                      <div class="col-6 data">
                        {{ fullProfile.LoanInfo.consumerLoan.agreementNumber }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">
                        Дата договора с продавцом/поставщиком товара/работы/услуги
                      </div>
                      <div class="col-6 data">
                        {{ fullProfile.LoanInfo.consumerLoan.agreementDate }}
                      </div>
                    </div>
                  </template>

                  <!-- <template v-if="creditRole === 'ROLE_CC'"> -->
                  <template>
                    <!-- <div class="row rowForm">
                      <div class="col-6 field">
                        Среднемесячная заработная плата(сум)
                      </div>
                      <div class="col-6 data">
                        {{ processInfo.avgSalary }}
                      </div>
                    </div> -->

                    <div class="row rowForm">
                      <div class="col-6 field">
                        Профит
                      </div>
                      <div class="col-6 data">
                        <!-- {{ processInfo.profit }} -->
                        {{ fullProfile.profit }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">
                        Класс кредитоспособности
                      </div>
                      <div class="col-6 data">
                        {{ processInfo.loanAbilityClass }}
                      </div>
                    </div>

                    <div class="row rowForm">
                      <div class="col-6 field">
                        Расчет максимально возможной суммы кредита (скоринг)
                      </div>
                      <div class="col-6 data">
                        {{ processInfo.LoanMax | formatNumber }}
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              

              <div id="documents">
                <h4 class="titleForm">Документы</h4>
                <div class="formBlock">
                  <template v-if="fullProfile.AttachedDocuments.items">
                    <div
                      v-for="(document, index) of fullProfile.AttachedDocuments.items"
                      :key="document.id"
                    >
                      <div class="row rowForm">
                        <div class="col-4 field">
                          Наименование документа {{ index + 1 }}
                        </div>
                        <div class="col-8 data">
                          <p>{{ document.DocumentName }}</p>
                          <q-btn
                            class="showFile"
                            color="primary"
                            label="Просмотреть"
                            @click="
                              loaderFullScreen = true;
                              showFile(document.id);
                              loaderFullScreen = false;
                            "
                          />
                        </div>
                      </div>

                      <!-- <div class="row rowForm">
                      <div class="col-3 field">Скан документа</div>
                      <div class="col-9 data"></div>
                    </div> -->
                    </div>
                  </template>

                  <div v-else class="col-12 field">
                    Приложение документа отсутсвтует
                  </div>
                </div>
              </div>
              
              <div id="commentCredit">
                <h4 class="titleForm">Комментарии</h4>
                <div class="formBlock">
                  <template v-if="fullProfile.ApplicationComment">
                    <div
                      v-for="comment of fullProfile.ApplicationComment.items"
                      :key="comment.id"
                    >
                      <div class="row rowForm">
                        <div class="col-3 field">
                          {{ comment.CommentPerson }}
                        </div>
                        <div class="col-9 data">
                          {{ comment.Comment }}
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              
              <div id="clientInfo">
                <h4 class="titleForm">
                  Информация о клиенте
                </h4>
                <div class="formBlock">
                  <appClientInfo
                    v-if="clientInfo"
                    :data="clientInfo"
                    :scoring="fullProfile"
                  />

                  <q-btn
                    :loading="clientInfoLoading"
                    color="primary"
                    label="Получить данные клиента"
                    @click="getClientInfo"
                    class="btnGet"
                  >
                    <template v-slot:loading>
                      <q-spinner-facebook />
                    </template>
                  </q-btn>
                </div>
              </div>
              
              
              <div v-if="scoringResult" id="scoringResult">
                <h4 class="titleForm">
                  Результаты по скоринговой карте
                </h4>
                <div class="formBlock">

                  <q-markup-table class="scoringResult" separator="cell" flat bordered>
                    <thead>
                      <tr>
                        <th class="text-left">Параметр</th>
                        <th class="text-left">Балл</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span>Возраст</span></td>
                        <td>{{scoringResult.age}}</td>
                      </tr>
                      <tr>
                        <td><span>Рейтинг работодателя</span></td>
                        <td>{{scoringResult.companyClass}}</td>
                      </tr>
                      <tr>
                        <td><span>Наличие у клиента банковских счетов в НБУ</span></td>
                        <td>{{scoringResult.bills}}</td>
                      </tr>
                      <tr>
                        <td><span>Семейное положение</span></td>
                        <td>{{scoringResult.marital}}</td>
                      </tr>
                      <tr>
                        <td><span>Наличие детей</span></td>
                        <td>{{scoringResult.children}}</td>
                      </tr>
                      <tr>
                        <td><span>Кредитная история</span></td>
                        <td>{{scoringResult.loanHistory}}</td>
                      </tr>
                      <tr>
                        <td><span>Наличие недвижимости</span></td>
                        <td>{{scoringResult.realty}}</td>
                      </tr>
                      <tr>
                        <td><span>Наличие транспорта</span></td>
                        <td>{{scoringResult.vehicle}}</td>
                      </tr>
                      <tr>
                        <td><span>Опыт работы</span></td>
                        <td>{{scoringResult.jobPeriod}}</td>
                      </tr>
                      <tr>
                        <td><span>Срок кредита</span></td>
                        <td>{{scoringResult.loanPeriod}}</td>
                      </tr>
                      <tr>
                        <td><span>Местоположение</span></td>
                        <td>{{scoringResult.location}}</td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </div>
              </div>
                
              
              <!-- Buttons -->
              <div class="col-12">
                <div class="btnBlock">
                  <q-btn
                  label="Одобрить"
                  class="q-ml-md btnSucces"
                  @click="creditSuccess"
                />
              
                <q-btn
                  v-if="creditRole != 'ROLE_UrWr'"
                  label="Отклонить"
                  class="q-ml-md btnFailure"
                  @click="
                    () => {
                      confirm = true;
                      commentCC.Decision = 'N';
                    }
                  "
                />
              
                <q-btn
                  label="На доработку"
                  class="q-ml-md btnRework"
                  @click="
                    () => {
                      confirm = true;
                      commentCC.Decision = 'R';
                    }
                  "
                />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-3 navMenuBlock">
          <ul class="navMenu">
            <li>
              <a class="active" href="#privatData" @click="goToBlock"
                >Личные данные клиента</a>
            </li>
            <li>
              <a href="#contactData" @click="goToBlock">Контактные данные</a>
            </li>
            <li><a href="#relatives" @click="goToBlock">Родственники</a></li>
            <li>
              <a href="#infoWork" @click="goToBlock"
                >Сведения по основной работе и ежемесячных доходах/расходах</a>
            </li>
            <li>
              <a href="#properties" @click="goToBlock">Сведения об имуществе</a>
            </li>
            <li>
              <a href="#guarantees" @click="goToBlock"
                >Гарантии и поручительство</a>
            </li>
            <li>
              <a href="#infoCredit" @click="goToBlock"
                >Сведения о запрашиваемом кредите</a>
            </li>
            <li>
              <a href="#documents" @click="goToBlock">Документы</a>
            </li>
            <li>
              <a href="#commentCredit" @click="goToBlock"
                >Комментарии по кредиту</a>
            </li>
            <li>
              <a href="#clientInfo" @click="goToBlock"
                >Информация о клиенте</a>
            </li>
            <li v-if="scoringResult">
              <a href="#scoringResult" @click="goToBlock"
                >Результаты по скоринговой карте</a>
            </li>
          </ul>
        </div>
      </div>

      <q-dialog v-model="confirm" persistent>
        <q-card class="failureCreditForm">
          <!-- <q-card-section class="row titleFailureCredit">
          <span class="q-ml-sm">Выберите причину отказа</span>
        </q-card-section> -->
          <q-card-section class="row titleFailureCredit">
            <span class="q-ml-sm">Введите причину отказа</span>
          </q-card-section>
          <div class="separate"></div>
          <form
            class="failureCreditForm row q-col-gutter-md"
            @submit.prevent.stop="submitHandler"
          >
            <div class="col-12">
              <!-- <q-select
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
            /> -->

              <!-- <div v-if="reason === options.reason[3]" style="max-width: 100%"> -->
              <div
                v-if="creditRole == 'ROLE_CCC' || this.creditRole == 'ROLE_UrWr'"
                style="max-width: 100%"
              >
                <q-input
                  ref="comment"
                  square
                  outlined
                  dense
                  v-model="commentBO.Comment"
                  label="Комментарий"
                  type="textarea"
                  lazy-rules
                  :rules="[val => !!val || 'Напишите комментарий']"
                  class="q-pb-sm"
                />
              </div>

              <div v-else style="max-width: 100%">
                <q-input
                  ref="comment"
                  square
                  outlined
                  dense
                  v-model="commentCC.Comment"
                  label="Комментарий"
                  type="textarea"
                  lazy-rules
                  :rules="[val => !!val || 'Напишите комментарий']"
                  class="q-pb-sm"
                />
              </div>
            </div>

            <div class="btnBlock">
              <q-btn
                class="btnCancel"
                label="Отмена"
                color="red"
                v-close-popup
                @click="
                  () => {
                    comment = '';
                    commentCC.Decision = 'Y';
                  }
                "
              />
            
              <q-btn
                class="btnOk"
                type="submit"
                label="Отправить"
                color="green"
              />
            </div>
          </form>
        </q-card>
      </q-dialog>

      <div ref="modalView" class="modalView">
        <q-btn @click="closeModal" icon="close" color="black" round />
        <iframe
          ref="pdfviewer"
          class="pdfviewer"
          src=""
          type="application/pdf"
          style="width: 100%; height: calc(100vh - 110px)"
          width="100%"
        >
        </iframe>
      </div>
    </div>

    <appLoaderFullScreen v-if="loader" />

    <q-dialog v-model="INPSBar" persistent>
      <q-card class="INPSblock">
        <q-card-section>
          <appGetDataINPS
            v-if="dataINPS.code == 0"
            :salaries="dataINPS.salaries"
            @closeBar="$event => (INPSBar = $event)"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapGetters } from "vuex";

import CommonUtils from "@/shared/utils/CommonUtils";
import Loader from "@/components/Loader";
import LoaderFullScreen from "@/components/LoaderFullScreen";
import GetDataINPS from "../../Components/INPS/GetData";

import formatDate from "../../filters/formatDate";
import formatNumber from "../../filters/format_number.js";
import { validItems, validFilter } from "../../filters/valid_filter";
import ClientInfo from "../../Components/ClientInfo";

export default {
  data() {
    return {
      clientInfo: null,
      clientInfoLoading: false,
      loader: false,
      bankLoading: false,
      INPSBar: false,
      loaderForm: true,
      confirm: false,
      BODecision: true,
      FinalDecision: "",
      dataINPS: {
        code: null,
        msg: ""
      },
      // userRole: this.$store.getters["credits/userRole"],

      commentBO: {
        Comment: "",
        // Type: this.$store.getters["credits/userRole"],
        CommentPerson: this.$store.getters["auth/username"],
        CommentPersonFIO: this.$store.getters["auth/fullName"]
        //id: 0,
        //CommentDate: ""
      },

      commentCC: {
        Comment: "",
        //MemberOfCCFIO: "",
        Id: 0,
        Login: this.$store.getters["auth/username"],
        Decision: "Y",
        isChairman: null,
        isRiskManager: null
      }

      // reason: "",
      // options: {
      //   reason: ["причина 1", "причина 2", "причина 3", "другое"]
      // }
    };
  },
  async created() {
    this.$store.commit("credits/setTaskId", this.$route.query.taskId);
    await this.$store.dispatch(
        "credits/setHeaderRole",
        this.creditRole
      );

    // если перезагрузили страницу
    if (!axios.defaults.headers.common["BPMCSRFToken"]) {
      // this.userRole = sessionStorage.getItem("userRole");
      // await this.$store.dispatch(
      //   "credits/setHeaderRole",
      //   sessionStorage.getItem("userRole")
      // );
      await this.$store.dispatch(
        "credits/setHeaderBPM",
        sessionStorage.getItem("csrf_token")
      );
    }

    try {
      const res = await this.$store.dispatch("profile/getFullForm");
      this.loaderForm = false;
      console.log("res", res);
    } catch (error) {}
  },
  async mounted() {
    setTimeout(() => {
      document.querySelectorAll(".titleForm")
          .forEach(el => el.addEventListener("click", () => this.toggleCreditBlock(el))) 
          
      document
          .querySelectorAll(".scroll")[1]
          .addEventListener("scroll", this.handleScroll);
    }, 1000);
  },
  beforeDestroy() {
    document.querySelectorAll(".titleForm")
        .forEach(el => el.removeEventListener("click", () => this.toggleCreditBlock(el)))

    if(!!document.querySelectorAll(".scroll")[1]) {
      document
        .querySelectorAll(".scroll")[1]
        .removeEventListener("scroll", this.handleScroll);
    }
  },
  computed: {
    ...mapState({
      fullProfile: state => state.profile.fullFormProfile,
      profile: state => state.profile,
      Customer: state => state.profile.fullFormProfile.Customer,
      dictionaries: state => state.profile.dictionaries,
      credits: state => state.credits
    }),

    ...mapGetters({
        preapprove_num: "profile/preapprove_num"
    }), 

    creditRole() {
      return this.$route.query.creditRole;
    },

    date() {
      return this.$route.query.date;
    },
    applicationNumber() {
      return this.$route.query.applicationNumber;
    },
    protocolNumber() {
      return this.$route.query.protocolNumber;
    },
    filialName() {
      return this.$route.query.filialName;
    },
    filial() {
      return this.$route.query.filial;
    },
    
    processInfo() {
      const processInfo = this.profile.BPMInput.find(
        i => i.label === "processInfo"
      );

      if (processInfo) {
        return {
          avgSalary: processInfo.data.avgSalary,
          loanAbilityClass: processInfo.data.loanAbilityClass,
          profit: processInfo.data.profit,
          LoanMax: processInfo.data.LoanMax,
        }
      } else {
        return {
          avgSalary: null,
          loanAbilityClass: null,
          profit: null,
          LoanMax: null,
        }
      }
    }, 

    scoringResult() {
      return this.profile.allResponse.scoringResult
    }
  },
  methods: {

    messageApprove() {
      return this.creditRole == "ROLE_CCC"
              ? 'Form approve'
              : this.creditRole == "ROLE_CC" || this.creditRole == "ROLE_UrWr"
                ? 'Credit success'
                : null
    },
    messageReject(Decision) {
      console.log('Decision', this.creditRole, Decision)
      return this.creditRole == "ROLE_CCC" && Decision == 'N'
              ? 'Form reject'
              : Decision == 'N'
                ? 'Credit failure'
                : Decision == 'R'
                  ? 'Credit rework'
                  : null
    },

    async getClientInfo() {
      this.clientInfoLoading = true;
      try {
        this.clientInfo = await this.$store.dispatch("profile/clientInfo");
        this.clientInfoLoading = false;
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          {
            message: CommonUtils.filterServerError(error),
            code: 0
          }
        );
        this.clientInfoLoading = false;
      }
    },

    creditSuccess() {
      console.log("creditRole", this.creditRole);
      console.log("fulForm", this.fullProfile);

      if (this.creditRole == "ROLE_CCC" || this.creditRole == "ROLE_UrWr") {
        this.BODecision = true; // кредит одобрен
      } else if (this.creditRole == "ROLE_CC") {
        this.$store.commit("profile/addComment", {
          commentBlock: "CreditCommiteeDecisions",
          comment: this.commentCC
        });
      }
      this.sentData(this.messageApprove());
    },

    submitHandler(event) {
      // console.log(this.$refs);
      // this.$refs.reson.validate();

      // if (this.reason === this.options.reason[3]) {
      //   this.$refs.comment.validate();
      // } else {
      //   this.validItems(this.$refs, "comment");
      // }

      // if (this.$refs.reson.hasError || this.$refs.comment.hasError) {
      //   this.formHasError = true;
      // } else {
      this.$refs.comment.validate();
      if (this.$refs.comment.hasError) {
        this.formHasError = true;
      } else {
        if (this.creditRole == "ROLE_CCC" || this.creditRole == "ROLE_UrWr") {
          this.BODecision = false; // кредит на доработку
          this.FinalDecision = this.commentCC.Decision == 'N' 
                                  ? "Отказ"
                                  : ""

          this.$store.commit("profile/addComment", {
            commentBlock: "ApplicationComment",
            comment: this.commentBO
          });
        } else if (this.creditRole == "ROLE_CC") {
          this.$store.commit("profile/addComment", {
            commentBlock: "CreditCommiteeDecisions",
            comment: this.commentCC
          });

          this.$store.commit("profile/addComment", {
            commentBlock: "ApplicationComment",
            comment: {
              Comment: this.commentCC.Comment,
              CommentPerson: this.$store.getters["auth/username"],
              // Type: this.$store.getters["credits/userRole"],
              CommentPersonFIO: this.$store.getters["auth/fullName"]
            }
          });
        }

        this.sentData(this.messageReject(this.commentCC.Decision));

        this.confirm = false;
      }
    },

    async sentData(message) {
      this.loader = true;
      let data = {};
      if (this.creditRole == "ROLE_CCC"  || this.creditRole == "ROLE_UrWr") {
        data = {
          output: [
             {
              name: "FinalDecision",
              data: this.FinalDecision
            },
            {
              name: "BOLogin",
              data: this.$store.getters["auth/username"]
            },
            {
              name: "BODecision",
              data: this.BODecision
            },
            {
              name: "ApplicationComment",
              data: this.fullProfile.ApplicationComment.items
            }
          ]
        };
      } else if (this.creditRole == "ROLE_CC") {
        
        data = {
          output: [
            {
              name: "CreditCommiteeDecisions",
              data: this.fullProfile.CreditCommiteeDecisions.items
            },
            {
              name: "application_comments",
              //data: this.fullProfile.ApplicationComment.items
              data: [
                      {
                        Comment: this.commentCC.Comment,
                        CommentPerson: this.$store.getters["auth/username"],
                        // Type: this.$store.getters["credits/userRole"]
                      }
                    ]
            },
            {
              name: "username",
              data: this.$store.getters["auth/username"]
            },
            {
              name: "userfullname",
              data: this.$store.getters["auth/fullName"]
            }
          ]
        };
      }

      console.log("data", JSON.stringify(data, null, 2));
      try {
        const response = await this.$store.dispatch(
          "credits/confirmationCredit",
          data
        );
        console.log("response", JSON.stringify(response, null, 2));

        if (response) {
          const sleep = ms => {
            return new Promise(resolve => setTimeout(resolve, ms))
          }

          await sleep(3000)
          
          setTimeout(() => {
            this.$store.commit(
              "credits/setMessage", 
              {
                message,
                code: 1
              }
            );
            this.$router.go(-1);
          }, 500)
          
          this.$store.commit("credits/removeTask", this.$route.query.taskId);
          this.$router.go(-1);
          // window.location.href = 'work/credit/applications'
        }

        this.loader = false;
      } catch (error) {
        this.loader = false;
        setTimeout(() => {
          this.$store.commit(
            "credits/setMessage",
            {
              message: CommonUtils.filterServerError(error),
              code: 0
            }
          );
        }, 500)
        
        this.$router.go(-1);
        // this.$router.push("/work/credit");
      }
    },

    toggleCreditBlock(event) {
      event.classList.toggle("closeBlock");
      event.nextSibling.classList.toggle("close");
    },

    async showFile(id) {
      try {
        const file = await this.$store.dispatch("credits/getFile", id);
        //console.log('file', file)
        this.$refs.modalView.style.display = "block";
        this.$refs.pdfviewer.setAttribute(
          "height",
          document.body.clientHeight - 150
        );

        if (file) {
          this.$refs.pdfviewer.setAttribute("src", file.url);
          // printJS(url);
          window.URL.revokeObjectURL(file);
        }
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          {
            message: CommonUtils.filterServerError(error),
            code: 0
          }
        );
      }
    },

    closeModal() {
      this.$refs.modalView.style.display = "none";
    },

    getDistrict(region, district) {
      // console.log(region, district)
      // return {region, district}
      if (district) {
        const regionId = this.dictionaries.Region.items.find(
          i => i.value == region
        ).region_id;

        return this.dictionaries.Districts.items[0][regionId].items.find(
          i => i.value == district
        ).label;
      }
    },

    // async getDataINPS() {
    //   this.bankLoading = true;
    //   let data = {
    //     input: [
    //       {
    //         name: "passSerial",
    //         data: this.Customer.Document.Series
    //       },
    //       {
    //         name: "passNumber",
    //         data: this.Customer.Document.Number
    //       },
    //       {
    //         name: "pin",
    //         data: this.Customer.PINPP
    //       },
    //       {
    //         name: "application_id",
    //         data: this.profile.preapprove_num
    //       },
    //       {
    //         name: "from",
    //         data: "getData"
    //       }
    //     ]
    //   };

    //   try {
    //     this.dataINPS = await this.$store.dispatch("profile/dataINPS", data);
    //     if (this.dataINPS.code == "0") {
              // const INPSItems = this.dataINPS.wages.items.map(i => {
              //   return {
              //     period: CommonUtils.dateFilter(i.period),
              //     send_date: i.send_date,
              //     inn: i.inn,
              //     total_invoices: {
              //       balance: i.total_invoices.balance,
              //       percent: i.total_invoices.percent,
              //       full: i.total_invoices.full
              //     },
              //     org_addres: i.org_addres,
              //     org_name: i.org_name
              //   };
              // });

              // this.dataINPS.wages.items = INPSItems;

              // this.dateTransformINPS()
    //     } else {
    //       data = {
    //         input: [
    //           {
    //             name: "application_id",
    //             data: this.profile.preapprove_num
    //             // data: '00450.null.1.2020.124'
    //           },
    //           {
    //             name: "from",
    //             data: "viewData"
    //           }
    //         ]
    //       };
    //       this.dataINPS = await this.$store.dispatch("profile/dataINPS", data);
    //     }

    //     this.bankLoading = false;
    //     this.INPSBar = true;
    //   } catch (error) {
    //     this.$store.commit(
    //       "credits/setMessage",
    //       CommonUtils.filterServerError(error)
    //     );
    //     this.loader = false;
    //     this.bankLoading = false;
    //   }
    // },

    async getDataINPS() {
      this.bankLoading = true;
      const data = {
        input: [
          {
            name: "application_id",
            data: this.preapprove_num
            // data: '00450.null.1.2020.124'
          },
          {
            name: "from",
            data: "viewData"
          }
        ]
      };
      console.log(JSON.stringify(data, null, 2))

      try {
        
        this.dataINPS = await this.$store.dispatch("profile/viewDataINPS", data);
        console.log('dataINPS', this.dataINPS)
        
        this.bankLoading = false;
        this.INPSBar = true;
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          {
            message: CommonUtils.filterServerError(error),
            code: 0
          }
        );
        this.loader = false;
        this.bankLoading = false;
      }
    },

    handleScroll(event) {
      let scrollTop = event.target.scrollTop;
      if (scrollTop > 200) {
        document.querySelector(".navMenu").classList.add("topNavMenu");
      } else {
        document.querySelector(".navMenu").classList.remove("topNavMenu");
      }

      document.querySelectorAll(".navMenu a").forEach(node => {
        let selector = node.getAttribute("href");
        let blockTop = document.querySelector(selector).offsetTop - 150;
        let blockBottom =
          document.querySelector(selector).offsetTop +
          document.querySelector(selector).getBoundingClientRect().height;

        // console.log('scrollTop', scrollTop, selector)
        // console.log('blockTop', blockTop)
        // console.log('blockBottom', blockBottom)

        if (scrollTop >= blockTop && scrollTop <= blockBottom) {
          document
            .querySelector(".navMenu a.active")
            .classList.remove("active");
          node.classList.add("active");
        }
      });
    },

    goToBlock(event) {
      event.preventDefault();
      console.log(event.target);
      let link = event.target.getAttribute("href");
      document
        .querySelector(link)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  
  },
  components: {
    appLoader: Loader,
    appLoaderFullScreen: LoaderFullScreen,
    appGetDataINPS: GetDataINPS,
    appClientInfo: ClientInfo
  },
  filters: {
    formatDate,
    formatNumber
  }
};
</script>

<style lang="scss">
.taskBlock {
  background: #ffffff;
  padding-bottom: 170px;
  .infoBlock {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 10px 0;
    padding: 10px 0;
    // border-top: 1px solid #0054a6;
    // border-bottom: 1px solid #0054a6;
  }

  .creditInfo {
    font-size: 20px;
    color: #2A3C63;
  }

  .titleCredit {
    margin: 0px;
    font-size: 24px;
    font-weight: 600;
    color: #333333;
  }

  .titleForm {
    cursor: pointer;
    margin: 10px 0 0 0;
    padding: 5px 0 5px 30px;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    background: #2A3C63;
    overflow: hidden;
    border-radius: 5px;

    &:after {
      content: "";
      float: right;
      border: 1px solid #ffffff;
      border-width: 0 3px 3px 0;
      margin: 13px 20px 13px;
      padding: 4px;
      transform: rotate(45deg);
      border-radius: 2px;
    }
  }

  .closeBlock {
    &:after {
      content: "";
      float: right;
      border: 1px solid #ffffff;
      border-width: 0 3px 3px 0;
      margin: 13px 20px 13px;
      padding: 4px;
      transform: rotate(-135deg);
      border-radius: 2px;
    }
  }

  .formBlock {
    font-size: 16px;
    padding: 30px;
    margin-top: -5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .rowForm {
    display: flex;
    align-items: center;
    margin: 8px 0 4px 0;

    .field {
      color: #A0A5BA;
      padding: 0 5px 0 0;
    }

    .add {
      padding-left: 30px;
    }

    .data {
      display: flex;
      min-height: 45px;
      justify-content: space-between;
      align-items: center;
      color: #2A3C63;
      padding: 10px 20px;
      border: 1px solid #E7E7E7;
      border-radius: 5px;
      background: #FAFAFA;
    }
  }

  .subTitleForm {
    height: 20px;
    margin: 20px 0;
  }

  .titleValue {
    padding: 6px 8px;
    color: #000000;
    background: #F5F6FA;
    border-radius: 5px;
    font-size: 16px;
  }

  .q-btn--rectangle {
    margin-top: 20px;
    padding: 2px 0;
    border-radius: 0;
  }

  .showFile {
    margin: 0;
    padding: 0;
    background: #ffffff !important;
    color: #333333 !important;
    border: 1px solid #C4C4C4;
    box-sizing: border-box;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
  }

  .close {
    display: none;
  }

  .btn-decision {
    justify-content: center;
  }

  .modalView {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    // overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

    button {
      float: right;
    }
  }

  .btnBlock {
    display: flex;
    justify-content: center;
  }
  .btnGet {
      background: #4AB8FF !important;
      border-radius: 2px;
      font-weight: bold;
    }

  .btnSucces, .btnFailure, .btnRework {
    min-width: 222px;
    padding: 6px 14px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
  }

  .btnSucces {
    background: #47B881;   
  }

  .btnFailure{
    background: #FF4A4A;
  }

  .btnRework {
    background: #4AB8FF;
  }

  .navMenuBlock {
    position: relative;
    
    .navMenu {
      position: fixed;
      width: 23%;
      list-style: none;
      padding: 0;
      // margin: 0;

      li {
        margin-bottom: 5px;
      }

      li a {
        display: block;
        text-decoration: none;
        color: #999a9b;
        padding: 5px 10px;
        border-radius: 5px;
      }

      li a.active {
        color: #1976d2;
        background: #e6f1fc;
      }
    }
  }

  .topNavMenu {
    top: 0px;
    // transition: top 1s ease-out 0.5s;
  }
}



.failureCreditForm {
  // width: 600px;

  .q-field__control:after {
    border-radius: 5px!important;
  }

  .q-field--square .q-field__control {
    border-radius: 5px!important;
  }

  .separate {
    width: auto;
    height: 1px;
    background: #F2F2F2;
    margin: 0 30px 20px 30px;
  }

  .titleFailureCredit {
    font-size: 24px;
    font-weight: 600;
    color: #384966;
    padding: 15px 48px;
  }

  .failureCreditForm {
    padding: 0 30px 40px 30px;
  }

  .btnBlock {
    width: 100%;
    display: flex;
    justify-content: center;

    .btnCancel, .btnOk {
      min-width: 186px;
      min-height: 50px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
      border-radius: 2px;
      margin: 0 10px;
    }
  }
}
</style>
