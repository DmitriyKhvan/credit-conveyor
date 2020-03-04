<template>
  <div class="q-pa-md">
    <h4>Очередь заявок {{ tasks }}</h4>
    <q-markup-table>
      <thead>
        <tr>
          <!-- <th class="text-left"></th> -->
          <th class="text-left" colspan="2">
            <q-input
              square
              outlined
              v-model="application"
              dense
              label="Введите номер заявки"
            />
          </th>
          <th class="text-right">
            <q-input
              square
              outlined
              v-model="client"
              dense
              label="Введите ноименование клиента"
            />
          </th>
          <th class="text-right">
            <q-select
              square
              outlined
              v-model="status"
              :options="options.status"
              dense
              label="Статус"
            />
          </th>
          <th class="text-right" colspan="2">
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
        </tr>

        <tr class="titleApplication">
          <th class="text-center number"><span>№</span></th>
          <th class="text-left application">
            <button class="filter" idx="applicationNumber">
              Заявка
            </button>
          </th>
          <th class="text-left client">
            <button class="filter" idx="clientName">
              Клиент
            </button>
          </th>
          <th class="text-left status">
            <button class="filter" idx="applicationStatus">
              Статус
            </button>
          </th>
          <th class="text-left date">
            <button class="filter" idx="modifiedDate">
              Дата
            </button>
          </th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of applications" :key="item.id">
          <router-link
            :to="{
              name: 'CreditCommiteeTask',
              params: { id: item.applicationId },
              query: {
                date: item.modifiedDate,
                applicationNumber: item.applicationNumber,
                protocolNumber: item.additionalInfo
                  ? item.additionalInfo.protocolNumber
                  : null
              }
            }"
            tag="td"
            class="text-center number applicationRow"
            >{{ index + 1 }}</router-link
          >

          <router-link
            :to="'creditCommiteeTask/' + item.id"
            tag="td"
            class="text-left number applicationRow"
            >{{ item.applicationNumber }}</router-link
          >

          <router-link
            :to="'creditCommiteeTask/' + item.id"
            tag="td"
            class="text-left number applicationRow"
            >{{ item.clientName }}</router-link
          >

          <router-link
            :to="'creditCommiteeTask/' + item.id"
            tag="td"
            class="text-left number applicationRow"
            >{{ item.applicationStatus }}</router-link
          >

          <router-link
            :to="'creditCommiteeTask/' + item.id"
            tag="td"
            class="text-left number applicationRow"
            >{{ item.modifiedDate }}</router-link
          >

          <td class="text-left print">
            <div class="text-blue q-gutter-md">
              <router-link
                to="/work/credit/registration"
                tag="span"
                class="icon"
              >
                <!-- Надо подумать как добавить outline параметр для реверсии цвета!!! -->
                <q-icon name="print" size="md" />
                <!--  -->
                <q-tooltip anchor="bottom left" self="top left">
                  Распечатать файл
                </q-tooltip>
              </router-link>

              <router-link
                to="/work/credit/registration"
                tag="span"
                class="icon"
              >
                <!-- Надо подумать как добавить outline параметр для реверсии цвета!!! -->
                <q-icon name="cloud_download" size="md" />
                <!--  -->
                <q-tooltip anchor="bottom left" self="top left">
                  Скачать файл
                </q-tooltip>
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>

