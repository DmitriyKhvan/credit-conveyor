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

            <q-scroll-area ref='chat' class="q-pa-lg messagesList scroll" :style="{height: heightChat}">

                  <template v-if="chatMessages">
                    <div
                      v-for="c in chatMessages"
                      :key="c.id"
                      class="row q-mb-md"
                    >
                      <template v-if="emp_id === c.emp_id || emp_id === c.from_uid">
                        <div class="col"></div>
                        <div class="col-lg-5 col-md-8 message_my q-pa-md">
                            <div class="q-pb-sm">
                                {{c.message}}
                            </div>
                            <q-badge class="description_my">
                                Вы
                            </q-badge>
                            <i>{{c.sent_at}}</i>
                        </div>

                        <div class="avatar_my self-end">
                            <q-avatar>
                                <img :src="getUserProfilePhotoUrl(emp_id)">
                            </q-avatar>
                        </div>
                      </template>

                      <template v-else>
                        <div class="avatar self-end">
                            <q-avatar>
                                <img :src="getUserProfilePhotoUrl(c.emp_id)">
                            </q-avatar>
                        </div>
                        <div class="col-lg-5 col-md-8 col-sm-8 message q-pa-md">
                            <div class="q-pb-sm">
                                {{c.message}}
                            </div>
                            <q-badge class="description">
                                {{chatName(c.name)}}
                            </q-badge>
                            <i>{{c.sent_at}}</i>
                        </div>
                        <div class="col"></div>
                      </template>


                    </div>
                  </template>






                <!-- <div class="row q-mb-md">
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
                </div> -->


            </q-scroll-area>

            <div class=" sendMesage">
                <q-form @submit.prevent="sendMessage" class="row">
                    <div class="col">
                        <q-input ref="input" outlined dense v-model="form.message" label="Сообщение" />
                    </div>

                    <div class="actionWidth text-center self-center"><q-btn icon="attach_file" flat/></div>
                    <div class="actionWidth self-center"><q-btn type="submit" icon="subdirectory_arrow_left" outline  /></div>
                </q-form>
            </div>

        </div>

        <div class="col-4 q-pa-md rightBlock">

            <CRightBlock></CRightBlock>

        </div>
    </q-card>

</template>

<script>
import RightGlobal from './components/RightGlobal'
import { dom } from 'quasar'
const { height } = dom

import { mapGetters } from "vuex";
import commonUtils from "@/shared/utils/CommonUtils";


import axios from "axios";

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
            edTitile: false,


            form: {
                chat_id: null,
                message: "",
                from_uid: null
            },
        }
    },
    methods: {
        editTitle () {
            this.edTitile = false
        },
        sendMessage(e) {
            // e.preventDefault();
            this.form.from_uid = this.emp_id
            this.form.chat_id = this.chatId
            this.socket.emit("msg/send", this.form)
            this.$refs.input.focus()
        },
        formattedDate(date) {
            return commonUtils.formattedDate(date);
        },
        messages(id){
            // let chat = this.allChats.find(el => el.chat_id === id)
            // console.log('chatArr', chat.messages)
            // return chat.messages
        },
        chatName(n){
            let arr = n.split(' ')
            let name = arr[0] + ' '
            arr.forEach((el, i) => {
                if(i !== 0 && i <= 2 && el !=='') {
                    name += el[0] + '.'
                }
            });
            return name
        },
        getUserProfilePhotoUrl(emp_id) {
          return `http://10.8.88.219/index.php?module=Tools&file=phones&prefix=profile&act=img&uid=${emp_id}`;
        },
        formatDate(date) {
          // date = Date.parse(date)
          // console.log(date)
          let dayOfMonth = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
          let hour = date.getHours();
          let minutes = date.getMinutes();
          let diffMs = new Date() - date;
          let diffSec = Math.round(diffMs / 1000);
          let diffMin = diffSec / 60;
          let diffHour = diffMin / 60;

          // форматирование
          year = year.toString().slice(-2);
          month = month < 10 ? '0' + month : month;
          dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
          hour = hour < 10 ? '0' + hour : hour;
          minutes = minutes < 10 ? '0' + minutes : minutes;

          if (diffSec < 1) {
            return 'прямо сейчас';
          } else if (diffMin < 1) {
            return `${diffSec} сек. назад`
          } else if (diffHour < 1) {
            return `${diffMin} мин. назад`
          } else {
            return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
          }
        },
        scrollToBottom () {
            const scrollArea = this.$refs.chat
            const scrollTarget = scrollArea.getScrollTarget();
            const duration = 300; // ms - use 0 to instant scroll
            scrollArea.setScrollPosition(scrollTarget.scrollHeight, duration);
        },

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
        }),
        chatId(){
          return this.$store.getters.getActiveChat
        },
        allChats(){
            return this.$store.getters.getChats
        },
        toUid(){
          return this.$store.getters.getToUid
        },
        chatMessages(){
          if(this.chatId){
            return this.$store.getters.getChatById(this.chatId).messages
          }
        },
        activeChatId(){
            return this.$store.getters.getActiveChat
        },

    },
    updated() {
            this.scrollToBottom()
    },
    created() {
        this.$nextTick(() => {
            this.heightChat = height(eee) - 240 + 'px'
            window.onresize = () => {
               this.heightChat = height(eee) - 240 + 'px'
            }
        })

      this.socket.emit("chat/all", this.emp_id);

      this.socket.on("chat/all", data => {
        const chats =[]
        data.forEach(el=>{

          const ch = {
            chat_id: el.chat_id,
            from_uid: this.emp_id,
            to_uid: el.details[0].emp_id,
            to_name: el.details[0].name,
            messages: el.messages !== null ? el.messages : []
          }
          chats.push(ch)
        })
        this.$store.dispatch('setChat', chats)
      });

      this.socket.on("msg/send", data => {
        this.$store.dispatch('addMessage', data)
        this.form.message = ''
      })



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
