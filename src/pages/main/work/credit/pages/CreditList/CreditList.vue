<template>
  <div>
    <div v-if="userRole.find(i => i === 'ROLE_CCS')" class="pullDocs">
      <q-input
        outlined
        dense
        label="Выберите дату"
        v-model="dateDoc"
        mask="##.##.####"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
              ref="qDateDoc"
            >
              <q-date
                mask="DD.MM.YYYY"
                v-model="dateDoc"
                @input="() => $refs.qDateDoc.hide()"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-select
        class="langDoc"
        outlined
        v-model="langDoc"
        :options="options.langDoc"
        dense
        label="Выберите язык"
        emit-value
        map-options
      />

      <div class="protocol">
        <q-btn
          :loading="protocol"
          label="Протокол"
          class="btnCCS"
          @click="getProtocol"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </div>

      <!-- <div class="discharge">
        <q-btn
          :loading="protocol"
          label="Выписка"
          class="btnCCS"
          @click="getProtocol"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </div> -->
    </div>
  

  <!-- <div 
    v-if="creditTasks.length"
    class="creditList"
  > -->

  <div 
    v-if="creditTasks.length"
    class="creditList"
  >
    <div class="q-px-md">
      <!-- <h4>Очередь задач</h4> -->
      <q-markup-table separator="none">
        <thead>
          <tr>
            <!-- <th class="text-left"></th> -->
            <th class="text-left applicationNumber" colspan="2">
              <q-input
                square
                outlined
                v-model="applicationNumber"
                dense
                label="Введите номер заявки"
              />
            </th>
            <th class="text-left client">
              <q-input
                square
                outlined
                v-model="client"
                dense
                label="Введите наименование клиента"
              />
            </th>

            <th class="text-left manager">
              <q-input
                square
                outlined
                v-model="manager"
                dense
                label="Введите наименование менеджера"
              />
            </th>

            <th class="text-left MFO">
              <q-input
                square
                outlined
                v-model="MFO"
                dense
                label="Введите наименование МФО"
              />
            </th>

            <th class="text-left filialName">
              <q-input
                square
                outlined
                v-model="filialName"
                dense
                label="Введите наименование филиала"
              />
            </th>

            <th class="text-left taskName">
              <!-- <q-select
                square
                outlined
                v-model="taskName"
                :options="options.taskName"
                dense
                label="Задача"
              /> -->

              <q-input
                square
                outlined
                v-model.lazy="taskName"
                dense
                label="Введите наименование задачи"
              />
            </th>

            <th class="text-left taskStatus">
              <!-- <q-select
                square
                outlined
                v-model="taskStatus"
                :options="options.taskStatus"
                dense
                label="Статус"
              /> -->
              <q-input
                square
                outlined
                v-model="taskStatus"
                dense
                label="Введите наименование статуса"
              />
            </th>
            <th class="text-left date" colspan="2">
              <q-input
                outlined
                square
                dense
                label="Выберите дату"
                v-model="date"
                mask="##.##.####"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                      ref="qDate"
                    >
                      <q-date
                        mask="DD.MM.YYYY"
                        v-model="date"
                        @input="() => $refs.qDate.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </th>
            <!-- <th v-if="userRole === 'ROLE_CCS'" class="text-left">
              <div class="protocol">
                <q-btn
                  :loading="protocol"
                  label="Протокол"
                  class="btnCCS"
                  @click="getProtocol"
                >
                  <template v-slot:loading>
                    <q-spinner-facebook />
                  </template>
                </q-btn>
              </div>
            </th> -->
          </tr>

          <tr class="titleApplication">
            <th class="text-center number"><span>#</span></th>
            <th class="text-left applicationNumber">
              <button class="filter" idx="applicationNumber">
                Заявка
              </button>
            </th>
            <th class="text-left client">
              <button class="filter" idx="client">
                Клиент
              </button>
            </th>

            <th class="text-left manager">
              <button class="filter" idx="kmfio">
                Менеджер
              </button>
            </th>

            <th class="text-left MFO">
              <button class="filter" idx="filial">
                MFO
              </button>
            </th>

            <th class="text-left filialName">
              <button class="filter" idx="filialName">
                Филиал
              </button>
            </th>

            <th class="text-left taskName">
              <button class="filter" idx="taskName">
                Задача
              </button>
            </th>

            <th class="text-left taskStatus">
              <button class="filter" idx="taskStatus">
                Статус
              </button>
            </th>
            <th class="text-left date">
              <button class="filter" idx="date">
                Дата
              </button>
            </th>
            <th v-if="userRole.find(i => i === 'ROLE_CCS')" class="text-left"></th>
          </tr>
        </thead>
        <tbody v-if="loaderList || loading">
          <tr>
            <td colspan="10"><appLoader /></td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr 
            v-for="(credit, index) of credits" 
            :key="credit.id"
            :class="{ time: credit.time, creditCompleate: credit.creditCompleate}"  
            
          >
            <!-- <tr v-for="(credit, index) of [1]" :key="index"> -->
            <td class="text-center number applicationRow">
              <appCreditListItem
                :userRole="userRole" 
                :credit="credit"
                :linkName="index + 1"
              />
            </td>

            <td class="text-left applicationNumber applicationRow">
              <appCreditListItem
                :userRole="userRole" 
                :credit="credit"
                :linkName="credit.applicationNumber"
              />
            </td>

            <td class="text-left client applicationRow">
              <appCreditListItem 
                :userRole="userRole"
                :credit="credit"
                :linkName="credit.client"
              />
            </td>

            <td class="text-left manager applicationRow">
              <appCreditListItem 
                :userRole="userRole"
                :credit="credit"
                :linkName="credit.kmfio"
              />
            </td>

            <td class="text-left MFO applicationRow">
              <appCreditListItem 
                :userRole="userRole"
                :credit="credit"
                :linkName="credit.filial"
              />
            </td>

            <td class="text-left filialName applicationRow">
              <appCreditListItem 
                :userRole="userRole"
                :credit="credit"
                :linkName="credit.filialName"
              />
            </td>

            <td class="text-left taskName applicationRow">
              <appCreditListItem 
                :userRole="userRole"
                :credit="credit"
                :linkName="credit.taskName"
              />
            </td>

            <td class="text-left taskStatus applicationRow">
              <appCreditListItem 
                :userRole="userRole"
                :credit="credit"
                :linkName="credit.taskStatus"
              />
            </td>

            <td class="text-left date applicationRow">
              <appCreditListItem 
                :userRole="userRole"
                :credit="credit"
                :linkName="credit.date | formatDate('datetime')"
              />
            </td>

            <td v-if="userRole.find(i => i === 'ROLE_CCS')" class="print">
              <div class="btnBlock">
                
                <!-- <template v-if="userRole === 'ROLE_CCS'"> -->
                  <!-- <q-btn
                    :disable="disable"
                    class="btnCCS"
                    label="Подписать"
                    @click="creditSign(credit.taskId)"
                  />  -->

                  <q-btn 
                    :disable="disable"
                    class="btnPrint"
                    icon="print"
                    label="(рус.)"
                    @click="printFile(credit.taskId, index)" 
                    :loading="loadings[index]"
                  >
                  <!-- {{ credits[index] }} -->
                    <template v-slot:loading>
                      <q-spinner-facebook />
                    </template>
                    <q-tooltip>Печать</q-tooltip>
                  </q-btn>

                  <q-btn 
                    :disable="disable"
                    class="btnPrint"
                    icon="print" 
                    label="(узб.)"
                    @click="printFile(credit.taskId, index + creditCount, 1)" 
                    :loading="loadings[index + creditCount]"
                  >
                  <!-- {{ credits[index] }} -->
                    <template v-slot:loading>
                      <q-spinner-facebook />
                    </template>
                    <q-tooltip>Печать</q-tooltip>
                  </q-btn>

                  <!-- <q-btn 
                    :disable="disable"
                    icon="print" 
                    @click="printFile(credit.taskId)" 
                  /> -->
                  
                  <!-- <q-btn 
                    :disable="disable"
                    icon="cloud_download" 
                    @click="downloadFile(credit.taskId)" 
                    :loading="loadings[index]"
                  >
                    <template v-slot:loading>
                      <q-spinner-facebook />
                    </template>
                    <q-tooltip>Скачать</q-tooltip>
                  </q-btn> -->

                  <!-- <q-btn 
                    :disable="disable"
                    icon="cloud_download" 
                    @click="downloadFile(credit.taskId)" 
                  /> -->
                <!-- </template> -->
              </div>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <!-- <iframe id="pdf" name="pdf" :src="link"></iframe> -->
    </div>

    <div class="q-pa-lg flex justify-end items-center pagination">
      <span class="pagination__title">Строк на странице: </span>
      <q-select 
        class="pagination__count"
        borderless
        v-model="countRow" 
        :options="countRowList" 
        emit-value
        map-options
      />

      <q-pagination
        v-model="current"
        color="primary"
        :max="pages"
        :max-pages="maxPage"
        :boundary-numbers="true"
        @click="pagination"
      >
      </q-pagination>
    </div>

    <appLoaderFullScreen v-if="loaderFullScreen" />

    <!-- {{loadings}} -->

    <!-- <iframe style="display: none" id="pdf-frame"></iframe> -->
  </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import printJS from "print-js";

