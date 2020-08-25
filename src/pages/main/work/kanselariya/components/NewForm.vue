<template>
  <div class="row q-ma-sm">
    <div class="col-7 shadow-1 bg-white q-mr-lg rounded-borders">
      <q-form @submit="sendNewDoc" @reset="resetForm" ref="myform">
        <div class="q-pa-lg">
          <div class="row q-col-gutter-md">
            <div class="col title q-pb-lg">
              <strong>Регистрация канцелярии</strong>
            </div>
          </div>
          <div class="row q-col-gutter-xl">
            <div class="col">
              <q-select
                outlined
                v-model="form.journal"
                :options="journals"
                label="Журнал"
                option-value="value"
                option-label="label"
                lazy-rules
                :rules="[
                  val => (val && val.length !== null) || 'Выберите журнал'
                ]"
              />
            </div>
            <div class="col">
              <q-select
                outlined
                v-model="form.region"
                :options="regions"
                label="Выбрать регион"
                option-value="value"
                option-label="label"
              >
                <template v-slot:append>
                  <q-icon color="grey-4" name="place" />
                </template>
              </q-select>
            </div>
          </div>
          <div class="row q-pb-xs">
            <div class="col q-pr-lg q-mr-lg">
              <q-select
                outlined
                v-model="form.organs"
                :options="organs"
                label="Выберите организацию"
                option-value="value"
                option-label="label"
                lazy-rules
                :rules="[
                  val => (val && val.length !== null) || 'Выберите организацию'
                ]"
              />
            </div>
            <div class="col">
              <q-input outlined v-model="form.whoIsText" label="Написать откуда" />
            </div>
          </div>
          <div class="row q-col-gutter-xl q-pb-lg" v-if="file == null">
            <div class="col">
              <q-file
                filled
                dark
                v-model="file"
                label="Загрузить файл"
                @input="uploadFile"
                ref="inputUpload"
                bg-color="blue-14"
                label-color="white"
                :filter="
                  files => files.filter(file => {if(!!file){return file.type === 'application/pdf'} else return false})
                "
                :rules="[
                  val => (val && val.length !== null) || 'Загрузите файл'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" color="white" />
                </template>
              </q-file>
            </div>
            <div class="col">
              <q-btn push flat color="grey" label="Посмотреть файл" size="lg" @click="newFile" />
            </div>
          </div>
          <div class="q-my-sm full-width" v-else>
            <div class="row q-my-md items-center">
              <q-icon size="20px" name="attach_file" class="rotate-180 text-bold" />
              <strong class="col text-no-wrap">Прикрепленные файлы</strong>
              <q-file
                dense
                filled
                rounded
                class="col-3"
                v-model="file"
                label="Загрузить"
                @input="uploadFile"
                ref="inputUpload"
                bg-color="blue-14"
                label-color="white"
                clear-icon
                display-value
                :filter="
                  files => files.filter(file => {if(!!file){return file.type === 'application/pdf'} else return false})
                "
                :rules="[
                  val => (val && val.length !== null) || 'Загрузите файл'
                ]"
              ></q-file>
            </div>
            <div class="row q-pb-lg full-width text-grey">
              <q-list class="col">
                <q-item class="q-mb-sm rounded-borders" style="border: 1px solid #e7e7e7;" dense>
                  <q-item-section avatar>
                    <q-icon name="description" />
                  </q-item-section>
                  <q-item-section
                    class="text-no-wrap overflow-hidden"
                    style="overflow:hidden; text-no-wrap overflow-hidden"
                  >{{ file ? file["name"] : "invalid file format" }}</q-item-section>
                  <q-btn @click="newFile" flat color="grey" icon="get_app" side />
                  <q-btn @click="file = null" flat color="grey" icon="clear" side />
                </q-item>
              </q-list>
            </div>
          </div>
          <div class="row q-pb-lg">
            <div class="col q-pr-lg q-mr-lg">
              <q-input outlined v-model="form.in_number" label="Вх. номер" />
            </div>
            <div class="col">
              <q-input outlined v-model="form.in_date" label="Вх. дата">
                <template v-slot:append>
                  <div class="cursor-pointer">
                    <img src="@/assets/icons/InDate.svg" />
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date
                        v-model="form.in_date"
                        mask="YYYY-MM-DD"
                        @input="() => $refs.qDateProxy.hide()"
                      />
                    </q-popup-proxy>
                  </div>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-col-gutter-xl q-pb-lg">
            <div class="col">
              <div class="row selectBorder items-center">
                <div class="q-pl-sm">
                  <q-checkbox color="blue-14" @input="form.out_number = null" v-model="valNumber" />
                </div>
                <div class="col">
                  <q-input
                    borderless
                    v-model="form.out_number"
                    label="Исх. номер"
                    :disable="valNumber == true"
                  />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="row items-center selectBorder">
                <div class="q-pl-sm">
                  <q-checkbox color="blue-14" @input="form.out_date = null" v-model="valDate" />
                </div>
                <div class="col q-pr-md">
                  <q-input
                    borderless
                    v-model="form.out_date"
                    label="Исх. дата"
                    :disable="valDate === true"
                  >
                    <template v-slot:append>
                      <div class="cursor-pointer">
                        <img src="@/assets/icons/OutDate.svg" />
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="form.out_date"
                            mask="YYYY-MM-DD"
                            @input="() => $refs.qDateProxy.hide()"
                          />
                        </q-popup-proxy>
                      </div>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
          </div>
          <div class="row q-pb-xs">
            <div class="col q-pr-lg q-mr-lg">
              <q-select
                outlined
                v-model="form.format"
                :options="formats"
                label="Формат"
                option-value="value"
                option-label="label"
              />
            </div>
            <div class="col">
              <q-input
                outlined
                v-model="form.listCount"
                label="Кол. лист"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length !== null) ||
                    'Кол. дистов обязательное поле'
                ]"
              />
            </div>
          </div>
          <div class="row q-pb-xs">
            <div class="col">
              <q-input
                v-model="form.description"
                outlined
                type="textarea"
                label="Содержание"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length !== null) ||
                    'Содержание обязательное поле'
                ]"
              />
            </div>
          </div>
          <div class="row q-col-gutter-xl q-pb-lg">
            <div class="col">
              <q-input outlined v-model="form.signedby" label="Кто подписал" />
            </div>
          </div>
          <div class="row q-col-gutter-xl q-pb-lg">
            <div class="col">
              <q-btn
                type="reset"
                push
                class="full-width"
                outline
                style="color: #787E8C;"
                label="Очистить все"
                size="lg"
              />
            </div>
            <div class="col">
              <q-btn
                type="submit"
                push
                class="full-width"
                color="blue-14"
                label="Зарегистрировать"
                size="lg"
              />
            </div>
          </div>
        </div>
      </q-form>
    </div>
    <div class="col shadow-1 bg-white rounded-borders">
      <a-preview :form="form" :file="file ? file.name : ''"></a-preview>
    </div>
  </div>
