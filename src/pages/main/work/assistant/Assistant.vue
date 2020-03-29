<template>
  <div class="q-pa-md">
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
        <q-input dense outlined square v-model="filter" placeholder="Поиск">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:top-left>
        <div class="q-gutter-lg">
          <q-btn v-if="selected.length > 0"><q-icon name="post_add"/></q-btn>
          <q-btn>test</q-btn>
          <q-btn>test</q-btn>
        </div>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props" style="background-">
          <div>
            {{ props.row.id }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-journal_name="props">
        <q-td :props="props">
          <div>
            Наименование:
            <span class="my-table-details">{{ props.row.fio }}</span
            ><br />
            Журналь:
            <span class="my-table-details">{{ props.row.journal }}</span
            ><br />
            Орган:
            <span class="my-table-details">{{ props.row.organ }}</span
            ><br />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-out_number="props">
        <q-td :props="props">
          <div>
            №: <span class="my-table-details">{{ props.row.out_number }}</span
            ><br />
            от: <span class="my-table-details">{{ props.row.out_date }}</span>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-in_number="props">
        <q-td :props="props">
          <div>
            №: <span class="my-table-details">{{ props.row.in_number }}</span
            ><br />
            от: <span class="my-table-details">{{ props.row.in_date }}</span>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-format_name="props">
        <q-td :props="props">
          <div>
            Листов.:
            <span class="my-table-details"
              >{{ props.row.paper_count }} &nbsp;/&nbsp;{{
                props.row.format
              }}</span
            ><br />
            Размер:
            <span class="my-table-details">{{
              conv_size(props.row.file.file_size)
            }}</span
            ><br />
            Файл:
            <q-icon
              name="attachment"
              size="25px"
              color="red"
              @click="downloadFile(props.row)"
            >
              <q-tooltip
                content-class="bg-green"
                content-style="font-size: 16px"
                :offset="[10, 10]"
              >
                Скачать
              </q-tooltip>
            </q-icon>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-description="props">
        <q-td :props="props">
          <div class="my-table-details">
            {{ props.row.description }}
          </div>
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
            <span class="taskMessSty">{{ props.row.task_message }}</span
            ><br /><br />
            <span><b>(Мирсоатов А.К.)</b></span
            ><br />
            <span>[{{ props.row.in_date }}]</span>
          </div>
          <div v-else>
            Не рассмотрен
          </div>
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
            ></q-icon
            >&nbsp;&nbsp;
            <q-icon
              v-if="props.row.tasks !== null"
              name="o_print"
              size="25px"
              color="secondary"
            ></q-icon>
          </div>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="bar" square persistent>
      <q-card class="dialog">
        <q-bar>
          <div>Документ Ид {{ rowData.doc_id }}</div>
          <q-space />
          <q-btn
            dense
            flat
            icon="close"
            v-close-popup
            color="red"
            @click="resetDialog()"
          >
            <q-tooltip>Закрыт</q-tooltip>
          </q-btn>
        </q-bar>
        <q-form @submit="simulateProgress(4, rowData)">
          <q-card-section>
            <span class="section-title text-bold">Содержание:</span>
            <div class="section-desc">{{ rowData.description }}</div>
          </q-card-section>
          <q-card-section>
            <span class="section-desc-title text-bold">Поручение:</span>
            <div>
              <!-- <q-badge color="secondary" class="q-mb-md">
                                USER ID: {{ modelMultiple || '[]' }}
                            </q-badge> -->
              <q-select
                square
                outlined
                v-model="modelMultiple"
                multiple
                :options="options"
                use-chips
                stack-label
                label="Выберите исполнителей"
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
            <span class="section-title text-bold">Резолюция:</span>
            <div class="section-supervisor">
              <q-select
                v-model="modelSupervisor"
                square
                outlined
                dense
                stack-label
                :options="optSupervisor"
                label="Выберите руководителя"
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
            <span class="section-title text-bold">Шаблон поручений:</span>
            <q-select
              v-model="modelTemplate"
              outlined
              square
              clearable
              :options="optTemplate"
              option-value="text"
              option-label="text"
              label="Выберите шаблон"
              emit-value
              stack-label
              map-options
            ></q-select>
          </q-card-section>
          <q-card-section>
            <!-- <q-input outlined dense square v-model="date">
                        <template v-slot:append>
                            <q-icon name="o_event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date today-btn v-model="date" @input="() => $refs.qDateProxy.hide()" mask="YYYY-MM-DD" />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>                 -->
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-checkbox v-model="signedButton" color="red" dense />
                </q-item-section>
                <q-item-section caption>
                  <q-item-label>{{
                    signedButton ? "Подписан" : "Не подписан"
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="left">
            <q-btn
              :loading="loading4"
              color="primary"
              class="full-width"
              type="submit"
            >
              Сохранить
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                Подождите...
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
export default {
  name: "assistant",
  data() {
    return {
      selected: [],
      pagination: {
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      img: false,
      image:
        "http://10.8.88.219/index.php?module=Tools&file=phones&prefix=profile&act=img&uid=",
      columns: [
        {
          name: "id",
          label: "ИД",
          field: "id",
          align: "left",
          sortable: true,
          style: "width: 50px"
        },
        {
          name: "journal_name",
          label: "Документ",
          field: "journal_name",
          align: "left",
          style: "width: 300px"
        },
        {
          name: "out_number",
          label: "Исходяший",
          field: "out_number",
          align: "left",
          style: "width: 150px"
        },
        {
          name: "in_number",
          label: "Входяший",
          field: "in_number",
          align: "left",
          style: "width: 150px"
        },
        {
          name: "description",
          label: "Содержание",
          field: "description",
          align: "left",
          style: "width: 400px"
        },
        {
          name: "format_name",
          label: "Файл",
          field: "format_name",
          align: "left",
          style: "width: 250px"
        },
        {
          name: "users",
          label: "Исполнители",
          field: "users",
          align: "left",
          style: "max-width: 300px"
        },
        {
          name: "action",
          label: "Действия",
          field: "action",
          align: "center",
          style: "width: 50px"
        }
      ],
      loading: true,
      desserts: [],
      filter: "",
      selectOrgan: null,
      bar: false,
      rowData: [],
      signedButton: false,
      loading4: false,
      date: "2019-02-01",

      // USER SELECT DATA
      modelMultiple: [],
      modelSupervisor: {},
      modelTemplate: "",
      options: userList.rows,
      optSupervisor: userList.rows2,
      optTemplate: [
        { id: "1", text: "Пусто" },
        { id: "2", text: "Прошу рассмотреть." },
        { id: "3", text: "Прошу рассмотреть в установленном порядке" },
        {
          id: "4",
          text: "Прошу рассмотреть в установленном порядке, согласно поручению"
        },
        { id: "5", text: "Для использования в работе" },
        { id: "6", text: "К исполнению " },
        { id: "7", text: "К сведению" },
        { id: "8", text: "Прошу организовать встречу" },
        { id: "9", text: "Прошу провести переговоры" },
        { id: "10", text: "Прошу в установленном порядке взять на контроль" },
        {
          id: "11",
          text:
            "Прошу рассмотреть в установленном порядке и принять необходимые меры"
        },
        {
          id: "12",
          text: "Прошу рассмотреть в установленном порядке и доложить"
        },
        {
          id: "13",
          text: "Прошу в установленном порядке взять на контроль и доложить"
        },
        {
          id: "14",
          text: "Прошу в установленном порядке подготовить информацию"
        }
      ]
    };
  },
  methods: {
    test123(newSelected) {
      const data = [];
      for (let i = 0; i < newSelected.length; i++) {
        data.push(newSelected[i].id);
      }
      // eslint-disable-next-line
      console.log(data);
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
      console.log(formData);

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
  }
};
</script>
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
.my-table-details {
  /* font-size: 0.85em; */
  font-size: 0.9em;
  font-style: italic;
  max-width: 500px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
  text-decoration: underline;
}
.mainStyle {
  border: 1px solid #ccc;
  padding: 2px;
  background-color: #abebc6;
}
.taskMessSty {
  width: 10px;
  white-space: normal;
  font-size: 0.9em;
  font-style: italic;
}
.my-table-header {
  font-size: 1.9em;
  white-space: normal;
  color: #555;
}
a {
  text-decoration: underline; /* Добавляем подчеркивание 
                                   при наведении курсора мыши на ссылку */
}
.dialog {
  min-width: 600px;
  .section-desc {
    border: 1px solid #ccc;
    min-height: 30px;
    padding: 5px;
    font-style: italic;
    margin-top: 5px;
  }
  .section-supervisor {
    margin-top: 5px;
  }
  .section-template {
    border: 1px solid #ccc;
    min-height: 30px;
    padding: 5px;
    font-style: italic;
    margin-bottom: 5px;
  }
}
.tableHeader {
  color: blue;
}
</style>
