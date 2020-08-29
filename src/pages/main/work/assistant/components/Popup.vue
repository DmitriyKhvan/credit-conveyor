<template>
  <div>
    <q-dialog
      ref="dialog"
      @hide="onDialogHide"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="cardBlock OpenSans q-pa-md" style="width: 820px; max-width: 80vw; background: #f9f9f9">
        <!-- <q-card-section>
          <div class="row justify-between">
            <strong>{{ formatString(doc.description) }}</strong>
            <q-space />
            <q-btn flat :icon="'clear'" @click="onCancelClick"></q-btn>
          </div>
        </q-card-section> -->
        <q-card-section>
          <div class="row">
            <div class="col title">
              <div class="row q-pb-md">
                <div class="col">
                  <strong>{{ doc.description }}</strong>
                </div>
              </div>
              <div class="col column">
                <div class="row">
                  <span class="text-grey-6" style="min-width: 100px; font-size: 14px;">Организация:&nbsp;</span>
                  <i style="font-size: 14px;">{{doc.organ ? doc.organ : 'неизвестный'}}</i>
                </div>
                <div class="row">
                  <span class="text-grey-6" style="min-width: 100px; font-size: 14px;">Откуда:&nbsp;</span>
                  <i style="font-size: 14px;">{{ doc.signed_by ? doc.signed_by : 'неизвестный'}}</i>
                </div>
              </div>
              <div class="row q-py-md desp">
                <div class="col">
                  <div class="row justify-center files">
                    <div class="col-5">
                      <div>Документ № {{ doc.doc_id }}</div>
                    </div>
                    <div class="col flexBlock cursor-pointer" @click="download">
                      <div class="pad-2">
                        <img src="@/assets/icons/Download-Cloud.svg" />
                      </div>
                      <div class="q-px-sm">Скачать</div>
                    </div>
                    <div class="col flexBlock">
                      <div class="pad-3">
                        <img src="@/assets/icons/Print.svg" />
                      </div>
                      <div class="q-px-sm">Печать</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-md desp">
                <div class="col">
                  <div class="row">

                    <div class="col flexBlock">
                      <div class="self-center">
                        <img src="@/assets/icons/Enter-1.svg" />
                      </div>
                      <div class="q-px-sm lineH">
                        <b>Исходящий номер:</b>
                        <br />
                        {{ doc.out_number }}
                      </div>
                    </div>

                    <div class="col flexBlock">
                      <div class="self-center">
                        <img src="@/assets/icons/Calendar.svg" />
                      </div>
                      <div class="q-px-sm lineH">
                        <b>Входящий дата:</b>
                        <br />
                        {{ dateFormat(doc.in_date) }}
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>

              <div class="row q-py-xs desp">
                <div class="col">
                  <div class="row">

                    <div class="col flexBlock">
                      <div class="self-center">
                        <img src="@/assets/icons/Enter.svg" />
                      </div>
                      <div class="q-px-sm lineH">
                        <b>Входящий номер:</b>
                        <br />
                        {{ doc.in_number }}
                      </div>
                    </div>

                    <div class="col flexBlock">
                      <div class="self-center">
                        <img src="@/assets/icons/Calendar.svg" />
                      </div>
                      <div class="q-px-sm lineH">
                        <b>Исходящий дата:</b>
                        <br />
                        {{ doc.out_date }}
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>

              <div class="row items-center q-py-md desp">
                <div>
                  <div v-if="signed">Подписан</div>
                  <div v-else>Не подписан</div>
                </div>
                <div>
                  <q-toggle v-model="signed" color="amber-4" size="74px" @input="changeVal" />
                </div>
                <div class="col"></div>
              </div>
            </div>
            <div class="col-6 q-pl-md rightBlock">
              <div class="row">
                <div class="col q-pb-xs">Добавить исполнителя</div>
              </div>
              <div class="row">
                <div class="col q-pb-md">
                  <q-input  borderless dense v-model="searchUser" 
                            style="border: .5px solid #e1e1e1; border-radius: 4px; background: #fff;" 
                            class="q-px-sm"
                            label="Исполнитель" 
                            @input="selUsers">
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="row" v-if="result.length !== 0">
                <div class="col q-pb-md q-pt-sm q-px-md q-mb-sm users">
                  <div v-for="u in result" :key="u.EMP_ID" @click="selectedUser(u)">
                    <span>
                      {{ decode(u.LAST_NAME) }} {{ decode(u.FIRST_NAME[0]) }}.
                      {{ decode(u.MIDDLE_NAME[0]) }}.
                    </span>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col q-pb-xs">Выберите главного исполнителя</div>
              </div>

              <div class="row">
                <div v-if="workers.length !== 0" class="col q-mb-md q-pb-md q-pt-xs q-px-sm users">
                  <div
                    v-for="u in workers"
                    :key="u.EMP_ID"
                    :class="activeWorker === u.EMP_ID ? 'active' : ''"
                  >
                    <span @click="selectActiveWorker(u.EMP_ID)">
                      {{ decode(u.LAST_NAME) }} {{ decode(u.FIRST_NAME[0]) }}.
                      {{ decode(u.MIDDLE_NAME[0]) }}.
                    </span>
                    <q-icon name="close" size="xs" class="icon_btn" @click="removeUser(u.EMP_ID)" />
                  </div>
                </div>
                <div v-else class="col q-mb-md q-pb-md q-pt-xs q-px-sm users">
                  <p class="text-grey-7 q-pt-sm">Главный исполнитель</p>
                </div>
              </div>

              <div class="row">
                <div class="col q-pb-xs q-pt-xs">Выберите руководителя</div>
              </div>
              <div class="row">
                <div class="col q-mb-md bg-white">
                  <q-select
                    borderless
                    dense
                    v-model="superior"
                    :options="superiorsList"
                    label="Руководитель"
                    class="rounded-borders q-px-sm"
                    style="border: 0.5px solid #e1e1e1"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col q-pb-xs">Выберите шаблон</div>
              </div>
              <div class="row">
                <div class="col q-mb-md bg-white">
                  <q-select borderless v-model="shablon" :options="shablons"
                            dense 
                            label="Шаблон" 
                            class="rounded-borders q-px-sm"
                            style="border: 0.5px solid #e1e1e1" />
                </div>
              </div>
            </div>
          </div>

          <div class="row q-pt-lg">
            <div class="col text-center">
              <q-btn
                color="blue-14"
                label="Отправить"
                size="lg"
                class="q-mr-lg"
                @click="saveForm"
                :disable="$v.$invalid"
              />
              <q-btn color="white" text-color="black" label="Отменить" size="lg" @click="hide" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import NotifyService from "@/services/notify.service";
