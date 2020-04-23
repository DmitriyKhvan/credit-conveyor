<template>
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
          <th class="text-left"></th>
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
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(credit, index) of credits" :key="credit.id">
          <router-link
            :to="{
              name: 'CreditTask',
              params: { id: credit.id },
              query: {
                taskId: credit.taskId,
                date: credit.date,
                applicationNumber: credit.applicationNumber,
                protocolNumber: credit.additionalInfo
                  ? credit.additionalInfo.protocolNumber
                  : null
              }
            }"
            tag="td"
            class="text-center number applicationRow"
          >
            {{ index + 1 }}
          </router-link>

          <router-link
            :to="{
              name: 'CreditTask',
              params: { id: credit.id },
              query: {
                taskId: credit.taskId,
                date: credit.date,
                applicationNumber: credit.applicationNumber
              }
            }"
            tag="td"
            class="text-left applicationNumber applicationRow"
          >
            {{ credit.applicationNumber }}
          </router-link>

          <router-link
            :to="{
              name: 'CreditTask',
              params: { id: credit.id },
              query: {
                taskId: credit.taskId,
                date: credit.date,
                applicationNumber: credit.applicationNumber
              }
            }"
            tag="td"
            class="text-left client applicationRow"
          >
            {{ credit.client }}
          </router-link>

          <router-link
            :to="{
              name: 'CreditTask',
              params: { id: credit.id },
              query: {
                taskId: credit.taskId,
                date: credit.date,
                applicationNumber: credit.applicationNumber
              }
            }"
            tag="td"
            class="text-left manager applicationRow"
          >
            Наименование менеджера
          </router-link>

          <router-link
            :to="{
              name: 'CreditTask',
              params: { id: credit.id },
              query: {
                taskId: credit.taskId,
                date: credit.date,
                applicationNumber: credit.applicationNumber
              }
            }"
            tag="td"
            class="text-left MFO applicationRow"
          >
            {{ credit.filial }}
          </router-link>

          <router-link
            :to="{
              name: 'CreditTask',
              params: { id: credit.id },
              query: {
                taskId: credit.taskId,
                date: credit.date,
                applicationNumber: credit.applicationNumber
              }
            }"
            tag="td"
            class="text-left filialName applicationRow"
          >
            {{ credit.filialName }}
          </router-link>

          <router-link
            :to="{
              name: 'CreditTask',
              params: { id: credit.id },
              query: {
                taskId: credit.taskId,
                date: credit.date,
                applicationNumber: credit.applicationNumber
              }
            }"
            tag="td"
            class="text-left taskName applicationRow"
          >
            {{ credit.taskName }}
          </router-link>

          <router-link
            :to="{
              name: 'CreditTask',
              params: { id: credit.id },
              query: {
                taskId: credit.taskId,
                date: credit.date,
                applicationNumber: credit.applicationNumber
              }
            }"
            tag="td"
            class="text-left taskStatus applicationRow"
          >
            {{ credit.taskStatus }}
          </router-link>

          <router-link
            :to="{
              name: 'CreditTask',
              params: { id: credit.id },
              query: {
                taskId: credit.taskId,
                date: credit.date,
                applicationNumber: credit.applicationNumber
              }
            }"
            tag="td"
            class="text-left date applicationRow"
          >
            {{ credit.date }}
          </router-link>

          <td class="text-left print">
            <div class="text-blue q-gutter-md">
              <q-icon name="print" size="md" />
              <q-icon name="cloud_download" size="md" />
              <template v-if="userRole === 'CreditSecretary'">
                <q-btn
                  class="full-width"
                  label="Подписать"
                  color="green"
                  @click="creditSign"
                />
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // userRole: this.$store.getters.userRole,
      applicationNumber: "",
      client: "",
      manager: "",
      MFO: "",
      filialName: "",
      taskName: "",
      taskStatus: "",
      date: "",
      sort: "",
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
        sort: ["По убыванию", "По возрастанию"]
      }
    };
  },
  mounted() {
    const filters = document.querySelectorAll(".filter");
    for (let filter of filters) {
      filter.addEventListener("click", () => this.toggleFilter(filter));
    }
  },
  computed: {
    // Фильтры
    credits() {
      return this.$store.getters.creditTasks.filter(task => {
        console.log(task.client)
        let conditions = [true];
        if (this.applicationNumber.length > 0) {
          conditions.push(task.applicationNumber.indexOf(this.applicationNumber) > -1);
        }

        if (this.client.length > 0) {
          console.log("f", task.client)
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
          conditions.push(task.date.indexOf(this.date) > -1);
        }

        return conditions.every(condition => condition);
      });
    },

    userRole() {
      return this.$store.getters.userRole
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
      
      this.$store.getters.creditTasks.sort((a, b) => {
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

    creditSign() {
      console.log('creditSign')
    }
  }
};
</script>

<style lang="scss" scoped>
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
}
</style>