import CreditListItem from "./Components/CreditListItem"

import CommonUtils from "@/shared/utils/CommonUtils";
import formatDate from "../../filters/formatDate"
import dataTransform from "../../filters/dataTransform"
import Loader from "@/components/Loader";
import LoaderFullScreen from "@/components/LoaderFullScreen";

export default {
  props: ['loaderList', 'getTasks'],
  data() {
    return {
      current: 1,
      // current: sessionStorage.getItem('currentPage') ? +sessionStorage.getItem('currentPage') : 1,
      countRow: 10,
      maxPage: 6,
      loading: false,
      protocol: false,
      protocolId: null,
      dateDoc: "",
      langDoc: this.$store.getters["common/getLangNum"] - 1, //0 - рус, 1 - узб
      
      disable: false,
      loaderFullScreen: false,
      fileData: {
        type: "protocol",
        // lang: this.$store.getters["common/getLangNum"] - 1, //0 - рус, 1 - узб
        lang: 0, //0 - рус, 1 - узб
        data: {}
      },
      // link: null,
      applicationNumber: "",
      client: "",
      manager: "",
      MFO: "",
      filialName: "",
      taskName: "",
      taskStatus: "",
      date: "",
      //sort: "",
      options: {
        taskName: [
          "Ввод данных по заявке",
          "Проверка заявки",
          "Голосование КК",
          "Формирование выписки"
        ],
        taskStatus: [
          "Ввод данных по заявке",
          "Проверка заявки",
          "Голосование КК",
          "Формирование выписки"
        ],
        
        langDoc: [
          {
            label: "рус.",
            value: 0
          },
          {
            label: "узб.",
            value: 1
          }
        ]
        //sort: ["По убыванию", "По возрастанию"]
      }
    };
  },
  mounted() {
    // console.log('pages', this.pages)
    // console.log('lang', this.$store.getters["common/getLangNum"])
    setTimeout(() => {
      const filters = document.querySelectorAll(".filter");
      for (let filter of filters) {
        filter.addEventListener("click", () => this.toggleFilter(filter));
      }
    }, 1000)
    
  },
  watch: {
    countRow(val) {
      console.log(val)
      this.current = 1
      this.pagination()
    }, 
    // Сброс кэширование id протокола
    dateDoc() {
      this.protocolId = null
    },
    langDoc() {
      this.protocolId = null
    }
  },
  computed: {
    ...mapState({
          pages: state => state.credits.pages,
          countRowList: state => state.credits.countRowList,
          creditTasks: state => state.credits.creditTasks,
          loadings: state => state.credits.loadings,
          userRole: state => state.credits.userRole, 
          creditCount: state => state.credits.creditCount
        }),
    
    // ...mapGetters({
    //       creditTasks: "credits/creditTasks"
    //     }),

    // Фильтры
    credits() {
      return this.creditTasks.filter(task => {
        let conditions = [true];
        if (this.applicationNumber.length > 0) {
          if (!task.applicationNumber) {
            conditions.push(false)
          } else {
            conditions.push(
              task.applicationNumber.toLowerCase().indexOf(this.applicationNumber.toLowerCase()) > -1
            );
          }
        }

        if (this.client.length > 0) {
          if (!task.client) {
            conditions.push(false)
          } else {
            conditions.push(task.client.toLowerCase().indexOf(this.client.toLowerCase()) > -1);
          }
        }

        if (this.manager.length > 0) {
          if (!task.kmfio) {
            conditions.push(false)
          } else {
            conditions.push(task.kmfio.toLowerCase().indexOf(this.manager.toLowerCase()) > -1);
          }
        }

        if (this.MFO.length > 0) {
          if (!task.filial) {
            conditions.push(false)
          } else {
            conditions.push(task.filial.toLowerCase().indexOf(this.MFO.toLowerCase()) > -1);
          }
        }

        if (this.filialName.length > 0) {
          if (!task.filialName) {
            conditions.push(false)
          } else {
            conditions.push(task.filialName.toLowerCase().indexOf(this.filialName.toLowerCase()) > -1);
          }
        }

        if (this.taskName.length > 0) {
          if (!task.taskName) {
            conditions.push(false)
          } else {
            conditions.push(task.taskName.toLowerCase().indexOf(this.taskName.toLowerCase()) > -1);
          }
        }

        if (this.taskStatus.length > 0) {
          if (!task.taskStatus) {
            conditions.push(false)
          } else {
            conditions.push(task.taskStatus.toLowerCase().indexOf(this.taskStatus.toLowerCase()) > -1);
          }
        }

        if (this.date.length > 0) {
          if (!task.date) {
            conditions.push(false)
          } else {
            conditions.push(formatDate(task.date, 'datetime').indexOf(this.date) > -1);
          }
        }

        return conditions.every(condition => condition);
      });
    }
  },
  methods: {
    toggleFilter(event) {
      const idx = event.getAttribute("idx");
      console.log('idx', idx)

      
      
      // event.classList.toggle("active");
      if (event.classList.contains("active")) {
        this.removeClasses()
        event.classList.add("passive");
      } else {
        this.removeClasses()
        event.classList.add("active");
      }

      if (event.classList.contains("active")) {
        this.sortValue(idx);
      } else {
        this.sortValue(idx, false);
      }
    },

    removeClasses() {
      for (let item of document.querySelectorAll(".active")) {
        item.classList.remove("active");
      }

      for (let item of document.querySelectorAll(".passive")) {
        item.classList.remove("passive");
      }
    },

    sortValue(idx, order = true) {
      console.log('sort', idx)
      console.log('creditTasks', this.creditTasks)
      this.creditTasks.sort((a, b) => {
        const itemA = a[idx];
        const itemB = b[idx];
        if (order) {
          if (itemA < itemB) {
            // console.log('sorting')
            return -1;
          }
          if (itemA > itemB) {
            return 1;
          }
        } else {
          if (itemB < itemA) {
            return -1;
          }
          if (itemB > itemA) {
            return 1;
          }
        }

        return 0;
      });
    },

    async getProtocol() {
      this.protocol = true
      const data = {
        date: this.dateDoc,
        lang: this.langDoc
      }
      try {
        let file = null

        if (this.protocolId) {
          file = await this.$store.dispatch(
            "credits/getFile",
            this.protocolId
          );
        } else {
          file = await this.$store.dispatch("credits/getProtocol", data)
          this.protocolId = file.id  // кеширование id file
        }
        console.log('file', file)

        //console.log('credits', this.credits)
        printJS(file.url);
        this.protocol = false
      } catch(error) {
        this.protocol = false
        this.$store.commit(
          "credits/setMessage", 
          {
            message: CommonUtils.filterServerError(error),
            code: 0
          }
        );
        this.loaderFullScreen = false;
      }
    },

    async creditSign(taskId) {

      this.loaderFullScreen = true;
      this.$store.commit("credits/setTaskId", taskId);
      const confirmCreditData = {
        output: [
          {
            name: "confirm",
            data: true
          }
        ]
      };
      try {
        const response = await this.$store.dispatch(
          "credits/confirmationCredit",
          confirmCreditData
        );

        console.log('response', JSON.stringify(response, null, 2))

        if (response) {
          this.$store.commit(
            "credits/setMessage",
            {
              message: "Credit signed",
              code: 1
            } 
          );
          this.$store.commit("credits/removeTask", taskId)
        }

        this.loaderFullScreen = false;
      } catch (error) {
        this.$store.commit(
          "credits/setMessage",
          {
            message: CommonUtils.filterServerError(error),
            code: 0
          }
        );
        this.loaderFullScreen = false;
      }
    },

    async printFile(taskId, idx, lang = 0) {
      await this.$store.dispatch(
          "credits/setHeaderRole",
          'ROLE_CCS'
        );
      
      let task = this.credits.find(i => i.taskId == taskId)
      
      let file = null
      const docId = task[lang] ? task[lang] : null

      if (docId) {
        file = await this.$store.dispatch(
          "credits/getFile",
          docId
        );
      } else {
        
        file = await this.getUrlFile(taskId, idx, lang)
        console.log('file', file)
        
        task[lang] = file.id  // кеширование id file
        
      }
      console.log('file', file)

      //console.log('credits', this.credits)
      printJS(file.url);
      // document.querySelector('#pdf-frame').src = '';
      // document.querySelector('#pdf-frame').src = file.url;

      // window.setTimeout(function() {
      //   document.querySelector('#pdf-frame').contentWindow.print();
      //   document.querySelector('#pdf-frame').contentWindow.onafterprint = function(event) {console.log("afterPring")};
      // }, 1000)

      window.URL.revokeObjectURL(file.url);
      
    },

    async downloadFile(taskId) {
        const file = await this.getUrlFile(taskId, idx)
        console.log('filelll', file)
        let link = document.createElement("a");
        link.href = file.url;
        link.download = file.fileName;
        link.click();
        window.URL.revokeObjectURL(file);
    },

    async getUrlFile(taskId, idx, lang) {
      this.disable = true
      this.loadings.splice(idx, 1, true) // для ререндеринга (особенность vue)
      let file = null
      try {
          const response = await this.$store.dispatch("profile/getFullForm", taskId)
          
          if (response) {
            this.fileData.lang = lang
            if (lang == 0) {
              this.fileData.data = dataTransform((response.data.input.find(i => i.label == 'extractProtocol')).data)
            } else {
              this.fileData.data = dataTransform((response.data.input.find(i => i.label == 'extractProtocol_uz')).data)
            }
            
            this.fileData.data.protocol_secretary_fio = this.$store.getters["auth/fullName"]

            console.log(JSON.stringify(this.fileData, null, 2))

            file = await this.$store.dispatch(
              "credits/getFile",
              this.fileData
            );
          }

        this.disable = false
        this.loadings.splice(idx, 1, false)
        return file
      } catch(error) {
        this.$store.commit(
          "credits/setMessage", 
          {
            message: CommonUtils.filterServerError(error),
            code: 0
          }
        );
        this.disable = false
        this.loadings.splice(idx, 1, false)
      }
    },

    // dataTransform(data) {
    //   // debugger
    //   for (let i in data) {
    //     if (data[i] != null) {
    //       if (data[i].items) {
    //         data[i] = data[i].items
    //         this.dataTransform(data[i])
    //       }
    //     }
    //   }
    //   return data
    // },

    async pagination() {
      try {
        //sessionStorage.setItem('currentPage', this.current)
        this.loading = true
        await this.$store.dispatch(`credits/${this.getTasks}`, {page: this.current, count: this.countRow})
        this.loading = false
      } catch (error) {}
      
    }
  },
  components: {
    appLoader: Loader,
    appLoaderFullScreen: LoaderFullScreen,
    appCreditListItem: CreditListItem
  },
  filters: {
    formatDate
  }
};
</script>

