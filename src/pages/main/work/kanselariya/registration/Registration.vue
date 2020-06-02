<template>
  <div class="row justify-center q-col-gutter-sm regKanc q-pa-md">
    <div class="col-10">
      <div class="row">
        <div class="col-8">
          <q-form @submit="sendNewDoc" @reset="resetForm" ref="myform">
            <div class="row">
              <div class="col-12 q-pa-sm">
                <q-file
                  color="teal"
                  filled
                  v-model="file"
                  :label="$t('tables.work.choose_file')"
                  @input="uploadFile"
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" />
                  </template>
                  <template v-slot:append>
                    <q-btn
                      round
                      dense
                      flat
                      icon="close"
                      @click.stop="file = []"
                      class="cursor-pointer"
                    />
                  </template>
                </q-file>
              </div>
            </div>

            <div class="row">
              <div class="col-6 q-pa-sm">
                <q-select
                  v-model="form.journal"
                  :options="select.journals"
                  option-value="id"
                  option-label="name_short"
                  :label="$t('tables.work.journal')"
                  filled
                  bottom-slots
                  square
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[
                    val => (val && val.length !== null) || $t('tables.work.chancellery.choose_journal_err')
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="menu_book" @click.stop />
                  </template>
                  <template v-slot:append>
                    <q-icon name="close" @click.stop="form.journal = null" class="cursor-pointer" />
                  </template>
                </q-select>
              </div>

              <div class="col-6 q-pa-sm">
                <q-select
                  v-model="form.region"
                  :options="select.regions"
                  option-value="id"
                  option-label="name_short"
                  :label="$t('tables.work.chancellery.regions')"
                  filled
                  bottom-slots
                  emit-value
                  map-options
                >
                  <template v-slot:prepend>
                    <q-icon name="public" @click.stop />
                  </template>
                  <template v-slot:append>
                    <q-icon name="close" @click.stop="form.region = null" class="cursor-pointer" />
                  </template>
                </q-select>
              </div>
            </div>

            <div class="row">
              <div class="col-6 q-pr-sm q-pa-sm">
                <q-input
                  disable
                  outlined
                  v-model="form.in_number"
                  :label="$t('tables.work.chancellery.inc_number')"
                />
              </div>

              <div class="col-6 q-pl-sm q-pa-sm">
                <q-input
                  outlined
                  v-model="form.in_date"
                  :placeholder="$t('tables.work.chancellery.inc_date')"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy1"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          mask="YYYY-MM-DD"
                          v-model="form.in_date"
                          @input="() => $refs.qDateProxy1.hide()"
                          today-btn
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row">
              <div class="col-6 q-pr-sm q-pa-sm">
                <q-select
                  v-model="form.organs"
                  :options="select.organs"
                  option-value="id"
                  option-label="name_short"
                  :label="$t('tables.work.chancellery.choose_organization')"
                  filled
                  bottom-slots
                  emit-value
                  map-options
                  :rules="[
                    val =>
                      (val && val.length !== null) || $t('tables.work.chancellery.choose_organization_err')
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="list" @click.stop />
                  </template>
                  <template v-slot:append>
                    <q-icon name="close" @click.stop="form.organs = null" class="cursor-pointer" />
                  </template>
                </q-select>
              </div>

              <div class="col-6 q-pl-sm q-pa-sm">
                <q-input
                  outlined
                  v-model="form.whoIsText"
                  :label="$t('tables.work.chancellery.write_from')"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-6 q-pr-sm q-pa-sm checkInput">
                <div class="checkBlock">
                  <q-checkbox v-model="form.number" />
                </div>
                <div style="width:100%">
                  <q-input
                    :disable="form.number"
                    outlined
                    square
                    v-model="form.out_number"
                    :placeholder="[form.number ? $t('tables.work.chancellery.without_number') : $t('tables.work.chancellery.out_number')]"
                  />
                </div>
              </div>

              <div class="col-6 q-pl-sm q-pa-sm checkInput">
                <div class="checkBlock">
                  <q-checkbox v-model="form.date" />
                </div>
                <div style="width:100%">
                  <q-input
                    :disable="form.date"
                    outlined
                    square
                    v-model="form.out_date"
                    :placeholder="[form.date ? $t('tables.work.chancellery.without_date') : $t('tables.work.chancellery.out_date')]"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            mask="YYYY-MM-DD"
                            v-model="form.out_date"
                            @input="() => $refs.qDateProxy.hide()"
                            today-btn
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-6 q-pr-sm q-pa-sm">
                <q-select
                  v-model="form.format"
                  :options="select.formats"
                  option-value="id"
                  option-label="name_short"
                  filled
                  bottom-slots
                  emit-value
                  map-options
                  :label="$t('tables.work.chancellery.format')"
                >
                  <template v-slot:prepend>
                    <q-icon name="dashboard" @click.stop />
                  </template>
                  <template v-slot:append>
                    <q-icon name="close" @click.stop="form.format = null" class="cursor-pointer" />
                  </template>
                </q-select>
              </div>

              <div class="col-6 q-pl-sm q-pa-sm">
                <q-input
                  v-model="form.listCount"
                  :label="$t('tables.work.chancellery.page_amount')"
                  outlined
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length !== null) || $t('tables.work.chancellery.page_amount_err')
                  ]"
                />
              </div>
            </div>

            <div class="row">
              <div class="col q-pa-sm">
                <q-input
                  v-model="form.description"
                  outlined
                  type="textarea"
                  :label="$t('tables.work.content')"
                  lazy-rules
                  :rules="[
                  val => (val && val.length >= 10) || $t('tables.work.content_err')
                ]"
                />
              </div>
            </div>

            <div class="row">
              <div class="col q-pa-sm">
                <q-input
                  outlined
                  v-model="form.signedby"
                  :label="$t('tables.work.chancellery.who_signed')"
                />
              </div>
            </div>

            <div class="row">
              <div class="col text-center q-pa-sm">
                <q-btn
                  color="white"
                  text-color="black"
                  :label="$t('actions.clear')"
                  type="reset"
                  class="q-mr-sm"
                />
                <q-btn color="primary" :label="$t('actions.save')" type="submit" />
              </div>
            </div>
          </q-form>
        </div>

        <div class="col-4 q-pa-sm">
          <div class="rightBlock q-pa-md text-center" @click="newFile()">
            <img src="@/assets/file.png" alt />
            <br />
            {{$t('tables.work.chancellery.review_file')}}
          </div>
          <div>
            <br />
            <span>{{$t('tables.work.chancellery.results.FILE')}} === {{ file.name }}</span>
            <br />
            <span>{{$t('tables.work.chancellery.results.JOURNAL')}} === {{ form.journal }}</span>
            <br />
            <span>{{$t('tables.work.chancellery.results.REGION')}} === {{ form.region }}</span>
            <br />
            <span>{{$t('tables.work.chancellery.results.IN_NUMBER')}} === {{ form.in_number }}</span>
            <br />
            <span>{{$t('tables.work.chancellery.results.IN_DATE')}} === {{ form.in_date }}</span>
            <br />
            <span>{{$t('tables.work.chancellery.results.ORGAN')}} === {{ form.organs }}</span>
            <br />
            <span>{{$t('tables.work.chancellery.results.WHO_SEND')}} === {{ form.whoIsText }}</span>
            <br />
            <span>{{$t('tables.work.chancellery.results.OUT_NUMBER')}} === {{ form.out_number }}</span>
            <br />
            <span>{{$t('tables.work.chancellery.results.OUT_DATE')}} === {{ form.out_date }}</span>
            <br />
            <span>{{$t('tables.work.chancellery.results.FORMAT')}} === {{ form.format }}</span>
            <br />
            <span>{{$t('tables.work.chancellery.results.PAGE_AMOUNT')}} === {{ form.listCount }}</span>
            <br />
            <span>{{$t('tables.work.chancellery.results.CONTENT')}} === {{ form.description }}</span>
            <br />
            <span>{{$t('tables.work.chancellery.results.WHO_SIGNED')}} === {{ form.signedby }}</span>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "@/services/api.service";
