<template>
  <div class="fullProfile">
    <div class="loaderForm" v-if="loaderForm">
      <appLoader />
    </div>
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
                    val => (val && val.length === 10) || 'Введите дату рождения',
                    val => adulthoodValid(val) || 'Несовершенолетний'
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
                  :rules="[val => !!val || 'Выберите пол']"
                  emit-value
                  map-options
                  class="q-pb-sm"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <!-- <div class="col-4">
                <q-select
                  square
                  outlined
                  v-model="Customer.ResidentFlag"
                  :options="credits.options.confirmation"
                  dense
                  label="Вид документа"
                  emit-value
                  map-options
                  class="q-pb-sm"
                />
              </div>

              <div class="col-4">
                <q-input
                  square
                  outlined
                  v-model="Customer.Document.Series"
                  dense
                  lazy-rules
                  label="Наименование документа"
                  :rules="[
                    val => !!val || 'Введите наименование документа'
                  ]"
                />
              </div> -->

              <div class="col-4">
                <q-input
                  ref="pasportSeries"
                  square
                  outlined
                  v-model="Customer.Document.Series"
                  dense
                  label="Серия документа"
                  mask="AA"
                  :rules="[
                    val => (val && val.length === 2) || 'Введите серию документа'
                  ]"
                />
              </div>

              
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  ref="pasportNumber"
                  square
                  outlined
                  v-model="Customer.Document.Number"
                  dense
                  label="Номер документа"
                  mask="#######"
                  lazy-rules
                  :rules="[
                    val => (val && val.length === 7) || 'Введите номер документа'
                  ]"
                />
              </div>

              <div class="col-4">
                <q-select
                  square
                  outlined
                  v-model="Customer.ResidentFlag"
                  :options="credits.options.confirmation"
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
                      'Введите дату выдачи паспорта',

                      Customer.Document.ExpirationDate
                      ? (val => msecond(val) < msecond(Customer.Document.ExpirationDate) ||
                      'Неверная дата')
                      : null,

                      val => msecond(val) < msecond(currentDate) || 
                      'Неверная дата'
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
                          @input="($event) => {
                            $refs.qDatePasportDateStart.hide()
                            validDatePerson($event)
                          }  
                          "
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
                  :rules="[
                    val =>
                      (val && val.length === 10) ||
                      'Введите дату окончания действия паспорта',
                      Customer.Document.GivenDate 
                      ? (val => msecond(val) > msecond(Customer.Document.GivenDate) ||
                      'Неверная дата')
                      : null,
                      val => msecond(val) > msecond(currentDate) || 
                      'Неверная дата'
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
                          @input="($event) => {
                            $refs.qDatePasportDateFinish.hide()
                            validDatePerson($event)
                          }
                          "
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-4">
                <q-input
                  ref="passportIssuedBy"
                  square
                  outlined
                  v-model="Customer.Document.GivenPlace"
                  dense
                  label="Кем выдан паспорт"
                  :rules="[val => !!val || 'Введите кем выдан паспорт']"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
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
              v-for="(phone, index) of Customer.PhoneList.items"
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
              v-for="(address, index) of Customer.AddressList.items"
              :key="address.AddressType"
              class="fieldset_block"
            >
              <legend class="legend_title">
                {{ address.AddressType }}
              </legend>

              <div class="tab-content" ref="tabContent">
                <div
                  v-if="address.AddressType === 'Адрес фактического проживания'"
                  class="row q-col-gutter-md"
                >
                  <div class="col-4">
                    <q-select
                      square
                      outlined
                      v-model="sameRegistration"
                      :options="credits.options.confirmation"
                      dense
                      label="Совпадает ли с адресом постоянной регистрации"
                      emit-value
                      map-options
                      class="q-pb-sm"
                    />
                  </div>
                </div>

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
                      @input="setDistricts($event, index, 'AddressList')"
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

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-select
                      square
                      outlined
                      v-model="address.District"
                      :options="address.Districts.items"
                      dense
                      label="Район"
                      emit-value
                      map-options
                      class="q-pb-sm"
                    />

                    <!-- <q-select
                      square
                      outlined
                      filled
                      v-model="address.District"
                      use-input
                      input-debounce="0"
                      label="Район"
                      :options="dictionaries.Districts.items"
                      @filter="filterFn"
                      emit-value
                      map-options
                      class="q-pb-sm"
                      behavior="menu"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Нет результата
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select> -->
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
                v-if="address.AddressType == 'Адрес временной регистрации'"
                color="red"
                label="Удалить"
                @click="
                  confirmDeleteItem(
                    address.AddressType,
                    removeRegistration,
                    address.AddressType
                  )
                "
                class="removeItem"
              ></q-btn>
            </fieldset>

            <template
              v-if="
                Customer.AddressList.items.findIndex(
                  item => item.AddressType == 'Адрес фактического проживания'
                ) === -1
              "
            >
              <h5 class="tab-content_title">
                Данные по адресу фактического проживания отсутствуют
              </h5>

              <q-btn
                color="primary"
                label="Добавить адрес фактического проживания"
                @click="addRegistration('Адрес фактического проживания')"
                class="addItem"
              ></q-btn>
            </template>

            <template
              v-if="
                Customer.AddressList.items.findIndex(
                  item => item.AddressType == 'Адрес временной регистрации'
                ) === -1
              "
            >
              <h5 class="tab-content_title">
                Данные по адресу временной регистрации отсутствуют
              </h5>

              <q-btn
                color="primary"
                label="Добавить адрес временной регистрации"
                @click="addRegistration('Адрес временной регистрации')"
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
                  :options="credits.options.confirmation"
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
              v-for="(relative, index) of Customer.Relatives.items"
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
                    lazy-rules
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
                    ref="relatives_pasportDateStart"
                    outlined
                    square
                    dense
                    label="Дата выдачи паспорта"
                    v-model="relative.Document.GivenDate"
                    mask="##.##.####"
                    :rules="[
                      val =>
                        (val && val.length === 10) ||
                        'Введите дату выдачи паспорта',

                        relative.Document.ExpirationDate
                        ? (val => msecond(val) < msecond(relative.Document.ExpirationDate) ||
                        'Неверная дата')
                        : null,

                         val => msecond(val) < msecond(currentDate) || 
                        'Неверная дата'
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
                              ($event) => {
                                $refs.qDateRelativePassportDateStart[
                                  index
                                ].hide()
                                validDateRelatives($event, index)
                              }
                            "
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <div class="col-4">
                  <q-input
                    ref="relatives_pasportDateFinish"
                    outlined
                    square
                    dense
                    label="Дата окончания действия паспорта"
                    v-model="relative.Document.ExpirationDate"
                    mask="##.##.####"
                    :rules="[
                      val =>
                        (val && val.length === 10) ||
                        'Введите дату окончания паспорта',
                        relative.Document.GivenDate
                        ? (val => msecond(val) > msecond(relative.Document.GivenDate) ||
                        'Неверная дата')
                        : null,
                        val => msecond(val) > msecond(currentDate) ||
                        'Неверная дата'
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
                              ($event) => {
                                $refs.qDateRelativePassportDateFinish[
                                  index
                                ].hide()
                                validDateRelatives($event, index)
                              }
                            "
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <div class="col-4">
                  <div class="col-4">
                    <q-input
                      ref="relatives_passportIssuedBy"
                      square
                      outlined
                      v-model="relative.Document.GivenPlace"
                      dense
                      label="Кем выдан паспорт"
                      :rules="[val => !!val || 'Введите кем выдан паспорт']"
                    />
                  </div>
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

            <template v-if="dictionaries.MainWorkType.items.length">

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
                  :options="credits.options.confirmation"
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
              v-if="!Customer.PropertyInformation.Realty_new.items.length"
              class="tab-content_title"
            >
              Данные по недвижимости отсутствуют
            </h5>
            <fieldset
              class="fieldset_block"
              v-for="(property, index) of Customer.PropertyInformation
                .Realty_new.items"
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
              v-if="!Customer.PropertyInformation.Transport_new.items.length"
              class="tab-content_title"
            >
              Данные по транспортным средствам отсутствуют
            </h5>
            <fieldset
              class="fieldset_block"
              v-for="(vehicle, index) of Customer.PropertyInformation
                .Transport_new.items"
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
            <q-field
              ref="guaranteesValid"
              :value="!!guaranteeCount.length"
              :rules="[
                val => !!val || 'Добавьте гарантию или поручительство',
                val => (totalGuaranteesSum - fullProfile.LoanInfo.Sum >= fullProfile.LoanInfo.Sum * 0.25) ||
                      'Сумма всех гарантий должна быть больше запрашиваемой суммы кредита на 25%'
              ]"
            >
            <h5
              v-if="!fullProfile.Guarantee.RelatedPerson.items.length"
              class="tab-content_title"
            >
              Данные по физ. лицу отсутствуют
            </h5>

            <fieldset
              class="fieldset_block"
              v-for="(guarantee, index) of fullProfile.Guarantee.RelatedPerson.items"
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
                    type="number"
                    dense
                    label="Сумма поручительства"
                    @input="guaranteesValid"
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
                            @input="() =>
                              $refs.qDateBirthdayGuarantees[index].hide()
                            "
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
                    :options="credits.options.confirmation"
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
                    ref="pasportDateGuaranteesStart"
                    outlined
                    square
                    dense
                    label="Дата выдачи паспорта"
                    v-model="guarantee.Document.GivenDate"
                    mask="##.##.####"
                    :rules="[
                      val =>
                        (val && val.length === 10) ||
                        'Введите дату выдачи паспорта',

                        guarantee.Document.ExpirationDate
                        ? (val => msecond(val) < msecond(guarantee.Document.ExpirationDate) ||
                        'Неверная дата')
                        : null,

                         val => msecond(val) < msecond(currentDate) || 
                        'Неверная дата'
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                          ref="qDatePasportDateGuaranteesStart"
                        >
                          <q-date
                            mask="DD.MM.YYYY"
                            v-model="guarantee.Document.GivenDate"
                            @input="($event) => {
                              $refs.qDatePasportDateGuaranteesStart[index].hide()
                              validDateGuarantees($event, index)
                            }
                            "
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
                    ref="pasportDateGuaranteesFinish"
                    outlined
                    square
                    dense
                    label="Дата окончания действия паспорта"
                    v-model="guarantee.Document.ExpirationDate"
                    mask="##.##.####"
                    :rules="[
                      val =>
                        (val && val.length === 10) ||
                        'Введите дату  окончания действия паспорта',
                        guarantee.Document.GivenDate
                        ? (val => msecond(val) > msecond(guarantee.Document.GivenDate) ||
                        'Неверная дата')
                        : null,
                        val => msecond(val) > msecond(currentDate) ||
                        'Неверная дата'
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                          ref="qDatePasportDateGuaranteesFinish"
                        >
                          <q-date
                            mask="DD.MM.YYYY"
                            v-model="guarantee.Document.ExpirationDate"
                            @input="($event) => {
                              $refs.qDatePasportDateGuaranteesFinish[index].hide()
                              validDateGuarantees($event, index)
                            }
                            "
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <div class="col-4">
                  <q-input
                    ref="passportIssuedByGuarantees"
                    square
                    outlined
                    v-model="guarantee.Document.GivenPlace"
                    dense
                    label="Кем выдан паспорт"
                    :rules="[val => !!val || 'Введите кем выдан паспорт']"
                  />
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
                    @input="setDistrictsGuarantee($event, index, 'RelatedPerson')"
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
                  <q-select
                      square
                      outlined
                      v-model="guarantee.Address.District"
                      :options="guarantee.Address.Districts.items"
                      dense
                      label="Район"
                      emit-value
                      map-options
                      class="q-pb-sm"
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
                v-for="(phone, phoneIndex) of guarantee.PhoneList.items"
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
              @click="addRelatedPerson('RelatedPerson')"
              class="addItem"
            ></q-btn>

            <h5
              v-if="!fullProfile.Guarantee.RelatedLegalPerson.items.length"
              class="tab-content_title"
            >
              Данные по юр. лицу отсутствуют
            </h5>

            <fieldset
              class="fieldset_block"
              v-for="(guarantee, index) of fullProfile.Guarantee
                .RelatedLegalPerson.items"
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
                    @input="guaranteesValid"
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
                    label="Название"
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
                    @input="setDistrictsGuarantee($event, index, 'RelatedLegalPerson')"
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
                  <!-- <q-input
                    square
                    outlined
                    v-model="guarantee.Address.District"
                    dense
                    label="Район"
                  />  -->

                  <q-select
                      square
                      outlined
                      v-model="guarantee.Address.District"
                      :options="guarantee.Address.Districts.items"
                      dense
                      label="Район"
                      emit-value
                      map-options
                      class="q-pb-sm"
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
                    v-model="guarantee.Address.OfficeNum"
                    dense
                    label="Номер офиса"
                  />
                </div>
              </div>

              <!-- phone -->
              <fieldset
                class="fieldset_block"
                v-for="(phone, phoneIndex) of guarantee.PhoneList.items"
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
              @click="addRelatedLegalPerson('RelatedLegalPerson')"
              class="addItem"
            ></q-btn>

            <h5
              v-if="!fullProfile.Guarantee.Insurance.items.length"
              class="tab-content_title"
            >
              Данные по страхованию отсутствуют
            </h5>

            <fieldset
              class="fieldset_block"
              v-for="(guarantee, index) of fullProfile.Guarantee.Insurance.items"
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
                    @input="guaranteesValid"
                    lazy-rules
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
              @click="addInsurance('Insurance')"
              class="addItem"
            ></q-btn>
            </q-field>
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
                  disable
                  ref="productCredit"
                  square
                  outlined
                  v-model="fullProfile.LoanInfo.LoanProduct"
                  :options="dictionaries.LoanProduct.items"
                  @input="onChangeLoan($event)"
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

                    preApprovalData.maxSum 
                    ?  (val =>
                      val <= preApprovalData.maxSum ||
                      `Введите сумму небольше ${preApprovalData.maxSum}`)
                    : null
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

            <div class="row q-col-gutter-md">
              <!-- если не овердрафт -->
              <div 
                v-if="!!fullProfile.LoanInfo.LoanProduct && fullProfile.LoanInfo.LoanProduct !== 3"
                class="col-4"
              >
                <q-select
                  disable
                  ref="typeRepayment"
                  square
                  outlined
                  v-model="fullProfile.LoanInfo.RepaymentType"
                  :options="options.RepaymentType"
                  dense
                  label="Тип графика гашения"
                  :rules="[val => !!val || 'Выберите тип графика гашения']"
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
                  label="Процентная ставка по кредиту (минимальная)"
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
                  <h6 class="periodCredit">
                    Льготный период по погашению кредита
                  </h6>
                  <q-badge color="secondary">
                    Срок:
                    {{ fullProfile.LoanInfo.MaxDefferalRepaymentPeriod }} ({{
                      GracePeriodMin
                    }}
                    до {{ GracePeriodMax }})
                  </q-badge>
                  <q-slider
                    v-model.number="
                      fullProfile.LoanInfo.MaxDefferalRepaymentPeriod
                    "
                    :min="GracePeriodMin"
                    :max="GracePeriodMax"
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
                  v-model.number="fullProfile.LoanInfo.TermInMonth"
                  type="number"
                  dense
                  label="Удобный срок погашения в мес"
                  mask="##"
                  lazy-rules
                  :rules="[
                    val => !!val || 'Введите удобный срок погашения в мес',
                    val => val > 0 || 'Неверный срок погашения'
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

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  ref="comfortableDayRepayment"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.ConvenientRepaymentTerm"
                  type="number"
                  dense
                  label="Удобный день погашения"
                  mask="##"
                  lazy-rules
                  :rules="[
                    val => !!val || 'Введите удобный день погашения',
                    val =>
                      val > 0 && val < 29 || `Введите удобный день погашения (1-28)`
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
              <div 
                v-if="!!fullProfile.LoanInfo.LoanProduct && fullProfile.LoanInfo.LoanProduct !== 3"
                class="col-4">
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

            </div>

            <template v-if="fullProfile.LoanInfo.LoanProduct == 2">
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="nameProduction"
                    square
                    outlined
                    v-model="fullProfile.LoanInfo.consumerLoan.nameProduction"
                    dense
                    label="Наименование продавца/производителя товара/работы/услуги"
                    lazy-rules
                    :rules="[val => !!val || 'Введите наименование продавца/производителя товара/работы/услуги']"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="productName"
                    square
                    outlined
                    v-model="fullProfile.LoanInfo.consumerLoan.nameService"
                    dense
                    label="Наименование товара/работы/услуги"
                    lazy-rules
                    :rules="[
                      val => !!val || 'Введите наименование товара/работы/услуги'
                    ]"
                  />
                </div>
              
                <div class="col-4">
                  <q-input
                    ref="nameBankProd"
                    square
                    outlined
                    v-model="fullProfile.LoanInfo.consumerLoan.nameBankProd"
                    dense
                    label="Наименование банка продавца/производителя товара/работы/услуги"
                    lazy-rules
                    :rules="[val => !!val || 'Введите наименование банка продавца/производителя товара/работы/услуги']"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="billProd"
                    square
                    outlined
                    v-model="fullProfile.LoanInfo.consumerLoan.billProd"
                    dense
                    label="Расчетный счет продавца/производителя товара/работы/услуги"
                    mask="#########################"
                    lazy-rules
                    :rules="[
                      val => !!val || 'Введите расчетный счет продавца/производителя товара/работы/услуги',
                      val =>  val.length < 26 || 'Введите не более 25 цифр'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="agreementNumber"
                    square
                    outlined
                    v-model="fullProfile.LoanInfo.consumerLoan.agreementNumber"
                    dense
                    label="Номер договора с продавцом/поставщиком  товара/работы/услуги"
                    lazy-rules
                    :rules="[val => !!val || 'Введите номер договора с продавцом/поставщиком  товара/работы/услуги']"
                  />
                </div>
                <div class="col-4">
                  
                  <q-input
                    ref="agreementDate"
                    outlined
                    square
                    dense
                    label="Дата договора с продавцом/поставщиком товара/работы/услуги"
                    v-model="fullProfile.LoanInfo.consumerLoan.agreementDate"
                    mask="##.##.####"
                    :rules="[
                      val => (val && val.length === 10) || 'Введите дату договора с продавцом/поставщиком товара/работы/услуги',
                      val => msecond(val) < msecond(currentDate) || 
                      'Неверная дата'
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                          ref="qDateContract"
                        >
                          <q-date
                            mask="DD.MM.YYYY"
                            v-model="fullProfile.LoanInfo.consumerLoan.agreementDate"
                            @input="() => $refs.qDateContract.hide()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
             
                </div>
              </div>
            </template>
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
            <div class="row">
              <div 
                class="col-12 uploadFileBlock"
                @drag.prevent.stop 
                @dragstart.prevent.stop 
                @dragend.prevent.stop 
                @dragover.prevent.stop="dragoverFile" 
                @dragenter.prevent.stop="dragenterFile" 
                @dragleave="dragleaveFile($event)" 
                @drop.prevent.stop
                @drop="dropFile($event)"
              >
                <div ref="dragover"></div>
                <q-field
                  ref="uploadFile"
                  :value="!!filesAll.find(file => file.id != null)"
                  :rules="[val => !!val || 'Загрузите файлы']"
                >
                  <div class="uploadFile">
                    <div class="row items-center">
                      <div class="loaderFile" v-if="loaderFile">
                        <appLoader v-if="loaderFile" />
                      </div>
                      <q-btn
                        v-if="files.length && !loaderFile"
                        flat
                        round
                        color="#0054a6"
                        icon="delete_sweep"
                        @click.prevent="removeAllFile()"
                      >
                        <q-tooltip>Удалить все файлы</q-tooltip>
                      </q-btn>
                      <span>Загрузка файлов</span>
                      <input
                        type="file"
                        id="files"
                        ref="files"
                        multiple
                        @change="handleFilesUpload()"
                      />
                    </div>

                    <div>
                      <q-btn
                        flat
                        round
                        color="#0054a6"
                        icon="add_box"
                        @click.prevent="addFiles()"
                      >
                        <q-tooltip>Добавить файл(ы)</q-tooltip>
                      </q-btn>

                      <q-btn
                        v-if="files.length"
                        flat
                        round
                        color="#0054a6"
                        icon="cloud_upload"
                        @click.prevent="submitFiles()"
                      >
                        <q-tooltip>Загрузить файл(ы)</q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </q-field>
                <div class="fileList">
                  <div
                    v-for="(file, index) in filesAll"
                    :key="'file' + index"
                    class="file-listing"
                  >
                    <div class="fileNameBlock">
                      <span class="material-icons fileDownload" v-if="file.id">
                        done
                        <q-tooltip>Файл загружен</q-tooltip>
                      </span>

                      <span
                        class="material-icons fileNotDownload"
                        v-else-if="file.upload"
                      >
                        warning
                        <q-tooltip>Файл не загружен</q-tooltip>
                      </span>

                      <q-input
                        :disable="!!file.id || file.upload"
                        class="fileNameInput"
                        ref="fileName"
                        square
                        outlined
                        v-model="
                          file.DocumentName
                        "
                        dense
                        label="Название файла"
                        :rules="[val => !!val || 'Введите название файла']"
                      />
                      <span class="fileName">{{ file.name }}</span>
                    </div>

                    <div class="loaderFile" v-if="loaderFile && !file.id">
                      <appLoader />
                    </div>

                    <q-btn
                      v-else-if="!loaderFile && !file.id"
                      flat
                      round
                      color="black"
                      icon="clear"
                      @click.prevent="removeFile(index)"
                    >
                      <q-tooltip>Удалить файл</q-tooltip>
                    </q-btn>
                  </div>
                </div>
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
            <template v-if="fullProfile.ApplicationComment.items.length">
              <div 
                class="comments"
                v-for="comment of fullProfile.ApplicationComment.items"
                :key="comment.id"
              >
                <h6 class="tab-content_title">{{comment.CommentPerson}}</h6>
                <!-- <span>{{comment.CommentDate}}</span> -->
                <p>{{comment.Comment}}</p>
              </div>
            </template>

            <!-- <q-separator /> -->

            <div class="row q-col-gutter-md">
              <div class="col">
                <q-input
                  v-model="creditManagerComment"
                  type="textarea"
                  label="Введите комментарий"
                  outlined
                  dense
                />
              </div>
            </div>

            <!-- Add comment-->
            <q-btn
              color="primary"
              label="Оставить комментарий"
              class="q-ml-sm"
              @click="addComment"
            />

          </div>
        </div>

        <!-- file list -->
        <template v-if="fileList.length">
          <!-- Comment -->
          <div class="fileList tab">
            <h4
              class="tab-title"
              ref="fileList"
              @click="toggleForm('fileList')"
            >
              Список документов
            </h4>
            <div class="tab-content" ref="tabContent">
              <ul class="fileBlock">
                <li
                  class="fileLi" 
                  v-for="(fileData, index) of fileList" 
                  :key="index"
                >
                  <p>Название документа {{ index }}</p> 
                  <q-btn 
                      :disable="disable"
                      icon="print" 
                      @click="printFile(fileData)" 
                  >
                    <q-tooltip>Распечатать</q-tooltip>
                  </q-btn>
                </li>
              </ul>
            </div>
          </div>
        </template>

        <div class="submitBlock">
          <!-- Print version button-->
          <q-btn
            @click="onSubmit(false)"
            color="primary"
            label="Версия для печати"
            class="q-ml-sm"
          />

          <!-- Sent data full form to BPM -->
          <!-- <appSentFullProfile /> -->

          <q-btn
            type="submit"
            color="primary"
            label="Оформить кредит"
            class="q-ml-sm"
          />
        </div>
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
      <appFullProfile v-if="profile.confirmCredit" />
    </div>

    <apploaderFullScreen v-if="loader"></apploaderFullScreen>
  </div>
