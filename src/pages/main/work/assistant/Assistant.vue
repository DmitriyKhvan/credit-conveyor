<template>
  <div class="q-pa-lg">
    <a-header></a-header>

    <template v-if="list">
      <div class="row bg-white q-pa-md q-my-lg">
        <div class="col">
          <a-views></a-views>
          <a-document v-for="n in 10" :key="n"></a-document>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row q-my-xs q-col-gutter-lg">
        <div class="col-3" v-for="n in 10" :key="n">
          <a-document></a-document>
        </div>
      </div>
    </template>
  </div>
  <!-- <div class="q-pa-md">
    <q-toolbar class="shadow-2 rounded-borders">
      <q-tabs v-model="tab" inline-label stretch>
        <q-tab name="tab1" label="Новые" icon="new_releases" @click="changeDocs(1)" />
        <q-tab name="tab2" label="Отправленные" icon="drafts" @click="changeDocs(2)" />
      </q-tabs>
    </q-toolbar>

    <div class="sub_menu">
      <div
        v-if="tab === 'tab1'"
        @click="sendSelDocs()"
        :class="selection.length !== 0 ? 'active': ''"
      >перенаправить</div>
      <div>сортировать</div>

    </div>

    <div v-for="doc in docs" :key="doc.doc_id" class="row docBlock">
      <div class="col-1 check text-center">
        <div class="check_div">
          <q-checkbox v-model="selection" :val="doc" />
        </div>
        #{{doc.doc_id}}
      </div>
      <div class="col content">
        <div class="row">
          <div class="col text">{{doc.description}}</div>
        </div>
        <div class="row">
          <div class="col-2 despBlock">
            <div>
              <q-icon name="skip_previous" />
            </div>
            <div>
              <span>Исх.№</span>
              {{doc.out_number}}
              <br />
              <span>от:</span>
              {{doc.out_date}}
            </div>
          </div>
          <div class="col-2 despBlock">
            <div>
              <q-icon name="skip_next" />
            </div>
            <div>
              <span>Вх.№</span>
              {{doc.in_number}}
              <br />
              <span>от:</span>
              {{doc.in_date}}
            </div>
          </div>
          <div class="col-3 despBlock">
            <div>
              <q-icon name="description" />
            </div>
            <div>
              <span>{{doc.paper_count}} лист / {{doc.format}}</span>
              <br />
              <i>{{sizeFunc(doc.file.file_size)}}</i>
            </div>
          </div>

          <div class="col despBlock">
            <div>
              <q-icon name="person" />
            </div>
            <div>
              От: {{doc.fio}}
              <br />
              <span v-if="doc.signed_by"></span>
              Кто подписал: {{doc.signed_by}}
            </div>
          </div>
        </div>
      </div>
      <div class="col-1 text-right actions">
        <q-btn-group push>
          <q-btn push icon="cloud_download" @click="downloadFile(doc.file)" />
          <q-btn push icon="print" />
          <q-btn push icon="play_arrow" color="primary" @click="sendDoc(doc)" />
        </q-btn-group>
      </div>
    </div>

    <q-dialog v-model="fixed">
      <q-dialog-send :docs="docsObj" :tab="tab"></q-dialog-send>
    </q-dialog>
  </div> -->
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import Header from './components/Header'
import Document from './components/Document'
import Views from './components/Views'

import axios from "axios";
import userList from "./user.json";


