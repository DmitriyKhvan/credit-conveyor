<template>
  <div class="fullProfile">
    <appLoader v-if="loaderForm" />
    <div v-else class="q-pa-md">
      <form @submit.prevent.stop="onSubmit">
        <!-- Private data person -->
        <div class="privatData">
          <h4
            class="tab-title"
            ref="privatData"
            @click="toggleForm('privatData')"
          >
            Личные данные клиента
          </h4>
          <div class="tab-content" ref="tabContent">
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  ref="surname"
                  square
                  outlined
                  v-model="Customer.LastName"
                  dense
                  label="Фамилия"
                  lazy-rules
                  :rules="[val => !!val || 'Введите фамилию']"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="name"
                  square
                  outlined
                  v-model="Customer.FirstName"
                  dense
                  label="Имя"
                  lazy-rules
                  :rules="[val => !!val || 'Введите имя']"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="mname"
                  square
                  outlined
                  v-model="Customer.MiddleName"
                  dense
                  label="Отчество"
                  lazy-rules
                  :rules="[val => !!val || 'Введите отчество']"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  ref="birthday"
                  outlined
                  square
                  dense
                  label="Дата рождения"
                  v-model="Customer.BirthDate"
                  mask="##.##.####"
                  :rules="[
                    val => (val && val.length === 10) || 'Введите дату рождения'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                        ref="qDateBirthday"
                      >
                        <q-date
                          mask="DD.MM.YYYY"
                          v-model="Customer.BirthDate"
                          @input="() => $refs.qDateBirthday.hide()"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  ref="inn"
                  square
                  outlined
                  v-model="Customer.INN"
                  dense
                  label="ИНН"
                  mask="#########"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length === 9) ||
                      'Количество цифр должно быть 9'
                  ]"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="pinpp"
                  square
                  outlined
                  v-model="Customer.PINPP"
                  dense
                  label="ПИНФЛ"
                  mask="##############"
                  lazy-rules
                  :rules="[val => (val && val.length === 14) || 'Введите ПНФЛ']"
                />
              </div>
              <div class="col-4">
                <q-select
                  ref="sex"
                  square
                  outlined
                  v-model="Customer.Gender"
                  :options="dictionaries.Gender.items"
                  dense
                  label="Пол"
                  lazy-rules
                  :rules="[val => !!val || 'Выберите пол']"
                  emit-value
                  map-options
                  class="q-pb-sm"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-select
                  square
                  outlined
                  v-model="Customer.ResidentFlag"
                  :options="fullProfile.options.confirmation"
                  dense
                  label="Резидентство"
                  emit-value
                  map-options
                  class="q-pb-sm"
                />
              </div>

              <div class="col-4">
                <q-input
                  ref="pasportSeries"
                  square
                  outlined
                  v-model="Customer.Document.Series"
                  dense
                  label="Серия паспорта"
                  mask="AA"
                  :rules="[
                    val => (val && val.length === 2) || 'Введите Серию паспорта'
                  ]"
                />
              </div>

              <div class="col-4">
                <q-input
                  ref="pasportNumber"
                  square
                  outlined
                  v-model="Customer.Document.Number"
                  dense
                  label="Номер паспорта"
                  mask="#######"
                  lazy-rules
                  :rules="[
                    val => (val && val.length === 7) || 'Введите Номер паспорта'
                  ]"
                />
              </div>
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  ref="pasportDateStart"
                  outlined
                  square
                  dense
                  label="Дата выдачи паспорта"
                  v-model="Customer.Document.GivenDate"
                  mask="##.##.####"
                  :rules="[
                    val =>
                      (val && val.length === 10) ||
                      'Введите дату выдачи паспорта'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                        ref="qDatePasportDateStart"
                      >
                        <q-date
                          mask="DD.MM.YYYY"
                          v-model="Customer.Document.GivenDate"
                          @input="() => $refs.qDatePasportDateStart.hide()"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-4">
                <q-input
                  ref="pasportDateFinish"
                  outlined
                  square
                  dense
                  label="Дата окончания действия паспорта"
                  v-model="Customer.Document.ExpirationDate"
                  mask="##.##.####"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length === 10) ||
                      'Введите дату окончания действия паспорта'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                        ref="qDatePasportDateFinish"
                      >
                        <q-date
                          mask="DD.MM.YYYY"
                          v-model="Customer.Document.ExpirationDate"
                          @input="() => $refs.qDatePasportDateFinish.hide()"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-4">
                <q-select
                  ref="education"
                  square
                  outlined
                  v-model="Customer.Education"
                  :options="dictionaries.Graduation.items"
                  dense
                  label="Образование"
                  :rules="[val => !!val || 'Выберите образование']"
                  emit-value
                  map-options
                  class="q-pb-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Contacts info -->
        <div class="contactData">
          <h4
            class="tab-title"
            ref="contactData"
            @click="toggleForm('contactData')"
          >
            Контактные данные
          </h4>
          <div class="tab-content" ref="tabContent">
            <fieldset
              class="fieldset_block"
              v-for="(phone, index) of Customer.PhoneList"
              :key="'PhoneList' + index"
            >
              <legend class="legend_title">Телефон {{ index + 1 }}</legend>
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="phones"
                    square
                    outlined
                    v-model="phone.Number"
                    dense
                    label="Тел. номер"
                    mask="+############"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length === 13) || 'Введите номер телефона'
                    ]"
                  />
                </div>
              </div>

              <q-btn
                v-if="index > 0"
                color="red"
                label="Удалить"
                @click="
                  confirmDeleteItem(
                    'Телефон ' + (index + 1),
                    removeItem,
                    'PhoneList',
                    index
                  )
                "
                class="removeItem"
              ></q-btn>
            </fieldset>

            <q-btn
              color="primary"
              label="Добавить номер телефона"
              @click="addPhone"
              class="addItem"
            ></q-btn>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  square
                  outlined
                  v-model.lazy="Customer.Email"
                  dense
                  label="Email"
                  error-message="Ведите корректный Email"
                  :error="!isValid"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Address -->
        <div class="address">
          <h4 class="tab-title" ref="address" @click="toggleForm('address')">
            Адреса клиента
          </h4>
          <div class="tab-content" ref="tabContent">
            <fieldset
              v-for="(address, index) of Customer.AddressList"
              :key="address.AddressType"
              class="fieldset_block"
            >
              <legend class="legend_title">
                {{ fullProfile.AddressType[address.AddressType - 1] }}
              </legend>

              <div class="tab-content" ref="tabContent">
                <!-- <div
                  v-if="address.AddressType === 2"
                  class="row q-col-gutter-md"
                >
                  <div class="col-4">
                    <q-select
                      square
                      outlined
                      v-model="sameRegistration"
                      :options="fullProfile.options.confirmation"
                      dense
                      label="Совпадает ли с адресом постоянной регистрации"
                      emit-value
                      map-options
                      class="q-pb-sm"
                    />
                  </div>
                </div> -->

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="address.PostalCode"
                      dense
                      label="Индекс"
                      mask="######"
                    />
                  </div>

                  <div class="col-4">
                    <q-select
                      ref="region"
                      square
                      outlined
                      v-model="address.Region"
                      :options="dictionaries.Region.items"
                      dense
                      label="Регион/область"
                      :rules="[val => !!val || 'Выберите регион/область']"
                      emit-value
                      map-options
                      class="q-pb-sm"
                    />
                  </div>

                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="address.City"
                      dense
                      label="Город"
                    />
                  </div>
                </div>

                <div class="row  q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="address.District"
                      dense
                      label="Район"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      ref="street"
                      square
                      outlined
                      v-model="address.Street"
                      dense
                      label="Улица / Мкр."
                      lazy-rules
                      :rules="[
                        val => !!val || 'Введите наименование улицы / мкр.'
                      ]"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      ref="houseNumber"
                      square
                      outlined
                      v-model="address.House"
                      dense
                      label="Номер дома"
                      lazy-rules
                      :rules="[val => !!val || 'Введите номер дома']"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="address.Block"
                      dense
                      label="Корпус"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="address.Building"
                      dense
                      label="Строение"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="address.Apartment"
                      dense
                      label="Номер квартиры"
                    />
                  </div>
                  <div class="col-4">
                    <q-select
                      square
                      outlined
                      v-model="address.OwnershipType"
                      :options="dictionaries.PropertyType.items"
                      dense
                      label="Вид владения"
                      :rules="[val => !!val || 'Выберите вид владения']"
                      emit-value
                      map-options
                      class="q-pb-sm"
                    />
                  </div>
                </div>
              </div>

              <q-btn
                v-if="address.AddressType === 2 || address.AddressType === 3"
                color="red"
                label="Удалить"
                @click="
                  confirmDeleteItem(
                    options.AddressType[address.AddressType - 1],
                    removeRegistration,
                    address.AddressType
                  )
                "
                class="removeItem"
              ></q-btn>
            </fieldset>

            <template
              v-if="
                Customer.AddressList.findIndex(
                  item => item.AddressType === 2
                ) === -1
              "
            >
              <h5 class="tab-content_title">
                Данные по адресу фактического проживания отсутствуют
              </h5>

              <q-btn
                color="primary"
                label="Добавить адрес фактического проживания"
                @click="addRegistration(2)"
                class="addItem"
              ></q-btn>
            </template>

            <template
              v-if="
                Customer.AddressList.findIndex(
                  item => item.AddressType === 3
                ) === -1
              "
            >
              <h5 class="tab-content_title">
                Данные по адресу временной регистрации отсутствуют
              </h5>

              <q-btn
                color="primary"
                label="Добавить адрес временной регистрации"
                @click="addRegistration(3)"
                class="addItem"
              ></q-btn>
            </template>
          </div>
        </div>

        <!-- Family status & relatives-->
        <div class="family-status tab">
          <h4
            class="tab-title"
            ref="familyStatus"
            @click="toggleForm('familyStatus')"
          >
            Родственники
          </h4>
          <div class="tab-content" ref="tabContent">
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-select
                  square
                  outlined
                  v-model="Customer.MaritalStatus"
                  :options="dictionaries.MaritalStatus.items"
                  dense
                  label="Семейное положения"
                  emit-value
                  map-options
                  class="q-pb-sm"
                />
              </div>
              <div class="col-4">
                <q-select
                  square
                  outlined
                  v-model="Customer.hasChildren"
                  :options="fullProfile.options.confirmation"
                  dense
                  label="Есть ли дети"
                  emit-value
                  map-options
                  class="q-pb-sm"
                />
              </div>
              <div class="col-4">
                <q-input
                  v-if="Customer.hasChildren"
                  square
                  outlined
                  v-model="Customer.UnderAgeChildrenNum"
                  mask="##"
                  dense
                  label="Количество детей до 18 лет"
                  class="q-pb-sm"
                />
              </div>
            </div>

            <fieldset
              class="fieldset_block"
              v-for="(relative, index) of Customer.Relatives"
              :key="'Relatives' + index"
            >
              <legend class="legend_title">Родственник {{ index + 1 }}</legend>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-select
                    ref="relatives"
                    square
                    outlined
                    v-model="relative.FamilyConnectionType"
                    :options="dictionaries.FamilyRelation.items"
                    dense
                    label="Отношение к клиенту"
                    emit-value
                    map-options
                    :rules="[val => !!val || 'Выберите родственника']"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="relatives_surname"
                    square
                    outlined
                    v-model="relative.LastName"
                    dense
                    label="Фамилия"
                    :rules="[val => !!val || 'Введите фамилию']"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="relatives_name"
                    square
                    outlined
                    v-model="relative.FirstName"
                    dense
                    label="Имя"
                    :rules="[val => !!val || 'Введите имя']"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="relatives_mname"
                    square
                    outlined
                    v-model="relative.MiddleName"
                    dense
                    label="Отчество"
                    :rules="[val => !!val || 'Введите отчество']"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="relatives_birthday"
                    outlined
                    square
                    dense
                    label="Дата рождения"
                    v-model="relative.BirthDate"
                    mask="##.##.####"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length === 10) || 'Введите дату рождения'
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                          ref="qDateRelativeBirthday"
                        >
                          <q-date
                            mask="DD.MM.YYYY"
                            v-model="relative.BirthDate"
                            @input="
                              () => $refs.qDateRelativeBirthday[index].hide()
                            "
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-4">
                  <q-input
                    ref="relatives_pasportSeries"
                    square
                    outlined
                    v-model="relative.Document.Series"
                    dense
                    label="Серия паспорта"
                    mask="AA"
                    :rules="[
                      val =>
                        (val && val.length === 2) || 'Введите Серию паспорта'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="relatives_pasportNumber"
                    square
                    outlined
                    v-model="relative.Document.Number"
                    dense
                    label="Номер паспорта"
                    mask="#######"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length === 7) || 'Введите Номер паспорта'
                    ]"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="relatives_pasportDate"
                    outlined
                    square
                    dense
                    label="Дата выдачи паспорта"
                    v-model="relative.Document.GivenDate"
                    mask="##.##.####"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length === 10) ||
                        'Введите дату выдачи паспорта'
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                          ref="qDateRelativePassportDateStart"
                        >
                          <q-date
                            mask="DD.MM.YYYY"
                            v-model="relative.Document.GivenDate"
                            @input="
                              () =>
                                $refs.qDateRelativePassportDateStart[
                                  index
                                ].hide()
                            "
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <div class="col-4">
                  <q-input
                    ref="relatives_pasportDate"
                    outlined
                    square
                    dense
                    label="Дата окончания действия паспорта"
                    v-model="relative.Document.ExpirationDate"
                    mask="##.##.####"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length === 10) ||
                        'Введите дату окончания паспорта'
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                          ref="qDateRelativePassportDateFinish"
                        >
                          <q-date
                            mask="DD.MM.YYYY"
                            v-model="relative.Document.ExpirationDate"
                            @input="
                              () =>
                                $refs.qDateRelativePassportDateFinish[
                                  index
                                ].hide()
                            "
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>

              <q-btn
                v-if="index > 0"
                color="red"
                label="Удалить"
                @click="
                  confirmDeleteItem(
                    'Родственник ' + (index + 1),
                    removeItem,
                    'Relatives',
                    index
                  )
                "
                class="removeItem"
              ></q-btn>
            </fieldset>

            <q-btn
              color="primary"
              label="Добавить родственника"
              @click="addRelative"
              class="addItem"
            ></q-btn>
          </div>
        </div>

        <!-- Information on work -->
        <div class="infoWork tab">
          <h4 class="tab-title" ref="infoWork" @click="toggleForm('infoWork')">
            Сведения по основной работе
          </h4>
          <div class="tab-content" ref="tabContent">
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-select
                  ref="kindOfActivity"
                  square
                  outlined
                  v-model="Customer.JobInfo.type"
                  :options="dictionaries.MainWorkType.items"
                  dense
                  label="Вид деятельности"
                  emit-value
                  map-options
                  :rules="[val => !!val || 'Выберите вид деятельности']"
                  class="q-pb-sm"
                />
              </div>
            </div>

            <template
              v-if="
                Customer.JobInfo.type ===
                  dictionaries.MainWorkType.items[0].value
              "
            >
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="nameOfEmployer"
                    square
                    outlined
                    v-model="Customer.JobInfo.employerName"
                    dense
                    label="Наименование работодателя"
                    lazy-rules
                    :rules="[
                      val => !!val || 'Введите наименование работодателя'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="innOfEmployer"
                    square
                    outlined
                    v-model="Customer.JobInfo.INN"
                    dense
                    label="ИНН работодателя"
                    mask="#########"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length === 9) || 'Введите ИНН работодателя'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-select
                    ref="typeOrganization"
                    square
                    outlined
                    v-model="Customer.JobInfo.employerActivityType"
                    :options="dictionaries.BusinessType.items"
                    dense
                    label="Вид деятельности организации"
                    emit-value
                    map-options
                    :rules="[
                      val => !!val || 'Выберите вид деятельности организации'
                    ]"
                    class="q-pb-sm"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-select
                    ref="amountWorkes"
                    square
                    outlined
                    v-model="Customer.JobInfo.employeesNum"
                    :options="dictionaries.employeesNum.items"
                    dense
                    label="Количество работников организации"
                    emit-value
                    map-options
                    :rules="[
                      val =>
                        !!val || 'Выберите количество работников организации'
                    ]"
                    class="q-pb-sm"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="position"
                    square
                    outlined
                    v-model="Customer.JobInfo.position"
                    dense
                    label="Должность"
                    lazy-rules
                    :rules="[val => !!val || 'Введите должность']"
                  />
                </div>
                <div class="col-4">
                  <q-select
                    ref="positionCategory"
                    square
                    outlined
                    v-model="Customer.JobInfo.positionType"
                    :options="dictionaries.PositionType.items"
                    dense
                    label="Категория занимаемой должности"
                    emit-value
                    map-options
                    :rules="[
                      val => !!val || 'Выберите категорию занимаемой должности'
                    ]"
                    class="q-pb-sm"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-select
                    ref="workExperience"
                    square
                    outlined
                    v-model="Customer.JobInfo.lastJobExperienceMonths"
                    :options="dictionaries.jobPeriods.items"
                    dense
                    label="Стаж на поледнем месте работы"
                    emit-value
                    map-options
                    :rules="[val => !!val || 'Выберите стаж работы']"
                    class="q-pb-sm"
                  />
                </div>
                <div class="col-4">
                  <q-select
                    ref="totalWorkExperience"
                    square
                    outlined
                    v-model="Customer.JobInfo.totalJobExperienceMonths"
                    :options="dictionaries.jobPeriods.items"
                    dense
                    label="Общий трудовой стаж"
                    emit-value
                    map-options
                    :rules="[val => !!val || 'Выберите общий трудовой стаж']"
                    class="q-pb-sm"
                  />
                </div>
              </div>
            </template>

            <template
              v-if="
                Customer.JobInfo.type ===
                  dictionaries.MainWorkType.items[1].value ||
                  Customer.JobInfo.type ===
                    dictionaries.MainWorkType.items[2].value
              "
            >
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-select
                    ref="typeOrganization2"
                    square
                    outlined
                    v-model="Customer.JobInfo.employerActivityType"
                    :options="dictionaries.BusinessType.items"
                    dense
                    label="Вид деятельности организации"
                    emit-value
                    map-options
                    :rules="[
                      val => !!val || 'Выберите вид деятельности организации'
                    ]"
                    class="q-pb-sm"
                  />
                </div>
                <div class="col-4">
                  <q-select
                    ref="activityPeriod"
                    square
                    outlined
                    v-model="Customer.JobInfo.activeYears"
                    :options="dictionaries.jobPeriods.items"
                    dense
                    label="Срок деятельности"
                    emit-value
                    map-options
                    :rules="[val => !!val || 'Выберите срок деятельности']"
                    class="q-pb-sm"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Expense/income -->
        <div class="expense-income tab">
          <h4
            class="tab-title"
            ref="expenseIncome"
            @click="toggleForm('expenseIncome')"
          >
            Ежемесячные расходы/доходы
          </h4>
          <div class="tab-content" ref="tabContent">
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  ref="income"
                  square
                  outlined
                  v-model.number="Customer.MonthlyIncome.confirmMonthlyIncome"
                  type="number"
                  dense
                  label="Подтвержденный ежемесячный доход"
                  lazy-rules
                  :rules="[val => !!val || 'Поля должно быт заполнено']"
                />
              </div>

              <div class="col-4">
                <q-input
                  ref="expense"
                  square
                  outlined
                  v-model.number="Customer.MonthlyExpenses.recurringExpenses"
                  type="number"
                  dense
                  label="Периодические расходы "
                  lazy-rules
                  :rules="['Поля должно быть заполнено']"
                />
              </div>

              <div class="col-4">
                <q-input
                  ref="otherExpenses"
                  square
                  outlined
                  v-model.number="Customer.MonthlyExpenses.obligations"
                  type="number"
                  dense
                  label="Плата за облуживание других обязательств"
                  lazy-rules
                  :rules="['Поля должно быт заполнено']"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-select
                  square
                  outlined
                  v-model="Customer.MonthlyIncome.hasAdditionalIncome"
                  :options="fullProfile.options.confirmation"
                  dense
                  label="Наличие дополнительного дохода"
                  emit-value
                  map-options
                  class="q-pb-sm"
                />
              </div>
              <template v-if="Customer.MonthlyIncome.hasAdditionalIncome">
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model.number="Customer.MonthlyIncome.additionalIncome.sum"
                    type="number"
                    dense
                    label="Размер дополнительного дохода"
                    class="q-pb-sm"
                  />
                </div>
                <div class="col-4">
                  <q-select
                    square
                    outlined
                    v-model="Customer.MonthlyIncome.additionalIncome.incomeType"
                    :options="dictionaries.additionalIncomeSource.items"
                    dense
                    label="Источник дополнительного дохода"
                    emit-value
                    map-options
                    class="q-pb-sm"
                  />
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- Properties -->
        <div class="properties">
          <h4
            class="tab-title"
            ref="properties"
            @click="toggleForm('properties')"
          >
            Сведения об имуществе
          </h4>
          <div class="tab-content" ref="tabContent">
            <h5
              v-if="!Customer.PropertyInformation.Realty_new.length"
              class="tab-content_title"
            >
              Данные по недвижимости отсутствуют
            </h5>
            <fieldset
              class="fieldset_block"
              v-for="(property, index) of Customer.PropertyInformation
                .Realty_new"
              :key="'Realty_new' + index"
            >
              <legend class="legend_title">Недвижимость {{ index + 1 }}</legend>
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-select
                    ref="typeProperties"
                    square
                    outlined
                    v-model="property.PropertyType"
                    :options="dictionaries.PropertyType.items"
                    dense
                    label="Вид недвижимости"
                    emit-value
                    map-options
                    :rules="[val => !!val || 'Выберите вид недвижимости']"
                    class="q-pb-sm"
                  />
                </div>
                <div class="col-4">
                  <q-select
                    ref="regionsProperties"
                    square
                    outlined
                    v-model="property.Region"
                    :options="dictionaries.Region.items"
                    dense
                    label="Регион / область"
                    emit-value
                    map-options
                    :rules="[val => !!val || 'Выберите регион']"
                    class="q-pb-sm"
                  />
                </div>

                <div class="col-4">
                  <q-input
                    ref="pricesProperties"
                    square
                    outlined
                    v-model.number="property.MarketValue"
                    type="number"
                    dense
                    label="Рыночная стоимость"
                    lazy-rules
                    :rules="[val => !!val || 'Поля должно быт заполнено']"
                  />
                </div>
              </div>

              <q-btn
                color="red"
                label="Удалить"
                @click="
                  confirmDeleteItem(
                    'Недвижимость ' + (index + 1),
                    removeProperty,
                    'Realty_new',
                    index
                  )
                "
                class="removeItem"
              ></q-btn>
            </fieldset>

            <q-btn
              color="primary"
              label="Добавить недвижимость"
              @click="addProperty"
              class="addItem"
            ></q-btn>

            <!-- Vehicles -->
            <h5
              v-if="!Customer.PropertyInformation.Transport_new.length"
              class="tab-content_title"
            >
              Данные по транспортным средствам отсутствуют
            </h5>
            <fieldset
              class="fieldset_block"
              v-for="(vehicle, index) of Customer.PropertyInformation
                .Transport_new"
              :key="'Transport_new' + index"
            >
              <legend class="legend_title">
                Транспортное средство {{ index + 1 }}
              </legend>
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-select
                    ref="typeVehicles"
                    square
                    outlined
                    v-model="vehicle.VehicleType"
                    :options="dictionaries.VehicleType.items"
                    dense
                    label="Вид транспортного средства"
                    emit-value
                    map-options
                    :rules="[
                      val => !!val || 'Выберите вид транспортного средства'
                    ]"
                    class="q-pb-sm"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="vehicleBrands"
                    square
                    outlined
                    v-model="vehicle.transportBrand"
                    dense
                    label="Марка транспортного средства"
                    lazy-rules
                    :rules="[val => !!val || 'Поля должно быт заполнено']"
                  />
                </div>
                <div class="col-4">
                  <q-select
                    ref="yearsOfIssue"
                    square
                    outlined
                    v-model="vehicle.yearOfRelease"
                    :options="options.yearsOfIssueVehicle"
                    dense
                    label="Год выпуска"
                    emit-value
                    map-options
                    :rules="[val => !!val || 'Выберите год']"
                    class="q-pb-sm"
                  />
                </div>

                <!-- <div class="col-4">
                <q-input
                  ref="yearsOfIssue"
                  outlined
                  square
                  dense
                  label="Год выпуска"
                  v-model="vehicle.year"
                  mask="####"
                  lazy-rules
                  :rules="[
                    val => (val && val.length === 4) || 'Введите год выпуска'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                        ref="qYearsOfIssue"
                      >
                        <q-date
                          mask="YYYY"
                          v-model="vehicle.year"
                          disable-year-month="2000/1"
                          
                          @input="() => $refs.qYearsOfIssue[index].hide()"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div> -->
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="priceVehicles"
                    square
                    outlined
                    v-model.number="vehicle.marketValue"
                    type="number"
                    dense
                    label="Рыночная стоимость"
                    lazy-rules
                    :rules="[val => !!val || 'Введите рыночную стоимость']"
                  />
                </div>
              </div>

              <q-btn
                color="red"
                label="Удалить"
                @click="
                  confirmDeleteItem(
                    'Транспортное ' + (index + 1),
                    removeProperty,
                    'Transport_new',
                    index
                  )
                "
                class="removeItem"
              ></q-btn>
            </fieldset>

            <q-btn
              color="primary"
              label="Добавить транспортное средство"
              @click="addVehicle"
              class="addItem"
            ></q-btn>
          </div>
        </div>

        <!-- Guarantees -->
        <div class="guarantees">
          <h4
            class="tab-title"
            ref="guarantees"
            @click="toggleForm('guarantees')"
          >
            Гарантии и поручительство
          </h4>
          <div class="tab-content" ref="tabContent">
            <h5
              v-if="!fullProfile.Guarantee.RelatedPerson.length"
              class="tab-content_title"
            >
              Данные по физ. лицу отсутствуют
            </h5>

            <fieldset
              class="fieldset_block"
              v-for="(guarantee, index) of fullProfile.Guarantee.RelatedPerson"
              :key="'RelatedPerson' + index"
            >
              <legend class="legend_title">Физ. лицо {{ index + 1 }}</legend>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-select
                    ref="customersAttitude"
                    square
                    outlined
                    v-model="guarantee.ClientRelation"
                    :options="dictionaries.ClientRelationType.items"
                    dense
                    label="Отношение к клиенту"
                    emit-value
                    map-options
                    :rules="[val => !!val || 'Выберите отношение к клиенту']"
                    class="q-pb-sm"
                  />
                </div>

                <div class="col-4">
                  <q-input
                    ref="priceGuarantees"
                    square
                    outlined
                    v-model.number="guarantee.Sum"
                    dense
                    label="Сумма поручительства"
                    lazy-rules
                    :rules="[val => !!val || 'Введите сумму']"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="surnameGuarantees"
                    square
                    outlined
                    v-model="guarantee.LastName"
                    dense
                    label="Фамилия"
                    lazy-rules
                    :rules="[val => !!val || 'Введите фамилию']"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="nameGuarantees"
                    square
                    outlined
                    v-model="guarantee.FirstName"
                    dense
                    label="Имя"
                    lazy-rules
                    :rules="[val => !!val || 'Введите имя']"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="mnameGuarantees"
                    square
                    outlined
                    v-model="guarantee.MiddleName"
                    dense
                    label="Отчество"
                    lazy-rules
                    :rules="[val => !!val || 'Введите отчество']"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="birthdayGuarantees"
                    outlined
                    square
                    dense
                    label="Дата рождения"
                    v-model="guarantee.BirthDate"
                    mask="##.##.####"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length === 10) || 'Введите дату рождения'
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                          ref="qDateBirthdayGuarantees"
                        >
                          <q-date
                            mask="DD.MM.YYYY"
                            v-model="guarantee.BirthDate"
                            @input="hideDatepickerBirthdayGuarantees"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="innGuarantees"
                    square
                    outlined
                    v-model="guarantee.INN"
                    dense
                    label="ИНН"
                    mask="#########"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length === 9) ||
                        'Количество цифр должно быть 9'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="pinppGuarantees"
                    square
                    outlined
                    v-model="guarantee.PINPP"
                    dense
                    label="ПИНФЛ"
                    mask="##############"
                    lazy-rules
                    :rules="[
                      val => (val && val.length === 14) || 'Введите ПНФЛ'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-select
                    square
                    outlined
                    v-model="guarantee.Resident"
                    :options="fullProfile.options.confirmation"
                    dense
                    label="Резидентство"
                    emit-value
                    map-options
                    class="q-pb-sm"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="pasportSeriesGuarantees"
                    square
                    outlined
                    v-model="guarantee.Document.Series"
                    dense
                    label="Серия паспорта"
                    mask="AA"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length === 2) || 'Введите Серию паспорта'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="pasportNumberGuarantees"
                    square
                    outlined
                    v-model="guarantee.Document.Number"
                    dense
                    label="Номер паспорта"
                    mask="#######"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length === 7) || 'Введите Номер паспорта'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="pasportDateGuarantees"
                    outlined
                    square
                    dense
                    label="Дата выдачи паспорта"
                    v-model="guarantee.Document.GivenDate"
                    mask="##.##.####"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length === 10) ||
                        'Введите дату выдачи паспорта'
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                          ref="qDatePasportDateGuarantees"
                        >
                          <q-date
                            mask="DD.MM.YYYY"
                            v-model="guarantee.Document.GivenDate"
                            @input="hideDatepickerPasportDateGuarantees"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="pasportDateGuarantees"
                    outlined
                    square
                    dense
                    label="Дата окончания действия паспорта"
                    v-model="guarantee.Document.ExpirationDate"
                    mask="##.##.####"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length === 10) ||
                        'Введите дату  окончания действия паспорта'
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                          ref="qDatePasportDateGuarantees"
                        >
                          <q-date
                            mask="DD.MM.YYYY"
                            v-model="guarantee.Document.ExpirationDate"
                            @input="hideDatepickerPasportDateGuarantees"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="indexGuarantees"
                    square
                    outlined
                    v-model="guarantee.Address.PostalCode"
                    dense
                    label="Индекс"
                    mask="######"
                  />
                </div>
                <div class="col-4">
                  <q-select
                    ref="regionGuarantees"
                    square
                    outlined
                    v-model="guarantee.Address.Region"
                    :options="dictionaries.Region.items"
                    dense
                    label="Регион/область"
                    :rules="[val => !!val || 'Выберите регион/область']"
                    emit-value
                    map-options
                    class="q-pb-sm"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.Address.City"
                    dense
                    label="Город"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.Address.District"
                    dense
                    label="Район"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="streetGuarantees"
                    square
                    outlined
                    v-model="guarantee.Address.Street"
                    dense
                    label="Улица / Мкр."
                    :rules="[
                      val => !!val || 'Введите наименование улицы / мкр.'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="houseNumberGuarantees"
                    square
                    outlined
                    v-model="guarantee.Address.House"
                    dense
                    label="Номер дома"
                    :rules="[val => !!val || 'Введите номер дома']"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.Address.Block"
                    dense
                    label="Корпус"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.Address.Building"
                    dense
                    label="Строение"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.Address.Apartment"
                    dense
                    label="Номер квартиры"
                  />
                </div>
              </div>

              <!-- phone -->
              <fieldset
                class="fieldset_block"
                v-for="(phone, phoneIndex) of guarantee.PhoneList"
                :key="'RelatedPerson' + phoneIndex"
              >
                <legend class="legend_title">
                  Телефон {{ phoneIndex + 1 }}
                </legend>
                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      ref="phonesGuarantees"
                      square
                      outlined
                      v-model="phone.Number"
                      dense
                      label="Тел. номер"
                      mask="+############"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length === 13) || 'Введите номер телефона'
                      ]"
                    />
                  </div>
                </div>

                <q-btn
                  v-if="phoneIndex > 0"
                  color="red"
                  label="Удалить"
                  @click="
                    confirmDeleteItem(
                      'Телефон ' + (phoneIndex + 1),
                      removePhoneGuarantee,
                      'RelatedPerson',
                      index,
                      phoneIndex
                    )
                  "
                  class="removeItem"
                ></q-btn>
              </fieldset>

              <q-btn
                color="primary"
                label="Добавить номер телефона"
                @click="addPhoneGuarantee({ item: 'RelatedPerson', index })"
                class="addItem"
              ></q-btn>

              <q-btn
                color="red"
                label="Удалить"
                @click="
                  confirmDeleteItem(
                    'Физ. лицо ' + (index + 1),
                    removeGuarantee,
                    'RelatedPerson',
                    index
                  )
                "
                class="removeItem"
              ></q-btn>
            </fieldset>
            <q-btn
              color="primary"
              label="Добавить физ. лицо"
              @click="addRelatedPerson"
              class="addItem"
            ></q-btn>

            <h5
              v-if="!fullProfile.Guarantee.RelatedLegalPerson.length"
              class="tab-content_title"
            >
              Данные по юр. лицу отсутствуют
            </h5>

            <fieldset
              class="fieldset_block"
              v-for="(guarantee, index) of fullProfile.Guarantee
                .RelatedLegalPerson"
              :key="'RelatedLegalPerson' + index"
            >
              <legend class="legend_title">Юр. лицо {{ index + 1 }}</legend>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="priceGuarantees"
                    square
                    outlined
                    v-model.number="guarantee.Sum"
                    type="number"
                    dense
                    label="Сумма поручительства"
                    lazy-rules
                    :rules="[val => !!val || 'Введите сумму']"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="nameGuarantees"
                    square
                    outlined
                    v-model="guarantee.Name"
                    dense
                    label="Имя"
                    lazy-rules
                    :rules="[val => !!val || 'Введите имя']"
                  />
                </div>

                <div class="col-4">
                  <q-input
                    ref="innGuarantees"
                    square
                    outlined
                    v-model="guarantee.INN"
                    dense
                    label="ИНН"
                    mask="#########"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length === 9) ||
                        'Количество цифр должно быть 9'
                    ]"
                  />
                </div>

                <!-- Надо добавить в BPM -->
                <div class="col-4">
                  <q-select
                    ref="kindOfActivityGuarantees"
                    square
                    outlined
                    v-model="guarantee.Activity"
                    :options="dictionaries.MainWorkType.items"
                    dense
                    label="Вид деятельности"
                    emit-value
                    map-options
                    :rules="[val => !!val || 'Выберите вид деятельности']"
                    class="q-pb-sm"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.Address.PostalCode"
                    dense
                    label="Индекс"
                    mask="######"
                  />
                </div>
                <div class="col-4">
                  <q-select
                    ref="regionGuarantees"
                    square
                    outlined
                    v-model="guarantee.Address.Region"
                    :options="dictionaries.Region.items"
                    dense
                    label="Регион/область"
                    :rules="[val => !!val || 'Выберите регион/область']"
                    emit-value
                    map-options
                    class="q-pb-sm"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.Address.City"
                    dense
                    label="Город"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.Address.District"
                    dense
                    label="Район"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="streetGuarantees"
                    square
                    outlined
                    v-model="guarantee.Address.Street"
                    dense
                    label="Улица / Мкр."
                    lazy-rules
                    :rules="[
                      val => !!val || 'Введите наименование улицы / мкр.'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="houseNumberGuarantees"
                    square
                    outlined
                    v-model="guarantee.Address.House"
                    dense
                    label="Номер дома"
                    lazy-rules
                    :rules="[val => !!val || 'Введите номер дома']"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.Address.Block"
                    dense
                    label="Корпус"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.Address.Building"
                    dense
                    label="Строение"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.Address.Office"
                    dense
                    label="Номер офиса"
                  />
                </div>
              </div>

              <!-- phone -->
              <fieldset
                class="fieldset_block"
                v-for="(phone, phoneIndex) of guarantee.PhoneList"
                :key="'RelatedLegalPersonPhone' + phoneIndex"
              >
                <legend class="legend_title">
                  Телефон {{ phoneIndex + 1 }}
                </legend>
                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      ref="phonesGuarantees"
                      square
                      outlined
                      v-model="phone.Number"
                      dense
                      label="Тел. номер"
                      mask="+############"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length === 13) || 'Введите номер телефона'
                      ]"
                    />
                  </div>
                </div>

                <q-btn
                  v-if="phoneIndex > 0"
                  color="red"
                  label="Удалить"
                  @click="
                    confirmDeleteItem(
                      'Телефон ' + (phoneIndex + 1),
                      removePhoneGuarantee,
                      'RelatedLegalPerson',
                      index,
                      phoneIndex
                    )
                  "
                  class="removeItem"
                ></q-btn>
              </fieldset>

              <q-btn
                color="primary"
                label="Добавить номер телефона"
                @click="
                  addPhoneGuarantee({ item: 'RelatedLegalPerson', index })
                "
                class="addItem"
              ></q-btn>

              <q-btn
                color="red"
                label="Удалить"
                @click="
                  confirmDeleteItem(
                    'Юр. лицо ' + (index + 1),
                    removeGuarantee,
                    'RelatedLegalPerson',
                    index
                  )
                "
                class="removeItem"
              ></q-btn>
            </fieldset>
            <q-btn
              color="primary"
              label="Добавить юр. лицо"
              @click="addRelatedLegalPerson"
              class="addItem"
            ></q-btn>

            <h5
              v-if="!fullProfile.Guarantee.Insurance.length"
              class="tab-content_title"
            >
              Данные по стархованию отсутствуют
            </h5>

            <fieldset
              class="fieldset_block"
              v-for="(guarantee, index) of fullProfile.Guarantee.Insurance"
              :key="'Insurance' + index"
            >
              <legend class="legend_title">Страхование {{ index + 1 }}</legend>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="nameGuarantees"
                    square
                    outlined
                    v-model="guarantee.OrgName"
                    dense
                    label="Наименование страховой компании"
                    :rules="[
                      val => !!val || 'Введите наименование страховой компании'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="innGuarantees"
                    square
                    outlined
                    v-model="guarantee.INN"
                    dense
                    label="ИНН страховой компании"
                    mask="#########"
                    :rules="[
                      val =>
                        (val && val.length === 9) ||
                        'Количество цифр должно быть 9'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="priceGuarantees"
                    square
                    outlined
                    v-model.number="guarantee.Sum"
                    type="number"
                    dense
                    label="Сумма страхового полиса"
                    :rules="[val => !!val || 'Введите сумму']"
                  />
                </div>
              </div>

              <q-btn
                color="red"
                label="Удалить"
                @click="
                  confirmDeleteItem(
                    'Страхование ' + (index + 1),
                    removeGuarantee,
                    'Insurance',
                    index
                  )
                "
                class="removeItem"
              ></q-btn>
            </fieldset>

            <q-btn
              color="primary"
              label="Добавить страхование"
              @click="addInsurance"
              class="addItem"
            ></q-btn>
          </div>
        </div>

        <!-- Info credit -->
        <div class="infoCredit tab">
          <h4
            class="tab-title"
            ref="infoCredit"
            @click="toggleForm('infoCredit')"
          >
            Сведения о запрашиваемом кредите
          </h4>
          <div class="tab-content" ref="tabContent">
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-select
                  ref="productCredit"
                  square
                  outlined
                  v-model="fullProfile.LoanInfo.LoanProduct"
                  :options="dictionaries.LoanProduct.items"
                  dense
                  label="Кредитный продукт"
                  :rules="[val => !!val || 'Выберите кредитный продукт']"
                  emit-value
                  map-options
                  class="q-pb-sm"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="priceCredit"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.Sum"
                  type="number"
                  dense
                  label="Запрашиваемая сумма кредита"
                  :rules="[
                    val => !!val || 'Введите сумму кредита',
                    val =>
                      val <= preApprovalData.maxSum ||
                      `Введите сумму небольше ${preApprovalData.maxSum}`
                  ]"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="currencyCredit"
                  square
                  outlined
                  v-model="fullProfile.LoanInfo.Currency"
                  dense
                  disable
                  label="Валюта"
                  lazy-rules
                  :rules="[val => !!val || 'Введите валюту']"
                />
              </div>
            </div>

            <div v-if="!!fullProfile.LoanInfo.LoanProduct" class="row q-col-gutter-md">
              <div class="col-4">
                <q-select
                  ref="typeRepayment"
                  square
                  outlined
                  v-model="fullProfile.LoanInfo.RepaymentType"
                  :options="fullProfile.options.RepaymentType"
                  dense
                  label="Тип пошагового кредита"
                  :rules="[val => !!val || 'Выберите тип пошагового кредита']"
                  emit-value
                  map-options
                  class="q-pb-sm"
                />
              </div>

              <div class="col-4">
                <q-input
                  ref="interestRateMax"
                  square
                  outlined
                  v-model="fullProfile.LoanInfo.MaxInterestRate"
                  dense
                  disable
                  label="Процентная ставка по кредиту (максимальная)"
                  :rules="[
                    val => !!val || 'Введите максимальную процентную ставку'
                  ]"
                />
              </div>

              <div class="col-4">
                <q-input
                  ref="interestRateMin"
                  square
                  outlined
                  v-model="fullProfile.LoanInfo.MinInterestRate"
                  dense
                  disable
                  label="Процентаня ставка по кредиту (минимальная)"
                  :rules="[
                    val => !!val || 'Введите минимальную процентную ставку'
                  ]"
                />
              </div>

                <!-- <q-select
                  ref="periodRepayment"
                  square
                  outlined
                  v-model="fullProfile.LoanInfo.MaxDefferalRepaymentPeriod"
                  :options="options.periodRepayment"
                  dense
                  label="Льготный период по погашению кредита"
                  :rules="[val => !!val || 'Выберите период погашения']"
                  emit-value
                  map-options
                  class="q-pb-sm"
                /> -->
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <div v-if="!!fullProfile.LoanInfo.LoanProduct" class="col-12">
                  <h6 class="periodCredit">Льготный период по погашению кредита</h6>
                  <q-badge color="secondary">
                    Срок: {{ fullProfile.LoanInfo.MaxDefferalRepaymentPeriod }} ({{
                      fullProfile.LoanInfo.GracePeriodMin
                    }}
                    до {{ fullProfile.LoanInfo.GracePeriodMax }})
                  </q-badge>
                  <q-slider
                    v-model.number="fullProfile.LoanInfo.MaxDefferalRepaymentPeriod"
                    :min="fullProfile.LoanInfo.GracePeriodMin"
                    :max="fullProfile.LoanInfo.GracePeriodMax"
                    :step="1"
                    label
                    label-always
                    color="light-green"
                    :rules="[val => !!val || 'Выберите срок кредита']"
                    class="sliderCredit"
                  />
                </div>
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  ref="comfortablePeriodRepayment"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.ConvenientRepaymentTerm"
                  type="number"
                  dense
                  label="Удобный срок погашения в мес"
                  mask="##"
                  lazy-rules
                  :rules="[
                    val => !!val || 'Введите Удобный срок погашения в мес'
                  ]"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="periodRepaymentMin"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.MinTermInMonths"
                  type="number"
                  dense
                  disable
                  label="Минимальное количество месяцев на кредит"
                  mask="##"
                  lazy-rules
                  :rules="[
                    val =>
                      !!val ||
                      'Введите минимальное количество месяцев на кредит'
                  ]"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="periodRepaymentMax"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.MaxTermInMonths"
                  type="number"
                  dense
                  disable
                  label="Максимальное количество месяцев на кредит"
                  mask="##"
                  lazy-rules
                  :rules="[
                    val =>
                      !!val ||
                      'Введите максимальное количество месяцев на кредит'
                  ]"
                />
              </div>
            </div>

            <!-- <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-select
                  ref="typeCredit"
                  square
                  outlined
                  v-model="personalData.LoanInfo.type"
                  :options="options.typeCredit"
                  dense
                  label="Вид кредита"
                  :rules="[val => !!val || 'Выберите вид кредита']"
                  emit-value
                  map-options
                  class="q-pb-sm"
                />
              </div>
              <div class="col-4"></div>
              <div class="col-4"></div>
            </div> -->

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  ref="initialFee"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.InitialPayment"
                  type="number"
                  dense
                  label="Первоначальный взнос"
                  lazy-rules
                  :rules="[val => !!val || 'Введите первоначальный взнос']"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="procentInitialFeeMin"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.MinInitialPaymentPercent"
                  type="number"
                  dense
                  disable
                  label="Процент первоначального взноса (минимальный)"
                  lazy-rules
                  :rules="[
                    val => !!val || 'Введите минимальный первоначальный взнос'
                  ]"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="procentInitialFeeMax"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.MaxInitialPaymentPercent"
                  type="number"
                  dense
                  disable
                  label="Процент первоначального взноса (максимальный)"
                  lazy-rules
                  :rules="[
                    val => !!val || 'Введите максимальный первоначальный взнос'
                  ]"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-select
                  ref="purposeCredit"
                  square
                  outlined
                  v-model="fullProfile.LoanInfo.LoanPurpose"
                  :options="dictionaries.LoanPurpose.items"
                  dense
                  label="Цель кредитования"
                  :rules="[val => !!val || 'Выберите цель кредитования']"
                  emit-value
                  map-options
                  class="q-pb-sm"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="sellerName"
                  square
                  outlined
                  v-model="fullProfile.LoanInfo.SellerName"
                  dense
                  label="Наименование продавца"
                  lazy-rules
                  :rules="[val => !!val || 'Введите наименование продавца']"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="productName"
                  square
                  outlined
                  v-model="fullProfile.LoanInfo.ProductName"
                  dense
                  label="Наименование товара/работы/услуги"
                  lazy-rules
                  :rules="[
                    val => !!val || 'Введите наименование товара/работы/услуги'
                  ]"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-select
                  ref="sourceFinancs"
                  square
                  outlined
                  v-model="fullProfile.LoanInfo.FundingSource"
                  :options="dictionaries.FinancialSources.items"
                  dense
                  label="Источник финансирования"
                  :rules="[val => !!val || 'Выберите источник финансирования']"
                  emit-value
                  map-options
                  class="q-pb-sm"
                />
              </div>
              <div class="col-4"></div>
              <div class="col-4"></div>
            </div>
          </div>
        </div>

        <!-- loadDocuments -->
        <div class="loadDocuments tab">
          <h4
            class="tab-title"
            ref="loadDocuments"
            @click="toggleForm('loadDocuments')"
          >
            Загрузить документ
          </h4>
          <div class="tab-content" ref="tabContent">
            <div class="row q-col-gutter-md">
              <div class="col">
                <q-uploader
                  url="http://localhost:8080/upload"
                  label="Выберите документ"
                  multiple
                  style="width: 100%"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Comment -->
        <div class="commentCredit tab">
          <h4
            class="tab-title"
            ref="commentCredit"
            @click="toggleForm('commentCredit')"
          >
            Комментарии по кредиту
          </h4>
          <div class="tab-content" ref="tabContent">
            <div class="row q-col-gutter-md">
              <div class="col">
                <q-input
                  v-model="fullProfile.ApplicationComment[0].Comment"
                  type="textarea"
                />
              </div>
            </div>

            <div class="comments">
              <p>test</p>
            </div>
          </div>
        </div>

        <!-- Submit button-->
        <q-btn
          type="submit"
          color="primary"
          label="Пересчитать"
          class="q-ml-sm"
        />
      </form>

      <!-- confirm -->
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
            <span class="q-ml-sm"
              >Вы действительно хотите удалить {{ itemName }}?</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              label="Удалить"
              color="primary"
              v-close-popup
              @click="itemFunc(paylod)"
            />
            <q-btn flat label="Нет" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- alert -->
      <q-dialog v-model="bar" persistent>
        <q-card>
          <q-bar>
            <h6>Внимание!!!</h6>

            <q-space />

            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip>Закрыть</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            Заполните все обязательные поля!!!
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- credit result -->
      <appFullProfile v-if="confirmCredit" />
    </div>
  </div>
