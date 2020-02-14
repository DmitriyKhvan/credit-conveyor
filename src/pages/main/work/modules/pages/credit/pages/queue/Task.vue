<template>
  <div class="q-pa-md">
    <h4>Очередь задач</h4>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">
              <q-input
                square
                outlined
                v-model="application"
                dense
                hint="Заявка"
              />
          </th>
          <th class="text-right">
              <q-input
                square
                outlined
                v-model="client"
                dense
                hint="Клиент"
              />
          </th>
          <th class="text-right">
              <q-input
                square
                outlined
                v-model="manager"
                dense
                hint="Менеджер"
              />
          </th>
          <th class="text-right">
              <q-select
                square
                outlined
                v-model="task"
                :options="options.task"
                dense
                hint="Задача"
              />
          </th>
          <th class="text-right">
              <q-select
                square
                outlined
                v-model="status"
                :options="options.status"
                dense
                hint="Статус"
              />
          </th>
          <th class="text-right">
              <q-select
                square
                outlined
                v-model="sort"
                :options="options.sort"
                dense
                hint="Сортирока"
              />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">Frozen Yogurt</td>
          <td class="text-right">159</td>
          <td class="text-right">6</td>
          <td class="text-right">24</td>
          <td class="text-right">4</td>
          <td class="text-right">87</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            application: '',
            client: '',
            manager: '',
            task: '',
            status: '',
            sort: '',    
            options: {
                task: [
                    'Ввод данных по заявке',
                    'Проверка заявки',
                    'Голосование КК',
                    'Формирование выписки'
                ],
                status: [
                    'Ввод данных по заявке',
                    'Проверка заявки',
                    'Голосование КК',
                    'Формирование выписки'
                ],
                sort: ['По убыванию', 'По возрастанию']
            }
        }
    }
}
</script>
