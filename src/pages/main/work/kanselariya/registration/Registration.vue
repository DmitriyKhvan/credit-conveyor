<template>
  <div class="row q-col-gutter-sm">
    <q-form class="col q-gutter-y-sm" @submit="sendNewDoc">
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
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import ApiService from "@/services/api.service";

export default {
  name: "kform",
  components: {},
  data() {
    return {
      file: [],
      form: {
        journal: null,
        region: null,
        in_number: null,
        number: false,
        in_date: null,
        date: false,
        whoIsSelect: null,
        whoIsText: null,
        out_number: null,
        out_date: null,
        format: null,
        listCount: null,
        description: null,
        signedby: null
      },
      fileUrl: null
    };
  },
  computed: {
    ...mapGetters({
      formats: "dicts/getFormat"
    }),
    ...mapGetters({
      journals: "dicts/getJournal"
    }),
    ...mapGetters({
      organs: "dicts/getOrgan"
    }),
    ...mapGetters({
      regions: "dicts/getRegion"
    })
  },
  methods: {
    sendNewDoc() {
      let formData = new FormData();
      formData.append("journal", this.form.journal);
      formData.append("region", this.form.region);
      formData.append("in_number", this.form.in_number);
      formData.append("in_date", this.form.in_date);
      formData.append("organ", this.form.whoIsSelect);
      formData.append("fio", this.form.whoIsText);
      formData.append("out_number", this.form.out_number);
      formData.append("out_date", this.form.out_date);
      formData.append("format", this.form.format);
      formData.append("paper_count", this.form.listCount);
      formData.append("description", this.form.description);
      formData.append("signed_by", this.form.signedby);
      formData.append("doc", this.file);

      console.log(formData);

      ApiService.post("/files/addDoc", formData)
        .then(
          response => {
            console.log(response);
            if (response.data.status === 1) {
              this.$q.notify({
                color: "green-8",
                textColor: "white",
                icon: "cloud_done",
                position: "top",
                message: "Ваш документ успешно сохранен"
              });
              this.resetForm();
            } else {
              this.$q.notify({
                color: "red-4",
                textColor: "white",
                icon: "cloud_done",
                message: response.data.message
              });
            }
          },
          error => {
            this.$q.notify({
              color: "red-4",
              textColor: "white",
              icon: "cloud_done",
              message: error
            });
          }
        )
        .catch(error => {
          console.log(error);

          this.$q.notify({
            color: "red-4",
            textColor: "white",
            icon: "cloud_done",
            message: error
          });
        });
    },
    resetForm() {
      (this.form.journal = null),
        (this.form.region = null),
        (this.form.in_number = null),
        (this.form.in_date = null),
        (this.form.whoIsSelect = null),
        (this.form.whoIsText = null),
        (this.form.out_number = null),
        (this.form.out_date = null),
        (this.form.format = null),
        (this.form.listCount = null),
        (this.form.description = null),
        (this.form.signedby = null),
        this.$refs.uploaderLink.removeQueuedFiles();
    },
    uploadFile(val) {
      this.file = val[0];
    },
    removeFile() {
      (this.file = []), (this.fileUrl = null);
    }
  },
  watch: {
    file: function() {
      //this.form.in_number = this.file.name.slice(0, -4);
      var now = new Date();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      this.form.in_date = now.getFullYear() + "-" + month + "-" + day;
      this.fileUrl = URL.createObjectURL(this.file);
    }
  }
};
</script>
<style lang="sass" scoped>
.my-content
  padding: 10px 15px
  background: rgba(86,61,124,.15)
  border: 1px solid rgba(86,61,124,.2)
</style>
