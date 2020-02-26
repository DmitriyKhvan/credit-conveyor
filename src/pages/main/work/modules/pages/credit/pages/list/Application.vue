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
          <th class="text-right">
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
          <th class="text-left application">
            <button class="filter">
              Заявка
            </button>
          </th>
          <th class="text-left client">
            <button class="filter">
              Клиент
            </button>
          </th>
          <th class="text-left status">
            <button class="filter">
              Статус
            </button>
          </th>
          <th class="text-left date">
            <button class="filter">
              Дата
            </button>
          </th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center number">1</td>
          <td class="text-left application">
            12132132132 dsfsf sdfsf sdfsdf sddfsd sddfsdf sdfsdf
          </td>
          <td class="text-left client">Иванов Иван Иванович</td>
          <td class="text-left status">Статус</td>
          <td class="text-left date">Дата</td>
          <td class="text-left print">
            <div class="text-blue q-gutter-md">
              <q-icon name="print" size="md" />
              <q-icon name="cloud_download" size="md" />
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import BpmService from '../../service/bpm-service'

export default {
  props: ["tasks"],
  data() {
    return {
      bpmService: new BpmService(),
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
  created() {
    const data = {
      "filter": [
        {
          "column": "string",
          "value": "string"
        }
      ],
      "sort": {
        "column": "string",
        "method": "string"
      }
    }
    this.bpmService.getCreditList(data)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

  },
  mounted() {
    const filters = document.querySelectorAll('.filter')
    for (let filter of filters) {
      filter.addEventListener('click', () => this.toggleFiler(filter))
    }
  },
  methods: {
    toggleFiler(event) {
      for(let item of document.querySelectorAll('.active')) {
        if (item !== event) {
          item.classList.remove('active')
        }
      }
      event.classList.toggle("active");
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
</style>
