<template>
  <div>
    <q-btn color="blue-14" size="lg" label="Просмотреть" @click="dialog = true" />
    <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="cardBlock q-pa-md"  style="width: 820px; max-width: 80vw;">
        <q-card-section>
          <div class="row">
            <div class="col title">

              <div class="row q-pb-md">
                <div class="col">
                  <strong>{{doc.description}}</strong>
                </div>
              </div>
              <div class="row q-py-md desp">
                <div class="col">
                  <div class="row justify-center files">
                    <div class="col-5">
                      <div>Документ № {{doc.doc_id}}</div>
                    </div>
                    <div class="col flexBlock cursor-pointer" @click="newFile">
                      <div class="pad-2"><img src="@/assets/icons/Download-Cloud.svg" /></div>
                      <div class="q-px-sm">Скачать</div>
                    </div>
                    <div class="col flexBlock">
                      <div class="pad-3"><img src="@/assets/icons/Print.svg" /></div>
                      <div class="q-px-sm">Печать</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-md desp">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="self-center"><img src="@/assets/icons/Enter-1.svg" /></div>
                      <div class="q-px-sm lineH"><b>Исходящий номер:</b><br>{{doc.out_number}}</div>
                    </div>
                    <div class="col flexBlock">
                      <div class="self-center"><img src="@/assets/icons/Calendar.svg" /></div>
                      <div class="q-px-sm lineH"><b>Дата создания:</b><br>{{dateFormat(doc.created_at)}}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-xs desp">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="self-center q-pl-xs"><img src="@/assets/icons/file.svg" /></div>
                      <div class="col q-px-sm lineH">
                        <b>Документ:</b>
                        <div class="row">
                          <div class="col">{{doc.file.name}}</div>
                          <div class="col q-px-sm"><i>{{fileSize(doc.file.file_size)}} мб</i></div>
                        </div>
                      </div>
                    </div>
                    <div class="col flexBlock">
                      <div class="self-center"><img src="@/assets/icons/Enter.svg" /></div>
                      <div class="q-px-sm lineH"><b>Входящий номер:</b><br>{{doc.in_number}}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row items-center q-py-md desp">
                <div>
                  <div v-if="value">
                    Подписан
                  </div>
                  <div v-else>
                    Не подписан
                  </div>
                </div>
                <div>
                  <q-toggle
                    v-model="value"
                    color="amber-4"
                    size="74px"
                    @input="changeVal"
                  />
                </div>
                <div class="col"></div>
              </div>

            </div>
            <div class="col-6 q-pl-md rightBlock">

              <div class="row">
                <div class="col q-pb-xs">
                  Изменить статус:
                </div>
              </div>
              <div class="row">
                <div class="col q-pb-md">
                  <q-input standout v-model="searchUser" label="Исполнитель" @input="selUsers">
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="row" v-if="result.length !== 0">
                <div class="col q-pb-md q-pt-sm q-px-md q-mb-sm users">
                  <div
                    v-for="u in result"
                    :key="u.EMP_ID"
                    @click="selectedUser(u)"
                  >
                    <span>{{u.LAST_NAME}} {{u.FIRST_NAME[0]}}. {{u.MIDDLE_NAME[0]}}.</span>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col q-pb-xs">
                  Выберите главного исполнителя
                </div>
              </div>

              <div class="row" v-if="workers.length !== 0">
                <div class="col q-pb-md q-pt-sm q-px-md users">
                  <div
                    v-for="u in workers"
                    :key="u.EMP_ID"
                    :class="activeWorker === u.EMP_ID ? 'active' : ''"
                  >
                    <span @click="selectActiveWorker(u.EMP_ID)">{{u.LAST_NAME}} {{u.FIRST_NAME[0]}}. {{u.MIDDLE_NAME[0]}}.</span>
                    <q-icon name="close" size="xs" class="icon_btn" @click="removeUser(u.EMP_ID)" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col q-pb-xs q-pt-md">
                  Выберите руководителя
                </div>
              </div>
              <div class="row">
                <div class="col q-pb-md">
                  <q-select filled v-model="superior" :options="superiors" label="Руководитель" />
                </div>
              </div>

              <div class="row">
                <div class="col q-pb-xs">
                  Выберите шаблон
                </div>
              </div>
              <div class="row">
                <div class="col q-pb-md">
                  <q-select filled v-model="shablon" :options="shablons" label="Шаблон" />
                </div>
              </div>

            </div>
          </div>

          <div class="row q-pt-lg ">
            <div class="col text-center">
              <q-btn color="blue-14" label="Отправить" size="lg" class="q-mr-lg" @click="saveForm" />
              <q-btn color="white" text-color="black" label="Отменить" size="lg" @click="dialog = false" />
            </div>
          </div>

        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex';
