<template>
  <div class="q-pa-md">
    <q-toolbar class="shadow-2 rounded-borders">
      <q-tabs v-model="tab" inline-label stretch>
<<<<<<< HEAD
        <q-tab name="tab1" :label="$t('tables.work.tasks.new')" icon="new_releases">
          <q-badge color="red" floating>2</q-badge>
        </q-tab>
        <q-tab name="tab2" :label="$t('tables.work.tasks.accepted')" icon="drafts">
          <q-badge color="red" floating>12</q-badge>
        </q-tab>
        <q-tab name="tab3" :label="$t('tables.work.tasks.working')" icon="settings_applications"></q-tab>
        <q-tab name="tab4" :label="$t('tables.work.tasks.finished')" icon="check_circle"></q-tab>
=======
        <q-tab 
          v-for="item of menu"
          :key="item.value"
          :name="item.value"
          :label="item.label" 
          :icon="item.icon"
        >
          <template v-if="item.countTask">
            <q-badge color="red" floating>{{ item.countTask }}</q-badge>
          </template>
        </q-tab>
        
>>>>>>> 3d3c1e89a702b4fd49d5080712b15c999cbaa009
      </q-tabs>
    </q-toolbar>

    <div class="sub_menu">
      <div class="filterBlock">
        <q-select
          dense
          filled
          v-model="model"
<<<<<<< HEAD
          :options="optionsFilter"
          :label="$t('tables.work.tasks.actions')"
        />
      </div>
      <div>{{$t('tables.work.tasks.redirect')}}</div>
      <div>{{$t('tables.work.tasks.sort')}}</div>
      <div>{{$t('actions.delete')}}</div>
    </div>

    <div v-for="(b, i) in 2" :key="i" class="row docBlock">
      <div class="col-1 check">
        <div class="check_div">
          <q-checkbox v-model="val" />
        </div>
      </div>
      <div class="col content">
        <div class="row">
          <div
            class="col text"
          >Поручение по письму Министерства РУз также призвал глав муниципалитетов разъяснить пожилым гражданам необходимость оставаться дома и исключить ...</div>
        </div>
        <div class="row">
          <div class="col despBlock">
            <div>
              <q-icon name="skip_previous" />
            </div>
            <div>
              <span>Исх.№</span> 36-44/29
              <br />
              <span>от:</span> 2019.12.24
            </div>
          </div>
          <div class="col despBlock">
            <div>
              <q-icon name="skip_next" />
            </div>
            <div>
              <span>Вх.№</span> 36-44/29
              <br />
              <span>от:</span> 2019.12.24
            </div>
          </div>
          <div class="col despBlock">
            <div>
              <q-icon name="description" />
            </div>
            <div>
              <span>1 лист / бумажное</span>
              <br />
              <i>622 кб</i>
            </div>
          </div>

          <div class="col despBlock">
            <q-btn
              color="white text-black"
              icon="person"
              size="sm"
              :label="$t('tables.work.tasks.responsibles')"
              @click="usersPopup = true"
            />
            <q-dialog v-model="usersPopup">
              <q-hierarchy></q-hierarchy>
            </q-dialog>
          </div>
          <div class="col despBlock">
            <div>
              <q-icon name="person" />
            </div>
            <div>
              <span>{{$t('tables.work.tasks.from')}}:</span>
              <strong>Мирсаитов А.С.</strong>
=======
          :options="menu"
          label="Действия"
        />
      </div>
      <div>перенаправить</div>
      <div>сортировать</div>
      <div>удалить</div>
    </div>

    <div v-for="task in userTasks" :key="task.task_id" class="row docBlock">
      <div class="col-1 check">
        <div class="check_div">
          <q-checkbox v-model="selection" :val="task.task_id" />
        </div>
      </div>
      <div class="col content">
        <div class="row">
          <div class="col text">
            {{ task.f_task_data.description.slice(0, 300) }}...
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
              <i>{{ task.f_task_data.file.size | formatSize}}</i>
            </div>
          </div>

          <div class="col despBlock">
            <q-btn
              color="white text-black"
              icon="person"
              size="sm"
              label="Ответсвенные"
              @click="
                usersHierarchy({
                  label: `${task.last_name} ${task.first_name} ${task.middle_name}`,
                  children: task.forward_tasks
                }, task)
              "
            />
          </div>
          <div class="col despBlock">
            <div><q-icon name="person" /></div>
            <div>
              <span>от:</span>
              <strong
                class="poster"
                v-html="
                  `${task.h_last_name} ${task.h_first_name.slice(
                    0,
                    1
                  )}. ${task.h_middle_name.slice(0, 1)}.`
                "
              >
              </strong>
              <p
                class="desc"
                v-html="
                  `${task.h_last_name} ${task.h_first_name} ${task.h_middle_name}`
                "
              ></p>
