<template>
  <div class="fontBtn">
    <q-dialog
      ref="dialog"
      @hide="onDialogHide"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="cardBlock q-pa-md" style="width: 760px; max-width: 80vw;">
        <q-card-section>
          <div class="row">
            <div class="col title">{{task.f_task_data.description}}</div>
            <div class="col-1 text-right">
              <q-btn round color="white" text-color="black" icon="clear" flat v-close-popup />
            </div>
          </div>

          <div class="row font-14 colorGrey q-pt-md">
            <div class="col-8">
              <div class="row q-py-xs">
                <div class="col">
                  <div class="row justify-center">
                    <div class="col">
                      <div>Документ № {{task.f_task_data.doc_id}}</div>
                    </div>
                    <div class="col flexBlock" @click="download">
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

              <div class="row q-py-sm">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="self-center">
                        <img src="@/assets/icons/Send.svg" />
                      </div>
                      <div class="q-px-sm lineH">
                        <strong>От:</strong>
                        <br />
                        {{task.h_first_name}} {{ task.h_last_name}}
                      </div>
                    </div>
                    <div class="col flexBlock">
                      <div class="self-center">
                        <img src="@/assets/icons/Time-Limit.svg" />
                      </div>
                      <div class="q-px-sm lineH">
                        <strong>Срок сдачи:</strong>
                        <br />
                        {{formatDate(task.f_task_data.deadline)}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-sm">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="self-center">
                        <img src="@/assets/icons/Enter.svg" />
                      </div>
                      <div class="q-px-sm lineH">
                        <strong>Входящий номер:</strong>
                        <br />
                        {{task.f_task_data.in_number}}
                      </div>
                    </div>
                    <div class="col flexBlock">
                      <div class="self-center">
                        <img src="@/assets/icons/Enter-1.svg" />
                      </div>
                      <div class="q-px-sm lineH">
                        <strong>Исходящий номер:</strong>
                        <br />
                        {{task.f_task_data.out_number}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-sm">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="self-center">
                        <img src="@/assets/icons/Enter-1.svg" />
                      </div>
                      <div class="q-px-sm lineH">
                        <strong>Исходящая дата:</strong>
                        <br />
                        {{task.f_task_data.out_date}}
                      </div>
                    </div>
                    <div class="col flexBlock">
                      <div class="self-center">
                        <img src="@/assets/icons/Enter.svg" />
                      </div>
                      <div class="q-px-sm lineH">
                        <strong>Входящая дата:</strong>
                        <br />
                        {{task.f_task_data.in_date}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-sm">
                <div class="col subject q-py-sm q-px-lg">{{task.f_task_data.task_message}}</div>
              </div>

              <div class="row comments">
                <div class="col">
                  <div class="row">
                    <div class="col com_title">Комментарии:</div>
                  </div>
                  <div class="row q-pb-md com_block">
                    <div class="col-1">
                      <q-avatar size="32px">
                        <img src="https://cdn.quasar.dev/img/avatar.png" />
                      </q-avatar>
                    </div>
                    <div class="col q-px-sm">
                      <div class="com_author">
                        Ибрагим Абдуллаев Акрамович
                        <span>03.06.2020</span>
                      </div>
                      <div
                        class="com_text"
                      >Направляет вам указание по оптимизацию внутренных банковских систем</div>
                      <div class="com_action flexBlock">
                        <div>редактирвоать</div>
                        <div>удалить</div>
                      </div>
                    </div>
                  </div>

                  <div class="row q-mt-md com_block">
                    <div class="col-1">
                      <q-avatar size="32px">
                        <img src="https://cdn.quasar.dev/img/avatar.png" />
                      </q-avatar>
                    </div>
                    <div class="col q-px-sm">
                      <q-input filled v-model="text" dense label="Напишите комментарий..." />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-4 rightBlock">
              <div class="row">
                <div class="col">Изменить статус:</div>
              </div>
              <div class="row">
                <div class="col q-py-sm">
                  <q-select
                    filled
                    v-model="status"
                    :options="userStatuses"
                    dense
                    @input="onStatusSelect"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col">Отвественные:</div>
              </div>

              <div class="row">
                <div class="col q-py-sm">
                  <q-input standout v-model="searchUser" label="Поиск" dense @input="selUsers">
                    <template v-slot:append>
                      <q-icon
                        v-if="searchUser !== ''"
                        name="close"
                        @click="searchUser = ''"
                        class="cursor-pointer"
                      />
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="row">
                <div class="col users">
                  <div>Абдуллаев И. А.</div>
                  <div>Баратов С. У.</div>
                </div>
              </div>
              <div class="row" v-if="searchResults.length !== 0">
                <div class="col q-pb-md q-pt-sm q-px-md q-mb-sm users">
                  <div v-for="u in searchResults" :key="u.EMP_ID">
                    <span>
                      {{ u.LAST_NAME }} {{ u.FIRST_NAME[0] }}.
                      {{ u.MIDDLE_NAME[0] }}.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { downloadFile, getMimeType } from "@/shared/utils/file";
import { simpleDateFormat } from "@/shared/utils/date";
import NotifyService from "@/services/notify.service";

export default {
  data() {
    return {
      //dialog: false,
      //date: "2019/02/01",
      searchUser: "", // serch text
      text: "", // comment text
      searchResults: [],
      status: null,
      userStatuses: [
        {
          label: "Новые задания",
          value: 1
        },
        {
          label: "Принял(а) задания",
          value: 2
        },
        {
          label: "Работаю",
          value: 3
        },
        {
          label: "Завершенные задания",
          value: 4
        }
      ]
    };
  },
  props: {
    task: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  created() {
    console.log({ task: this.task });
    console.log(this.userStatuses.find(el => el.value == this.task.u_status));
    this.status = this.userStatuses.find(el => el.value == this.task.u_status);
  },
  methods: {
    download() {
      let extention = getMimeType(this.task.f_task_data.file.extension);
      downloadFile(
        this.task.f_task_data.file.id,
        this.task.f_task_data.file.name,
        extention
      );
    },
    formatDate(date) {
      return simpleDateFormat(date);
    },
    onStatusSelect() {
      console.log({ status: this.status });
      let obj = {
        id: this.task.task_id,
        status: this.status.value
      };
      this.$axios
        .post("tasks/user/status", obj)
        .then(res => {
          console.log({ res });
          if (res.data.status == 1) {
            // success
            NotifyService.showSuccessMessage(res.data.message);
            this.$store.dispatch("reload");
            this.hide();
          } else {
            // fail
            NotifyService.showErrorMessage(res.data.message);
          }
        })
        .catch(err => {
          console.log({ err });
        });
    },
    selUsers() {
      console.log("select users ...");
      if (this.searchUser === "") {
        this.searchResults = [];
      }
      if (this.searchUser !== "") {
        this.$axios
          .get("/emps/search?name=" + this.searchUser)
          .then(response => {
            this.searchResults = response.data;
          })
          .catch(error => {
            console.log("error");
          });
      }
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
          title: "Confirm",
          message: this.$t("messages.confirm_exit"),
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.hide();
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    }
  }
};
</script>
<style scoped>
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
  padding: 20px 0 0 0;
  margin: 20px 0 0 0;
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
  padding: 4px 0 4px 15px;
}
.users div {
  background: #3576cb;
  color: #fff;
  border-radius: 4px;
  padding: 5px 10px;
  float: left;
  margin: 5px 0;
}
.subject {
  background: #f8f8f8;
  border-radius: 30px;
  color: #ff4a4a;
  line-height: 19px;
  font-weight: 600;
}
</style>
<style>
.fontBtn .q-btn__content {
  text-transform: none;
}
</style>
