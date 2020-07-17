<template>
  <div>
    <q-btn color="white" text-color="black" size="lg" label="Подробнее" @click="dialog = true" />
    <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="cardBlock q-pa-md"  style="width: 760px; max-width: 80vw;">
        <q-card-section>
          <div class="row">
            <div class="col title">
              {{doc.description}}
            </div>
            <div class="col-1 text-right">
              <q-btn round color="white" text-color="black" icon="clear" flat v-close-popup  />
            </div>
          </div>

          <div class="row font-14 colorGrey q-pt-md">
            <div class="col-8">

              <div class="row q-py-xs">
                <div class="col">
                  <div class="row justify-center">
                    <div class="col">
                      <div>Документ № {{doc.doc_id}}</div>
                    </div>
                    <div class="col flexBlock cursor-pointer" @click="onClick()">
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

              <div class="row q-py-xs">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="pad-3"><img src="@/assets/icons/Send.svg" /></div>
                      <div class="q-px-sm">Статус:</div>
                      <div class="blue"><strong>{{getStatus}}</strong></div>
                    </div>
                    <div class="col flexBlock">
                      <div class="pad-2"><img src="@/assets/icons/List-active.svg" /></div>
                      <div class="q-px-sm">{{doc.paper_count}} листов</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-xs">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="pad-3"><img src="@/assets/icons/Time-Limit.svg" /></div>
                      <div class="q-px-sm">Срок сдачи:</div>
                      <div v-if="doc.deadline"><strong>{{formatDate(doc.deadline)}}</strong></div>
                      <div v-else><strong>нет данных</strong></div>
                    </div>
                    <div v-if="doc.deadline" class="col green">
                      <strong>Осталось 2 дня</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-xs">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="pad-3"><img src="@/assets/icons/Send.svg" /></div>
                      <div class="q-px-sm">От:</div>
                      <div><strong>{{doc.signed_by}}</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-xs">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="self-center"><img src="@/assets/icons/Enter-1.svg" /></div>
                      <div class="q-px-sm lineH">Исходящий номер:<br><strong>{{doc.out_number}}</strong></div>
                    </div>
                    <div class="col flexBlock">
                      <div class="self-center"><img src="@/assets/icons/Enter.svg" /></div>
                      <div class="q-px-sm lineH">Входящий номер:<br><strong>{{doc.in_number}}</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-py-sm">
                <div class="col">
                  <div class="row">
                    <div class="col flexBlock">
                      <div class="self-center"><img src="@/assets/icons/Enter-1.svg" /></div>
                      <div class="q-px-sm lineH">Исходящая дата:<br><strong>{{formatDate(doc.out_date)}}</strong></div>
                    </div>
                    <div class="col flexBlock">
                      <div class="self-center"><img src="@/assets/icons/Enter.svg" /></div>
                      <div class="q-px-sm lineH">Входящая дата:<br><strong>{{formatDate(doc.in_date)}}</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row comments">
                <div class="col">
                  <div class="row">
                    <div class="col com_title">Комментарии:</div>
                  </div>
                  <template v-if="doc.tasks && doc.tasks[0].comments">
                    <div
                      v-for="com in doc.tasks[0].comments"
                      :key="com.id"
                      class="row q-pb-md com_block"
                    >
                      <div class="col-1">
                        <q-avatar size="32px">
                          <img src="https://cdn.quasar.dev/img/avatar.png">
                        </q-avatar>
                      </div>
                      <div class="col q-px-sm">
                        <div class="com_author"><strong>{{com.last_name}} {{com.first_name}} {{com.middle_name}} <span>03.06.2020</span></strong></div>
                        <div class="com_text">
                          {{com.text}}
                        </div>
                        <!-- <div class="com_action flexBlock">
                          <div>редактирвоать</div>
                          <div>удалить</div>
                        </div> -->
                      </div>
                    </div>
                  </template>
                </div>
              </div>

            </div>
            <div class="col-4 rightBlock">
              <div class="row">
                <div class="col">
                  Отвественные:
                </div>
              </div>

              <div class="row">
                <div class="col users">
                  <div v-for="u in doc.start_emps_id" :key="u.emp_id">
                    {{u.last_name}} {{u.first_name[0]}}. {{u.middle_name[0]}}.
                  </div>
                </div>
              </div>

              <div class="row q-pt-md">
                <div class="col">
                  Изменить статус:
                </div>
              </div>
              <div class="row">
                <div class="col q-py-sm">
                  <q-select
                    filled
                    v-model="selectedStatus"
                    :options="statuses"
                    label="Статус"
                    dense
                  />
                </div>
              </div>

              <div class="row q-pt-sm">
                <div class="col">
                  Установить новый срок:
                </div>
              </div>
              <div class="row">
                <div class="col q-py-sm">
                  <q-input filled v-model="date" mask="date" :rules="['date']" dense>
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="row">
                <div class="col custom_btn">
                  <q-btn
                    color="blue-14"
                    size="md"
                    label="Сохранить"
                    class="full-width"
                    @click="saveDocument"
                  />
                </div>
              </div>

            </div>
          </div>

        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapGetters } from 'vuex';
export default {
  props: ['doc'],
  data(){
    return {
      selectedStatus: '',
      dialog: false,
      date: '2020/01/01',
      model: '',
      startStatus: ''
    }
  },
  created(){
    this.selectedStatus = this.statuses.find(el => el.value === this.doc.doc_status)
    this.startStatus = this.doc.doc_status
    if(this.doc.deadline) {this.date = this.formatDate(this.doc.deadline)} else {this.date = '2020/01/01'}

    // if(this.doc.deadline) this.date = this.doc.deadline
  },
  computed: {
    ...mapState({
        statuses: state => state.apparat.aFilters.statuses
      }),
    ...mapGetters([
          'getNameStatus'
      ]),
    getStatus() {
      return this.getNameStatus(this.doc.doc_status)
    }
  },
  methods: {
    onClick() {
      axios({
          url: 'files/' + this.doc.file.id,
          method: 'GET',
          responseType: 'blob',
        }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'file.pdf');
          document.body.appendChild(fileLink);

          fileLink.click();
        });
    },
    upStatus(id, status){
      const obj = {
          id,
          status
        }
      this.$store.dispatch('updateDocStatus', obj)
    },
    saveDocument(){
      if(this.selectedStatus.value === this.startStatus || this.selectedStatus.value === 3) {
        const arr = {
          doc_id: [this.doc.doc_id],
          status: this.selectedStatus.value
        }
        this.$store.dispatch('updateDocStatus', arr)
      }
      const arr = {
          doc_id: [this.doc.doc_id],
          deadline: this.date
        }
      this.$store.dispatch('updateDocStatus', arr)
      this.dialog = false
    },
    formatDate(data){
      const d = new Date(data)
      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
      const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
      return `${ye}/${mo}/${da}`
    }
  }
}
</script>
<style scoped>
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
    padding: 4px 0 4px 15px;
  }
  .users div {
    background: #3576CB;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
    float: left;
    margin: 5px 0;
  }

</style>
<style>
  .custom_btn div {text-transform: none;}
</style>
