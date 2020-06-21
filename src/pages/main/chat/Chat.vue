<template>
    <q-card  class="row q-ma-lg">
        <div class="col-8">
            <div class="row justify-between header q-pa-md">
                <div class="col headerDiv">
                    <div class="text-h6">{{titleName()}}</div>
                    <div class="text-caption"><i>{{countUsers()}} участников</i></div>
                </div>
            </div>
             <q-scroll-area ref='chat' class="q-pa-lg messagesList scroll" :style="{height: heightChat}">
                  <template v-if="messages(chatId, allChats)">
                    <div
                      v-for="c in messages(chatId, allChats)"
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
                            <i>{{formatDate(c.sent_at)}}</i>
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
                            <i>{{formatDate(c.sent_at)}}</i>
                        </div>
                        <div class="col"></div>
                      </template>
                    </div>
                  </template>
            </q-scroll-area>
            <div class=" sendMesage">
                <q-form @submit.prevent="sendMessage" class="row">
                    <div class="col">
                        <q-input ref="inputMessage" outlined dense v-model="form.message" label="Сообщение" />
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
            edTitile: false,
            form: {
                chat_id: null,
                message: "",
                from_uid: null
            },
        }
    },
    methods: {
        titleName(){
          if(this.chatId){
            return this.allChats.find(ch => ch.chat_id === this.chatId).to_name
          } else {
            return 'Выберите чат'
          }
        },
        countUsers(){
          const chat = this.allChats.find(ch => ch.chat_id === this.chatId)
          if(this.chatId){
            if(chat.type === 2){
              return chat.members.length !== null ? chat.members.length + 1 : 0
            } else {
              return '2'
            }
          } else {
            return '0'
          }
        },
        editTitle () {
          this.edTitile = false
        },
        sendMessage(e) {
          e.preventDefault();
          this.form.from_uid = this.emp_id
          this.form.chat_id = this.chatId
          if(this.form.message){
            if(this.allChats.find(ch => ch.chat_id === this.chatId).type === 1){
              console.log('.EMIT - msg/send', this.form)
              this.socket.emit("msg/send", this.form)
            } else {
              let message = {
                chat_id: this.chatId,
                message: this.form.message,
                from_uid: this.emp_id
              };
              console.log(message);
              console.log('.EMIT - grp/msg', this.form)

              this.socket.emit("grp/msg", message);
            }
          }
          this.$refs.inputMessage.focus()
          this.form.message = ''
        },
        formattedDate(date) {
            return commonUtils.formattedDate(date);
        },
        chatName(n){
          if(n.length !== 0){
              let arr = n.split(' ')
              let name = arr[0] + ' '
              arr.forEach((el, i) => {
                  if(i !== 0 && i <= 2 && el !=='') {
                      name += el[0] + '.'
                  }
              });
              return name
            }
        },
        getUserProfilePhotoUrl(emp_id) {
          return `http://10.8.88.219/index.php?module=Tools&file=phones&prefix=profile&act=img&uid=${emp_id}`;
        },
        formatDate(date) {
          let current_datetime = new Date(date)
          let formatted_date = current_datetime.getFullYear() + "." + (current_datetime.getMonth() + 1) + "." + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes()
          return formatted_date
        },
        scrollToBottom () {
            const scrollArea = this.$refs.chat
            const scrollTarget = scrollArea.getScrollTarget();
            const duration = 300; // ms - use 0 to instant scroll
            scrollArea.setScrollPosition(scrollTarget.scrollHeight, duration);
        },
        messages(id, chats){
          if(id){
            let chat = chats.find(mes => mes.chat_id === id)
            return chat.messages
          }
        },
        countReset(id){
          const chat = {
            chat_id: id,
            emp_id: this.emp_id
          }
          axios
            .post("/chat/resetcount", chat)
            .then(response => {
              this.$store.dispatch('delChatCount', id)
            })
            .catch(error => {
              console.log('error')
            });
        }
    },
    computed: {
        ...mapGetters({
          user: "auth/fullName",
          emp_id: "auth/empId",
          inbox: "dicts/receivedNotifications",
          socket: "socket/getSocket",
          userList: "dicts/getUserList",
          chatId: 'getActiveChat',
          allChats: 'getChats',
          toUid: 'getToUid',
        }),
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
        if(data){
          let ch = {}
          data.forEach(el => {
            if (el.type === 2) {
              console.log(data)
              let myData = {
                emp_name: this.user,
                emp_id: this.emp_id,
                chat_id: el.chat_id
              };
              this.socket.emit("grp/join", myData);

              ch = {
                count: el.count,
                type: 2,
                chat_id: el.chat_id,
                emp_id: el.details !== null ? el.details[0].creator : [],
                to_name: el.details !== null ? el.details[0].name: [],
                members: el.details !== null ? el.details[0].members : [],
                messages: el.messages !== null ? el.messages : [],
                creator_fio: el.details !== null ? el.details[0].creator_fio : '',
                creator: el.details !== null ? el.details[0].creator : '',
              }
            } else {
              ch = {
                count: el.count,
                type: 1,
                chat_id: el.chat_id,
                emp_id: el.details !== null ? el.details[0].creator : [],
                to_name: el.details !== null ? el.details[0].name: [],
                to_uid: el.details !== null ? el.details[0].emp_id: [],
                members: el.details !== null ? el.details[0].members : [],
                messages: el.messages !== null ? el.messages : []
              }
            }
            chats.push(ch)
          })
          this.$store.dispatch('setChat', chats)
        }
      });


      // this.socket.on("msg/send", data => {
      //   console.log('.ON - msg/send', data)
      //   this.$store.dispatch('addMessage', data)

      //   if(this.chatId === data.chat_id && data.messages[0].from_uid !== this.emp_id){
      //     console.log('Reset Count')
      //     this.countReset(data.chat_id)
      //   }
      //   if(this.chatId !== data.chat_id){
      //     this.$store.dispatch('addCount', data.chat_id)
      //   }
      //   if(data.messages[0].from_uid === this.emp_id) {
      //     this.form.message = ''
      //   }
      //   // this.socket.emit("chat/all", this.emp_id);
      // })


    },
    beforeDestroy(){
      this.socket.removeListener('msg/send')
      this.socket.removeListener('chat/all')
      this.socket.removeListener('group/usr/new')
      this.socket.removeListener('group/usr/joined')
      this.socket.removeListener('group/usr/add')
      this.socket.removeListener('group/usr/remove')
      this.socket.removeListener('group/usr/drop')
      this.socket.removeListener('group/usr/left')
      this.socket.removeListener('grp/join')
      this.socket.removeListener('grp/new')
      this.socket.removeListener('grp/create')
      this.socket.removeListener('grp/join/message')
      this.socket.removeListener('grp/usr/join')
      this.socket.removeListener('grp/usr/leave')
    }
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

        word-wrap: break-word;
    }
    .message_my {
        font-size: 14px;
        border-radius: 10px 10px 0 10px;
        background: #45A2F9;
        color:#fff;

        word-wrap: break-word;
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
