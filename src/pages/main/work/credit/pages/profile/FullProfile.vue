<template>
  <q-dialog v-model="confirmCredit" persistent>
    <q-card class="fullProfileBlock">
      <q-card-section class="row item-center justify-center">
        <div id="form">
          <div class="fullProfilePrint">
            <h4 class="fullFormTitle">Анкета-заявления</h4>
            <div class="row">
              <div class="col-3">Номер анкеты</div>
              <div class="col-9">{{ profile.applicationNumber }}</div>
              <div class="col-12 profileTitle">1. Персональные данные</div>
              <div class="col-2 fieldData">Фамилия</div>
              <div class="col-2">{{ Customer.LastName }}</div>
              <div class="col-2 fieldData">Имя</div>
              <div class="col-2">{{ Customer.FirstName }}</div>
              <div class="col-2 fieldData">Отчество</div>
              <div class="col-2">{{ Customer.MiddleName }}</div>

              <div class="col-2 fieldData">Дата рождения</div>
              <div class="col-2">{{ Customer.BirthDate }}</div>

              <div class="col-2 fieldData">Страна рождения</div>
              <div class="col-2">
                {{
                  dictionaries.Countries.items.find(
                    i => i.value == Customer.Country
                  ).label
                }}
              </div>
              <div class="col-2 fieldData">Место рождения</div>
              <div class="col-2">{{ Customer.BirthCity }}</div>

              <div class="col-2 fieldData">ИНН</div>
              <div class="col-4">{{ Customer.INN }}</div>
              <div class="col-2 fieldData">ПИНФЛ</div>
              <div class="col-4">{{ Customer.PINPP }}</div>

              <div class="col-2 fieldData">Пол</div>
              <div class="col-4">
                {{
                  dictionaries.Gender.items.find(
                    i => i.value == Customer.Gender
                  ).label
                }}
                <!-- {{getLabelDic()}} -->
              </div>
              <div class="col-2 fieldData">Резидентсво</div>
              <div class="col-4">
                {{
                  credits.options.confirmation.find(
                    i => i.value == Customer.ResidentFlag
                  ).label
                }}
              </div>

              <div class="col-12 profileTitle">2. Данные о документе</div>
              <div class="col-3 fieldData">Вид документа</div>
              <div class="col-9">
                {{
                  dictionaries.DocumentType.items.find(
                    i => i.value == Customer.Document.documentType
                  ).label
                }}
              </div>

              <template  v-if="Customer.Document.documentType == 7"> 
                <div class="col-3 fieldData">Наименование документа</div>
                <div class="col-9">
                  {{ Customer.Document.DocumentName }}
                </div>
              </template>

              <div class="col-3 fieldData">Серия</div>
              <div class="col-3">{{ Customer.Document.Series }}</div>
              <div class="col-3 fieldData">Номер</div>
              <div class="col-3">{{ Customer.Document.Number }}</div>

              <div class="col-3 fieldData">Дата выдачи</div>
              <div class="col-3">{{ Customer.Document.GivenDate }}</div>
              <div class="col-3 fieldData">Дата окончания действия документа</div>
              <div class="col-3">{{ Customer.Document.ExpirationDate }}</div>

              <div class="col-3 fieldData">Регион / область выдачи документа</div>
              <div class="col-3">
                {{
                  dictionaries.Region.items.find(
                    i => i.value == Customer.Document.Region
                  ).label
                }}
              </div>

              <div class="col-3 fieldData">Кем выдан документ (ИИБ)</div>
              <div class="col-3">
                {{
                  getDistrict(Customer.Document.Region, Customer.Document.GivenPlace)
                }}
              </div>

              <div class="col-3 fieldData">Номер карты</div>
              <div class="col-3">
                {{ Customer.CardNumber }}
              </div>

              <div class="col-3 fieldData">Номер карты поручителя</div>
              <div class="col-3">
                {{ Customer.BankInps }}
              </div>

              <div class="col-12 profileTitle fieldData">3. Контактная информация</div>

              <div class="col-12 dataList">
                <div
                  class="row"
                  v-for="(phone, index) of Customer.PhoneList.items"
                  :key="phone.Number"
                >
                  <div class="col-3 fieldData">Телефон {{ index + 1 }}</div>
                  <div class="col-9">{{ phone.Number }}</div>
                </div>
              </div>

              <div class="col-3 fieldData">e-mail адрес</div>
              <div class="col-9">{{ Customer.Email }}</div>

              <div class="col-12 profileTitle">4. Образование</div>
              <div class="col-3 fieldData">Степень Образования</div>
              <div class="col-9">
                {{
                  dictionaries.Graduation.items.find(
                    i => i.value == Customer.Education
                  ).label
                }}
              </div>

              <div class="col-12 profileTitle">5. Адреса</div>
              <div class="col-12 dataList">
                <div
                  v-for="(address, index) of Customer.AddressList.items"
                  :key="address.AddressType"
                  class="row"
                >
                  <div class="col-12 profileSubTitle">
                    {{ "5." + (index + 1) }}
                    <!-- {{ profile.AddressType[address.AddressType - 1] }} -->
                    {{ address.AddressType }}
                  </div>
                  <!-- <div class="col-3">Индекс</div>
                  <div class="col-9">{{ address.PostalCode }}</div> -->
                  <div class="col-3 fieldData">Регион / область</div>
                  <div class="col-3">
                    {{
                      dictionaries.Region.items.find(
                        i => i.value == address.Region
                      ).label
                    }}
                  </div>
                  
                  <!-- <div class="col-3">Город</div>
                  <div class="col-9">{{ address.City }}</div> -->

                  <div class="col-3 fieldData">Район</div>
                  <div class="col-3">
                    {{
                      getDistrict(address.Region, address.District)
                    }}
                  </div>

                  <div class="col-3 fieldData">Улица / мкр.</div>
                  <div class="col-3">{{ address.Street }}</div>
                  <div class="col-3 fieldData">Номер дома</div>
                  <div class="col-3">{{ address.House }}</div>
                  <div class="col-3 fieldData">Квартира</div>
                  <div class="col-3">{{ address.Apartment }}</div>
                  <div class="col-3 fieldData">Вид владения</div>
                  <div class="col-3">
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

              <div class="col-12 profileTitle">6 Семейное положение</div>
              <div class="col-3 fieldData">Семейное положение</div>
              <div class="col-3">
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
              <div class="col-3 fieldData">Количество детей</div>
              <div class="col-3">{{ Customer.UnderAgeChildrenNum }}</div>

              <div class="col-12 profileTitle">
                7 Родственники (обязательно указать данные супруга/супруги)
              </div>
              <div class="col-12 dataList">
                <div
                  class="row"
                  v-for="(relative, index) of Customer.Relatives.items"
                  :key="'Relatives' + index"
                >
                  <div class="col-12 profileSubTitle">
                    Родственник {{ index + 1 }}
                  </div>
                  <div class="col-3 fieldData">Тип родственной связи</div>
                  <div class="col-9">
                    {{
                      dictionaries.FamilyRelation.items.find(
                        i => i.value == relative.FamilyConnectionType
                      ).label
                    }}
                  </div>
                  <div class="col-2 fieldData">Фамилия</div>
                  <div class="col-2">{{ relative.LastName }}</div>
                  <div class="col-2 fieldData">Имя</div>
                  <div class="col-2">{{ relative.FirstName }}</div>
                  <div class="col-2 fieldData">Отчество</div>
                  <div class="col-2">{{ relative.MiddleName }}</div>

                  <div class="col-3 fieldData">Дата рождения</div>
                  <div class="col-3">{{ relative.BirthDate }}</div>
                  <!-- <div class="col-3">ИНН</div>
                <div class="col-9">{{relative.inn}}</div> -->
                  <div class="col-3 fieldData">Вид документа</div>
                  <div class="col-3">
                     {{
                        dictionaries.DocumentType.items.find(
                          i => i.value == relative.Document.documentType
                        ).label
                      }}
                  </div>

                  <template  v-if="relative.Document.documentType == 7"> 
                    <div class="col-6 fieldData">Наименование документа</div>
                    <div class="col-6">
                      {{ relative.Document.DocumentName }}
                    </div>
                  </template>

                  <div class="col-3 fieldData">Серия</div>
                  <div class="col-3">{{ relative.Document.Series }}</div>
                  <div class="col-3 fieldData">Номер</div>
                  <div class="col-3">{{ relative.Document.Number }}</div>
                  <div class="col-3 fieldData">Дата выдачи</div>
                  <div class="col-3">{{ relative.Document.GivenDate }}</div>
                  <div class="col-3 fieldData">Дата окончания действия</div>
                  <div class="col-3">
                    {{ relative.Document.ExpirationDate }}
                  </div>

                  <div class="col-3 fieldData">Регион / область выдачи документа</div>
                  <div class="col-3">
                    {{
                      dictionaries.Region.items.find(
                        i => i.value == relative.Document.Region
                      ).label
                    }}
                  </div>

                  <div class="col-3 fieldData">Кем выдан документ (ИИБ)</div>
                  <div class="col-3">
                    {{
                      getDistrict(relative.Document.Region, relative.Document.GivenPlace)
                    }}
                  </div>  
                </div>
              </div>

              <!-- Поменять структуру -->

              <div class="col-12 profileTitle">
                8 Сведения по основной работе
              </div>
              <!-- <div class="col-3">8.1 Вид деятельности</div>
            <div class="col-9"></div> -->

              <template v-if="Customer.JobInfo.type == 1">
                <div class="col-12 profileSubTitle">
                  8.1 {{ dictionaries.MainWorkType.items[0].label }}
                </div>
                <div class="col-3 fieldData">Наименование работодателя</div>
                <div class="col-3">{{ Customer.JobInfo.employerName }}</div>
                <div class="col-3 fieldData">ИНН работодателя</div>
                <div class="col-3">{{ Customer.JobInfo.INN }}</div>
                <div class="col-3 fieldData">Вид деятельности организации</div>
                <div class="col-3">
                  {{
                    dictionaries.BusinessType.items.find(
                      i => i.value == Customer.JobInfo.employerActivityType
                    ).label
                  }}
                </div>
                <!-- <div class="col-3">Должность</div>
                <div class="col-9">{{ Customer.JobInfo.position }}</div> -->
                <div class="col-3 fieldData">Количество работников в организации</div>
                <div class="col-3">
                  {{ 
                    dictionaries.employeesNum.items.find(
                      i => i.value == Customer.JobInfo.employeesNum
                    ).label
                  }}
                </div>
                <div class="col-3 fieldData">
                  Стаж на последнем месте работы в месяцах
                </div>
                <div class="col-3">
                  {{
                    dictionaries.jobPeriods.items.find(
                      i => i.value == Customer.JobInfo.lastJobExperienceMonths
                    ).label
                  }}
                </div>
                <div class="col-3 fieldData">Общий трудовой стаж в месяцах</div>
                <div class="col-3">
                  {{
                    dictionaries.jobPeriods.items.find(
                      i => i.value == Customer.JobInfo.totalJobExperienceMonths
                    ).label
                  }}
                </div>
              </template>

              <template
                v-else-if="
                  Customer.JobInfo.type == 2 || Customer.JobInfo.type == 3
                "
              >
                <div class="col-12 profileSubTitle">
                  <template v-if="Customer.JobInfo.type == 2">
                    8.1 {{ dictionaries.MainWorkType.items[1].label }}
                  </template>
                  <template v-else>
                    8.1 {{ dictionaries.MainWorkType.items[2].label }}
                  </template>
                </div>
                <div class="col-3 fieldData">Вид деятельности организации</div>
                <div class="col-3">
                  {{
                    dictionaries.BusinessType.items.find(
                      i => i.value == Customer.JobInfo.employerActivityType
                    ).label
                  }}
                </div>
                <div class="col-3 fieldData">Срок деятельности</div>
                <div class="col-3">
                  {{
                    dictionaries.jobPeriods.items.find(
                      i => i.value == Customer.JobInfo.activeYears
                    ).label
                  }}
                </div>
              </template>

              <div v-else class="col-12 profileSubTitle">
                8.1 {{ dictionaries.MainWorkType.items[3].label }}
              </div>

              <div class="col-12 profileTitle">
                9 Сведения о ежемесячных доходах/расходах
              </div>
              <div class="col-9 fieldData">Подтвержденный ежемесячный доход</div>
              <div class="col-3">
                {{ Customer.MonthlyIncome.confirmMonthlyIncome | formatNumber }}
              </div>
              <div class="col-9 fieldData">
                Периодические расходы (доля расходов на налоги, содержание
                семьи, оплата аренды, образование, алименты и др.)
              </div>
              <div class="col-3">
                {{ Customer.MonthlyExpenses.recurringExpenses | formatNumber }}
              </div>
              <div class="col-9 fieldData">
                Плата за облуживание других обязательств (погашение кредитов в
                банках, фин. организациях и др.)
              </div>
              <div class="col-3">
                {{ Customer.MonthlyExpenses.obligations | formatNumber }}
              </div>
              <div class="col-9 fieldData">Наличие дополнительного дохода</div>
              <div class="col-3">
                <template
                  v-if="
                    credits.options.confirmation.find(
                      i =>
                        i.value == Customer.MonthlyIncome.hasAdditionalIncome
                    )
                  "
                >
                  {{
                    credits.options.confirmation.find(
                      i =>
                        i.value == Customer.MonthlyIncome.hasAdditionalIncome
                    ).label
                  }}
                </template>
              </div>
              <div class="col-9 fieldData">Размер дополнительного дохода</div>
              <div class="col-3">
                {{ Customer.MonthlyIncome.additionalIncome.sum | formatNumber }}
              </div>
              <div class="col-9 fieldData">
                Источник дополнительного дохода (появляются при наличии доп.
                дохода)
              </div>
              <div class="col-3">
                <template
                  v-if="
                    dictionaries.additionalIncomeSource.items.find(
                      i =>
                        i.value == Customer.MonthlyIncome.additionalIncome.incomeType
                    )
                  "
                >
                  {{
                    dictionaries.additionalIncomeSource.items.find(
                      i =>
                        i.value == Customer.MonthlyIncome.additionalIncome.incomeType
                    ).label
                  }}
                </template>
              </div>

              <div class="col-12 profileTitle">10 Сведения об имуществе</div>
              <div class="col-12 profileSubTitle">10.1 Недвижимость</div>

              <div class="col-12 dataList">
                <div
                  class="row"
                  v-for="(property, index) of Customer.PropertyInformation
                    .Realty_new.items"
                  :key="'Realty_new' + index"
                >
                  <div class="col-12 profileSubTitle">
                    Недвижимость {{ index + 1 }}
                  </div>
                  <div class="col-3 fieldData">Вид недвижимости</div>
                  <div class="col-3">
                    {{
                      dictionaries.PropertyType.items.find(
                        i => i.value == property.PropertyType
                      ).label
                    }}
                  </div>
                  <div class="col-3 fieldData">Регион / область</div>
                  <div class="col-3">
                    {{
                      dictionaries.Region.items.find(
                        i => i.value == property.Region
                      ).label
                    }}
                  </div>
                  <div class="col-3 fieldData">Рыночная стоимость</div>
                  <div class="col-9">{{ property.MarketValue }}</div>
                </div>
              </div>

              <div class="col-12 profileSubTitle">
                10.2 Транспортное средства
              </div>

              <div class="col-12 dataList">
                <div
                  class="row"
                  v-for="(vehicle, index) of Customer.PropertyInformation
                    .Transport_new.items"
                  :key="'Transport_new' + index"
                >
                  <div class="col-12 profileSubTitle">
                    Транспорт {{ index + 1 }}
                  </div>
                  <div class="col-3 fieldData">Вид транспортного средства</div>
                  <div class="col-3">
                    {{
                      dictionaries.VehicleType.items.find(
                        i => i.value == vehicle.VehicleType
                      ).label
                    }}
                  </div>
                  <div class="col-3 fieldData">Марка транспортного средства</div>
                  <div class="col-3">{{ vehicle.transportBrand }}</div>
                  <div class="col-3 fieldData">Год выпуска</div>
                  <div class="col-3">{{ vehicle.yearOfRelease }}</div>
                  <div class="col-3 fieldData">Рыночная стоимость</div>
                  <div class="col-3">{{ vehicle.marketValue }}</div>
                </div>
              </div> 

              <div class="col-12 profileTitle">
                11 Поручительство и страхование
              </div>
              <!-- <div class="col-12 profileSubTitle">11.1 Поручительство</div>
            <div class="col-3">Вид поручителя</div>
            <div class="col-9"></div> -->

              <template v-if="fullProfile.Guarantee.RelatedPerson.items.length">
                <div class="col-12 dataList">
                  <div
                    v-for="(guarantee, index) of fullProfile.Guarantee
                      .RelatedPerson.items"
                    :key="'RelatedPerson' + index"
                    class="row"
                  >
                    <div class="col-12 profileSubTitle">
                      Физ. лицо {{ index + 1 }}
                    </div>
                    <!-- <div class="col-3">Отношение к клиенту</div>
                    <div class="col-9">
                      {{
                        dictionaries.ClientRelationType.items.find(
                          i => i.value == guarantee.ClientRelation
                        ).label
                      }}
                    </div> -->
                    <div class="col-2 fieldData">Фамилия</div>
                    <div class="col-2">{{ guarantee.LastName }}</div>
                    <div class="col-2 fieldData">Имя</div>
                    <div class="col-2">{{ guarantee.FirstName }}</div>
                    <div class="col-2 fieldData">Отчество</div>
                    <div class="col-2">{{ guarantee.MiddleName }}</div>

                    <div class="col-2 fieldData">Тип родственной связи</div>
                    <div class="col-2">
                      {{
                        dictionaries.ClientRelationType.items.find(
                          i => i.value == guarantee.ClientRelation
                        ).label
                      }}
                    </div>
                    <div class="col-2 fieldData">Дата рождения</div>
                    <div class="col-2">{{ guarantee.BirthDate }}</div>
                    <div class="col-2 fieldData">ИНН</div>
                    <div class="col-2">{{ guarantee.INN }}</div>
                    <div class="col-2 fieldData">ПИНФЛ</div>
                    <div class="col-2">{{ guarantee.PINPP }}</div>
                    <div class="col-2 fieldData">Резиденство</div>
                    <div class="col-6">
                      <template v-if="credits.options.confirmation.find(
                          i => i.value == guarantee.Resident
                        )">
                        {{
                          credits.options.confirmation.find(
                            i => i.value == guarantee.Resident
                          ).label
                        }}
                    </template>
                      
                    </div>

                    <div class="col-12 dataBlock">Данные о документе:</div>

                    <div class="col-2 fieldData">Вид документа</div>
                    <div class="col-2">
                      {{
                          dictionaries.DocumentType.items.find(
                            i => i.value == guarantee.Document.documentType
                          ).label
                        }}
                    </div>

                    <template  v-if="guarantee.Document.documentType == 7"> 
                      <div class="col-2 fieldData">Наименование документа</div>
                      <div class="col-2">
                        {{ guarantee.Document.DocumentName }}
                      </div>
                    </template>

                    <div class="col-2 fieldData">Серия</div>
                    <div class="col-2">{{ guarantee.Document.Series }}</div>
                    <div class="col-2 fieldData">Номер</div>
                    <div class="col-2">{{ guarantee.Document.Number }}</div>
                    <div class="col-2 fieldData">Дата выдачи</div>
                    <div class="col-2">{{ guarantee.Document.GivenDate }}</div>
                    <div class="col-2 fieldData">Дата окончания действия</div>
                    <div class="col-2">
                      {{ guarantee.Document.ExpirationDate }}
                    </div>
                
                    <div class="col-2 fieldData">Регион / область выдачи документа</div>
                    <div class="col-2">
                      {{
                        dictionaries.Region.items.find(
                          i => i.value == guarantee.Document.Region
                        ).label
                      }}
                    </div>

                    <div class="col-2 fieldData">Кем выдан документ (ИИБ)</div>
                    <div class="col-10">
                      {{
                        getDistrict(guarantee.Document.Region, guarantee.Document.GivenPlace)
                      }}
                    </div>

                    <div class="col-3 fieldData">Номер карты</div>
                    <div class="col-3">
                      {{ guarantee.CardNumber }}
                    </div>

                    <div class="col-3 fieldData">Номер карты поручителя</div>
                    <div class="col-3">
                      {{ guarantee.BankInps }}
                    </div>

                    <div class="col-12 dataBlock">Адрес:</div>
                    <!-- <div class="col-3">Индекс</div>
                    <div class="col-9">{{ guarantee.Address.PostalCode }}</div> -->
                    <div class="col-2 fieldData">Регион/область</div>
                    <div class="col-2">
                      {{
                        dictionaries.Region.items.find(
                          i => i.value == guarantee.Address.Region
                        ).label
                      }}
                    </div>
                    <!-- <div class="col-3">Город</div>
                    <div class="col-9">{{ guarantee.Address.City }}</div> -->
                    
                    <div class="col-2 fieldData">Район</div>
                    <div class="col-2">
                      {{ getDistrict(guarantee.Address.Region, guarantee.Address.District) }}
                    </div>
                    <div class="col-2 fieldData">Улица / мкр.</div>
                    <div class="col-2">{{ guarantee.Address.Street }}</div>
                    <div class="col-2 fieldData">Номер дома</div>
                    <div class="col-2">{{ guarantee.Address.House }}</div>
                    <div class="col-2 fieldData">Квартира</div>
                    <div class="col-2">{{ guarantee.Address.Apartment }}</div>
                    <div class="col-2 fieldData">Сумма поручительства</div>
                    <div class="col-2">{{ guarantee.Sum }}</div>

                    <div class="col-12 dataBlock">Контактная информация:</div>
                    <div class="col-12 dataList">
                      <div
                        class="row"
                        v-for="(phone, phoneIndex) of guarantee.PhoneList.items"
                        :key="phone.Number"
                      >
                        <div class="col-3 fieldData">Телефон {{ phoneIndex + 1 }}</div>
                        <div class="col-9">{{ phone.Number }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <template v-if="fullProfile.Guarantee.RelatedLegalPerson.items.length">
                <div class="col-12 dataList">
                  <div
                    class="row"
                    v-for="(guarantee, index) of fullProfile.Guarantee
                      .RelatedLegalPerson.items"
                    :key="'RelatedLegalPerson' + index"
                  >
                    <div class="col-12 profileSubTitle">
                      Юр. лицо {{ index + 1 }}
                    </div>
                    <div class="col-2 fieldData">Фамилия</div>
                    <div class="col-2">{{ guarantee.CEOLastName }}</div>
                    <div class="col-2 fieldData">Имя</div>
                    <div class="col-2">{{ guarantee.CEOFirstName }}</div>
                    <div class="col-2 fieldData">Отчество</div>
                    <div class="col-2">{{ guarantee.CEOMiddleName }}</div>

                    <div class="col-4 fieldData">Наименование организации</div>
                    <div class="col-8">{{ guarantee.Name }}</div>
                    <div class="col-12 dataBlock">Адрес:</div>
                    <!-- <div class="col-3">Индекс</div>
                    <div class="col-9">{{ guarantee.Address.PostalCode }}</div> -->
                    <div class="col-3 fieldData">Регион/ область</div>
                    <div class="col-3">
                      {{
                        dictionaries.Region.items.find(
                          i => i.value == guarantee.Address.Region
                        ).label
                      }}
                    </div>
                    <!-- <div class="col-3">Город</div>
                    <div class="col-9">{{ guarantee.Address.City }}</div> -->
                    <div class="col-3 fieldData">Район</div>
                    <div class="col-3">
                      {{ getDistrict(guarantee.Address.Region, guarantee.Address.District) }}
                    </div>
                    <div class="col-3 fieldData">Улица / мкр.</div>
                    <div class="col-3">{{ guarantee.Address.Street }}</div>
                    <div class="col-3 fieldData">Номер дома</div>
                    <div class="col-3">{{ guarantee.Address.House }}</div>
                    <div class="col-3 fieldData">Сумма поручительства</div>
                    <div class="col-9">{{ guarantee.Sum }}</div>

                    <div class="col-12 dataBlock">Контактная информация:</div>
                    <div class="col-12 dataList">
                      <div
                        class="row"
                        v-for="(phone, phoneIndex) of guarantee.PhoneList.items"
                        :key="phone.Number"
                      >
                        <div class="col-3 fieldData">Телефон {{ phoneIndex + 1 }}</div>
                        <div class="col-9">{{ phone.Number }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <template v-if="fullProfile.Guarantee.Insurance.items.length">
                <div class="col-12 dataList">
                  <div
                    class="row"
                    v-for="(guarantee, index) of fullProfile.Guarantee
                      .Insurance.items"
                    :key="'Insurance' + index"
                  >
                    <div class="col-12 profileSubTitle">
                      Страхование {{ index + 1 }}
                    </div>
                    <div class="col-3 fieldData">Наименование организации</div>
                    <div class="col-3">
                       <!-- {{
                        dictionaries.Insurance_company.items.find(
                          i => i.value == guarantee.OrgName
                        ).label
                      }} -->
                      {{ guarantee.OrgName }}
                      </div>
                    <div class="col-3 fieldData">ИНН страховой компании</div>
                    <div class="col-3">{{ guarantee.INN }}</div>
                    <div class="col-3 fieldData">Сумма страхового полиса</div>
                    <div class="col-3">{{ guarantee.Sum }}</div>
                    <div class="col-3 fieldData">Номер страхового договора</div>
                    <div class="col-3">{{ guarantee.ContractNumber }}</div>
                    <div class="col-3 fieldData">Дата начала действия договора</div>
                    <div class="col-3">{{ guarantee.StartDate }}</div>
                    <div class="col-3 fieldData">Дата истечения действия договора</div>
                    <div class="col-3">{{ guarantee.ExpDate }}</div>
                  </div>
                </div>
              </template>

              <div class="col-12 profileTitle">
                12. Сведения о запрашиваемом кредите
              </div>
              <!-- <div class="col-3">Вид кредита</div>
              <div class="col-9"></div> -->
              <div class="col-3 fieldData">Кредитный продукт</div>
              <div class="col-3">
                {{
                  dictionaries.LoanProduct.items.find(
                    i => i.value == fullProfile.LoanInfo.LoanProduct
                  ).label
                }}
              </div>
              <div class="col-3 fieldData">Запрашиваемая сумма кредита</div>
              <div class="col-3">{{ fullProfile.LoanInfo.Sum }}</div>
              <div class="col-3 fieldData">Валюта</div>
              <div class="col-3">{{ fullProfile.LoanInfo.Currency }}</div>

              <template v-if="!!fullProfile.LoanInfo.LoanProduct && fullProfile.LoanInfo.LoanProduct !== 3">
              <div class="col-3 fieldData">Тип графика гашения</div>
              <div class="col-3">

                <template
                 v-if="dictionaries.PaymentsType.items.find(
                    i => i.value == fullProfile.LoanInfo.RepaymentType
                  )" 
                >
                {{
                  dictionaries.PaymentsType.items.find(
                    i => i.value == fullProfile.LoanInfo.RepaymentType
                  ).label
                }}
                </template>
              </div>
              </template>


              <div class="col-3 fieldData">Процентная ставка</div>
              <div class="col-3">{{ fullProfile.LoanInfo.MaxInterestRate }}</div>

              <template v-if="!!fullProfile.LoanInfo.LoanProduct">
                <div class="col-3 fieldData">Льготный период по погашению кредита (число месяцев)</div>
                <div class="col-3">
                  {{ fullProfile.LoanInfo.MaxDefferalRepaymentPeriod }}
                </div>
                </template>
              

                <div class="col-3 fieldData">Срок кредита в мес</div>
                <div class="col-3">{{ fullProfile.LoanInfo.TermInMonth }}</div>

                <!-- <div class="col-3">Максимальное количество месяцев на кредит</div>
                <div class="col-9">{{ fullProfile.LoanInfo.MaxTermInMonths }}</div>

                <div class="col-3">Минимальное количество месяцев на кредит</div>
                <div class="col-9">{{ fullProfile.LoanInfo.MinTermInMonths }}</div> -->

                <div class="col-3 fieldData">Удобный день погашения</div>
                <div class="col-3">{{ fullProfile.LoanInfo.ConvenientRepaymentTerm }}</div>

                <div class="col-3 fieldData">Первоначальный взнос</div>
                <div class="col-3">{{ fullProfile.LoanInfo.InitialPayment }}</div>

                <!-- <div class="col-3">Процент первоначального взноса (максимальный)</div>
                <div class="col-9">{{ fullProfile.LoanInfo.MaxInitialPaymentPercent }}</div>

                <div class="col-3">Процент первоначального взноса (минимальный)</div>
                <div class="col-9">{{ fullProfile.LoanInfo.MinInitialPaymentPercent }}</div> -->

                <div class="col-3 fieldData">Цель кредитования</div>
                <div class="col-3">
                  {{
                    dictionaries.LoanPurpose.items.find(
                      i => i.value == fullProfile.LoanInfo.LoanPurpose
                    ).label
                  }}
                </div>

                <div class="col-3 fieldData">Источник финансирования</div>
                <div class="col-9">
                  {{
                    dictionaries.FinancialSources.items.find(
                      i => i.value == fullProfile.LoanInfo.FundingSource
                    ).label
                  }}
                </div>

                <template v-if="fullProfile.LoanInfo.LoanProduct == 1 || fullProfile.LoanInfo.LoanProduct == 2">
                  <div class="col-3 fieldData">Наименование продавца/производителя товара/работы/услуги</div>
                  <div class="col-3">{{ fullProfile.LoanInfo.consumerLoan.nameProduction }}</div>

                  <div class="col-3 fieldData">Наименование товара/работы/услуги</div>
                  <div class="col-3">{{ fullProfile.LoanInfo.consumerLoan.nameService }}</div>

                  <div class="col-3 fieldData">
                    Наименование банка продавца/производителя товара/работы/услуги
                  </div>
                  <div class="col-3">{{ fullProfile.LoanInfo.consumerLoan.nameBankProd }}</div>

                  <div class="col-3 fieldData">Расчетный счет продавца/производителя товара/работы/услуги</div>
                  <div class="col-3">{{ fullProfile.LoanInfo.consumerLoan.billProd }}</div>

                  <div class="col-3 fieldData">Номер договора с продавцом/поставщиком  товара/работы/услуги</div>
                  <div class="col-3">{{ fullProfile.LoanInfo.consumerLoan.agreementNumber }}</div>

                  <div class="col-3">Дата договора с продавцом/поставщиком товара/работы/услуги</div>
                  <div class="col-3">{{ fullProfile.LoanInfo.consumerLoan.agreementDate }}</div>
                </template>
             
              <!-- <div class="col-12 profileTitle">13. Вложенные документы</div>

              <div class="col-12 dataList" v-if="fullProfile.AttachedDocuments.items.length">
                  <div
                    class="row"
                    v-for="(document, index) of fullProfile.AttachedDocuments.items"
                    :key="document.id"
                  >
                    <div class="col-3">Наименование документа {{index + 1}}</div>
                    <div class="col-9">{{document.DocumentName}}</div>
                    <div class="col-3">Скан документа</div>
                    <div class="col-9"></div>
                  </div>
              </div> -->

            </div>

            <div class="agreementList">
              <h6 class="fullFormTitle">
                Подписав настоящую анкету, я принимаю и соглашаюсь с тем, что:
              </h6>
              <ol>
                <li>Предоставил в Банк Анкету-заявление на получение кредита;</li>
                <li>
                  Информация, предоставленная мной Банку в связи с кредитованием
                  (в том числе в Анкете-заявлении), является полной, точной и
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
                  Издержки, пошлины и накладные расходы, связанные с
                  предоставлением кредита, несет Заемщик;
                </li>
                <li>
                  Принятие Акционерным обществом «Национальный Банк
                  Внешнеэкономический деятельности Республики Узбекистан»
                  (далее-Банк) к рассмотрению настоящей Анкеты-Заявления не
                  означает возникновения у Банка обязательства по предоставлению
                  банковского займа;
                </li>
                <li>
                  Банк оставляет за собой право не мотивировать причины отказа;
                </li>
                <li>
                  В случае принятия отрицательного решения Банк не обязан
                  возвращать мне настоящую Анкету-заявление;
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
          </div>

          <div class="row q-col-gutter-md signature">
            <div class="col-8">
              <p class="bor">{{ Customer.LastName }} {{ Customer.FirstName }} {{ Customer.MiddleName }}</p>
              <p>Полностью Фамилия, Имя, Отчество</p>
            </div>
            <div class="col-4">
              <p class="bor">&nbsp</p>
              <p>Подпись, дата</p>
            </div>
          </div>

          <div class="serviceInfo">
            <h6 class="fullFormTitle">Служебная информация</h6>
            <div class="row">
              <div class="col-6">
                Филиал / Подразделение
              </div>
              <div class="col-6">{{ fullProfile.BranchName }}</div>
              <!-- <div class="col-6">{{ bankName }}</div> -->
              <div class="col-6">
                ФИО работника банка, принявшего заявление
              </div>
              <div class="col-6">{{ fullProfile.ClientManagerName }}</div>
              <div class="col-6">
                Должность кредитного специалиста
              </div>
              <div class="col-6">{{ profile.userrole }}</div>
              <div class="col-6">
                Подпись работника банка
              </div>
              <div class="col-6">_____________________</div>
              <div class="col-6">
                Дата
              </div>
              <div class="col-6">
                {{currentDate}}
              </div>
            </div>
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
        <q-btn
          flat
          label="Закрыть"
          color="primary"
          v-close-popup
          @click="() => (profile.confirmCredit = false)"
        />
        <!-- <q-btn flat label="Закрыть" color="primary" @click="() => this.$router.push('/work/credit/sub/task/1')" /> -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from  "vuex"
import printJS from "print-js"
import formatNumber from "../../filters/format_number.js";

export default {
  props: ["currentDate"],
  data() {
    return {
      confirmCredit: true,
      bankName: ''
    };
  },
  created() {
    // const bankInfo = this.dictionaries.Branches.items.find(i => i.id === this.fullProfile.Branch)
    // if (bankInfo){
    //   this.bankName = bankInfo.bank_name
    // }
    // this.bankName = this.dictionaries.Branches.items.find(i => i.id === "00890").bank_name
    // console.log('bankName', this.bankName)
  },
  computed: {
    ...mapState({
        fullProfile: state => state.profile.fullFormProfile,
        profile: state => state.profile,
        Customer: state => state.profile.fullFormProfile.Customer,
        dictionaries: state => state.profile.dictionaries,
        credits: state => state.credits
      })
  },
  methods: {
    callPrint(strid) {
      const head = document.querySelector("head");
      const prtContent = document.getElementById(strid);
      
      const WinPrint = window.open(
        "",
        "",
        `left=${document.documentElement.clientWidth/2 - 400},
        top=0,
        width=800,
        height=640,
        toolbar=0,
        scrollbars=1,
        status=0`
      );

      //WinPrint.document.write("<html><head><title>Полная анкета</title>");
      WinPrint.document.write("<html>");
      WinPrint.document.write(head.innerHTML);
      WinPrint.document.write("<body>");
      // WinPrint.document.write('<div id="print" class="contentpane">');
      WinPrint.document.write(prtContent.innerHTML);
      // WinPrint.document.write("</div>");
      WinPrint.document.write("</body></html>");
      WinPrint.document.close();
      WinPrint.focus();
      setTimeout(function(){
          WinPrint.print();
          WinPrint.close();
      }, 500);
    },

    // getLabelDic() {
    //   const item = dictionaries.Gender.items.find(i => i.value === Customer.Gender)
    //   if (item) {
    //     return item.label
    //   }
    // }
    getDistrict(region, district) {
      if (district) {
        const regionId = this.dictionaries.Region.items.find(
          i => i.value == region
        ).region_id

        return this.dictionaries.Districts.items[0][regionId].items.find(
          i => i.value == district
        ).label
      }
    }
  },
  filters: {
    formatNumber
  }
};
</script>

<style lang="scss">
@page {
  size: A4;
  margin: 20px;
}
@media print {
  html, body {
    margin: 0 auto;
    width: 190mm;
    height: 297mm;
  }
  /* ... the rest of the rules ... */
}

.fullProfileBlock {
  max-width: 70%!important;
}

.fullProfilePrint {
  .fieldData {
    background: rgb(221, 221, 221);
    font-weight: bold;
  }

  font-size: 12px;
  // .q-dialog__inner--minimized > div {
  //   max-width: 50%;
  // }

  // .fullFormTitle {
  //   margin: 20px 0;
  //   line-height: 25px;
  // }

  .row .col-12.dataList {
    padding: 0;
    border: none;
  }

  .row > div {
    border: 1px solid #ccc;
    margin-top: -1px;
  }

  .row > .col-3 {
    // border-right: none;
  }

  .row > .col-9 {
    display: flex;
    align-items: center;
  }

  .row > div:not(.profileTitle) {
    padding: 0px 10px;
  }

  .profileTitle {
    text-align: center;
    background-color: #ededed;
    color: #0e3475;
    // padding: 3px;
    font-size: 14px;
  }

  .profileSubTitle {
    background: #ededed;
    color: #0e3475;
  }

  .profileSubSubTitle {
    color: #0e3475;
  }

  .dataBlock {
    background: #ededed;
  }
}

.signature {
  width: 100%;
  margin-top: 10px;
  font-size: 12px;

  .bor {
    margin-bottom: 5px;
  }

  .bor::after {
    content: " ";
    display: block;
    height: 1px;
    width: 90%;
    background: #ccc;
  }
}

.fullFormTitle {
  font-size: 14px;
  margin: 10px 0 0 0;
  line-height: 25px;
  font-weight: 600;
}

.agreementList, .serviceInfo {
  font-size: 8px;
}

.serviceInfo {
  font-size: 12px;
}
</style>
