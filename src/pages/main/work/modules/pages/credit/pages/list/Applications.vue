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
        
        
        <tr v-for="(item, index) of data.applications" :key="item.id"> 
          
          <router-link 
            :to="{
              name: 'CreditCommiteeTask', 
              params: {id: item.applicationId}, 
              query: {
                date: item.modifiedDate,
                applicationNumber: item.applicationNumber,
                //protocolNumber: item.additionalInfo.protocolNumber
                }
            }" 
            tag="td" 
            class="text-center number applicationRow"
          >
            {{index + 1}}
          </router-link>
          <router-link 
            :to="'creditCommiteeTask/' + item.id" 
            tag="td" 
            class="text-center number applicationRow"
          >
            {{item.applicationNumber}}
          </router-link>
          <router-link 
            :to="'creditCommiteeTask/' + item.id" 
            tag="td" 
            class="text-center number applicationRow"
          >
            {{item.clientName}}
          </router-link>
          <router-link 
            :to="'creditCommiteeTask/' + item.id" 
            tag="td" 
            class="text-center number applicationRow"
          >
            {{item.applicationStatus}}
          </router-link>
          <router-link 
            :to="'creditCommiteeTask/' + item.id" 
            tag="td" 
            class="text-center number applicationRow"
          >
            {{item.modifiedDate}}
          </router-link>
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
      data: {},
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

    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjE3MCIsImZ1bGxfbmFtZSI6IkFrYmFyb3YgTWFzaHJhYmJlayBNdWh0YXJhbGkgdWdsaSIsInJvbGVzIjpbMl0sImVtcF9pZCI6MTY0MTUsImxpZmVfdGltZSI6MTU4Mjc2MTE5OSwibWVudXMiOlt7Im1lbnVfaWQiOjUsInBhcmVudF9pZCI6bnVsbCwibmFtZSI6ItCT0LvQsNCy0L3QsNGPIiwidXJsIjoiL2hvbWUiLCJpY29uIjoib19ob21lIiwib3JkIjowLCJsdmwiOjAsImNoaWxkcmVuIjpudWxsfSx7Im1lbnVfaWQiOjYsInBhcmVudF9pZCI6bnVsbCwibmFtZSI6ItCQ0LTQvNC40L3RgdC60LDRjyIsInVybCI6Ii9hZG1pbiIsImljb24iOiJvX3BvbGljeSIsIm9yZCI6MSwibHZsIjowLCJjaGlsZHJlbiI6W3sibWVudV9pZCI6NywicGFyZW50X2lkIjo2LCJuYW1lIjoi0J_QvtC70YzQt9C-0LLQsNGC0LXQu9C4IiwidXJsIjoiL2FkbWluL3VzZXJzIiwiaWNvbiI6Im9fc3VwZXJ2aXNvcl9hY2NvdW50Iiwib3JkIjoxLCJsdmwiOjEsImNoaWxkcmVuIjpudWxsfSx7Im1lbnVfaWQiOjgsInBhcmVudF9pZCI6NiwibmFtZSI6ItCg0L7Qu9C4IiwidXJsIjoiL2FkbWluL3JvbGVzIiwiaWNvbiI6Im9fZ3JvdXBfYWRkIiwib3JkIjoyLCJsdmwiOjEsImNoaWxkcmVuIjpudWxsfSx7Im1lbnVfaWQiOjksInBhcmVudF9pZCI6NiwibmFtZSI6ItCc0LXQvdGOIiwidXJsIjoiL2FkbWluL21lbnVzIiwiaWNvbiI6Im9fcGxheWxpc3RfYWRkIiwib3JkIjozLCJsdmwiOjEsImNoaWxkcmVuIjpudWxsfSx7Im1lbnVfaWQiOjEwLCJwYXJlbnRfaWQiOjYsIm5hbWUiOiLQodC_0YDQsNCy0L7Rh9C90LjQutC4IiwidXJsIjoiL2FkbWluL2RpY3Rpb25hcmllcyIsImljb24iOiJvX2Jvb2siLCJvcmQiOjQsImx2bCI6MSwiY2hpbGRyZW4iOm51bGx9LHsibWVudV9pZCI6MjksInBhcmVudF9pZCI6NiwibmFtZSI6ItCh0LDQvNC-0YDQsNC30LLQuNGC0LjQtSIsInVybCI6Ii9hZG1pbi9zZWxmZGV2IiwiaWNvbiI6Im9fc2Nob29sIiwib3JkIjo1LCJsdmwiOjEsImNoaWxkcmVuIjpudWxsfV19LHsibWVudV9pZCI6MywicGFyZW50X2lkIjpudWxsLCJuYW1lIjoi0JzQvtGPINGA0LDQsdC-0YLQsCIsInVybCI6Ii93b3JrIiwiaWNvbiI6Im9fd29ya19vdXRsaW5lIiwib3JkIjozLCJsdmwiOjAsImNoaWxkcmVuIjpbeyJtZW51X2lkIjoxOSwicGFyZW50X2lkIjozLCJuYW1lIjoi0JfQsNC00LDRh9C4IiwidXJsIjoiL3dvcmsvdGFzay9saXN0IiwiaWNvbiI6bnVsbCwib3JkIjoxLCJsdmwiOjEsImNoaWxkcmVuIjpudWxsfSx7Im1lbnVfaWQiOjE0LCJwYXJlbnRfaWQiOjMsIm5hbWUiOiLQn9C-0LzQvtGI0L3QuNC6IiwidXJsIjoiL3dvcmsvYXNzaXN0YW50IiwiaWNvbiI6bnVsbCwib3JkIjoyLCJsdmwiOjEsImNoaWxkcmVuIjpudWxsfSx7Im1lbnVfaWQiOjE1LCJwYXJlbnRfaWQiOjMsIm5hbWUiOiLQmtCw0L3RhtC10LvQsNGA0LjRjyIsInVybCI6Ii93b3JrL2NoYW5jZWxsYXJ5IiwiaWNvbiI6bnVsbCwib3JkIjozLCJsdmwiOjEsImNoaWxkcmVuIjpudWxsfSx7Im1lbnVfaWQiOjIwLCJwYXJlbnRfaWQiOjMsIm5hbWUiOiLQmtGA0LXQtNC40YLRiyIsInVybCI6Ii93b3JrL2NyZWRpdCIsImljb24iOm51bGwsIm9yZCI6NCwibHZsIjoxLCJjaGlsZHJlbiI6W3sibWVudV9pZCI6MzMsInBhcmVudF9pZCI6MjAsIm5hbWUiOiLQntGH0LXRgNC10LTRjCDQt9Cw0LTQsNGHIiwidXJsIjoiL3dvcmsvY3JlZGl0L3Rhc2tRdWV1ZSIsImljb24iOm51bGwsIm9yZCI6MSwibHZsIjoyfSx7Im1lbnVfaWQiOjM0LCJwYXJlbnRfaWQiOjIwLCJuYW1lIjoi0JfQsNC00LDRh9C4INC60YDQtdC00LjRgtC90L7Qs9C-INC60L7QvNC40YLQtdGC0LAiLCJ1cmwiOiIvd29yay9jcmVkaXQvY3JlZGl0Q29tbWl0ZWVUYXNrIiwiaWNvbiI6bnVsbCwib3JkIjoxLCJsdmwiOjJ9LHsibWVudV9pZCI6MzIsInBhcmVudF9pZCI6MjAsIm5hbWUiOiLQntGH0LXRgNC10LTRjCDQt9Cw0Y_QstC-0LoiLCJ1cmwiOiIvd29yay9jcmVkaXQvYXBwbGljYXRpb25zIiwiaWNvbiI6bnVsbCwib3JkIjoxLCJsdmwiOjJ9LHsibWVudV9pZCI6MzEsInBhcmVudF9pZCI6MjAsIm5hbWUiOiLQl9Cw0Y_QstC60LAg0L3QsCDQutGA0LXQtNC40YIiLCJ1cmwiOiIvd29yay9jcmVkaXQvcHJvZmlsZSIsImljb24iOm51bGwsIm9yZCI6MSwibHZsIjoyfSx7Im1lbnVfaWQiOjMwLCJwYXJlbnRfaWQiOjIwLCJuYW1lIjoi0KHQvtC30LTQsNGC0Ywg0LfQsNGP0LLQutGDIiwidXJsIjoiL3dvcmsvY3JlZGl0L3JlZ2lzdHJhdGlvbiIsImljb24iOm51bGwsIm9yZCI6MSwibHZsIjoyfV19XX0seyJtZW51X2lkIjo0LCJwYXJlbnRfaWQiOm51bGwsIm5hbWUiOiLQmNCiLdGA0LDQt9C00LXQuyIsInVybCI6Ii9pdCIsImljb24iOiJvX2NvbXB1dGVyIiwib3JkIjo0LCJsdmwiOjAsImNoaWxkcmVuIjpbeyJtZW51X2lkIjoxMywicGFyZW50X2lkIjo0LCJuYW1lIjoi0JjQvdGB0YLRgNGD0LzQtdC90YLRiyIsInVybCI6Ii9pdC9kZXZpY2VzIiwiaWNvbiI6bnVsbCwib3JkIjoxLCJsdmwiOjEsImNoaWxkcmVuIjpudWxsfSx7Im1lbnVfaWQiOjE3LCJwYXJlbnRfaWQiOjQsIm5hbWUiOiLQo9GH0LXRgiDQn9CaIiwidXJsIjoiL2l0L3BjaW5mbyIsImljb24iOm51bGwsIm9yZCI6MiwibHZsIjoxLCJjaGlsZHJlbiI6bnVsbH1dfSx7Im1lbnVfaWQiOjEyLCJwYXJlbnRfaWQiOm51bGwsIm5hbWUiOiLQn9C-0YfRgtCwIiwidXJsIjoiL21haWwiLCJpY29uIjoib19lbWFpbCIsIm9yZCI6NSwibHZsIjowLCJjaGlsZHJlbiI6bnVsbH0seyJtZW51X2lkIjoxOCwicGFyZW50X2lkIjpudWxsLCJuYW1lIjoi0KfQsNGCIiwidXJsIjoiL2NoYXQiLCJpY29uIjoib19tZXNzYWdlIiwib3JkIjo2LCJsdmwiOjAsImNoaWxkcmVuIjpudWxsfSx7Im1lbnVfaWQiOjIxLCJwYXJlbnRfaWQiOm51bGwsIm5hbWUiOiLQmNC90YHRgtGA0YPQvNC10L3RgtGLIiwidXJsIjoiL3Rvb2xzIiwiaWNvbiI6Im9fYXBwcyIsIm9yZCI6NywibHZsIjowLCJjaGlsZHJlbiI6W3sibWVudV9pZCI6MjIsInBhcmVudF9pZCI6MjEsIm5hbWUiOiLQotC10LsuINGB0L_RgNCw0LLQvtGH0L3QuNC6IiwidXJsIjoiL3Rvb2xzL3Bob25lcyIsImljb24iOiJjb250YWN0X3Bob25lIiwib3JkIjo3LCJsdmwiOjEsImNoaWxkcmVuIjpudWxsfV19LHsibWVudV9pZCI6MjgsInBhcmVudF9pZCI6bnVsbCwibmFtZSI6ItCh0LDQvNC-0YDQsNC30LLQuNGC0LjQtSIsInVybCI6Ii9zZWxmZGV2IiwiaWNvbiI6Im9fc2Nob29sIiwib3JkIjo4LCJsdmwiOjAsImNoaWxkcmVuIjpudWxsfV0sImlhdCI6MTU4MjcxNzk5OSwiZXhwIjoxNTgyNzIxNTk5fQ.l15RsGxSp6qN1uPhTrB86bgDlbHygNZWSxHwjh0_C24"
    
    this.bpmService.getCreditList(data)
      .then(res => {
        console.log('Ответ', res)
        this.data = res
      })
      .catch(err => {
        console.log('Ошибка', err)
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

.applicationRow {
  cursor: pointer;
}
</style>
