<template>
    
    <q-card  class="row q-ma-lg">
        <div class="col-8">
            <div class="row justify-between header q-pa-md">
                <div class="col headerDiv">
                    <div v-if="edTitile" class="row">
                        <q-input outlined v-model="titleChat" dense style="width:300px" />
                        <q-btn icon="done" size="sm" @click="editTitle" color="grey-8" flat />

                    </div>
                    <div v-else class="text-h6">{{titleChat}}</div>
                    
                    <div class="text-caption"><i>35 участников</i></div>
                </div>
                <div class="col-1 text-right">
                    <q-btn  @click="edTitile = true" icon="create" flat/>
                </div>
            </div>

            <div class="q-pa-lg messagesList scroll" :style="{height: heightChat}">

                <div class="row q-mb-md">
                    <div class="avatar self-end">
                        <q-avatar>
                            <img src="https://cdn.quasar.dev/img/avatar.png">
                        </q-avatar>
                    </div>
                    <div class="col-lg-5 col-md-8 col-sm-8 message q-pa-md">
                        <div class="q-pb-sm">
                            Yeah, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents.
                        </div>
                        <q-badge class="description">
                            Петров А.А.
                        </q-badge>
                        <i>10 минут назад</i>
                    </div>
                    <div class="col"></div>
                </div>

                <div class="row q-mb-md">
                    <div class="col"></div>
                    <div class="col-lg-5 col-md-8 message_my q-pa-md">
                        <div class="q-pb-sm">
                            Yeah, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents.
                        </div>
                        <q-badge class="description_my">
                            Вы
                        </q-badge>
                        <i>10 минут назад</i>
                    </div>
                    
                    <div class="avatar_my self-end">
                        <q-avatar>
                            <img src="https://cdn.quasar.dev/img/avatar.png">
                        </q-avatar>
                    </div>
                </div>

            </div>

            <div class="row sendMesage">
                <div class="col">
                    <q-input outlined dense v-model="text" label="Сообщение" />
                </div>
                <div class="actionWidth text-center self-center"><q-btn icon="attach_file" flat/></div>
                <div class="actionWidth self-center"><q-btn icon="subdirectory_arrow_left" outline  /></div>
            </div>
            
        </div>
        
        <div class="col-4 q-pa-md rightBlock">           

            <CRightBlock></CRightBlock>            

        </div>
    </q-card>
    
</template>

<script>
import RightGlobal from '../components/RightGlobal'
import { dom } from 'quasar'
const { height } = dom

import { mapGetters } from "vuex";
import commonUtils from "@/shared/utils/CommonUtils";

export default {
    name: "Chat",
    components: {
        CRightBlock: RightGlobal
    },
    data () {
        return {
            text: '',
            heightChat: '',
            titleChat: 'Название чата и описание',
            edTitile: false
        }
    },
    methods: {
        editTitle () {
            this.edTitile = false
        }
    },
    computed: {
        ...mapGetters({
        user: "auth/fullName"
        }),
        ...mapGetters({
        emp_id: "auth/empId"
        }),
        ...mapGetters({
        inbox: "dicts/receivedNotifications"
        }),
        ...mapGetters({
        socket: "socket/getSocket"
        }),
        ...mapGetters({
        userList: "dicts/getUserList"
        })
    },
    
    mounted() {
        this.$nextTick(() => {
            this.heightChat = height(eee) - 240 + 'px'
            window.onresize = () => {
               this.heightChat = height(eee) - 240 + 'px'
            }
        })

        this.socket.on("notify", data => {
            console.log(data);
            this.$store.dispatch("dicts/addNotification", data);
            this.$q.notify({
                message: data.title,
                color: "purple",
                position: "bottom-right"
            });
        });
    },
}
</script>

<style scoped>
    .avatar {
        padding-right: 15px;
    }
    .avatar_my {
        padding-left: 15px;
    }
    .message {
        font-size: 14px;
        border-radius: 10px 10px 10px 0;
        background: #EAF3FC;
    }
    .message_my {
        font-size: 14px;
        border-radius: 10px 10px 0 10px;
        background: #45A2F9;
        color:#fff
    }
    .description {
        font-size: 11px;
        background: #9FB7CF;
    }
    .description_my {
        font-size: 11px;
        background: #308BE0;
    }
    .header {
        border-bottom: 1px #E3E3E3 solid;
        padding-bottom: 15px;
    }
    .headerDiv div {
        line-height: 22px;
    }
    .rightBlock {
        background: #EAF3FC;
    }
    .sendMesage {
        border-top: 1px #E3E3E3 solid;
        padding: 20px;
    }
    .messagesList {
        height: 53vh;
    }
    .actionWidth {width: 64px;}
    i {
        font-size: 10px;
        color: #9B9B9B;
        padding-left: 5px;
    }
    .message_my i {color: #fff;}
    </style>