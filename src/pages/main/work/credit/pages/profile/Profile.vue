<template>
<div>
  <appLoader v-if="loaderForm"/>
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
                v-model="personalData.surname"
                dense
                :hint="loadMessage"
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
                v-model="personalData.name"
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
                v-model="personalData.mname"
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
                ref="inn"
                square
                outlined
                v-model="personalData.inn"
                dense
                :hint="loadMessage"
                label="ИНН"
                mask="#########"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length === 9) || 'Количество цифр должно быть 9'
                ]"
              />
            </div>
            <div class="col-4">
              <q-input
                ref="pinpp"
                square
                outlined
                v-model="personalData.pinpp"
                dense
                :hint="loadMessage"
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
                v-model="personalData.sex"
                :options="options.sex"
                dense
                label="Пол"
                lazy-rules
                :rules="[val => !!val || 'Выберите пол']"
                class="q-pb-sm"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-4">
              <q-select
                square
                outlined
                v-model="personalData.residency"
                :options="options.residency"
                dense
                label="Резидентство"
                class="q-pb-sm"
              />
            </div>

            <div class="col-4">
              <q-input
                ref="pasportSeries"
                square
                outlined
                v-model="personalData.passportData.series"
                dense
                :hint="loadMessage"
                label="Серия паспорта"
                mask="AA"
                lazy-rules
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
                v-model="personalData.passportData.number"
                dense
                :hint="loadMessage"
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
                ref="pasportDate"
                outlined
                square
                dense
                label="Дата выдачи паспорта"
                v-model="personalData.passportData.date"
                mask="##.##.####"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length === 10) || 'Введите дату выдачи паспорта'
                ]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                      ref="qDatePasportDate"
                    >
                      <q-date
                        mask="DD.MM.YYYY"
                        v-model="personalData.passportData.date"
                        @input="() => $refs.qDatePasportDate.hide()"
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
                v-model="personalData.education"
                :options="options.education"
                dense
                label="Образование"
                lazy-rules
                :rules="[val => !!val || 'Выберите образование']"
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
            v-for="(phone, index) of personalData.phones"
            :key="index + 10"
          >
            <legend class="legend_title">Телефон {{ index + 1 }}</legend>
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  ref="phones"
                  square
                  outlined
                  v-model="phone.phone"
                  dense
                  :hint="loadMessage"
                  label="Тел. номер"
                  mask="+### (##) ### ## ##"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length === 19) || 'Введите номер телефона'
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
                  'phones',
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
                v-model.lazy="personalData.email"
                dense
                :hint="loadMessage"
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
          <fieldset class="fieldset_block">
            <legend class="legend_title">
              Адрес постоянной регистрации
            </legend>

            <div class="tab-content" ref="tabContent">
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="personalData.permanentRegistration.index"
                    dense
                    :hint="loadMessage"
                    label="Индекс"
                    mask="######"
                  />
                </div>

                <div class="col-4">
                  <q-select
                    ref="region"
                    square
                    outlined
                    v-model="personalData.permanentRegistration.region"
                    :options="options.regions"
                    dense
                    label="Регион/область"
                    :rules="[val => !!val || 'Выберите регион/область']"
                    class="q-pb-sm"
                  />
                </div>

                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="personalData.permanentRegistration.city"
                    dense
                    :hint="loadMessage"
                    label="Город / Район"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="street"
                    square
                    outlined
                    v-model="personalData.permanentRegistration.street"
                    dense
                    :hint="loadMessage"
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
                    v-model="personalData.permanentRegistration.houseNumber"
                    dense
                    :hint="loadMessage"
                    label="Номер дома"
                    lazy-rules
                    :rules="[val => !!val || 'Введите номер дома']"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="personalData.permanentRegistration.housing"
                    dense
                    :hint="loadMessage"
                    label="Корпус"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="personalData.permanentRegistration.structure"
                    dense
                    :hint="loadMessage"
                    label="Строение"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="personalData.permanentRegistration.apartmentNumber"
                    dense
                    :hint="loadMessage"
                    label="Номер квартиры"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="personalData.permanentRegistration.typeOfOwnership"
                    dense
                    :hint="loadMessage"
                    label="Вид владения"
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset class="fieldset_block">
            <legend class="legend_title">
              Адрес фактического проживания
            </legend>

            <div class="tab-content" ref="tabContent">
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-select
                    square
                    outlined
                    v-model="sameRegistration"
                    :options="options.sameRegistration"
                    dense
                    label="Совпадает ли с адресом постоянной регистрации"
                    class="q-pb-sm"
                  />
                </div>
              </div>
              <div v-if="sameRegistration === 'Нет' || sameRegistration === ''">
                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="personalData.actualRegistration.index"
                      dense
                      :hint="loadMessage"
                      label="Индекс"
                      mask="######"
                    />
                  </div>

                  <div class="col-4">
                    <q-select
                      ref="region2"
                      square
                      outlined
                      v-model="personalData.actualRegistration.region"
                      :options="options.regions"
                      dense
                      label="Регион/область"
                      :rules="[val => !!val || 'Выберите регион/область']"
                      class="q-pb-sm"
                    />
                  </div>

                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="personalData.actualRegistration.city"
                      dense
                      :hint="loadMessage"
                      label="Город / Район"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      ref="street2"
                      square
                      outlined
                      v-model="personalData.actualRegistration.street"
                      dense
                      :hint="loadMessage"
                      label="Улица / Мкр."
                      lazy-rules
                      :rules="[
                        val => !!val || 'Введите наименование улицы / мкр.'
                      ]"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      ref="houseNumber2"
                      square
                      outlined
                      v-model="personalData.actualRegistration.houseNumber"
                      dense
                      :hint="loadMessage"
                      label="Номер дома"
                      lazy-rules
                      :rules="[val => !!val || 'Введите номер дома']"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="personalData.actualRegistration.housing"
                      dense
                      :hint="loadMessage"
                      label="Корпус"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="personalData.actualRegistration.structure"
                      dense
                      :hint="loadMessage"
                      label="Строение"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="personalData.actualRegistration.apartmentNumber"
                      dense
                      :hint="loadMessage"
                      label="Номер квартиры"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="personalData.actualRegistration.typeOfOwnership"
                      dense
                      :hint="loadMessage"
                      label="Вид владения"
                    />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          <div
            v-if="emptyTemporaryRegistration"
            class="tab-content"
            ref="tabContent"
          >
            <fieldset class="fieldset_block">
              <legend class="legend_title">
                Адрес временной регистрации
              </legend>

              <div class="tab-content" ref="tabContent">
                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="personalData.temporaryRegistration.index"
                      dense
                      :hint="loadMessage"
                      label="Индекс"
                      mask="######"
                    />
                  </div>

                  <div class="col-4">
                    <q-select
                      ref="region3"
                      square
                      outlined
                      v-model="personalData.temporaryRegistration.region"
                      :options="options.regions"
                      dense
                      label="Регион/область"
                      :rules="[val => !!val || 'Выберите регион/область']"
                      class="q-pb-sm"
                    />
                  </div>

                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="personalData.temporaryRegistration.city"
                      dense
                      :hint="loadMessage"
                      label="Город / Район"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      ref="street3"
                      square
                      outlined
                      v-model="personalData.temporaryRegistration.street"
                      dense
                      :hint="loadMessage"
                      label="Улица / Мкр."
                      lazy-rules
                      :rules="[
                        val => !!val || 'Введите наименование улицы / мкр.'
                      ]"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      ref="houseNumber3"
                      square
                      outlined
                      v-model="personalData.temporaryRegistration.houseNumber"
                      dense
                      :hint="loadMessage"
                      label="Номер дома"
                      lazy-rules
                      :rules="[val => !!val || 'Введите номер дома']"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="personalData.temporaryRegistration.housing"
                      dense
                      :hint="loadMessage"
                      label="Корпус"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="personalData.temporaryRegistration.structure"
                      dense
                      :hint="loadMessage"
                      label="Строение"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="
                        personalData.temporaryRegistration.apartmentNumber
                      "
                      dense
                      :hint="loadMessage"
                      label="Номер квартиры"
                    />
                  </div>
                  <div class="col-4">
                    <q-input
                      square
                      outlined
                      v-model="
                        personalData.temporaryRegistration.typeOfOwnership
                      "
                      dense
                      :hint="loadMessage"
                      label="Вид владения"
                    />
                  </div>
                </div>
              </div>

              <q-btn
                color="red"
                label="Удалить"
                @click="
                  confirmDeleteItem(
                    'Адрес временной регистрации',
                    removeTemporaryRegistration
                  )
                "
                class="removeItem"
              ></q-btn>
            </fieldset>
          </div>

          <q-btn
            v-if="!emptyTemporaryRegistration"
            color="primary"
            label="Добавить адрес временной регистрации"
            @click="addTemporaryRegistration"
          ></q-btn>
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
                v-model="personalData.family.familyStatus"
                :options="options.family"
                dense
                label="Семейное положения"
                class="q-pb-sm"
              />
            </div>
            <div class="col-4">
              <q-select
                square
                outlined
                v-model="personalData.family.children"
                :options="options.children"
                dense
                label="Есть ли дети"
                class="q-pb-sm"
              />
            </div>
            <div class="col-4">
              <q-input
                v-if="personalData.family.children == 'Да'"
                square
                outlined
                v-model="personalData.family.childrenCount"
                mask="##"
                dense
                label="Количество детей до 18 лет"
                class="q-pb-sm"
              />
            </div>
          </div>

          <fieldset
            class="fieldset_block"
            v-for="(relative, index) of personalData.relatives"
            :key="index + 10"
          >
            <legend class="legend_title">Родственник {{ index + 1 }}</legend>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-select
                  ref="relatives"
                  square
                  outlined
                  v-model="relative.relative"
                  :options="options.relatives"
                  dense
                  label="Отношение к клиенту"
                  lazy-rules
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
                  v-model="relative.surname"
                  dense
                  :hint="loadMessage"
                  label="Фамилия"
                  lazy-rules
                  :rules="[val => !!val || 'Введите фамилию']"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="relatives_name"
                  square
                  outlined
                  v-model="relative.name"
                  dense
                  :hint="loadMessage"
                  label="Имя"
                  lazy-rules
                  :rules="[val => !!val || 'Введите имя']"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="relatives_mname"
                  square
                  outlined
                  v-model="relative.mname"
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
                  ref="relatives_birthday"
                  outlined
                  square
                  dense
                  label="Дата рождения"
                  v-model="relative.birthday"
                  mask="##.##.####"
                  lazy-rules
                  :rules="[
                    val => (val && val.length === 10) || 'Введите дату рождения'
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
                          v-model="relative.birthday"
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
                  v-model="relative.passportData.series"
                  dense
                  :hint="loadMessage"
                  label="Серия паспорта"
                  mask="AA"
                  lazy-rules
                  :rules="[
                    val => (val && val.length === 2) || 'Введите Серию паспорта'
                  ]"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="relatives_pasportNumber"
                  square
                  outlined
                  v-model="relative.passportData.number"
                  dense
                  :hint="loadMessage"
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
                <div class="col-4">
                  
                  <q-input
                    ref="relatives_pasportDate"
                    outlined
                    square
                    dense
                    label="Дата выдачи паспорта"
                    v-model="relative.passportData.date"
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
                          ref="qDateRelativePassportDate"
                        >
                          <q-date
                            mask="DD.MM.YYYY"
                            v-model="relative.passportData.date"
                            @input="
                              () =>
                                $refs.qDateRelativePassportDate[index].hide()
                            "
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
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
                  'relatives',
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
                v-model="personalData.activity.kind"
                :options="options.activities"
                dense
                label="Вид деятельности"
                :rules="[val => !!val || 'Выберите вид деятельности']"
                class="q-pb-sm"
              />
            </div>
          </div>

          <template v-if="personalData.activity.kind === options.activities[0]">
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  ref="nameOfEmployer"
                  square
                  outlined
                  v-model="personalData.activity.nameOfEmployer"
                  dense
                  :hint="loadMessage"
                  label="Наименование работодателя"
                  lazy-rules
                  :rules="[val => !!val || 'Введите наименование работодателя']"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="innOfEmployer"
                  square
                  outlined
                  v-model.number="personalData.activity.innOfEmployer"
                  dense
                  :hint="loadMessage"
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
                  v-model="personalData.activity.typeOrganization"
                  :options="options.typeOrganization"
                  dense
                  label="Вид деятельности организации"
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
                  v-model="personalData.activity.amountWorkes"
                  :options="options.amountWorkes"
                  dense
                  label="Количество работников организации"
                  :rules="[
                    val => !!val || 'Выберите количество работников организации'
                  ]"
                  class="q-pb-sm"
                />
              </div>
              <div class="col-4">
                <q-input
                  ref="position"
                  square
                  outlined
                  v-model="personalData.activity.position"
                  dense
                  :hint="loadMessage"
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
                  v-model="personalData.activity.positionCategory"
                  :options="options.positionCategory"
                  dense
                  label="Категория занимаемой должности"
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
                  v-model="personalData.activity.workExperience"
                  :options="options.workExperience"
                  dense
                  label="Стаж на поледнем месте работы"
                  :rules="[val => !!val || 'Выберите стаж работы']"
                  class="q-pb-sm"
                />
              </div>
              <div class="col-4">
                <q-select
                  ref="totalWorkExperience"
                  square
                  outlined
                  v-model="personalData.activity.totalWorkExperience"
                  :options="options.workExperience"
                  dense
                  label="Общий трудовой стаж"
                  :rules="[val => !!val || 'Выберите общий трудовой стаж']"
                  class="q-pb-sm"
                />
              </div>
            </div>
          </template>

          <template
            v-if="
              personalData.activity.kind === options.activities[1] ||
                personalData.activity.kind === options.activities[2]
            "
          >
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-select
                  ref="typeOrganization2"
                  square
                  outlined
                  v-model="personalData.activity.typeOrganization"
                  :options="options.typeOrganization"
                  dense
                  label="Вид деятельности организации"
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
                  v-model="personalData.activity.workExperience"
                  :options="options.workExperience"
                  dense
                  label="Срок деятельности"
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
                v-model.number="personalData.expenseIncome.income"
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
                v-model.number="personalData.expenseIncome.expense"
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
                v-model.number="personalData.expenseIncome.otherExpenses"
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
                v-model="personalData.expenseIncome.externalIncome"
                :options="options.extIncOption"
                dense
                label="Наличие дополнительного дохода"
                class="q-pb-sm"
              />
            </div>
            <template v-if="personalData.expenseIncome.externalIncome == 'Да'">
              <div class="col-4">
                <q-input
                  square
                  outlined
                  v-model.number="personalData.expenseIncome.externalIncomeSize"
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
                  v-model="personalData.expenseIncome.additionalIncomeSource"
                  :options="options.additIncSourOption"
                  dense
                  label="Источник дополнительного дохода"
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
          <h5 v-if="!personalData.properties.length" class="tab-content_title">
            Данные по недвижимости отсутствуют
          </h5>
          <fieldset
            class="fieldset_block"
            v-for="(property, index) of personalData.properties"
            :key="index + 10"
          >
            <legend class="legend_title">Недвижимость {{ index + 1 }}</legend>
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-select
                  ref="typeProperties"
                  square
                  outlined
                  v-model="property.type"
                  :options="options.properties"
                  dense
                  label="Вид недвижимости"
                  lazy-rules
                  :rules="[val => !!val || 'Выберите вид недвижимости']"
                  class="q-pb-sm"
                />
              </div>
              <div class="col-4">
                <q-select
                  ref="regionsProperties"
                  square
                  outlined
                  v-model="property.region"
                  :options="options.regions"
                  dense
                  label="Регион / область"
                  lazy-rules
                  :rules="[val => !!val || 'Выберите регион']"
                  class="q-pb-sm"
                />
              </div>

              <div class="col-4">
                <q-input
                  ref="pricesProperties"
                  square
                  outlined
                  v-model.number="property.price"
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
                  removeItem,
                  'properties',
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
          <h5 v-if="!personalData.vehicles.length" class="tab-content_title">
            Данные по транспортным средствам отсутствуют
          </h5>
          <fieldset
            class="fieldset_block"
            v-for="(vehicle, index) of personalData.vehicles"
            :key="index + 20"
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
                  v-model="vehicle.type"
                  :options="options.vehicles"
                  dense
                  label="Вид транспортного средства"
                  lazy-rules
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
                  v-model="vehicle.brand"
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
                  v-model="vehicle.year"
                  :options="options.yearsOfIssueVehicle"
                  dense
                  label="Год выпуска"
                  lazy-rules
                  :rules="[val => !!val || 'Выберите год']"
                  class="q-pb-sm"
                />
              </div>
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input
                  ref="priceVehicles"
                  square
                  outlined
                  v-model.number="vehicle.price"
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
                  removeItem,
                  'vehicles',
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
          <fieldset
            class="fieldset_block"
            v-for="(guarantee, index) of personalData.guarantees"
            :key="index + 10"
          >
            <legend class="legend_title">Обеспечение {{ index + 1 }}</legend>
            {{ guarantee }}
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-select
                  ref="typeGuarantees"
                  square
                  outlined
                  :value="guarantee.type"
                  :options="options.guarantees"
                  @input="updateField('type', index, $event)"
                  dense
                  label="Вид гарантии"
                  lazy-rules
                  :rules="[val => !!val || 'Выберите вид гарантии']"
                  class="q-pb-sm"
                />
              </div>
            </div>
            <template v-if="guarantee.type === options.guarantees[0]">
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-select
                    ref="customersAttitude"
                    square
                    outlined
                    v-model="guarantee.individual.attitude"
                    :options="options.customerAttitude"
                    dense
                    label="Отношение к клиенту"
                    lazy-rules
                    :rules="[val => !!val || 'Выберите отношение к клиенту']"
                    class="q-pb-sm"
                  />
                </div>

                <div class="col-4">
                  <q-input
                    ref="priceGuarantees"
                    square
                    outlined
                    v-model.number="guarantee.individual.price"
                    :hint="loadMessage"
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
                    v-model="guarantee.individual.surname"
                    dense
                    :hint="loadMessage"
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
                    v-model="guarantee.individual.name"
                    dense
                    :hint="loadMessage"
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
                    v-model="guarantee.individual.mname"
                    dense
                    :hint="loadMessage"
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
                    v-model="guarantee.individual.birthday"
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
                            v-model="guarantee.individual.birthday"
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
                    v-model="guarantee.individual.inn"
                    dense
                    :hint="loadMessage"
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
                    v-model="guarantee.individual.pinpp"
                    dense
                    :hint="loadMessage"
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
                    v-model="guarantee.individual.residency"
                    :options="options.residency"
                    dense
                    label="Резидентство"
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
                    v-model="guarantee.individual.passportData.series"
                    dense
                    :hint="loadMessage"
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
                    v-model="guarantee.individual.passportData.number"
                    dense
                    :hint="loadMessage"
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
                    v-model="guarantee.individual.passportData.date"
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
                            v-model="guarantee.individual.passportData.date"
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
                    v-model="guarantee.individual.index"
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
                    v-model="guarantee.individual.region"
                    :options="options.regions"
                    dense
                    label="Регион/область"
                    :rules="[val => !!val || 'Выберите регион/область']"
                    class="q-pb-sm"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.individual.city"
                    dense
                    :hint="loadMessage"
                    label="Город / Район"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="streetGuarantees"
                    square
                    outlined
                    v-model="guarantee.individual.street"
                    dense
                    :hint="loadMessage"
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
                    v-model="guarantee.individual.houseNumber"
                    dense
                    :hint="loadMessage"
                    label="Номер дома"
                    lazy-rules
                    :rules="[val => !!val || 'Введите номер дома']"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.individual.housing"
                    dense
                    :hint="loadMessage"
                    label="Корпус"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.individual.structure"
                    dense
                    :hint="loadMessage"
                    label="Строение"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.individual.apartmentNumber"
                    dense
                    :hint="loadMessage"
                    label="Номер квартиры"
                  />
                </div>
              </div>

              <!-- phone -->
              <fieldset
                class="fieldset_block"
                v-for="(phone, phoneIndex) of guarantee.individual.phones"
                :key="phoneIndex + 10"
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
                      v-model="phone.phone"
                      dense
                      :hint="loadMessage"
                      label="Тел. номер"
                      mask="+### (##) ### ## ##"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length === 19) || 'Введите номер телефона'
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
                      'individual',
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
                @click="addPhoneGuarantee({ item: 'individual', index })"
                class="addItem"
              ></q-btn>
            </template>

            <template v-if="guarantee.type === options.guarantees[1]">
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="priceGuarantees"
                    square
                    outlined
                    v-model.number="guarantee.entity.price"
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
                    v-model="guarantee.entity.name"
                    dense
                    :hint="loadMessage"
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
                    v-model="guarantee.entity.inn"
                    dense
                    :hint="loadMessage"
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
                  <q-select
                    ref="kindOfActivityGuarantees"
                    square
                    outlined
                    v-model="guarantee.entity.activity"
                    :options="options.activities"
                    dense
                    label="Вид деятельности"
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
                    v-model="guarantee.entity.index"
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
                    v-model="guarantee.entity.region"
                    :options="options.regions"
                    dense
                    label="Регион/область"
                    :rules="[val => !!val || 'Выберите регион/область']"
                    class="q-pb-sm"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.entity.city"
                    dense
                    :hint="loadMessage"
                    label="Город / Район"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="streetGuarantees"
                    square
                    outlined
                    v-model="guarantee.entity.street"
                    dense
                    :hint="loadMessage"
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
                    v-model="guarantee.entity.houseNumber"
                    dense
                    :hint="loadMessage"
                    label="Номер дома"
                    lazy-rules
                    :rules="[val => !!val || 'Введите номер дома']"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.entity.housing"
                    dense
                    :hint="loadMessage"
                    label="Корпус"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.entity.structure"
                    dense
                    :hint="loadMessage"
                    label="Строение"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    square
                    outlined
                    v-model="guarantee.entity.officeNumber"
                    dense
                    :hint="loadMessage"
                    label="Номер офиса"
                  />
                </div>
              </div>

              <!-- phone -->
              <fieldset
                class="fieldset_block"
                v-for="(phone, phoneIndex) of guarantee.entity.phones"
                :key="phoneIndex + 10"
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
                      v-model="phone.phone"
                      dense
                      :hint="loadMessage"
                      label="Тел. номер"
                      mask="+### (##) ### ## ##"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length === 19) || 'Введите номер телефона'
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
                      'Телефон ' + (phoneIndex + 1),
                      removePhoneGuarantee,
                      'entity',
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
                @click="addPhoneGuarantee({ item: 'entity', index })"
                class="addItem"
              ></q-btn>
            </template>

            <template v-if="guarantee.type === options.guarantees[2]">
              <div class="row q-col-gutter-md">
                <div class="col-4">
                  <q-input
                    ref="nameGuarantees"
                    square
                    outlined
                    v-model="guarantee.insurance.name"
                    dense
                    :hint="loadMessage"
                    label="Наименование страховой компании"
                    lazy-rules
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
                    v-model="guarantee.insurance.inn"
                    dense
                    :hint="loadMessage"
                    label="ИНН страховой компании"
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
                    ref="priceGuarantees"
                    square
                    outlined
                    v-model.number="guarantee.insurance.price"
                    type="number"
                    dense
                    label="Сумма страхового полиса"
                    lazy-rules
                    :rules="[val => !!val || 'Введите сумму']"
                  />
                </div>
              </div>
            </template>

            <q-btn
              color="red"
              label="Удалить"
              @click="
                confirmDeleteItem(
                  'Обеспечение ' + (index + 1),
                  removeItem,
                  'guarantees',
                  index
                )
              "
              class="removeItem"
            ></q-btn>
          </fieldset>

          <q-btn
            color="primary"
            label="Добавить обеспечение"
            @click="addGuarantee"
            class="addGuarantee"
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
                v-model="personalData.infoCredit.product"
                :options="options.productCredit"
                dense
                label="Кредитный продукт"
                :rules="[val => !!val || 'Выберите кредитный продукт']"
                class="q-pb-sm"
              />
            </div>
            <div class="col-4">
              <q-input
                ref="priceCredit"
                square
                outlined
                v-model.number="personalData.infoCredit.price"
                type="number"
                dense
                label="Запрашиваемая сумма кредита"
                lazy-rules
                :rules="[val => !!val || 'Введите сумму кредита']"
              />
            </div>
            <div class="col-4">
              <q-input
                ref="currencyCredit"
                square
                outlined
                v-model="personalData.infoCredit.currency"
                dense
                disable
                label="Валюта"
                lazy-rules
                :rules="[val => !!val || 'Введите валюту']"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-4">
              <q-select
                ref="typeRepayment"
                square
                outlined
                v-model="personalData.infoCredit.typeRepayment"
                :options="options.typeRepayment"
                dense
                label="Тип погашения"
                :rules="[val => !!val || 'Выберите тип погашения']"
                class="q-pb-sm"
              />
            </div>
            <div class="col-4"></div>
            <div class="col-4"></div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-4">
              <q-input
                ref="interestRateMax"
                square
                outlined
                v-model="personalData.infoCredit.interestRateMax"
                dense
                disable
                label="Процентаня ставка по кредиту (максимальная)"
                lazy-rules
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
                v-model="personalData.infoCredit.interestRateMin"
                dense
                disable
                label="Процентаня ставка по кредиту (минимальная)"
                lazy-rules
                :rules="[
                  val => !!val || 'Введите минимальную процентную ставку'
                ]"
              />
            </div>

            <div class="col-4">
              <q-select
                ref="periodRepayment"
                square
                outlined
                v-model="personalData.infoCredit.periodRepayment"
                :options="options.periodRepayment"
                dense
                label="Льготный период по погашению кредита"
                :rules="[val => !!val || 'Выберите период погашения']"
                class="q-pb-sm"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-4">
              <q-input
                ref="comfortablePeriodRepayment"
                square
                outlined
                v-model.number="
                  personalData.infoCredit.comfortablePeriodRepayment
                "
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
                v-model.number="personalData.infoCredit.periodRepaymentMin"
                type="number"
                dense
                disable
                label="Минимальное количество месяцев на кредит"
                mask="##"
                lazy-rules
                :rules="[
                  val =>
                    !!val || 'Введите минимальное количество месяцев на кредит'
                ]"
              />
            </div>
            <div class="col-4">
              <q-input
                ref="periodRepaymentMax"
                square
                outlined
                v-model.number="personalData.infoCredit.periodRepaymentMax"
                type="number"
                dense
                disable
                label="Максимальное количество месяцев на кредит"
                mask="##"
                lazy-rules
                :rules="[
                  val =>
                    !!val || 'Введите максимальное количество месяцев на кредит'
                ]"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-4">
              <q-select
                ref="typeCredit"
                square
                outlined
                v-model="personalData.infoCredit.type"
                :options="options.typeCredit"
                dense
                label="Вид кредита"
                :rules="[val => !!val || 'Выберите вид кредита']"
                class="q-pb-sm"
              />
            </div>
            <div class="col-4"></div>
            <div class="col-4"></div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-4">
              <q-input
                ref="initialFee"
                square
                outlined
                v-model.number="personalData.infoCredit.initialFee"
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
                v-model.number="personalData.infoCredit.procentInitialFeeMin"
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
                v-model.number="personalData.infoCredit.procentInitialFeeMax"
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
                v-model="personalData.infoCredit.purposeCredit"
                :options="options.purposeCredit"
                dense
                label="Цель кредитования"
                :rules="[val => !!val || 'Выберите цель кредитования']"
                class="q-pb-sm"
              />
            </div>
            <div class="col-4">
              <q-input
                ref="sellerName"
                square
                outlined
                v-model="personalData.infoCredit.sellerName"
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
                v-model="personalData.infoCredit.productName"
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
                v-model="personalData.infoCredit.sourceFinancs"
                :options="options.sourceFinancs"
                dense
                label="Источник финансирования"
                :rules="[val => !!val || 'Выберите источник финансирования']"
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
              <q-input v-model="personalData.comment" type="textarea" />
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
    <appFullProfile />

  </div>
