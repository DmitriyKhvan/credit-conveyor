<template>
  <!-- Contacts info -->
  <div class="contactData">
    <h4 class="tab-title" ref="contactData" @click="toggleForm('contactData')">
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
                    (val) =>
                      (val && val.length === 13) || 'Введите номер телефона',
                    (val) => phoneValid(val),
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
</template>