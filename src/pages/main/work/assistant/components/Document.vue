<template>
  <div v-if="list" class="row bg-white q-pt-sm q-pb-lg q-mt-md q-mb-sm task">
    <div v-if="isNewDocsSection">
      <q-checkbox v-model="isSelected" @input="selectDoc" />
    </div>
    <div class="col">
      <div class="title q-py-sm">
        <b>{{ doc.description }}</b>
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
                {{ doc.out_number }}
              </div>
            </div>
            <div class="col flexBlock">
              <div class="q-pr-sm">
                <img src="@/assets/icons/Enter.svg" />
              </div>
              <div class="q-py-sm">
                <b>Входящий номер:</b>
                <br />
                {{ doc.in_number }}
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
                {{ doc.out_date }}
              </div>
            </div>
            <div class="col flexBlock">
              <div class="q-pr-sm">
                <img src="@/assets/icons/Calendar.svg" />
              </div>
              <div class="q-py-sm">
                <b>Входящая дата:</b>
                <br />
                {{ doc.in_date }}
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
                  >{{ doc.paper_count }} листов бумаги</q-tooltip
                >
              </div>
              <div class="flexBlock q-px-sm">{{ doc.paper_count }}</div>
            </div>
          </div>
        </div>
        <div class="col-2 q-pr-md q-pa-md">
          <div class="row">
            <div
              class="col text-right q-pr-md cursor-pointer"
              @click="download()"
            >
              <img src="@/assets/icons/Download-Cloud.svg" alt="" />
            </div>
            <!-- <div v-if="menuNo !== 1" class="cursor-pointer">
              <img src="@/assets/icons/Print.svg" alt="" />
            </div> -->
            <appPrintFile :doc="doc" />
          </div>
          <!-- posmotret button -->
          <div class="row q-pt-md">
            <div class="col text-right fontBtn">
              <!-- <a-popup :doc="doc"></a-popup> -->
              <q-btn
                color="blue-14"
                size="lg"
                label="Просмотреть"
                @click="showDialogDetails()"
              />
            </div>
          </div>
          <!-- -->
        </div>
      </div>
    </div>
  </div>

  <div v-else class="bg-white task q-py-sm">
    <div class="title q-pa-md">
      <div class="row">
        <div class="col">
          <b>{{ doc.description }}</b>
        </div>
        <div>
          <img src="@/assets/icons/help.svg" />
        </div>
      </div>
    </div>
    <div class="flexBlock q-px-md q-mb-md">
      <div class="q-pr-sm">
        <img src="@/assets/icons/Send.svg" />
      </div>
      <div>
        <b>От:</b>
        <br />
        {{ doc.signed_by }}
      </div>
    </div>
    <div class="flexBlock q-px-md q-mb-md">
      <div class="q-pr-sm">
        <img src="@/assets/icons/Calendar.svg" />
      </div>
      <div>
        <b>Входящая дата:</b>
        <br />
        {{ doc.in_date }}
      </div>
    </div>

    <div class="row q-pb-md">
      <div class="col text-center">
        <q-btn
          color="blue-14"
          size="lg"
          label="Просмотреть"
          @click="showDialogDetails()"
        />
        <!-- <a-popup :doc="doc"></a-popup> -->
      </div>
    </div>
  </div>
</template>
<script>
import printJS from "print-js";
import { mapState, mapGetters } from "vuex";
import PrintFile from "./PrintFile";
import Popup from "./Popup";
import CommonUtils from "@/shared/utils/CommonUtils";
import { downloadFile, getMimeType } from "@/shared/utils/file";

export default {
  props: ["doc"],
  components: {
    //APopup: Popup
    appPrintFile: PrintFile
  },
  computed: {
    ...mapState({
      list: state => state.assistant.isListView,
      selectedDocs: state => state.assistant.selectedDocs,
      menuNo: state => state.assistant.menuNo
    }),
    ...mapGetters({
      menuNo: "assistant/menuNo"
    }),
    isNewDocsSection() {
      return this.menuNo == 1 ? true : false;
    }
  },
  methods: {
    selectDoc() {
      console.log({ selectingDoc: this.doc });
      this.$store.dispatch("assistant/selDoc", this.doc);
    },
    download() {
      let extention = getMimeType(this.doc.file.extension);
      downloadFile(this.doc.file.id, this.doc.file.name, extention);
    },
    showDialogDetails() {
      this.$q
        .dialog({
          component: Popup,
          parent: this,
          doc: this.doc
        })
        .onOk(res => {
          console.log({ res: res });
          //obnobvit dokumenti na tekushiy tab
          if (res.status == 1) {
            this.$store.dispatch("assistant/getADocs", { num: this.menuNo });
          }
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    },
    formatDate(date) {
      //console.log({ date: CommonUtils.simpleDateFormat(date) });
      return CommonUtils.simpleDateFormat(date);
    }
  },
  data() {
    return {
      isSelected: false
    };
  },
  created() {
    if (this.selectedDocs.find(el => el.doc_id === this.doc.doc_id)) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
  }
};
</script>
<style scoped>
.flexBlock {
  display: flex;
  align-items: center;
  align-content: center;
}
.task {
  border-bottom: 1px #e3e4e8 solid;
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
.task b {
  font-weight: 600;
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
<style>
.q-btn__content {
  text-transform: none;
  font-size: 14px;
}
</style>
