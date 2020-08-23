<template>
  <div v-if="isListView" class="row bg-white q-pa-sm q-mt-md q-mb-sm task">
    <div>
      <q-checkbox v-model="isChecked" />
    </div>
    <div class="col">
      <div class="title q-py-sm">
        <b>{{task.f_task_data.description}}</b>
      </div>
      <div class="row desp">
        <div class="col-6">
          <div class="row">
            <div class="col flexBlock">
              <div class="q-pr-sm">
                <img src="@/assets/icons/Enter-1.svg" />
              </div>
              <div class="q-py-sm">
                <b>Исходящий номер:</b>
                <br />
                {{task.f_task_data.out_number}}
              </div>
            </div>
            <div class="col flexBlock">
              <div class="q-pr-sm">
                <img src="@/assets/icons/Enter.svg" />
              </div>
              <div class="q-py-sm">
                <b>Входящий номер:</b>
                <br />
                {{task.f_task_data.in_number}}
              </div>
            </div>
            <div class="col flexBlock">
              <div class="q-pr-sm">
                <img src="@/assets/icons/Send.svg" />
              </div>
              <div class="q-py-sm">
                <b>От:</b>
                <br />
                {{task.h_first_name}} {{ task.h_last_name}}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col flexBlock">
              <div class="q-pr-sm">
                <img src="@/assets/icons/Calendar.svg" />
              </div>
              <div class="q-py-sm">
                <b>Исходящая дата:</b>
                <br />
                {{task.f_task_data.out_date}}
              </div>
            </div>
            <div class="col flexBlock">
              <div class="q-pr-sm">
                <img src="@/assets/icons/Calendar.svg" />
              </div>
              <div class="q-py-sm">
                <b>Входящая дата:</b>
                <br />
                {{task.f_task_data.in_date}}
              </div>
            </div>
            <div class="col flexBlock">
              <div class="q-pr-sm">
                <img src="@/assets/icons/Time-Limit.svg" />
              </div>
              <div class="q-py-sm">
                <b>Срок сдачи:</b>
                <br />
                <span class="subGreen">
                  <b>{{formatDate(task.f_task_data.deadline)}}</b>
                  <!-- TODO left 2 days-->
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row q-pl-lg q-pt-xs">
            <div class="flexBlock q-pr-sm q-py-sm">
              <div>
                <img src="@/assets/icons/List-active.svg" />
                <q-tooltip
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                  content-class="bg-green"
                >{{task.f_task_data.paper_count}} листов бумаги</q-tooltip>
              </div>
              <div class="flexBlock q-px-sm">{{task.f_task_data.paper_count}}</div>
            </div>
            <div class="flexBlock q-pr-sm q-py-sm">
              <div>
                <img src="@/assets/icons/Comments-active.svg" />
                <q-tooltip
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                  content-class="bg-light-blue"
                >{{commentsCount}} комментариев</q-tooltip>
                <!-- TODO-->
              </div>
              <div class="desp q-px-sm">{{commentsCount}}</div>
            </div>
            <div class="flexBlock q-pr-sm q-py-sm">
              <div>
                <img src="@/assets/icons/User-Account-active.svg" />
                <q-tooltip
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                  content-class="bg-deep-purple text-center"
                >
                  <b>Ответственные:</b>
                  <br />
                  <label
                    v-for="emp in task.f_task_data.h_emps"
                  >{{emp.FIRST_NAME}} {{emp.LAST_NAME[0]}}.{{emp.MIDDLE_NAME[0]}}&nbsp;</label>
                </q-tooltip>
              </div>
              <div class="desp q-px-sm">{{empsCount}}</div>
            </div>
          </div>
          <div class="row q-pt-sm">
            <div class="col subject q-py-sm q-px-lg">{{task.f_task_data.task_message}}</div>
          </div>
        </div>
        <div class="col-2 q-pr-md q-pa-md">
          <div class="row">
            <div class="col text-right q-pr-md" @click="download">
              <img src="@/assets/icons/Download-Cloud.svg" alt />
            </div>
            <div>
              <img src="@/assets/icons/Print.svg" alt />
            </div>
          </div>
          <div class="row q-pt-md">
            <div class="col text-right fontBtn">
              <!-- <a-popup></a-popup> -->
              <q-btn color="indigo-14" label="Открыть" @click="showDialogView()" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="bg-white task q-py-sm">
    <div class="title q-pa-md">
      <b>{{formatString(task.f_task_data.description)}}</b>
    </div>
    <div class="flexBlock q-px-md q-mb-md">
      <div class="q-pr-sm">
        <img src="@/assets/icons/Send.svg" />
      </div>
      <div>
        <b>От:</b>
        <br />
        {{task.h_first_name}} {{ task.h_last_name}}
      </div>
    </div>
    <div class="flexBlock q-px-md q-mb-md">
      <div class="q-pr-sm">
        <img src="@/assets/icons/Enter.svg" />
      </div>
      <div>
        <b>Входящий номер:</b>
        <br />
        {{task.f_task_data.in_number}}
      </div>
    </div>
    <div class="flexBlock q-px-md q-mb-lg">
      <div class="q-pr-sm">
        <img src="@/assets/icons/Time-Limit.svg" />
      </div>
      <div>
        <b>Срок сдачи:</b>
        <br />
        <span class="subGreen">
          <!-- TODO -->
          <b>{{formatDate(task.f_task_data.deadline)}}</b>
        </span>
      </div>
    </div>
    <div class="footerBlock">
      <div class="row q-my-sm">
        <div class="col flexBlock q-pr-sm q-py-sm justify-center">
          <div>
            <img src="@/assets/icons/List-active.svg" />
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
              content-class="bg-green"
            >{{task.f_task_data.paper_count}} листов бумаги</q-tooltip>
          </div>
          <div class="flexBlock q-px-sm">7</div>
        </div>
        <div class="col flexBlock twoBorders q-pr-sm q-py-sm justify-center">
          <div>
            <img src="@/assets/icons/Comments-active.svg" />
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
              content-class="bg-light-blue"
            >{{commentsCount}} комментариев</q-tooltip>
          </div>
          <div class="desp q-px-sm">25</div>
        </div>
        <div class="col flexBlock q-pr-sm q-py-sm justify-center">
          <div>
            <img src="@/assets/icons/User-Account-active.svg" />
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
              content-class="bg-deep-purple text-center"
            >
              <b>Ответственные:</b>
              <br />Баратов С. У. Абдуллаев И. А. Драгунов А. С.
            </q-tooltip>
          </div>
          <div class="desp q-px-sm">25</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { simpleDateFormat } from "@/shared/utils/date";