</div>
</template>

<script>
import * as moment from "moment";
import CommonUtils from "../../../../../../../../shared/utils/CommonUtils"
import Loader from '../../../../../../../../components/Loader'
import FullProfile from './FullProfile'

export default {
  name: "profile",
  data() {
    return {
      loaderForm: false,
      isValid: true, //валидация Email
      sameRegistration: "",
      emptyTemporaryRegistration: false,
      confirm: false,
      confirmCredit: false,
      itemName: "",
      itemFunc: null,
      paylod: {},
      bar: false,
      options: {
        sex: ["Мужской", "Женский"],
        residency: ["Да", "Нет"],
        education: [
          "Ниже среднего",
          "Высшее",
          "Несколько высших",
          "Средне специальное",
          "Ученая степень/MBA"
        ],
        regions: [
          "Ташкентская",
          "Андижанская",
          "Бухарская",
          "Джизакская",
          "Кашкадарьинская",
          "Наманганская",
          "Навоийская",
          "Самаркандская",
          "Сурхандарьинская",
          "Сырдарьинская",
          "Ферганская",
          "Хорезмская ",
          "Республика Каракалпакстан"
        ],
        sameRegistration: ["Да", "Нет"],
        family: [
          "Гражданский брак",
          "Женат/Замужем",
          "Холост/Не замужем",
          "Вдовец/Вдова",
          "Разведен/Разведена"
        ],
        children: ["Да", "Нет"],
        relatives: ["Отец", "Мать", "Брат", "Сестра"],

        activities: [
          "Работа по найму",
          "Предпринимательская деятельность",
          "Личное подсобное хозяйство",
          "Безработный"
        ],

        typeOrganization: [
          "ВОДОСНАБЖЕНИЕ; КАНАЛИЗАЦИЯ, СБОР И УТИЛИЗАЦИЯ ОТХОДОВ",
          "ГОРНОДОБЫВАЮЩАЯ ПРОМЫШЛЕННОСТЬ И РАЗРАБОТКА КАРЬЕРОВ",
          "ГОСУДАРСТВЕННОЕ УПРАВЛЕНИЕ И ОБОРОНА; ОБЯЗАТЕЛЬНОЕ СОЦИАЛЬНОЕ ОБЕСПЕЧЕНИЕ",
          "ДЕЯТЕЛЬНОСТЬ ДОМАШНИХ ХОЗЯЙСТВ, НАНИМАЮЩИХ ДОМАШНЮЮ ПРИСЛУГУ И ПРОИЗВОДЯЩИХ ТОВАРЫ И УСЛУГИ ДЛЯ СОБСТВЕННОГО ПОТРЕБЛЕНИЯ",
          "ДЕЯТЕЛЬНОСТЬ ПО УПРАВЛЕНИЮ И ПРЕДОСТАВЛЕНИЮ ВСПОМОГАТЕЛЬНЫХ УСЛУГ",
          "ДЕЯТЕЛЬНОСТЬ ЭКСТЕРРИТОРИАЛЬНЫХ ОРГАНИЗАЦИЙ",
          "ЗДРАВООХРАНЕНИЕ И ПРЕДОСТАВЛЕНИЕ СОЦИАЛЬНЫХ УСЛУГ",
          "ИНФОРМАЦИЯ И СВЯЗЬ",
          "ИСКУССТВО, РАЗВЛЕЧЕНИЯ И ОТДЫХ",
          "ОБРАБАТЫВАЮЩАЯ ПРОМЫШЛЕННОСТЬ",
          "ОБРАЗОВАНИЕ",
          "ОПЕРАЦИИ С НЕДВИЖИМЫМ ИМУЩЕСТВОМ",
          "ОПТОВАЯ И РОЗНИЧНАЯ ТОРГОВЛЯ; РЕМОНТ МОТОРНЫХ ТРАНСПОРТНЫХ СРЕДСТВ И МОТОЦИКЛОВ",
          "ПЕРЕВОЗКА И ХРАНЕНИЕ",
          "ПРЕДОСТАВЛЕНИЕ ПРОЧИХ ВИДОВ УСЛУГ",
          "ПРОФЕССИОНАЛЬНАЯ, НАУЧНАЯ И ТЕХНИЧЕСКАЯ ДЕЯТЕЛЬНОСТЬ",
          "СЕЛЬСКОЕ, ЛЕСНОЕ И РЫБНОЕ ХОЗЯЙСТВО",
          "СТРОИТЕЛЬСТВО",
          "УСЛУГИ ПО ПРОЖИВАНИЮ И ПИТАНИЮ",
          "ФИНАНСОВАЯ И СТРАХОВАЯ ДЕЯТЕЛЬНОСТЬ",
          "ЭЛЕКТРОСНАБЖЕНИЕ, ПОДАЧА ГАЗА, ПАРА И КОНДИЦИОНИРОВАНИЕ ВОЗДУХА"
        ],

        amountWorkes: ["До 10", "11-30", "31-50", "51-100", "более 100"],

        positionCategory: [
          "Владелец предприятия",
          "Военнослужащий",
          "Генеральный директор",
          "Госслужащий",
          "Руководитель высшего звена",
          "Руководитель начального звена",
          "Руководитель среднего звена",
          "Специалист"
        ],

        workExperience: [
          "менее 6 месяцев",
          "6-12 месяцев",
          "1-3 года",
          "3-5 лет",
          "5-10 лет",
          "более 10 лет"
        ],

        // MONEY
        extIncOption: ["Да", "Нет"], //наличие дополнительного дохода
        additIncSourOption: [
          "Работа по найму",
          "Аренда движимого имущетсва",
          "Аренда недвижимого имущества",
          "Предпринимательская деятельность",
          "Дивиденды",
          "Другое"
        ], //источник дополнительного дохода

        properties: [
          "Дом",
          "Земельный участок",
          "Квартира",
          "Коммерческая недвижимость",
          "Комната"
        ],

        vehicles: [
          "Автобус",
          "Автомобили-тягачи",
          "Грузовой автомобиль",
          "Грузовой прицеп и полуприцеп",
          "Катамараны и лодки",
          "Легковой автомобиль",
          "Микроавтобус",
          "Мотоцикл",
          "Пассажирский прицеп и полуприцеп",
          "Сельхозмашины и техника",
          "Специальный автомобиль",
          "Специальный прицеп и полуприцеп"
        ],

        yearsOfIssueVehicle: [],

        guarantees: ["Физлицо", "Юрлицо", "Страхование"],

        customerAttitude: [
          "близкий родственник",
          "сосед",
          "коллега",
          "друг",
          "работодатель"
        ],

        typeCredit: ["Тип 1", "Тип 2", "Тип 3"],

        productCredit: ["Тип 1", "Тип 2", "Тип 3"],

        typeRepayment: ["Аннуитетный", "Дифференцированный", "Тип 3"],

        periodRepayment: ["Да", "Нет"],

        purposeCredit: ["Цель1", "Цель2", "Цель3"],

        sourceFinancs: [
          "Финансирование1",
          "Финансирование2",
          "Финансирование3"
        ],

        paymentType: ["Аннуэтетный", "Дифференцированный"],

        preferential: [
          {
            label: "Нет",
            value: false
          },
          {
            label: "Да",
            value: true
          }
        ]
      },

    };
  },
  // mounted() {
  //   this.$store.state.profile.personalData.name = this.$store.state.credits.personalData.name;
  //   this.$store.state.profile.personalData.surname = this.$store.state.credits.personalData.surname;
  //   this.$store.state.profile.personalData.mname = this.$store.state.credits.personalData.mname;
  //   this.$store.state.profile.personalData.inn = this.$store.state.credits.personalData.inn;
  //   this.$store.state.profile.personalData.phones[0].phone = this.$store.state.credits.personalData.phone;
  //   this.$store.state.profile.personalData.pinpp = this.$store.state.credits.personalData.pinpp;
  //   this.$store.state.profile.personalData.passportData.series = this.$store.state.credits.personalData.passport.slice(
  //     0,
  //     2
  //   );
  //   this.$store.state.profile.personalData.passportData.number = this.$store.state.credits.personalData.passport.slice(
  //     2
  //   );

  //   this.$store.state.profile.personalData.expenseIncome.income = this.$store.state.credits.personalData.income;
  //   this.$store.state.profile.personalData.expenseIncome.expense = this.$store.state.credits.personalData.expense;
  //   this.$store.state.profile.personalData.expenseIncome.otherExpenses = this.$store.state.credits.personalData.otherExpenses;
  //   this.$store.state.profile.personalData.expenseIncome.externalIncome = this.$store.state.credits.personalData.externalIncome;
  //   this.$store.state.profile.personalData.expenseIncome.externalIncomeSize = this.$store.state.credits.personalData.externalIncomeSize;
  //   this.$store.state.profile.personalData.expenseIncome.additionalIncomeSource = this.$store.state.credits.personalData.additionalIncomeSource;

  //   this.$store.state.profile.creditCalc.loanSum = this.$store.state.credits.preApprovalData.maxSum;

  // },
  async created() {
    
    // try {
    //   const auth = await this.$store.dispatch("authBpm")
    //   console.log('auth', auth)
    //   const process = await this.$store.dispatch("startProcess")
    //   console.log('process', process) 
    //   this.loaderForm = false;

    // } catch (error) {
    //   const errorMessage = CommonUtils.filterServerError(error)
    //   //console.log('ooooooooo', errorMessage)
    //   this.$store.commit('setError', errorMessage)
    //   //this.$router.push('errorPage')
    //   sessionStorage.removeItem("csrf_token");
    //   //this.loaderForm = false
    // }

  },
  computed: {
    loadMessage() {
      return this.$store.state.profile.loadMessage;
    },
    disableInput() {
      return this.$store.state.profile.disableInput;
    },
    disableBtn() {
      return this.$store.state.profile.disableBtn;
    },

    personalData() {
      return this.$store.state.profile.personalData;
    },

    preApprovalData() {
      return this.$store.state.credits.preApprovalData;
    },
    creditCalc() {
      return this.$store.state.profile.creditCalc;
    }
  },
  watch: {
    "personalData.email"() {
      if (
        this.personalData.email !== "" &&
        !this.personalData.email.match(
          /^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/i
        )
      ) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    }
  },
  methods: {
    onSubmit() {
      // if (!this.$refs.surname.validate()) {
      //   console.log(this.$refs.surname.computedErrorMessage)
      // }

      this.$refs.surname.validate();
      this.$refs.name.validate();
      this.$refs.mname.validate();
      this.$refs.inn.validate();
      this.$refs.pinpp.validate();
      this.$refs.sex.validate();

      this.$refs.pasportSeries.validate();
      this.$refs.pasportNumber.validate();
      this.$refs.pasportDate.validate();

      this.$refs.education.validate();

      this.validFilter("phonesValid", "phones");

      this.$refs.region.validate();
      this.$refs.street.validate();
      this.$refs.houseNumber.validate();

      if (this.sameRegistration === this.options.sameRegistration[1] || this.sameRegistration === "") {
        this.$refs.region2.validate();
        this.$refs.street2.validate();
        this.$refs.houseNumber2.validate();
      } else {
        this.validItems("region2");
        this.validItems("street2");
        this.validItems("houseNumber2");
      }

      if (this.emptyTemporaryRegistration) {
        this.$refs.region3.validate();
        this.$refs.street3.validate();
        this.$refs.houseNumber3.validate();
      } else {
        this.validItems("region3");
        this.validItems("street3");
        this.validItems("houseNumber3");
      }

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

      if (this.personalData.activity.kind === this.options.activities[0]) {
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
        this.personalData.activity.kind === this.options.activities[1] ||
        this.personalData.activity.kind === this.options.activities[2]
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

      // if ( this.$refs.typeGuarantees && this.$refs.typeGuarantees !== []) {
      //   this.validFilter("typeGuaranteesValid", "typeGuarantees");
      // }

      if (this.$refs.typeGuarantees) {
        if (this.$refs.typeGuarantees.length !== 0) {
          console.log(this.$refs.typeGuarantees);
          this.validFilter("typeGuaranteesValid", "typeGuarantees");

          for (let typeGuarante of this.$refs.typeGuarantees) {
            if (typeGuarante.value === this.options.guarantees[0]) {
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
              this.validFilter(
                "pasportDateGuaranteesValid",
                "pasportDateGuarantees"
              );
              this.validFilter("regionGuaranteesValid", "regionGuarantees");
              this.validFilter("streetGuaranteesValid", "streetGuarantees");
              this.validFilter(
                "houseNumberGuaranteesValid",
                "houseNumberGuarantees"
              );
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

            if (typeGuarante.value === this.options.guarantees[1]) {
              this.validFilter("priceGuaranteesValid", "priceGuarantees");
              this.validFilter("nameGuaranteesValid", "nameGuarantees");
              this.validFilter("innGuaranteesValid", "innGuarantees");
              this.validFilter("regionGuaranteesValid", "regionGuarantees");
              this.validFilter("streetGuaranteesValid", "streetGuarantees");
              this.validFilter(
                "houseNumberGuaranteesValid",
                "houseNumberGuarantees"
              );
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

            if (typeGuarante.value === this.options.guarantees[2]) {
              this.validFilter("nameGuaranteesValid", "nameGuarantees");
              this.validFilter("innGuaranteesValid", "innGuarantees");
              this.validFilter("priceGuaranteesValid", "priceGuarantees");
            } else {
              this.validItems("priceGuaranteesValid");
              this.validItems("nameGuaranteesValid");
              this.validItems("innGuaranteesValid");
            }
          }
        } else {
          this.validItems("typeGuaranteesValid");
        }
      } else {
        this.validItems("typeGuaranteesValid");
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

      this.$refs.productCredit.validate();
      this.$refs.priceCredit.validate();
      this.$refs.typeRepayment.validate();
      this.$refs.periodRepayment.validate();
      this.$refs.comfortablePeriodRepayment.validate();
      this.$refs.typeCredit.validate();
      this.$refs.initialFee.validate();
      this.$refs.purposeCredit.validate();
      this.$refs.sellerName.validate();
      this.$refs.productName.validate();
      this.$refs.sourceFinancs.validate();

      console.log(this.$refs.typeGuaranteesValid);

      if (
        this.$refs.surname.hasError ||
        this.$refs.name.hasError ||
        this.$refs.mname.hasError ||
        this.$refs.inn.hasError ||
        this.$refs.pinpp.hasError ||
        this.$refs.sex.hasError ||
        this.$refs.pasportSeries.hasError ||
        this.$refs.pasportNumber.hasError ||
        this.$refs.pasportDate.hasError ||
        this.$refs.phonesValid.hasError ||
        this.$refs.education.hasError ||
        this.$refs.region.hasError ||
        this.$refs.region2.hasError ||
        this.$refs.region3.hasError ||
        this.$refs.houseNumber.hasError ||
        this.$refs.houseNumber2.hasError ||
        this.$refs.houseNumber3.hasError ||
        this.$refs.street.hasError ||
        this.$refs.street2.hasError ||
        this.$refs.street3.hasError ||
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
        this.$refs.typeGuaranteesValid.hasError ||
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
        this.$refs.periodRepayment.hasError ||
        this.$refs.comfortablePeriodRepayment.hasError ||
        this.$refs.typeCredit.hasError ||
        this.$refs.initialFee.hasError ||
        this.$refs.purposeCredit.hasError ||
        this.$refs.sellerName.hasError ||
        this.$refs.productName.hasError ||
        this.$refs.sourceFinancs.hasError
      ) {
        this.formHasError = true;
        this.bar = true;
      } else {
        console.log("personalData", this.$store.state.profile.personalData);

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

    updateField(field, index, value) {
      console.log("dddd", this.$refs);

      this.$store.commit("updateGuarantee", {
        [index]: {
          [field]: value,
          individual: {
            attitude: "",
            price: 0,
            surname: "",
            name: "",
            mname: "",
            birthday: "",
            inn: null,
            pinpp: null,
            residency: "",
            index: "",
            region: "",
            city: "",
            street: "",
            houseNumber: "",
            housing: "",
            structure: "",
            apartmentNumber: "",
            passportData: {
              series: "",
              number: null,
              date: ""
            },
            phones: [
              {
                phone: 998
              }
            ]
          },
          entity: {
            price: 0,
            name: "",
            inn: null,
            activity: "",
            index: "",
            region: "",
            city: "",
            street: "",
            houseNumber: "",
            housing: "",
            structure: "",
            officeNumber: "",
            phones: [
              {
                phone: 998
              }
            ]
          },
          insurance: {
            name: "",
            inn: null,
            price: 0
          }
        }
      });
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

    addGuarantee() {
      this.$store.commit("addGuarantee");
    },

    addTypeGuarantee() {
      this.$store.commit("addTypeGuarantee");
    },

    removeItem(payload) {
      this.$store.commit("removeItem", payload);
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

    removeTemporaryRegistration() {
      this.emptyTemporaryRegistration = false;
    },

    removePhoneGuarantee(payload) {
      this.$store.commit("removePhoneGuarantee", payload);
    },

    addTemporaryRegistration() {
      this.emptyTemporaryRegistration = true;
    },

    addRelative() {
      this.$store.commit("addRelative");
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
    appFullProfile: FullProfile,
  }
};
</script>
<style lang="scss" scoped>
.tab-title {
  background-color: #ededed;
  color: #0e3475;
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
    content: "\2212";
    color: #0e3475;
    font-size: 18px;
    font-weight: bold;
    float: right;
    margin-left: 5px;
  }
}

.active {
  //background-color: rgb(56, 91, 126);

  &:after {
    content: "\002B";
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

.q-field__bottom {
  padding: 1px 0 0 10px;
}

.q-btn--rectangle {
  border-radius: 0;
}

.q-field--with-bottom,
.q-pb-sm {
  padding-bottom: 16px;
}

.q-dialog__inner--minimized > div {
  max-width: 85%;
}

.creditCalc {
  min-width: 960px;
}
</style>

 <style lang="scss">
// .q-field__bottom {
//   padding: 1px 0 0 10px;
// }

// .q-btn--rectangle {
//   border-radius: 0;
// }

// .q-field--with-bottom,
// .q-pb-sm {
//   padding-bottom: 16px;
// }

// .q-dialog__inner--minimized > div {
//   max-width: 85%;
// }

// .creditCalc {
//   min-width: 960px;
// }
</style>
