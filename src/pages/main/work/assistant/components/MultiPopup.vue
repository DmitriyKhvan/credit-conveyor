<template>
  <div>
    <q-dialog
      ref="dialog"
      @hide="onDialogHide"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="cardBlock q-pa-md" style="width: 920px; max-width: 80vw;">
        <q-card-section>
          <div class="row justify-between">
            <q-space />
            <q-btn flat :icon="'clear'" @click="onCancelClick"></q-btn>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col title">
              <q-scroll-area style="height: 560px;">
                <multi-document v-for="d in selectedDocs" :key="d.doc_id" :doc="d"></multi-document>
              </q-scroll-area>
            </div>
            <div class="col-5 q-pl-md rightBlock">
              <div class="row">
                <div class="col q-pb-xs">Изменить статус:</div>
              </div>
              <div class="row">
                <div class="col q-pb-md">
                  <q-input standout v-model="searchUser" label="Исполнитель" @input="searchUsers">
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
                      {{ u.LAST_NAME }} {{ u.FIRST_NAME[0] }}.
                      {{ u.MIDDLE_NAME[0] }}.
                    </span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col q-pb-xs">Выберите главного исполнителя</div>
              </div>
              <div class="row" v-if="workers.length !== 0">
                <div class="col q-pb-md q-pt-sm q-px-md users">
                  <div
                    v-for="u in workers"
                    :key="u.EMP_ID"
                    :class="activeWorker === u.EMP_ID ? 'active' : ''"
                  >
                    <span @click="selectActiveWorker(u.EMP_ID)">
                      {{ u.LAST_NAME }} {{ u.FIRST_NAME[0] }}.
                      {{ u.MIDDLE_NAME[0] }}.
                    </span>
                    <q-icon name="close" size="xs" class="icon_btn" @click="removeUser(u.EMP_ID)" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col q-pb-xs q-pt-md">Выберите руководителя</div>
              </div>
              <div class="row">
                <div class="col q-pb-md">
                  <q-select
                    filled
                    v-model="superior"
                    :options="superiorsList"
                    label="Руководитель"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col q-pb-xs">Выберите шаблон</div>
              </div>
              <div class="row">
                <div class="col q-pb-md">
                  <q-select filled v-model="shablon" :options="shablons" label="Шаблон" />
                </div>
              </div>

              <div class="row desp">
                <div class="col">
                  <div>
                    <div v-if="signed">Подписан</div>
                    <div v-else>Не подписан</div>
                  </div>
                  <div>
                    <q-toggle v-model="signed" color="amber-4" size="74px" @input="changeVal" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row q-pt-lg q-mt-sm bottomBlock">
            <div class="col text-center">
              <q-btn color="blue-14" label="Отправить" @click="saveForm" size="lg" class="q-mr-lg" />
              <q-btn color="white" text-color="black" label="Отменить" @click="hide" size="lg" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MultiDocument from "./MultiDocument";
import NotifyService from "@/services/notify.service";

export default {
  components: {
    MultiDocument: MultiDocument,
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
      docIds: [],
    };
  },
  created() {
    console.log({ selectedDocs: this.selectedDocs });
    this.selectedDocs.forEach((doc) => {
      this.docIds.push(doc.doc_id);
    });
  },
  computed: {
    ...mapState({
      superiorsList: (state) => state.assistant.aSuperiors,
    }),
    ...mapGetters({
      dicts: "dicts/getDictsList", // loads all dicts
      selectedDocs: "assistant/selectedDocs",
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
    searchUsers() {
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
    selectedUser(user) {
      this.workers.push(user);
      this.searchUser = "";
      this.result = [];
    },
    selectActiveWorker(id) {
      this.activeWorker = id;
    },
    removeUser(id) {
      this.workers = this.workers.filter((user) => user.EMP_ID !== id);
      if (this.activeWorker === id) this.activeWorker = "";
    },
    changeVal() {
      console.log(this.signed);
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
        doc_id: this.docIds,
        data: arr,
        h_emp_id: this.superior.value,
        h_dep_code: this.superior.dep_code,
        type: 1,
        message: this.shablon.value,
        status: this.signed === true ? 3 : 2,
      };
      console.log({ obg });
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
          title: "Подтверждать",
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
  background: #f8f8f8;
  border-radius: 5px;
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
.users div.active {
  color: #fff;
  background: #0054fe;
}
.bottomBlock {
  box-shadow: 0 -5px 10px -10px #999;
}
</style>
<style>
.custom_btn div {
  text-transform: none;
}
</style>
