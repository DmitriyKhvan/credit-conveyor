<template>
  <div class="task q-py-md q-mb-lg">
    <div class="q-pr-sm">
      <q-checkbox v-model="val" @input="eventCheck()" />
    </div>
    <div class="taskContent q-pr-md">
      <div class="title q-py-sm">{{doc.description}}</div>
      <div class="despBlock q-py-sm">
        <div class="desp">
          <div class="pad-3">
            <img src="@/assets/icons/Send.svg" />
          </div>
          <div class="q-px-sm">Статус:</div>
          <div>
            <strong class="blue">{{getNameStatus(doc.doc_status)}}</strong>
          </div>
        </div>
        <div class="desp">
          <div class="pad-3">
            <img src="@/assets/icons/Time-Limit.svg" />
          </div>
          <div class="q-px-sm">Срок задачи:</div>
          <div v-if="doc.deadline">
            <strong>{{formatDate(doc.deadline)}}</strong>
            <br />
            <strong
              :class="daysLeft(doc.deadline) == 'Срок окончен' ? 'red': 'green'"
            >{{daysLeft(doc.deadline)}}</strong>
          </div>
          <div v-else>
            <strong>нет данных</strong>
          </div>
        </div>
        <div class="desp">
          <div class="pad-3">
            <img src="@/assets/icons/Send.svg" />
          </div>
          <div class="q-px-sm">От:</div>
          <div>
            <strong>{{ doc['signed_by'] !== null ? doc['signed_by'] : 'Неизвестный' }}</strong>
          </div>
        </div>
        <div class="buttonFilter buttonTask text-center">
          <!-- <a-popup :doc="doc"></a-popup> -->
          <q-btn
            color="white"
            text-color="black"
            size="lg"
            label="Подробнее"
            @click="showDialogApparat()"
          />
        </div>
      </div>

      <div class="despBlock q-py-sm despBlockTwo">
        <div class="desp">
          <div class="pad-3">
            <img src="@/assets/icons/Enter-1.svg" />
          </div>
          <div class="q-px-sm">
            Исходящий номер:
            <br />
            {{doc.out_number}}
          </div>
        </div>

        <div class="desp">
          <div class="pad-3">
            <img src="@/assets/icons/Enter.svg" />
          </div>
          <div class="q-px-sm">
            Входящий номер:
            <br />
            {{doc.in_number}}
          </div>
        </div>

        <div class="desp">
          <div class="pad-3">
            <img src="@/assets/icons/Calendar.svg" />
          </div>
          <div class="q-px-sm">
            Исходящая дата:
            <br />
            {{formatDate(doc.out_date)}}
          </div>
        </div>

        <div class="desp">
          <div class="pad-3">
            <img src="@/assets/icons/Calendar.svg" />
          </div>
          <div class="q-px-sm">
            Входящая дата:
            <br />
            {{formatDate(doc.in_date)}}
          </div>
        </div>
        <div class="desp">
          <div class="desp q-pr-sm">
            <div>
              <img src="@/assets/icons/List-active.svg" />
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                content-class="bg-green"
              >{{doc.paper_count}} листов бумаги</q-tooltip>
            </div>
            <div class="desp q-px-sm">{{doc.paper_count}}</div>
          </div>
          <div class="desp q-pr-sm">
            <div>
              <img v-if="doc.comments" src="@/assets/icons/Comments-active.svg" />
              <img v-else src="@/assets/icons/Comments.svg" />
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                content-class="bg-light-blue"
              >{{doc.comments ? doc.comments.length : 0 }} комментариев</q-tooltip>
            </div>
            <div v-if="doc.comments" class="desp q-px-sm">{{doc.comments.length}}</div>
            <div v-else class="desp q-px-sm">0</div>
          </div>
          <div class="desp q-pr-sm">
            <div>
              <img v-if="doc.start_emps_id" src="@/assets/icons/User-Account-active.svg" />
              <img v-else src="@/assets/icons/User-Account.svg" />
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                content-class="bg-deep-purple text-center"
              >
                <b>Ответственные:</b>
                <br />
                <label
                  v-for="(emp, i) in doc.start_emps_id"
                  :key="i"
                >{{ emp['first_name'] }} {{emp['last_name'][0]}}.{{emp['middle_name'][0]}}&nbsp;</label>
              </q-tooltip>
            </div>
            <div v-if="doc.start_emps_id" class="desp q-px-sm">{{doc.start_emps_id.length}}</div>
            <div v-else class="desp q-px-sm">0</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { intDateFormat } from "@/shared/utils/date";
import Popup from "./Popup";
export default {
  props: ["doc"],
  components: {
    //APopup: Popup
  },
  data() {
    return {
      val: false,
    };
  },
  computed: {
    ...mapState({
      statuses: (state) => state.apparat.aFilters.statuses,
      checkeds: (state) => state.apparat.aChecked,
    }),
    ...mapGetters({ getNameStatus: "apparat/getNameStatus" }),
    getStatus() {
      return this.getNameStatus(this.doc.doc_status);
    },
  },
  created() {
    if (this.checkeds.find((el) => el === this.doc.doc_id)) {
      this.val = true;
    } else {
      this.val = false;
    }
  },
  methods: {
    showDialogApparat() {
      this.$q
        .dialog({
          component: Popup,
          parent: this,
          doc: this.doc,
        })
        .onOk((res) => {
          console.log({ res: res });
          //obnobvit dokumenti na tekushiy tab
          if (res.status == 1) {
            //this.$store.dispatch("getADocs", { num: this.menuNo });
            //this.$store.dispatch("resetSelectedDocs");
          }
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    },

    formatDate(data) {
      return intDateFormat(data);
      // const d = new Date(data);
      // const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
      // const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
      // const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
      // return `${ye}/${mo}/${da}`;
    },
    eventCheck() {
      let arr = [];
      if (this.val) {
        if (
          this.checkeds.find((el) => el !== this.doc.doc_id) ||
          this.checkeds.length === 0
        ) {
          arr = this.checkeds;
          arr.push(this.doc.doc_id);
        }
      } else {
        arr = this.checkeds.filter((el) => el !== this.doc.doc_id);
      }

      this.$store.dispatch("apparat/docsCheked", arr);
    },
    daysLeft(num) {
      let today = new Date();
      let nextDate = new Date(num);
      let msPerDay = 24 * 60 * 60 * 1000;
      let daysLeft = Math.round(
        (nextDate.getTime() - today.getTime()) / msPerDay
      );
      let dayname = "";
      let ds = "" + daysLeft;
      let dd = parseInt(ds.substr(ds.length - 1));
      if (daysLeft > 4 && daysLeft < 21) dayname = " дней";
      else if (dd == 1) dayname = " день";
      else if (dd == 2 || dd == 3 || dd == 4) dayname = " дня";
      else dayname = " дней";
      if (daysLeft <= 0) {
        return "Срок окончен";
      } else {
        return "Осталось " + daysLeft + dayname;
      }
    },
  },
};
</script>
<style scoped>
.task {
  border-bottom: 1px #e3e4e8 solid;
}
.task,
.taskContent {
  width: 100%;
  font-size: 16px;
  color: #333;
}
.pad-3 {
  padding-top: 3px;
}
.blue {
  color: #3576cb;
}
.green {
  color: #47b881;
}
.red {
  color: red;
}
.despBlock {
  display: flex;
  justify-content: space-between;
  color: #606060;
}
.despBlockTwo {
  font-size: 14px;
}
.desp {
  display: flex;
}
.task {
  display: flex;
}
</style>