import { required, minLength } from "vuelidate/lib/validators";
import { formatFileSize, downloadFile, getMimeType } from "@/shared/utils/file";
import CommonUtils from "@/shared/utils/CommonUtils";
import { stringTruncate } from "@/shared/utils/common";

export default {
  props: {
    doc: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      shablon: "",
      superior: "",
      searchUser: "",
      result: [],
      workers: [],
      activeWorker: "",
      signed: false, // podpisan
    };
  },
  validations: {
    shablon: {
      required,
    },
    superior: {
      required,
    },
    workers: {
      required,
    },
    activeWorker: {
      required,
    },
  },
  created() {
    // set signed button
    if (this.doc.start_emps_id !== null && this.doc.doc_status === 3) {
      this.signed = true;
    }
    if (this.doc.start_emps_id) {
      let headEmp = this.doc.start_emps_id.find((el) => el.CHECK == true);
      this.activeWorker = headEmp.EMP_ID;
    }

    // init task message in shablon
    if (this.doc.task_message) {
      let shablonObj = this.dicts(6).values.find(
        (el) => el.id == this.doc.task_message
      );
      this.shablon = { label: shablonObj.name[1], value: shablonObj.id }; // TODO lang
    }
    // init option of superior
    if (this.doc.superior) {
      this.superior = {
        label: this.doc.superior.name,
        value: this.doc.superior.emp_id,
        dep_code: this.doc.superior.dep_code,
      };
    }
    // initial values of emp ids
    if (this.doc.start_emps_id !== null) {
      this.workers = this.doc.start_emps_id;
    }
    // this.$store.dispatch('getAUser')
  },
  computed: {
    ...mapState({
      superiorsList: (state) => state.assistant.aSuperiors,
    }),
    ...mapGetters({
      dicts: "dicts/getDictsList", // loads all dicts
    }),
    shablons() {
      return this.dicts(6).values.map((el) => {
        return {
          label: el.name[1], // TODO add lang val
          value: el.id,
        };
      });
    },
  },
  methods: {
    decode(param) {
      return CommonUtils.decoder(param);
    },
    saveForm() {
      const arr = [];
      this.workers.forEach((user) => {
        arr.push({
          emp_id: user.EMP_ID,
          check: user.EMP_ID === this.activeWorker ? true : false,
          dep_code: user.DEP_CODE,
        });
      });

      const obg = {
        doc_id: [this.doc.doc_id],
        data: arr,
        h_emp_id: this.superior.value,
        h_dep_code: this.superior.dep_code,
        type: 1,
        message: this.shablon.value,
        status: this.signed === true ? 3 : 2,
      };
      //console.log({ obg });

      this.$axios
        .post("/tasks/pomoshnik", obg)
        .then(
          (response) => {
            this.$emit("ok", response.data); //
            if (response.data.status == 1) {
              NotifyService.showSuccessMessage(response.data.message);
              this.hide();
            } else {
              NotifyService.showErrorMessage(response.data.message);
              this.hide();
            }
          },
          (error) => {
            //console.log({ error: error.response.data });
            NotifyService.showErrorMessage(error.response.data.message);
          }
        )
        .catch((error) => {
          //console.log({ error: error.response.data });
          NotifyService.showErrorMessage(error.response.data.message);
          //this.hide();
        });
    },
    selectActiveWorker(id) {
      this.activeWorker = id;
    },
    removeUser(id) {
      this.workers = this.workers.filter((user) => user.EMP_ID !== id);
      if (this.activeWorker === id) this.activeWorker = "";
    },
    selectedUser(user) {
      this.workers.push(user);
      this.searchUser = "";
      this.result = [];
    },
    selUsers() {
      if (this.searchUser === "") {
        this.result = [];
      }
      if (this.searchUser !== "") {
        this.$axios
          .get("/emps/search?name=" + this.searchUser)
          .then((response) => {
            this.result = response.data;
          })
          .catch((error) => {
            console.log("error");
          });
      }
    },
    changeVal() {
      console.log(this.signed);
    },
    dateFormat(dateNum) {
      let d = new Date(dateNum);
      return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
    },
    fileSize(size) {
      return formatFileSize(size);
    },
    download() {
      let extention = getMimeType(this.doc.file.extension);
      downloadFile(this.doc.file.id, this.doc.file.name, extention);
    },
    formatString(text) {
      return stringTruncate(text, 60);
    },
    // !!! Don't change
    show() {
      this.$refs.dialog.show();
    },

    // !!! Don't change
    hide() {
      this.$refs.dialog.hide();
    },

    // !!! Don't change
    onDialogHide() {
      this.$emit("hide");
    },
    // !!! Don't change
    onCancelClick() {
      this.$q
        .dialog({
          title: "Подтвердить",
          message: this.$t("messages.confirm_exit"),
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.hide();
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    },
  },
};
</script>
<style scoped>
.users {
  background: #ffffff;
  border-radius: 5px;
  border: 0.5px solid #e1e1e1;
}

.files {
  font-size: 15px;
}
.desp {
  font-size: 14px;
}
.cardBlock {
  width: 860px;
  font-size: 16px;
  line-height: 27px;
}
.font-14 {
  font-size: 14px;
}
.colorGrey {
  color: #787e8c;
}
.flexBlock {
  display: flex;
}
.pad-3 {
  padding-top: 3px;
}
.pad-2 {
  padding-top: 2px;
}
.green {
  color: #47b881;
}
.blue {
  color: #3576cb;
}
.lineH {
  line-height: 22px;
}
.comments {
  padding: 20px 0;
  margin: 20px 0;
  border-top: 1px solid #e3e4e8;
}
.com_title {
  font-size: 15px;
  color: #787e8c;
  padding-bottom: 10px;
}
.com_author {
  color: #282d30;
  font-weight: 600;
}
.com_author span {
  color: #787e8c;
  font-size: 12px;
  font-weight: normal;
  padding-left: 15px;
}
.com_action div {
  padding-right: 15px;
  font-size: 12px;
  color: #787e8c;
}
.com_text {
  line-height: 19px;
}
.rightBlock {
  font-size: 14px;
}
.users div {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 4px;
  padding: 5px 10px;
  float: left;
  margin: 10px 10px 0 0;
  cursor: pointer;
}
.users div span {
  padding-right: 10px;
}
.users div.active,
.users div:hover {
  color: #fff;
  background: #0054fe;
}
</style>
<style>
.custom_btn div {
  text-transform: none;
}
@font-face {
  font-family: 'OpenSans';
  src: url('~assets/fonts/OpenSans-Regular.ttf') format(truetype);
}
.OpenSans {
  font-family: 'OpenSans';
  font-weight: 500;
}
</style>