>>>>>>> 3d3c1e89a702b4fd49d5080712b15c999cbaa009
            </div>
          </div>
        </div>
      </div>
      <div class="col-1 text-right actions">
        <q-btn
          class="white text-black q-mb-sm"
<<<<<<< HEAD
          :label="$t('actions.open')"
          @click="taskPopup = true"
        />
        <br />
        <q-dialog v-model="taskPopup" full-width full-height>
          <q-task></q-task>
        </q-dialog>
=======
          label="Открыть"
          @click="usersTask(task)"
        /><br />

>>>>>>> 3d3c1e89a702b4fd49d5080712b15c999cbaa009
        <q-btn flat size="sm" icon="print" />
        <q-btn flat size="sm" icon="cloud_download" />
      </div>
    </div>
<<<<<<< HEAD
=======

    <!-- Иерархия -->
    <q-dialog v-model="usersPopup">
      <q-hierarchy></q-hierarchy>
    </q-dialog>

    <!-- Задача -->
    <q-dialog v-model="taskPopup" full-width full-height>
      <q-task></q-task>
    </q-dialog>
>>>>>>> 3d3c1e89a702b4fd49d5080712b15c999cbaa009
  </div>

  <!-- <div class="q-pa-md">
    <router-view />
  </div>-->
</template>

<script>
<<<<<<< HEAD
import QHierarchy from "./dialog-hierarchy.vue";
import QTask from "./dialog-task.vue";
=======
import UserService from "@/services/user.service";
import QHierarchy from "./dialog-hierarchy.vue";
import QTask from "./dialog-task.vue";
import formatSize from "./filters/formatSize"
>>>>>>> 3d3c1e89a702b4fd49d5080712b15c999cbaa009

export default {
  data() {
    return {
      taskPopup: false,
<<<<<<< HEAD
      tab: "tab1",
      val: false,
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
=======
      usersPopup: false,
      tab: 1,
      selection: [],
      model: null,
      // shape: [],
      // optionsFilter: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  async created() {
    try {
      await this.$store.dispatch("task/userTasks", 1);
    } catch (error) {}
  },
  computed: {
    userTasks() {
      return this.$store.getters["task/getUserTasks"];
    },
    menu() {
      return this.$store.getters["task/getStatuses"];
    }
  },
  watch: {
    async tab(value) {
      try {
        await this.$store.dispatch("task/userTasks", value);
      } catch (error) {}
    }
  },
  methods: {
    usersHierarchy(data, task) {
      this.$store.commit("task/setCurrentTask", task);
      const children = [];
      const emp_id = this.$store.getters["auth/empId"];
      const avatar = UserService.getUserProfilePhotoUrl(emp_id);
      if (data.children) {
        for (let child of data.children) {
          children.push({
            label: `${child.first_name} ${child.last_name} ${child.middle_name}`,
            icon: "check_circle"
          });
        }
      }

      const props = [
        {
          label: data.label,
          avatar,
          children
        }
      ];
      //console.log(props);

      this.$store.commit("task/setUserHierarchy", props);

      this.usersPopup = true;
    },
    usersTask(task) {
      // const task = this.userTasks.find(i => i.task_id = task_id)
      this.$store.commit("task/setCurrentTask", task);
      this.taskPopup = true;
    }
>>>>>>> 3d3c1e89a702b4fd49d5080712b15c999cbaa009
  },
  components: {
    QHierarchy,
    QTask
  }, 
  filters: {
    formatSize
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
<<<<<<< HEAD
=======

.poster {
  position: relative;
  cursor: pointer;
}

.poster:hover + .desc {
  // opacity: 1;
  display: block;
}

.desc {
  position: absolute;
  // top: 100%;
  // left: 0;
  // text-overflow: clip;
  // white-space: nowrap;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  font-size: 14px;
  color: #000;
  padding: 5px 10px;
  display: none;
  // opacity: 0;
  // transition: opacity, 0.3s ease;
  z-index: 10;
}

>>>>>>> 3d3c1e89a702b4fd49d5080712b15c999cbaa009
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
