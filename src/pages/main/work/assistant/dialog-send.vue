<template>
    <q-card  style="width:500px">
        
        <q-card-section class="bg-blue-7 text-white">
          <div class="text-h6">Номер документа №<span v-for="doc in docs" :key="doc.doc_id">{{doc.doc_id}}, </span></div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="q-pb-md">            
            <div v-for="(d) in docs" :key="d.doc_id">
                <span>
                    {{d.description.substring(50, 0)}}...
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                        <span v-html="d.description"></span>
                    </q-tooltip>
                </span>
            </div>            
          </div>
          <div class="q-pb-md">
            <q-input
                v-model="searchUser" 
                @input = "selUsers"
                filled
                placeholder="Добавить исполнителей"                
            >
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
          </div>

          

          <div>
            <div 
                v-for="user in result" 
                :key="user.EMP_ID"
                @click="addUser(user)"
                class="result"
            >
                <span v-html="user.LAST_NAME"></span> <span v-html="user.FIRST_NAME"></span> <span v-html="user.MIDDLE_NAME"> </span>
                <q-btn round color="black" size="5px" icon="priority_high" unelevated>
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                        <span v-html="user.DEPARTMENTS_NAME"></span>
                    </q-tooltip>
                </q-btn>
            </div>
          </div>

          <div>
            Выберите главного исполнителя
          </div>
          <div class="q-pb-md q-mb-md selDiv"> 
            <div v-if="users.length === 0" class="text-caption">
                <i>нет исполнителей</i>
            </div> 
           
            <div v-else v-for="u in users" :key="u.EMP_ID" :class="u.EMP_ID === genId ? 'active' : ''">
                <div @click="setGeneral(u.EMP_ID)">
                    <span v-html="u.LAST_NAME"></span> 
                    <span v-html="u.FIRST_NAME.charAt(0)"></span>. 
                    <span v-html="u.MIDDLE_NAME.charAt(0)"></span>.
                </div>
                <q-btn round color="black" icon="clear" size="6px" @click="delUser(u.EMP_ID)" class="usersVer" unelevated />
            </div>         
          </div>
          <div class="clear"></div>

            <div class="q-pb-md">
                <q-select filled v-model="guideId" :options="guideOptions()" label="Выберите руководителя" />
            </div>
          <div class="q-pb-md">
            <q-select filled v-model="taskMessage" :options="optTemplate" label="Выберите шаблон" />
          </div>
          <div class="q-pb-md">
            <q-toggle size="md" v-model="shape" :label="shape ? 'Подписан' : 'Не подписан'" />
          </div>
          
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn label="Закрыть" color="white" text-color="black" v-close-popup />
          <q-btn label="Отправить" color="primary" @click="sendDocument()" v-close-popup />                
        </q-card-actions>
      </q-card>
</template>

