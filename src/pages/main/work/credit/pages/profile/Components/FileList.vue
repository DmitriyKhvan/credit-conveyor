<template>
  <div class="fileList tab" v-if="fileList.length">
    <h4 class="tab-title" ref="fileList">Список документов</h4>
    <div class="tab-content" ref="tabContent">
      <ul class="fileBlock">
        <li class="fileLi" v-for="(fileData, index) of fileList" :key="index">
          <p>
            {{ $t(`printForms.${fileData.label}`) }}
            {{ fileData.number ? +fileData.number + 1 : null }}
          </p>

          <div class="printWorkDoc">
            <q-btn
              :disable="disable"
              class="printDoc"
              flat
              style="color: #74798c"
              icon="print"
              label="(рус.)"
              @click="printFile(fileData, index)"
              :loading="fileData.loading"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
              <q-tooltip>Печать</q-tooltip>
            </q-btn>

            <q-btn
              :disable="disable"
              class="printDoc"
              flat
              style="color: #74798c"
              icon="print"
              label="(узб.)"
              @click="printFile(fileData, index + fileList.length, 1)"
              :loading="fileData.loadingUz"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
              <q-tooltip>Печать</q-tooltip>
            </q-btn>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CommonUtils from "@/shared/utils/CommonUtils";
import dataTransform from "../../../filters/dataTransform";

export default {
  data() {
    return {
      fileData: {
        type: "",
        lang: this.$store.getters["common/getLangNum"] - 1, //0 - рус, 1 - узб,
        data: {},
      },
      disable: false,
    };
  },

  computed: {
    fileList() {
      return this.$store.getters["profile/fileList"];
    },

    cacheDocId() {
      const cacheDocIdArr = [];
      for (let i = 0; i < this.fileList.length * 2; i++) {
        cacheDocIdArr.push(null);
      }
      return cacheDocIdArr;
    },
  },

  methods: {
    async printFile(fileData, idx, lang = 0) {
      this.disable = true;
      if (lang == 0) {
        fileData.loading = true;
      } else {
        fileData.loadingUz = true;
      }

      let file = null;
      this.fileData.lang = lang;
      this.fileData.type = fileData.label;
      this.fileData.data = dataTransform(fileData.data);
      try {
        console.log(JSON.stringify(this.fileData, null, 2));

        if (this.cacheDocId[idx]) {
          file = await this.$store.dispatch(
            "credits/getFile",
            this.cacheDocId[idx]
          );
        } else {
          file = await this.$store.dispatch("credits/getFile", this.fileData);

          this.cacheDocId[idx] = file.id;
        }

        console.log("file", file);

        if (file) {
          printJS(file.url);
          window.URL.revokeObjectURL(file.url);
        }

        this.disable = false;
        if (lang == 0) {
          fileData.loading = false;
        } else {
          fileData.loadingUz = false;
        }
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          CommonUtils.filterServerError(error)
        );
        this.disable = false;
        if (lang == 0) {
          fileData.loading = false;
        } else {
          fileData.loadingUz = false;
        }
      }
    },
  },
};
</script>