<template>
  <div class="creditList">
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
            <th v-if="userRole === 'CS'" class="text-left"></th>
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
              <button class="filter" idx="manager">
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
            <th v-if="userRole === 'CS'" class="text-left"></th>
          </tr>
        </thead>
        <tbody v-if="loaderList">
          <tr>
            <td colspan="10"><appLoader /></td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(credit, index) of credits" :key="credit.id">
            <!-- <tr v-for="(credit, index) of [1]" :key="index"> -->
            <td class="text-center number applicationRow">
              <template v-if="userRole === 'CS'">
                {{ index + 1 }}
              </template>
              <router-link
                v-else
                :to="{
                  name: userRole === 'CRM' ? 'Profile' : 'CreditTask',
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
              <template v-if="userRole === 'CS'">
                {{ credit.applicationNumber }}
              </template>
              <router-link
                v-else
                :to="{
                  name: userRole === 'CRM' ? 'Profile' : 'CreditTask',
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
              <template v-if="userRole === 'CS'">
                {{ credit.client }}
              </template>
              <router-link
                v-else
                :to="{
                  name: userRole === 'CRM' ? 'Profile' : 'CreditTask',
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
              <template v-if="userRole === 'CS'">
                {{ credit.kmfio }}
              </template>
              <router-link
                v-else
                :to="{
                  name: userRole === 'CRM' ? 'Profile' : 'CreditTask',
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
              <template v-if="userRole === 'CS'">
                {{ credit.filial }}
              </template>
              <router-link
                v-else
                :to="{
                  name: userRole === 'CRM' ? 'Profile' : 'CreditTask',
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
              <template v-if="userRole === 'CS'">
                {{ credit.filialName }}
              </template>
              <router-link
                v-else
                :to="{
                  name: userRole === 'CRM' ? 'Profile' : 'CreditTask',
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
              <template v-if="userRole === 'CS'">
                {{ credit.taskName }}
              </template>
              <router-link
                v-else
                :to="{
                  name: userRole === 'CRM' ? 'Profile' : 'CreditTask',
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
              <template v-if="userRole === 'CS'">
                {{ credit.taskStatus }}
              </template>
              <router-link
                v-else
                :to="{
                  name: userRole === 'CRM' ? 'Profile' : 'CreditTask',
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
              <template v-if="userRole === 'CS'">
                {{ credit.date | formatDate('datetime') }}
              </template>
              <router-link
                v-else
                :to="{
                  name: userRole === 'CRM' ? 'Profile' : 'CreditTask',
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

            <td v-if="userRole === 'CS'" class="text-left print">
              <div class="text-blue q-gutter-md">
                
                <!-- <template v-if="userRole === 'CS'"> -->
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
        :max="max"
        :max-pages="maxPage"
        :boundary-numbers="true"
        @click="pagination()"
      >
      </q-pagination>
    </div>

    <appLoaderFullScreen v-if="loaderFullScreen" />

    <!-- {{loadings}} -->
  </div>
</template>

<script>
import printJS from "print-js";
import CommonUtils from "@/shared/utils/CommonUtils";
import formatDate from "../../filters/formatDate"
import Loader from "@/components/Loader";
import LoaderFullScreen from "@/components/LoaderFullScreen";

