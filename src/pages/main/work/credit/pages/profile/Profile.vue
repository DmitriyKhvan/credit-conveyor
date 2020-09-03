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
                  disable
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
                  disable
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
                  disable
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
                  :disable="disableField"
                  ref="birthday"
                  outlined
                  square
                  dense
                  label="Дата рождения"
                  v-model="Customer.BirthDate"
                  mask="##.##.####"
                  :rules="[
                    val =>
                      (val && val.length === 10) || 'Введите дату рождения',
                    val => adulthoodValid(val) || 'Несовершеннолетний'
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

              <div class="col-4">
                <!-- <q-select
                  :disable="disableField"
                  ref="Country"
                  square
                  outlined
                  v-model="Customer.Country"
                  :options="dictionaries.Countries.items"
                  dense
                  label="Страна рождения"
                  :rules="[val => !!val || 'Выберите страну']"
                  emit-value
                  map-options
                  class="q-pb-sm"
                /> -->

                <q-select
                  :disable="disableField"
                  ref="Country"
                  square
                  outlined
                  v-model="Customer.Country"
                  use-input
                  input-debounce="0"
                  label="Страна рождения"
                  :options="options.Countries"
                  dense
                  @filter="filterFn"
                  behavior="menu"
                  :rules="[val => !!val || val === 0 || 'Выберите страну']"
                  emit-value
                  map-options
                  class="q-pb-sm"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Нет такой страны
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>

              <div class="col-4">
                <q-input
                  :disable="disableField"
                  ref="BirthCity"
                  square
                  outlined
                  v-model="Customer.BirthCity"
                  dense
                  label="Место рождения"
                  :rules="[val => !!val || 'Введите место рождения']"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  disable
                  ref="inn"
                  square
                  outlined
                  v-model="Customer.INN"
                  dense
                  label="ИНН"
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
                  disable
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
                  :disable="disableField"
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
              <div class="col-4">
                <q-select
                  disable
                  ref="documentType"
                  square
                  outlined
                  v-model="Customer.Document.documentType"
                  :options="dictionaries.DocumentType.items"
                  dense
                  label="Вид документа"
                  emit-value
                  map-options
                  class="q-pb-sm"
                  :rules="[val => !!val || 'Выберите вид документа']"
                />
              </div>

              <div v-if="Customer.Document.documentType == 7" class="col-4">
                <q-input
                  :disable="disableField"
                  ref="DocumentName"
                  square
                  outlined
                  v-model="Customer.Document.DocumentName"
                  dense
                  label="Наименование документа"
                  :rules="[val => !!val || 'Введите наименование документа']"
                />
              </div>

              <div class="col-4">
                <q-input
                  disable
                  ref="DocumentSeries"
                  square
                  outlined
                  v-model="Customer.Document.Series"
                  dense
                  label="Серия документа"
                  mask="AA"
                  :rules="[
                    val =>
                      (val && val.length === 2) || 'Введите серию документа'
                  ]"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  disable
                  ref="DocumentNumber"
                  square
                  outlined
                  v-model="Customer.Document.Number"
                  dense
                  label="Номер документа"
                  mask="#######"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length === 7) || 'Введите номер документа'
                  ]"
                />
              </div>

              <div class="col-4">
                <q-select
                  :disable="disableField"
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
                  :disable="disableField"
                  ref="DocumentGivenDate"
                  outlined
                  square
                  dense
                  label="Дата выдачи документа"
                  v-model="Customer.Document.GivenDate"
                  mask="##.##.####"
                  :rules="[
                    val =>
                      (val && val.length === 10) ||
                      'Введите дату выдачи документа',

                    Customer.Document.ExpirationDate
                      ? val =>
                          msecond(val) <
                            msecond(Customer.Document.ExpirationDate) ||
                          'Неверная дата'
                      : null,

                    val =>
                      msecond(val) < msecond(currentDate) || 'Неверная дата'
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
                          @input="
                            $event => {
                              $refs.qDatePasportDateStart.hide();
                              validDatePerson($event);
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
                  :disable="disableField"
                  ref="DocumentExpirationDate"
                  outlined
                  square
                  dense
                  label="Дата окончания действия документа"
                  v-model="Customer.Document.ExpirationDate"
                  mask="##.##.####"
                  :rules="[
                    val =>
                      (val && val.length === 10) ||
                      'Введите дату окончания действия документа',
                    Customer.Document.GivenDate
                      ? val =>
                          msecond(val) > msecond(Customer.Document.GivenDate) ||
                          'Неверная дата'
                      : null,
                    val =>
                      msecond(val) > msecond(currentDate) || 'Неверная дата'
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
                          @input="
                            $event => {
                              $refs.qDatePasportDateFinish.hide();
                              validDatePerson($event);
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
                <q-select
                  :disable="disableField"
                  ref="DocumentRegionsGivenPlace"
                  square
                  outlined
                  v-model="Customer.Document.Region"
                  @input="setGivenPlace($event, null, 'Document')"
                  :options="dictionaries.Region.items"
                  dense
                  label="Регион/область выдачи документа"
                  :rules="[val => !!val || 'Выберите регион/область']"
                  emit-value
                  map-options
                  class="q-pb-sm"
                />
              </div>
              <div class="col-4">
                <!-- <q-input
                  :disable="disableField"
                  ref="DocumentGivenPlace"
                  square
                  outlined
                  v-model="Customer.Document.GivenPlace"
                  dense
                  label="Кем выдан документ"
                  :rules="[
                    val => !!val || 'Введите кем выдан документ',
                    val => givenPlaceValid(val)
                  ]"
                /> -->

                <q-select
                  :disable="disableField"
                  ref="DocumentGivenPlace"
                  square
                  outlined
                  v-model="Customer.Document.GivenPlace"
                  :options="Customer.Document.Districts.items"
                  dense
                  label="Кем выдан документ (ИИБ)"
                  :rules="[val => !!val || 'Введите кем выдан документ (ИИБ)']"
                  emit-value
                  map-options
                  class="q-pb-sm"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-select
                  :disable="disableField"
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
                    :disable="(index === 0 ? true : false) || disableField"
                    ref="phones"
                    square
                    outlined
                    v-model="phone.Number"
                    dense
                    label="Тел. номер"
                    mask="+############"
                    :rules="[
                      val =>
                        (val && val.length === 13) || 'Введите номер телефона',
                      val => phoneValid(val)
                    ]"
                  />
                </div>
              </div>

              <q-btn
                :disable="disableField"
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
              :disable="disableField"
              color="primary"
              label="Добавить номер телефона"
              @click="addPhone"
              class="addItem"
            ></q-btn>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  :disable="disableField"
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
                      :disable="disableField"
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
                  <!-- <div class="col-4">
                    <q-input
                      :disable="address.flag || disableField"
                      square
                      outlined
                      v-model="address.PostalCode"
                      dense
                      label="Индекс"
                      mask="######"
                    />
                  </div> -->

                  <div class="col-4">
                    <q-select
                      :disable="address.flag || disableField"
                      :ref="address.flag ? '' : 'region'"
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
                      :disable="address.flag || disableField"
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
                      ref="district"
                      :disable="address.flag || disableField"
                      square
                      outlined
                      v-model="address.District"
                      :options="address.Districts.items"
                      dense
                      label="Район"
                      :rules="[val => !!val || 'Выберите район']"
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
                      :disable="address.flag || disableField"
                      :ref="address.flag ? '' : 'street'"
                      square
                      outlined
                      v-model="address.Street"
                      dense
                      label="Улица / Мкр."
                      :rules="[
                        val => !!val || 'Введите наименование улицы / мкр.'
                      ]"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      :disable="address.flag || disableField"
                      :ref="address.flag ? '' : 'houseNumber'"
                      square
                      outlined
                      v-model="address.House"
                      dense
                      label="Номер дома"
                      :rules="[val => !!val || 'Введите номер дома']"
                    />
                  </div>
                  <!-- <div class="col-4">
                    <q-input
                      :disable="address.flag || disableField"
                      square
                      outlined
                      v-model="address.Block"
                      dense
                      label="Корпус"
                    />
                  </div> -->
                </div>

                <div class="row q-col-gutter-md">
                  <!-- <div class="col-4">
                    <q-input
                      :disable="address.flag || disableField"
                      square
                      outlined
                      v-model="address.Building"
                      dense
                      label="Строение"
                    />
                  </div> -->
                  <div class="col-4">
                    <q-input
                      :disable="address.flag || disableField"
                      square
                      outlined
                      v-model="address.Apartment"
                      dense
                      label="Номер квартиры"
                    />
                  </div>
                  <div class="col-4">
                    <q-select
                      :disable="address.flag || disableField"
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
                :disable="disableField"
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
                :disable="disableField"
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
                  disable
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
                  disable
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
                  disable
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
                    :disable="disableField"
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
                    :disable="disableField"
                    ref="relatives_surname"
                    square
                    outlined
                    v-model="relative.LastName"
                    dense
                    label="Фамилия"
                    :rules="[
                      val => !!val || 'Введите фамилию',
                      val => fioValid(val)
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    :disable="disableField"
                    ref="relatives_name"
                    square
                    outlined
                    v-model="relative.FirstName"
                    dense
                    label="Имя"
                    :rules="[
                      val => !!val || 'Введите имя',
                      val => fioValid(val)
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    :disable="disableField"
                    ref="relatives_mname"
                    square
                    outlined
                    v-model="relative.MiddleName"
                    dense
                    label="Отчество"
                    :rules="[
                      val => !!val || 'Введите отчество',
                      val => mValid(val)
                    ]"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    :disable="disableField"
                    ref="relatives_birthday"
                    outlined
                    square
                    dense
                    label="Дата рождения"
                    v-model="relative.BirthDate"
                    mask="##.##.####"
                    :rules="[
                      val =>
                        (val && val.length === 10) || 'Введите дату рождения',
                      val => adulthoodValid(val) || 'Несовершеннолетний'
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
                  <q-select
                    :disable="disableField"
                    ref="relativesDocumentDocumentType"
                    square
                    outlined
                    v-model="relative.Document.documentType"
                    :options="dictionaries.DocumentType.items"
                    dense
                    label="Вид документа"
                    emit-value
                    map-options
                    class="q-pb-sm"
                    :rules="[val => !!val || 'Выберите вид документа']"
                  />
                </div>

                <div v-if="relative.Document.documentType == 7" class="col-4">
                  <q-input
                    :disable="disableField"
                    ref="relativesDocumentDocumentName"
                    square
                    outlined
                    v-model="relative.Document.DocumentName"
                    dense
                    label="Наименование документа"
                    :rules="[val => !!val || 'Введите наименование документа']"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    :disable="disableField"
                    ref="relativesDocumentSeries"
                    square
                    outlined
                    v-model="relative.Document.Series"
                    dense
                    label="Серия документа"
                    mask="AA"
                    :rules="[
                      val =>
                        (val && val.length === 2) || 'Введите серию документа'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    :disable="disableField"
                    ref="relativesDocumentNumber"
                    square
                    outlined
                    v-model="relative.Document.Number"
                    dense
                    label="Номер документа"
                    mask="#######"
                    :rules="[
                      val =>
                        (val && val.length === 7) || 'Введите номер документа',
                      val => docNumberValid(val)
                    ]"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    :disable="disableField"
                    ref="relativesDocumentGivenDate"
                    outlined
                    square
                    dense
                    label="Дата выдачи документа"
                    v-model="relative.Document.GivenDate"
                    mask="##.##.####"
                    :rules="[
                      val =>
                        (val && val.length === 10) ||
                        'Введите дату выдачи документа',

                      relative.Document.ExpirationDate
                        ? val =>
                            msecond(val) <
                              msecond(relative.Document.ExpirationDate) ||
                            'Неверная дата'
                        : null,

                      val =>
                        msecond(val) < msecond(currentDate) || 'Неверная дата'
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                          ref="qDateRelativeDocumentGivenDate"
                        >
                          <q-date
                            mask="DD.MM.YYYY"
                            v-model="relative.Document.GivenDate"
                            @input="
                              $event => {
                                $refs.qDateRelativeDocumentGivenDate[
                                  index
                                ].hide();
                                validDateRelatives($event, index);
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
                    :disable="disableField"
                    ref="relativesDocumentExpirationDate"
                    outlined
                    square
                    dense
                    label="Дата окончания действия документа"
                    v-model="relative.Document.ExpirationDate"
                    mask="##.##.####"
                    :rules="[
                      val =>
                        (val && val.length === 10) ||
                        'Введите дату окончания документа',
                      relative.Document.GivenDate
                        ? val =>
                            msecond(val) >
                              msecond(relative.Document.GivenDate) ||
                            'Неверная дата'
                        : null,
                      val =>
                        msecond(val) > msecond(currentDate) || 'Неверная дата'
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                          ref="qDateRelativeDocumentExpirationDate"
                        >
                          <q-date
                            mask="DD.MM.YYYY"
                            v-model="relative.Document.ExpirationDate"
                            @input="
                              $event => {
                                $refs.qDateRelativeDocumentExpirationDate[
                                  index
                                ].hide();
                                validDateRelatives($event, index);
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
                  <q-select
                    :disable="disableField"
                    ref="relativesDocumentRegionsGivenPlace"
                    square
                    outlined
                    v-model="relative.Document.Region"
                    @input="setGivenPlace($event, index, 'Relatives')"
                    :options="dictionaries.Region.items"
                    dense
                    label="Регион/область выдачи документа"
                    :rules="[val => !!val || 'Выберите регион/область']"
                    emit-value
                    map-options
                    class="q-pb-sm"
                  />
                </div>
                <div class="col-4">
                  <!-- <q-input
                    :disable="disableField"
                    ref="relativesDocumentGivenPlace"
                    square
                    outlined
                    v-model="relative.Document.GivenPlace"
                    dense
                    label="Кем выдан документ"
                    :rules="[
                      val => !!val || 'Введите кем выдан документ',
                      val => givenPlaceValid(val)
                    ]"
                  /> -->

                  <q-select
                    :disable="disableField"
                    ref="relativesDocumentGivenPlace"
                    square
                    outlined
                    v-model="relative.Document.GivenPlace"
                    :options="relative.Document.Districts.items"
                    dense
                    label="Кем выдан документ (ИИБ)"
                    :rules="[val => !!val || 'Введите кем выдан документ (ИИБ)']"
                    emit-value
                    map-options
                    class="q-pb-sm"
                  />
                </div>
              </div>

              <q-btn
                :disable="disableField"
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
              :disable="disableField"
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
                  :disable="disableField"
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
                      :disable="disableField"
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
                      :disable="disableField"
                      ref="innOfEmployer"
                      square
                      outlined
                      v-model="Customer.JobInfo.INN"
                      dense
                      label="ИНН работодателя"
                      mask="#########"
                      :rules="[
                        val =>
                          (val && val.length == 9) ||
                          'Введите ИНН работодателя',
                        val => innValid(val)
                      ]"
                    />
                  </div>
                  <div class="col-4">
                    <q-select
                      :disable="disableField"
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
                      :disable="disableField"
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
                  <!-- <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="position"
                      square
                      outlined
                      v-model="Customer.JobInfo.position"
                      dense
                      label="Деятельность"
                      lazy-rules
                      :rules="[val => !!val || 'Введите деятельность']"
                    />
                  </div> -->
                  <div class="col-4">
                    <q-select
                      :disable="disableField"
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
                        val =>
                          !!val || 'Выберите категорию занимаемой должности'
                      ]"
                      class="q-pb-sm"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-select
                      :disable="disableField"
                      ref="workExperience"
                      square
                      outlined
                      v-model="Customer.JobInfo.lastJobExperienceMonths"
                      @input="validWorkExperience"
                      :options="dictionaries.jobPeriods.items"
                      dense
                      label="Стаж на последнем месте работы"
                      emit-value
                      map-options
                      :reactive-rules="false"
                      :rules="[
                        val => !!val || 'Выберите стаж работы',
                        val =>
                          Customer.JobInfo.totalJobExperienceMonths >=
                            Customer.JobInfo.lastJobExperienceMonths ||
                          'Некорректные данные'
                      ]"
                      class="q-pb-sm"
                    />
                  </div>
                  <div class="col-4">
                    <q-select
                      :disable="disableField"
                      ref="totalWorkExperience"
                      square
                      outlined
                      v-model="Customer.JobInfo.totalJobExperienceMonths"
                      @input="validWorkExperience"
                      :options="dictionaries.jobPeriods.items"
                      dense
                      label="Общий трудовой стаж"
                      emit-value
                      map-options
                      :reactive-rules="false"
                      :rules="[
                        val => !!val || 'Выберите общий трудовой стаж',
                        val =>
                          Customer.JobInfo.totalJobExperienceMonths >=
                            Customer.JobInfo.lastJobExperienceMonths ||
                          'Некорректные данные'
                      ]"
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
                      :disable="disableField"
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
                      :disable="disableField"
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
                  disable
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
                  disable
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
                  disable
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
                  disable
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
                    disable
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
                    disable
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

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  square
                  outlined
                  v-model.number="fullProfile.max_loan_sum_preapprove"
                  type="number"
                  dense
                  disable
                  label="Расчет макс.возм.суммы кредита (скоринг)"
                  class="q-pb-sm"
                />
              </div>
              <!-- <div class="col-4">
                <q-input
                  disable
                  square
                  outlined
                  type="number"
                  dense
                  label="Среднемесячная заработная плата (сум)"
                />
              </div>
              <div class="col-4">
                <q-input
                  disable
                  square
                  outlined
                  type="number"
                  dense
                  label="Профит"
                />
              </div>
              <div class="col-4">
                <q-input
                  disable
                  square
                  outlined
                  type="number"
                  dense
                  label="Класс кредитоспособности"
                />
              </div> -->
            </div>

            <!-- <q-btn
              :loading="bankLoading"
              :disable="disableField"
              color="primary"
              label="Получить данные с Халк банка"
              @click="getInfoBank"
              class="addItem"
            > -->

            <q-btn
              v-if="profile.preapprove_num"
              :loading="bankLoading"
              color="primary"
              label="Получить данные с Халк банка"
              @click="getDataINPS"
              class="addItem"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
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
                    :disable="disableField"
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
                    :disable="disableField"
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
                    :disable="disableField"
                    ref="pricesProperties"
                    square
                    outlined
                    v-model.number="property.MarketValue"
                    type="number"
                    dense
                    label="Рыночная стоимость"
                    :rules="[
                      val => !!val || 'Поля должно быт заполнено',
                      val => val > 0 || 'Некорректные данные'
                    ]"
                  />
                </div>
              </div>

              <q-btn
                :disable="disableField"
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
              :disable="disableField"
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
                    :disable="disableField"
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
                    :disable="disableField"
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
                    :disable="disableField"
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
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    :disable="disableField"
                    ref="priceVehicles"
                    square
                    outlined
                    v-model.number="vehicle.marketValue"
                    type="number"
                    dense
                    label="Рыночная стоимость"
                    :rules="[
                      val => !!val || 'Введите рыночную стоимость',
                      val => val > 0 || 'Некорректные данные'
                    ]"
                  />
                </div>
              </div>

              <q-btn
                :disable="disableField"
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
              :disable="disableField"
              color="primary"
              label="Добавить транспортное средство"
              @click="addVehicle"
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
                  :disable="disableField"
                  ref="priceCredit"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.Sum"
                  @input="guaranteesValid"
                  type="number"
                  dense
                  label="Запрашиваемая сумма кредита"
                  :rules="[
                    val => !!val || 'Введите сумму кредита',
                    val => val > 0 || 'Некорректные данные',
                    val =>
                      totalGuaranteesSum - fullProfile.LoanInfo.Sum >=
                        fullProfile.LoanInfo.Sum * 0.25 ||
                      'Сумма всех гарантий должна быть больше запрашиваемой суммы кредита на 25%',
                    fullProfile.max_loan_sum_preapprove
                      ? val =>
                          (val > 0 &&
                            val <= fullProfile.max_loan_sum_preapprove) ||
                          `Максимальная сумма кредита ${fullProfile.max_loan_sum_preapprove}`
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
                v-if="
                  !!fullProfile.LoanInfo.LoanProduct &&
                    fullProfile.LoanInfo.LoanProduct !== 3
                "
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
                  label="Процентная ставка"
                  :rules="[
                    val => !!val || 'Введите максимальную процентную ставку'
                  ]"
                />
              </div>

              <!-- <div class="col-4">
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
              </div> -->

            </div>

            <div class="row q-col-gutter-md">
              <div class="col-6">
                <div v-if="!!fullProfile.LoanInfo.LoanProduct" class="col-12">
                  <h6 class="periodCredit">
                    Льготный период по погашению кредита
                  </h6>

                  <q-input
                    square
                    outlined
                    v-model.number="fullProfile.LoanInfo.MaxDefferalRepaymentPeriod"
                    type="number"
                    dense
                    label="Льготный период по погашению кредита"
                    :rules="[
                      val =>
                        (val <= GracePeriodMin && val >= GracePeriodMax) ||
                        `Льготный период между ${GracePeriodMin} - ${GracePeriodMax} мес.`
                    ]"
                  />

                  <q-badge color="secondary">
                    Срок:
                    {{ fullProfile.LoanInfo.MaxDefferalRepaymentPeriod }} ({{
                      GracePeriodMin
                    }}
                    до {{ GracePeriodMax }})
                  </q-badge>
                  <q-slider
                    :disable="disableField"
                    v-model.number="
                      fullProfile.LoanInfo.MaxDefferalRepaymentPeriod
                    "
                    :min="GracePeriodMin"
                    :max="GracePeriodMax"
                    :step="1"
                    label
                    label-always
                    color="light-green"
                    class="sliderCredit"
                  />
                </div>

              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  disable
                  ref="comfortablePeriodRepayment"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.TermInMonth"
                  type="number"
                  dense
                  label="Срок кредита"
                  mask="##"
                  :rules="[
                    val => !!val || 'Введите срок кредита',
                    val => val > 0 || 'Некорректные данные'
                  ]"
                />
              </div>

              <div class="col-4">
                <q-input
                  :disable="disableField"
                  ref="comfortableDayRepayment"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.ConvenientRepaymentTerm"
                  type="number"
                  dense
                  label="Удобный день погашения"
                  mask="##"
                  :rules="[
                    val => !!val || 'Введите удобный день погашения',
                    val =>
                      (val > 0 && val < 29) ||
                      `Введите удобный день погашения (1-28)`
                  ]"
                />
              </div>

              <div class="col-4">
                <q-input
                  disable
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.InitialPayment"
                  type="number"
                  dense
                  label="Первоначальный взнос"
                />
              </div>
              <!-- <div class="col-4">
                <q-input
                  disable
                  ref="periodRepaymentMin"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.MinTermInMonths"
                  type="number"
                  dense
                  label="Минимальное количество месяцев на кредит"
                  mask="##"
                  :rules="[
                    val =>
                      !!val ||
                      'Введите минимальное количество месяцев на кредит'
                  ]"
                />
              </div> -->
              <!-- <div class="col-4">
                <q-input
                  disable
                  ref="periodRepaymentMax"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.MaxTermInMonths"
                  type="number"
                  dense
                  label="Максимальное количество месяцев на кредит"
                  mask="##"
                  :rules="[
                    val =>
                      !!val ||
                      'Введите максимальное количество месяцев на кредит'
                  ]"
                />
              </div> -->
            </div>

            <!-- <div class="row q-col-gutter-md"> -->
              <!-- <div 
                v-if="!!fullProfile.LoanInfo.LoanProduct && fullProfile.LoanInfo.LoanProduct !== 3"
                class="col-4">
                <q-input
                  :disable="disableField"
                  ref="initialFee"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.InitialPayment"
                  type="number"
                  dense
                  label="Первоначальный взнос"
                  :rules="[
                    val => !!val || 'Введите первоначальный взнос',
                    val => val > 0 || 'Некорректные данные'
                  ]"
                />
              </div> -->

              <!-- <div class="col-4">
                <q-input
                  ref="procentInitialFeeMax"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.MaxInitialPaymentPercent"
                  type="number"
                  dense
                  disable
                  label="Процент первоначального взноса (максимальный)"
                  :rules="[
                    val => !!val || 'Введите максимальный первоначальный взнос'
                  ]"
                />
              </div> -->

              <!-- <div class="col-4">
                <q-input
                  ref="procentInitialFeeMin"
                  square
                  outlined
                  v-model.number="fullProfile.LoanInfo.MinInitialPaymentPercent"
                  type="number"
                  dense
                  disable
                  label="Процент первоначального взноса (минимальный)"
                  :rules="[
                    val => !!val || 'Введите минимальный первоначальный взнос'
                  ]"
                />
              </div> -->
            <!-- </div> -->

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-select
                  disable
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
                  :disable="disableField"
                  ref="sourceFinancs"
                  square
                  outlined
                  v-model="fullProfile.LoanInfo.FundingSource"
                  :options="options.FinancialSources.items"
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
                    :disable="disableField"
                    ref="nameProduction"
                    square
                    outlined
                    v-model="fullProfile.LoanInfo.consumerLoan.nameProduction"
                    dense
                    label="Наименование продавца/производителя товара/работы/услуги"
                    :rules="[
                      val =>
                        !!val ||
                        'Введите наименование продавца/производителя товара/работы/услуги'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    :disable="disableField"
                    ref="productName"
                    square
                    outlined
                    v-model="fullProfile.LoanInfo.consumerLoan.nameService"
                    dense
                    label="Наименование товара/работы/услуги"
                    :rules="[
                      val =>
                        !!val || 'Введите наименование товара/работы/услуги'
                    ]"
                  />
                </div>

                <div class="col-4">
                  <q-input
                    :disable="disableField"
                    ref="nameBankProd"
                    square
                    outlined
                    v-model="fullProfile.LoanInfo.consumerLoan.nameBankProd"
                    dense
                    label="Наименование банка продавца/производителя товара/работы/услуги"
                    :rules="[
                      val =>
                        !!val ||
                        'Введите наименование банка продавца/производителя товара/работы/услуги'
                    ]"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    :disable="disableField"
                    ref="billProd"
                    square
                    outlined
                    v-model="fullProfile.LoanInfo.consumerLoan.billProd"
                    dense
                    label="Расчетный счет продавца/производителя товара/работы/услуги"
                    mask="####################"
                    :rules="[
                      val => (val && val.length === 20) || 'Расчетный счет',
                      val => !val.match(/(?=(.))\1{20,}/) || 'Неверные данные'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    :disable="disableField"
                    ref="agreementNumber"
                    square
                    outlined
                    v-model="fullProfile.LoanInfo.consumerLoan.agreementNumber"
                    dense
                    label="Номер договора с продавцом/поставщиком  товара/работы/услуги"
                    :rules="[
                      val =>
                        !!val ||
                        'Введите номер договора с продавцом/поставщиком  товара/работы/услуги'
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    :disable="disableField"
                    ref="agreementDate"
                    outlined
                    square
                    dense
                    label="Дата договора с продавцом/поставщиком товара/работы/услуги"
                    v-model="fullProfile.LoanInfo.consumerLoan.agreementDate"
                    mask="##.##.####"
                    :rules="[
                      val =>
                        (val && val.length === 10) ||
                        'Введите дату договора с продавцом/поставщиком товара/работы/услуги',
                      val =>
                        msecond(val) <= msecond(currentDate) || 'Неверная дата'
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
                            v-model="
                              fullProfile.LoanInfo.consumerLoan.agreementDate
                            "
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
                val =>
                  totalGuaranteesSum - fullProfile.LoanInfo.Sum >=
                    fullProfile.LoanInfo.Sum * 0.25 ||
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
                v-for="(guarantee, index) of fullProfile.Guarantee.RelatedPerson
                  .items"
                :key="'RelatedPerson' + index"
              >
                <legend class="legend_title">Физ. лицо {{ index + 1 }}</legend>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-select
                      :disable="disableField"
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
                      :disable="disableField"
                      ref="priceGuarantees"
                      square
                      outlined
                      v-model.number="guarantee.Sum"
                      type="number"
                      dense
                      label="Сумма поручительства"
                      @input="guaranteesValid"
                      :rules="[
                        val => !!val || 'Введите сумму',
                        val => val > 0 || 'Некорректные данные'
                      ]"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="surnameGuarantees"
                      square
                      outlined
                      v-model="guarantee.LastName"
                      dense
                      label="Фамилия"
                      :rules="[
                        val => !!val || 'Введите фамилию',
                        val => fioValid(val)
                      ]"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="nameGuarantees"
                      square
                      outlined
                      v-model="guarantee.FirstName"
                      dense
                      label="Имя"
                      :rules="[
                        val => !!val || 'Введите имя',
                        val => fioValid(val)
                      ]"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="mnameGuarantees"
                      square
                      outlined
                      v-model="guarantee.MiddleName"
                      dense
                      label="Отчество"
                      :rules="[
                        val => !!val || 'Введите отчество',
                        val => mValid(val)
                      ]"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="birthdayGuarantees"
                      outlined
                      square
                      dense
                      label="Дата рождения"
                      v-model="guarantee.BirthDate"
                      mask="##.##.####"
                      :rules="[
                        val =>
                          (val && val.length === 10) || 'Введите дату рождения',
                        val => adulthoodValid(val) || 'Несовершеннолетний'
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
                              @input="
                                () =>
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
                      :disable="disableField"
                      ref="innGuarantees"
                      square
                      outlined
                      v-model="guarantee.INN"
                      dense
                      label="ИНН"
                      mask="#########"
                      :rules="[
                        val =>
                          (val && val.length === 9) ||
                          'Количество цифр должно быть 9',
                        val => innValid(val)
                      ]"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="pinppGuarantees"
                      square
                      outlined
                      v-model="guarantee.PINPP"
                      dense
                      label="ПИНФЛ"
                      mask="##############"
                      :rules="[
                        val => (val && val.length === 14) || 'Введите ПНФЛ',
                        val => pinppValid(val)
                      ]"
                    />
                  </div>
                  <div class="col-4">
                    <q-select
                      :disable="disableField"
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
                    <q-select
                      :disable="disableField"
                      ref="guaranteesDocumentDocumentType"
                      square
                      outlined
                      v-model="guarantee.Document.documentType"
                      :options="dictionaries.DocumentType.items"
                      dense
                      label="Вид документа"
                      emit-value
                      map-options
                      class="q-pb-sm"
                      :rules="[val => !!val || 'Выберите вид документа']"
                    />
                  </div>

                  <div
                    v-if="guarantee.Document.documentType == 7"
                    class="col-4"
                  >
                    <q-input
                      :disable="disableField"
                      ref="guaranteesDocumentDocumentName"
                      square
                      outlined
                      v-model="guarantee.Document.DocumentName"
                      dense
                      label="Наименование документа"
                      :rules="[
                        val => !!val || 'Введите наименование документа'
                      ]"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="guaranteesDocumentSeries"
                      square
                      outlined
                      v-model="guarantee.Document.Series"
                      dense
                      label="Серия документа"
                      mask="AA"
                      :rules="[
                        val =>
                          (val && val.length === 2) || 'Введите Серию документа'
                      ]"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="guaranteesDocumentNumber"
                      square
                      outlined
                      v-model="guarantee.Document.Number"
                      dense
                      label="Номер документа"
                      mask="#######"
                      :rules="[
                        val =>
                          (val && val.length === 7) ||
                          'Введите Номер документа',
                        val => docNumberValid(val)
                      ]"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="guaranteesDocumentGivenDate"
                      outlined
                      square
                      dense
                      label="Дата выдачи документа"
                      v-model="guarantee.Document.GivenDate"
                      mask="##.##.####"
                      :rules="[
                        val =>
                          (val && val.length === 10) ||
                          'Введите дату выдачи документа',

                        guarantee.Document.ExpirationDate
                          ? val =>
                              msecond(val) <
                                msecond(guarantee.Document.ExpirationDate) ||
                              'Неверная дата'
                          : null,

                        val =>
                          msecond(val) < msecond(currentDate) || 'Неверная дата'
                      ]"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                            ref="qDateGuaranteeDocumentGivenDate"
                          >
                            <q-date
                              mask="DD.MM.YYYY"
                              v-model="guarantee.Document.GivenDate"
                              @input="
                                $event => {
                                  $refs.qDateGuaranteeDocumentGivenDate[
                                    index
                                  ].hide();
                                  validDateGuarantees($event, index);
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
                      :disable="disableField"
                      ref="guaranteesDocumentExpirationDate"
                      outlined
                      square
                      dense
                      label="Дата окончания действия документа"
                      v-model="guarantee.Document.ExpirationDate"
                      mask="##.##.####"
                      :rules="[
                        val =>
                          (val && val.length === 10) ||
                          'Введите дату  окончания действия документа',
                        guarantee.Document.GivenDate
                          ? val =>
                              msecond(val) >
                                msecond(guarantee.Document.GivenDate) ||
                              'Неверная дата'
                          : null,
                        val =>
                          msecond(val) > msecond(currentDate) || 'Неверная дата'
                      ]"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                            ref="qDateGuaranteeDocumentExpirationDate"
                          >
                            <q-date
                              mask="DD.MM.YYYY"
                              v-model="guarantee.Document.ExpirationDate"
                              @input="
                                $event => {
                                  $refs.qDateGuaranteeDocumentExpirationDate[
                                    index
                                  ].hide();
                                  validDateGuarantees($event, index);
                                }
                              "
                            />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                  <div class="col-4">
                    <q-select
                      :disable="disableField"
                      ref="guaranteesDocumentRegionsGivenPlace"
                      square
                      outlined
                      v-model="guarantee.Document.Region"
                      @input="
                        setGivenPlaceGuarantee($event, index, 'RelatedPerson')
                      "
                      :options="dictionaries.Region.items"
                      dense
                      label="Регион/область выдачи документа"
                      :rules="[val => !!val || 'Выберите регион/область']"
                      emit-value
                      map-options
                      class="q-pb-sm"
                    />
                  </div>

                  <div class="col-4">
                    <!-- <q-input
                    :disable="disableField"
                    ref="guaranteesDocumentGivenPlace"
                    square
                    outlined
                    v-model="guarantee.Document.GivenPlace"
                    dense
                    label="Кем выдан документ"
                    :rules="[
                      val => !!val || 'Введите кем выдан документ',
                      val => givenPlaceValid(val)
                    ]"
                  /> -->

                    <q-select
                      :disable="disableField"
                      ref="guaranteesDocumentGivenPlace"
                      square
                      outlined
                      v-model="guarantee.Document.GivenPlace"
                      :options="guarantee.Document.Districts.items"
                      dense
                      label="Кем выдан документ (ИИБ)"
                      :rules="[val => !!val || 'Введите кем выдан документ (ИИБ)']"
                      emit-value
                      map-options
                      class="q-pb-sm"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <!-- <div class="col-4">
                  <q-input
                    :disable="disableField"
                    ref="indexGuarantees"
                    square
                    outlined
                    v-model="guarantee.Address.PostalCode"
                    dense
                    label="Индекс"
                    mask="######"
                  />
                </div> -->
                  <div class="col-4">
                    <q-select
                      :disable="disableField"
                      ref="regionGuarantees"
                      square
                      outlined
                      v-model="guarantee.Address.Region"
                      :options="dictionaries.Region.items"
                      @input="
                        setDistrictsGuarantee($event, index, 'RelatedPerson')
                      "
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
                      :disable="disableField"
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
                      :disable="disableField"
                      ref="districtGuarantees"
                      square
                      outlined
                      v-model="guarantee.Address.District"
                      :options="guarantee.Address.Districts.items"
                      dense
                      label="Район"
                      :rules="[val => !!val || 'Выберите район']"
                      emit-value
                      map-options
                      class="q-pb-sm"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
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
                      :disable="disableField"
                      ref="houseNumberGuarantees"
                      square
                      outlined
                      v-model="guarantee.Address.House"
                      dense
                      label="Номер дома"
                      :rules="[val => !!val || 'Введите номер дома']"
                    />
                  </div>
                  <!-- <div class="col-4">
                  <q-input
                    :disable="disableField"
                    square
                    outlined
                    v-model="guarantee.Address.Block"
                    dense
                    label="Корпус"
                  />
                </div> -->
                </div>

                <div class="row q-col-gutter-md">
                  <!-- <div class="col-4">
                  <q-input
                    :disable="disableField"
                    square
                    outlined
                    v-model="guarantee.Address.Building"
                    dense
                    label="Строение"
                  />
                </div> -->
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
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
                        :disable="disableField"
                        ref="phonesGuarantees"
                        square
                        outlined
                        v-model="phone.Number"
                        dense
                        label="Тел. номер"
                        mask="+############"
                        :rules="[
                          val =>
                            (val && val.length === 13) ||
                            'Введите номер телефона',
                          val => phoneValid(val)
                        ]"
                      />
                    </div>
                  </div>

                  <q-btn
                    :disable="disableField"
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
                  :disable="disableField"
                  color="primary"
                  label="Добавить номер телефона"
                  @click="addPhoneGuarantee({ item: 'RelatedPerson', index })"
                  class="addItem"
                ></q-btn>

                <q-btn
                  :disable="disableField"
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
                :disable="disableField"
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
                      :disable="disableField"
                      ref="priceGuarantees"
                      square
                      outlined
                      v-model.number="guarantee.Sum"
                      type="number"
                      dense
                      label="Сумма поручительства"
                      @input="guaranteesValid"
                      :rules="[
                        val => !!val || 'Введите сумму',
                        val => val > 0 || 'Некорректные данные'
                      ]"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="CEOLastName"
                      square
                      outlined
                      v-model="guarantee.CEOLastName"
                      dense
                      label="Фамилия директора"
                      :rules="[
                        val => !!val || 'Введите фамилию',
                        val => fioValid(val)
                      ]"
                    />
                  </div>

                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="CEOFirstName"
                      square
                      outlined
                      v-model="guarantee.CEOFirstName"
                      dense
                      label="Имя директора"
                      :rules="[
                        val => !!val || 'Введите имя',
                        val => fioValid(val)
                      ]"
                    />
                  </div>

                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="CEOMiddleName"
                      square
                      outlined
                      v-model="guarantee.CEOMiddleName"
                      dense
                      label="Отчество директора"
                      :rules="[
                        val => !!val || 'Введите отчество',
                        val => mValid(val)
                      ]"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="nameGuarantees"
                      square
                      outlined
                      v-model="guarantee.Name"
                      dense
                      label="Название"
                      :rules="[val => !!val || 'Введите название']"
                    />
                  </div>

                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="innGuarantees"
                      square
                      outlined
                      v-model="guarantee.INN"
                      dense
                      label="ИНН"
                      mask="#########"
                      :rules="[
                        val =>
                          (val && val.length === 9) ||
                          'Количество цифр должно быть 9',
                        val => innValid(val)
                      ]"
                    />
                  </div>

                  <!-- Надо добавить в BPM -->
                  <div class="col-4">
                    <q-select
                      :disable="disableField"
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
                  <!-- <div class="col-4">
                  <q-input
                    :disable="disableField"
                    square
                    outlined
                    v-model="guarantee.Address.PostalCode"
                    dense
                    label="Индекс"
                    mask="######"
                  />
                </div> -->
                  <div class="col-4">
                    <q-select
                      :disable="disableField"
                      ref="regionGuarantees"
                      square
                      outlined
                      v-model="guarantee.Address.Region"
                      :options="dictionaries.Region.items"
                      @input="
                        setDistrictsGuarantee(
                          $event,
                          index,
                          'RelatedLegalPerson'
                        )
                      "
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
                      :disable="disableField"
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
                      :disable="disableField"
                      ref="districtGuarantees"
                      square
                      outlined
                      v-model="guarantee.Address.District"
                      :options="guarantee.Address.Districts.items"
                      dense
                      label="Район"
                      :rules="[val => !!val || 'Выберите район']"
                      emit-value
                      map-options
                      class="q-pb-sm"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
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
                      :disable="disableField"
                      ref="houseNumberGuarantees"
                      square
                      outlined
                      v-model="guarantee.Address.House"
                      dense
                      label="Номер дома"
                      :rules="[val => !!val || 'Введите номер дома']"
                    />
                  </div>
                  <!-- <div class="col-4">
                  <q-input
                    :disable="disableField"
                    square
                    outlined
                    v-model="guarantee.Address.Block"
                    dense
                    label="Корпус"
                  />
                </div> -->
                </div>

                <div class="row q-col-gutter-md">
                  <!-- <div class="col-4">
                  <q-input
                    :disable="disableField"
                    square
                    outlined
                    v-model="guarantee.Address.Building"
                    dense
                    label="Строение"
                  />
                </div> -->
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
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
                        :disable="disableField"
                        ref="phonesGuarantees"
                        square
                        outlined
                        v-model="phone.Number"
                        dense
                        label="Тел. номер"
                        mask="+############"
                        :rules="[
                          val =>
                            (val && val.length === 13) ||
                            'Введите номер телефона',
                          val => phoneValid(val)
                        ]"
                      />
                    </div>
                  </div>

                  <q-btn
                    :disable="disableField"
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
                  :disable="disableField"
                  color="primary"
                  label="Добавить номер телефона"
                  @click="
                    addPhoneGuarantee({ item: 'RelatedLegalPerson', index })
                  "
                  class="addItem"
                ></q-btn>

                <q-btn
                  :disable="disableField"
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
                :disable="disableField"
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
                v-for="(guarantee, index) of fullProfile.Guarantee.Insurance
                  .items"
                :key="'Insurance' + index"
              >
                <legend class="legend_title">
                  Страхование {{ index + 1 }}
                </legend>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <!-- <q-input
                    :disable="disableField"
                    ref="nameGuarantees"
                    square
                    outlined
                    v-model="guarantee.OrgName"
                    dense
                    label="Наименование страховой компании"
                    :rules="[
                      val => !!val || 'Введите наименование страховой компании'
                    ]"
                  /> -->

                    <q-select
                      :disable="disableField"
                      ref="nameGuarantees"
                      square
                      outlined
                      v-model="guarantee.OrgName"
                      :options="dictionaries.Insurance_company.items"
                      @input="setINNCompany($event, index)"
                      dense
                      label="Наименование страховой компании"
                      :rules="[val => !!val || 'Выберите страховую компанию']"
                      emit-value
                      map-options
                      class="q-pb-sm"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
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
                          'Количество цифр должно быть 9',
                        val => innValid(val)
                      ]"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="priceGuarantees"
                      square
                      outlined
                      v-model.number="guarantee.Sum"
                      @input="guaranteesValid"
                      type="number"
                      dense
                      label="Сумма страхового полиса"
                      :rules="[
                        val => !!val || 'Введите сумму',
                        val => val > 0 || 'Некорректные данные'
                      ]"
                    />
                  </div>
                </div>

                <q-btn
                  :disable="disableField"
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
                :disable="disableField"
                color="primary"
                label="Добавить страхование"
                @click="addInsurance('Insurance')"
                class="addItem"
              ></q-btn>
            </q-field>
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
                        v-model="file.DocumentName"
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

                    <q-btn
                      v-else
                      flat
                      round
                      color="black"
                      icon="clear"
                      @click.prevent="
                        confirmDeleteItem(
                          file.DocumentName,
                          removeUploadFile,
                          (item = null),
                          index
                        )
                      "
                    >
                      <q-tooltip>Удалить загруженный файл</q-tooltip>
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
            <template v-if="fullProfile.ApplicationComment">
              <div
                class="comments"
                v-for="comment of fullProfile.ApplicationComment.items"
                :key="comment.id"
              >
                <h6 class="tab-content_title">{{ comment.CommentPerson }}</h6>
                <!-- <span>{{comment.CommentDate}}</span> -->
                <p>{{ comment.Comment }}</p>
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
        <template v-if="profile.fileList.length">
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
                  v-for="(fileData, index) of profile.fileList"
                  :key="index"
                >
                  <p>
                    {{ fileData.label }}
                    {{ fileData.number ? +fileData.number + 1 : null }}
                  </p>
                  <q-btn
                    :disable="disable"
                    icon="print"
                    @click="printFile(fileData, index)"
                    :loading="loadings[index]"
                  >
                    <template v-slot:loading>
                      <q-spinner-facebook />
                    </template>
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
              @click="itemFunc(payload)"
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
      <appFullProfile :currentDate="currentDate" v-if="profile.confirmCredit=true" />
    </div>

    <appLoaderFullScreen v-if="loader" />
    <!-- <appInfoList 
      :confirm="infoList" 
      :INPS="true" 
      @failureCreditINPS="($event) => infoList = $event"
    /> -->

    <q-dialog v-model="INPSBar" persistent>
      <q-card class="INPSblock">
        <q-card-section>
          <appGetDataINPS
            v-if="dataINPS"
            :salaries="dataINPS"
            @closeBar="$event => (INPSBar = $event)"
          />

          <appSetDataINPS v-else @closeBar="$event => (INPSBar = $event)" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import printJS from "print-js";

