<template>
  <div class="fullProfile">
    <div class="loaderForm" v-if="loaderForm">
      <appLoader />
    </div>
    <div v-else class="row q-px-md">
      <div class="col-10">
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
                    disable
                    ref="birthday"
                    outlined
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
                    outlined
                    v-model="Customer.PINPP"
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
                    :disable="disableField"
                    ref="sex"
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
                            msecond(val) >
                              msecond(Customer.Document.GivenDate) ||
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
                    outlined
                    v-model="Customer.Document.GivenPlace"
                    :options="Customer.Document.Districts.items"
                    dense
                    label="Кем выдан документ (ИИБ)"
                    :rules="[
                      val => !!val || 'Введите кем выдан документ (ИИБ)'
                    ]"
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
                    outlined
                    v-model="fullProfile.Customer.CardNumber"
                    @input="cardNumber($event)"
                    dense
                    label="Номер карты НБУ"
                    error-message="Неверные данные"
                    :error="!this.isValidNumCard"
                  />
                </div> -->

                <!-- <div class="col-4">
                  <q-input
                    :disable="disableField"
                    outlined
                    v-model="fullProfile.Customer.CardNumber"
                    dense
                    label="Номер карты"
                    mask="################"
                    :rules="[
                      val =>
                          (val && val.length === 16) ||
                          'Количество символов должно быт ровно 16',
                        val =>
                          !val.match(/(?=(.))\1{16,}/) || 'Неверные данные'
                    ]"
                  />
                </div> -->

                <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="BankInps"
                      
                      outlined
                      v-model="fullProfile.Customer.BankInps"
                      dense
                      label="Банк ИНПС"
                      mask="#####"
                      :rules="[
                        val =>
                          (val && val.length === 5) ||
                          'Количество символов должно быт ровно 5'
                      ]"
                    />
                  </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-select
                    :disable="disableField"
                    ref="education"
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

              <div v-if="Customer.LSBO" class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-checkbox
                      disable
                      left-label
                      v-model="Customer.LSBO"
                      label="ЛСБО"
                    />
                  </div>

                  <div class="col-4">
                    <q-input
                      disable
                      outlined
                      v-model="Customer.filial"
                      dense
                      label="Номер филиала"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      disable
                      outlined
                      v-model="Customer.role"
                      dense
                      label="Должность"
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

              <div class="row q-col-gutter-md">
                <div class="col-6">
                  <div
                    class="fieldset_block"
                    v-for="(phone, index) of Customer.PhoneList.items"
                    :key="'PhoneList' + index"
                  >
                    <h6 class="legend_title">Телефон {{ index + 1 }}</h6>
                    <div class="row q-col-gutter-md">
                      <div class="col-12">
                        <q-input
                          :disable="(index === 0 ? true : false) || disableField"
                          ref="phones"
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
                      v-if="index > 0"
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
                  </div>

                  <q-btn
                    :disable="disableField"
                    label="Добавить номер телефона"
                    @click="addPhone"
                    class="addItem"
                  ></q-btn>
                </div>

                <div class="col-6">
                  <h6 class="legend_title">Электронная почта</h6>
                  <div class="row q-col-gutter-md">
                    <div class="col-12">
                      <q-input
                        :disable="disableField"
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

              
            </div>
          </div>

          <!-- Address -->
          <div class="address">
            <h4 class="tab-title" ref="address" @click="toggleForm('address')">
              Адреса клиента
            </h4>
            <div class="tab-content" ref="tabContent">
              <div
                v-for="(address, index) of Customer.AddressList.items"
                :key="address.AddressType"
                class="fieldset_block"
              >
                <h6 class="legend_title">
                  {{ address.AddressType }}
                </h6>

                <div
                  v-if="address.AddressType === 'Адрес фактического проживания'"
                  class="row q-col-gutter-md"
                >
                  <div class="col-4">
                    <q-select
                      :disable="disableField"
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
                        
                        outlined
                        v-model="address.Building"
                        dense
                        label="Строение"
                      />
                    </div> -->
                  <div class="col-4">
                    <q-input
                      :disable="address.flag || disableField"
                      outlined
                      v-model="address.Apartment"
                      dense
                      label="Номер квартиры"
                    />
                  </div>
                  <div class="col-4">
                    <q-select
                      :disable="address.flag || disableField"
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

                <q-btn
                  v-if="address.AddressType == 'Адрес временной регистрации'"
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
              </div>

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
                    outlined
                    v-model="Customer.UnderAgeChildrenNum"
                    mask="##"
                    dense
                    label="Количество детей до 18 лет"
                    class="q-pb-sm"
                  />
                </div>
              </div>

              <div
                class="fieldset_block"
                v-for="(relative, index) of Customer.Relatives.items"
                :key="'Relatives' + index"
              >
                <h6 class="legend_title">Родственник {{ index + 1 }}</h6>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-select
                      :disable="disableField"
                      ref="relatives"
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
                      outlined
                      v-model="relative.Document.DocumentName"
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
                      ref="relativesDocumentSeries"
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
                      outlined
                      v-model="relative.Document.Number"
                      dense
                      label="Номер документа"
                      mask="#######"
                      :rules="[
                        val =>
                          (val && val.length === 7) ||
                          'Введите номер документа',
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
                      outlined
                      v-model="relative.Document.GivenPlace"
                      :options="relative.Document.Districts.items"
                      dense
                      label="Кем выдан документ (ИИБ)"
                      :rules="[
                        val => !!val || 'Введите кем выдан документ (ИИБ)'
                      ]"
                      emit-value
                      map-options
                      class="q-pb-sm"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-checkbox
                      disable
                      left-label
                      v-model="relative.LSBO"
                      label="ЛСБО"
                    />
                  </div>

                  <div class="col-4">
                    <q-input
                      disable
                      outlined
                      v-model="relative.filial"
                      dense
                      label="Номер филиала"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      disable
                      outlined
                      v-model="relative.role"
                      dense
                      label="Должность"
                    />
                  </div>
                </div>

                <q-btn
                  :disable="disableField"
                  v-if="index > 0"
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
              </div>

              <q-btn
                :disable="disableField"
                label="Добавить родственника"
                @click="addRelative"
                class="addItem"
              ></q-btn>

              <q-btn
                v-if="preapprove_num"
                :loading="LSBOLoading"
                label="Получить данные ЛСБО"
                @click="getLSBO"
                class="addItem"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </div>
          </div>

          <!-- Information on work -->
          <div class="infoWork tab">
            <h4
              class="tab-title"
              ref="infoWork"
              @click="toggleForm('infoWork')"
            >
              Сведения по основной работе
            </h4>
            <div class="tab-content" ref="tabContent">
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-select
                    :disable="disableField"
                    ref="kindOfActivity"
                    outlined
                    v-model="Customer.JobInfo.type"
                    @input="resetJobInfo()"
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
                        outlined
                        v-model="Customer.JobInfo.employerName"
                        dense
                        label="Наименование работодателя"
                        :rules="[
                          val => !!val || 'Введите наименование работодателя'
                        ]"
                      />
                    </div>
                    <div class="col-4">
                      <q-input
                        :disable="disableField"
                        ref="innOfEmployer"
                        outlined
                        v-model="Customer.JobInfo.INN"
                        dense
                        label="ИНН работодателя"
                        mask="#########"
                        :rules="[
                          val =>
                            (val && val.length == 9) ||
                            'Введите ИНН работодателя',
                          val => INNYurValid(val)
                        ]"
                      />
                    </div>
                    <div class="col-4">
                      <q-select
                        :disable="disableField"
                        ref="typeOrganization"
                        outlined
                        v-model="Customer.JobInfo.employerActivityType"
                        :options="dictionaries.BusinessType.items"
                        dense
                        label="Вид деятельности организации"
                        emit-value
                        map-options
                        :rules="[
                          val =>
                            !!val || 'Выберите вид деятельности организации'
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
                        outlined
                        v-model="Customer.JobInfo.employeesNum"
                        :options="dictionaries.employeesNum.items"
                        dense
                        label="Количество работников организации"
                        emit-value
                        map-options
                        :rules="[
                          val =>
                            !!val ||
                            'Выберите количество работников организации'
                        ]"
                        class="q-pb-sm"
                      />
                    </div>
                    <!-- <div class="col-4">
                      <q-input
                        :disable="disableField"
                        ref="position"
                        
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
                        outlined
                        v-model="Customer.JobInfo.employerActivityType"
                        :options="dictionaries.BusinessType.items"
                        dense
                        label="Вид деятельности организации"
                        emit-value
                        map-options
                        :rules="[
                          val =>
                            !!val || 'Выберите вид деятельности организации'
                        ]"
                        class="q-pb-sm"
                      />
                    </div>
                    <div class="col-4">
                      <q-select
                        :disable="disableField"
                        ref="activityPeriod"
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

                  <div class="row q-col-gutter-md">
                      <div class="col-4">
                        <q-input
                          :disable="disableField"
                          ref="nameOfEmployer2"
                          outlined
                          v-model="Customer.JobInfo.employerName"
                          dense
                          label="Наименование организации"
                          :rules="[
                            val => !!val || 'Введите наименование работодателя'
                          ]"
                        />
                      </div>
                      <div class="col-4">
                        <q-input
                          :disable="disableField"
                          ref="innOfEmployer2"
                          outlined
                          v-model="Customer.JobInfo.INN"
                          dense
                          label="ИНН организации"
                          mask="#########"
                          :rules="[
                            val =>
                              (val && val.length == 9) ||
                              'Введите ИНН работодателя',
                            val => INNYurValid(val)
                          ]"
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
                <!-- <div class="col-4">
                  <q-input
                    disable
                    ref="income"
                    
                    outlined
                    v-model.number="Customer.MonthlyIncome.confirmMonthlyIncome"
                    type="number"
                    dense
                    label="Подтвержденный ежемесячный доход"
                    lazy-rules
                    :rules="[val => !!val || 'Поле должно быть заполнено']"
                  />
                </div> -->

                <div class="col-4">
                  <div class="creditBlock">
                    <p class="labelCredit">Подтвержденный ежемесячный доход</p>
                    <span class="valueCredit">{{
                      Customer.MonthlyIncome.confirmMonthlyIncome | formatNumber
                    }}</span>
                  </div>
                </div>

                <!-- <div class="col-4">
                  <q-input
                    disable
                    ref="expense"
                    
                    outlined
                    v-model.number="Customer.MonthlyExpenses.recurringExpenses"
                    type="number"
                    dense
                    label="Периодические расходы "
                    lazy-rules
                    :rules="['Поле должно быть заполнено']"
                  />
                </div> -->

                <div class="col-4">
                  <div class="creditBlock">
                    <p class="labelCredit">
                      Периодические расходы (коммунальные расходы, налоги и др.)
                    </p>
                    <span class="valueCredit">{{
                      Customer.MonthlyExpenses.recurringExpenses | formatNumber
                    }}</span>
                  </div>
                </div>

                <!-- <div class="col-4">
                  <q-input
                    disable
                    ref="otherExpenses"
                    
                    outlined
                    v-model.number="Customer.MonthlyExpenses.obligations"
                    type="number"
                    dense
                    label="Плата за облуживание других обязательств"
                    lazy-rules
                    :rules="['Поле должно быть заполнено']"
                  />
                </div> -->

                <div class="col-4">
                  <div class="creditBlock">
                    <p class="labelCredit">
                      Плата за облуживание других обязательств
                    </p>
                    <span class="valueCredit">{{
                      Customer.MonthlyExpenses.obligations | formatNumber
                    }}</span>
                  </div>
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-select
                    disable
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
                  <!-- <div class="col-4">
                    <q-input
                      disable
                      
                      outlined
                      v-model.number="
                        Customer.MonthlyIncome.additionalIncome.sum
                      "
                      type="number"
                      dense
                      label="Размер дополнительного дохода"
                      class="q-pb-sm"
                    />
                  </div> -->

                  <div class="col-4">
                    <div class="creditBlock">
                      <p class="labelCredit">Размер дополнительного дохода</p>
                      <span class="valueCredit">{{
                        Customer.MonthlyIncome.additionalIncome.sum
                          | formatNumber
                      }}</span>
                    </div>
                  </div>

                  <div class="col-4">
                    <q-select
                      disable
                      outlined
                      v-model="
                        Customer.MonthlyIncome.additionalIncome.incomeType
                      "
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
                <!-- <div class="col-4">
                  <q-input
                    
                    outlined
                    v-model.number="fullProfile.LoanInfo.max_loan_sum_preapprove"
                    type="number"
                    dense
                    disable
                    label="Расчетная сумма кредита"
                    class="q-pb-sm"
                  />
                </div> -->

                <div class="col-4">
                  <div class="creditBlock">
                    <p class="labelCredit">Расчетная сумма кредита</p>
                    <span class="valueCredit">{{
                      fullProfile.LoanInfo.max_loan_sum_preapprove
                        | formatNumber
                    }}</span>
                  </div>
                </div>

                <!-- <div class="col-4">
                  <q-input
                    
                    outlined
                    v-model.number="fullProfile.LoanInfo.ProductMaxSum"
                    type="number"
                    dense
                    disable
                    label="Максимальная сумма кредитного продукта"
                    class="q-pb-sm"
                  />
                </div> -->

                <div class="col-4">
                  <div class="creditBlock">
                    <p class="labelCredit">
                      Максимальная сумма кредитного продукта
                    </p>
                    <span class="valueCredit">{{
                      fullProfile.LoanInfo.ProductMaxSum | formatNumber
                    }}</span>
                  </div>
                </div>

                <!-- <div class="col-4">
                  <q-input
                    disable
                    
                    outlined
                    type="number"
                    dense
                    label="Среднемесячная заработная плата (сум)"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    disable
                    
                    outlined
                    type="number"
                    dense
                    label="Профит"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    disable
                    
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
                
                label="Получить данные с Халк банка"
                @click="getInfoBank"
                class="addItem"
              > -->

              <q-btn
                v-if="preapprove_num"
                :loading="bankLoading"
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
              <div
                class="fieldset_block"
                v-for="(property, index) of Customer.PropertyInformation
                  .Realty_new.items"
                :key="'Realty_new' + index"
              >
                <h6 class="legend_title">Недвижимость {{ index + 1 }}</h6>
                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-select
                      :disable="disableField"
                      ref="typeProperties"
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
                      outlined
                      v-model="property.MarketValue"
                      @input="formatNumberItems('Realty_new', 'MarketValue', index)"
                      dense
                      label="Рыночная стоимость"
                      :rules="[
                        val => !!val || 'Поле должно быть заполнено',
                        val => val != 0 || 'Некорректные данные'
                      ]"
                    />
                  </div>
                </div>

                <q-btn
                  :disable="disableField"
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
              </div>

              <q-btn
                :disable="disableField"
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
              <div
                class="fieldset_block"
                v-for="(vehicle, index) of Customer.PropertyInformation
                  .Transport_new.items"
                :key="'Transport_new' + index"
              >
                <h6 class="legend_title">
                  Транспортное средство {{ index + 1 }}
                </h6>
                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-select
                      :disable="disableField"
                      ref="typeVehicles"
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
                      outlined
                      v-model="vehicle.transportBrand"
                      dense
                      label="Марка транспортного средства"
                      :rules="[val => !!val || 'Поле должно быть заполнено']"
                    />
                  </div>
                  <div class="col-4">
                    <q-select
                      :disable="disableField"
                      ref="yearsOfIssue"
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
                      outlined
                      v-model="vehicle.MarketValue"
                      @input="formatNumberItems('Transport_new', 'MarketValue', index)"
                      dense
                      label="Рыночная стоимость"
                      :rules="[
                        val => !!val || 'Введите рыночную стоимость',
                        val => val != 0 || 'Некорректные данные'
                      ]"
                    />
                  </div>
                </div>

                <q-btn
                  :disable="disableField"
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
              </div>

              <q-btn
                :disable="disableField"
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
                    outlined
                    v-model="fullProfile.LoanInfo.Sum"
                    @input="guaranteesValid('LoanInfo')"
                    dense
                    label="Запрашиваемая сумма кредита"
                    :rules="[
                      val => !!val || 'Введите сумму кредита',
                      val => val != 0 || 'Некорректные данные',
                      val =>
                        totalGuaranteesSum -
                          Number(
                            String(fullProfile.LoanInfo.Sum).replace(
                              /[^0-9]/gim,
                              ''
                            )
                          ) >=
                          Number(
                            String(fullProfile.LoanInfo.Sum).replace(
                              /[^0-9]/gim,
                              ''
                            )
                          ) *
                            (profile.percent / 100) ||
                        `Сумма всех гарантий должна быть больше запрашиваемой суммы кредита на ${profile.percent}%`,
                      max_loan_sum
                        ? val =>
                            Number(String(val).replace(/[^0-9]/gim, '')) <=
                              max_loan_sum ||
                            `Расчетная сумма ${this.formatNum(
                              max_loan_sum
                            )}`
                        : null
                    ]"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    ref="currencyCredit"
                    outlined
                    v-model="fullProfile.LoanInfo.Currency"
                    dense
                    disable
                    label="Валюта"
                    :rules="[val => !!val || 'Введите валюту']"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <!-- если не овердрафт -->
                <div
                  v-if="
                    !!fullProfile.LoanInfo.LoanProduct &&
                      fullProfile.LoanInfo.LoanProduct !== 1
                  "
                  class="col-4"
                >
                  <q-select
                    disable
                    ref="typeRepayment"
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
                      outlined
                      v-model.number="
                        fullProfile.LoanInfo.MaxDefferalRepaymentPeriod
                      "
                      type="number"
                      dense
                      label="Льготный период по погашению кредита"
                      :rules="[
                        val =>
                          (val <= GracePeriodMax && val >= GracePeriodMin) ||
                          `Льготный период между ${GracePeriodMin} - ${GracePeriodMax} мес.`
                      ]"
                    />

                    <div class="slider">
                      <q-slider
                        :disable="disableField"
                        v-model.number="
                          fullProfile.LoanInfo.MaxDefferalRepaymentPeriod
                        "
                        :min="GracePeriodMin"
                        :max="GracePeriodMax"
                        :step="1"
                        label
                        :label-value="fullProfile.LoanInfo.MaxDefferalRepaymentPeriod + ' мес.'"
                        label-always
                        color="blue-9"
                        class="sliderCredit"
                      />

                      <span class="periodCreditMin"
                        >{{ GracePeriodMin }} мес.</span
                      >
                      <span class="periodCreditMax"
                        >{{ GracePeriodMax }} мес.</span
                      >
                    </div>
                    
                    <q-badge class="badgePeriod" color="white" text-color="grey">
                      Срок льготного периода по погашению кредита: от {{ GracePeriodMin }} до {{ GracePeriodMax }}
                    </q-badge>
                  </div>
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    disable
                    ref="comfortablePeriodRepayment"
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
                    outlined
                    v-model.number="
                      fullProfile.LoanInfo.ConvenientRepaymentTerm
                    "
                    type="number"
                    dense
                    label="Удобный день погашения"
                    mask="##"
                    :rules="[
                      val => !!val || 'Введите удобный день погашения',
                      val =>
                        (val > 5 && val < 26) ||
                        `Введите удобный день погашения (6-25)`
                    ]"
                  />
                </div>

                <div class="col-4">
                  <q-input
                    disable
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
                    outlined
                    v-model="fullProfile.LoanInfo.FundingSource"
                    :options="options.FinancialSources.items"
                    dense
                    label="Источник финансирования"
                    :rules="[
                      val => !!val || 'Выберите источник финансирования'
                    ]"
                    emit-value
                    map-options
                    class="q-pb-sm"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div v-if="status == 'Step: Full Application Filling' && this.fullProfile.BODecision == null" class="col-4">
                  <q-select
                    :disable="disableField"
                    ref="typeOfCharge"
                    outlined
                    v-model="typeOfCharge"
                    @input="resetTypeOfCharge"
                    :options="options.typeOfCharge"
                    dense
                    label="Выдать на"
                    :rules="[
                      val => !!val || 'Выберите тип начисления'
                    ]"
                    emit-value
                    map-options
                    class="q-pb-sm"
                  />
                </div>
                
                <div v-else class="col-4"></div>

                <div v-if="typeOfCharge == 1 || fullProfile.Customer.CardNumber" class="col-4">
                  <!-- <q-select
                    :disable="disableField"
                    ref="CardNumber"
                    outlined
                    v-model="fullProfile.Customer.CardNumber"
                    :options="options.CardNumber"
                    dense
                    label="Список карт"
                    :rules="[
                      val => !!val || 'Выберите карту'
                    ]"
                    class="q-pb-sm"
                  /> -->

                  <q-input
                    :disable="disableField"
                    ref="CardNumber"
                    outlined
                    v-model="fullProfile.Customer.CardNumber"
                    dense
                    label="Номер карты"
                    mask="################"
                    :rules="[
                      val =>
                          (val && val.length === 16) ||
                          'Количество символов должно быт ровно 16',
                        val =>
                          !val.match(/(?=(.))\1{16,}/) || 'Неверные данные'
                    ]"
                  />
                </div>
              </div>



              <!-- для микрозайма -->
              <template v-if="typeOfCharge == 2 || fullProfile.LoanInfo.microloan_details.bank_name"> 
                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="mircoloanBankName"
                      outlined
                      v-model="fullProfile.LoanInfo.microloan_details.bank_name"
                      dense
                      label="Наименование банка"
                      :rules="[
                        val =>
                          !!val ||
                          'Введите наименование банка'
                      ]"
                    />
                  </div>

                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="mircoloanBankMFO"
                      outlined
                      v-model="fullProfile.LoanInfo.microloan_details.mfo"
                      dense
                      label="МФО банка"
                      :rules="[
                        val =>
                          !!val ||
                          'Введите МФО банка'
                      ]"
                    />
                  </div>

                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="mircoloanCustomerBill"
                      outlined
                      v-model="fullProfile.LoanInfo.microloan_details.customer_bill"
                      dense
                      label="Расчетный счет клиента"
                      mask="####################"
                      :rules="[
                        val =>
                          (val && val.length === 20) ||
                          'Количество символов должно быт ровно 20',
                        val => !val.match(/(?=(.))\1{20,}/) || 'Неверные данные'
                      ]"
                    />
                  </div>
                </div>
              </template>

              <!-- для потребительского кредита -->
              <template
                v-if="fullProfile.LoanInfo.LoanProduct == 136"
              >
                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="nameProduction"
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
                      outlined
                      v-model="fullProfile.LoanInfo.consumerLoan.billProd"
                      dense
                      label="Расчетный счет продавца/производителя товара/работы/услуги"
                      mask="####################"
                      :rules="[
                        val =>
                          (val && val.length === 20) ||
                          'Количество символов должно быт ровно 20',
                        val => !val.match(/(?=(.))\1{20,}/) || 'Неверные данные'
                      ]"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="agreementNumber"
                      outlined
                      v-model="
                        fullProfile.LoanInfo.consumerLoan.agreementNumber
                      "
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
                      dense
                      label="Дата договора с продавцом/поставщиком товара/работы/услуги"
                      v-model="fullProfile.LoanInfo.consumerLoan.agreementDate"
                      mask="##.##.####"
                      :rules="[
                        val =>
                          (val && val.length === 10) ||
                          'Введите дату договора с продавцом/поставщиком товара/работы/услуги',
                        val =>
                          msecond(val) <= msecond(currentDate) ||
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
                    totalGuaranteesSum -
                      Number(
                        fullProfile.LoanInfo.Sum.replace(/[^0-9]/gim, '')
                      ) >=
                      Number(
                        fullProfile.LoanInfo.Sum.replace(/[^0-9]/gim, '')
                      ) *
                        (profile.percent / 100) ||
                    `Сумма всех гарантий должна быть больше запрашиваемой суммы кредита на ${profile.percent}%`
                ]"
              >
                <h5
                  v-if="!fullProfile.Guarantee.RelatedPerson.items.length"
                  class="tab-content_title"
                >
                  Данные по физ. лицу отсутствуют
                </h5>

                <div
                  class="fieldset_block"
                  v-for="(guarantee, index) of fullProfile.Guarantee
                    .RelatedPerson.items"
                  :key="'RelatedPerson' + index"
                >
                  <h6 class="legend_title">Физ. лицо {{ index + 1 }}</h6>

                  <div class="row q-col-gutter-md">
                    <div class="col-4">
                      <q-select
                        :disable="disableField"
                        ref="customersAttitude"
                        outlined
                        v-model="guarantee.ClientRelation"
                        :options="dictionaries.ClientRelationType.items"
                        dense
                        label="Отношение к клиенту"
                        emit-value
                        map-options
                        :rules="[
                          val => !!val || 'Выберите отношение к клиенту'
                        ]"
                        class="q-pb-sm"
                      />
                    </div>

                    <div class="col-4">
                      <q-input
                        :disable="disableField"
                        ref="priceGuarantees1"
                        outlined
                        v-model="guarantee.Sum"
                        dense
                        label="Сумма поручительства"
                        @input="guaranteesValid('RelatedPerson', index)"
                        :rules="[
                          val => !!val || 'Введите сумму',
                          val => val != 0 || 'Некорректные данные'
                        ]"
                      />
                    </div>
                  </div>

                  <div class="row q-col-gutter-md">
                    <div class="col-4">
                      <q-input
                        :disable="disableField"
                        ref="surnameGuarantees"
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
                        ref="nameGuarantees1"
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
                        dense
                        label="Дата рождения"
                        v-model="guarantee.BirthDate"
                        mask="##.##.####"
                        :rules="[
                          val =>
                            (val && val.length === 10) ||
                            'Введите дату рождения',
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
                        ref="innGuarantees1"
                        outlined
                        v-model="guarantee.INN"
                        dense
                        label="ИНН"
                        mask="#########"
                        :rules="[
                          val =>
                            (val && val.length === 9) ||
                            'Количество цифр должно быть 9',
                          val => INNFizValid(val)
                        ]"
                      />
                    </div>
                    <div class="col-4">
                      <q-input
                        :disable="disableField"
                        ref="pinppGuarantees"
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
                        outlined
                        v-model="guarantee.Document.Series"
                        dense
                        label="Серия документа"
                        mask="AA"
                        :rules="[
                          val =>
                            (val && val.length === 2) ||
                            'Введите Серию документа'
                        ]"
                      />
                    </div>
                    <div class="col-4">
                      <q-input
                        :disable="disableField"
                        ref="guaranteesDocumentNumber"
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
                            msecond(val) < msecond(currentDate) ||
                            'Неверная дата'
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
                            msecond(val) > msecond(currentDate) ||
                            'Неверная дата'
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
                        outlined
                        v-model="guarantee.Document.GivenPlace"
                        :options="guarantee.Document.Districts.items"
                        dense
                        label="Кем выдан документ (ИИБ)"
                        :rules="[
                          val => !!val || 'Введите кем выдан документ (ИИБ)'
                        ]"
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
                        ref="CardNumberGuarantees1"
                        outlined
                        v-model="guarantee.CardNumber"
                        dense
                        label="Номер карты поручителя"
                        mask="################"
                        :rules="[
                          val =>
                            (val && val.length === 16) ||
                            'Количество символов должно быт ровно 16',
                          val =>
                            !val.match(/(?=(.))\1{16,}/) || 'Неверные данные'
                        ]"
                      />
                    </div>

                    <div class="col-4">
                      <q-input
                        :disable="disableField"
                        outlined
                        v-model="guarantee.bank_name"
                        dense
                        label="Наименование банка"
                        :rules="[
                          val =>
                            !!val ||
                            'Введите наименование банка'
                        ]"
                      />
                    </div>

                    <div class="col-4">
                      <q-input
                        :disable="disableField"
                        outlined
                        v-model="guarantee.mfo"
                        dense
                        label="МФО банка"
                        :rules="[
                          val =>
                            !!val ||
                            'Введите МФО банка'
                        ]"
                      />
                    </div>

                    <!-- <div class="col-4">
                      <q-input
                        :disable="disableField"
                        ref="BankInpsGuarantees"
                        outlined
                        v-model="guarantee.BankInps"
                        dense
                        label="Номер карты поручителя"
                        mask="################"
                        :rules="[
                          val =>
                            (val && val.length === 16) ||
                            'Количество символов должно быт ровно 16',
                          val =>
                            !val.match(/(?=(.))\1{16,}/) || 'Неверные данные'
                        ]"
                      />
                    </div> -->
                  </div>

                  <div class="row q-col-gutter-md">
                    <div class="col-4">
                      <q-input
                        :disable="disableField"
                        outlined
                        v-model="guarantee.relatedPersonBill"
                        dense
                        label="Расчетный счет"
                        mask="####################"
                        :rules="[
                          val =>
                            (val && val.length === 20) ||
                            'Количество символов должно быт ровно 20',
                          val =>
                            !val.match(/(?=(.))\1{20,}/) || 'Неверные данные'
                        ]"
                      />
                    </div>
                  </div>

                  <div class="row q-col-gutter-md">
                    <!-- <div class="col-4">
                    <q-input
                      :disable="disableField"
                      ref="indexGuarantees"
                      
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
                        ref="districtGuarantees1"
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
                        ref="houseNumberGuarantees1"
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
                      
                      outlined
                      v-model="guarantee.Address.Building"
                      dense
                      label="Строение"
                    />
                  </div> -->
                    <div class="col-4">
                      <q-input
                        :disable="disableField"
                        outlined
                        v-model="guarantee.Address.Apartment"
                        dense
                        label="Номер квартиры"
                      />
                    </div>
                  </div>

                  <!-- phone -->
                  <div
                    class="fieldset_block"
                    v-for="(phone, phoneIndex) of guarantee.PhoneList.items"
                    :key="'RelatedPerson' + phoneIndex"
                  >
                    <h6 class="legend_title">Телефон {{ phoneIndex + 1 }}</h6>
                    <div class="row q-col-gutter-md">
                      <div class="col-4">
                        <q-input
                          :disable="disableField"
                          ref="phonesGuarantees"
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
                  </div>

                  <q-btn
                    :disable="disableField"
                    label="Добавить номер телефона"
                    @click="addPhoneGuarantee({ item: 'RelatedPerson', index })"
                    class="addItem"
                  ></q-btn>

                  <q-btn
                    :disable="disableField"
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
                </div>
                <q-btn
                  :disable="disableField"
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

                <div
                  class="fieldset_block"
                  v-for="(guarantee, index) of fullProfile.Guarantee
                    .RelatedLegalPerson.items"
                  :key="'RelatedLegalPerson' + index"
                >
                  <h6 class="legend_title">Юр. лицо {{ index + 1 }}</h6>

                  <div class="row q-col-gutter-md">
                    <div class="col-4">
                      <q-input
                        :disable="disableField"
                        ref="priceGuarantees2"
                        outlined
                        v-model="guarantee.Sum"
                        dense
                        label="Сумма поручительства"
                        @input="guaranteesValid('RelatedLegalPerson', index)"
                        :rules="[
                          val => !!val || 'Введите сумму',
                          val => val != 0 || 'Некорректные данные'
                        ]"
                      />
                    </div>
                  </div>

                  <div class="row q-col-gutter-md">
                    <div class="col-4">
                      <q-input
                        :disable="disableField"
                        ref="CEOLastName"
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
                        ref="nameGuarantees2"
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
                        ref="innGuarantees2"
                        outlined
                        v-model="guarantee.INN"
                        dense
                        label="ИНН"
                        mask="#########"
                        :rules="[
                          val =>
                            (val && val.length === 9) ||
                            'Количество цифр должно быть 9',
                          val => INNYurValid(val)
                        ]"
                      />
                    </div>

                    <!-- Надо добавить в BPM -->
                    <div class="col-4">
                      <q-select
                        :disable="disableField"
                        ref="kindOfActivityGuarantees"
                        outlined
                        v-model="guarantee.Activity"
                        :options="dictionaries.BusinessType.items"
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
                        :disable="disableField"
                        ref="CardNumberGuarantees2"
                        outlined
                        v-model="guarantee.cardNumber"
                        dense
                        label="Номер карты"
                        mask="################"
                        :rules="[
                          val =>
                            (val && val.length === 16) ||
                            'Количество символов должно быт ровно 16',
                          val =>
                            !val.match(/(?=(.))\1{16,}/) || 'Неверные данные'
                        ]"
                      />
                    </div>

                    <div class="col-4">
                      <q-input
                        :disable="disableField"
                        ref="bank_nameGuarantees"
                        outlined
                        v-model="guarantee.bank_name"
                        dense
                        label="Наименование банка"
                        :rules="[
                          val =>
                            !!val ||
                            'Введите наименование банка'
                        ]"
                      />
                    </div>

                    <div class="col-4">
                      <q-input
                        :disable="disableField"
                        ref="mfoGuarantees"
                        outlined
                        v-model="guarantee.mfo"
                        dense
                        label="МФО банка"
                        :rules="[
                          val =>
                            !!val ||
                            'Введите МФО банка'
                        ]"
                      />
                    </div>
                   </div>

                   <div class="row q-col-gutter-md">
                     <div class="col-4">
                      <q-input
                        :disable="disableField"
                        ref="relatedLegalPersonBillGuarantees"
                        outlined
                        v-model="guarantee.relatedLegalPersonBill"
                        dense
                        label="Расчетный счет"
                        mask="####################"
                        :rules="[
                          val =>
                            (val && val.length === 20) ||
                            'Количество символов должно быт ровно 20',
                          val =>
                            !val.match(/(?=(.))\1{20,}/) || 'Неверные данные'
                        ]"
                      />
                    </div>
                   </div>

                  <div class="row q-col-gutter-md">
                    <!-- <div class="col-4">
                    <q-input
                      :disable="disableField"
                      
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
                      
                      outlined
                      v-model="guarantee.Address.District"
                      dense
                      label="Район"
                    />  -->

                      <q-select
                        :disable="disableField"
                        ref="districtGuarantees2"
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
                        ref="houseNumberGuarantees2"
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
                      
                      outlined
                      v-model="guarantee.Address.Building"
                      dense
                      label="Строение"
                    />
                  </div> -->
                    <div class="col-4">
                      <q-input
                        :disable="disableField"
                        outlined
                        v-model="guarantee.Address.OfficeNum"
                        dense
                        label="Номер офиса"
                      />
                    </div>
                  </div>

                  <!-- phone -->
                  <div
                    class="fieldset_block"
                    v-for="(phone, phoneIndex) of guarantee.PhoneList.items"
                    :key="'RelatedLegalPersonPhone' + phoneIndex"
                  >
                    <h6 class="legend_title">Телефон {{ phoneIndex + 1 }}</h6>
                    <div class="row q-col-gutter-md">
                      <div class="col-4">
                        <q-input
                          :disable="disableField"
                          ref="phonesGuarantees"
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
                  </div>

                  <q-btn
                    size="14px"
                    :disable="disableField"
                    label="Добавить номер телефона"
                    @click="
                      addPhoneGuarantee({ item: 'RelatedLegalPerson', index })
                    "
                    class="addItem"
                  ></q-btn>

                  <q-btn
                    :disable="disableField"
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
                </div>
                <q-btn
                  :disable="disableField"
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

                <div
                  class="fieldset_block"
                  v-for="(guarantee, index) of fullProfile.Guarantee.Insurance
                    .items"
                  :key="'Insurance' + index"
                >
                  <h6 class="legend_title">Страхование {{ index + 1 }}</h6>

                  <div class="row q-col-gutter-md">
                    <div class="col-4">
                      <!-- <q-input
                      :disable="disableField"
                      ref="nameGuarantees"
                      
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
                        ref="nameGuarantees3"
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
                        ref="innGuarantees3"
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
                        ref="priceGuarantees3"
                        outlined
                        v-model="guarantee.Sum"
                        @input="guaranteesValid('Insurance', index)"
                        dense
                        label="Сумма страхового полиса"
                        :rules="[
                          val => !!val || 'Введите сумму',
                          val => val != 0 || 'Некорректные данные'
                        ]"
                      />
                    </div>
                  </div>

                  <div 
                    v-if="status === 'Step: Работа с документами'"
                    class="row q-col-gutter-md"
                  >
                    <div class="col-4">
                      <q-input
                        
                        ref="ContractNumberGuarantees"
                        outlined
                        v-model="guarantee.ContractNumber"
                        dense
                        label="Номер страхового договора"
                        :rules="[val => !!val || 'Введите номер страхового договора']"
                      />
                    </div>

                    <div class="col-4">
                      <q-input
                        
                        ref="guaranteesContractGivenDate"
                        outlined
                        dense
                        label="Дата начала действия договора"
                        v-model="guarantee.StartDate"
                        mask="##.##.####"
                        :rules="[
                          val =>
                            (val && val.length === 10) ||
                            'Введите дату начала действия договора',

                          guarantee.ExpDate
                            ? val =>
                                msecond(val) < msecond(guarantee.ExpDate) ||
                                'Неверная дата'
                            : null,

                          val =>
                            msecond(val) <= msecond(currentDate) ||
                            'Неверная дата'
                        ]"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              transition-show="scale"
                              transition-hide="scale"
                              ref="qDateGuaranteeContractGivenDate"
                            >
                              <q-date
                                mask="DD.MM.YYYY"
                                v-model="guarantee.StartDate"
                                @input="
                                  $event => {
                                    $refs.qDateGuaranteeContractGivenDate[
                                      index
                                    ].hide();
                                    validDateGuaranteesContract($event, index);
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
                        
                        ref="guaranteesContractExpirationDate"
                        outlined
                        dense
                        label="Дата истечения действия договора"
                        v-model="guarantee.ExpDate"
                        mask="##.##.####"
                        :rules="[
                          val =>
                            (val && val.length === 10) ||
                            'Введите дату окончания действия документа',
                          guarantee.StartDate
                            ? val =>
                                msecond(val) > msecond(guarantee.StartDate) ||
                                'Неверная дата'
                            : null,
                          val =>
                            msecond(val) > msecond(currentDate).setMonth(msecond(currentDate).getMonth() + fullProfile.LoanInfo.TermInMonth) ||
                            'Дата не должна быть меньше даты окончания срока кредита'
                        ]"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              transition-show="scale"
                              transition-hide="scale"
                              ref="qDateGuaranteeContractExpirationDate"
                            >
                              <q-date
                                mask="DD.MM.YYYY"
                                v-model="guarantee.ExpDate"
                                @input="
                                  $event => {
                                    $refs.qDateGuaranteeContractExpirationDate[
                                      index
                                    ].hide();
                                    validDateGuaranteesContract($event, index);
                                  }
                                "
                              />
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>

                  <q-btn
                    :disable="disableField"
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
                </div>

                <q-btn
                  :disable="disableField"
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
                <!-- :value="!!filesAll.find(file => file.id != null)" -->
                  <div ref="dragover"></div>
                  <q-field
                    ref="uploadFile"
                    :value="filesAll.filter(file => file.id != null).length >= countFile"
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
                        <q-icon class="clip" name="attach_file" />
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
                          class="addFileBtn"
                          label="Добавить"
                          @click.prevent="addFiles()"
                        />

                        <q-btn
                          v-if="files.length"
                          class="uploadFileBtn"
                          label="Загрузить"
                          @click.prevent="submitFiles()"
                        />
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
                        <span
                          class="material-icons fileDownload"
                          v-if="file.id"
                        >
                          description
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
                        color="grey"
                        icon="cancel"
                        class="cancel"
                        @click.prevent="removeFile(index)"
                      >
                        <q-tooltip>Удалить файл</q-tooltip>
                      </q-btn>

                      <q-btn
                        v-else
                        flat
                        round
                        color="grey"
                        icon="cancel"
                        class="cancel"
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
                  v-for="(comment, index) of fullProfile.ApplicationComment.items"
                  :key="'comment' + index"
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
                label="Оставить комментарий"
                class="addItem"
                @click="addComment"
              />
            </div>
          </div>

          <!-- Client info -->
          <div 
            v-if="status === 'Step: Ввод данных с интеграциями'"
            class="clientInfo tab"
          >
            <h4
              class="tab-title"
              ref="clientInfo"
              @click="toggleForm('clientInfo')"
            >
              Информация о клиенте
            </h4>
            <div class="tab-content" ref="tabContent">

               <appClientInfo 
                v-if="clientInfo" 
                :data="clientInfo" 
                :scoring="fullProfile"
               />

               <q-btn
                :loading="clientInfoLoading"
                
                label="Получить данные клиента"
                @click="getClientInfo"
                class="addItem"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </div>
          </div>

          <!-- file list -->
          <template v-if="fileList.length">
            
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
                    <p>
                      {{ $t(`printForms.${fileData.label}`) }}
                      <!-- {{ fileData.label }} -->
                      {{ fileData.number ? +fileData.number + 1 : null }}
                    </p>

                    <div class="printWorkDoc">
                      <q-btn
                        :disable="disable"
                        class="printDoc"
                        flat 
                        style="color: #74798C" 
                        icon="print"
                        label="(рус.)"
                        @click="printFile(fileData, index)"
                        :loading="fileData.loading"

                      >
                        <template v-slot:loading>
                          <q-spinner-facebook />
                        </template>
                        <q-tooltip>Печать</q-tooltip>
                      </q-btn>

                      <q-btn
                        :disable="disable"
                        class="printDoc"
                        flat 
                        style="color: #74798C" 
                        icon="print"
                        label="(узб.)"
                        @click="printFile(fileData, index + fileList.length, 1)"
                        :loading="fileData.loadingUz"

                      >
                        <template v-slot:loading>
                          <q-spinner-facebook />
                        </template>
                        <q-tooltip>Печать</q-tooltip>
                      </q-btn>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </template>

          <div class="submitBlock">
            <!-- Print version button-->
            <q-btn
              @click="onSubmit(false)"
              label="Версия для печати"
              class="printBtn"
            />

            <q-btn
              type="submit"
              :label="
                fullProfile.BODecision == false || reworkCC != -1
                  ? 'Завершить редактирование'
                  : status === 'Step: Работа с документами'
                  ? 'Отправить андеррайтеру'
                  : 'Оформить кредит'
              "
              class="submitBtn"
            />

            <q-btn
              v-if="status !== 'Step: Работа с документами'"
               @click="onFailureCredit()"
              label="Отклонить кредит"
              class="failureCredit"
            />
          </div>
        </form>
      </div>
      <div class="col-2 navMenuBlock">
        <ul class="navMenu">
          <li>
            <a class="active" href=".privatData" @click="goToBlock"
              >Личные данные клиента</a
            >
          </li>
          <li>
            <a href=".contactData" @click="goToBlock">Контактные данные</a>
          </li>
          <li><a href=".address" @click="goToBlock">Адрес клиента</a></li>
          <li><a href=".family-status" @click="goToBlock">Родственники</a></li>
          <li>
            <a href=".infoWork" @click="goToBlock"
              >Сведения по основной работе</a
            >
          </li>
          <li>
            <a href=".expense-income" @click="goToBlock"
              >Ежемесячные расходы/доходы</a
            >
          </li>
          <li>
            <a href=".properties" @click="goToBlock">Сведения об имуществе</a>
          </li>
          <li>
            <a href=".infoCredit" @click="goToBlock"
              >Сведения о запрашиваемом кредите</a
            >
          </li>
          <li>
            <a href=".guarantees" @click="goToBlock"
              >Гарантии и поручительство</a
            >
          </li>
          <li>
            <a href=".loadDocuments" @click="goToBlock">Загрузить документ</a>
          </li>
          <li>
            <a href=".commentCredit" @click="goToBlock"
              >Комментарии по кредиту</a
            >
          </li>
        </ul>
      </div>

      <!-- confirm  -->
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <!-- <q-avatar icon="signal_wifi_off"  text-color="white" /> -->
            <span class="q-ml-sm"
              >Вы действительно хотите удалить {{ itemName }}?</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn class="removePopUp" label="Удалить" v-close-popup @click="itemFunc(payload)" />
            <q-btn flat label="Нет" v-close-popup />
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
      <appFullProfile 
        v-if="profile.confirmCredit"
        :currentDate="currentDate" 
        @printFullForm="$event => (printForm = $event)"
      />
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
            v-if="dataINPS.code == 0"
            :salaries="dataINPS.salaries"
            @closeBar="$event => (INPSBar = $event)"
          />

          <appSetDataINPS 
            v-else 
            @closeBar="$event => (INPSBar = $event)" 
            :msg="dataINPS.msg"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapGetters } from "vuex";
