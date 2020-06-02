<template>
  <!-- loadDocuments -->
  <div class="loadDocuments tab q-pa-md">
    <h4
      class="tab-title"
      ref="loadDocuments"
      @click="toggleForm('loadDocuments')"
    >
      Загрузить логотип
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
            :value="!!filesAll.length"
            :rules="[val => !!val || 'Загрузите файлы']"
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
                  flat
                  round
                  color="#0054a6"
                  icon="add_box"
                  @click.prevent="addFiles()"
                >
                  <q-tooltip>Добавить файл(ы)</q-tooltip>
                </q-btn>

                <q-btn
                  v-if="files.length"
                  flat
                  round
                  color="#0054a6"
                  icon="cloud_upload"
                  @click.prevent="submitFiles()"
                >
                  <q-tooltip>Загрузить файл(ы)</q-tooltip>
                </q-btn>
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
                  done
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
                  square
                  outlined
                  v-model="file.DocumentName"
                  dense
                  label="Название файла"
                  :rules="[val => !!val || 'Введите название файла']"
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
                color="black"
                icon="clear"
                @click.prevent="removeFile(index)"
              >
                <q-tooltip>Удалить файл</q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loaderFile: false,
      files: [], // для сервера, чтоб не дублировать отправку файла
      filesAll: [], // для фильтрации какие файлы загружены на сервер
    }
  },
  methods: {
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

    handleFilesUpload() {
      this.loaderFile = false;
      let uploadedFiles = this.$refs.files.files;
      console.log("uploadFile", uploadedFiles);
      this.uploadFile(uploadedFiles);
    },

    uploadFile(uploadedFiles) {
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
        this.filesAll.push({
          name: uploadedFiles[i].name,
          DocumentName: "",
          id: null,
          upload: false
        });
      }

      console.log("files", this.files);
      console.log("filesAll", this.filesAll);
    },

    async submitFiles() {
      validFilter(this.$refs, "fileNameValid", "fileName");
      if (this.$refs.fileNameValid.hasError) {
        this.formHasError = true;
        this.bar = true;
      } else {
        this.loaderFile = true;

        let formData = new FormData();
        let onlyNullId = this.filesAll.filter(i => i.id === null);

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
              const item = this.filesAll.find(i => i.id === null);
              item.id = Number(el.id);
            }
          } else {
            this.loaderFile = false;

            // el.upload = true; // загрузка была, но прошла не удачна
            this.filesAll
              .filter(i => i.id === null)
              .map(i => (i.upload = true));
          }
        } catch (error) {}
      }

      // удалить все не загруженные файлы перед отправкой на сервер!!!!
      this.fullProfile.AttachedDocuments.items = this.filesAll
        .filter(i => i.id !== null)
        .map(
          i =>
            (i = {
              id: i.id,
              DocLink: "",
              DocumentName: i.DocumentName
            })
        );
      console.log("document", this.fullProfile.AttachedDocuments);
    },

    removeAllFile() {
      this.files = [];
      const uploadFiles = this.filesAll.filter(i => i.id !== null);
      this.filesAll = uploadFiles;
    },

    removeFile(key) {
      this.files.splice(key - (this.filesAll.length - this.files), 1);
      this.filesAll.splice(key, 1);
    },

    addFiles() {
      this.$refs.files.click();
    }
  }
};
</script>
<style lang="scss">
// file
.uploadFileBlock {
  position: relative;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  vertical-align: top;
  background: #fff;
  position: relative;
  min-height: 150px;
  margin-bottom: 10px;
  padding-bottom: 10px;

  .dragover {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: 2px dashed #5d5d5d;
    background-color: #fafafa61;
    outline-offset: -17px;
    z-index: 10;
  }
}

.uploadFile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 10px;
  background: #ededed;
  font-weight: 600;
  color: #1360ac;
}

.fileNameBlock {
}

.loaderFile {
  font-size: 20px;
  margin-right: 10px;
}

.fileDownload,
.fileNotDownload {
  margin-right: 10px;
  font-size: 40px;
}

.fileDownload {
  color: green;
}

.fileNotDownload {
  color: red;
}

.fileName {
  font-weight: 600;
  padding: 9px;
}

.fileNameInput.q-field--square .q-field__control {
  width: 300px;
  border-radius: 5px !important;
  border: 1px solid #3a3a3a;
  background: #fff;
  outline: 0;
}

input[type="file"] {
  // opacity: 0;
  display: none;
  //position: absolute;
  // top: -500px;
}

.file-listing {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 16px 0 0 16px;
  margin-bottom: 10px;
  border: 1px solid #e0e0e0;
  background: #f5f5f5;
  border-radius: 5px;
}

.file-listing > div {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

span.remove-file {
  color: red;
  cursor: pointer;
  float: right;
}
</style>
