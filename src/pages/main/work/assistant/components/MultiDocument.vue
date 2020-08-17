<template>
  <div class="GreyColor font-14 q-py-sm q-px-lg q-mr-lg q-mb-md">
    <div class="row">
      <div class="col">
        <div class="row">
          <div class="num q-pr-md q-pt-sm">
            <strong>№ {{doc.doc_id}}</strong>
          </div>
          <div class="col zg cursor" @click="change">
            <strong>{{formatDescription}}</strong>
            <!-- <strong v-else>Организация по кибербезопасности направляет вам документы по зашиты...</strong> -->
          </div>
          <div class="q-pl-sm q-pt-sm cursor" @click="change">
            <q-icon v-if="block" name="keyboard_arrow_up" size="sm" />
            <q-icon v-else name="keyboard_arrow_down" size="sm" />
          </div>
        </div>
      </div>
    </div>

    <div class="q-px-md q-pt-md q-pb-md" v-if="block">
      <div class="row q-pt-md q-pb-sm desp">
        <div class="col">
          <div class="row justify-center files">
            <div class="col-5">
              <div>Документ № {{doc.doc_id}}</div>
            </div>
            <div class="col flexBlock">
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
                {{doc.out_number}}
              </div>
            </div>
            <div class="col flexBlock">
              <div class="self-center">
                <img src="@/assets/icons/Calendar.svg" />
              </div>
              <div class="q-px-sm lineH">
                <b>Дата создания:</b>
                <br />
                {{formatDate(doc.created_at)}}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row q-py-xs desp">
        <div class="col">
          <div class="row">
            <div class="col flexBlock">
              <div class="self-center q-pl-xs">
                <img src="@/assets/icons/file.svg" />
              </div>
              <div class="col q-px-sm lineH">
                <b>Документ:</b>
                <div class="row">
                  <div class="col">{{ doc.file.name }}</div>
                  <div class="col q-px-sm">
                    <i>2.40 мб</i>
                  </div>
                </div>
              </div>
            </div>
            <div class="col flexBlock">
              <div class="self-center">
                <img src="@/assets/icons/Enter.svg" />
              </div>
              <div class="q-px-sm lineH">
                <b>Входящий номер:</b>
                <br />001_к
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CommonUtils from "@/shared/utils/CommonUtils";

export default {
  props: ["doc"],

  data() {
    return {
      block: false
    };
  },
  created() {
    console.log(this.doc);
  },
  methods: {
    change() {
      this.block = !this.block;
    },
    formatDate(date) {
      //console.log({ date: CommonUtils.simpleDateFormat(date) });
      return CommonUtils.simpleDateFormat(date);
    }
  },
  computed: {
    formatDescription() {
      if (this.doc) {
        if (this.block) {
          return this.doc.description;
        } else {
          return this.doc.description.length > 30
            ? this.doc.description.substr(0, 27) + "..."
            : this.doc.description;
        }
      } else {
        return "";
      }
    }
  }
};
</script>
<style scoped>
.GreyColor {
  color: #333;
  background: #f8f8f8;
}
.num {
  color: #787e8c;
}
.zg {
  line-height: 150%;
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
.font-15 {
  font-size: 15px;
}
.colorGrey {
  color: #787e8c;
}
.flexBlock {
  display: flex;
}
.cursor {
  cursor: pointer;
}
.lineH {
  line-height: 22px;
}
</style>