</template>

<script>
import CommonUtils from "@/shared/utils/CommonUtils";
import Loader from "@/components/Loader";
import FullProfile from "./FullProfile";

export default {
  name: "profile",
  data() {
    return {
      loaderForm: false,
      isValid: true, //валидация Email
      sameRegistration: "",
      confirm: false,
      confirmCredit: false,
      itemName: "",
      itemFunc: null,
      paylod: {},
      bar: false,

      options: {
        RepaymentType: [],

        yearsOfIssueVehicle: []
      }
    };
  },
  mounted() {
    this.$store.state.profile.Customer.FirstName = this.$store.state.credits.personalData.name;
    this.$store.state.profile.Customer.LastName = this.$store.state.credits.personalData.surname;
    this.$store.state.profile.Customer.MiddleName = this.$store.state.credits.personalData.mname;
    this.$store.state.profile.Customer.INN = this.$store.state.credits.personalData.inn;
    this.$store.state.profile.Customer.PhoneList[0].Number = this.$store.state.credits.personalData.phone;
    this.$store.state.profile.Customer.PINPP = this.$store.state.credits.personalData.pinpp;
    this.$store.state.profile.Customer.Document.Series = this.$store.state.credits.personalData.passport.slice(
      0,
      2
    );
    this.$store.state.profile.Customer.Document.Number = this.$store.state.credits.personalData.passport.slice(
      2
    );

    this.$store.state.profile.Customer.MaritalStatus =
      +this.$store.state.credits.personalData.familyStatus + "";
    this.$store.state.profile.Customer.hasChildren = this.$store.state.credits.personalData.children;
    this.$store.state.profile.Customer.UnderAgeChildrenNum = this.$store.state.credits.personalData.childrenCount;

    this.$store.state.profile.Customer.MonthlyIncome.confirmMonthlyIncome = this.$store.state.credits.personalData.income;
    this.$store.state.profile.Customer.MonthlyExpenses.recurringExpenses = this.$store.state.credits.personalData.expense;
    this.$store.state.profile.Customer.MonthlyExpenses.obligations = this.$store.state.credits.personalData.otherExpenses;
    this.$store.state.profile.Customer.MonthlyIncome.hasAdditionalIncome = this.$store.state.credits.personalData.externalIncome;
    this.$store.state.profile.Customer.MonthlyIncome.additionalIncome.sum = this.$store.state.credits.personalData.externalIncomeSize;
    this.$store.state.profile.Customer.MonthlyIncome.additionalIncome.incomeType = this.$store.state.credits.personalData.additionalIncomeSource;
  },
  computed: {
    fullProfile() {
      return this.$store.state.profile;
    },

    Customer() {
      return this.$store.state.profile.Customer;
    },

    dictionaries() {
      return this.$store.state.profile.dictionaries;
    },

    preApprovalData() {
      return this.$store.state.credits.preApprovalData;
    }
  },
  watch: {
    "Customer.Email"() {
      if (
        this.Customer.Email !== "" &&
        !this.Customer.Email.match(/^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/i)
      ) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    },

    sameRegistration(flag) {
      if (flag) {
        this.removeRegistration({ item: 2 });
      } else {
        this.addRegistration(2);
      }
    },

    "fullProfile.LoanInfo.LoanProduct"(credit) {
      this.fullProfile.LoanInfo.RepaymentType = []

      const idx = this.dictionaries.LoanDetails.items.findIndex(
        item => item.LOAN_ID == credit
      );
      //console.log(idx);
      if (idx !== -1) {
        this.fullProfile.LoanInfo.MinTermInMonths = this.dictionaries.LoanDetails.items[
          idx
        ].MinTermInMonths;
        this.fullProfile.LoanInfo.MaxTermInMonths = this.dictionaries.LoanDetails.items[
          idx
        ].MaxTermInMonths;
        this.fullProfile.LoanInfo.MinInterestRate = this.dictionaries.LoanDetails.items[
          idx
        ].MinInterestRate;
        this.fullProfile.LoanInfo.MaxInterestRate = this.dictionaries.LoanDetails.items[
          idx
        ].MaxInterestRate;
        this.fullProfile.LoanInfo.MinInitialPaymentPercent = this.dictionaries.LoanDetails.items[
          idx
        ].MinimumPaymentPercent;
        this.fullProfile.LoanInfo.MaxInitialPaymentPercent = this.dictionaries.LoanDetails.items[
          idx
        ].MaxInitialPaymentPercent;
        this.fullProfile.options.RepaymentType = this.dictionaries.LoanDetails.items[
          idx
        ].PaymentsType.items;

        this.fullProfile.LoanInfo.GracePeriodMin = this.dictionaries.LoanDetails.items[idx].GracePeriodMin
        this.fullProfile.LoanInfo.GracePeriodMax = this.dictionaries.LoanDetails.items[idx].GracePeriodMax

        this.fullProfile.LoanInfo.MaxDefferalRepaymentPeriod = this.fullProfile.LoanInfo.GracePeriodMin
      }
    }
  },
  methods: {
    async onSubmit() {
      //console.log("fullProfile", this.$store.state.profile);

      this.$refs.surname.validate();
      this.$refs.name.validate();
      this.$refs.mname.validate();
      this.$refs.birthday.validate();
      this.$refs.inn.validate();
      this.$refs.pinpp.validate();
      this.$refs.sex.validate();

      this.$refs.pasportSeries.validate();
      this.$refs.pasportNumber.validate();
      this.$refs.pasportDateStart.validate();
      this.$refs.pasportDateFinish.validate();

      this.$refs.education.validate();

      this.validFilter("phonesValid", "phones");

      // Address
      this.validFilter("regionValid", "region");
      this.validFilter("streetValid", "street");
      this.validFilter("houseNumberValid", "houseNumber");

      this.validFilter("relativesValid", "relatives");
      this.validFilter("relativesSurnameValid", "relatives_surname");
      this.validFilter("relativesNameValid", "relatives_name");
      this.validFilter("relativesMnameValid", "relatives_mname");
      this.validFilter("relativesBirthdayValid", "relatives_birthday");
      this.validFilter(
        "relativesPasportSeriesValid",
        "relatives_pasportSeries"
      );
      this.validFilter(
        "relativesPasportNumberValid",
        "relatives_pasportNumber"
      );
      this.validFilter("relativesPasportDateValid", "relatives_pasportDate");

      this.$refs.kindOfActivity.validate();

      if (
        this.Customer.JobInfo.type ===
        this.dictionaries.MainWorkType.items[0].value
      ) {
        this.$refs.nameOfEmployer.validate();
        this.$refs.innOfEmployer.validate();
        this.$refs.typeOrganization.validate();
        this.$refs.amountWorkes.validate();
        this.$refs.position.validate();
        this.$refs.positionCategory.validate();
        this.$refs.workExperience.validate();
        this.$refs.totalWorkExperience.validate();
      } else {
        this.validItems("nameOfEmployer");
        this.validItems("innOfEmployer");
        this.validItems("typeOrganization");
        this.validItems("amountWorkes");
        this.validItems("position");
        this.validItems("positionCategory");
        this.validItems("workExperience");
        this.validItems("totalWorkExperience");
      }

      if (
        this.Customer.JobInfo.type ===
          this.dictionaries.MainWorkType.items[1].value ||
        this.Customer.JobInfo.type ===
          this.dictionaries.MainWorkType.items[2].value
      ) {
        this.$refs.activityPeriod.validate();
        this.$refs.typeOrganization2.validate();
      } else {
        this.validItems("activityPeriod");
        this.validItems("typeOrganization2");
      }

      this.$refs.income.validate();

      // Properties
      if (this.$refs.typeProperties) {
        this.validFilter("typePropertiesValid", "typeProperties");
        this.validFilter("regionsPropertiesValid", "regionsProperties");
        this.validFilter("pricesPropertiesValid", "pricesProperties");
      } else {
        this.validItems("typePropertiesValid");
        this.validItems("regionsPropertiesValid");
        this.validItems("pricesPropertiesValid");
      }

      //Vehicles
      if (this.$refs.typeVehicles) {
        this.validFilter("typeVehiclesValid", "typeVehicles");
        this.validFilter("vehicleBrandsValid", "vehicleBrands");
        this.validFilter("yearsOfIssueValid", "yearsOfIssue");
        this.validFilter("priceVehiclesValid", "priceVehicles");
      } else {
        this.validItems("typeVehiclesValid");
        this.validItems("vehicleBrandsValid");
        this.validItems("yearsOfIssueValid");
        this.validItems("priceVehiclesValid");
      }

      if (this.$refs.customersAttitude) {
        this.validFilter("customersAttitudeValid", "customersAttitude");
        this.validFilter("priceGuaranteesValid", "priceGuarantees");
        this.validFilter("surnameGuaranteesValid", "surnameGuarantees");
        this.validFilter("nameGuaranteesValid", "nameGuarantees");
        this.validFilter("mnameGuaranteesValid", "mnameGuarantees");
        this.validFilter("birthdayGuaranteesValid", "birthdayGuarantees");
        this.validFilter("innGuaranteesValid", "innGuarantees");
        this.validFilter("pinppGuaranteesValid", "pinppGuarantees");
        this.validFilter(
          "pasportSeriesGuaranteesValid",
          "pasportSeriesGuarantees"
        );
        this.validFilter(
          "pasportNumberGuaranteesValid",
          "pasportNumberGuarantees"
        );
        this.validFilter("pasportDateGuaranteesValid", "pasportDateGuarantees");
        this.validFilter("regionGuaranteesValid", "regionGuarantees");
        this.validFilter("streetGuaranteesValid", "streetGuarantees");
        this.validFilter("houseNumberGuaranteesValid", "houseNumberGuarantees");
        this.validFilter("phonesGuaranteesValid", "phonesGuarantees");
      } else {
        this.validItems("customersAttitudeValid");
        this.validItems("priceGuaranteesValid");
        this.validItems("surnameGuaranteesValid");
        this.validItems("nameGuaranteesValid");
        this.validItems("mnameGuaranteesValid");
        this.validItems("birthdayGuaranteesValid");
        this.validItems("innGuaranteesValid");
        this.validItems("pinppGuaranteesValid");
        this.validItems("pasportSeriesGuaranteesValid");
        this.validItems("pasportNumberGuaranteesValid");
        this.validItems("pasportDateGuaranteesValid");
        this.validItems("regionGuaranteesValid");
        this.validItems("streetGuaranteesValid");
        this.validItems("houseNumberGuaranteesValid");
        this.validItems("phonesGuaranteesValid");
      }

      if (this.$refs.priceGuarantees) {
        this.validFilter("priceGuaranteesValid", "priceGuarantees");
        this.validFilter("nameGuaranteesValid", "nameGuarantees");
        this.validFilter("innGuaranteesValid", "innGuarantees");
        this.validFilter("regionGuaranteesValid", "regionGuarantees");
        this.validFilter("streetGuaranteesValid", "streetGuarantees");
        this.validFilter("houseNumberGuaranteesValid", "houseNumberGuarantees");
        this.validFilter("phonesGuaranteesValid", "phonesGuarantees");
      } else {
        this.validItems("priceGuaranteesValid");
        this.validItems("nameGuaranteesValid");
        this.validItems("innGuaranteesValid");
        this.validItems("regionGuaranteesValid");
        this.validItems("streetGuaranteesValid");
        this.validItems("houseNumberGuaranteesValid");
        this.validItems("phonesGuaranteesValid");
      }

      // if (this.$refs.priceGuarantees) {
      //   this.validFilter("nameGuaranteesValid", "nameGuarantees");
      //   this.validFilter("innGuaranteesValid", "innGuarantees");
      //   this.validFilter("priceGuaranteesValid", "priceGuarantees");
      // } else {
      //   this.validItems("priceGuaranteesValid");
      //   this.validItems("nameGuaranteesValid");
      //   this.validItems("innGuaranteesValid");
      // }

      this.$refs.productCredit.validate();
      this.$refs.priceCredit.validate();

      if (this.$refs.typeRepayment) {
        this.$refs.typeRepayment.validate();
      } else {
        this.validItems("typeRepayment");
      }

      // this.$refs.periodRepayment.validate();
      this.$refs.comfortablePeriodRepayment.validate();
      // this.$refs.typeCredit.validate();
      this.$refs.initialFee.validate();
      this.$refs.purposeCredit.validate();
      this.$refs.sellerName.validate();
      this.$refs.productName.validate();
      this.$refs.sourceFinancs.validate();

      // console.log(this.$refs.typeGuaranteesValid);

      if (
        this.$refs.surname.hasError ||
        this.$refs.name.hasError ||
        this.$refs.mname.hasError ||
        this.$refs.birthday.hasError ||
        this.$refs.inn.hasError ||
        this.$refs.pinpp.hasError ||
        this.$refs.sex.hasError ||
        this.$refs.pasportSeries.hasError ||
        this.$refs.pasportNumber.hasError ||
        this.$refs.pasportDateStart.hasError ||
        this.$refs.pasportDateFinish.hasError ||
        this.$refs.phonesValid.hasError ||
        this.$refs.education.hasError ||
        this.$refs.regionValid.hasError ||
        this.$refs.streetValid.hasError ||
        this.$refs.houseNumberValid.hasError ||
        //relatives
        this.$refs.relativesValid.hasError ||
        this.$refs.relativesSurnameValid.hasError ||
        this.$refs.relativesNameValid.hasError ||
        this.$refs.relativesMnameValid.hasError ||
        this.$refs.relativesBirthdayValid.hasError ||
        this.$refs.relativesPasportSeriesValid.hasError ||
        this.$refs.relativesPasportNumberValid.hasError ||
        this.$refs.relativesPasportDateValid.hasError ||
        //kind of activity
        this.$refs.kindOfActivity.hasError ||
        this.$refs.nameOfEmployer.hasError ||
        this.$refs.innOfEmployer.hasError ||
        this.$refs.typeOrganization.hasError ||
        this.$refs.amountWorkes.hasError ||
        this.$refs.position.hasError ||
        this.$refs.positionCategory.hasError ||
        this.$refs.workExperience.hasError ||
        this.$refs.totalWorkExperience.hasError ||
        this.$refs.activityPeriod.hasError ||
        this.$refs.typeOrganization2.hasError ||
        this.$refs.income.hasError ||
        //properties
        this.$refs.typePropertiesValid.hasError ||
        this.$refs.regionsPropertiesValid.hasError ||
        this.$refs.pricesPropertiesValid.hasError ||
        //vehicles
        this.$refs.typeVehiclesValid.hasError ||
        this.$refs.vehicleBrandsValid.hasError ||
        this.$refs.yearsOfIssueValid.hasError ||
        this.$refs.priceVehiclesValid.hasError ||
        //guarantees
        //this.$refs.guarantees.hasError ||
        // this.$refs.typeGuaranteesValid.hasError ||
        this.$refs.customersAttitudeValid.hasError ||
        this.$refs.priceGuaranteesValid.hasError ||
        this.$refs.surnameGuaranteesValid.hasError ||
        this.$refs.nameGuaranteesValid.hasError ||
        this.$refs.mnameGuaranteesValid.hasError ||
        this.$refs.birthdayGuaranteesValid.hasError ||
        this.$refs.innGuaranteesValid.hasError ||
        this.$refs.pinppGuaranteesValid.hasError ||
        this.$refs.pasportSeriesGuaranteesValid.hasError ||
        this.$refs.pasportNumberGuaranteesValid.hasError ||
        this.$refs.pasportDateGuaranteesValid.hasError ||
        this.$refs.regionGuaranteesValid.hasError ||
        this.$refs.streetGuaranteesValid.hasError ||
        this.$refs.houseNumberGuaranteesValid.hasError ||
        this.$refs.phonesGuaranteesValid.hasError ||
        //info credit
        this.$refs.productCredit.hasError ||
        this.$refs.priceCredit.hasError ||
        this.$refs.typeRepayment.hasError ||
        // this.$refs.periodRepayment.hasError ||
        this.$refs.comfortablePeriodRepayment.hasError ||
        // this.$refs.typeCredit.hasError ||
        this.$refs.initialFee.hasError ||
        this.$refs.purposeCredit.hasError ||
        this.$refs.sellerName.hasError ||
        this.$refs.productName.hasError ||
        this.$refs.sourceFinancs.hasError
      ) {
        this.formHasError = true;
        this.bar = true;
      } else {
        console.log("fullProfile", this.$store.state.profile);
        const {
          Status,
          ApplicationID,
          ProtocolNumber,
          Number,
          Branch,
          BODecision,
          FinalDecision,
          Date,
          BOLogin,
          Department,
          ClientManagerLogin,
          CreditCommiteeDecisions,
          Customer,
          Guarantee,
          LoanInfo,
          ApplicationComment,
          AttachedDocuments
        } = this.fullProfile

        const data = {
          output: [
            {
              name: "application",
              data: {
                Status,
                ApplicationID,
                ProtocolNumber,
                Number,
                Branch,
                BODecision,
                FinalDecision,
                Date,
                BOLogin,
                Department,
                ClientManagerLogin,
                CreditCommiteeDecisions,
                Customer,
                Guarantee,
                LoanInfo,
                ApplicationComment,
                AttachedDocuments
              }
            }
          ]
        };

        try {
          const res = await this.$store.dispatch('confirmationCredit', data)
          console.log('response', JSON.stringify(res, null, 2))
        } catch(e) {}
        console.log(JSON.stringify(data, null, 2))

        this.confirmCredit = true;
      }
    },

    hideDatepickerBirthdayGuarantees() {
      for (let datepicker of this.$refs.qDateBirthdayGuarantees) {
        datepicker.hide();
      }
    },

    hideDatepickerPasportDateGuarantees() {
      for (let datepicker of this.$refs.qDatePasportDateGuarantees) {
        datepicker.hide();
      }
    },

    //itemValid - флаг текущего поля (true/false)
    //itemsValid - название флага группы полей
    //items - референция полей валидации
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
    },

    validFilter(itemsValid, items, itemValid = true) {
      for (let item of this.$refs[items]) {
        if (!item.validate()) {
          //console.log(item.computedErrorMessage)
          itemValid = false;
        }
      }
      this.validItems(itemsValid, itemValid);
    },

    addPhone() {
      this.$store.commit("addPhone");
    },

    addPhoneGuarantee(index) {
      this.$store.commit("addPhoneGuarantee", index);
    },

    addProperty() {
      this.$store.commit("addProperty");
    },

    addVehicle() {
      for (let i = 2000; i <= new Date().getFullYear(); i++) {
        this.options.yearsOfIssueVehicle.push(i);
      }

      this.$store.commit("addVehicle");
    },

    addInsurance() {
      this.$store.commit("addInsurance");
    },

    addRelatedLegalPerson() {
      this.$store.commit("addRelatedLegalPerson");
    },

    addRelatedPerson() {
      this.$store.commit("addRelatedPerson");
    },

    removeItem(payload) {
      this.$store.commit("removeItem", payload);
    },

    removeGuarantee(payload) {
      this.$store.commit("removeGuarantee", payload);
    },

    confirmDeleteItem(name, func, item, index, index2) {
      this.confirm = true;
      this.itemName = name;
      this.itemFunc = func;
      this.paylod = {
        item,
        index,
        index2
      };
    },

    removePhoneGuarantee(payload) {
      this.$store.commit("removePhoneGuarantee", payload);
    },

    addRegistration(AddressType) {
      this.$store.commit("addRegistration", AddressType);
    },

    removeRegistration(payload) {
      this.$store.commit("removeRegistration", payload);
    },

    addRelative() {
      this.$store.commit("addRelative");
    },

    removeProperty(payload) {
      this.$store.commit("removeProperty", payload);
    },

    toggleForm(val) {
      //console.log(val);
      this.$refs[val].classList.toggle("active");

      const tab_content = this.$refs[val].nextSibling;
      tab_content.classList.toggle("active2");
      // if (tab_content.style.maxHeight) {
      //   tab_content.style.maxHeight = null;
      // } else {
      //   tab_content.style.maxHeight = tab_content.scrollHeight + "px";
      // }
    }
  },
  components: {
    appLoader: Loader,
    appFullProfile: FullProfile
  }
};
</script>
<style lang="scss">
.fullProfile {
  .tab-title {
    background-color: #ededed;
    color: #0054a6;
    cursor: pointer;
    padding: 9px 11px;
    // width: 80%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 16px;
    //transition: 0.5s;

    // &:hover {
    //   background-color: rgb(56, 91, 126);
    // }

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

  .active {
    //background-color: rgb(56, 91, 126);

    &:after {
      transform: rotate(-135deg);
      //color: #0e3475;
    }
  }

  .active2 {
    display: none;
  }

  .tab-content {
    color: #212121;
    background-color: #fff;
    //max-height: 0;
    //display: block;
    overflow: hidden;
    transition: max-height 0.3s ease-out;

    .tab-content_title {
      font-size: 16px;
      margin: 0 0 10px;
    }
  }

  .fieldset_block,
  .legend_title {
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .fieldset_block {
    position: relative;
    margin-bottom: 10px;
  }

  .legend_title {
    padding: 5px 10px;
    margin-bottom: 10px;
  }

  .removeItem {
    position: absolute;
    right: 10px;
    top: 0;
  }

  .addItem {
    margin-bottom: 20px;
  }

  .q-field--error .q-field__bottom {
    padding: 1px 0 0 10px;
  }

  .q-btn--rectangle {
    border-radius: 0;
  }

  .q-field--with-bottom,
  .items-start {
    padding-bottom: 16px;
  }

  .q-dialog__inner--minimized > div {
    max-width: 85%;
  }

  .creditCalc {
    min-width: 960px;
  }

  .periodCredit {
    font-size: 16px;
    line-height: 13px;

  }

  .sliderCredit {
    margin: 20px 15px;
  }
}
</style>