</template>
<script>
import { QSpinnerFacebook } from "quasar";
import ApiService from "@/services/api.service";
import Preview from "./Preview";
import { mapGetters } from "vuex";

export default {
  components: {
    APreview: Preview,
  },
  data() {
    return {
      valDate: false,
      valNumber: false,
      model: "",
      options: [],
      text: "",

      file: null,
      form: {
        journal: null,
        region: null,
        in_number: null,
        number: null,
        in_date: null,
        date: null,
        organs: null,
        whoIsText: null,
        out_number: null,
        out_date: null,
        format: null,
        listCount: null,
        description: null,
        signedby: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      formats: "dicts/getFormat",
      journals: "dicts/getJournal",
      regions: "dicts/getRegion",
      organs: "dicts/getOrgan",
    }),
  },
  created() {
    console.log({
      formats: this.formats,
      journals: this.journals,
      regions: this.regions,
      organs: this.organs,
    });
  },
  methods: {
    triggerUpload() {
      this.$refs.inputUpload.click();
    },
    uploadFile(val) {
      //console.log(val);
      this.file = val;
      this.form.in_number = val.name.slice(0, -4);
      //console.log(this.form.file);
    },

    sendNewDoc() {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
      });

      let formData = new FormData();
      formData.append("doc", this.file);
      formData.append("file_id", null);
      formData.append("id", null);
      formData.append("journal", this.form.journal.value);
      formData.append("region", this.form.region.value);
      formData.append("organ", this.form.organs.value);
      formData.append("format", this.form.format.value);
      formData.append("paper_count", this.form.listCount);
      //formData.append("type", "1"); // by default 1
      formData.append("out_number", this.form.out_number);
      formData.append("out_date", this.form.out_date);
      formData.append("in_number", this.form.in_number);
      formData.append("in_date", this.form.in_date);
      formData.append("fio", this.form.whoIsText);
      formData.append("description", this.form.description);
      formData.append("signed_by", this.form.signedby);

      this.$axios
        .post("/files/doc", formData)
        .then((response) => {
          console.log(response);
          if (response.data.status === 1) {
            this.$q.notify({
              color: "green-8",
              textColor: "white",
              icon: "cloud_done",
              position: "top",
              message: "Ваш документ успешно сохранен",
            });
            this.$refs.myform.reset();
          } else {
            this.$q.notify({
              color: "red-4",
              textColor: "white",
              icon: "cloud_done",
              message: response.data.message,
            });
          }
          this.$q.loading.hide();
        })
        .catch((error) => {
          console.log(error);
          this.$q.notify({
            color: "red-4",
            textColor: "white",
            icon: "cloud_done",
            message: error,
          });
          this.$q.loading.hide();
        });
    },

    resetForm() {
      (this.file = null),
        (this.form.journal = null),
        (this.form.region = null),
        (this.form.in_number = null),
        (this.form.in_date = null),
        (this.form.organs = null),
        (this.form.whoIsText = null),
        (this.form.out_number = null),
        (this.form.out_date = null),
        (this.form.format = null),
        (this.form.listCount = null),
        (this.form.description = null),
        (this.form.signedby = null),
        (this.valNumber = false),
        (this.valDate = false);
    },

    notifyRules(val) {
      this.$q.notify({
        color: "red-4",
        textColor: "white",
        icon: "cloud_done",
        message: val,
      });
    },
    newFile() {
      if (this.file) {
        let blob = new Blob([this.file], { type: "application/pdf" });
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = this.file.name;
        link.click();
      }
    },
  },
  watch: {
    file: function () {
      //this.form.in_number = this.file.name.slice(0, -4);
      var now = new Date();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      this.form.in_date = now.getFullYear() + "-" + month + "-" + day;
    },
  },
};
</script>
<style scoped>
.title {
  font-size: 15px;
}
.selectBorder {
  border: 1px #c2c2c2 solid;
  border-radius: 5px;
}
</style>
<style>
.q-field__control {
  border-radius: 5px !important;
}
</style>