import { QSpinnerFacebook } from "quasar";
export default {
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
        organs: null,
        whoIsText: null,
        out_number: null,
        out_date: null,
        format: null,
        listCount: null,
        description: null,
        signedby: null
      },

      select: {
        formats: null,
        journals: null,
        regions: null,
        organs: null
      }
    };
  },
  methods: {
    uploadFile(val) {
      console.log(val);
      this.file = val;
      this.form.in_number = val.name.slice(0, -4);
      console.log(this.form.in_number);
    },

    sendNewDoc() {
      this.$q.loading.show({
        spinner: QSpinnerFacebook
      });

      let formData = new FormData();
      formData.append("journal", this.form.journal);
      formData.append("region", this.form.region);
      formData.append("in_number", this.form.in_number);
      formData.append("in_date", this.form.in_date);
      formData.append("organ", this.form.organs);
      formData.append("fio", this.form.whoIsText);
      formData.append("out_number", this.form.out_number);
      formData.append("out_date", this.form.out_date);
      formData.append("format", this.form.format);
      formData.append("paper_count", this.form.listCount);
      formData.append("description", this.form.description);
      formData.append("signed_by", this.form.signedby);
      formData.append("doc", this.file);
      formData.append("status", "1");

      console.log(formData);

      ApiService.post("/files/addDoc", formData)
        .then(response => {
          console.log(response);
          if (response.data.status === 1) {
            this.$q.notify({
              color: "green-8",
              textColor: "white",
              icon: "cloud_done",
              position: "top",
              message: "Ваш документ успешно сохранен"
            });
            this.$refs.myform.reset();
          } else {
            this.$q.notify({
              color: "red-4",
              textColor: "white",
              icon: "cloud_done",
              message: response.data.message
            });
          }
          this.$q.loading.hide();
        })
        .catch(error => {
          this.$q.notify({
            color: "red-4",
            textColor: "white",
            icon: "cloud_done",
            message: error
          });
          this.$q.loading.hide();
        });
    },

    resetForm() {
      (this.file = []),
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
        (this.form.signedby = null);
    },

    notifyRules(val) {
      this.$q.notify({
        color: "red-4",
        textColor: "white",
        icon: "cloud_done",
        message: val
      });
    },
    newFile() {
      let blob = new Blob([this.file], { type: "application/pdf" });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = this.form.in_number;
      link.click();
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
    }
  },
  beforeCreate: function() {
    ApiService.get("dicts/formats")
      .then(res => {
        this.select.formats = res.data;
      })
      .catch(err => {
        console.log(err);
      });

    ApiService.get("dicts/journals")
      .then(res => {
        this.select.journals = res.data;
      })
      .catch(err => {
        console.log(err);
      });

    ApiService.get("dicts/regions")
      .then(res => {
        this.select.regions = res.data;
      })
      .catch(err => {
        console.log(err);
      });

    ApiService.get("dicts/organs")
      .then(res => {
        this.select.organs = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="scss" scoped>
.my-content {
  padding: 10px 15px;
  background: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);
}
.checkInput {
  display: flex;
  align-items: center;
}
.checkBlock {
  padding: 7px;
  background: #f2f2f2;
  border: 1px #c2c2c2 solid;
}
.rightBlock {
  background: #f2f2f2;
  cursor: pointer;
}
</style>

<style lang="stylus">
.regKanc .q-field--with-bottom {
  padding-bottom: 0;
}
</style>
