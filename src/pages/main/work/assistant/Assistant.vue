<template>
  <div class="q-pa-md">
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
      <div>удалить</div>
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
          <div class="col despBlock">
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
          <div class="col despBlock">
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
          <div class="col despBlock">
            <div>
              <q-icon name="description" />
            </div>
            <div>
              <span>{{doc.paper_count}} лист / {{doc.format}}</span>
              <br />
              <i>{{sizeFunc(doc.file.file_size)}}</i>
            </div>
          </div>
          <div v-if="doc.tasks === null" class="col despBlock">
            <div>
              <q-icon name="history" />
            </div>
            <div>Не расмотрен</div>
          </div>
          <!-- <div v-if="tab === 'tab1' && doc.tasks === null" class="col despBlock">
            <q-btn color="white text-black" icon="person" size="sm" label="Ответсвенные" @click="dialogPopup = true" />
            <q-dialog 
              v-model="dialogPopup"
            >
              <q-dialog-popup></q-dialog-popup>             
            </q-dialog>
          </div>-->
          <div class="col despBlock">
            <div>
              <q-icon name="person" />
            </div>
            <div>
              <span>от:</span>
              <strong>{{doc.signed_by}}</strong>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1 text-right actions">
        <q-btn-group push>
          <q-btn push icon="cloud_download" />
          <q-btn push icon="print" />
          <q-btn push icon="play_arrow" color="primary" @click="sendDoc(doc)" />
        </q-btn-group>
      </div>
    </div>

    <!-- старая таблица -->
    <q-table
      :data="desserts"
      :columns="columns"
      :filter="filter"
      separator="cell"
      row-key="id"
      table-header-class="bg-blue-5 text-white"
      table-style="max-height: 750px;"
      :pagination.sync="pagination"
      selection="multiple"
      :selected.sync="selected"
      @update:selected="test123"
      class="my-sticky-header-table"
    >
      <template v-slot:top-right>
        <q-input dense outlined square v-model="filter" :placeholder="$t('actions.search')">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:top-left>
        <div class="q-gutter-lg">
          <q-btn v-if="selected.length > 0">
            <q-icon name="post_add" />
          </q-btn>
          <q-btn>test</q-btn>
          <q-btn>test</q-btn>
        </div>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props" style="background-">
          <div>{{ props.row.id }}</div>
        </q-td>
      </template>

      <template v-slot:body-cell-journal_name="props">
        <q-td :props="props">
          <div>
            Наименование:
            <span class="my-table-details">{{ props.row.fio }}</span>
            <br />Журналь:
            <span class="my-table-details">{{ props.row.journal }}</span>
            <br />Орган:
            <span class="my-table-details">{{ props.row.organ }}</span>
            <br />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-out_number="props">
        <q-td :props="props">
          <div>
            №:
            <span class="my-table-details">{{ props.row.out_number }}</span>
            <br />от:
            <span class="my-table-details">{{ props.row.out_date }}</span>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-in_number="props">
        <q-td :props="props">
          <div>
            №:
            <span class="my-table-details">{{ props.row.in_number }}</span>
            <br />от:
            <span class="my-table-details">{{ props.row.in_date }}</span>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-format_name="props">
        <q-td :props="props">
          <div>
            Листов.:
            <span class="my-table-details">
              {{ props.row.paper_count }} &nbsp;/&nbsp;{{
              props.row.format
              }}
            </span>
            <br />Размер:
            <span class="my-table-details">
              {{
              conv_size(props.row.file.file_size)
              }}
            </span>
            <br />Файл:
            <q-icon name="attachment" size="25px" color="red" @click="downloadFile(props.row)">
              <q-tooltip
                content-class="bg-green"
                content-style="font-size: 16px"
                :offset="[10, 10]"
              >Скачать</q-tooltip>
            </q-icon>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-description="props">
        <q-td :props="props">
          <div class="my-table-details">{{ props.row.description }}</div>
        </q-td>
      </template>

      <template v-slot:body-cell-users="props">
        <q-td :props="props">
          <div v-if="props.row.tasks !== null">
            <div v-for="(subusers, index) in props.row.tasks" :key="index">
              <span :class="[index == 0 ? 'mainStyle' : '']">
                {{ subusers.u_name }}
                <q-icon v-if="subusers.children == true" name="home" />
              </span>
            </div>
            <br />
            <q-separator />
            <span class="taskMessSty">{{ props.row.task_message }}</span>
            <br />
            <br />
            <span>
              <b>(Мирсоатов А.К.)</b>
            </span>
            <br />
            <span>[{{ props.row.in_date }}]</span>
          </div>
          <div v-else>Не рассмотрен</div>
        </q-td>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div>
            <q-icon
              v-if="selected.length <= 0"
              name="o_post_add"
              size="25px"
              color="#17202A"
              @click="getRowTable(props)"
            ></q-icon>&nbsp;&nbsp;
            <q-icon v-if="props.row.tasks !== null" name="o_print" size="25px" color="secondary"></q-icon>
          </div>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="bar" square persistent>
      <q-card class="dialog">
        <q-bar>
          <div>{{$t('tables.work.document_num')}} {{ rowData.doc_id }}</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup color="red" @click="resetDialog()">
            <q-tooltip>Закрыт</q-tooltip>
          </q-btn>
        </q-bar>
        <q-form @submit="simulateProgress(4, rowData)">
          <q-card-section>
            <span class="section-title text-bold">{{$t('tables.work.content')}}:</span>
            <div class="section-desc">{{ rowData.description }}</div>
          </q-card-section>
          <q-card-section>
            <span class="section-desc-title text-bold">{{$t('tables.work.assistant.task')}}:</span>
            <div>
              <q-select
                square
                outlined
                v-model="modelMultiple"
                multiple
                :options="options"
                use-chips
                stack-label
                :label="$t('tables.work.choose_executor')"
                option-value="uid"
                option-label="fio"
                :rules="[
                  val => (val && val.length > 0) || 'Выберите исполнителей'
                ]"
                dense
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section>
                      <q-item-label v-html="scope.opt.fio" />
                      <q-item-label caption>{{ scope.opt.dep }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </q-card-section>
          <q-card-section>
            <span class="section-title text-bold">{{$t('tables.work.resolution')}}:</span>
            <div class="section-supervisor">
              <q-select
                v-model="modelSupervisor"
                square
                outlined
                dense
                stack-label
                :options="optSupervisor"
                :label="$t('tables.work.choose_executive')"
                option-value="uid"
                option-label="fio"
                :rules="[
                  val => (val && val.uid > 0) || 'Выберите руководителя'
                ]"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section>
                      <q-item-label v-html="scope.opt.fio" />
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </q-card-section>
          <q-card-section>
            <span class="section-title text-bold">{{$t('tables.work.assistant.task_template')}}:</span>
            <q-select
              v-model="modelTemplate"
              outlined
              square
              clearable
              :options="optTemplate"
              option-value="text"
              option-label="text"
              :label="$t('tables.work.assistant.choose_template')"
              emit-value
              stack-label
              map-options
            ></q-select>
          </q-card-section>
          <q-card-section></q-card-section>
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-checkbox v-model="signedButton" color="red" dense />
                </q-item-section>
                <q-item-section caption>
                  <q-item-label>
                    {{
                    signedButton ? "Подписан" : "Не подписан"
                    }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="left">
            <q-btn :loading="loading4" color="primary" class="full-width" type="submit">
              Сохранить
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />Подождите...
              </template>
            </q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import axios from "axios";
import userList from "./user.json";
import QDialogPopup from "./dialog";
import QDialogSend from "./dialog-send";

export default {
  name: "assistant",
  components: {
    QDialogPopup,
    QDialogSend
  },
  data() {
    return {
      tab: "tab1",
      dialogPopup: false,
      selection: [],
      fixed: false,
      model: null,
      group: "op1",
      shape: [],
      docs: [],
      docId: [],
      description: [],
      taskMes: "Пусто",
      docsObj: []
    };
  },

  methods: {
    sizeFunc(b) {
      if (b / 1024 > 1024) {
        return (b / 1024 / 1024).toFixed(1) + " мб";
      } else {
        return (b / 1024).toFixed(1) + " кб";
      }
    },
    changeDocs(slelect) {
      axios
        .get("/tasks/pomoshnik/" + slelect)
        .then(response => {
          this.docs = response.data;
          console.log(this.docs);
        })
        .catch(error => {
          console.log("error");
        });
    },
    sendSelDocs() {
      this.docsObj = [];
      if (this.selection.length !== 0) {
        this.selection.forEach(el => {
          this.docsObj.push(el);
        });
        this.fixed = true;
      }
    },
    sendDoc(doc) {
      this.docsObj = [];
      this.docsObj.push(doc);
      this.fixed = true;
    },

    test123(newSelected) {
      const data = [];
      for (let i = 0; i < newSelected.length; i++) {
        data.push(newSelected[i].id);
      }
      // eslint-disable-next-line
    },
    downloadFile(item) {
      axios({
        method: "get",
        url: "/files/" + item.file.id,
        responseType: "arraybuffer"
      }).then(function(response) {
        let blob = new Blob([response.data], { type: "application/pdf" });
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = item.in_number;
        link.click();
      });
    },
    getRowTable(val) {
      this.bar = true;
      this.rowData = val.row;
    },
    simulateProgress(number, val) {
      this[`loading${number}`] = true;
      this.saveTask(val);
      setTimeout(() => {
        this[`loading${number}`] = false;
        this.onRefresh();
      }, 2000);
    },
    findKey(array) {
      var uid = [];
      var dep = [];
      array.forEach(element => {
        uid.push(element.uid);
        dep.push(element.dep_id);
      });
      return { uid, dep };
    },
    onRefresh() {
      this.loading = true;
      axios
        .get("/files/docs/all")
        .then(res => {
          this.desserts = res.data;
        })
        .catch(err => {
          this.error = err;
        });
    },
    saveTask(val) {
      var userInf = this.findKey(this.modelMultiple);

      var formData = {
        uids: userInf.uid,
        dep_ids: userInf.dep,
        doc_id: val.id,
        h_uid: this.modelSupervisor.uid,
        h_dep_id: this.modelSupervisor.dep_id,
        type: 1,
        doc_status: this.signedButton ? 2 : 1,
        status_u: "",
        task_order: "",
        doc_message: this.modelTemplate
      };
      // eslint-disable-next-line

      axios({
        method: "POST",
        url: "tasks",
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      });
    },
    resetDialog() {
      (this.modelMultiple = []),
        (this.modelSupervisor = []),
        (this.modelTemplate = []),
        (this.signedButton = false);
    },
    conv_size(b) {
      const fsizekb = b / 1024;
      const fsizemb = fsizekb / 1024;
      const fsizegb = fsizemb / 1024;
      const fsizetb = fsizegb / 1024;
      var fsize = "";

      if (fsizekb <= 1024) {
        fsize = fsizekb.toFixed() + " кб";
      } else if (fsizekb >= 1024 && fsizemb <= 1024) {
        fsize = fsizemb.toFixed() + " мб";
      } else if (fsizemb >= 1024 && fsizegb <= 1024) {
        fsize = fsizegb.toFixed() + " гб";
      } else {
        fsize = fsizetb.toFixed() + " тб";
      }

      return fsize;
    }
  },
  beforeCreate: function() {
    axios
      .get("/files/docs/all")
      .then(res => {
        this.desserts = res.data;
        console.log(this.desserts);
      })
      .catch(err => {
        this.error = err;
      });
    axios
      .get("dicts/organs")
      .then(response => {
        this.selectOrgan = response.data;
      })
      .catch(error => {
        this.selectOrgan = error;
      });
    axios
      .get("/tasks/pomoshnik/1")
      .then(response => {
        console.log("data", response.data);
        this.docs = response.data;
      })
      .catch(error => {
        console.log("error");
        this.selectOrgan = error;
      });
  }
};
</script>
<style lang="scss" scoped>
.sub_menu {
  padding: 10px 0;
  margin: 10px 0;
  display: flex;
}
.sub_menu div {
  padding-left: 10px;
  margin-right: 10px;
  color: #8b8b8b;
  cursor: pointer;
  font-size: 12px;
}
.sub_menu div.active {
  font-weight: bold;
}
.sub_menu div + div {
  border-left: 1px #c2c2c2 solid;
}
.docBlock {
  border-top: 1px #c2c2c2 solid;
  padding: 30px 15px;
  color: #8b8b8b;
}
.docBlock:hover {
  background: #f2f2f2;
}
.docBlock div {
  padding-right: 5px;
}
.docBlock span {
  color: black;
  float: left;
  display: block;
  padding-right: 5px;
}
.check {
  padding: 0 10px;
  width: 65px;
  margin-right: 10px;
}
.check_div {
  background: #f2f2f2;
  padding: 5px;
  border-radius: 10px;
}
.despBlock {
  display: flex;
  font-size: 14px;
}
.despBlock + .despBlock {
  border-left: 1px #c2c2c2 solid;
  padding: 0 15px;
  margin-right: 15px;
}
.text {
  font-size: 16px;
  padding-bottom: 15px;
}
.actions {
  width: 200px;
}
</style>


<style lang="sass">
.my-sticky-header-table
  .q-table__middle
    max-height: 200px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  &.q-table--loading thead tr:last-child th
    top: 48px
</style>
<style lang="scss">
// .my-table-details {
//   /* font-size: 0.85em; */
//   font-size: 0.9em;
//   font-style: italic;
//   max-width: 500px;
//   white-space: normal;
//   color: #555;
//   margin-top: 4px;
//   text-decoration: underline;
// }
// .mainStyle {
//   border: 1px solid #ccc;
//   padding: 2px;
//   background-color: #abebc6;
// }
// .taskMessSty {
//   width: 10px;
//   white-space: normal;
//   font-size: 0.9em;
//   font-style: italic;
// }
// .my-table-header {
//   font-size: 1.9em;
//   white-space: normal;
//   color: #555;
// }
// a {
//   text-decoration: underline; /* Добавляем подчеркивание
//                                    при наведении курсора мыши на ссылку */
// }
// .dialog {
//   min-width: 600px;
//   .section-desc {
//     border: 1px solid #ccc;
//     min-height: 30px;
//     padding: 5px;
//     font-style: italic;
//     margin-top: 5px;
//   }
//   .section-supervisor {
//     margin-top: 5px;
//   }
//   .section-template {
//     border: 1px solid #ccc;
//     min-height: 30px;
//     padding: 5px;
//     font-style: italic;
//     margin-bottom: 5px;
//   }
// }
// .tableHeader {
//   color: blue;
// }
</style>