export default {
  props: ['loaderList'],
  data() {
    return {
      // userRole: this.$store.getters.userRole,
      // loadings: this.$store.getters["credits/loadings"], // кнопки распечатать
      current: 1,
      countRow: 10,
      creditList: 100,
      max: 10,
      maxPage: 6,
      countRowList: [
        {
          label: 10,
          value: 10,
        },
        {
          label: 20,
          value: 20,
        },
        {
          label: 30,
          value: 30,
        },
        {
          label: "Все",
          value: "All",
        }
      ],
      loadings1: false,
      disable: false,
      loaderFullScreen: false,
      fileData: {
        type: "protocol",
        lang: this.$store.getters["common/getLangNum"] - 1, //0 - рус, 1 - узб
        data: {
          // protocol_initiative_unit: "",
          // protocol_client_inn: "",
          // protocol_lending_currency: "",
          // protocol_loan_amount: "",
          // protocol_repayment_type: "",
          // protocol_customer_name: "",
          // protocol_term: "",
          // protocol_grace_period: "",
          // protocol_finance_source: "",
          // protocol_loan_product: "",
          // protocol_loan_type: "",
          // protocol_percent_rate: "",
          // protocol_credit_rating: "",
          // protocol_request_number: "",
          // protocol_loan_specialist_position: "",
          // protocol_loan_specialist_fio: "",
          // protocol_number: "",
          // protocol_filial: "",
          // protocol_committee_decision_number: "",
          // protocol_committee_decision_date: "",
          // protocol_guarantor_name: "",
          // protocol_guarantor_value: "",
          // protocol_insurance_name: "",
          // protocol_insurance_value: "",
          // protocol_additional_name: "",
          // protocol_additional_value: "",
          // protocol_special_name: "",
          // protocol_special_value: "",
          // protocol_secretary_fio: ""
        }
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
    // console.log('lang', this.$store.getters["common/getLangNum"])
    const filters = document.querySelectorAll(".filter");
    for (let filter of filters) {
      filter.addEventListener("click", () => this.toggleFilter(filter));
    }
  },
  computed: {
    // Фильтры
    credits() {
      return this.$store.getters["credits/creditTasks"].filter(task => {
        let conditions = [true];
        if (this.applicationNumber.length > 0) {
          conditions.push(
            task.applicationNumber.indexOf(this.applicationNumber) > -1
          );
        }

        if (this.client.length > 0) {
          conditions.push(task.client.indexOf(this.client) > -1);
        }

        if (this.manager.length > 0) {
          conditions.push(task.manager.indexOf(this.manager) > -1);
        }

        if (this.MFO.length > 0) {
          conditions.push(task.filial.indexOf(this.MFO) > -1);
        }

        if (this.filialName.length > 0) {
          conditions.push(task.filialName.indexOf(this.filialName) > -1);
        }

        if (this.taskName.length > 0) {
          conditions.push(task.taskName.indexOf(this.taskName) > -1);
        }

        if (this.taskStatus.length > 0) {
          conditions.push(task.taskStatus.indexOf(this.taskStatus) > -1);
        }

        if (this.date.length > 0) {
          conditions.push(formatDate(task.date, 'datetime').indexOf(this.date) > -1);
        }

        return conditions.every(condition => condition);
      });
    },

    // loadings() {
    //   const loadings = []
    //   for (let i = 0; i < this.$store.getters["credits/creditTasks"].length; i++) {
    //     loadings[i] = false
    //   }
    //   console.log('loading', this.loadings)
    //   return loadings
    // },

    loadings() {
      return this.$store.getters["credits/loadings"] 
    },

    userRole() {
      return this.$store.getters["credits/userRole"];
    }
  },
  watch: {
    
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
      this.$store.getters["credits/creditTasks"].sort((a, b) => {
        const itemA = a[idx];
        const itemB = b[idx];
        if (order) {
          //console.log('sort')
          if (itemA < itemB) {
            //console.log('sorting')
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

    async creditSign(taskId) {
      this.$emit("renderComponent", 1) // для ререндеринга списка заявок
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
        const res = await this.$store.dispatch(
          "credits/confirmationCredit",
          confirmCreditData
        );

        console.log('response', JSON.stringify(res, null, 2))

        if(res.nextTask.name) {
          this.loaderFullScreen = false;
          this.$store.commit("credits/setMessage", "Credit signed");
        } else {
          throw "Data is null";
        }
      } catch (error) {
        this.loaderFullScreen = false;
        const errorMessage = CommonUtils.filterServerError(error);
        this.$store.commit("credits/setMessage", errorMessage);
        sessionStorage.clear()
        this.$router.push("/work/credit");
      }
    },

    // async getDataFile() {
    //   try {
    //     this.fileData = await this.$store.dispatch("credits/geDataFile")
    //   } catch(error) {}
    // },

    async printFile(taskId, idx) {
      // this.disable = true
      // this.loadings.splice(idx, 1, true) // для ререндеринга (особенность vue)

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
      window.URL.revokeObjectURL(file);
      // this.loadings.splice(idx, 1, false)
      // this.disable = false
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

    // async getUrlFile(taskId) {
    //   // this.loadings1 = true
    //   this.disable = true
    //   let file = null
    //   try {
    //     if (this.$store.getters["credits/fileId"]) {
    //       // debugger
    //       file = await this.$store.dispatch(
    //         "credits/getFile",
    //         this.$store.getters["credits/fileId"]
    //       );
    //     } else {
    //       // debugger
    //       const { data } = await this.$store.dispatch("profile/getFullForm", taskId)

    //       // this.fileData.data = (data.input.find(i => i.label == 'extractProtocol')).data
    //       this.fileData.data = this.dataTransform((data.input.find(i => i.label == 'extractProtocol')).data)
    //       // const fileData = (data.input.find(i => i.label == 'extractProtocol')).data

    //       console.log(JSON.stringify(this.fileData, null, 2))

    //       file = await this.$store.dispatch(
    //         "credits/getFile",
    //         this.fileData
    //       );
    //     }
    //     // this.loadings1 = false
    //     this.disable = false
    //     return file
    //   } catch(error) {
    //     // this.loadings1 = false
    //     this.disable = false
    //   }
    // },

    async getUrlFile(taskId, idx) {
      // this.loadings1 = true
      this.disable = true
      this.loadings.splice(idx, 1, true) // для ререндеринга (особенность vue)
      let file = null
      try {
          // debugger
          const { data } = await this.$store.dispatch("profile/getFullForm", taskId)

          // this.fileData.data = (data.input.find(i => i.label == 'extractProtocol')).data
          this.fileData.data = this.dataTransform((data.input.find(i => i.label == 'extractProtocol')).data)
          // const fileData = (data.input.find(i => i.label == 'extractProtocol')).data

          console.log(JSON.stringify(this.fileData, null, 2))

          file = await this.$store.dispatch(
            "credits/getFile",
            this.fileData
          );
        // this.loadings1 = false
        this.disable = false
        this.loadings.splice(idx, 1, false)
        return file
      } catch(error) {
        // this.loadings1 = false
        this.disable = false
        this.loadings.splice(idx, 1, false)
      }
    },

    dataTransform(data) {
      // debugger
      for (let i in data) {
        if (data[i] != null) {
          if (data[i].items) {
            data[i] = data[i].items
            this.dataTransform(data[i])
          }
        }
      }
      return data
    },

    pagination() {
      console.log('current', this.current)
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

  th,
  td {
    padding: 2px;
  }

  td {
    /* word-break: break-all; */
    white-space: pre-wrap;
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
</style>
