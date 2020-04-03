<template>
  <q-card style="width:500px">
    <q-card-section class="bg-blue-7 text-white header">
      <div class="text-h6">{{$t('tables.work.tasks.dialog_task.document_num')}}6765</div>
      <q-btn icon="clear" flat text-color="white" v-close-popup />
    </q-card-section>

    <div class="row q-pa-md">
      <div class="col-8 q-pr-md">
        <div class="text-h6">{{ task.f_task_data.description }}</div>
        <div class="iconsBlock q-py-sm">
          <div class="icon q-pr-xs">
            <q-icon name="insert_drive_file" />
          </div>
          <div>
            {{ task.f_task_data.file.name }}
            <br />
            <i>{{ task.f_task_data.file.size | formatSize}}</i>
          </div>
        </div>
        <q-separator />

        <div class="comments scroll q-pb-md" style="max-height: 45vh">
          <div class="comment q-pt-md" v-for="(comment, index) in task.comments" :key="comment.id">
            <div class="avatar q-pr-md">
              <q-avatar>
                <img :src="getPhotoUrl(comment.emp_id)" />
              </q-avatar>
            </div>
            <div class="textComment">
              <div class="title">
                <span
                  class="poster"
                  v-html="
                    `${comment.last_name} ${comment.first_name.slice(
                      0,
                      1
                    )}. ${comment.middle_name.slice(0, 1)}.`
                  "
                ></span>
                <p
                  class="desc"
                  v-html="
                    `${comment.last_name} ${comment.first_name} ${comment.middle_name}`
                  "
                ></p>
                <i>{{comment.updated_at}}</i>
              </div>
              <div v-if="!comment.edit">
                <div class="content">{{ comment.text }}</div>

                <div class="actions">
                  <div @click="editComment(index)">редактировать</div>|
                  <div @click="deleteComment(comment.id)">удалить</div>
                </div>
              </div>
              <form v-else @submit.prevent.stop="onSubmit(index, comment.id)">
                <q-input
                  v-model="comment.text"
                  outlined
                  type="textarea"
                  label="Редактирование комментария"
                  dense
                />
                <q-btn
                  type="submit"
                  color="white q-mt-sm"
                  text-color="black"
                  label="Редактировать"
                />
              </form>
            </div>
          </div>
        </div>

        <q-separator />

        <div class="addComment q-py-md">
          <div class="addAvatar q-pr-md">
            <q-avatar>
              <img :src="getPhotoUrl(emp_id)" />
            </q-avatar>
          </div>
          <div class="addText">
            <q-input v-model="text" outlined type="textarea" label="Введите комментарий" dense />
            <q-btn
              color="white q-mt-sm"
              text-color="black"
              label="Отправить"
              @click="addComment()"
            />
          </div>
        </div>
      </div>

      <div class="col-4 q-pa-md rightBlock">
        <div class="rightActions">
          <div class="buttonLeft">
            <q-select
              dense
              filled
              v-model="task.u_status"
              :options="statuses"
              label="Статус"
              emit-value
              map-options
            />
          </div>
          <!-- <div class="q-pl-md">
            <q-btn color="primary" text-color="white" label="Отправить" />
          </div>-->
        </div>
        <div class="q-py-md">
          <!-- Поиск для добавление пользователя -->
          <div class="q-pb-md">
            <q-input
              v-model="searchUser"
              @input="selUsers"
              filled
              placeholder="Добавить исполнителей"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <div>
            <div v-for="user in users" :key="user.EMP_ID" @click="addUser(user)" class="result">
              <span v-html="user.LAST_NAME"></span>
              <span v-html="user.FIRST_NAME"></span>
              <span v-html="user.MIDDLE_NAME"></span>
              <q-btn round color="black" size="5px" icon="priority_high" unelevated>
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                  <span v-html="user.DEPARTMENTS_NAME"></span>
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
        <div class="usersRight q-pb-md">
          <q-chip
            color="red poster"
            text-color="white"
            v-html="
              `${task.last_name} ${task.first_name.slice(
                0,
                1
              )}. ${task.middle_name.slice(0, 1)}.`
            "
          ></q-chip>
          <p class="desc" v-html="`${task.last_name} ${task.first_name} ${task.middle_name}`"></p>
          <div class="userLine" v-for="user of task.forward_tasks" :key="user.task_id">
            <q-btn
              size="7px"
              round
              color="red"
              icon="close"
              class="deleteUser"
              @click="deleteUser(user.task_id)"
            />
            <span
              class="poster"
              v-html="
                `${user.last_name} ${user.first_name.slice(
                  0,
                  1
                )}. ${user.middle_name.slice(0, 1)}.`
              "
            ></span>
            <p
              class="desc"
              v-html="
                `${user.last_name} ${user.first_name} ${user.middle_name}`
              "
            ></p>
          </div>
          <!-- <div class="userLine">Хамдамов А.А.</div>
          <div class="userLine">Баратов С</div>-->
        </div>
        <q-separator />
        <div class="general">
          От:
          <span
            class="poster"
            v-html="
              `${task.h_last_name} ${task.h_first_name.slice(
                0,
                1
              )}. ${task.h_middle_name.slice(0, 1)}.`
            "
          ></span>
          <p
            class="desc"
            v-html="
              `${task.h_last_name} ${task.h_first_name} ${task.h_middle_name}`
            "
          ></p>
        </div>
        <q-separator />
        <!-- <div class="files q-pt-sm">
          <div class="iconRight q-pr-xs">
            <q-icon name="insert_drive_file" />
          </div>
          <div>
            Файлы:
          </div>
        </div>
        <div class="docs">
          <a href="#">документ.pdf</a>
          <a href="#">документ-2.doc</a>
        </div>
        <q-file
          class="q-mt-md"
          outlined
          dense
          clearable
          color="primary"
          standout
          bottom-slots
          v-model="upload"
          label="Загрузить"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>-->
        <q-separator />
        <div class="date">
          создано: {{task.created_at | formatDate}}
          <br />
          обновление: {{task.updated_at | formatDate}}
        </div>
      </div>
    </div>

    <!-- <q-card-section style="max-height: 70vh" class="scroll">
                 
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
            <q-btn label="Закрыть" color="white" text-color="black" v-close-popup />                    
    </q-card-actions>-->
  </q-card>