// import InfoList from "../registration/PreApproval";
import SetDataINPS from "../../Components/INPS/SetData";
import GetDataINPS from "../../Components/INPS/GetData";
import Loader from "@/components/Loader";
import FullProfile from "./FullProfile";
import LoaderFullScreen from "@/components/LoaderFullScreen";

import CommonUtils from "@/shared/utils/CommonUtils";
import dataTransform from "../../filters/dataTransform";
import { validItems, validFilter } from "../../filters/valid_filter";

export default {
  name: "profile",
  data() {
    return {
      bankLoading: false,
      // infoList: false,
      INPSBar: false,
      dataINPS: null,
      countRelativeDocumentName: -1,
      countGuaranteeDocumentName: -1,
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
      payload: {},
      bar: false,
      GracePeriodMin: null,
      GracePeriodMax: null,
      creditManagerComment: "",

      options: {
        //Countries: this.$store.getters["profile/dictionaries"].Countries.items,
        Countries: [],

        RepaymentType: [],

        yearsOfIssueVehicle: [],

        FinancialSources: [] // источник финансирования
      },

      guaranteeCount: [],
      totalGuaranteesSum: 0, // сумма всех гарантий и поручительств
      files: [], // для сервера, чтоб не дублировать отправку файла
      filesAll: [], // для фильтрации какие файлы загружены на сервер

      fileData: {
        type: "",
        lang: this.$store.getters["common/getLangNum"] - 1, //0 - рус, 1 - узб,
        data: {}
      }
    };
  },

  async created() {
    // this.$store.commit("profile/resetDataFullFormProfile")

    if (this.taskId) {
      this.loaderForm = true;
      this.$store.commit("credits/setTaskId", this.taskId);

      // если перезагрузили страницу
      if (!axios.defaults.headers.common["BPMCSRFToken"]) {
        await this.$store.dispatch(
          "credits/setHeaderRole",
          sessionStorage.getItem("userRole")
        );
        await this.$store.dispatch(
          "credits/setHeaderBPM",
          sessionStorage.getItem("csrf_token")
        );
      }

      try {
        const response = await this.$store.dispatch("profile/getFullForm");

        //this.setLoan(this.fullProfile.LoanInfo.LoanProduct)
        console.log("response", response);

        if (response) {
          const { data } = response.data.input.find(
            i => i.label == "application"
          );

          if (data.BODecision != null) {
            const uploadedFiles = data.AttachedDocuments.items;
            const guarantees = data.Guarantee;

            for (let file of uploadedFiles) {
              this.filesAll.push({
                name: "",
                DocumentName: file.DocumentName,
                id: file.id,
                upload: true
              });
            }

            for (let guarantee in guarantees) {
              for (let i of guarantees[guarantee].items) {
                this.guaranteeCount.push("guarantee");
              }
            }
          }
        }

        this.loaderForm = false;
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          CommonUtils.filterServerError(error)
        );
        this.loaderForm = false;
      }
    } else if (!axios.defaults.headers.common["BPMCSRFToken"]) {
      // если перезагрузили страницу
      await this.$store.dispatch(
        "credits/setHeaderRole",
        sessionStorage.getItem("userRole")
      );
      await this.$store.dispatch(
        "credits/setHeaderBPM",
        sessionStorage.getItem("csrf_token")
      );
      this.$store.commit(
        "profile/setPreapprovData",
        JSON.parse(sessionStorage.getItem("preapprovData"))
      ); //синхронизация с preapprov
      this.$store.commit(
        "profile/setDictionaries",
        JSON.parse(sessionStorage.getItem("dictionaries"))
      );
      this.$store.commit("credits/setTaskId", sessionStorage.getItem("taskId"));
      this.$store.commit(
        "profile/setPreapproveNum",
        sessionStorage.getItem("preapprove_num")
      );
      //this.setLoan(this.fullProfile.LoanInfo.LoanProduct)
    }
    // else {
    //     this.$store.commit("profile/setPreapprovData", JSON.parse(sessionStorage.getItem("preapprovData")))
    //     //this.setLoan(this.fullProfile.LoanInfo.LoanProduct)
    // }

    this.setLoan(this.fullProfile.LoanInfo.LoanProduct);
    this.options.Countries = this.$store.getters[
      "profile/dictionaries"
    ].Countries.items;
  },
  mounted() {
    // setTimeout(() => {
    //   this.onSubmit("start");
    // }, 1000);
  },
  computed: {
    ...mapState({
      disableField: state => state.profile.disableField,
      fullProfile: state => state.profile.fullFormProfile,
      Customer: state => state.profile.fullFormProfile.Customer,
      dictionaries: state => state.profile.dictionaries,
      profile: state => state.profile,
      credits: state => state.credits,
      preApprovalData: state => state.credits.preApprovalData,
      loadings: state => state.profile.loadings
    }),

    taskId() {
      return this.$route.query.taskId;
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

    // "Customer.JobInfo.lastJobExperienceMonths"() {
    //   if (this.Customer.JobInfo.totalJobExperienceMonths) {
    //     this.$refs.workExperience.validate()
    //   }
    //    if (this.Customer.JobInfo.lastJobExperienceMonths) {
    //     this.$refs.totalWorkExperience.validate()
    //   }
    // },

    // "Customer.JobInfo.totalJobExperienceMonths"() {
    //   if (this.Customer.JobInfo.totalJobExperienceMonths) {
    //     this.$refs.workExperience.validate()
    //   }
    //    if (this.Customer.JobInfo.lastJobExperienceMonths) {
    //     this.$refs.totalWorkExperience.validate()
    //   }
    // },

    sameRegistration(flag) {
      if (flag) {
        //this.addFlagRegistration({ item: "Адрес фактического проживания", value: flag })
        this.removeRegistration({ item: "Адрес фактического проживания" });
        this.sameRegistration = null;
      } else {
        //this.addRegistration("Адрес фактического проживания");
        //this.addFlagRegistration({ item: "Адрес фактического проживания", value: flag })
      }
    }
  },
  methods: {
    async onSubmit(submitForm = true) {
      this.countRelativeDocumentName = -1;
      this.countGuaranteeDocumentName = -1;

      console.log("fullProfile", this.$store.state.profile);
      console.log("submit", submitForm);

      this.$refs.surname.validate();
      this.$refs.name.validate();
      this.$refs.mname.validate();
      this.$refs.birthday.validate();
      this.$refs.Country.validate();
      this.$refs.BirthCity.validate();
      this.$refs.inn.validate();
      this.$refs.pinpp.validate();
      this.$refs.sex.validate();

      this.$refs.documentType.validate();

      if (this.Customer.documentType == 7) {
        this.$refs.DocumentName.validate();
      } else {
        validItems(this.$refs, "DocumentName");
      }

      this.$refs.DocumentSeries.validate();
      this.$refs.DocumentNumber.validate();
      this.$refs.DocumentGivenDate.validate();
      this.$refs.DocumentExpirationDate.validate();

      this.$refs.DocumentRegionsGivenPlace.validate();
      this.$refs.DocumentGivenPlace.validate();

      this.$refs.education.validate();

      validFilter(this.$refs, "phonesValid", "phones");

      // Address
      validFilter(this.$refs, "regionValid", "region");
      validFilter(this.$refs, "districtValid", "district");

      validFilter(this.$refs, "streetValid", "street");
      validFilter(this.$refs, "houseNumberValid", "houseNumber");

      // Relatives
      validFilter(this.$refs, "relativesValid", "relatives");
      validFilter(this.$refs, "relativesSurnameValid", "relatives_surname");
      validFilter(this.$refs, "relativesNameValid", "relatives_name");
      validFilter(this.$refs, "relativesMnameValid", "relatives_mname");
      validFilter(this.$refs, "relativesBirthdayValid", "relatives_birthday");

      validFilter(
        this.$refs,
        "relativesDocumentDocumentTypeValid",
        "relativesDocumentDocumentType"
      );

      // this.Customer.Relatives.items.forEach(i => {
      //   if (i.Document.documentType == 7) {
      //     validFilter(this.$refs, "relativesDocumentDocumentNameValid" ,"relativesDocumentDocumentName");
      //   } else {
      //     validItems(this.$refs, "relativesDocumentDocumentNameValid");
      //   }
      // })

      // validItems(this.$refs, "relativesDocumentDocumentNameValid");

      this.Customer.Relatives.items.forEach(i => {
        if (i.Document.documentType == 7) {
          this.countRelativeDocumentName++;
          // console.log('relativesDocumentDocumentName', this.$refs.relativesDocumentDocumentName)
          validFilter(
            this.$refs,
            "relativesDocumentDocumentNameValid",
            "relativesDocumentDocumentName",
            true,
            this.countRelativeDocumentName
          );
        } else {
          validItems(this.$refs, "relativesDocumentDocumentNameValid");
        }
      });

      validFilter(
        this.$refs,
        "relativesDocumentSeriesValid",
        "relativesDocumentSeries"
      );
      validFilter(
        this.$refs,
        "relativesDocumentNumberValid",
        "relativesDocumentNumber"
      );
      validFilter(
        this.$refs,
        "relativesDocumentGivenDateValid",
        "relativesDocumentGivenDate"
      );
      validFilter(
        this.$refs,
        "relativesDocumentExpirationDateValid",
        "relativesDocumentExpirationDate"
      );
      validFilter(
        this.$refs,
        "relativesDocumentRegionsGivenPlaceValid",
        "relativesDocumentRegionsGivenPlace"
      );
      validFilter(
        this.$refs,
        "relativesDocumentGivenPlaceValid",
        "relativesDocumentGivenPlace"
      );

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

      // Guarantees
      if (this.fullProfile.Guarantee.RelatedPerson.items.length) {
        validFilter(this.$refs, "customersAttitudeValid", "customersAttitude");
        validFilter(this.$refs, "priceGuaranteesValid", "priceGuarantees");
        validFilter(this.$refs, "surnameGuaranteesValid", "surnameGuarantees");
        validFilter(this.$refs, "nameGuaranteesValid", "nameGuarantees");
        validFilter(this.$refs, "mnameGuaranteesValid", "mnameGuarantees");
        validFilter(
          this.$refs,
          "birthdayGuaranteesValid",
          "birthdayGuarantees"
        );
        validFilter(this.$refs, "innGuaranteesValid", "innGuarantees");
        validFilter(this.$refs, "pinppGuaranteesValid", "pinppGuarantees");

        validFilter(
          this.$refs,
          "guaranteesDocumentDocumentTypeValid",
          "guaranteesDocumentDocumentType"
        );

        this.fullProfile.Guarantee.RelatedPerson.items.forEach(i => {
          if (i.Document.documentType == 7) {
            this.countGuaranteeDocumentName++;
            validFilter(
              this.$refs,
              "guaranteesDocumentDocumentNameValid",
              "guaranteesDocumentDocumentName",
              true,
              this.countGuaranteeDocumentName
            );
          } else {
            validItems(this.$refs, "guaranteesDocumentDocumentNameValid");
          }
        });

        validFilter(
          this.$refs,
          "guaranteesDocumentSeriesValid",
          "guaranteesDocumentSeries"
        );
        validFilter(
          this.$refs,
          "guaranteesDocumentNumberValid",
          "guaranteesDocumentNumber"
        );
        validFilter(
          this.$refs,
          "guaranteesDocumentGivenDateValid",
          "guaranteesDocumentGivenDate"
        );
        validFilter(
          this.$refs,
          "guaranteesDocumentExpirationDateValid",
          "guaranteesDocumentExpirationDate"
        );
        validFilter(
          this.$refs,
          "guaranteesDocumentRegionsGivenPlaceValid",
          "guaranteesDocumentRegionsGivenPlace"
        );
        validFilter(
          this.$refs,
          "guaranteesDocumentGivenPlaceValid",
          "guaranteesDocumentGivenPlace"
        );
        validFilter(this.$refs, "regionGuaranteesValid", "regionGuarantees");
        validFilter(
          this.$refs,
          "districtGuaranteesValid",
          "districtGuarantees"
        );
        validFilter(this.$refs, "streetGuaranteesValid", "streetGuarantees");
        validFilter(
          this.$refs,
          "houseNumberGuaranteesValid",
          "houseNumberGuarantees"
        );
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
        validItems(this.$refs, "guaranteesDocumentDocumentTypeValid");
        validItems(this.$refs, "guaranteesDocumentDocumentNameValid");
        validItems(this.$refs, "guaranteesDocumentSeriesValid");
        validItems(this.$refs, "guaranteesDocumentNumberValid");
        validItems(this.$refs, "guaranteesDocumentGivenDateValid");
        validItems(this.$refs, "guaranteesDocumentExpirationDateValid");
        validItems(this.$refs, "guaranteesDocumentRegionsGivenPlaceValid");
        validItems(this.$refs, "guaranteesDocumentGivenPlaceValid");
        validItems(this.$refs, "districtGuaranteesValid");
        validItems(this.$refs, "regionGuaranteesValid");
        validItems(this.$refs, "streetGuaranteesValid");
        validItems(this.$refs, "houseNumberGuaranteesValid");
        validItems(this.$refs, "phonesGuaranteesValid");
      }

      if (this.fullProfile.Guarantee.RelatedLegalPerson.items.length) {
        validFilter(this.$refs, "priceGuaranteesValid", "priceGuarantees");
        validFilter(this.$refs, "CEOLastNameGuaranteesValid", "CEOLastName");
        validFilter(this.$refs, "CEOFirstNameGuaranteesValid", "CEOFirstName");
        validFilter(
          this.$refs,
          "CEOMiddleNameGuaranteesValid",
          "CEOMiddleName"
        );
        validFilter(this.$refs, "nameGuaranteesValid", "nameGuarantees");
        validFilter(this.$refs, "innGuaranteesValid", "innGuarantees");
        validFilter(
          this.$refs,
          "kindOfActivityGuaranteesValid",
          "kindOfActivityGuarantees"
        );
        validFilter(this.$refs, "regionGuaranteesValid", "regionGuarantees");
        validFilter(
          this.$refs,
          "districtGuaranteesValid",
          "districtGuarantees"
        );
        validFilter(this.$refs, "streetGuaranteesValid", "streetGuarantees");
        validFilter(
          this.$refs,
          "houseNumberGuaranteesValid",
          "houseNumberGuarantees"
        );
        validFilter(this.$refs, "phonesGuaranteesValid", "phonesGuarantees");
      } else {
        validItems(this.$refs, "priceGuaranteesValid");
        validItems(this.$refs, "CEOLastNameGuaranteesValid");
        validItems(this.$refs, "CEOFirstNameGuaranteesValid");
        validItems(this.$refs, "CEOMiddleNameGuaranteesValid");
        validItems(this.$refs, "nameGuaranteesValid");
        validItems(this.$refs, "innGuaranteesValid");
        validItems(this.$refs, "kindOfActivityGuaranteesValid");
        validItems(this.$refs, "regionGuaranteesValid");
        validItems(this.$refs, "districtGuaranteesValid");
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

      // this.$refs.productCreditthis.$refs.productCredit.validate();
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
      if (
        !!this.fullProfile.LoanInfo.LoanProduct &&
        this.fullProfile.LoanInfo.LoanProduct !== 3
      ) {
        this.$refs.typeRepayment.validate();
        // this.$refs.initialFee.validate();
      } else {
        validItems(this.$refs, "typeRepayment");
        // validItems(this.$refs, "initialFee");
      }

      if (!this.fullProfile.AttachedDocuments.items.length) {
        this.$refs.uploadFile.validate();
      } else {
        validItems(this.$refs, "uploadFile");
      }

      if (
        !this.fullProfile.Guarantee.Insurance.items.length ||
        !this.fullProfile.Guarantee.RelatedLegalPerson.items.length ||
        !this.fullProfile.Guarantee.RelatedPerson.items.length
      ) {
        this.guaranteesValid();
      } else {
        validItems(this.$refs, "guaranteesValid");
      }

      console.log("files", this.$refs.files);

      if (
        this.$refs.surname.hasError ||
        this.$refs.name.hasError ||
        this.$refs.mname.hasError ||
        this.$refs.birthday.hasError ||
        this.$refs.Country.hasError ||
        this.$refs.BirthCity.hasError ||
        this.$refs.inn.hasError ||
        this.$refs.pinpp.hasError ||
        this.$refs.sex.hasError ||
        this.$refs.documentType.hasError ||
        this.$refs.DocumentName.hasError ||
        this.$refs.DocumentSeries.hasError ||
        this.$refs.DocumentNumber.hasError ||
        this.$refs.DocumentGivenDate.hasError ||
        this.$refs.DocumentExpirationDate.hasError ||
        this.$refs.DocumentRegionsGivenPlace.hasError ||
        this.$refs.DocumentGivenPlace.hasError ||
        this.$refs.phonesValid.hasError ||
        this.$refs.education.hasError ||
        this.$refs.regionValid.hasError ||
        this.$refs.districtValid.hasError ||
        this.$refs.streetValid.hasError ||
        this.$refs.houseNumberValid.hasError ||
        //relatives
        this.$refs.relativesValid.hasError ||
        this.$refs.relativesSurnameValid.hasError ||
        this.$refs.relativesNameValid.hasError ||
        this.$refs.relativesMnameValid.hasError ||
        this.$refs.relativesBirthdayValid.hasError ||
        this.$refs.relativesDocumentDocumentTypeValid.hasError ||
        this.$refs.relativesDocumentDocumentNameValid.hasError ||
        this.$refs.relativesDocumentSeriesValid.hasError ||
        this.$refs.relativesDocumentNumberValid.hasError ||
        this.$refs.relativesDocumentGivenDateValid.hasError ||
        this.$refs.relativesDocumentExpirationDateValid.hasError ||
        this.$refs.relativesDocumentRegionsGivenPlaceValid.hasError ||
        this.$refs.relativesDocumentGivenPlaceValid.hasError ||
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
        this.$refs.guaranteesDocumentDocumentTypeValid.hasError ||
        this.$refs.guaranteesDocumentDocumentNameValid.hasError ||
        this.$refs.guaranteesDocumentSeriesValid.hasError ||
        this.$refs.guaranteesDocumentNumberValid.hasError ||
        this.$refs.guaranteesDocumentGivenDateValid.hasError ||
        this.$refs.guaranteesDocumentExpirationDateValid.hasError ||
        this.$refs.guaranteesDocumentRegionsGivenPlaceValid.hasError ||
        this.$refs.guaranteesDocumentGivenPlaceValid.hasError ||
        this.$refs.regionGuaranteesValid.hasError ||
        this.$refs.districtGuaranteesValid.hasError ||
        this.$refs.streetGuaranteesValid.hasError ||
        this.$refs.houseNumberGuaranteesValid.hasError ||
        this.$refs.phonesGuaranteesValid.hasError ||
        //info credit
        // this.$refs.productCredit.hasError ||
        this.$refs.priceCredit.hasError ||
        // this.$refs.typeRepayment.hasError ||
        // this.$refs.periodRepayment.hasError ||
        this.$refs.comfortablePeriodRepayment.hasError ||
        this.$refs.comfortableDayRepayment.hasError ||
        // this.$refs.typeCredit.hasError ||
        // this.$refs.initialFee.hasError ||
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
        if (submitForm === "start") {
          this.profile.confirmCredit = false;
        } else if (submitForm) {
          this.loader = true;
          this.fullProfile.ClientManagerLogin = this.$store.getters[
            "auth/username"
          ];
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
            AttachedDocuments
          } = this.fullProfile;

          Customer.FullName = `${Customer.LastName} ${Customer.FirstName} ${Customer.MiddleName}`;
          // Customer.Document.Number = Number(Customer.Document.Number)
          // Customer.Relatives.items.map(i => i.Document.Number = Number(i.Document.Number))
          // Guarantee.RelatedPerson.items.map(i => i.Document.Number = Number(i.Document.Number))
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
                  AttachedDocuments
                }
              }
            ]
          };

          console.log(JSON.stringify(data, null, 2));

          try {
            const response = await this.$store.dispatch(
              "credits/confirmationCredit",
              data
            );
            console.log("response", JSON.stringify(response, null, 2));
            //console.log('nextTaskId', response.nextTask.id)

            if (response) {
              this.$store.commit("credits/setMessage", "Credit complete");
              this.$store.commit("credits/removeTask", this.taskId);
              this.$router.push("/work/credit");
              //this.$router.go(-1);
            }

            this.loader = false;
          } catch (error) {
            this.$store.commit(
              "credits/setMessage",
              CommonUtils.filterServerError(error)
            );
            this.loader = false;
          }
        } else {
          this.profile.confirmCredit = true;
        }
      }
    },

    async onSubmit() {
      const data = {
        output: [
          {
            name: "application",
            data: {
              Status: "",
              BODecision: false,
              BOLogin: "",
              ClientManagerLogin: "man",
              CreditCommiteeDecisions: {
                items: []
              },
              Customer: {
                DigID: false,
                Email: "",
                FirstName: "SDFSD",
                LastName: "SDF",
                MiddleName: "SDF SDFSD",
                FullName: "SDF SDFSD SDF SDFSD",
                BirthDate: "08.09.1990",
                Country: 68,
                BirthCity: "DSFSD",
                INN: "123131313",
                PINPP: "23424324242342",
                ResidentFlag: "",
                Gender: 1,
                Document: {
                  documentType: 2,
                  Series: "SD",
                  Number: "2342424",
                  ExpirationDate: "31.08.2020",
                  GivenDate: "01.08.2020",
                  GUID: "",
                  Country: "Uzbekistan",
                  DocLink: "",
                  DocumentName: "",
                  Region: 5,
                  Districts: {
                    items: [
                      {
                        label: "НАВОИЙ ШАХРИ",
                        value: 58
                      },
                      {
                        label: "ЗАРАФШОН ШАХРИ",
                        value: 59
                      },
                      {
                        label: "Г.УЧКУДУК",
                        value: 60
                      },
                      {
                        label: "КАРМАНА ТУМАНИ",
                        value: 61
                      },
                      {
                        label: "КОНИМЕХ ТУМАНИ",
                        value: 62
                      },
                      {
                        label: "КИЗИЛТЕПА ТУМАНИ",
                        value: 63
                      },
                      {
                        label: "НАВБАХОР ТУМАНИ",
                        value: 64
                      },
                      {
                        label: "НУРОТА ТУМАНИ",
                        value: 65
                      },
                      {
                        label: "ХАТИРЧИ ТУМАНИ",
                        value: 66
                      },
                      {
                        label: "ТОМДИ ТУМАНИ",
                        value: 67
                      },
                      {
                        label: "УЧКУДУК ТУМАНИ",
                        value: 211
                      },
                      {
                        label: "ГОЗГОН ШАХРИ",
                        value: 224
                      }
                    ]
                  },
                  GivenPlace: 62
                },
                Education: 3,
                PhoneList: {
                  items: [
                    {
                      Number: "+998134345353"
                    }
                  ]
                },
                AddressList: {
                  items: [
                    {
                      Building: "",
                      OwnershipType: null,
                      HouseType: "",
                      PostalCode: "",
                      Region: 2,
                      District: 20,
                      Street: "SDF",
                      Block: "",
                      House: "12",
                      City: "",
                      Apartment: "",
                      AddressType: "Адрес постоянной регистрации",
                      Districts: {
                        items: [
                          {
                            label: "ОЛОТ ТУМАНИ",
                            value: 19
                          },
                          {
                            label: "ВОБКЕНТ ТУМАНИ",
                            value: 20
                          },
                          {
                            label: "ГИЖДУВОН ТУМАНИ",
                            value: 21
                          },
                          {
                            label: "БУХОРО ТУМАНИ",
                            value: 22
                          },
                          {
                            label: "КОРАКУЛ ТУМАНИ",
                            value: 23
                          },
                          {
                            label: "РОМИТАН ТУМАНИ",
                            value: 24
                          },
                          {
                            label: "ЖОНДОР ТУМАНИ",
                            value: 25
                          },
                          {
                            label: "ШОФИРКОН ТУМАНИ",
                            value: 26
                          },
                          {
                            label: "ПЕШКУ ТУМАНИ",
                            value: 27
                          },
                          {
                            label: "КОРОВУЛБОЗОР ТУМАНИ",
                            value: 28
                          },
                          {
                            label: "КОГОН ТУМАНИ",
                            value: 29
                          },
                          {
                            label: "БУХОРО ШАХРИ",
                            value: 30
                          },
                          {
                            label: "КОГОН ШАХРИ",
                            value: 220
                          }
                        ]
                      }
                    }
                  ]
                },
                MaritalStatus: 2,
                hasChildren: true,
                UnderAgeChildrenNum: 1,
                Relatives: {
                  items: [
                    {
                      FirstName: "GFHFH",
                      FamilyConnectionType: 2,
                      LastName: "SDF",
                      MiddleName: "FGHFGH",
                      BirthDate: "23.09.1989",
                      Document: {
                        documentType: 5,
                        Series: "SD",
                        Number: "2313131",
                        ExpirationDate: "31.08.2020",
                        GivenDate: "01.08.2020",
                        GUID: "",
                        Country: "",
                        DocLink: "",
                        DocumentName: "",
                        Region: 7,
                        Districts: {
                          items: [
                            {
                              label: "ОКДАРЁ ТУМАНИ",
                              value: 80
                            },
                            {
                              label: "БУЛУНГУР ТУМАНИ",
                              value: 81
                            },
                            {
                              label: "ГУЗАЛКЕНТСКИЙ",
                              value: 82
                            },
                            {
                              label: "ЖОМБОЙ ТУМАНИ",
                              value: 83
                            },
                            {
                              label: "ИШТИХОН ТУМАНИ",
                              value: 84
                            },
                            {
                              label: "КАТТАКУРГОН ТУМАНИ",
                              value: 85
                            },
                            {
                              label: "КУШРАБОТ ТУМАНИ",
                              value: 86
                            },
                            {
                              label: "НАРПАЙ ТУМАНИ",
                              value: 87
                            },
                            {
                              label: "НУРОБОД ТУМАНИ",
                              value: 88
                            },
                            {
                              label: "ПАСТДАРГОМ ТУМАНИ",
                              value: 89
                            },
                            {
                              label: "ПАХТАЧИ ТУМАНИ",
                              value: 90
                            },
                            {
                              label: "ПАЙАРИК ТУМАНИ",
                              value: 91
                            },
                            {
                              label: "САМАРКАНД ТУМАНИ",
                              value: 92
                            },
                            {
                              label: "ТАЙЛОК ТУМАНИ",
                              value: 93
                            },
                            {
                              label: "УРГУТ ТУМАНИ",
                              value: 94
                            },
                            {
                              label: "ЧЕЛЕКСКИЙ",
                              value: 95
                            },
                            {
                              label: "САМАРКАНД ШАХРИ",
                              value: 96
                            },
                            {
                              label: "КАТТАКУРГОН ШАХРИ",
                              value: 97
                            },
                            {
                              label: "ТЕМИРЮЛЬСКИЙ",
                              value: 215
                            },
                            {
                              label: "Г.АКТАШ",
                              value: 218
                            },
                            {
                              label: "Г.УРГУТ",
                              value: 219
                            }
                          ]
                        },
                        GivenPlace: 86
                      }
                    }
                  ]
                },
                JobInfo: {
                  employerActivityType: null,
                  positionType: null,
                  INN: "",
                  employeesNum: 0,
                  employerName: "",
                  totalJobExperienceMonths: 0,
                  activeYears: 0,
                  position: "",
                  type: 4,
                  lastJobExperienceMonths: 0
                },
                MonthlyExpenses: {
                  recurringExpenses: 2000000,
                  obligations: 0
                },
                MonthlyIncome: {
                  confirmMonthlyIncome: 10000000,
                  hasAdditionalIncome: false,
                  additionalIncome: {
                    incomeType: null,
                    sum: 0
                  }
                },
                PropertyInformation: {
                  Realty_new: {
                    items: []
                  },
                  Transport_new: {
                    items: []
                  }
                }
              },
              Guarantee: {
                Insurance: {
                  items: [
                    {
                      INN: "305684696",
                      OrgName: '"OOO ""APEX INSURANCE"""',
                      Sum: 50000000
                    }
                  ]
                },
                RelatedLegalPerson: {
                  items: []
                },
                RelatedPerson: {
                  items: []
                }
              },
              LoanInfo: {
                LoanProduct: 1,
                Sum: 20000000,
                Currency: "СУМ",
                RepaymentType: 1,
                LoanType: null,
                MinInterestRate: 32,
                MaxInterestRate: 32,
                MaxDefferalRepaymentPeriod: 0,
                ConvenientRepaymentTerm: 5,
                TermInMonth: 12,
                MaxTermInMonths: 12,
                MinTermInMonths: 1,
                InitialPayment: 0,
                MaxInitialPaymentPercent: 0,
                MinInitialPaymentPercent: 0,
                LoanPurpose: 261,
                FundingSource: 1,
                FacilitiesForRepaymentDate: false,
                consumerLoan: {
                  nameBankProd: "",
                  nameService: "",
                  agreementDate: "",
                  nameProduction: "",
                  billProd: "",
                  agreementNumber: "",
                  idBankProd: 0
                }
              },
              ApplicationComment: {
                items: []
              },
              AttachedDocuments: {
                items: [
                  {
                    id: 1557,
                    DocLink: "",
                    DocumentName: "SDF"
                  }
                ]
              }
            }
          }
        ]
      };

      console.log(JSON.stringify(data, null, 2));

      try {
        const response = await this.$store.dispatch(
          "credits/confirmationCredit",
          data
        );
        console.log("response", JSON.stringify(response, null, 2));
        //console.log('nextTaskId', response.nextTask.id)

        if (response) {
          this.$store.commit("credits/setMessage", "Credit complete");
          this.$store.commit("credits/removeTask", this.taskId);
          this.$router.push("/work/credit");
          //this.$router.go(-1);
        }

        this.loader = false;
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          CommonUtils.filterServerError(error)
        );
        this.loader = false;
      }
    },

    async getDataINPS() {
      this.bankLoading = true;

      const data = {
        input: [
          {
            name: "passSerial",
            data: this.Customer.Document.Series
          },
          {
            name: "passNumber",
            data: this.Customer.Document.Number
          },
          {
            name: "pin",
            data: this.Customer.PINPP
          },
          {
            name: "application_id",
            data: this.profile.preapprove_num
          },
          {
            name: "from",
            data: "getData"
          }
        ]
      };

      try {
        this.dataINPS = await this.$store.dispatch("profile/dataINPS", data);
        if (this.dataINPS) {
          const INPSItems = this.dataINPS.wages.items.map(i => {
            return {
              period: CommonUtils.dateFilter(i.period),
              send_date: i.send_date,
              inn: i.inn,
              total_invoices: {
                balance: i.total_invoices.balance,
                percent: i.total_invoices.percent,
                full: i.total_invoices.full
              },
              org_addres: i.org_addres,
              org_name: i.org_name
            };
          });

          this.dataINPS.wages.items = INPSItems;
          console.log("dataINPS", this.dataINPS);
        }

        this.bankLoading = false;
        this.INPSBar = true;
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          CommonUtils.filterServerError(error)
        );
        this.loader = false;
        this.bankLoading = false;
      }
    },

    setINNCompany(companyName, idx) {
      console.log(companyName, idx);
      const company = this.dictionaries.Insurance_company.items.find(
        i => i.label == companyName
      );
      if (company) {
        this.fullProfile.Guarantee.Insurance.items[idx].INN = company.INN;
      }
    },

    validDatePerson(date) {
      if (this.Customer.Document.ExpirationDate) {
        this.$refs.DocumentExpirationDate.validate();
      }

      if (this.Customer.Document.GivenDate) {
        this.$refs.DocumentGivenDate.validate();
      }
    },

    validWorkExperience() {
      if (this.Customer.JobInfo.totalJobExperienceMonths) {
        this.$refs.workExperience.validate();
      }

      if (this.Customer.JobInfo.lastJobExperienceMonths) {
        this.$refs.totalWorkExperience.validate();
      }
    },

    validDateRelatives(date, idx) {
      if (this.Customer.Relatives.items[idx].Document.ExpirationDate) {
        this.$refs.relativesDocumentExpirationDate[idx].validate();
      }

      if (this.Customer.Relatives.items[idx].Document.GivenDate) {
        this.$refs.relativesDocumentGivenDate[idx].validate();
      }
    },

    validDateGuarantees(date, idx) {
      console.log(date);
      if (
        this.fullProfile.Guarantee.RelatedPerson.items[idx].Document
          .ExpirationDate
      ) {
        this.$refs.guaranteesDocumentExpirationDate[idx].validate();
      }
      if (
        this.fullProfile.Guarantee.RelatedPerson.items[idx].Document.GivenDate
      ) {
        this.$refs.guaranteesDocumentGivenDate[idx].validate();
      }
    },

    onChangeLoan(credit) {
      console.log("Аннуит, диффер");
      this.fullProfile.LoanInfo.RepaymentType = null;
      this.options.RepaymentType = [];

      this.fullProfile.LoanInfo.consumerLoan = {
        nameBankProd: "", // Наименование банка
        nameService: "", // Наименование товара/работы/услуги
        agreementDate: "", // Дата договора
        nameProduction: "", // Наименование продавца
        billProd: "", // Расчетный счет продавца
        agreementNumber: "", // Номер договора
        idBankProd: 0
      };
      this.fullProfile.LoanInfo.InitialPayment = 0;

      this.setLoan(credit);
    },

    setLoan(credit) {
      console.log("credit", credit);
      const idx = this.dictionaries.LoanDetails.items.findIndex(
        item => item.LOAN_ID == credit
      );
      console.log("idx", idx);
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

      // источник финансирования
      this.options.FinancialSources = this.dictionaries.LOANPRODUCT_FINSOURCE.items[0][
        credit
      ];
    },

    setGivenPlace(event, idx, item) {
      console.log("event", event, idx, item);
      const districts = this.getDistricts(event);
      this.$store.commit("profile/setGivenPlace", { idx, item, districts });
    },

    setDistricts(event, idx, item) {
      console.log("event", event, idx, item);
      const districts = this.getDistricts(event);
      this.$store.commit("profile/setDistricts", { idx, item, districts });
    },

    setGivenPlaceGuarantee(event, idx, guarantee) {
      //console.log('event', event, idx, guarantee)
      const districts = this.getDistricts(event);
      this.$store.commit("profile/setGivenPlaceGuarantee", {
        idx,
        guarantee,
        districts
      });
    },

    setDistrictsGuarantee(event, idx, guarantee) {
      //console.log('event', event, idx, guarantee)
      const districts = this.getDistricts(event);
      this.$store.commit("profile/setDistrictsGuarantee", {
        idx,
        guarantee,
        districts
      });
    },

    getDistricts(id) {
      const { region_id } = this.dictionaries.Region.items.find(
        i => i.value == id
      );
      return this.dictionaries.Districts.items[0][region_id];
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
      this.guaranteeCount.push(guarantee);
      this.$store.commit("profile/addInsurance");
    },

    addRelatedLegalPerson(guarantee) {
      this.guaranteeCount.push(guarantee);
      this.$store.commit("profile/addRelatedLegalPerson");
    },

    addRelatedPerson(guarantee) {
      this.guaranteeCount.push(guarantee);
      this.$store.commit("profile/addRelatedPerson");
    },

    removeItem(payload) {
      this.$store.commit("profile/removeItem", payload);
    },

    removeGuarantee(payload) {
      this.guaranteeCount.pop();
      this.$store.commit("profile/removeGuarantee", payload);
    },

    confirmDeleteItem(name, func, item, index, index2) {
      this.confirm = true;
      this.itemName = name;
      this.itemFunc = func;
      this.payload = {
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

    addFlagRegistration(payload) {
      this.$store.commit("profile/addFlagRegistration", payload);
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
      this.$refs.dragover.classList.remove("dragover");
      let uploadedFiles = event.dataTransfer.files;
      console.log("uploadFile", uploadedFiles);
      // e.dataTransfer.files
      this.uploadFile(uploadedFiles);
    },

    dragoverFile() {
      this.$refs.dragover.classList.add("dragover");
    },

    dragenterFile() {
      this.$refs.dragover.classList.add("dragover");
    },

    dragleaveFile(event) {
      let fileBlock = this.$refs.dragover.getBoundingClientRect();

      if (
        event.pageX < fileBlock.left ||
        event.pageX > fileBlock.right ||
        event.pageY < fileBlock.top ||
        event.pageY > fileBlock.bottom
      ) {
        this.$refs.dragover.classList.remove("dragover");
      }
    },

    handleFilesUpload() {
      this.loaderFile = false;
      let uploadedFiles = this.$refs.files.files;
      console.log("uploadFile", uploadedFiles);
      this.uploadFile(uploadedFiles);
    },

    // uploadFile(uploadedFiles) {
    //   let result = []
    //   let idx = -1
    //   for (let file of uploadedFiles) {
    //     if (this.files.length) {
    //       let idx = this.files.findIndex(i => i.lastModified == file.lastModified)
    //     }
    //     if (idx == -1) {
    //       this.files.push(file);
    //     }

    //     this.filesAll.push({
    //       name: file.name,
    //       DocumentName: "",
    //       id: null,
    //       upload: false
    //     });
    //   }

    //   // console.log("result", result);
    //   console.log("files", this.files);
    //   console.log("filesAll", this.filesAll);
    // },

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
        let onlyNullId = this.filesAll.filter(i => i.id === null);

        for (let i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          let documentTypes = onlyNullId[i].DocumentName;
          formData.append("files", file);
          formData.append("documentTypes", documentTypes);
        }

        console.log("formData", formData.getAll("files"));

        try {
          const response = await this.$store.dispatch(
            "profile/uploadFiles",
            formData
          );
          console.log("resFile", response);
          if (response) {
            this.files = []; // удалить все файлы после загрузки на сервер
            this.loaderFile = false;
            for (let el of response.infos) {
              const item = this.filesAll.find(i => i.id === null);
              item.id = Number(el.id);
            }
          } else {
            this.loaderFile = false;

            // el.upload = true; // загрузка была, но прошла не удачна
            this.filesAll
              .filter(i => i.id === null)
              .map(i => (i.upload = true));
          }
        } catch (error) {
          this.$store.commit(
            "credits/setMessage",
            CommonUtils.filterServerError(error)
          );
        }
      }

      // удалить все не загруженные файлы перед отправкой на сервер!!!!
      this.fullProfile.AttachedDocuments.items = this.filesAll
        .filter(i => i.id !== null)
        .map(
          i =>
            (i = {
              id: i.id,
              DocLink: "",
              DocumentName: i.DocumentName
            })
        );
      console.log("document", this.fullProfile.AttachedDocuments);
    },

    removeAllFile() {
      this.files = [];
      const uploadFiles = this.filesAll.filter(i => i.id !== null);
      this.filesAll = uploadFiles;
    },

    removeFile(idx) {
      this.files.splice(idx - (this.filesAll.length - this.files.length), 1); // index для не загруженных файлов
      this.filesAll.splice(idx, 1);
    },

    async removeUploadFile(payload) {
      try {
        console.log("idFile", this.filesAll[payload.index].id);
        const idFile = this.filesAll[payload.index].id;
        const response = await this.$store.dispatch(
          "profile/removeFiles",
          idFile
        );

        console.log("delFile", response);
        if (response == "OK") {
          this.filesAll.splice([payload.index], 1);
          const idx = this.fullProfile.AttachedDocuments.items.findIndex(
            i => i.id == idFile
          );
          if (idx != -1) {
            this.fullProfile.AttachedDocuments.items.splice(idx, 1);
          }
        }
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          CommonUtils.filterServerError(error)
        );
      }
    },

    addFiles() {
      this.$refs.files.click();
    },

    addComment() {
      const comment = {
        Comment: this.creditManagerComment,
        Type: "",
        CommentPerson: this.$store.getters["auth/username"]
        //id: 0,
        //CommentDate: ""
      };

      this.$store.commit("profile/addComment", {
        commentBlock: "ApplicationComment",
        comment
      });
      this.creditManagerComment = "";
      console.log("comments", this.fullProfile.ApplicationComment);
    },

    msecond(val) {
      return new Date(val.slice(-4) + val.slice(2, 6) + val.slice(0, 2));
    },

    adulthoodValid(date) {
      return (
        (this.msecond(this.currentDate) - this.msecond(date) - 432000000) /
          1000 /
          60 /
          60 /
          24 /
          365 >
        18
      ); // с учетом высокосных годов (4)
    },

    guaranteesValid() {
      console.log(this.$refs.guaranteesValid);
      this.totalGuaranteesSum = 0;

      for (let guarantee in this.fullProfile.Guarantee) {
        for (let i of this.fullProfile.Guarantee[guarantee].items) {
          this.totalGuaranteesSum = this.totalGuaranteesSum + i.Sum;
        }
      }

      console.log("totalGuaranteesSum", this.totalGuaranteesSum);
      this.$refs.guaranteesValid.validate();
      this.$refs.priceCredit.validate();
    },

    givenPlaceValid(val) {
      return (
        val.match(/[^А-Яа-яa-z0-9]+$/) ||
        "Введите на латинице заглавными буквами"
      ); // все кроме кирилицы
    },

    fioValid(val) {
      return val.match(/^[A-Z]+$/) || "Введите на латинице заглавными буквами"; // только латинские буквы
    },

    mValid(val) {
      return (
        val.match(/^([A-Z']+\s)*[A-Z']+$/) ||
        "Введите на латинице заглавными буквами"
      ); // только латинские буквы
    },

    phoneValid(val) {
      return !val.match(/(?=([^1-9]))\1{7,}/) || "Неверные данные";
    },

    docNumberValid(val) {
      return !val.match(/(?=(.))\1{7,}/) || "Неверные данные";
    },

    innValid(val) {
      return !val.match(/(?=(.))\1{9,}/) || "Неверные данные";
    },

    pinppValid(val) {
      return !val.match(/(?=(.))\1{14,}/) || "Неверные данные";
    },

    async printFile(fileData, idx) {
      this.disable = true;
      this.loadings.splice(idx, 1, true); // для ререндеринга (особенность vue)
      let file = null;
      this.fileData.type = fileData.label;
      this.fileData.data = dataTransform(fileData.data);
      try {
        console.log(JSON.stringify(this.fileData, null, 2));

        if (this.profile.fileList[idx].idFile) {
          file = await this.$store.dispatch(
            "credits/getFile",
            this.profile.fileList[idx].idFile
          );
        } else {
          file = await this.$store.dispatch("credits/getFile", this.fileData);

          this.profile.fileList[idx].idFile = file.id;
        }

        console.log("file", file);

        if (file) {
          printJS(file.url);
          window.URL.revokeObjectURL(file.url);
        }

        this.disable = false;
        this.loadings.splice(idx, 1, false);
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          CommonUtils.filterServerError(error)
        );
        this.disable = false;
        this.loadings.splice(idx, 1, false);
      }
    },

    // dataTransform(data) {

    //   for (let i in data) {
    //     if (data[i] != null) {
    //       if (data[i].items) {
    //         data[i] = data[i].items
    //         this.dataTransform(data[i])
    //       }
    //     }
    //   }
    //   return data
    // },

    filterFn(val, update) {
      console.log("filterFn", val);
      if (val === "") {
        update(() => {
          console.log(this.dictionaries.Countries);
          this.options.Countries = this.dictionaries.Countries.items;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        console.log("needle", needle);
        this.options.Countries = this.dictionaries.Countries.items.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    }
  },
  components: {
    appLoader: Loader,
    appFullProfile: FullProfile,
    appLoaderFullScreen: LoaderFullScreen,
    appSetDataINPS: SetDataINPS,
    appGetDataINPS: GetDataINPS
    // appInfoList: InfoList
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

    .comments {
      margin-bottom: 20px;
    }

    &_title {
      font-size: 16px;
      margin: 0;
      line-height: 1.4;
      color: #212121;
      font-weight: bold;
    }

    .q-field--auto-height .q-field__control-container {
      display: block;
    }
  }

  .guarantees {
    .q-field__control {
      // color: rgba(0, 0, 0, 0.87);
    }

    .q-field--auto-height .q-field__control,
    .q-field--auto-height,
    .q-field__native {
      min-height: 40px;
    }

    .q-field--standard .q-field__control:after {
      // border-width: 0;
      // height: 0;
    }

    .q-field--standard .q-field__control:after {
      height: auto;
      top: 0;
      background: none;
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
    color: #000;
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
    margin: 5px;
  }

  .sliderCredit {
    margin: 20px 15px;
  }

  .commentCredit {
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
