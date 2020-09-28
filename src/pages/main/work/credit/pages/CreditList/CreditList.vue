<template>
  <div>
    <div v-if="userRole === 'ROLE_CCS'" class="protocol">
      <q-btn
        :loading="protocol"
        label="Протокол"
        color="green"
        @click="getProtocol"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>

  <div 
    v-if="creditTasks.length"
    class="creditList"
  >
    
    
    <div class="q-pa-md">
      <!-- <h4>Очередь задач</h4> -->
      <q-markup-table>
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
              <q-select
                square
                outlined
                v-model="taskName"
                :options="options.taskName"
                dense
                label="Задача"
              />
            </th>

            <th class="text-left taskStatus">
              <q-select
                square
                outlined
                v-model="taskStatus"
                :options="options.taskStatus"
                dense
                label="Статус"
              />
            </th>
            <th class="text-left date">
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
            <th v-if="userRole === 'ROLE_CCS'" class="text-left"></th>
          </tr>

          <tr class="titleApplication">
            <th class="text-center number"><span>№</span></th>
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
            <th v-if="userRole === 'ROLE_CCS'" class="text-left"></th>
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
              <template v-if="userRole === 'ROLE_CCS'">
                {{ index + 1 }}
              </template>
              <router-link
                v-else
                :to="{
                  name: userRole === 'ROLE_KM' ? 'Profile' : 'CreditTask',
                  params: { id: credit.id },
                  query: {
                    taskId: credit.taskId,
                    date: credit.date,
                    applicationNumber: credit.applicationNumber,
                    filialName: credit.filialName,
                    protocolNumber: credit.additionalInfo
                      ? credit.additionalInfo.protocolNumber
                      : null
                  }
                }"
                >{{ index + 1 }}</router-link
              >
            </td>

            <td class="text-left applicationNumber applicationRow">
              <template v-if="userRole === 'ROLE_CCS'">
                {{ credit.applicationNumber }}
              </template>
              <router-link
                v-else
                :to="{
                  name: credit.taskName === 'PreApprove'
                    ?  'Registration'
                    : userRole === 'ROLE_KM'
                      ? 'Profile'
                      : 'CreditTask',
                  params: { id: credit.id },
                  query: {
                    taskId: credit.taskId,
                    date: credit.date,
                    applicationNumber: credit.applicationNumber,
                    filialName: credit.filialName
                  }
                }"
                >{{ credit.applicationNumber }}</router-link
              >
            </td>

            <td class="text-left client applicationRow">
              <template v-if="userRole === 'ROLE_CCS'">
                {{ credit.client }}
              </template>
              <router-link
                v-else
                :to="{
                  name: credit.taskName === 'PreApprove'
                    ?  'Registration'
                    : userRole === 'ROLE_KM'
                      ? 'Profile'
                      : 'CreditTask',
                  params: { id: credit.id },
                  query: {
                    taskId: credit.taskId,
                    date: credit.date,
                    applicationNumber: credit.applicationNumber,
                    filialName: credit.filialName
                  }
                }"
                >{{ credit.client }}</router-link
              >
            </td>

            <td class="text-left manager applicationRow">
              <template v-if="userRole === 'ROLE_CCS'">
                {{ credit.kmfio }}
              </template>
              <router-link
                v-else
                :to="{
                  name: credit.taskName === 'PreApprove'
                    ?  'Registration'
                    : userRole === 'ROLE_KM'
                      ? 'Profile'
                      : 'CreditTask',
                  params: { id: credit.id },
                  query: {
                    taskId: credit.taskId,
                    date: credit.date,
                    applicationNumber: credit.applicationNumber,
                    filialName: credit.filialName
                  }
                }"
                >{{ credit.kmfio }}</router-link
              >
            </td>

            <td class="text-left MFO applicationRow">
              <template v-if="userRole === 'ROLE_CCS'">
                {{ credit.filial }}
              </template>
              <router-link
                v-else
                :to="{
                  name: credit.taskName === 'PreApprove'
                    ?  'Registration'
                    : userRole === 'ROLE_KM'
                      ? 'Profile'
                      : 'CreditTask',
                  params: { id: credit.id },
                  query: {
                    taskId: credit.taskId,
                    date: credit.date,
                    applicationNumber: credit.applicationNumber,
                    filialName: credit.filialName
                  }
                }"
                >{{ credit.filial }}</router-link
              >
            </td>

            <td class="text-left filialName applicationRow">
              <template v-if="userRole === 'ROLE_CCS'">
                {{ credit.filialName }}
              </template>
              <router-link
                v-else
                :to="{
                  name: credit.taskName === 'PreApprove'
                    ?  'Registration'
                    : userRole === 'ROLE_KM'
                      ? 'Profile'
                      : 'CreditTask',
                  params: { id: credit.id },
                  query: {
                    taskId: credit.taskId,
                    date: credit.date,
                    applicationNumber: credit.applicationNumber,
                    filialName: credit.filialName
                  }
                }"
                >{{ credit.filialName }}</router-link
              >
            </td>

            <td class="text-left taskName applicationRow">
              <template v-if="userRole === 'ROLE_CCS'">
                {{ credit.taskName }}
              </template>
              <router-link
                v-else
                :to="{
                  name: credit.taskName === 'PreApprove'
                    ?  'Registration'
                    : userRole === 'ROLE_KM'
                      ? 'Profile'
                      : 'CreditTask',
                  params: { id: credit.id },
                  query: {
                    taskId: credit.taskId,
                    date: credit.date,
                    applicationNumber: credit.applicationNumber,
                    filialName: credit.filialName
                  }
                }"
                >{{ credit.taskName }}</router-link
              >
            </td>

            <td class="text-left taskStatus applicationRow">
              <template v-if="userRole === 'ROLE_CCS'">
                {{ credit.taskStatus }}
              </template>
              <router-link
                v-else
                :to="{
                  name: credit.taskName === 'PreApprove'
                    ?  'Registration'
                    : userRole === 'ROLE_KM'
                      ? 'Profile'
                      : 'CreditTask',
                  params: { id: credit.id },
                  query: {
                    taskId: credit.taskId,
                    date: credit.date,
                    applicationNumber: credit.applicationNumber,
                    filialName: credit.filialName
                  }
                }"
                >{{ credit.taskStatus }}</router-link
              >
            </td>

            <td class="text-left date applicationRow">
              <template v-if="userRole === 'ROLE_CCS'">
                {{ credit.date | formatDate('datetime') }}
              </template>
              <router-link
                v-else
                :to="{
                  name: credit.taskName === 'PreApprove'
                    ?  'Registration'
                    : userRole === 'ROLE_KM'
                      ? 'Profile'
                      : 'CreditTask',
                  params: { id: credit.id },
                  query: {
                    taskId: credit.taskId,
                    date: credit.date,
                    applicationNumber: credit.applicationNumber,
                    filialName: credit.filialName
                  }
                }"
                >{{ credit.date | formatDate('datetime')}}</router-link
              >
            </td>

            <td v-if="userRole === 'ROLE_CCS'" class="text-left print">
              <div class="text-blue q-gutter-md">
                
                <!-- <template v-if="userRole === 'ROLE_CCS'"> -->
                  <q-btn 
                    :disable="disable"
                    icon="print" 
                    @click="printFile(credit.taskId, index)" 
                    :loading="loadings[index]"
                  >
                  <!-- {{ credits[index] }} -->
                    <template v-slot:loading>
                      <q-spinner-facebook />
                    </template>
                    <q-tooltip>Распечатать</q-tooltip>
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

                  <q-btn
                    :disable="disable"
                    class="full-width"
                    label="Подписать"
                    color="green"
                    @click="creditSign(credit.taskId)"
                  />
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
      countRow: 10,
      maxPage: 6,
      loading: false,
      protocol: false,
      protocolId: null,
      
      disable: false,
      loaderFullScreen: false,
      fileData: {
        type: "protocol",
        lang: this.$store.getters["common/getLangNum"] - 1, //0 - рус, 1 - узб
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
    }
  },
  computed: {
    ...mapState({
          pages: state => state.credits.pages,
          countRowList: state => state.credits.countRowList,
          creditTasks: state => state.credits.creditTasks,
          loadings: state => state.credits.loadings,
          userRole: state => state.credits.userRole
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
              task.applicationNumber.indexOf(this.applicationNumber) > -1
            );
          }
        }

        if (this.client.length > 0) {
          if (!task.client) {
            conditions.push(false)
          } else {
            conditions.push(task.client.indexOf(this.client) > -1);
          }
        }

        if (this.manager.length > 0) {
          if (!task.kmfio) {
            conditions.push(false)
          } else {
            conditions.push(task.kmfio.indexOf(this.manager) > -1);
          }
        }

        if (this.MFO.length > 0) {
          if (!task.filial) {
            conditions.push(false)
          } else {
            conditions.push(task.filial.indexOf(this.MFO) > -1);
          }
        }

        if (this.filialName.length > 0) {
          if (!task.filialName) {
            conditions.push(false)
          } else {
            conditions.push(task.filialName.indexOf(this.filialName) > -1);
          }
        }

        if (this.taskName.length > 0) {
          if (!task.taskName) {
            conditions.push(false)
          } else {
            conditions.push(task.taskName.indexOf(this.taskName) > -1);
          }
        }

        if (this.taskStatus.length > 0) {
          if (!task.taskStatus) {
            conditions.push(false)
          } else {
            conditions.push(task.taskStatus.indexOf(this.taskStatus) > -1);
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
      for (let item of document.querySelectorAll(".active")) {
        if (item !== event) {
          item.classList.remove("active");
        }
      }
      event.classList.toggle("active");
      if (event.classList.contains("active")) {
        this.sortValue(idx);
      } else {
        this.sortValue(idx, false);
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
      try {
        let file = null

        if (this.protocolId) {
          file = await this.$store.dispatch(
            "credits/getFile",
            this.protocolId
          );
        } else {
          file = await this.$store.dispatch("credits/getProtocol")
          this.protocolId = file.id  // кеширование id file
        }
        console.log('file', file)

        //console.log('credits', this.credits)
        printJS(file.url);
        this.protocol = false
      } catch(error) {
        this.protocol = false
        this.$store.commit("credits/setMessage", CommonUtils.filterServerError(error));
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
          this.$store.commit("credits/setMessage", "Credit signed");
          this.$store.commit("credits/removeTask", taskId)
        }

        this.loaderFullScreen = false;
      } catch (error) {
        this.$store.commit("credits/setMessage", CommonUtils.filterServerError(error));
        this.loaderFullScreen = false;
      }
    },

    async printFile(taskId, idx) {
      
      let task = this.credits.find(i => i.taskId == taskId)
      
      let file = null

      if (task.idFile) {
        file = await this.$store.dispatch(
          "credits/getFile",
          task.idFile
        );
      } else {
        
        file = await this.getUrlFile(taskId, idx)
        
        task.idFile = file.id  // кеширование id file
        
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

    async getUrlFile(taskId, idx) {
      this.disable = true
      this.loadings.splice(idx, 1, true) // для ререндеринга (особенность vue)
      let file = null
      try {
          const response = await this.$store.dispatch("profile/getFullForm", taskId)
          
          if (response) {
            // this.fileData.data = this.dataTransform((response.data.input.find(i => i.label == 'extractProtocol')).data)
            this.fileData.data = dataTransform((response.data.input.find(i => i.label == 'extractProtocol')).data)
          
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
        this.$store.commit("credits/setMessage", CommonUtils.filterServerError(error));
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
        this.loading = true
        await this.$store.dispatch(`credits/${this.getTasks}`, {page: this.current, count: this.countRow})
        this.loading = false
      } catch (error) {}
      
    }
  },
  components: {
    appLoader: Loader,
    appLoaderFullScreen: LoaderFullScreen
  },
  filters: {
    formatDate
  }
};
</script>

<style lang="scss">
.creditList {
  tr:nth-child(2n) {
    background: #e8edff;
  }

  th {
    padding: 2px;
  }

  td {
    padding: 0;
  }

  td {
    /* word-break: break-all; */
    white-space: pre-wrap;
  }

  .time {
    background: rgba(255, 129, 129, 0.5) !important;
  }

  .creditCompleate {
    background: rgba(99, 195, 148, 0.5) !important;
  }

  .number {
    width: 3%;
    span {
      font-size: 16px;
      color: #093475;
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
  }

  .filter {
    width: 100%;
    height: 40px;
    border: none;
    background: inherit;
    cursor: pointer;
    text-align: left;
    color: #093475;
    font-size: 16px;

    &:after {
      content: "";
      float: right;
      border: 1px solid $blue;
      border-width: 0 3px 3px 0;
      padding: 4px;
      margin-top: 4px;
      transform: rotate(45deg);
    }
  }

  .active {
    &:after {
      content: "";
      float: right;
      border: 1px solid $blue;
      border-width: 0 3px 3px 0;
      padding: 4px;
      margin-top: 4px;
      transform: rotate(-135deg);
    }
  }

  .applicationRow {
    cursor: pointer;

    a {
      display: flex;
      text-decoration: none;
      color: inherit;
      width: 100%;
      height: 100%;
      align-items: center;
      padding: 0 5px;
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
    }
  }
}

.protocol {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