export default {
  props: ["tasks"],
  data() {
    return {
      roles: {
        CreditManager: "CRM",
        BackOfficee: "BO",
        CreditCommitteeMember: "CCM",
        CreditSecretary: "CS"
      },
      //bpmService: new BpmService(),
      data: {
        // applications: [
        //   {
        //     id: 185,
        //     applicationId: "225",
        //     businessProcessCode: "UNSECURITY_LOAN",
        //     applicationNumber: "00844/000000121/54/2020/10",
        //     branch: "00844",
        //     applicationStatus: "Формирование выписки секретарем",
        //     clientName: "Elena Elena Elena",
        //     clientInn: "111111111",
        //     modifiedDate: "2020-02-14 12:22:54.001",
        //     users: [
        //       {
        //         userLogin: "km_user1",
        //         userName: "km_user1",
        //         nfoRole: "KM",
        //         bpmRole: "ROLE_KM_FL"
        //       },
        //       {
        //         userLogin: "secretary2",
        //         userName: "secretary2",
        //         nfoRole: "SECCC",
        //         bpmRole: "ROLE_SECRETARY_CC"
        //       },
        //       {
        //         userLogin: "bo_user1",
        //         userName: "bo_user1",
        //         nfoRole: "BO",
        //         bpmRole: "ROLE_BO"
        //       },
        //       {
        //         userLogin: "kk_member2",
        //         userName: "Дубов Петр Иванович",
        //         nfoRole: "CC",
        //         bpmRole: "ROLE_CC"
        //       },
        //       {
        //         userLogin: "kk_member3",
        //         userName: "Раков Петр Иванович",
        //         nfoRole: "CC",
        //         bpmRole: "ROLE_CC"
        //       }
        //     ],
        //     additionalInfo: {
        //       protocolNumber: "00844/2/2020/4",
        //       protocolStatus: "signed",
        //       protocolCountMember: 2,
        //       protocolTotalCountMember: 2
        //     }
        //   },
        //   {
        //     id: 154,
        //     applicationId: "182",
        //     businessProcessCode: "UNSECURITY_LOAN",
        //     applicationNumber: "00844/000000062/35/2020/7",
        //     branch: "00844",
        //     applicationStatus: "eДоработка заявки",
        //     clientName: "Petrov Ivanovovich",
        //     clientInn: "111111111",
        //     modifiedDate: "2020-03-18 17:30:14.689",
        //     users: [
        //       {
        //         userLogin: "km_user1",
        //         userName: "km_user1",
        //         nfoRole: "KM",
        //         bpmRole: "ROLE_KM_FL"
        //       },
        //       {
        //         userLogin: "bo_user1",
        //         userName: "bo_user1",
        //         nfoRole: "BO",
        //         bpmRole: "ROLE_BO"
        //       }
        //     ]
        //   },

        //   {
        //     id: 155,
        //     applicationId: "182",
        //     businessProcessCode: "UNSECURITY_LOAN",
        //     applicationNumber: "00844/000000062/35/2020/7",
        //     branch: "00844",
        //     applicationStatus: "Доработка заявки",
        //     clientName: "TIMUR TIMUR TIMUR",
        //     clientInn: "111111111",
        //     modifiedDate: "2020-02-18 17:30:14.689",
        //     users: [
        //       {
        //         userLogin: "km_user1",
        //         userName: "km_user1",
        //         nfoRole: "KM",
        //         bpmRole: "ROLE_KM_FL"
        //       },
        //       {
        //         userLogin: "bo_user1",
        //         userName: "bo_user1",
        //         nfoRole: "BO",
        //         bpmRole: "ROLE_BO"
        //       }
        //     ]
        //   },

        //   {
        //     id: 156,
        //     applicationId: "182",
        //     businessProcessCode: "UNSECURITY_LOAN",
        //     applicationNumber: "00846/000000062/35/2020/7",
        //     branch: "00844",
        //     applicationStatus: "Доработка заявки",
        //     clientName: "TIMUR Alisher TIMUR",
        //     clientInn: "111111111",
        //     modifiedDate: "05.04.2020",
        //     users: [
        //       {
        //         userLogin: "km_user1",
        //         userName: "km_user1",
        //         nfoRole: "KM",
        //         bpmRole: "ROLE_KM_FL"
        //       },
        //       {
        //         userLogin: "bo_user1",
        //         userName: "bo_user1",
        //         nfoRole: "BO",
        //         bpmRole: "ROLE_BO"
        //       }
        //     ]
        //   },

        //   {
        //     id: 157,
        //     applicationId: "182",
        //     businessProcessCode: "UNSECURITY_LOAN",
        //     applicationNumber: "00846/000000062/35/2020/7",
        //     branch: "00844",
        //     applicationStatus: "rПроверка заявки",
        //     clientName: "TIMUR Alisher TIMUR",
        //     clientInn: "111111111",
        //     modifiedDate: "05.02.2020",
        //     users: [
        //       {
        //         userLogin: "km_user1",
        //         userName: "km_user1",
        //         nfoRole: "KM",
        //         bpmRole: "ROLE_KM_FL"
        //       },
        //       {
        //         userLogin: "bo_user1",
        //         userName: "bo_user1",
        //         nfoRole: "BO",
        //         bpmRole: "ROLE_BO"
        //       }
        //     ]
        //   }
        // ],

        applications: [],

        total: 2
      },
      // keys: [],
      application: "",
      client: "",
      manager: "",
      task: "",
      status: "",
      date: "",
      sort: "",
      options: {
        task: [
          "Ввод данных по заявке",
          "Проверка заявки",
          "Голосование КК",
          "Формирование выписки"
        ],
        status: [
          "Ввод данных по заявке",
          "Проверка заявки",
          "Голосование КК",
          "Формирование выписки"
        ],
        sort: ["По убыванию", "По возрастанию"]
      }
    };
  },
  async created() {

    try {
      
      await this.$store.dispatch("authBpm")

      } catch (err) {
        console.log("Errror!",err)
        this.$router.push('errorPage')
        sessionStorage.removeItem("csrf_token");
        this.loaderForm = false
    }

    try {
      const app = await this.$store.dispatch("getCreditList")
      console.log(app)

    } catch (err) {
      console.log(err)
    }
  },
  mounted() {
    const filters = document.querySelectorAll(".filter");
    for (let filter of filters) {
      filter.addEventListener("click", () => this.toggleFilter(filter));
    }
  },
  computed: {
    // Фильтры
    applications() {
      return this.data.applications.filter(task => {
        let conditions = [true];
        if (this.application.length > 0) {
          conditions.push(
            task.applicationNumber.indexOf(this.application) > -1
          );
        }

        if (this.client.length > 0) {
          console.log(task);
          conditions.push(task.clientName.indexOf(this.client) > -1);
        }

        if (this.date.length > 0) {
          conditions.push(task.modifiedDate.indexOf(this.date) > -1);
        }

        // if (this.task.length > 0) {
        //   conditions.push(task.indexOf(this.task) > -1);
        // }

        if (this.status.length > 0) {
          conditions.push(task.applicationStatus.indexOf(this.status) > -1);
        }

        return conditions.every(condition => condition);
      });
    }
  },
  methods: {
    toggleFilter(event) {
      console.log("индекс", event.getAttribute("idx"));
      const idx = event.getAttribute("idx");
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
      //console.log(this.data)
      this.data.applications.sort((a, b) => {
        const itemA = a[idx];
        const itemB = b[idx];
        if (order) {
          //
          if (itemA < itemB) {
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
    }
  }
};
</script>

<style lang="scss" scoped>
tr:nth-child(2n) {
  background: #e8edff;
}

.titleApplication {
  color: #093475;
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

.application {
  width: 22%;
}

.client {
  width: 25%;
}

.status {
  width: 30%;
}

.date {
  width: 14%;
}

.print {
  width: 6%;
}

.filter {
  position: relative;
  width: 100%;
  height: 40px;
  border: none;
  background: inherit;
  cursor: pointer;
  text-align: left;
  color: #093475;
  font-size: 16px;

  &:after {
    position: absolute;
    right: 15px;
    bottom: 5px;
    content: "";
    float: right;
    border: 1px solid $blue;
    border-width: 0 3px 3px 0;
    padding: 3px;
    transform: rotate(45deg);
  }

  &:before {
    position: absolute;
    right: 15px;
    top: 5px;
    content: "";
    float: right;
    border: 1px solid $blue;
    border-width: 0 3px 3px 0;
    padding: 3px;
    transform: rotate(-135deg);
  }
}

.active {
  // &:after {
  //   content: "";
  //   float: right;
  //   border: 1px solid $blue;
  //   border-width: 0 3px 3px 0;
  //   padding: 4px;
  //   margin-top: 4px;
  //   transform: rotate(-135deg);
  // }
}

.applicationRow {
  cursor: pointer;
}

.icon {
  display: inline-block;
  cursor: pointer;
}
</style>