</template>

<script>
import printJS from "print-js";
import CommonUtils from "@/shared/utils/CommonUtils";
import UserService from "@/services/user.service";
import Loader from "@/components/Loader";
import FullProfile from "./FullProfile";
import SentFullProfile from "./SentFullProfile";
import LoaderFullScreen from "@/components/LoaderFullScreen";
// import UploadFiles from "./UploadFiles"
import { validItems, validFilter } from "../../filters/valid_filter"

export default {
  name: "profile",
  data() {
    return {
      currentDate: CommonUtils.dateFilter(new Date()),
      loaderForm: false,
      loaderFile: false,
      disable: false,
      loader: false, // прелодер
      isValid: true, //валидация Email
      sameRegistration: null,
      confirm: false,
      // confirmCredit: false,
      itemName: "",
      itemFunc: null,
      paylod: {},
      bar: false,
      GracePeriodMin: null,
      GracePeriodMax: null,
      creditManagerComment:"",

      options: {
        RepaymentType: [],

        yearsOfIssueVehicle: []
      },

      guaranteeCount: [],
      totalGuaranteesSum: 0, // сумма всех гарантий и поручительств
      files: [], // для сервера, чтоб не дублировать отправку файла
      filesAll: [], // для фильтрации какие файлы загружены на сервер

      fileData: {
        type: "protocol",
        lang: this.$store.getters["common/getLangNum"] - 1, //0 - рус, 1 - узб,
        data: {}
      },

      fileList: [
        {
          protocol_initiative_unit: "",
          protocol_client_inn: "",
          protocol_lending_currency: "",
          protocol_loan_amount: "",
          protocol_repayment_type: "",
          protocol_customer_name: "",
          protocol_term: "",
          protocol_grace_period: "",
          protocol_finance_source: "",
          protocol_loan_product: "",
          protocol_loan_type: "",
          protocol_percent_rate: "",
          protocol_credit_rating: "",
          protocol_request_number: "",
          protocol_loan_specialist_position: "",
          protocol_loan_specialist_fio: "",
          protocol_number: "",
          protocol_filial: "",
          protocol_committee_decision_number: "",
          protocol_committee_decision_date: "",
          protocol_guarantor_name: "",
          protocol_guarantor_value: "",
          protocol_insurance_name: "",
          protocol_insurance_value: "",
          protocol_additional_name: "",
          protocol_additional_value: "",
          protocol_special_name: "",
          protocol_special_value: "",
          protocol_secretary_fio: ""
        },
        {
          protocol_initiative_unit: "",
          protocol_client_inn: "",
          protocol_lending_currency: "",
          protocol_loan_amount: "",
          protocol_repayment_type: "",
          protocol_customer_name: "",
          protocol_term: "",
          protocol_grace_period: "",
          protocol_finance_source: "",
          protocol_loan_product: "",
          protocol_loan_type: "",
          protocol_percent_rate: "",
          protocol_credit_rating: "",
          protocol_request_number: "",
          protocol_loan_specialist_position: "",
          protocol_loan_specialist_fio: "",
          protocol_number: "",
          protocol_filial: "",
          protocol_committee_decision_number: "",
          protocol_committee_decision_date: "",
          protocol_guarantor_name: "",
          protocol_guarantor_value: "",
          protocol_insurance_name: "",
          protocol_insurance_value: "",
          protocol_additional_name: "",
          protocol_additional_value: "",
          protocol_special_name: "",
          protocol_special_value: "",
          protocol_secretary_fio: ""
        }
      ]

    };
  },
  async created() {
    this.$store.commit("profile/resetDataFullFormProfile")

    if (sessionStorage.getItem("csrf_token")) {
      await this.$store.dispatch("credits/setHeaderRole", sessionStorage.getItem("userRole"))
      await this.$store.dispatch("credits/setHeaderBPM", sessionStorage.getItem("csrf_token"))
      this.$store.commit("profile/setDictionaries", JSON.parse(sessionStorage.getItem("dictionaries")))
      this.$store.commit("credits/setTaskId", sessionStorage.getItem("taskId"));
      // console.log('dic', this.dictionaries)
    }
    
    if (this.taskId) {
      this.loaderForm = true
      this.$store.commit("credits/setTaskId", this.taskId);
      
      try {
        const res = await this.$store.dispatch("profile/getFullForm");
        this.setLoan(this.fullProfile.LoanInfo.LoanProduct)
        console.log('resggggggggggggggggggggg', res)
        const { data } = res.data.input.find(i => i.label == 'application')
        const uploadedFiles = data.AttachedDocuments.items
        const guarantees = data.Guarantee

        for (let file of uploadedFiles) {
          this.filesAll.push({
            name: "",
            DocumentName: file.DocumentName,
            id: file.id,
            upload: true
          });
        }

        for (let guarantee in guarantees) {
          //console.log('hhhhhhhhhhh', guarantees[guarantee].items)
          for (let i of guarantees[guarantee].items) {
            this.guaranteeCount.push("guarantee")
          }
        }
        //this.guaranteesValid()
        this.loaderForm = false
      } catch (error) {
        console.log('ERROR', error)
        this.loaderForm = false
      }
    } 
    
  },
  mounted() {
    if (!this.taskId) {
      this.Customer.FirstName = this.personalData.name;
      this.Customer.LastName = this.personalData.surname;
      this.Customer.MiddleName = this.personalData.mname;
      this.Customer.INN = this.personalData.inn;
      this.Customer.PhoneList.items[0].Number = this.personalData.phone;
      this.Customer.PINPP = this.personalData.pinpp;
      this.Customer.Document.Series = this.personalData.passport.slice(
        0,
        2
      );
      this.Customer.Document.Number = this.personalData.passport.slice(
        2
      );

      this.Customer.MaritalStatus = this.personalData.familyStatus

      this.Customer.hasChildren = this.personalData.children;
      this.Customer.UnderAgeChildrenNum = this.personalData.childrenCount;

      this.Customer.MonthlyIncome.confirmMonthlyIncome = this.personalData.income;
      this.Customer.MonthlyExpenses.recurringExpenses = this.personalData.expense;
      this.Customer.MonthlyExpenses.obligations = this.personalData.otherExpenses;
      this.Customer.MonthlyIncome.hasAdditionalIncome = this.personalData.externalIncome;
      this.Customer.MonthlyIncome.additionalIncome.sum = this.personalData.externalIncomeSize;
      this.Customer.MonthlyIncome.additionalIncome.incomeType = this.personalData.additionalIncomeSource;

      this.fullProfile.LoanInfo.LoanProduct = this.personalData.typeCredit;
      this.fullProfile.LoanInfo.RepaymentType = this.personalData.typeStepCredit;
      this.fullProfile.LoanInfo.TermInMonth = this.personalData.periodCredit;
      this.setLoan(this.fullProfile.LoanInfo.LoanProduct)
    }
  },
  computed: {
    fullProfile() {
      console.log(this.$store.getters["profile/profile"].fullFormProfile)
      return this.$store.getters["profile/profile"].fullFormProfile
    },

    Customer() {
      return this.$store.getters["profile/profile"].fullFormProfile.Customer
    },

    dictionaries() {
      return this.$store.getters["profile/profile"].dictionaries
    },

    profile() {
      return this.$store.getters["profile/profile"]
    },

    personalData() {
      console.log('personalData', this.$store.getters["credits/credits"].personalData)
      return this.$store.getters["credits/credits"].personalData
    },

    credits() {
      return this.$store.getters["credits/credits"]
    },

    preApprovalData() {
      return this.$store.getters["credits/credits"].preApprovalData;
    },
    taskId() {
      return this.$route.query.taskId
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
        this.removeRegistration({ item: "Адрес фактического проживания" });
        this.sameRegistration = null
      } 
      // else {
      //   this.addRegistration("Адрес фактического проживания");
      // }
    }
  },
  methods: {
    async onSubmit(submitForm = true) {

      console.log("fullProfile", this.$store.state.profile);
      console.log("submit", submitForm);

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
      this.$refs.passportIssuedBy.validate();

      this.$refs.education.validate();

      validFilter(this.$refs, "phonesValid", "phones");

      // Address
      validFilter(this.$refs, "regionValid", "region");
      validFilter(this.$refs, "streetValid", "street");
      validFilter(this.$refs, "houseNumberValid", "houseNumber");

      validFilter(this.$refs, "relativesValid", "relatives");
      validFilter(this.$refs, "relativesSurnameValid", "relatives_surname");
      validFilter(this.$refs, "relativesNameValid", "relatives_name");
      validFilter(this.$refs, "relativesMnameValid", "relatives_mname");
      validFilter(this.$refs, "relativesBirthdayValid", "relatives_birthday");
      validFilter(this.$refs, 
        "relativesPasportSeriesValid",
        "relatives_pasportSeries"
      );
      validFilter(this.$refs, 
        "relativesPasportNumberValid",
        "relatives_pasportNumber"
      );
      validFilter(this.$refs, "relativesPasportDateStartValid", "relatives_pasportDateStart");
      validFilter(this.$refs, "relativesPasportDateFinishValid", "relatives_pasportDateFinish");
      validFilter(this.$refs, "relativesPassportIssuedByValid", "relatives_passportIssuedBy");

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
        validItems(this.$refs, "nameOfEmployer");
        validItems(this.$refs, "innOfEmployer");
        validItems(this.$refs, "typeOrganization");
        validItems(this.$refs, "amountWorkes");
        validItems(this.$refs, "position");
        validItems(this.$refs, "positionCategory");
        validItems(this.$refs, "workExperience");
        validItems(this.$refs, "totalWorkExperience");
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
        validItems(this.$refs, "activityPeriod");
        validItems(this.$refs, "typeOrganization2");
      }

      this.$refs.income.validate();

      // Properties
      if (this.Customer.PropertyInformation.Realty_new.items.length) {
        validFilter(this.$refs, "typePropertiesValid", "typeProperties");
        validFilter(this.$refs, "regionsPropertiesValid", "regionsProperties");
        validFilter(this.$refs, "pricesPropertiesValid", "pricesProperties");
      } else {
        validItems(this.$refs, "typePropertiesValid");
        validItems(this.$refs, "regionsPropertiesValid");
        validItems(this.$refs, "pricesPropertiesValid");
      }

      //Vehicles
      if (this.Customer.PropertyInformation.Transport_new.items.length) {
        validFilter(this.$refs, "typeVehiclesValid", "typeVehicles");
        validFilter(this.$refs, "vehicleBrandsValid", "vehicleBrands");
        validFilter(this.$refs, "yearsOfIssueValid", "yearsOfIssue");
        validFilter(this.$refs, "priceVehiclesValid", "priceVehicles");
      } else {
        validItems(this.$refs, "typeVehiclesValid");
        validItems(this.$refs, "vehicleBrandsValid");
        validItems(this.$refs, "yearsOfIssueValid");
        validItems(this.$refs, "priceVehiclesValid");
      }

      if (this.fullProfile.Guarantee.RelatedPerson.items.length) {
        validFilter(this.$refs, "customersAttitudeValid", "customersAttitude");
        validFilter(this.$refs, "priceGuaranteesValid", "priceGuarantees");
        validFilter(this.$refs, "surnameGuaranteesValid", "surnameGuarantees");
        validFilter(this.$refs, "nameGuaranteesValid", "nameGuarantees");
        validFilter(this.$refs, "mnameGuaranteesValid", "mnameGuarantees");
        validFilter(this.$refs, "birthdayGuaranteesValid", "birthdayGuarantees");
        validFilter(this.$refs, "innGuaranteesValid", "innGuarantees");
        validFilter(this.$refs, "pinppGuaranteesValid", "pinppGuarantees");
        validFilter(this.$refs, 
          "pasportSeriesGuaranteesValid",
          "pasportSeriesGuarantees"
        );
        validFilter(this.$refs, 
          "pasportNumberGuaranteesValid",
          "pasportNumberGuarantees"
        );
        validFilter(this.$refs, "pasportDateGuaranteesStartValid", "pasportDateGuaranteesStart");
        validFilter(this.$refs, "pasportDateGuaranteesFinishValid", "pasportDateGuaranteesFinish");
        validFilter(this.$refs, "passportIssuedByGuaranteesValid", "passportIssuedByGuarantees");
        validFilter(this.$refs, "regionGuaranteesValid", "regionGuarantees");
        validFilter(this.$refs, "streetGuaranteesValid", "streetGuarantees");
        validFilter(this.$refs, "houseNumberGuaranteesValid", "houseNumberGuarantees");
        validFilter(this.$refs, "phonesGuaranteesValid", "phonesGuarantees");
      } else {
        validItems(this.$refs, "customersAttitudeValid");
        validItems(this.$refs, "priceGuaranteesValid");
        validItems(this.$refs, "surnameGuaranteesValid");
        validItems(this.$refs, "nameGuaranteesValid");
        validItems(this.$refs, "mnameGuaranteesValid");
        validItems(this.$refs, "birthdayGuaranteesValid");
        validItems(this.$refs, "innGuaranteesValid");
        validItems(this.$refs, "pinppGuaranteesValid");
        validItems(this.$refs, "pasportSeriesGuaranteesValid");
        validItems(this.$refs, "pasportNumberGuaranteesValid");
        validItems(this.$refs, "pasportDateGuaranteesStartValid");
        validItems(this.$refs, "pasportDateGuaranteesFinishValid");
        validItems(this.$refs, "passportIssuedByGuaranteesValid");
        validItems(this.$refs, "regionGuaranteesValid");
        validItems(this.$refs, "streetGuaranteesValid");
        validItems(this.$refs, "houseNumberGuaranteesValid");
        validItems(this.$refs, "phonesGuaranteesValid");
      }

      if (this.fullProfile.Guarantee.RelatedLegalPerson.items.length) {
        validFilter(this.$refs, "priceGuaranteesValid", "priceGuarantees");
        validFilter(this.$refs, "nameGuaranteesValid", "nameGuarantees");
        validFilter(this.$refs, "innGuaranteesValid", "innGuarantees");
        validFilter(this.$refs, 
          "kindOfActivityGuaranteesValid",
          "kindOfActivityGuarantees"
        );
        validFilter(this.$refs, "regionGuaranteesValid", "regionGuarantees");
        validFilter(this.$refs, "streetGuaranteesValid", "streetGuarantees");
        validFilter(this.$refs, "houseNumberGuaranteesValid", "houseNumberGuarantees");
        validFilter(this.$refs, "phonesGuaranteesValid", "phonesGuarantees");
      } else {
        validItems(this.$refs, "priceGuaranteesValid");
        validItems(this.$refs, "nameGuaranteesValid");
        validItems(this.$refs, "innGuaranteesValid");
        validItems(this.$refs, "kindOfActivityGuaranteesValid");
        validItems(this.$refs, "regionGuaranteesValid");
        validItems(this.$refs, "streetGuaranteesValid");
        validItems(this.$refs, "houseNumberGuaranteesValid");
        validItems(this.$refs, "phonesGuaranteesValid");
      }

      if (this.fullProfile.Guarantee.Insurance.items.length) {
        validFilter(this.$refs, "nameGuaranteesValid", "nameGuarantees");
        validFilter(this.$refs, "innGuaranteesValid", "innGuarantees");
        validFilter(this.$refs, "priceGuaranteesValid", "priceGuarantees");
      } else {
        validItems(this.$refs, "priceGuaranteesValid");
        validItems(this.$refs, "nameGuaranteesValid");
        validItems(this.$refs, "innGuaranteesValid");
      }

      this.$refs.productCredit.validate();
      this.$refs.priceCredit.validate();

      // this.$refs.periodRepayment.validate();
      this.$refs.comfortablePeriodRepayment.validate();
      this.$refs.comfortableDayRepayment.validate();
      // this.$refs.typeCredit.validate();
      this.$refs.purposeCredit.validate();
      this.$refs.sourceFinancs.validate();

      //если потребительский кредит
      if (this.fullProfile.LoanInfo.LoanProduct == 2) {
        this.$refs.nameProduction.validate();
        this.$refs.productName.validate();
        this.$refs.nameBankProd.validate();
        this.$refs.billProd.validate();
        this.$refs.agreementNumber.validate();
        this.$refs.agreementDate.validate();
      } else {
        validItems(this.$refs, "nameProduction");
        validItems(this.$refs, "productName");
        validItems(this.$refs, "nameBankProd");
        validItems(this.$refs, "billProd");
        validItems(this.$refs, "agreementNumber");
        validItems(this.$refs, "agreementDate");
      }

      //если не овердрафт
      if (!!this.fullProfile.LoanInfo.LoanProduct && this.fullProfile.LoanInfo.LoanProduct !== 3) {
        this.$refs.typeRepayment.validate();
        this.$refs.initialFee.validate();
      } else {
        validItems(this.$refs, "typeRepayment");
        validItems(this.$refs, "initialFee");
      }

      if (!this.fullProfile.AttachedDocuments.items.length) {
        
        this.$refs.uploadFile.validate();
      } else {
        validItems(this.$refs, "uploadFile");
      }

      if (!this.fullProfile.Guarantee.Insurance.items.length ||
          !this.fullProfile.Guarantee.RelatedLegalPerson.items.length ||
          !this.fullProfile.Guarantee.RelatedPerson.items.length 
        ) {
          this.guaranteesValid()
      } else {
        validItems(this.$refs, "guaranteesValid");
        
      }
      
      console.log('files', this.$refs.files);

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
        this.$refs.passportIssuedBy.hasError ||
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
        this.$refs.relativesPasportDateStartValid.hasError ||
        this.$refs.relativesPasportDateFinishValid.hasError ||
        this.$refs.relativesPassportIssuedByValid.hasError ||
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
        this.$refs.kindOfActivityGuaranteesValid.hasError ||
        this.$refs.pinppGuaranteesValid.hasError ||
        this.$refs.pasportSeriesGuaranteesValid.hasError ||
        this.$refs.pasportNumberGuaranteesValid.hasError ||
        this.$refs.pasportDateGuaranteesStartValid.hasError ||
        this.$refs.pasportDateGuaranteesFinishValid.hasError ||
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
        this.$refs.comfortableDayRepayment.hasError ||
        // this.$refs.typeCredit.hasError ||
        this.$refs.initialFee.hasError ||
        this.$refs.purposeCredit.hasError ||
       
        // если потребительский кредит
        this.$refs.nameProduction.hasError ||
        this.$refs.productName.hasError ||
        this.$refs.nameBankProd.hasError ||
        this.$refs.billProd.hasError ||
        this.$refs.agreementNumber.hasError ||
        this.$refs.agreementDate.hasError ||

        this.$refs.sourceFinancs.hasError ||
        this.$refs.uploadFile.hasError ||
        this.$refs.guaranteesValid.hasError
      ) {
        this.formHasError = true;
        this.bar = true;
      } else {
        
        if (submitForm) {
        this.loader = true;
        this.fullProfile.ClientManagerLogin = this.$store.getters["auth/username"]
        console.log("fullProfile", this.$store.state.profile.fullFormProfile);
        const {
          Status,
          // ApplicationID,
          // ProtocolNumber,
          // Number,
          // Branch,
          BODecision,
          // FinalDecision,
          // Date,
          BOLogin,
          // Department,
          ClientManagerLogin,
          CreditCommiteeDecisions,
          Customer,
          Guarantee,
          LoanInfo,
          ApplicationComment,
          AttachedDocuments,
        } = this.fullProfile;

        console.log('Customer', Customer)
        //ClientManagerLogin = "man"
        Customer.FullName = `${Customer.LastName} ${Customer.FirstName} ${Customer.MiddleName}`
        Customer.Document.Number = Number(Customer.Document.Number)
        Customer.Relatives.items.map(i => i.Document.Number = Number(i.Document.Number))
        Guarantee.RelatedPerson.items.map(i => i.Document.Number = Number(i.Document.Number))
        //LoanInfo.RepaymentType = Number(LoanInfo.RepaymentType)

        // удалил из объекта - Date!!!
        const data = {
          output: [
            {
              name: "application",
              data: {
                Status,
                // ApplicationID,
                // ProtocolNumber,
                // Number,
                // Branch,
                BODecision,
                // FinalDecision,
                BOLogin,
                // Department,
                ClientManagerLogin,
                CreditCommiteeDecisions,
                Customer,
                Guarantee,
                LoanInfo,
                ApplicationComment,
                AttachedDocuments,
              },
            },
          ],
        };

        console.log(JSON.stringify(data, null, 2));

        try {
          const res = await this.$store.dispatch("credits/confirmationCredit", data);
          console.log("response", JSON.stringify(res, null, 2));
          //console.log('nextTaskId', res.nextTask.id)

          if (res.nextTask.id) {
            sessionStorage.removeItem("csrf_token");
            this.$store.commit('credits/setMessage', 'Credit complete')
            this.$router.push("/work/credit")
          } else {
            throw 'Next task id is undefined'
          }
          this.loader = false;
        } catch (error) {
          this.loader = false;
          const errorMessage = CommonUtils.filterServerError(error);
          this.$store.commit("credits/setMessage", errorMessage);
          sessionStorage.clear()
          this.$router.push("/work/credit");
        }
        } else {
          this.profile.confirmCredit = true;
        }
      }
    },

    validDatePerson(date) {

      if (this.Customer.Document.ExpirationDate) {
        this.$refs.pasportDateFinish.validate()
      }

      if (this.Customer.Document.GivenDate) {
        this.$refs.pasportDateStart.validate()
      }
    },

    validDateRelatives(date, idx) {

      if (this.Customer.Relatives.items[idx].Document.ExpirationDate) {
        this.$refs.relatives_pasportDateFinish[idx].validate()
      }

      if (this.Customer.Relatives.items[idx].Document.GivenDate) {
        this.$refs.relatives_pasportDateStart[idx].validate()
      }
    },

    validDateGuarantees(date, idx) {
      console.log(date)
      if (this.fullProfile.Guarantee.RelatedPerson.items[idx].Document.ExpirationDate) {
        this.$refs.pasportDateGuaranteesFinish[idx].validate()
      } 
      if (this.fullProfile.Guarantee.RelatedPerson.items[idx].Document.GivenDate) {
        this.$refs.pasportDateGuaranteesStart[idx].validate()
      }
    }, 

    onChangeLoan(credit) {
      console.log("Аннуит, диффер")
      this.fullProfile.LoanInfo.RepaymentType = null;
      this.options.RepaymentType = [];

      // для синхронизации с Preapprov
      // if (this.personalData.typeStepCredit) {
      //   this.fullProfile.LoanInfo.RepaymentType = this.personalData.typeStepCredit
      //   this.personalData.typeStepCredit = null
      // }

      this.fullProfile.LoanInfo.consumerLoan = {
          nameBankProd: "",    // Наименование банка
          nameService: "",     // Наименование товара/работы/услуги
          agreementDate: "",   // Дата договора
          nameProduction: "",  // Наименование продавца
          billProd: "",        // Расчетный счет продавца
          agreementNumber: "", // Номер договора
          idBankProd: 0
        }
      this.fullProfile.LoanInfo.InitialPayment = 0

      this.setLoan(credit)
    },

    setLoan(credit) {
      console.log('credit', credit)
      const idx = this.dictionaries.LoanDetails.items.findIndex(
        item => item.LOAN_ID == credit
      );
      console.log('idx', idx);
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
        this.options.RepaymentType = this.dictionaries.LoanDetails.items[
          idx
        ].PaymentsType.items;

        this.GracePeriodMin = this.dictionaries.LoanDetails.items[
          idx
        ].GracePeriodMin;
        this.GracePeriodMax = this.dictionaries.LoanDetails.items[
          idx
        ].GracePeriodMax;

        // this.fullProfile.LoanInfo.MaxDefferalRepaymentPeriod = this.fullProfile.LoanInfo.GracePeriodMin;
        this.fullProfile.LoanInfo.MaxDefferalRepaymentPeriod = this.GracePeriodMin;
      }
    },

    setDistricts(event, idx, item) {
        console.log('event', event, idx, item)
        const districts = this.getDistricts(event)
        this.$store.commit("profile/setDistricts", {idx, item, districts})
    },

    setDistrictsGuarantee(event, idx, guarantee) {
        //console.log('event', event, idx, guarantee)
        const districts = this.getDistricts(event)
        this.$store.commit("profile/setDistrictsGuarantee", {idx, guarantee, districts})
    },

    getDistricts(id) {
      const { region_id } = this.dictionaries.Region.items.find(i => i.value == id)
      return this.dictionaries.Districts.items[0][region_id]
    },

    addPhone() {
      this.$store.commit("profile/addPhone");
    },

    addPhoneGuarantee(index) {
      this.$store.commit("profile/addPhoneGuarantee", index);
    },

    addProperty() {
      this.$store.commit("profile/addProperty");
    },

    addVehicle() {
      for (let i = 1980; i <= new Date().getFullYear(); i++) {
        this.options.yearsOfIssueVehicle.push(i);
      }

      this.$store.commit("profile/addVehicle");
    },

    addInsurance(guarantee) {
      this.guaranteeCount.push(guarantee)
      this.$store.commit("profile/addInsurance");
    },

    addRelatedLegalPerson(guarantee) {
      this.guaranteeCount.push(guarantee)
      this.$store.commit("profile/addRelatedLegalPerson");
    },

    addRelatedPerson(guarantee) {
      this.guaranteeCount.push(guarantee)
      this.$store.commit("profile/addRelatedPerson");
    },

    removeItem(payload) {
      this.$store.commit("profile/removeItem", payload);
    },

    removeGuarantee(payload) {
      this.guaranteeCount.pop()
      this.$store.commit("profile/removeGuarantee", payload);
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
      this.$store.commit("profile/removePhoneGuarantee", payload);
    },

    addRegistration(AddressType) {
      this.$store.commit("profile/addRegistration", AddressType);
    },

    removeRegistration(payload) {
      this.$store.commit("profile/removeRegistration", payload);
    },

    addRelative() {
      this.$store.commit("profile/addRelative");
    },

    removeProperty(payload) {
      this.$store.commit("profile/removeProperty", payload);
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
    },

    dropFile(event) {
      this.$refs.dragover.classList.remove('dragover')
      let uploadedFiles = event.dataTransfer.files;
      console.log('uploadFile', uploadedFiles)
      // e.dataTransfer.files
      this.uploadFile(uploadedFiles)
    },

    dragoverFile() {
      this.$refs.dragover.classList.add('dragover')
    },

    dragenterFile() {
      this.$refs.dragover.classList.add('dragover')
    },

    dragleaveFile(event) {
      let fileBlock = this.$refs.dragover.getBoundingClientRect()
      
      if ((event.pageX < fileBlock.left) || 
        (event.pageX > fileBlock.right) || 
        (event.pageY < fileBlock.top) || 
        (event.pageY > fileBlock.bottom)) {
        this.$refs.dragover.classList.remove('dragover')
      };
    },

    handleFilesUpload() {
      this.loaderFile = false;
      let uploadedFiles = this.$refs.files.files;
      console.log('uploadFile', uploadedFiles)
      this.uploadFile(uploadedFiles)
    },

    uploadFile(uploadedFiles) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
        this.filesAll.push({
          name: uploadedFiles[i].name,
          DocumentName: "",
          id: null,
          upload: false
        });
      }

      console.log("files", this.files);
      console.log("filesAll", this.filesAll);
    },

    async submitFiles() {
      validFilter(this.$refs, "fileNameValid", "fileName");
      if (this.$refs.fileNameValid.hasError) {
        this.formHasError = true;
        this.bar = true;
      } else {
        this.loaderFile = true;

        let formData = new FormData();
        let onlyNullId = this.filesAll.filter(i => i.id === null)
       
        for (let i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          let documentTypes = onlyNullId[i].DocumentName
          formData.append("files", file);
          formData.append("documentTypes", documentTypes);
        }

        console.log('formData', formData.getAll("files"))

        try {
          const response = await this.$store.dispatch("profile/uploadFiles", formData);
          console.log('resFile', response)
          if (response) {
            this.files = []; // удалить все файлы после загрузки на сервер
            this.loaderFile = false;
            for (let el of response.infos) {
              const item = this.filesAll.find(i => i.id === null)
              item.id = Number(el.id)
            }
          } else {
            this.loaderFile = false;

            // el.upload = true; // загрузка была, но прошла не удачна
            this.filesAll
                .filter(i => i.id === null)
                .map(i => i.upload = true)
          }
        } catch (error) {}
      }

      // удалить все не загруженные файлы перед отправкой на сервер!!!!
      this.fullProfile.AttachedDocuments.items = this.filesAll.filter(i => i.id !== null)
                                                              .map(i => i = {
                                                                    id: i.id,
                                                                    DocLink: "",
                                                                    DocumentName: i.DocumentName
                                                                  })
      console.log("document", this.fullProfile.AttachedDocuments)
    },

    removeAllFile() {
      this.files = [];
      const uploadFiles = this.filesAll.filter(i => i.id !== null);
      this.filesAll = uploadFiles;
    },

    removeFile(key) {
      this.files.splice(key - (this.filesAll.length - this.files), 1);
      this.filesAll.splice(key, 1);
    },

    addFiles() {
      this.$refs.files.click();
    },

    addComment() {
      const comment = {
              Comment: this.creditManagerComment,
              Type: "",
              CommentPerson: this.$store.getters["auth/username"],
              //id: 0,
              //CommentDate: ""
            }

      this.$store.commit("profile/addComment", {commentBlock: "ApplicationComment", comment})
      this.creditManagerComment = ""
      console.log('comments', this.fullProfile.ApplicationComment)
    },
    msecond(val) {
      return new Date(val.slice(-4) + val.slice(2, 6) + val.slice(0, 2))
    },

    adulthoodValid(date) {
      return (this.msecond(this.currentDate) - this.msecond(date) - 432000000)/1000/60/60/24/365 > 18 // с учетом высокосных годов (4)
    },

    guaranteesValid() {
      this.totalGuaranteesSum = 0

      for (let guarantee in this.fullProfile.Guarantee) {
        for (let i of this.fullProfile.Guarantee[guarantee].items) {
          this.totalGuaranteesSum = this.totalGuaranteesSum + i.Sum
        }
      }

      console.log('totalGuaranteesSum',this.totalGuaranteesSum)
      this.$refs.guaranteesValid.validate();
    },

    async printFile(fileData) {
      this.disable = true
      this.fileData.data = fileData
      try {
        console.log(JSON.stringify(this.fileData, null, 2))

        const file = await this.$store.dispatch(
          "credits/getFile",
          this.fileData
        );

        console.log('file', file)

        printJS(file.url);

        this.disable = false
      } catch(error) {
        this.disable = false
      }
    },

    filterFn (val, update) {
      console.log('filterFn', val)
      // if (val === '') {
      //   update(() => {
      //     this.options = stringOptions
      //   })
      //   return
      // }

      // update(() => {
      //   const needle = val.toLowerCase()
      //   this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      // })
    }
  },
  components: {
    appLoader: Loader,
    appFullProfile: FullProfile,
    appSentFullProfile: SentFullProfile,
    apploaderFullScreen: LoaderFullScreen
    // appUploadFiles: UploadFiles
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
      color: #212121;
    }

    .q-field--auto-height .q-field__control-container {
      display: block;
    }
  }

  .guarantees {
      .q-field__control {
        color: rgba(0, 0, 0, 0.87);
      }

      .q-field--auto-height .q-field__control, .q-field--auto-height, .q-field__native {
        min-height: 40px;
      }

      .q-field--standard .q-field__control:after {
        border-width: 0;
        height: 0;
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

  .commentCredit{
    margin-bottom: 20px;
  }

  // file
  .uploadFileBlock {
    position: relative;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    vertical-align: top;
    background: #fff;
    position: relative;
    min-height: 150px;
    margin-bottom: 10px;
    padding-bottom: 10px;

    .dragover {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      outline: 2px dashed #5d5d5d;
      background-color: #fafafa61;
      outline-offset: -17px;
      z-index: 10;
    }
  }

  .uploadFile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-left: 10px;
    background: #ededed;
    font-weight: 600;
    color: #1360ac;
  }

  .fileNameBlock {
  }

  .loaderFile {
    font-size: 20px;
    margin-right: 10px;
  }

  .fileDownload,
  .fileNotDownload {
    margin-right: 10px;
    font-size: 40px;
  }

  .fileDownload {
    color: green;
  }

  .fileNotDownload {
    color: red;
  }

  .fileName {
    font-weight: 600;
    padding: 9px;
  }

  .fileNameInput.q-field--square .q-field__control {
    width: 300px;
    border-radius: 5px !important;
    border: 1px solid #3a3a3a;
    background: #fff;
    outline: 0;
  }

  input[type="file"] {
    // opacity: 0;
    display: none;
    //position: absolute;
    // top: -500px;
  }

  .file-listing {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    padding: 16px 0 0 16px;
    margin-bottom: 10px;
    border: 1px solid #e0e0e0;
    background: #f5f5f5;
    border-radius: 5px;
  }

  .file-listing > div {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  span.remove-file {
    color: red;
    cursor: pointer;
    float: right;
  }

  .fileBlock {
    padding-left: 15px;
    .fileLi {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
  }
  
  .submitBlock {
    margin-top: 20px;
  }
}
</style>
