<template>
  <div>
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
        <span>Зарузка файлов</span>
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

    <div class="fileList">
      <div
        v-for="(file, index) in fullProfile.filesAll"
        :key="'file' + index"
        class="file-listing"
      >
        <div class="fileNameBlock">
          <span class="material-icons fileDownload" v-if="file.id">
            done
            <q-tooltip>Файл загружен</q-tooltip>
          </span>

          <span class="material-icons fileNotDownload" v-else-if="file.upload">
            warning
            <q-tooltip>Файл не загружен</q-tooltip>
          </span>

          <q-input
            :disable="!!file.id || file.upload"
            class="fileNameInput"
            ref="fileName"
            square
            outlined
            v-model="fullProfile.AttachedDocuments[index].DocumentName"
            dense
            label="Название файла"
            :rules="[val => !!val || 'Введите название файла']"
          />
          <span class="fileName">{{ file.name }}</span>
        </div>

        <div class="loaderFile" v-if="loaderFile">
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
</template>

<script>
import Loader from "@/components/Loader"
import { validFilter } from "../../filters/valid_filter"

export default {
  data() {
    return {
      loaderFile: false,
      files: [], // для сервера, чтоб не дублировать отправку файла
      //filesAll: [] // для фильтрации какие файлы загружены на сервер
    };
  },
  computed: {
    fullProfile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    handleFilesUpload() {
      this.loaderFile = false;
      let uploadedFiles = this.$refs.files.files;
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
        this.fullProfile.filesAll.push({
          name: uploadedFiles[i].name,
          id: null,
          upload: false
        });
        this.fullProfile.AttachedDocuments.push({
          id: null,
          DocLink: "",
          DocumentName: ""
        });
      }

      console.log("files", this.files);
      console.log("filesAll", this.fullProfile.filesAll);
      console.log("BPMData", this.fullProfile.AttachedDocuments);
    },

    async submitFiles() {
      validFilter(this.$refs, "fileNameValid", "fileName");
      if (this.$refs.fileNameValid.hasError) {
        this.formHasError = true;
        this.bar = true;
      } else {
        this.loaderFile = true;

        let formData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          // formData.append("files[" + i + "]", file);
          formData.append("file", file);
        }

        try {
          const response = await this.$store.dispatch("uploadFiles", formData);
          if (response.id) {
            this.files = []; // удалить все файлы после загрузки на сервер
            this.loaderFile = false;
            // for(let el of response) {
            //   const item = this.filesAll.find(i => i.id === null)
            //   item.id = el.id
            // }
            const elSer = this.fullProfile.AttachedDocuments.find(
              i => i.id === null
            );
            elSer.id = response.id;
            const el = this.fullProfile.filesAll.find(i => i.id === null);
            el.id = response.id;
          } else {
            this.loaderFile = false;
            const el = this.fullProfile.filesAll.find(i => i.id === null);
            el.upload = true; // загрузка была, но прошла не удачна
          }
        } catch (error) {}
      }
    },

    removeAllFile() {
      this.files = [];
      const uploadFiles = this.fullProfile.filesAll.filter(i => i.id !== null);
      this.fullProfile.filesAll = uploadFiles;

      const uploadFilesServer = this.fullProfile.AttachedDocuments.filter(
        i => i.id !== null
      );
      this.fullProfile.AttachedDocuments = uploadFilesServer;
      console.log("removeAllFile", uploadFilesServer);
      console.log("BPM", this.fullProfile.AttachedDocuments);
    },

    removeFile(key) {
      this.files.splice(key - (this.fullProfile.filesAll.length - this.files), 1);
      this.fullProfile.filesAll.splice(key, 1);
      this.fullProfile.AttachedDocuments.splice(key, 1);
    },

    addFiles() {
      this.$refs.files.click();
    }
  },
  components: {
    appLoader: Loader
  }
};
</script>

<style lang="scss">

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
