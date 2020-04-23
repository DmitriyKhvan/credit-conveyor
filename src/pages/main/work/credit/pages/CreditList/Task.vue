<template>
  <div class="q-pa-md">
    <!-- Header credit -->
    <div class="row infoBlock">
      <div class="infoBlockItem">
        <h6 class="titleCredit">Дата</h6>
        <span class="creditInfo">{{ date }}</span>
      </div>

      <div class="infoBlockItem">
        <h6 class="titleCredit">Номер протокола</h6>
        <span class="creditInfo">{{ protocolNumber }}</span>
      </div>

      <div class="infoBlockItem">
        <h6 class="titleCredit">Номер заявления</h6>
        <span class="creditInfo">{{ applicationNumber }}</span>
      </div>
    </div>

    <!-- Form credit -->
    <div class="row q-col-gutter-md">
      <!-- Первая колонка -->
      <div class="col-md-6 col-sm-12">
        <h4 class="titleForm">Личные данные клиента</h4>

        <div class="formBlock">
          <div class="row rowForm">
            <div class="col-2 field">Фамилия</div>
            <div class="col-10 data">{{ Customer.LastName }}</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">Имя</div>
            <div class="col-10 data">{{ Customer.FirstName }}</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">Отчество</div>
            <div class="col-10 data">{{ Customer.MiddleName }}</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">Дата рождения</div>
            <div class="col-10 data">{{ Customer.BirthDate }}</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">Пол</div>
            <div class="col-4 data">
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
            <div class="col-2 field">Резидентство</div>
            <div class="col-4 data">
              <template
                v-if="
                  profile.options.confirmation.find(
                    i => i.value == Customer.ResidentFlag
                  )
                "
              >
                {{
                  profile.options.confirmation.find(
                    i => i.value == Customer.ResidentFlag
                  ).label
                }}
              </template>
            </div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">Серия паспорта</div>
            <div class="col-2 data">{{ Customer.Document.Series }}</div>
            <div class="col-5 field">Номер паспорта</div>
            <div class="col-3 data">{{ Customer.Document.Number }}</div>
          </div>

          <div class="row rowForm">
            <div class="col-2"></div>
            <div class="col-2 field">Дата выдачи</div>
            <div class="col-3 data">{{ Customer.Document.GivenDate }}</div>
            <div class="col-2 field">Дата окончания</div>
            <div class="col-3 data">{{ Customer.Document.ExpirationDate }}</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">ИНН</div>
            <div class="col-10 data">{{ Customer.INN }}</div>
          </div>

          <div class="row rowForm">
            <div class="col-2 field">ПНФЛ</div>
            <div class="col-10 data">{{ Customer.PINPP }}</div>
          </div>
          <div class="row rowForm">
            <div class="col-4 field">Степень Образования</div>
            <div class="col-8 data">
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
        </div>

        <!-- Контакты -->
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
              <span class="titleValue">{{
                profile.AddressType[address.AddressType - 1]
              }}</span>
            </h5>

            <div class="row rowForm">
              <div class="col-4 field">Регион / область</div>
              <div class="col-8 data" colspan="6">
                {{
                  dictionaries.Region.items.find(i => i.value == address.Region)
                    .label
                }}
              </div>
            </div>
            <div class="row rowForm">
              <div class="col-4 field">Город / район</div>
              <div class="col-8 data" colspan="6">{{ address.City }}</div>
            </div>
            <div class="row rowForm">
              <div class="col-4 field">Улица / микрорайон</div>
              <div class="col-8 data" colspan="6">{{ address.Street }}</div>
            </div>

            <div class="row rowForm">
              <div class="col-4 field">Номер дома</div>
              <div class="col-1 data">{{ address.House }}</div>
              <div class="col-2 field">Корпус</div>
              <div class="col-1 data">{{ address.Block }}</div>
              <div class="col-3 field">Номер квартиры</div>
              <div class="col-1 data">{{ address.Apartment }}</div>
            </div>

            <div class="row rowForm">
              <div class="col-4 field">Вид владения</div>
              <div class="col-8 data">
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

        <!-- Родственники -->
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
            <div class="col-3 field">Количество детей</div>
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
              <div class="col-2 field">Отношение к клиенту</div>
              <div class="col-10 data">
                {{
                  dictionaries.FamilyRelation.items.find(
                    i => i.value == relative.FamilyConnectionType
                  ).label
                }}
              </div>
            </div>

            <div class="row rowForm">
              <div class="col-2 field">Фамилия</div>
              <div class="col-10 data">{{ relative.LastName }}</div>
            </div>

            <div class="row rowForm">
              <div class="col-2 field">Имя</div>
              <div class="col-10 data">{{ relative.FirstName }}</div>
            </div>

            <div class="row rowForm">
              <div class="col-2 field">Отчество</div>
              <div class="col-10 data">{{ relative.MiddleName }}</div>
            </div>

            <div class="row rowForm">
              <div class="col-2 field">Дата рождения</div>
              <div class="col-10 data">{{ relative.BirthDate }}</div>
            </div>

            <div class="row rowForm">
              <div class="col-2 field">Серия паспорта</div>
              <div class="col-1 data">{{ relative.Document.Series }}</div>
              <div class="col-2 field">Номер паспорта</div>
              <div class="col-2 data">{{ relative.Document.Number }}</div>
            </div>

            <div class="row rowForm">
              <div class="col-2 field"></div>
              <div class="col-2 field">Дата выдачи</div>
              <div class="col-2 data">{{ relative.Document.GivenDate }}</div>
              <div class="col-2 field">Дата окончания</div>
              <div class="col-2 data">
                {{ relative.Document.ExpirationDate }}
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

      <!-- Вторая колонка  -->
      <div class="col-md-6 col-sm-12">
        <h4 class="titleForm">
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
              <div class="col-6 data">{{ Customer.JobInfo.employerName }}</div>
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

            <div class="row rowForm">
              <div class="col-6 field">Должность</div>
              <div class="col-6 data">{{ Customer.JobInfo.position }}</div>
            </div>

            <div class="row rowForm">
              <div class="col-6 field">Количество работников в организации</div>
              <div class="col-6 data">{{ Customer.JobInfo.employeesNum }}</div>
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
            <div class="col-6 field">Подвержденный ежемесячный доход</div>
            <div class="col-6 data">
              {{ Customer.MonthlyIncome.confirmMonthlyIncome }}
            </div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Периодические расходы</div>
            <div class="col-6 data">
              {{ Customer.MonthlyExpenses.recurringExpenses }}
            </div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Наличие дополнительного дохода</div>
            <div class="col-6 data">
              <template
                v-if="
                  profile.options.confirmation.find(
                    i => i.value == Customer.MonthlyIncome.hasAdditionalIncome
                  )
                "
              >
                {{
                  profile.options.confirmation.find(
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
              {{ Customer.MonthlyExpenses.obligations }}
            </div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Размер дополнительного дохода</div>
            <div class="col-6 data">
              {{ Customer.MonthlyIncome.additionalIncome.sum }}
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
        </div>

        <h4 class="titleForm">Сведения об имуществе</h4>
        <div class="formBlock">
          <div
            v-for="(property, index) of Customer.PropertyInformation.Realty_new
              .items"
            :key="'Realty_new' + index"
          >
            <h5 class="subTitleForm">
              <span class="titleValue">Недвижимость {{ index + 1 }}</span>
            </h5>

            <div class="row rowForm">
              <div class="col-3 field">Вид недвижимости</div>
              <div class="col-9 data">
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
              <div class="col-2 field">Регион / область</div>
              <div class="col-10 data">
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
              <div class="col-2 field">Рыночная стоимость</div>
              <div class="col-10 data">{{ property.MarketValue }}</div>
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
              <div class="col-3 field">Вид транспортного средства</div>
              <div class="col-9 data">
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
              <div class="col-2 field">Марка транспортного средства</div>
              <div class="col-10 data">
                {{ vehicle.transportBrand }}
              </div>
            </div>

            <div class="row rowForm">
              <div class="col-2 field">Год выпуска</div>
              <div class="col-10 data">{{ vehicle.yearOfRelease }}</div>
            </div>

            <div class="row rowForm">
              <div class="col-2 field">Рыночная стоимость</div>
              <div class="col-10 data">{{ vehicle.marketValue }}</div>
            </div>
          </div>
        </div>

        <h4 class="titleForm">Гарантии и поручительства</h4>
        <div class="formBlock">
          <template v-if="fullProfile.Guarantee.RelatedPerson.items">
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
                  {{
                    profile.options.confirmation.find(
                      i => i.value == guarantee.Resident
                    ).label
                  }}
                </div>
              </div>
              <div class="row rowForm">
                <div class="col-12 field">Паспортные данные:</div>
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
                <div class="col-6 data">{{ guarantee.Document.GivenDate }}</div>
              </div>
              <div class="row rowForm">
                <div class="col-6 field">Дата окончания</div>
                <div class="col-6 data">
                  {{ guarantee.Document.ExpirationDate }}
                </div>
              </div>

              <div class="row rowForm">
                <div class="col-12 field">Адрес:</div>
              </div>

              <div class="row rowForm">
                <div class="col-6 field">Индекс</div>
                <div class="col-6 data">{{ guarantee.Address.PostalCode }}</div>
              </div>
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
                <div class="col-6 data">{{ guarantee.Address.District }}</div>
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
                <div class="col-6 data">{{ guarantee.Address.Apartment }}</div>
              </div>
              <div class="row rowForm">
                <div class="col-6 field">Сумма поручительства</div>
                <div class="col-6 data">{{ guarantee.Sum }}</div>
              </div>

              <div class="row rowForm">
                <div class="col-12 field">Контактная информация:</div>
              </div>

              <div
                class="row rowForm"
                v-for="(phone, phoneIndex) of guarantee.PhoneList"
                :key="phone.Number"
              >
                <div class="col-6 field">Телефон {{ phoneIndex + 1 }}</div>
                <div class="col-6 data">{{ phone.Number }}</div>
              </div>
            </div>
          </template>

          <template v-if="fullProfile.Guarantee.RelatedLegalPerson.items">
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
                <div class="col-6 field">Наименование организации</div>
                <div class="col-6 data">{{ guarantee.Name }}</div>
              </div>
              <div class="row rowForm">
                <div class="col-12 field">Адрес:</div>
              </div>

              <div class="row rowForm">
                <div class="col-6 field">Индекс</div>
                <div class="col-6 data">{{ guarantee.Address.PostalCode }}</div>
              </div>
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
                <div class="col-6 data">{{ guarantee.Address.District }}</div>
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
                <div class="col-6 data">{{ guarantee.Sum }}</div>
              </div>

              <div class="row rowForm">
                <div class="col-12 field">Контактная информация:</div>
              </div>

              <div
                class="row rowForm"
                v-for="(phone, phoneIndex) of guarantee.PhoneList"
                :key="phone.Number"
              >
                <div class="col-6 field">Телефон {{ phoneIndex + 1 }}</div>
                <div class="col-6 data">{{ phone.Number }}</div>
              </div>
            </div>
          </template>

          <template v-if="fullProfile.Guarantee.Insurance.items">
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
                <div class="col-6 data">{{ guarantee.OrgName }}</div>
              </div>

              <div class="row rowForm">
                <div class="col-6 field">ИНН страховой компании</div>
                <div class="col-6 data">{{ guarantee.INN }}</div>
              </div>
              <div class="row rowForm">
                <div class="col-6 field">Сумма страхового полиса</div>
                <div class="col-6 data">{{ guarantee.Sum }}</div>
              </div>
            </div>
          </template>
        </div>

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
            <div class="col-6 data">{{ fullProfile.LoanInfo.Sum }}</div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Валюта</div>
            <div class="col-6 data">{{ fullProfile.LoanInfo.Currency }}</div>
          </div>

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

          <div class="row rowForm">
            <div class="col-6 field">
              Процентная ставка по кредиту (максимальная)
            </div>
            <div class="col-6 data">
              {{ fullProfile.LoanInfo.MaxInterestRate }}
            </div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">
              Процентная ставка по кредиту (минимальная)
            </div>
            <div class="col-6 data">
              {{ fullProfile.LoanInfo.MinInterestRate }}
            </div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Льготный период по погашению кредита</div>
            <div class="col-6 data">{{ fullProfile.LoanInfo.MaxDefferalRepaymentPeriod }}</div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Удобный срок погашения в мес</div>
            <div class="col-6 data">
              {{ fullProfile.LoanInfo.ConvenientRepaymentTerm }}
            </div>
          </div>

          <div class="row rowForm">
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
          </div>

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
            <div class="col-6 field">Наименование продавца</div>
            <div class="col-6 data">{{ fullProfile.LoanInfo.SellerName }}</div>
          </div>

          <div class="row rowForm">
            <div class="col-6 field">Наименование товара/работы/услуги</div>
            <div class="col-6 data">{{ fullProfile.LoanInfo.ProductName }}</div>
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
        </div>

        <h4 class="titleForm">Документы</h4>
        <div class="formBlock">
          <template v-if="fullProfile.AttachedDocuments.items">
            <div 
                v-for="(document, index) of fullProfile.AttachedDocuments.items"
                :key="document.id"
              >
              <div class="row rowForm">
                <div class="col-3 field">Наименование документа {{index + 1}}</div>
                <div class="col-9 data">{{document.DocumentName}}</div>
              </div>

              <div class="row rowForm">
                <div class="col-3 field">Скан документа</div>
                <div class="col-9 data"></div>
              </div>
            </div>
          </template>

          <div v-else class="col-12 field">Приложение документа отсутсвтует</div>
        </div>

        <h4 class="titleForm">Коментарии</h4>
        <div class="formBlock">
          <div class="row rowForm">
            <template v-if="fullProfile.ApplicationComment.items">
              <div
                class="col-12 field"
                v-for="comment of fullProfile.ApplicationComment.items"
                :key="comment.id"
              >
                {{ comment.Comment }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-3 "></div>
      <div class="col-3">
        <q-btn
          color="green"
          label="Одобрить"
          class="q-ml-md full-width"
          @click="creditSuccess"
        />
      </div>
      <div class="col-3">
        <q-btn
          color="red"
          label="Отклонить"
          class="q-ml-md full-width"
          @click="creditFailure"
        />
      </div>
      <div class="col-3"></div>
    </div>

    <q-dialog v-model="confirm" persistent>
      <q-card class="failureCredit">
        <!-- <q-card-section class="row titleFailureCredit">
          <span class="q-ml-sm">Выберите причину отказа</span>
        </q-card-section> -->
        <q-card-section class="row titleFailureCredit">
          <span class="q-ml-sm">Введите причину отказа</span>
        </q-card-section>
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
            <div style="max-width: 100%">
              <q-input
                ref="comment"
                square
                outlined
                dense
                v-model="comment"
                label="Комментарий"
                type="textarea"
                lazy-rules
                :rules="[val => !!val || 'Напишите комментарий']"
                class="q-pb-sm"
              />
            </div>
          </div>

          <div class="col-6">
            <q-btn
              class="btnFailureCredit full-width"
              label="Отмена"
              color="red"
              v-close-popup
              @click="() => comment=''"
            />
          </div>
          <div class="col-6">
            <q-btn
              class="btnFailureCredit full-width"
              type="submit"
              label="Отправить"
              color="green"
            />
          </div>
        </form>
      </q-card>
    </q-dialog>

  </div>
</template>
<script>
import { validItems, validFilter } from "../../filters/valid_filter";

export default {
  data() {
    return {
      userRole: this.$store.getters.userRole,
      confirm: false,
      reason: "",
      comment: "",
      options: {
        reason: ["причина 1", "причина 2", "причина 3", "другое"]
      }
    };
  },
  async created() {
    console.log('userRole', this.$store.getters.userRole)
    if (!this.$store.getters.userRole) {
      await this.$store.dispatch("setHeaderRole", sessionStorage.getItem("userRole"))
      await this.$store.dispatch("setHeaderBPM", sessionStorage.getItem("csrf_token"))
      this.$store.commit("setTaskId", sessionStorage.getItem("taskId"));
   }

    console.log("taskId", this.$route.params["id"]);
    // console.log("taskId", this.$route.query.taskId);
  //  this.$store.commit("setTaskId", this.$route.params["id"]);
    this.$store.commit("setTaskId", this.$route.query.taskId);
    try {
      const res = await this.$store.dispatch("getFullForm");
      console.log('res', res)
    } catch (error) {}
  },
  mounted() {
    const creditTitles = document.querySelectorAll(".titleForm");
    for (let title of creditTitles) {
      title.addEventListener("click", () => this.toggleCreditBlock(title));
    }
  },
  computed: {
    date() {
      return this.$route.query.date;
    },
    applicationNumber() {
      return this.$route.query.applicationNumber;
    },
    protocolNumber() {
      return this.$route.query.protocolNumber;
    },
    profile() {
      return this.$store.state.profile;
    },
    fullProfile() {
      return this.$store.getters.fullForm;
    },
    Customer() {
      return this.$store.state.profile.fullFormProfile.Customer;
    },
    dictionaries() {
      return this.$store.state.profile.dictionaries;
    },
    // role() {
    //   return;
    // }
  },
  methods: {
    creditFailure() {
      this.confirm = true;
    },

    async creditSuccess() {

      if (this.userRole == "BackOfficee") {
        this.fullProfile.BOLogin = this.$store.getters["auth/username"]
        this.fullProfile.BODecision = true // кредит одобрен 
        delete this.fullProfile.ApplicationComment.items[0].CommentDate
      } else if (this.userRole == "CreditCommitteeMember	") {
        const comment = {
            Comment: "",
            MemberOfCCFIO: "",
            id: null,
            Login: this.$store.getters["auth/username"],
            isApproved: true
          }

          this.$store.commit("addComment", {commentBlock: "CreditCommiteeDecisions", comment})
      }

      const data = {
        output: [
          {
            name: "application",
            data: this.fullProfile
          }
        ]
      };

      console.log('Что отправил', JSON.stringify(data, null, 2))
      debugger
      try {
        debugger
        const res = await this.$store.dispatch("confirmationCredit", data);
        console.log("response", JSON.stringify(res, null, 2));
        debugger
        if (res.nextTask.id) {
          sessionStorage.removeItem("csrf_token");
          this.$router.push("/work/credit");
        } else {
          throw 'Next task id is undefined'
        }
      } catch (error) {}
    },

    toggleCreditBlock(event) {
      event.classList.toggle("closeBlock");
      event.nextSibling.classList.toggle("close");
    },

    async submitHandler(event) {
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
      if (this.$refs.comment.hasError) {
        this.formHasError = true;
      } else {
        console.log("creditFailure");
        debugger
        
        if (this.userRole == "BackOfficee") {

          this.fullProfile.BOLogin = this.$store.getters["auth/username"]
          this.fullProfile.BODecision = false // кредит отклонен

          const comment = {
                  Comment: this.comment,
                  Type: "",
                  CommentPerson: this.$store.getters["auth/username"],
                  id: null,
                  //CommentDate: ""
                }

          this.$store.commit("addComment", {commentBlock: "ApplicationComment", comment})

        } else if (this.userRole == "CreditCommitteeMember	") {
          const comment = {
            Comment: this.comment,
            MemberOfCCFIO: "",
            id: null,
            Login: this.$store.getters["auth/username"],
            isApproved: false
          }

          this.$store.commit("addComment", {commentBlock: "CreditCommiteeDecisions", comment})
        }
        
        const data = {
        output: [
            {
              name: "application",
              data: this.fullProfile
            }
          ]
        };

        console.log(JSON.stringify(data, null, 2))

        try {
          const res = await this.$store.dispatch("confirmationCredit", data);
          console.log('resCreditFailure', res)
          if (res.nextTask.id) {
            debugger
            sessionStorage.removeItem("csrf_token");
            this.$router.push("/work/credit");
          } else {
            throw 'Next task id is undefined'
          }
        } catch (error) {}
        this.confirm = false;
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
