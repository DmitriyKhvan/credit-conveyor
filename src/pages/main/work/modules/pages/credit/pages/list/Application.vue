<template>
  <div class="q-pa-md">
    <h4>Очередь заявок {{ tasks }}</h4>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left">
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
      </thead>
      <tbody>
        <tr>
          <td class="text-left">№</td>
          <td class="text-left application">Заявки</td>
          <td class="text-right client">Клиент</td>
          <td class="text-right status">Статус</td>
          <td class="text-right date">Дата</td>
          <td class="text-right"></td>
        </tr>

        <tr>
          <td class="text-left">1</td>
          <td class="text-left application">12132132132 dsfsf sdfsf sdfsdf sddfsd sddfsdf sdfsdf</td>
          <td class="text-right client">Иванов Иван Иванович</td>
          <td class="text-right status">Статус</td>
          <td class="text-right date">Дата</td>
          <td class="text-right print">Распечатать Скачать</td>
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
  }
};
</script>
<style scoped>
  tr:nth-child(2n) {background: #e8edff;}

  .application {
    width: 200px
  }

  td {
    word-break: break-all;
    white-space: pre-wrap;
  }
</style>