</template>

<script>
import UserService from "@/services/user.service";
import formatSize from "./filters/formatSize";
import formatDate from "./filters/formatDate";

export default {
  data() {
    return {
      emp_id: this.$store.getters["auth/empId"],
      text: "",
      // status: this.task.u_status,
      upload: null,
      searchUser: ""
      // options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  computed: {
    task() {
      //console.log(JSON.stringify((this.$store.getters["task/getCurrentTask"]).u_status, null, 2))
      return this.$store.getters["task/getCurrentTask"];
    },
    statuses() {
      return this.$store.getters["task/getStatuses"];
    },
    users() {
      return this.$store.getters["task/getUsers"];
    }
  },
  watch: {
    async "task.u_status"(value) {
      try {
        const status = {
          id: this.task.task_id,
          status: value
        };
        await this.$store.dispatch("task/changeTaskStatus", status);
      } catch (error) {}
    }
  },
  methods: {
    async addComment() {
      try {
        const emp_id = this.$store.getters["auth/empId"];
        const {
          FIRST_NAME,
          LAST_NAME,
          MIDDLE_NAME,
          DEP_CODE,
          DEP_NAME
        } = await this.$store.dispatch("task/getUserInfo", emp_id);

        const comment = {
          id: null,
          task_id: this.task.task_id,
          emp_id,
          first_name: FIRST_NAME,
          last_name: LAST_NAME,
          middle_name: MIDDLE_NAME,
          dep_code: DEP_CODE,
          dep_name: DEP_NAME,
          text: this.text,
          edit: false
        };
        await this.$store.dispatch("task/addComment", comment);
        this.text = "";
      } catch (error) {}
    },

    async deleteComment(id) {
      try {
        await this.$store.dispatch("task/deleteComment", id);
      } catch (error) {}
    },

    editComment(idx) {
      this.task.comments[idx].edit = true;
    },

    getPhotoUrl(emp_id) {
      return UserService.getUserProfilePhotoUrl(emp_id);
    },

    // отправка отредактированного коментария
    async onSubmit(idx, id) {
      try {
        const comment = {
          id,
          text: this.task.comments[idx].text
        };
        await this.$store.dispatch("task/editComment", comment);
        this.task.comments[idx].edit = false;
      } catch (error) {}
    },

    async deleteUser(task_id) {
      try {
        await this.$store.dispatch("task/deleteUser", task_id);
      } catch (error) {}
    },

    async selUsers() {
      try {
        await this.$store.dispatch("task/searchUser", this.searchUser);
      } catch (error) {}
    },

    async addUser(user) {
      try {
        this.searchUser = "";
        const userDataUI = {
          task_id: null,
          emp_id: user.EMP_ID,
          check: false,
          first_name: user.FIRST_NAME,
          last_name: user.LAST_NAME,
          middle_name: user.MIDDLE_NAME,
          dep_code: user.DEP_CODE,
          dep_name: user.DEPARTMENTS_NAME,
          comments: null
        };

        const userData = {
          id: null,
          type: 1,
          f_task_id: this.task.f_task_data.doc_id,
          emp_id: user.EMP_ID,
          dep_code: user.DEP_CODE,
          check: this.task.check,
          h_emp_id: this.task.emp_id,
          h_dep_code: this.task.dep_code,
          user_status: 1,
          m_emp_id: null,
          history: "{}"
        };
        await this.$store.dispatch("task/addUser", { userData, userDataUI });
      } catch (error) {}
    }
  },
  filters: {
    formatSize,
    formatDate
  }
};
</script>

<style lang="scss" scoped>
.iconsBlock {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.icon {
  font-size: 36px;
}
.rightBlock {
  background: #f8f8f8;
}
.comment,
.actions,
.addComment,
.rightActions {
  display: flex;
}
.title {
  font-size: 16px;
  font-weight: bold;
}
.title i {
  font-size: 12px;
  font-weight: normal;
  color: #8b8b8b;
}
.actions {
  font-size: 12px;
  font-style: italic;
  color: #8b8b8b;
}
.actions div {
  padding-right: 5px;
  cursor: pointer;
}
.actions div + div {
  padding-left: 5px;
}
.addText {
  width: 100%;
}
.buttonLeft {
  width: 150px;
}

.userLine {
  padding-left: 15px;
}
.general {
  padding: 15px;
  font-size: 16px;
}
.iconRight {
  font-size: 26px;
}
.files {
  display: flex;
  font-size: 16px;
  align-items: center;
}
.docs {
  padding-left: 30px;
}
.docs a {
  color: #575757;
  text-decoration: none;
  display: block;
}
.date {
  color: #575757;
  font-style: italic;
  padding: 15px;
}
.header {
  display: flex;
  justify-content: space-between;
}

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
  font-weight: 100;
  color: #000;
  padding: 5px 10px;
  display: none;
  // opacity: 0;
  // transition: opacity, 0.3s ease;
  z-index: 10;
}

.deleteUser {
  margin-right: 5px;
}

.result {
  cursor: pointer;
  padding: 2px 10px;
}
.result:hover,
.selDiv div:hover {
  background: #f2f2f2;
  border-radius: 4px;
}
.result span {
  padding-right: 5px;
}
</style>
