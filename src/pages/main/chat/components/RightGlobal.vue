<template>
    <div>
        <div class="row q-mb-md">
            <div class="col q-py-sm q-px-md text-h6 rightTitle">
                Чаты
            </div>
        </div>

        <div class="row q-mb-md">
            <div class="col">
                <q-input
                  standout
                  class="searchBg rounded-borders"
                  placeholder="Поиск участников"
                  dense
                  v-model="searchUser"
                  @input = "selUsers"
                >
                    <template v-slot:append>
                        <q-icon color="blue-grey" name="search" />
                    </template>
                </q-input>
            </div>
        </div>

        <div class="chatsList scroll q-pt-md" :style="{height: heightRight}">

            <!-- <div class="row q-py-sm q-px-md q-mb-md justify-between roundedBlock">
                <div class="notice">10</div>
                <div class="col">
                    <div class="text-subtitle1"><b>Название чата</b></div>
                    <div class="text-caption grey"><i>35 участников</i></div>
                </div>
                <div class="text-right actionsBlock self-center">
                    <q-btn icon="delete_outline"  color="grey-8" flat />
                </div>
            </div> -->

            <template v-if="result.length > 0">
            <div
                v-for="user in result"
                :key="user.emp_id"
                class="row q-py-sm q-px-md q-mb-md justify-between roundedBlock"
                @click="setActiveChat('', user.emp_id)"
                >
                <div class="avatarBlock">
                    <q-avatar>
                        <img :src="getUserProfilePhotoUrl(user.emp_id)">
                    </q-avatar>
                </div>
                <div class="col">
                    <div class="text-subtitle1"><b>
                      <span class="user" v-html="user.name"></span>
                    </b></div>
                    <div class="text-caption">
                        <q-badge class="online">
                            online
                        </q-badge>
                    </div>
                </div>
            </div>
            </template>

            <template v-else>
              <!-- {{chats}} -->
              <div
                  v-for="chat in chats"
                  :key="chat.chat_id"
                  :class="chatId === chat.chat_id ? 'row q-py-sm q-px-md q-mb-md justify-between roundedBlock active' : 'row q-py-sm q-px-md q-mb-md justify-between roundedBlock'"

                  >
                  <div class="avatarBlock" @click="selectChat(chat.chat_id)">
                      <q-avatar>
                          <img :src="getUserProfilePhotoUrl(chat.to_uid)">
                      </q-avatar>
                  </div>
                  <div class="col" @click="selectChat(chat.chat_id)">
                      <div class="text-subtitle1"><b v-html="chat.to_name"></b></div>
                      <div class="text-caption">
                          <q-badge class="online">
                              online
                          </q-badge>
                      </div>
                  </div>

                  <div class="actionsBlock text-right actions self-center">
                    <q-btn
                        icon="delete_outline"
                        color="grey-8"
                        flat
                        @click="deleteChat(chat.chat_id)"
                    />
                  </div>
              </div>
            </template>

        </div>

        <AddChat></AddChat>
    </div>
</template>

<script>

import { mapGetters } from "vuex";
import axios from "axios"
import AddChat from './AddChat'
import { dom } from 'quasar'
const { height } = dom

export default {
    components: {
        AddChat
    },
    data () {
        return {
           heightRight: '',
           searchUser: '',
           result: [],
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.heightRight = height(eee) - 290 + 'px'
            window.onresize = () => {
               this.heightRight = height(eee) - 290 + 'px'
            }
        })
    },
    methods:{
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
        selectChat (id) {
          this.$store.dispatch('setActiveChat', id)
        },
        setActiveChat(id, toUid){
            this.$store.dispatch('setToUid', toUid)
            this.result = []
            if(this.chats.find(ch => ch.to_uid === toUid)){ return}
              this.socket.emit("private/create", {
                from_uid: this.emp_id, // kto sozdaet chat
                to_uid: toUid    // s kem
              });

        },
        getUserProfilePhotoUrl(emp_id) {
          return `http://10.8.88.219/index.php?module=Tools&file=phones&prefix=profile&act=img&uid=${emp_id}`;
        },
        selUsers () {
          if(this.searchUser === '') {this.result = []}
          axios
              .get("/emps/reg/search?name="+this.searchUser)
              .then(response => {

                this.result = response.data
              })
              .catch(error => {
                  console.log('error')
              });
        },
        deleteChat(id){
            this.socket.emit("chat/delete", id)
        }

    },
    computed: {
        ...mapGetters({
          emp_id: "auth/empId"
        }),
        ...mapGetters({
          socket: "socket/getSocket"
        }),
        chats(){
          return this.$store.getters.getChats
        },
        chatId(){
            return this.$store.getters.getActiveChat
        },
    },
    created () {
      this.socket.on("private/create", data => {
        console.log('created Chat')
        let name = ''
        axios
          .get("/emps/info?id="+data.to_uid)
          .then(response => {
            name = response.data.LAST_NAME +' '+response.data.FIRST_NAME[0]+'. '+response.data.MIDDLE_NAME[0]+'.'
            const chat = {
              chat_id: data.id,
              from_uid: data.from_uid,
              to_uid: data.to_uid,
              to_name: name,
              messages: []
            }
            this.$store.dispatch('addChat', chat )
            this.$store.dispatch('setActiveChat', data.id)
            this.searchUser = ''
          })
          .catch(error => {
              console.log('error')
          });

      })

      this.socket.on("chat/delete", data => {
          this.$store.dispatch('deleteChat', data)
      })


    }
}
</script>

<style scoped>

    .roundedBlock {
        border-radius: 5px;
        cursor: pointer;
        background: #fff;
        position: relative;
    }
    .notice {
        position: absolute;
        top: -7px;
        left: 0;
        background: #FF6868;
        color: #fff;
        text-align: center;
        padding: 1px 5px;
        border-radius: 5px;
        font-size: 11px;
    }
    .roundedBlock:hover, .active {
        background: #CADFF3;
    }
    .avatarBlock {
        width: 60px;
    }
    .actionsBlock {
        width: 60px;
        border-left: 1px #E5E5E5 solid;
    }
    .roundedBlock:hover .actionsBlock, .active .actionsBlock {
        border-left: 1px #A3BDD6 solid;
    }
    .online {
        background: #4DA706;
    }
    .offline {
        background: #BABABA;
    }


    .searchBg {
        background: #CADFF3;
    }

    .rightTitle {
        background: #fff;
        border-radius: 5px;
    }
    .chatsList {
        height: 49vh;
    }
    .noBorder, .roundedBlock:hover .noBorder, .active .noBorder {border: none;}
    .user {padding-right: 5px;}

</style>