export default {
  name: "assistant",
  components: {
    AHeader: Header,
    ADocument: Document,
    AViews: Views,
  },
  computed: {
    ...mapState({
          list: state => state.assistant.aList,
        }),
  }

  // methods: {
  //   sizeFunc(b) {
  //     if (b / 1024 > 1024) {
  //       return (b / 1024 / 1024).toFixed(1) + " мб";
  //     } else {
  //       return (b / 1024).toFixed(1) + " кб";
  //     }
  //   },
  //   changeDocs(slelect) {
  //     axios
  //       .get("/tasks/pomoshnik/" + slelect)
  //       .then(response => {
  //         this.docs = response.data;
  //         console.log(this.docs);
  //       })
  //       .catch(error => {
  //         console.log("error");
  //       });
  //   },
  //   sendSelDocs() {
  //     this.docsObj = [];
  //     if (this.selection.length !== 0) {
  //       this.selection.forEach(el => {
  //         this.docsObj.push(el);
  //       });
  //       this.fixed = true;
  //     }
  //   },
  //   sendDoc(doc) {
  //     this.docsObj = [];
  //     this.docsObj.push(doc);
  //     this.fixed = true;
  //   },

  //   test123(newSelected) {
  //     const data = [];
  //     for (let i = 0; i < newSelected.length; i++) {
  //       data.push(newSelected[i].id);
  //     }
  //     // eslint-disable-next-line
  //   },
  //   downloadFile(item) {
  //     axios({
  //       method: "get",
  //       url: "/files/" + item.id,
  //       responseType: "arraybuffer"
  //     }).then(function(response) {
  //       let blob = new Blob([response.data], { type: "application/pdf" });
  //       let link = document.createElement("a");
  //       link.href = window.URL.createObjectURL(blob);
  //       link.download = item.name.slice(0, -4);
  //       link.click();
  //     });
  //   },
  //   getRowTable(val) {
  //     this.bar = true;
  //     this.rowData = val.row;
  //   },
  //   simulateProgress(number, val) {
  //     this[`loading${number}`] = true;
  //     this.saveTask(val);
  //     setTimeout(() => {
  //       this[`loading${number}`] = false;
  //       this.onRefresh();
  //     }, 2000);
  //   },
  //   findKey(array) {
  //     var uid = [];
  //     var dep = [];
  //     array.forEach(element => {
  //       uid.push(element.uid);
  //       dep.push(element.dep_id);
  //     });
  //     return { uid, dep };
  //   },
  //   onRefresh() {
  //     this.loading = true;
  //     axios
  //       .get("/files/docs/all")
  //       .then(res => {
  //         this.desserts = res.data;
  //       })
  //       .catch(err => {
  //         this.error = err;
  //       });
  //   },
  //   saveTask(val) {
  //     var userInf = this.findKey(this.modelMultiple);

  //     var formData = {
  //       uids: userInf.uid,
  //       dep_ids: userInf.dep,
  //       doc_id: val.id,
  //       h_uid: this.modelSupervisor.uid,
  //       h_dep_id: this.modelSupervisor.dep_id,
  //       type: 1,
  //       doc_status: this.signedButton ? 2 : 1,
  //       status_u: "",
  //       task_order: "",
  //       doc_message: this.modelTemplate
  //     };
  //     // eslint-disable-next-line

  //     axios({
  //       method: "POST",
  //       url: "tasks",
  //       data: formData,
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("access_token")
  //       }
  //     });
  //   },
  //   resetDialog() {
  //     (this.modelMultiple = []),
  //       (this.modelSupervisor = []),
  //       (this.modelTemplate = []),
  //       (this.signedButton = false);
  //   },
  //   conv_size(b) {
  //     const fsizekb = b / 1024;
  //     const fsizemb = fsizekb / 1024;
  //     const fsizegb = fsizemb / 1024;
  //     const fsizetb = fsizegb / 1024;
  //     var fsize = "";

  //     if (fsizekb <= 1024) {
  //       fsize = fsizekb.toFixed() + " кб";
  //     } else if (fsizekb >= 1024 && fsizemb <= 1024) {
  //       fsize = fsizemb.toFixed() + " мб";
  //     } else if (fsizemb >= 1024 && fsizegb <= 1024) {
  //       fsize = fsizegb.toFixed() + " гб";
  //     } else {
  //       fsize = fsizetb.toFixed() + " тб";
  //     }

  //     return fsize;
  //   }
  // },
  // beforeCreate: function() {
  //   axios
  //     .get("/files/docs/all")
  //     .then(res => {
  //       this.desserts = res.data;
  //       console.log(this.desserts);
  //     })
  //     .catch(err => {
  //       this.error = err;
  //     });
  //   axios
  //     .get("dicts/organs")
  //     .then(response => {
  //       this.selectOrgan = response.data;
  //     })
  //     .catch(error => {
  //       this.selectOrgan = error;
  //     });
  //   axios
  //     .get("/tasks/pomoshnik/1")
  //     .then(response => {
  //       console.log("data", response.data);
  //       this.docs = response.data;
  //     })
  //     .catch(error => {
  //       console.log("error");
  //       this.selectOrgan = error;
  //     });
  // }
};
</script>
<style lang="scss" scoped>

// .sub_menu {
//   padding: 10px 0;
//   margin: 10px 0;
//   display: flex;
// }
// .sub_menu div {
//   padding-left: 10px;
//   margin-right: 10px;
//   color: #8b8b8b;
//   cursor: pointer;
//   font-size: 12px;
// }
// .sub_menu div.active {
//   font-weight: bold;
// }
// .sub_menu div + div {
//   border-left: 1px #c2c2c2 solid;
// }
// .docBlock {
//   border-top: 1px #c2c2c2 solid;
//   padding: 30px 15px;
//   color: #8b8b8b;
// }
// .docBlock:hover {
//   background: #f2f2f2;
// }
// .docBlock div {
//   padding-right: 5px;
// }
// .docBlock span {
//   color: black;
//   float: left;
//   display: block;
//   padding-right: 5px;
// }
// .check {
//   padding: 0 10px;
//   width: 65px;
//   margin-right: 10px;
// }
// .check_div {
//   background: #f2f2f2;
//   padding: 5px;
//   border-radius: 10px;
// }
// .despBlock {
//   display: flex;
//   font-size: 14px;
// }
// .despBlock + .despBlock {
//   border-left: 1px #c2c2c2 solid;
//   padding: 0 15px;
//   margin-right: 15px;
// }
// .text {
//   font-size: 16px;
//   padding-bottom: 15px;
// }
// .actions {
//   width: 200px;
// }
</style>



