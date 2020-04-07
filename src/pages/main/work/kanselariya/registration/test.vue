
    <!-- <q-form class="col q-gutter-y-sm" @submit="sendNewDoc">
      <q-uploader
        style="width: 100%"
        @added="uploadFile"
        @removed="removeFile"
        :hide-upload-btn="true"
        :auto-upload="false"
        accept=".pdf"
        square
        bordered
        flat
        ref="uploaderLink"
        label="Выберите файл"
      />
      <div class="row q-col-gutter-x-sm">
        <div class="col">
          <q-select
            v-model="form.journal"
            :options="journals"
            option-value="id"
            option-label="name_short"
            square
            outlined
            emit-value
            map-options
            label="Журнал"
            dense
            :rules="[
              val => (val && val.length !== null) || 'Пожалуста выберите журнал'
            ]"
          />
        </div>
        <div class="col">
          <q-select
            v-model="form.region"
            :options="regions"
            option-value="id"
            option-label="name_short"
            square
            outlined
            emit-value
            map-options
            label="Регионы"
            dense
          />
        </div>
      </div>
      <div class="row q-col-gutter-x-sm">
        <div class="col">
          <q-input square outlined v-model="form.in_number" placeholder="Вх. Номер" dense />
        </div>
        <div class="col">
          <q-input outlined dense square v-model="form.in_date" placeholder="Вх. Дата">
            <template v-slot:append>
              <q-icon name="o_event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy1">
                  <q-date
                    v-model="form.in_date"
                    today-btn
                    @input="() => $refs.qDateProxy1.hide()"
                    mask="YYYY-MM-DD"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="row q-col-gutter-x-sm">
        <div class="col">
          <q-select
            v-model="form.whoIsSelect"
            :options="organs"
            option-value="id"
            option-label="name_short"
            square
            outlined
            emit-value
            map-options
            label="Выбрать организацию"
            dense
            :rules="[
              val =>
                (val && val.length !== null) || 'Укажите пожалуста организацию'
            ]"
          />
        </div>
        <div class="col">
          <q-input square outlined v-model="form.whoIsText" placeholder="Написать откуда" dense />
        </div>
      </div>
      <div class="row q-col-gutter-x-sm">
        <div class="col">
          <div class="row">
            <div class="col-10">
              <q-input
                square
                outlined
                v-model="form.out_number"
                :placeholder="[form.number ? 'Без номер' : 'Исх. Номер']"
                :disable="form.number"
                dense
              />
            </div>
            <div class="col-2">
              <q-checkbox v-model="form.number" />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row">
            <div class="col-10">
              <q-input
                outlined
                dense
                square
                v-model="form.out_date"
                :placeholder="[form.date ? 'Без даты' : 'Исх. Дата']"
                :disable="form.date"
              >
                <template v-slot:append>
                  <q-icon name="o_event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy">
                      <q-date
                        v-model="form.out_date"
                        today-btn
                        @input="() => $refs.qDateProxy.hide()"
                        mask="YYYY-MM-DD"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-2">
              <q-checkbox v-model="form.date" />
            </div>
          </div>
        </div>
      </div>
      <div class="row q-col-gutter-x-sm">
        <div class="col">
          <q-select
            v-model="form.format"
            :options="formats"
            option-value="id"
            option-label="name_short"
            square
            outlined
            emit-value
            map-options
            label="Формат"
            dense
          />
        </div>
        <div class="col">
          <q-input
            square
            outlined
            v-model="form.listCount"
            placeholder="Кол. лист"
            dense
            :rules="[
              val =>
                (val && val.length !== null) || 'Пожалуста укажите кол. листов'
            ]"
          />
        </div>
      </div>
      <div class="col">
        <q-input
          v-model="form.description"
          outlined
          square
          dense
          type="textarea"
          placeholder="Содержание"
          :rules="[
            val => (val && val.length >= 10) || 'Пожалуста укажите содержание'
          ]"
        />
      </div>
      <div class="col">
        <q-input square outlined v-model="form.signedby" placeholder="Кто подписаль" dense />
      </div>
      <div class="row q-col-gutter-x-sm">
        <div class="col">
          <q-btn color="red" class="full-width" @click="resetForm()" label="Сбросить" />
        </div>
        <div class="col">
          <q-btn color="primary" class="full-width" type="submit" label="Отправить" />
        </div>
      </div>
    </q-form>
    <div class="col q-gutter-y-sm">
      <iframe v-if="fileUrl" :src="fileUrl" width="100%" height="100%" frameborder="yes" />
      <div v-else>
        <div>
          <span>Здес будет показано ваш документ</span>
        </div>
      </div>
    </div> -->