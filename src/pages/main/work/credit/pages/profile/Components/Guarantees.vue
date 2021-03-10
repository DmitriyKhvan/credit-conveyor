<template>
  <div class="guarantees">
    <h4 class="tab-title" ref="guarantees">Гарантии и поручительство</h4>
    <div class="tab-content" ref="tabContent">
      <q-field
        ref="guaranteesValid"
        :value="!!guaranteeCount.length"
        :rules="[
          val => !!val || 'Добавьте гарантию или поручительство',
          val =>
            totalGuaranteesSum -
              Number(
                String(fullProfile.LoanInfo.Sum).replace(/[^0-9]/gim, '')
              ) >=
              Number(
                String(fullProfile.LoanInfo.Sum).replace(/[^0-9]/gim, '')
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
          v-for="(guarantee, index) of fullProfile.Guarantee.RelatedPerson
            .items"
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
                :rules="[val => !!val || 'Выберите отношение к клиенту']"
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
                @input="$emit('guarantees-valid', 'RelatedPerson', index)"
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
                :rules="[val => !!val || 'Введите имя', val => fioValid(val)]"
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
                  val => (val && val.length === 10) || 'Введите дату рождения',
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
                          () => $refs.qDateBirthdayGuarantees[index].hide()
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
                  val => INNFizValid(val),
                  val =>
                    val != fullProfile.Customer.INN ||
                    'Данные заёмщика и поручителя не могут быть одинаковыми'
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
                  val => pinppValid(val),
                  val =>
                    val != fullProfile.Customer.PINPP ||
                    'Данные заёмщика и поручителя не могут быть одинаковыми'
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
                @input="setRefs"
                :options="dictionaries.DocumentType.items"
                dense
                label="Вид документа"
                emit-value
                map-options
                class="q-pb-sm"
                :rules="[val => !!val || 'Выберите вид документа']"
              />
            </div>

            <div v-if="guarantee.Document.documentType == 9" class="col-4">
              <q-input
                :disable="disableField"
                ref="guaranteesDocumentDocumentName"
                outlined
                v-model="guarantee.Document.DocumentName"
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
                ref="guaranteesDocumentSeries"
                outlined
                v-model="guarantee.Document.Series"
                dense
                label="Серия документа"
                mask="AA"
                :rules="[
                  val => (val && val.length === 2) || 'Введите Серию документа',
                  val =>
                    guarantee.Document.Series + guarantee.Document.Number !=
                      fullProfile.Customer.Document.Series +
                        fullProfile.Customer.Document.Number ||
                    'Данные заёмщика и поручителя не могут быть одинаковыми'
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
                  val => (val && val.length === 7) || 'Введите Номер документа',
                  val => docNumberValid(val),
                  val =>
                    guarantee.Document.Series + guarantee.Document.Number !=
                      fullProfile.Customer.Document.Series +
                        fullProfile.Customer.Document.Number ||
                    'Данные заёмщика и поручителя не могут быть одинаковыми'
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

                  val => msecond(val) < msecond(currentDate) || 'Неверная дата'
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
                            $refs.qDateGuaranteeDocumentGivenDate[index].hide();
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
                        msecond(val) > msecond(guarantee.Document.GivenDate) ||
                        'Неверная дата'
                    : null,
                  val => msecond(val) > msecond(currentDate) || 'Неверная дата'
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
                @input="setGivenPlaceGuarantee($event, index, 'RelatedPerson')"
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
                :rules="[val => !!val || 'Введите кем выдан документ (ИИБ)']"
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
                  val => !val.match(/(?=(.))\1{16,}/) || 'Неверные данные'
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
                :rules="[val => !!val || 'Введите наименование банка']"
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
                  val => !!val || 'Введите МФО банка',
                  val => val.match(/^[0-9]+$/) || 'Неверные данные'
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
                  val => !val.match(/(?=(.))\1{20,}/) || 'Неверные данные'
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
                ref="regionGuarantees1"
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
                ref="streetGuarantees1"
                outlined
                v-model="guarantee.Address.Street"
                dense
                label="Улица / Мкр."
                :rules="[val => !!val || 'Введите наименование улицы / мкр.']"
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
                  ref="phonesGuarantees1"
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
              v-if="phoneIndex > 0"
              label="Удалить"
              @click="
                $emit(
                  'confirm-delete-item',
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
              $emit(
                'confirm-delete-item',
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
          v-for="(guarantee, index) of fullProfile.Guarantee.RelatedLegalPerson
            .items"
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
                @input="$emit('guarantees-valid', 'RelatedLegalPerson', index)"
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
                :rules="[val => !!val || 'Введите имя', val => fioValid(val)]"
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
                  val => !val.match(/(?=(.))\1{16,}/) || 'Неверные данные'
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
                :rules="[val => !!val || 'Введите наименование банка']"
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
                  val => !!val || 'Введите МФО банка',
                  val => val.match(/^[0-9]+$/) || 'Неверные данные'
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
                  val => !val.match(/(?=(.))\1{20,}/) || 'Неверные данные'
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
                ref="regionGuarantees2"
                outlined
                v-model="guarantee.Address.Region"
                :options="dictionaries.Region.items"
                @input="
                  setDistrictsGuarantee($event, index, 'RelatedLegalPerson')
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
                ref="streetGuarantees2"
                outlined
                v-model="guarantee.Address.Street"
                dense
                label="Улица / Мкр."
                :rules="[val => !!val || 'Введите наименование улицы / мкр.']"
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
                  ref="phonesGuarantees2"
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
              v-if="phoneIndex > 0"
              label="Удалить"
              @click="
                $emit(
                  'confirm-delete-item',
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
            @click="addPhoneGuarantee({ item: 'RelatedLegalPerson', index })"
            class="addItem"
          ></q-btn>

          <q-btn
            :disable="disableField"
            label="Удалить"
            @click="
              $emit(
                'confirm-delete-item',
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
          v-for="(guarantee, index) of fullProfile.Guarantee.Insurance.items"
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
                @input="$emit('guarantees-valid', 'Insurance', index)"
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
            v-if="
              status === 'Step: Работа с документами' ||
                status === 'Step: Создание заявки в iABS'
            "
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

                  val => msecond(val) <= msecond(currentDate) || 'Неверная дата'
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
                            $refs.qDateGuaranteeContractGivenDate[index].hide();
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
                    msecond(val) >
                      msecond(currentDate).setMonth(
                        msecond(currentDate).getMonth() +
                          fullProfile.LoanInfo.TermInMonth
                      ) ||
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

            <!-- <div class="col-4">
              <q-input
                ref="guaranteesContractExpirationDate"
                outlined
                dense
                label="Дата истечения действия договора"
                v-model="guarantee.ExpDate"
                mask="##.##.####"
                :rules="[
                  (val) =>
                    (val && val.length === 10) ||
                    'Введите дату окончания действия документа',
                  guarantee.StartDate
                    ? (val) =>
                        msecond(val) > msecond(guarantee.StartDate) ||
                        'Неверная дата'
                    : null
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
                          ($event) => {
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
            </div> -->
          </div>

          <div class="row q-col-gutter-md">
            <!-- ref="sec_payment"
            :rules="[
                        (val) => !!val || 'Поле должно быть заполнено',
                        (val) => val != 0 || 'Некорректные данные',
                      ]" -->
            <div class="col-4">
              <q-input
                :disable="disableField"
                outlined
                v-model="guarantee.sec_payment"
                @input="formatNumberInsurence(index)"
                dense
                label="Страховой платёж"
              />
            </div>
          </div>

          <q-btn
            :disable="disableField"
            label="Удалить"
            @click="
              $emit(
                'confirm-delete-item',
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
</template>

<script>
import validations from "../../../mixins/validations";

import formatNumber from "../../../filters/format_number";

export default {
  mixins: [validations],
  props: [
    "fullProfile",
    "profile",
    "credits",
    "dictionaries",
    "status",
    "currentDate",
    "totalGuaranteesSum",
    "disableField"
  ],
  data() {
    return {
      guaranteeCount: []
    };
  },
  created() {
    const guarantees = this.fullProfile.Guarantee;

    for (let guarantee in guarantees) {
      for (let i of guarantees[guarantee].items) {
        this.guaranteeCount.push("guarantee");

        i.Sum = formatNumber(i.Sum);
      }
    }
    console.log("this.guaranteeCount", this.guaranteeCount);

    for (let insurence of this.fullProfile.Guarantee.Insurance.items) {
      insurence.sec_payment = formatNumber(insurence.sec_payment);
    }
  },

  mounted() {
    // console.log('refs', this.$refs)
    // setTimeout(() => {
    //   this.$emit("set-refs", this.$refs);
    // })

    this.$emit("set-refs", this.$refs);
  },

  methods: {
    formatNumberInsurence(idx) {
      this.fullProfile.Guarantee.Insurance.items[
        idx
      ].sec_payment = formatNumber(
        this.fullProfile.Guarantee.Insurance.items[idx].sec_payment
      );
    },

    addInsurance(guarantee) {
      this.guaranteeCount.push(guarantee);
      this.$store.commit("profile/addInsurance");
      setTimeout(() => {
        this.$emit("set-refs", this.$refs);
      });
    },

    addRelatedLegalPerson(guarantee) {
      this.guaranteeCount.push(guarantee);
      this.$store.commit("profile/addRelatedLegalPerson");
      setTimeout(() => {
        this.$emit("set-refs", this.$refs);
      });
    },

    addRelatedPerson(guarantee) {
      this.guaranteeCount.push(guarantee);
      this.$store.commit("profile/addRelatedPerson");
      setTimeout(() => {
        this.$emit("set-refs", this.$refs);
      });
    },

    addPhoneGuarantee(index) {
      this.$store.commit("profile/addPhoneGuarantee", index);
    },

    setRefs() {
      setTimeout(() => {
        this.$emit("set-refs", this.$refs);
      });
    },

    setGivenPlaceGuarantee(event, idx, guarantee) {
      //console.log('event', event, idx, guarantee)
      const districts = this.getDistricts(event);
      console.log("districts", districts);
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

    removeGuarantee(payload) {
      this.guaranteeCount.pop();
      this.$store.commit("profile/removeGuarantee", payload);
    },

    removePhoneGuarantee(payload) {
      this.$store.commit("profile/removePhoneGuarantee", payload);
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
    }
  }
};
</script>
