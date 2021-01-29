<template>
  <div class="loadDocuments tab">
    <h4
      class="tab-title"
      ref="loadDocuments"
    >
      Загрузить документ
    </h4>
    <div class="tab-content" ref="tabContent">
      <div class="row">
        <div
          class="col-12 uploadFileBlock"
          @drag.prevent.stop
          @dragstart.prevent.stop
          @dragend.prevent.stop
          @dragover.prevent.stop="dragoverFile"
          @dragenter.prevent.stop="dragenterFile"
          @dragleave="dragleaveFile($event)"
          @drop.prevent.stop
          @drop="dropFile($event)"
        >
          <div ref="dragover"></div>
          <q-field
            ref="uploadFile"
            :value="
              filesAll.filter((file) => file.id != null).length >= countFile
            "
            :rules="[(val) => !!val || 'Загрузите файлы']"
          >
            <div class="uploadFile">
              <div class="row items-center">
                <div class="loaderFile" v-if="loaderFile">
                  <appLoader v-if="loaderFile" />
                </div>
                <q-btn
                  v-if="files.length && !loaderFile"
                  flat
                  round
                  color="#0054a6"
                  icon="delete_sweep"
                  @click.prevent="removeAllFile()"
                >
                  <q-tooltip>Удалить все файлы</q-tooltip>
                </q-btn>
                <q-icon class="clip" name="attach_file" />
                <span>Загрузка файлов</span>
                <input
                  type="file"
                  id="files"
                  ref="files"
                  multiple
                  @change="handleFilesUpload()"
                />
              </div>

              <div>
                <q-btn
                  class="addFileBtn"
                  label="Добавить"
                  @click.prevent="addFiles()"
                />

                <q-btn
                  v-if="files.length"
                  class="uploadFileBtn"
                  label="Загрузить"
                  @click.prevent="submitFiles()"
                />
              </div>
            </div>
          </q-field>
          <div class="fileList">
            <div
              v-for="(file, index) in filesAll"
              :key="'file' + index"
              class="file-listing"
            >
              <div class="fileNameBlock">
                <span class="material-icons fileDownload" v-if="file.id">
                  description
                  <q-tooltip>Файл загружен</q-tooltip>
                </span>

                <span
                  class="material-icons fileNotDownload"
                  v-else-if="file.upload"
                >
                  warning
                  <q-tooltip>Файл не загружен</q-tooltip>
                </span>

                <q-input
                  :disable="!!file.id || file.upload"
                  class="fileNameInput"
                  ref="fileName"
                  outlined
                  v-model="file.DocumentName"
                  dense
                  label="Название файла"
                  :rules="[(val) => !!val || 'Введите название файла']"
                />
                <span class="fileName">{{ file.name }}</span>
              </div>

              <div class="loaderFile" v-if="loaderFile && !file.id">
                <appLoader />
              </div>

              <q-btn
                v-else-if="!loaderFile && !file.id"
                flat
                round
                color="grey"
                icon="cancel"
                class="cancel"
                @click.prevent="removeFile(index)"
              >
                <q-tooltip>Удалить файл</q-tooltip>
              </q-btn>

              <q-btn
                v-else
                flat
                round
                color="grey"
                icon="cancel"
                class="cancel"
                @click.prevent="
                  $emit(
                    'confirm-delete-item',
                    file.DocumentName,
                    removeUploadFile,
                    (item = null),
                    index
                  )
                "
              >
                <q-tooltip>Удалить загруженный файл</q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CommonUtils from "@/shared/utils/CommonUtils";
import { validItems, validFilter } from "../../../filters/valid_filter";
import Loader from "@/components/Loader";