export default {
  props: ['doc'],
  data(){
    return {
      shablon: '',
      superior: '',
      searchUser: '',
      result: [],
      workers: [],
      activeWorker: '',

      dialog: false,
      date: '2019/02/01',
      value: false,
      text: '',
      options: [],
      model: ''
    }
  },
  computed: {
    ...mapState({
          shablons: state => state.assistant.aShablons,
          superiors: state => state.assistant.aSuperiors
        }),
  },
  methods: {
    saveForm(){
      const arr = []
      this.workers.forEach(user => {
        arr.push({
          emp_id: user.EMP_ID,
          check: user.EMP_ID === this.activeWorker ? true : false,
          dep_code: user.DEP_CODE
        })
      })

      const obg = {
        doc_id: [
          this.doc.doc_id
        ],
        data: arr,
        h_emp_id: this.superior.value,
        h_dep_code: this.superior.dep_code,
        type: 1,
        message: String(this.shablon.value),
        status: this.value === true ? 2 : 1
      }
      axios
        .post("/tasks/pomoshnik", obg)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
            console.log('error')
        });
    },
    selectActiveWorker(id){
      this.activeWorker = id
    },
    removeUser(id){
      this.workers = this.workers.filter(user => user.EMP_ID !== id)
      if(this.activeWorker === id) this.activeWorker = ''
    },
    selectedUser(user){
      this.workers.push(user)
      this.searchUser = ''
      this.result = []
    },
    selUsers () {
      if(this.searchUser === '') {this.result = []}
      if(this.searchUser !== '') {
        axios
            .get("/emps/search?name="+this.searchUser)
            .then(response => {
              this.result = response.data
            })
            .catch(error => {
                console.log('error')
            });
      }
    },
    changeVal(){
      console.log(this.value)
    },
    dateFormat(dateNum){
      let d = new Date(dateNum);
      return d.getFullYear() + '-'+ d.getMonth() + '-'+ d.getDate()
    },
    fileSize(file){
      return (file / (1024*1024)).toFixed(2)
    },
    newFile() {
      if(this.doc.file){
        let blob = new Blob([this.doc.file], { type: "application/pdf" });
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = this.doc.file.name;
        link.click();
      }
    }
  },
  created(){
    if(this.doc.start_emps_id !== null && this.doc.doc_status === 2){
      this.value = true
    }

    if(this.doc.task_message) {
      this.shablon = {
        label: this.doc.task_message.name,
        value: this.doc.task_message.id
      }
    }

    if(this.doc.superior) {
      this.superior = {
        label: this.doc.superior.name,
        value: this.doc.superior.emp_id
      }
    }
    if(this.doc.start_emps_id !== null){
      console.log(this.doc.start_emps_id)
      this.workers = this.doc.start_emps_id
    }
    // this.$store.dispatch('getAUser')
  }
}
</script>
<style scoped>
  .users {
    background: #F8F8F8;
    border-radius: 5px;
  }

  .files {font-size: 15px;}
  .desp {font-size: 14px;}
  .cardBlock {
    width: 860px;
    font-size: 16px;
    line-height: 27px;
  }
  .font-14 {
    font-size: 14px;
  }
  .colorGrey {
    color: #787E8C
  }
  .flexBlock {
    display: flex;
  }
  .pad-3 {padding-top: 3px;}
  .pad-2 {padding-top: 2px;}
  .green {color: #47B881;}
  .blue {color: #3576CB;}
  .lineH {line-height: 22px;}
  .comments {
    padding: 20px 0;
    margin: 20px 0;
    border-top: 1px solid #E3E4E8;
  }
  .com_title {
    font-size: 15px;
    color: #787E8C;
    padding-bottom: 10px;
  }
  .com_author {
    color: #282D30;
    font-weight: 600;
  }
  .com_author span {
    color: #787E8C;
    font-size: 12px;
    font-weight: normal;
    padding-left: 15px;
  }
  .com_action div {
    padding-right: 15px;
    font-size: 12px;
    color: #787E8C;
  }
  .com_text {
    line-height: 19px;
  }
  .rightBlock {
    font-size: 14px;
  }
  .users div {
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 4px;
    padding: 5px 10px;
    float: left;
    margin: 10px 10px 0 0;
    cursor: pointer;
  }
  .users div span {
    padding-right: 10px;
  }
  .users div.active, .users div:hover {
    color: #fff;
    background: #0054FE;
  }

</style>
<style>
  .custom_btn div {text-transform: none;}
</style>