<script>
import axios from "axios";
export default {
    props:['docs', 'tab'],
    data() {
        return {
            guideId: null,
            guide: [
                {
                    "EMP_ID": 480,
                    "POST_NAME": "Председатель Правления",
                    "LAST_NAME": "Мирсоатов",
                    "FIRST_NAME": "Алишер",
                    "MIDDLE_NAME": "Кудратуллаевич",
                    "DEP_CODE": "000151",
                    "DEPARTMENTS_NAME": "Руководство"
                },
                {
                    "EMP_ID": 1456,
                    "POST_NAME": "Заместитель Председателя Правления",
                    "LAST_NAME": "Мухамедханов",
                    "FIRST_NAME": "Аброр",
                    "MIDDLE_NAME": "Шухратович",
                    "DEP_CODE": "000151",
                    "DEPARTMENTS_NAME": "Руководство"
                },
                {
                    "EMP_ID": 308,
                    "POST_NAME": "Заместитель Председателя Правления",
                    "LAST_NAME": "Жалилов",
                    "FIRST_NAME": "Баходир",
                    "MIDDLE_NAME": "Амиралиевич",
                    "DEP_CODE": "000151",
                    "DEPARTMENTS_NAME": "Руководство"
                },
                {
                    "EMP_ID": 2010,
                    "POST_NAME": "Заместитель Председателя Правления",
                    "LAST_NAME": "Курамбаев",
                    "FIRST_NAME": "Азамат",
                    "MIDDLE_NAME": "Каримбаевич",
                    "DEP_CODE": "000151",
                    "DEPARTMENTS_NAME": "Руководство"
                },
                {
                    "EMP_ID": 14767,
                    "POST_NAME": "Заместитель Председателя Правления",
                    "LAST_NAME": "Туляганов",
                    "FIRST_NAME": "Кудратилла",
                    "MIDDLE_NAME": "Асатуллаевич",
                    "DEP_CODE": "000151",
                    "DEPARTMENTS_NAME": "Руководство"
                }
            ],
            optTemplate: [ 
                "Пусто", 
                "Прошу рассмотреть", 
                "Прошу рассмотреть в установленном порядке", 
                "Прошу рассмотреть в установленном порядке, согласно поручению",
                "Для использования в работе",
                "К исполнению",
                "К сведению",
                "Прошу организовать встречу",
                "Прошу провести переговоры",
                "Прошу в установленном порядке взять на контроль",
                "Прошу рассмотреть в установленном порядке и принять необходимые меры",
                "Прошу рассмотреть в установленном порядке и доложить",
                "Прошу в установленном порядке взять на контроль и доложить",
                "Прошу в установленном порядке подготовить информацию"
            ],
            taskMessage: null,
            shape: false,
            searchUser: '',
            result: [],
            users: [],
            genId: null
        }
    },
    computed: {
        
    },
    methods: {
        guideOptions () {
            const arr = []
            this.guide.forEach(el => {
                arr.push(
                    {
                        label: el.LAST_NAME+' '+el.FIRST_NAME+' '+el.MIDDLE_NAME,
                        value: el.EMP_ID
                    }
                )
            })
            
            return arr            
        },
        sendDocument() {
            
            const data = []
            this.users.forEach(element => {
                data.push({
                    "emp_id": element.EMP_ID,
                    "check": element.EMP_ID === this.genId ? true : false,
                    "dep_code": element.DEP_CODE
                })
            });

            const ids = []
            this.docs.forEach(el => {
                ids.push(el.doc_id)
            })
            
            const arr = {
                "doc_id": ids,
                "data": data,
                "h_emp_id": this.guideId.value,
                "h_dep_code": "000151",
                "type": 1,
                "message": this.taskMessage,
                "status": this.shape ? 2 : 1
            }

            axios.post('/tasks/pomoshnik', arr)
                .then(function (response) {
                    console.log('response', response);
                })
                .catch(function (error) {
                    console.log('error', error);
                });
        },
        delUser(id) {
            this.users = this.users.filter(u => u.EMP_ID !== id)
            if(this.genId === id) this.genId = null
        },
        setGeneral (id) {
            this.genId = id
        },
        addUser(u) {
            this.users.push(u)
            this.searchUser = ''
            this.result = []
            
        },
        selUsers () {
            
            axios
                .get("/emps/search?name="+this.searchUser)
                .then(response => {                    
                    this.result = response.data
                })
                .catch(error => {
                    console.log('error') 
                });
        },
        
    },
    created () {        
        if(this.taskMessage === null) this.taskMessage = this.taskMes
        if(this.tab === 'tab2') {
            const arr = []
            this.users = []
            this.shape = this.docs[0].doc_status === 2 ? true : false
            this.taskMessage = this.docs[0].task_message
            
            console.log(this.docs[0])
            this.docs[0].tasks.forEach(el => {
                // console.log('el', el)
                arr.push({
                    LAST_NAME: el.last_name,
                    FIRST_NAME: el.first_name,
                    MIDDLE_NAME: el.middle_name,
                    EMP_ID: el.emp_id,
                    check: el.check
                })
            })
            this.users = arr
            this.genId = arr.find(e => e.check === true).EMP_ID
            this.guideId = {
                        label: this.docs[0].tasks[0].h_last_name+' '+this.docs[0].tasks[0].h_first_name+' '+this.docs[0].tasks[0].h_middle_name,
                        value: this.docs[0].tasks[0].h_emp_id
                    }
                        
        }
    }
}
</script>

<style lang="scss" scoped>
    .result {
        cursor: pointer;
        padding: 2px 10px;
    }
    .result:hover, .selDiv div:hover {
        background: #F2F2F2;
        border-radius:4px;
    }
    .result span {padding-right: 5px;}
    .selDiv {
        border: 1px #C2C2C2 solid;
        padding: 10px;
        float: left;
        width: 100%;
        border-radius:5px;
    }
    .clear {clear: both;}
    .selDiv div {
        float: left;
        margin-right: 5px;
        padding: 3px 5px 3px 0;
        cursor: pointer;
    }
    .selDiv span {
        padding-left: 5px;
    }
    .selDiv div.active, .selDiv div.active:hover div {
        background: #F01212;
        color: #fff;
        border-radius:4px;
    }
    .usersVer {
        margin-top: 3px;
    }
</style>