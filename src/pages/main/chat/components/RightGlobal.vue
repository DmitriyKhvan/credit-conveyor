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

            <div class="row q-py-sm q-px-md q-mb-md justify-between roundedBlock">
                <div class="notice">10</div>
                <div class="col">
                    <div class="text-subtitle1"><b>Название чата</b></div>
                    <div class="text-caption grey"><i>35 участников</i></div>
                </div>
                <div class="text-right actionsBlock self-center">
                    <q-btn icon="delete_outline"  color="grey-8" flat />
                </div>
            </div>

            <template v-if="result.length > 0">
            <div
                v-for="user in result"
                :key="user.EMP_ID"
                class="row q-py-sm q-px-md q-mb-md justify-between roundedBlock"
                @click="setActiveChat('', user.EMP_ID)"
                >
                <div class="avatarBlock">
                    <q-avatar>
                        <img :src="getUserProfilePhotoUrl(user.EMP_ID)">
                    </q-avatar>
                </div>
                <div class="col">
                    <div class="text-subtitle1"><b>
                      <span class="user" v-html="user.LAST_NAME"></span>
                      <span v-html="user.LAST_NAME[0]"></span>.
                      <span v-html="user.LAST_NAME[0]"></span>.
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
            <div
                v-for="chat in chats"
                :key="chat.chat_id"
                :class="chatId === chat.chat_id ? 'row q-py-sm q-px-md q-mb-md justify-between roundedBlock active' : 'row q-py-sm q-px-md q-mb-md justify-between roundedBlock'"
                @click="setActiveChat(chat.chat_id, chat.messages[0].to_uid)"
                >
                <div class="avatarBlock">
                    <q-avatar>
                        <img :src="getUserProfilePhotoUrl(chat.from_uid)">
                    </q-avatar>
                </div>
                <div class="col">
                    <div class="text-subtitle1" v-if="chat.messages[0].to_name"><b>{{chatName(chat.messages[0].to_name)}}</b></div>
                    <div class="text-caption">
                        <q-badge class="online">
                            online
                        </q-badge>
                    </div>
                </div>
                <!-- <div class="actionsBlock noBorder text-right self-center">
                    <q-btn icon="chat_bubble_outline" color="grey-8" flat />
                </div> -->
                <div class="actionsBlock text-right actions self-center">
                    <q-btn icon="delete_outline" color="grey-8" flat />
                </div>
            </div>
            </template>

            <!-- <div class="row q-py-sm q-px-md q-mb-md justify-between roundedBlock">
                <div class="avatarBlock">
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar.png">
                    </q-avatar>
                </div>
                <div class="col">
                    <div class="text-subtitle1"><b>Петров А.А.</b></div>
                    <div class="text-caption">
                        <q-badge class="offline">
                            offline
                        </q-badge>
                    </div>
                </div>
                <div class="actionsBlock noBorder text-right self-center">
                    <q-btn icon="chat_bubble_outline" color="grey-8" flat />
                </div>
                <div class="actionsBlock text-right self-center">
                    <q-btn icon="delete_outline" color="grey-8" flat />
                </div>
            </div> -->
        </div>

        <AddChat></AddChat>
    </div>
</template>

<script>
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
        setActiveChat(id, toUid){
            console.log(toUid)
            if(id != '') this.$store.dispatch('setActiveChat', id)
            this.$store.dispatch('setToUid', toUid)
        },
        getUserProfilePhotoUrl(emp_id) {
          return `http://10.8.88.219/index.php?module=Tools&file=phones&prefix=profile&act=img&uid=${emp_id}`;
        },
        selUsers () {
          if(this.searchUser === '') {this.result = []}
          axios
              .get("/emps/search?name="+this.searchUser)
              .then(response => {
                console.log('Users', response.data)
                  this.result = response.data
              })
              .catch(error => {
                  console.log('error')
              });
        },

    },
    computed: {
        chats(){
          console.log('chats', this.$store.getters.getChats)
            return this.$store.getters.getChats
        },
        chatId(){
            return this.$store.getters.getActiveChat
        },
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