export default {
  props: ["fullProfile", "status"],
  data() {
    return {
      files: [], // для сервера, чтоб не дублировать отправку файла
      filesAll: [], // для фильтрации какие файлы загружены на сервер
      loaderFile: false
    };
  },
  created() {
    // if (
    //   this.status === "Step: Работа с документами" ||
    //   this.status === "Step: Ввод данных с интеграциями" ||
    //   this.fullProfile.BODecision != null
    // ) {
      const uploadedFiles = this.fullProfile.AttachedDocuments.items;

      for (let file of uploadedFiles) {
        this.filesAll.push({
          name: "",
          DocumentName: file.DocumentName,
          id: file.id,
          upload: true,
        });
      }

    // }
  },
  computed: {
    countFile() {
      return this.status === "Step: Работа с документами" ? 2 : 1;
    },
  },
  methods: {
    async submitFiles() {
      validFilter(this.$refs, "fileNameValid", "fileName");
      if (this.$refs.fileNameValid.hasError) {
        this.formHasError = true;
        this.bar = true;
      } else {
        this.loaderFile = true;

        let formData = new FormData();
        let onlyNullId = this.filesAll.filter((i) => i.id === null);

        for (let i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          let documentTypes = onlyNullId[i].DocumentName;
          formData.append("files", file);
          formData.append("documentTypes", documentTypes);
        }

        console.log("formData", formData.getAll("files"));

        try {
          const response = await this.$store.dispatch(
            "profile/uploadFiles",
            formData
          );
          console.log("resFile", response);
          if (response) {
            this.files = []; // удалить все файлы после загрузки на сервер
            this.loaderFile = false;
            for (let el of response.infos) {
              const item = this.filesAll.find((i) => i.id === null);
              item.id = Number(el.id);
            }
          } else {
            this.loaderFile = false;

            // el.upload = true; // загрузка была, но прошла не удачна
            this.filesAll
              .filter((i) => i.id === null)
              .map((i) => (i.upload = true));
          }
        } catch (error) {
          this.$store.commit(
            "credits/setMessage",
            {
              message: CommonUtils.filterServerError(error),
              code: 0
            }
          );
        }
      }

      // удалить все не загруженные файлы перед отправкой на сервер!!!!
      this.fullProfile.AttachedDocuments.items = this.filesAll
        .filter((i) => i.id !== null)
        .map(
          (i) =>
            (i = {
              id: i.id,
              DocLink: "",
              DocumentName: i.DocumentName,
            })
        );
      console.log("document", this.fullProfile.AttachedDocuments);
    },

    async removeUploadFile(payload) {
      try {
        console.log("idFile", this.filesAll[payload.index].id);
        const idFile = this.filesAll[payload.index].id;
        const response = await this.$store.dispatch(
          "profile/removeFiles",
          idFile
        );

        console.log("delFile", response);
        if (response == "OK") {
          this.filesAll.splice([payload.index], 1);
          const idx = this.fullProfile.AttachedDocuments.items.findIndex(
            (i) => i.id == idFile
          );
          if (idx != -1) {
            this.fullProfile.AttachedDocuments.items.splice(idx, 1);
          }

          console.log("this.filesAll", this.filesAll);
        }
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          {
            message: CommonUtils.filterServerError(error),
            code: 0
          }
        );
      }
    },

    handleFilesUpload() {
      if (Object.values(this.$refs.files.files).findIndex(i => i.type != 'application/pdf') != -1) {
        this.$store.commit(
            "credits/setMessage",
            {
              message: "Загрузите только PDF-файлы"
            }
          );
      } else {
        this.loaderFile = false;
        let uploadedFiles = this.$refs.files.files;
        console.log("uploadFile", uploadedFiles);
        this.uploadFile(uploadedFiles);
      }
    },

    dropFile(event) {
      this.$refs.dragover.classList.remove("dragover");
      let uploadedFiles = event.dataTransfer.files;
      console.log("uploadFile", uploadedFiles);
      // e.dataTransfer.files
      this.uploadFile(uploadedFiles);
    },

    dragoverFile() {
      this.$refs.dragover.classList.add("dragover");
    },

    dragenterFile() {
      this.$refs.dragover.classList.add("dragover");
    },

    dragleaveFile(event) {
      let fileBlock = this.$refs.dragover.getBoundingClientRect();

      if (
        event.pageX < fileBlock.left ||
        event.pageX > fileBlock.right ||
        event.pageY < fileBlock.top ||
        event.pageY > fileBlock.bottom
      ) {
        this.$refs.dragover.classList.remove("dragover");
      }
    },

    uploadFile(uploadedFiles) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
        this.filesAll.push({
          name: uploadedFiles[i].name,
          DocumentName: "",
          id: null,
          upload: false,
        });
      }

      console.log("files", this.files);
      console.log("filesAll", this.filesAll);
    },

    removeAllFile() {
      this.files = [];
      const uploadFiles = this.filesAll.filter((i) => i.id !== null);
      this.filesAll = uploadFiles;
    },

    removeFile(idx) {
      this.files.splice(idx - (this.filesAll.length - this.files.length), 1); // index для не загруженных файлов
      this.filesAll.splice(idx, 1);
    },

    addFiles() {
      this.$refs.files.click();
    },
  },
  mounted() {
    // console.log('refs', this.$refs)
    this.$emit("set-refs", this.$refs);
  },
  components: {
    appLoader: Loader,
  },
};
</script>