import { downloadFile, getMimeType } from "@/shared/utils/file";
import { stringTruncate } from "@/shared/utils/common";
import Popup from "./Popup";
export default {
  props: {
    task: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {},
  data() {
    return {
      isChecked: false,
    };
  },
  created() {
    console.log({ task: this.task });
  },
  computed: {
    ...mapGetters({
      isListView: "getListView",
    }),
    commentsCount() {
      ///console.log({ count: this.task.comments.length });
      if (!!this.task.comments) return this.task.comments.length;
      else return 0;
    },
    empsCount() {
      if (!!this.task.f_task_data.h_emps) {
        return this.task.f_task_data.h_emps.length;
      } else return 0;
    },
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
    showDialogView() {
      this.$q
        .dialog({
          component: Popup,
          parent: this,
          task: this.task,
        })
        .onOk((res) => {
          console.log({ res: res });
          //obnobvit dokumenti na tekushiy tab
          if (res.status == 1) {
            //this.$store.dispatch("getADocs", { num: this.menuNo });
          }
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    },
    formatDate(date) {
      return simpleDateFormat(date);
    },
    formatString(text) {
      return stringTruncate(text, 50);
    },
  },
};
</script>
<style scoped>
.flexBlock {
  display: flex;
  align-items: center;
  align-content: center;
}
.task img {
  vertical-align: bottom;
}
.title {
  font-size: 16px;
}
.desp {
  color: #606060;
}
.subject {
  background: #f8f8f8;
  border-radius: 30px;
  color: #ff4a4a;
  line-height: 19px;
  font-weight: 600;
}
.task {
  color: #333;
}
.subGreen {
  color: #47b881;
}
.subYellow {
  color: #fdcc0c;
}
.subRed {
  color: #ff4a4a;
}
.footerBlock {
  border-top: 1px #e3e4e8 solid;
}
.twoBorders {
  border-left: 1px #e3e4e8 solid;
  border-right: 1px #e3e4e8 solid;
}
</style>