import printJS from "print-js";

// import InfoList from "../registration/PreApproval";
import SetDataINPS from "../../Components/INPS/SetData";
import GetDataINPS from "../../Components/INPS/GetData";
import ClientInfo from "../../Components/ClientInfo";
import Loader from "@/components/Loader";
import FullProfile from "./FullProfile";
import LoaderFullScreen from "@/components/LoaderFullScreen";

import CommonUtils from "@/shared/utils/CommonUtils";
import dataTransform from "../../filters/dataTransform";
import { validItems, validFilter } from "../../filters/valid_filter";
import formatNumber from "../../filters/format_number.js";

export default {
  name: "profile",
  data() {
    return {
      // isValidNumCard: true,
      LSBOFlag: false,
      INPSFlag: false,
      failureCredit: false,
      clientInfoData: false,
      printForm: false,
      bankLoading: false,
      LSBOLoading: false,
      clientInfoLoading: false,
      // infoList: false,
      INPSBar: false,
      dataINPS: {
        code: null,
        msg: ""
      },
      clientInfo: null,
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

      typeOfCharge: null, // тип выдачи (пластик. карта, расчетный счет)

      options: {
        //Countries: this.$store.getters["profile/dictionaries"].Countries.items,
        Countries: [],

        RepaymentType: [],

        yearsOfIssueVehicle: [],

        FinancialSources: [], // источник финансирования

        typeOfCharge: [
          {
            label: 'Пластиковая карта',
            value: 1
          },
          {
            label: 'Расчетный счет',
            value: 2
          }
        ],

        CardNumber: [
          '123',
          '456',
          '789'
        ]

      },

      guaranteeCount: [],
      totalGuaranteesSum: 0, // сумма всех гарантий и поручительств
      files: [], // для сервера, чтоб не дублировать отправку файла
      filesAll: [], // для фильтрации какие файлы загружены на сервер

      fileData: {
        type: "",
        lang: this.$store.getters["common/getLangNum"] - 1, //0 - рус, 1 - узб,
        data: {}
      },

      // navigation
      // navigation: [
      //   {
      //     label: "",
      //     link: ""
      //   }
      // ]
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

          if (this.status === 'Step: Работа с документами' || 
              this.status === 'Step: Ввод данных с интеграциями' ||
              this.fullProfile.BODecision != null) {
            
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

                i.Sum = formatNumber(i.Sum);
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
      this.loaderForm = true;

      // если перезагрузили страницу
      await this.$store.dispatch(
        "credits/setHeaderRole",
        sessionStorage.getItem("userRole")
      );
      await this.$store.dispatch(
        "credits/setHeaderBPM",
        sessionStorage.getItem("csrf_token")
      );

      this.$store.commit("credits/setTaskId", sessionStorage.getItem("taskId"));

      try {
        const response = await this.$store.dispatch("profile/getFullForm");
        this.loaderForm = false;
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          CommonUtils.filterServerError(error)
        );
        this.loaderForm = false;
      }
    }
    
    this.setLoan(this.fullProfile.LoanInfo.LoanProduct);
    this.options.Countries = this.$store.getters[
      "profile/dictionaries"
    ].Countries.items;
  },
  mounted() {
    setTimeout(() => {
      document
      .querySelectorAll(".scroll")[1]
      .addEventListener("scroll", this.handleScroll);

      this.onSubmit("start");
    }, 1000);
  },
  computed: {
    ...mapState({
      fullProfile: state => state.profile.fullFormProfile,
      Customer: state => state.profile.fullFormProfile.Customer,
      dictionaries: state => state.profile.dictionaries,
      profile: state => state.profile,
      credits: state => state.credits,
      preApprovalData: state => state.credits.preApprovalData,
      loadings: state => state.profile.loadings
    }),

    ...mapGetters({
      preapprove_num: "profile/preapprove_num"
    }),

    taskId() {
      return this.$route.query.taskId;
    },

    status() {
      return this.$route.query.status 
              ? this.$route.query.status
              : 'Step: Full Application Filling'
    },

    reworkCC() {
      return this.fullProfile.CreditCommiteeDecisions.items.findIndex(
        i => i.Decision == "R"
      );
    }, 

    max_loan_sum() {
      return Math.min(this.fullProfile.LoanInfo.ProductMaxSum, this.fullProfile.LoanInfo.max_loan_sum_preapprove);
    },

    message() {
      return this.status === 'Step: Работа с документами' && !this.failureCredit 
              ? 'Deal complete'
                : this.failureCredit
                  ? 'Credit failure'
                  : 'Form complete'
    },

    countFile() {
      return this.status === 'Step: Работа с документами'
              ? 2
              : 1
    },

    scoring_results() {
      const scoring_resutlts = this.profile.BPMInput.find(input => input.label == 'scoring_results')
      return scoring_resutlts ? scoring_resutlts : null
    },

    disableField() {
      return this.status === 'Step: Работа с документами'
              ? true
              : false
    },

    fileList() {
      return this.$store.getters['profile/fileList']
    },

    cacheDocId() {
      const cacheDocIdArr = []
      for (let i = 0; i < this.fileList.length * 2; i++) {
        cacheDocIdArr.push(null)
      } 
      return cacheDocIdArr
    }
  },
  watch: {
    "Customer.Email"(val) {
      if (
        val !== "" &&
        !val.match(/^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/i)
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
    resetTypeOfCharge() {
      this.fullProfile.Customer.CardNumber = ""
      this.fullProfile.LoanInfo.microloan_details.bank_name = ""
      this.fullProfile.LoanInfo.microloan_details.mfo = ""
      this.fullProfile.LoanInfo.microloan_details.customer_bill = ""
    },

    resetJobInfo() {
      this.Customer.JobInfo.employerActivityType = null //вид деятельности организации
      this.Customer.JobInfo.positionType = null // Категория занимаемой должности
      this.Customer.JobInfo.INN = ""
      this.Customer.JobInfo.employeesNum = 0 // количество работников
      this.Customer.JobInfo.employerName = "",// Наименование работадателя
      this.Customer.JobInfo.totalJobExperienceMonths = 0 // общий трудовой стаж
      this.Customer.JobInfo.activeYears = 0 // срок деятельности
      this.Customer.JobInfo.position = "" // должность
      // this.Customer.JobInfo.type = "" // вид деятельности
      this.Customer.JobInfo.lastJobExperienceMonths = 0 // стаж на последнем месте работы
    },

    formatNum(number) {
      return formatNumber(number);
    },

    formatNumberItems(item, key, idx) {
      console.log(this.Customer.PropertyInformation.Realty_new.items)
      this.Customer.PropertyInformation[item].items[idx][key] = formatNumber(this.Customer.PropertyInformation[item].items[idx][key])
    },

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

      // this.$refs.CardNumber.validate();
      this.$refs.BankInps.validate();

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
        // this.$refs.position.validate();
        this.$refs.positionCategory.validate();
        this.$refs.workExperience.validate();
        this.$refs.totalWorkExperience.validate();
      } else {
        validItems(this.$refs, "nameOfEmployer");
        validItems(this.$refs, "innOfEmployer");
        validItems(this.$refs, "typeOrganization");
        validItems(this.$refs, "amountWorkes");
        // validItems(this.$refs, "position");
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
        this.$refs.nameOfEmployer2.validate();
        this.$refs.innOfEmployer2.validate();
      } else {
        validItems(this.$refs, "activityPeriod");
        validItems(this.$refs, "typeOrganization2");
        validItems(this.$refs, "nameOfEmployer2");
        validItems(this.$refs, "innOfEmployer2");
      }

      // this.$refs.income.validate();

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
        validFilter(this.$refs, "priceGuaranteesValid1", "priceGuarantees1");
        validFilter(this.$refs, "surnameGuaranteesValid", "surnameGuarantees");
        validFilter(this.$refs, "nameGuaranteesValid1", "nameGuarantees1");
        validFilter(this.$refs, "mnameGuaranteesValid", "mnameGuarantees");
        validFilter(
          this.$refs,
          "birthdayGuaranteesValid",
          "birthdayGuarantees"
        );
        validFilter(this.$refs, "innGuaranteesValid1", "innGuarantees1");
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

        // validFilter(
        //   this.$refs,
        //   "BankInpsGuaranteesValid",
        //   "BankInpsGuarantees"
        // );
        validFilter(
          this.$refs,
          "CardNumberGuaranteesValid1",
          "CardNumberGuarantees1"
        );

        validFilter(this.$refs, "regionGuaranteesValid", "regionGuarantees");
        validFilter(
          this.$refs,
          "districtGuaranteesValid",
          "districtGuarantees1"
        );
        validFilter(this.$refs, "streetGuaranteesValid", "streetGuarantees");
        validFilter(
          this.$refs,
          "houseNumberGuaranteesValid",
          "houseNumberGuarantees1"
        );
        validFilter(this.$refs, "phonesGuaranteesValid", "phonesGuarantees");
      } else {
        validItems(this.$refs, "customersAttitudeValid");
        validItems(this.$refs, "priceGuaranteesValid1");
        validItems(this.$refs, "surnameGuaranteesValid");
        validItems(this.$refs, "nameGuaranteesValid1");
        validItems(this.$refs, "mnameGuaranteesValid");
        validItems(this.$refs, "birthdayGuaranteesValid");
        validItems(this.$refs, "innGuaranteesValid1");
        validItems(this.$refs, "pinppGuaranteesValid");
        validItems(this.$refs, "guaranteesDocumentDocumentTypeValid");
        validItems(this.$refs, "guaranteesDocumentDocumentNameValid");
        validItems(this.$refs, "guaranteesDocumentSeriesValid");
        validItems(this.$refs, "guaranteesDocumentNumberValid");
        validItems(this.$refs, "guaranteesDocumentGivenDateValid");
        validItems(this.$refs, "guaranteesDocumentExpirationDateValid");
        validItems(this.$refs, "guaranteesDocumentRegionsGivenPlaceValid");
        validItems(this.$refs, "guaranteesDocumentGivenPlaceValid");
        // validItems(this.$refs, "BankInpsGuaranteesValid");
        validItems(this.$refs, "CardNumberGuaranteesValid1");
        validItems(this.$refs, "districtGuaranteesValid");
        validItems(this.$refs, "regionGuaranteesValid");
        validItems(this.$refs, "streetGuaranteesValid");
        validItems(this.$refs, "houseNumberGuaranteesValid");
        validItems(this.$refs, "phonesGuaranteesValid");
      }

      if (this.fullProfile.Guarantee.RelatedLegalPerson.items.length) {
        validFilter(this.$refs, "priceGuaranteesValid2", "priceGuarantees2");
        validFilter(this.$refs, "CEOLastNameGuaranteesValid", "CEOLastName");
        validFilter(this.$refs, "CEOFirstNameGuaranteesValid", "CEOFirstName");
        validFilter(
          this.$refs,
          "CEOMiddleNameGuaranteesValid",
          "CEOMiddleName"
        );
        validFilter(this.$refs, "nameGuaranteesValid2", "nameGuarantees2");
        validFilter(this.$refs, "innGuaranteesValid2", "innGuarantees2");
        validFilter(
          this.$refs,
          "kindOfActivityGuaranteesValid",
          "kindOfActivityGuarantees"
        );

        validFilter(this.$refs, "CardNumberGuaranteesValid2", "CardNumberGuarantees2");
        validFilter(this.$refs, "bank_nameGuaranteesValid", "bank_nameGuarantees");
        validFilter(this.$refs, "mfoGuaranteesValid", "mfoGuarantees");
        validFilter(this.$refs, "relatedLegalPersonBillGuaranteesValid", "relatedLegalPersonBillGuarantees");

        validFilter(this.$refs, "regionGuaranteesValid", "regionGuarantees");
        validFilter(
          this.$refs,
          "districtGuaranteesValid",
          "districtGuarantees2"
        );
        validFilter(this.$refs, "streetGuaranteesValid", "streetGuarantees");
        validFilter(
          this.$refs,
          "houseNumberGuaranteesValid",
          "houseNumberGuarantees2"
        );
        validFilter(this.$refs, "phonesGuaranteesValid", "phonesGuarantees");
      } else {
        validItems(this.$refs, "priceGuaranteesValid2");
        validItems(this.$refs, "CEOLastNameGuaranteesValid");
        validItems(this.$refs, "CEOFirstNameGuaranteesValid");
        validItems(this.$refs, "CEOMiddleNameGuaranteesValid");
        validItems(this.$refs, "nameGuaranteesValid2");
        validItems(this.$refs, "innGuaranteesValid2");
        validItems(this.$refs, "kindOfActivityGuaranteesValid");
        validItems(this.$refs, "CardNumberGuaranteesValid2");
        validItems(this.$refs, "bank_nameGuaranteesValid");
        validItems(this.$refs, "mfoGuaranteesValid");
        validItems(this.$refs, "relatedLegalPersonBillGuaranteesValid");
        validItems(this.$refs, "regionGuaranteesValid");
        validItems(this.$refs, "districtGuaranteesValid");
        validItems(this.$refs, "streetGuaranteesValid");
        validItems(this.$refs, "houseNumberGuaranteesValid");
        validItems(this.$refs, "phonesGuaranteesValid");
      }

      if (this.fullProfile.Guarantee.Insurance.items.length) {
        validFilter(this.$refs, "nameGuaranteesValid3", "nameGuarantees3");
        validFilter(this.$refs, "innGuaranteesValid3", "innGuarantees3");
        validFilter(this.$refs, "priceGuaranteesValid3", "priceGuarantees3");
        
      } else {
        validItems(this.$refs, "priceGuaranteesValid3");
        validItems(this.$refs, "nameGuaranteesValid3");
        validItems(this.$refs, "innGuaranteesValid3");
      }

      if (this.status === 'Step: Работа с документами') {
        validFilter(
          this.$refs,
          "ContractNumberGuaranteesValid",
          "ContractNumberGuarantees"
        );
        validFilter(
          this.$refs,
          "guaranteesContractGivenDateValid",
          "guaranteesContractGivenDate"
        );
        validFilter(
          this.$refs,
          "guaranteesContractExpirationDateValid",
          "guaranteesContractExpirationDate"
        );
      } else {
        validItems(this.$refs, "ContractNumberGuaranteesValid");
        validItems(this.$refs, "guaranteesContractGivenDateValid");
        validItems(this.$refs, "guaranteesContractExpirationDateValid");
      }

      // this.$refs.productCreditthis.$refs.productCredit.validate();
      this.$refs.priceCredit.validate();

      // this.$refs.periodRepayment.validate();
      this.$refs.comfortablePeriodRepayment.validate();
      this.$refs.comfortableDayRepayment.validate();
      // this.$refs.typeCredit.validate();
      this.$refs.purposeCredit.validate();
      this.$refs.sourceFinancs.validate();

      if (this.status == 'Step: Full Application Filling' && this.fullProfile.BODecision == null) {
        this.$refs.typeOfCharge.validate();
      } else {
        validItems(this.$refs, "typeOfCharge");
      }

      //если потребительский
      if (
        this.fullProfile.LoanInfo.LoanProduct == 136
      ) {
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
      // if (
      //   !!this.fullProfile.LoanInfo.LoanProduct &&
      //   this.fullProfile.LoanInfo.LoanProduct !== 1
      // ) {
      //   this.$refs.typeRepayment.validate();
      // } else {
      //   validItems(this.$refs, "typeRepayment");
      // }

      this.$refs.uploadFile.validate();

      this.guaranteesValid();

      console.log("files", this.$refs.files);

      // Если выбран расчетный счет!!!
      if (
        this.typeOfCharge == 2
      ) {
        this.$refs.mircoloanBankName.validate();
        this.$refs.mircoloanBankMFO.validate();
        this.$refs.mircoloanCustomerBill.validate();
      } else {
        validItems(this.$refs, "mircoloanBankName");
        validItems(this.$refs, "mircoloanBankMFO");
        validItems(this.$refs, "mircoloanCustomerBill");
      }

      // Если выбрана пластиковая карта
      if (
        this.typeOfCharge == 1
      ) {
        this.$refs.CardNumber.validate();
      } else {
        validItems(this.$refs, "CardNumber");
        
      }

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
        // this.$refs.CardNumber.hasError ||
        this.$refs.BankInps.hasError ||

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
        // this.$refs.position.hasError ||
        this.$refs.positionCategory.hasError ||
        this.$refs.workExperience.hasError ||
        this.$refs.totalWorkExperience.hasError ||
        this.$refs.activityPeriod.hasError ||
        this.$refs.typeOrganization2.hasError ||
        this.$refs.nameOfEmployer2.hasError ||
        this.$refs.innOfEmployer2.hasError ||
        // this.$refs.income.hasError ||
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
        this.$refs.priceGuaranteesValid1.hasError ||
        this.$refs.priceGuaranteesValid2.hasError ||
        this.$refs.priceGuaranteesValid3.hasError ||
        this.$refs.surnameGuaranteesValid.hasError ||
        this.$refs.nameGuaranteesValid1.hasError ||
        this.$refs.nameGuaranteesValid2.hasError ||
        this.$refs.nameGuaranteesValid3.hasError ||
        this.$refs.mnameGuaranteesValid.hasError ||
        this.$refs.birthdayGuaranteesValid.hasError ||
        this.$refs.innGuaranteesValid1.hasError ||
        this.$refs.innGuaranteesValid2.hasError ||
        this.$refs.innGuaranteesValid3.hasError ||
        this.$refs.kindOfActivityGuaranteesValid.hasError ||
        this.$refs.pinppGuaranteesValid.hasError ||
        this.$refs.guaranteesDocumentDocumentTypeValid.hasError ||
        this.$refs.guaranteesDocumentDocumentNameValid.hasError ||
        this.$refs.guaranteesDocumentSeriesValid.hasError ||
        this.$refs.guaranteesDocumentNumberValid.hasError ||
        this.$refs.guaranteesDocumentGivenDateValid.hasError ||
        this.$refs.guaranteesDocumentExpirationDateValid.hasError ||
        this.$refs.ContractNumberGuaranteesValid.hasError ||
        this.$refs.guaranteesContractGivenDateValid.hasError ||
        this.$refs.guaranteesContractExpirationDateValid.hasError ||
        this.$refs.guaranteesDocumentRegionsGivenPlaceValid.hasError ||
        this.$refs.guaranteesDocumentGivenPlaceValid.hasError ||
        // this.$refs.BankInpsGuaranteesValid.hasError ||
        this.$refs.CardNumberGuaranteesValid1.hasError ||
        this.$refs.CardNumberGuaranteesValid2.hasError ||

        this.$refs.bank_nameGuaranteesValid.hasError ||
        this.$refs.mfoGuaranteesValid.hasError ||
        this.$refs.relatedLegalPersonBillGuaranteesValid.hasError ||

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
        this.$refs.typeOfCharge.hasError ||
        this.$refs.uploadFile.hasError ||
        this.$refs.guaranteesValid.hasError ||
        
        this.$refs.CardNumber.hasError ||
        this.$refs.mircoloanBankName.hasError ||
        this.$refs.mircoloanBankMFO.hasError ||
        this.$refs.mircoloanCustomerBill.hasError

      ) {
        this.formHasError = true;
        this.bar = true;
      } else {
        if (submitForm === "start") {
          this.profile.confirmCredit = false;
        } else if (submitForm) {

          if (!this.clientInfoData && this.status == 'Step: Ввод данных с интеграциями') {
            this.$store.commit(
                "credits/setMessage",
                "Получите данные клиента"
              );
          } else if (!this.printForm && 
                  this.status == 'Step: Ввод данных с интеграциями'
                  ) {
            this.$store.commit(
                "credits/setMessage",
                "Распечатайте анкету"
              );
          } else if (!this.LSBOFlag && this.status == 'Step: Full Application Filling' && this.fullProfile.BODecision == null) {
            this.$store.commit(
                "credits/setMessage",
                "Получите данные с ЛСБО"
              );
          } else if (!this.INPSFlag && this.status == 'Step: Full Application Filling' && this.fullProfile.BODecision == null) {
            this.$store.commit(
                "credits/setMessage",
                "Получите данные с Халк банка"
              );
          } else {
            this.sentDataForm()
          }

        } else {
          this.profile.confirmCredit = true;
        }
      }
    },

    async sentDataForm() {
      this.loader = true;
      this.fullProfile.ClientManagerLogin = this.$store.getters[
        "auth/username"
      ];
      console.log("fullProfile", this.$store.state.profile.fullFormProfile);
      const {
        Status,
        ApplicationID,
        // ProtocolNumber,
        client_code,
        client_uid,
        Number,
        Branch,
        BranchName,
        BODecision,
        FinalDecision,
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

      for (let property in Customer.PropertyInformation) {
        if(typeof Customer.PropertyInformation[property] == 'object') {
          for (let i of Customer.PropertyInformation[property].items) {
            i.MarketValue = +String(i.MarketValue).replace(/[^0-9]/gim, "");
          }
        }
      }


      for (let guarantee in Guarantee) {
        for (let i of Guarantee[guarantee].items) {
          if (i.Sum) {
            console.log("Sum", String(i.Sum).replace(/[^0-9]/gim, ""));
            i.Sum = +String(i.Sum).replace(/[^0-9]/gim, "");
          }
        }
      }

      LoanInfo.Sum = +LoanInfo.Sum.replace(/[^0-9]/gim, "");

      // удалил из объекта - Date!!!
      const data = {
        output: [
          {
            name: "application",
            data: {
              Status,
              ApplicationID,
              // ProtocolNumber,
              client_code,
              client_uid,
              Number,
              Branch,
              BranchName,
              BODecision,
              FinalDecision,
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
      // this.$store.commit("credits/setMessage", this.message);

      try {
        const response = await this.$store.dispatch(
          "credits/confirmationCredit",
          data
        );
        console.log("response", JSON.stringify(response, null, 2));
        //console.log('nextTaskId', response.nextTask.id)

        if (response) {
          setTimeout(() => {
             this.$store.commit("credits/setMessage", this.message);
          }, 500)
         
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

    async onFailureCredit() {
      this.failureCredit = true
      this.fullProfile.FinalDecision = "Отказ"
      if (this.scoring_results) {
        this.printFailureCredit(this.scoring_results)
      }
      
      this.sentDataForm()     
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
            data: this.preapprove_num
          },
          {
            name: "from",
            data: "getData"
          }
        ]
      };

      try {
        this.dataINPS = await this.$store.dispatch("profile/dataINPS", data);
        this.bankLoading = false;
        this.INPSBar = true;
        this.INPSFlag = true;
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          CommonUtils.filterServerError(error)
        );
        this.bankLoading = false;
      }
    },

    async getLSBO() {
      this.LSBOLoading = true;
      try {
        await this.$store.dispatch("profile/dataLSBO");
        this.LSBOLoading = false;
        this.LSBOFlag = true;
        this.$store.commit(
          "credits/setMessage",
          "Данные получены"
        );
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          CommonUtils.filterServerError(error)
        );
        this.LSBOLoading = false;
      }
    },

    async getClientInfo() {
      this.clientInfoLoading = true
      try {
        this.clientInfo = await this.$store.dispatch("profile/clientInfo")
        this.clientInfoData = true
        this.clientInfoLoading = false
      } catch(error) {
        this.$store.commit(
          "credits/setMessage",
          CommonUtils.filterServerError(error)
        );
        this.clientInfoLoading = false;
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

    validDateGuaranteesContract(date, idx) {
      console.log(date);
      if (this.fullProfile.Guarantee.Insurance.items[idx].ExpDate) {
        this.$refs.guaranteesContractExpirationDate[idx].validate();
      }
      if (this.fullProfile.Guarantee.Insurance.items[idx].StartDate) {
        this.$refs.guaranteesContractGivenDate[idx].validate();
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

          console.log('this.filesAll', this.filesAll)
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
        CommentPerson: this.$store.getters["auth/username"],
        CommentPersonFIO: this.$store.getters["auth/fullName"]
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

    guaranteesValid(item = "LoanInfo", index) {
      this.totalGuaranteesSum = 0;

      if (item == "LoanInfo") {
        this.fullProfile[item].Sum = formatNumber(this.fullProfile[item].Sum);
      } else {
        this.fullProfile.Guarantee[item].items[index].Sum = formatNumber(
          this.fullProfile.Guarantee[item].items[index].Sum
        );
      }

      for (let guarantee in this.fullProfile.Guarantee) {
        for (let i of this.fullProfile.Guarantee[guarantee].items) {
          this.totalGuaranteesSum =
            this.totalGuaranteesSum +
            Number(String(i.Sum).replace(/[^0-9]/gim, ""));
        }
      }

      console.log("totalGuaranteesSum", this.totalGuaranteesSum);
      this.$refs.guaranteesValid.validate();
      this.$refs.priceCredit.validate();
      // debugger
    },

    givenPlaceValid(val) {
      return (
        val.match(/[^А-Яа-яa-z0-9]+$/) ||
        "Введите на латинице заглавными буквами"
      ); // все кроме кирилицы
    },

    fioValid(val) {
      return val.match(/^[A-Z'`]+$/) || "Введите на латинице заглавными буквами"; // только латинские буквы
    },

    mValid(val) {
      return (
        val.match(/^([A-Z'`]+\s)*[A-Z'`]+$/) ||
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

    INNFizValid(val) {
      return (+val[0] > 3 && +val[0] < 7 && !val.match(/(?=(.))\1{8,}/)) || 'Неверные данные'
    },

    INNYurValid(val) {
      return (+val[0] > 1 && +val[0] < 4 && !val.match(/(?=(.))\1{8,}/)) || 'Неверные данные'
    },

    pinppValid(val) {
      return !val.match(/(?=(.))\1{14,}/) || "Неверные данные";
    },

    // cardNumber(val) {
    //   console.log(val)
    //   if (
    //     val !== "" &&
    //     val.length != 16  &&
    //     !val.match(/(?=(.))\1{16,}/)
    //   ) {
    //     this.isValidNumCard = false;
    //   } else {
    //     this.isValidNumCard = true;
    //   }
    // },

    async printFile(fileData, idx, lang = 0) {
      this.disable = true;
      if (lang == 0) {
        fileData.loading = true
      } else {
        fileData.loadingUz = true
      }
      
      let file = null;
      this.fileData.lang = lang;
      this.fileData.type = fileData.label;
      this.fileData.data = dataTransform(fileData.data);
      try {
        console.log(JSON.stringify(this.fileData, null, 2));

        if (this.cacheDocId[idx]) {
          file = await this.$store.dispatch(
            "credits/getFile",
            this.cacheDocId[idx]
          );
        } else {
          file = await this.$store.dispatch("credits/getFile", this.fileData);

          this.cacheDocId[idx] = file.id;
        }

        console.log("file", file);

        if (file) {
          printJS(file.url);
          window.URL.revokeObjectURL(file.url);
        }

        this.disable = false;
        if (lang == 0) {
          fileData.loading = false
        } else {
          fileData.loadingUz = false
        }
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          CommonUtils.filterServerError(error)
        );
        this.disable = false;
        if (lang == 0) {
          fileData.loading = false
        } else {
          fileData.loadingUz = false
        }
      }
    },

    async printFailureCredit(fileData) {
      this.fileData.type = fileData.label;
      this.fileData.data = fileData.data;

      // console.log('failureCredit', JSON.stringify(this.fileData, null, 2))

      try {
        const file = await this.$store.dispatch("credits/getFile", this.fileData);
        if (file) {
          printJS(file.url);
          window.URL.revokeObjectURL(file.url);
        }
      } catch(error) {
        this.$store.commit(
          "credits/setMessage",
          CommonUtils.filterServerError(error)
        );
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
    },

    handleScroll(event) {
      let scrollTop = event.target.scrollTop;
      if (scrollTop > 99) {
        document.querySelector(".navMenuBlock").classList.add("topNavMenu");
      } else {
        document.querySelector(".navMenuBlock").classList.remove("topNavMenu");
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
  beforeDestroy() {
    console.log('beforeDestroy')
    if(!!document.querySelectorAll(".scroll")[1]) {
      document
        .querySelectorAll(".scroll")[1]
        .removeEventListener("scroll", this.handleScroll);
    }
  },
  components: {
    appLoader: Loader,
    appFullProfile: FullProfile,
    appLoaderFullScreen: LoaderFullScreen,
    appSetDataINPS: SetDataINPS,
    appGetDataINPS: GetDataINPS,
    appClientInfo: ClientInfo
    // appInfoList: InfoList
  },
  filters: {
    formatNumber
  }
};
</script>
<style lang="scss">
.fullProfile {
  .creditBlock {
    padding: 3px 9px;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 16px;

    .labelCredit {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 11px;
      line-height: 11px;
    }
  }

  .navMenuBlock {
    position: fixed;
    top: 108px;
    right: 0;
    // transition: top 1s ease-out 0.1s;

    .navMenu {
      list-style: none;
      padding: 0;
      margin: 0;

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
    top: 10px;
    // transition: top 1s ease-out 0.5s;
  }

  .tab-title {
    margin: 0 0 4px 0;
    background-color: #ffffff;
    color: #282d30;
    cursor: pointer;
    padding: 10px 30px;

    text-align: left;
    outline: none;
    font-size: 24px;
    font-weight: 600;

    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.1);
    border-radius: 5px;

    // &:hover {
    //   background-color: rgb(56, 91, 126);
    // }

    &:after {
      content: "";
      float: right;
      border: 1px solid #222b45;
      border-width: 0 3px 3px 0;
      margin: 13px 20px 13px;
      padding: 4px;
      border-radius: 3px;
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
    margin-bottom: 30px;
    padding: 30px 30px 30px 80px;
    color: #212121;
    background-color: #fff;
    //max-height: 0;
    //display: block;
    overflow: hidden;
    transition: max-height 0.3s ease-out;

    .comments {
      margin-bottom: 20px;

      .tab-content_title {
        margin: 0;
      }
    }

    &_title {
      font-size: 16px;
      margin: 0 0 20px 0;
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
  }

  .fieldset_block {
    position: relative;
    margin-bottom: 10px;
    color: #000;
  }

  .legend_title {
    margin: 0 0 10px 0;
    font-size: 16px;
  }

  .removeItem {
    position: absolute;
    right: 0;
    top: -5px;
    margin: 0;
    min-width: 97px;
    min-height: 35px;
    background: #ff4a4a;

    .q-btn__content {
      font-size: 14px;
    }
  }

  .addItem {
    min-width: 348px;
    min-height: 47px;
    margin-bottom: 60px;
    background: #4ab8ff;

    .q-btn__content {
      font-size: 14px;
    }
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
    margin: 0 0 8px 0;
  }

  .sliderCredit {
    // margin: 20px 15px;
  }

  .commentCredit {
    margin-bottom: 20px;
  }

  // file
  .uploadFileBlock {
    position: relative;
    // box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    //   0 3px 1px -2px rgba(0, 0, 0, 0.12);
    // border-radius: 4px;
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
    font-weight: 600;
    font-size: 20px;
    color: #333333;

    .addFileBtn, .uploadFileBtn {
      .q-btn__content {
        font-size: 14px;
        font-weight: 600;
      }
    }

    .addFileBtn {
      background: #FFFFFF;
      border: 1px solid #C4C4C4;
      box-sizing: border-box;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
      border-radius: 2px;
      color: #333333;
    }

    .uploadFileBtn {
      background: #4AB8FF;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
      border-radius: 2px;
    }

    .clip {
      margin-right: 10px;
      transform: rotate(180deg);
      color: grey;
    }
  }

  .fileNameBlock {
  }

  .loaderFile {
    font-size: 20px;
    margin-right: 10px;
  }

  .fileDownload,
  .fileNotDownload {
    margin: 6px 10px 9px;
    font-size: 24px;
  }

  .fileDownload {
    color: grey;
  }

  .fileNotDownload {
    color: red;
  }

  .fileName {
    font-weight: 600;
    font-size: 12px;
    padding: 11px 20px;
  }

  .cancel {
    .q-icon {
      font-size: 24px;
    }
  }

  .fileNameInput .q-field__control {
    width: 300px;
    // border-radius: 5px !important;
    // border: 1px solid #3a3a3a;
    background: #fff;
    outline: none;
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
    padding: 16px 16px 0 16px;
    margin-bottom: 10px;
    border: 1px solid #e0e0e0;
    background: #F5F6FA;
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
    padding: 14px 20px;
    margin: 0;
    background: #F5F6FA;
    border-radius: 5px;
    .fileLi {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
    }
  }

  .fileList {
    .printDoc {
      background: transparent;
      margin: 0;

      .q-btn__content {
        font-size: 14px;
      }
    }
  }

  .submitBlock {
    display: flex;
    justify-content: center;
    margin: 80px 0;

    .printBtn, .submitBtn, .failureCredit {
      min-width: 196px;
      min-height: 47px;
      margin: 0 15px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
      border-radius: 2px;

      .q-btn__content {
        font-size: 14px;
        font-weight: 600;
      }
    }

    .printBtn {
      background: #FFFFFF;
      border: 1px solid #C4C4C4;
      color: #333333;
    }

    .submitBtn {
      background: #47B881;
    }

    .failureCredit {
      background: #FF4A4A;
    }
  }

  .slider {
    position: relative;
    margin: 20px 0 10px;
    .periodCreditMin,
    .periodCreditMax {
      position: absolute;
    }

    .periodCreditMin {
      top: 70%;
      left: 0;
    }

    .periodCreditMax {
      top: 70%;
      right: 0;
    }
  }

  .badgePeriod {
    padding: 0;
    margin-bottom: 20px;
  }

  .printWorkDoc {

    .q-btn__wrapper {
      padding: 4px;
    }

    .on-left {
      margin-right: 0;
    }
  }
}

.removePopUp {
    background: #ff4a4a;
    color: #ffffff;

    // .q-btn__content {
    //   font-size: 14px;
    // }
  }
</style>
