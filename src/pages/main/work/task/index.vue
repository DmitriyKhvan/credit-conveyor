<template>
  <div class="q-pa-md">
    <q-toolbar class="shadow-2 rounded-borders">
      <q-tabs v-model="tab" inline-label stretch>
        <q-tab name="tab1" label="Новые" icon="new_releases">
          <q-badge color="red" floating>2</q-badge>
        </q-tab>
        <q-tab name="tab2" label="Принял(а)" icon="drafts">
          <q-badge color="red" floating>12</q-badge>
        </q-tab>
        <q-tab name="tab2" label="Работаю" icon="settings_applications">
        </q-tab>
        <q-tab name="tab2" label="Завершено" icon="check_circle"> </q-tab>
      </q-tabs>
    </q-toolbar>

    <div class="sub_menu">
      <div class="filterBlock">
        <q-select
          dense
          filled
          v-model="model"
          :options="optionsFilter"
          label="Действия"
        />
      </div>
      <div>перенаправить</div>
      <div>сортировать</div>
      <div>удалить</div>
    </div>

    <div v-for="task in userTasks" :key="task.task_id" class="row docBlock">
      <div class="col-1 check">
        <div class="check_div"><q-checkbox v-model="selection" :val="task.task_id" /></div>
      </div>
      <div class="col content">
        <div class="row">
          <div class="col text">
            {{ task.f_task_data.description }}
          </div>
        </div>
        <div class="row">
          <div class="col despBlock">
            <div><q-icon name="skip_previous" /></div>
            <div>
              <span>Исх.№</span>{{ task.f_task_data.out_number }}<br />
              <span>от:</span>{{ task.f_task_data.out_date }}
            </div>
          </div>
          <div class="col despBlock">
            <div><q-icon name="skip_next" /></div>
            <div>
              <span>Вх.№</span> {{ task.f_task_data.in_number }}<br />
              <span>от:</span>{{ task.f_task_data.in_date }}
            </div>
          </div>
          <div class="col despBlock">
            <div><q-icon name="description" /></div>
            <div>
              <span
                >{{ task.f_task_data.paper_count }} лист /
                {{ task.f_task_data.format }}</span
              ><br />
              <i>{{ task.f_task_data.file.size }} кб</i>
            </div>
          </div>

          <div class="col despBlock">
            <q-btn
              color="white text-black"
              icon="person"
              size="sm"
              label="Ответсвенные"
              @click="usersHierarchy(
                {
                  label: `${task.last_name} ${task.first_name} ${task.middle_name}`,
                  children: task.forward_tasks
                }
              )"
            />
          </div>
          <div class="col despBlock">
            <div><q-icon name="person" /></div>
            <div>
              <span>от:</span> <strong>{{ `${task.h_last_name} ${task.h_first_name} ${task.h_middle_name}` }}</strong>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1 text-right actions">
        <q-btn
          class="white text-black q-mb-sm"
          label="Открыть"
          @click="usersTask(task)"
        /><br />
       
        <q-btn flat size="sm" icon="print" />
        <q-btn flat size="sm" icon="cloud_download" />
      </div>
    </div>

    <!-- Иерархия -->
    <q-dialog v-model="usersPopup">
      <q-hierarchy></q-hierarchy>
    </q-dialog>

    <!-- Задача -->
     <q-dialog v-model="taskPopup" full-width full-height>
        <q-task></q-task>
      </q-dialog>
  </div>

  

  <!-- <div class="q-pa-md">
    <router-view />
  </div> -->
</template>

<script>
import QHierarchy from "./dialog-hierarchy.vue";
import QTask from "./dialog-task.vue";

export default {
  data() {
    return {
      taskPopup: false,
      tab: "tab1",
      selection: [],
      fixed: false,
      model: null,
      group: "op1",
      optionsSel: [
        {
          label: "Хамдамов А.А.",
          value: "op1"
        },
        {
          label: "Касимов Ю.Д.",
          value: "op2"
        },
        {
          label: "Петров Ф.В",
          value: "op3"
        }
      ],
      shape: [],
      usersPopup: false,
      optionsFilter: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  async created() {
    try {
      await this.$store.dispatch("task/userTasks");
    } catch (error) {}
  },
  computed: {
    userTasks() {
      return this.$store.getters["task/getUserTasks"];
    }
  },
  methods: {
    usersHierarchy(data) {
      
      const children = []
      if (data.children) {
        for (let child of data.children) {
          children.push({
            label: `${child.first_name} ${child.last_name} ${child.middle_name}`,
            icon: 'check_circle',
          })
        }
      }
      
      const props = [
        {
          label: data.label,
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          children
        }
      ]
      console.log(props)

      this.$store.commit('task/setUserHierarchy', props)
      
      this.usersPopup = true;
    },
    usersTask(task) {
      // const task = this.userTasks.find(i => i.task_id = task_id)
      this.$store.commit('task/setCurrentTask', task)
      this.taskPopup = true
    }
  },
  components: {
    QHierarchy,
    QTask
  }
};
</script>

<style lang="scss" scoped>
.sub_menu {
  padding: 10px 0;
  margin: 10px 0;
  display: flex;
  align-items: center;
}
.sub_menu div {
  padding-left: 10px;
  margin-right: 10px;
  color: #8b8b8b;
  cursor: pointer;
  font-size: 12px;
}
.sub_menu div + div {
  border-left: 1px #c2c2c2 solid;
}
.docBlock {
  border-top: 1px #c2c2c2 solid;
  padding: 30px 15px;
  color: #8b8b8b;
}
.docBlock:hover {
  background: #f2f2f2;
}
.docBlock div {
  padding-right: 5px;
}
.docBlock span {
  color: black;
  float: left;
  display: block;
  padding-right: 5px;
}
.check {
  padding: 0 10px;
  width: 65px;
  margin-right: 10px;
}
.check_div {
  background: #f2f2f2;
  padding: 5px;
  border-radius: 10px;
}
.despBlock {
  display: flex;
  font-size: 14px;
}
.despBlock + .despBlock {
  border-left: 1px #c2c2c2 solid;
  padding: 0 15px;
  margin-right: 15px;
}
.text {
  font-size: 16px;
  padding-bottom: 15px;
}
.actions {
  width: 200px;
}
.filterBlock {
  width: 150px;
}
</style>