<style lang="scss">
.creditList {
  .q-table {
    border-spacing: 0 10px;
  }

  .items-start {
    background: #FFFFFF;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
  }

  .q-field--square .q-field__control {
    border-radius: 5px !important;
  }

  .q-table__card {
    background: transparent;
    box-shadow: none;
  }

  // tr:nth-child(2n) {
  //   background: #e8edff;
  // }
  .q-table {
    thead {
      tr {
        background: transparent;
      }
    }

    // tbody {
    //   tr {
    //     &:hover {
    //       &:hover{
    //         background: rgba(0, 0, 0, 0.1) !important;
    //         border-radius: 5px;
    //       }
    //     }
    //   }
    // }

    tr {
      background: #FFFFFF;
      border: 2px solid #FFFFFF;
      box-sizing: border-box;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
      border-radius: 5px;
    }

    td:first-child {
      border-radius: 5px 0 0 5px;
    }

    td:last-child {
      border-radius: 0 5px 5px 0;
    }
  }

  th {
    padding: 0 20px 0 0;
  }

  th:last-child {
    padding: 0;
  }

  td {
    padding: 0;
    white-space: pre-wrap;
    &:before {
      background: rgba(0, 0, 0, 0.15) !important;
      // background: none;
    }
  }

  .time {
    // background: rgba(255, 129, 129, 0.5) !important;
    // background: rgba(255, 74, 74, 0.5) !important;
    background: #FFE9E9 !important;
  }

  .creditCompleate {
    // background: rgba(99, 195, 148, 0.5) !important;
    // background: rgba(71, 184, 129, 0.5) !important;
    background:#E5F5ED !important;
  }

  .number {
    width: 5%;
    padding: 0;

    a, span {
      justify-content: center;
      padding-right: 0 !important;
    }

    span {
      font-size: 12px;
      color: #A0A5BA;
    }
  }

  .applicationNumber {
    width: 9%;
  }

  .client,
  .manager,
  .MFO,
  .filialName,
  .taskName,
  .taskStatus,
  .date {
    width: 11%;
  }

  .print {
    width: 6%;

    .btnBlock {
      display: flex;
    
      .btnPrint {
        margin: 0;
        background: transparent;
        color: #74798c;
        width: 80px;

        .q-btn__wrapper:before {
          box-shadow: none;
        }

        .q-btn__wrapper {
          padding: 4px;
        }

        .on-left {
          margin-right: 2px;
        }
      }
    }
  }

  // .protocol {
  //   display: flex;
  //   justify-content: flex-end;

  //   .btnCCS {
  //     background: #47B881;
  //     color: #ffffff;
  //     margin: 0;
  //   }
  // }

  .filter {
    width: 100%;
    height: 40px;
    padding-left: 0;
    outline: none;
    border: none;
    background: inherit;
    cursor: pointer;
    text-align: left;
    color: #A0A5BA;
    font-size: 12px;
    text-transform: uppercase;

    // &:after {
    //   content: "";
    //   float: right;
    //   border: 1px solid #0054FE;
    //   border-width: 0 3px 3px 0;
    //   padding: 3px;
    //   border-radius: 2px;
    //   margin-top: 4px;
    //   transform: rotate(45deg);
    // }
  }

  .passive {
    &:after {
      content: "";
      float: right;
      border: 1px solid #0054FE;
      border-width: 0 3px 3px 0;
      padding: 3px;
      border-radius: 2px;
      margin-top: 4px;
      transform: rotate(45deg);
    }
  }

  .active {
    &:after {
      content: "";
      float: right;
      border: 1px solid #0054FE;
      border-width: 0 3px 3px 0;
      padding: 3px;
      border-radius: 2px;
      margin-top: 4px;
      transform: rotate(-135deg);
    }
  }

  .applicationRow {
    cursor: pointer;

    a,span {
      display: flex;
      text-decoration: none;
      color: inherit;
      width: 100%;
      height: 100%;
      align-items: center;
      padding-right: 20px;
    }
  }

  .pagination {
    .q-btn--rectangle {
      background: transparent;
    }

    &__title {
      margin: -3px 5px 0 0;
    }

    &__count {
      margin: 0 20px 0 0;
      background: transparent;
      border: none;
    }
  }
}

.pullDocs {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    // width: 100%;

    .items-start {
      margin-right: 15px;
      background: #ffffff;
    }

    .q-btn--rectangle {
      background: #47B881 !important;
    }

    .langDoc {
      width: 140px;
    }
  }

</style>
