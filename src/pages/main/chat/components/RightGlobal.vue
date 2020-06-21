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
                        <q-badge v-if="onlineView(user.emp_id)" class="online">
                            online
                        </q-badge>
                        <q-badge v-else class="offline">
                            offline
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
                  <div v-if="chat.count !== 0 && chat.count" class="notice">{{chat.count}}</div>
                  <div v-if="chat.type === 1" class="avatarBlock" @click="selectChat(chat.chat_id)">
                      <q-avatar>
                          <img :src="getUserProfilePhotoUrl(chat.to_uid)">
                      </q-avatar>
                  </div>
                  <div class="col" @click="selectChat(chat.chat_id)">
                      <div v-if="chat.type === 1" class="text-subtitle1"><b v-html="chatName(chat.to_name)"></b></div>
                      <div v-else class="text-subtitle1"><b v-html="chat.to_name"></b></div>
                      <div class="text-caption">
                          <template v-if="chat.type === 1">
                            <q-badge v-if="onlineView(chat.to_uid)" class="online">
                                online
                            </q-badge>
                            <q-badge v-else class="offline">
                                offline
                            </q-badge>
                          </template>
                          <div v-if="chat.type === 2">
                            {{chat.members !== null ? chat.members.length + 1 : 0}}  участников
                          </div>
                      </div>
                  </div>
                  <div v-if="chat.type === 2" class="actionsBlock text-right actions self-center">
                    <edit-group :id="chat.chat_id"></edit-group>
                  </div>
                  <template v-if="chat.type === 2">
                    <div v-if="chat.emp_id === emp_id" class="actionsBlock text-right actions self-center">
                      <q-btn
                          icon="delete_outline"
                          color="grey-8"
                          flat
                          @click="deleteChat(chat)"
                      />
                    </div>
                  </template>
                  <template v-else>
                    <div class="actionsBlock text-right actions self-center">
                      <q-btn
                          icon="delete_outline"
                          color="grey-8"
                          flat
                          @click="deleteChat(chat)"
                      />
                    </div>
                  </template>
              </div>
            </template>
        </div>
        <AddChat></AddChat>
    </div>
</template>

<script>
import UserService from "@/services/user.service"
import { mapGetters } from "vuex";
import axios from "axios"
import AddChat from './AddChat'
import EditGroup from './EditGroup'
import { dom } from 'quasar'
const { height } = dom

export default {
    components: {
        AddChat,
        EditGroup
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
        onlineView(emp_id){
          return UserService.isUserOnline(emp_id)
        },
        chatName(n){
          if(n.length !== 0 && n !== null){
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
        selectChat (id) {
          this.$store.dispatch('setActiveChat', id)
          const chat = {
            chat_id: id,
            emp_id: this.emp_id
          }

          if(this.chats.find(ch => ch.chat_id === id).count !== 0){
            console.log('Reset count')
            this.$store.dispatch('delChatCount', id)
            axios
                .post("/chat/resetcount", chat)
                .then(response => {
                })
                .catch(error => {
                  console.log('error')
                });
          }
        },
        setActiveChat(id, toUid){
            if(this.emp_id !== toUid && this.emp_id !== toUid) this.$store.dispatch('setToUid', toUid)
            this.result = []
            if(this.chats.find(ch => ch.to_uid === toUid) || this.emp_id === toUid){return}
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
          if(this.searchUser !== '') {
            axios
                .get("/emps/reg/search?name="+this.searchUser)
                .then(response => {
                  this.result = response.data
                })
                .catch(error => {
                    console.log('error')
                });
          }
        },
        deleteChat(chat){
          if(chat.type === 1){
            this.socket.emit("chat/delete", chat.chat_id)
          } else if(chat.emp_id === this.emp_id){
            console.log('delete chat click', chat.chat_id)
            this.socket.emit("chat/delete", chat.chat_id)
          } else {
            this.socket.emit("grp/delete", {
              chatId: chat.chat_id
            })
          }
        }
    },
    computed: {
        ...mapGetters({
          emp_id: "auth/empId",
          socket: "socket/getSocket",
          chatId: 'getActiveChat',
          chats: 'getChats'
        }),
    },
    created () {
      this.socket.on("private/create", data => {
        let chat = {}
        let name = ''
        if(data.to_uid !== this.emp_id){
          name = data.to_name.split(" ")
          chat = {
            count: 0,
            type: 1,
            chat_id: data.id,
            from_uid: data.from_uid,
            to_uid: data.to_uid,
            to_name: name[0] +' '+ name[1][0] +'. '+ name[2][0] + '. ',
            messages: []
          }
        } else {
          name = data.from_name.split(" ")
          chat = {
            count: 0,
            type: 1,
            chat_id: data.id,
            from_uid: data.to_uid,
            to_uid: data.from_uid,
            to_name: name[0] +' '+ name[1] +'. '+ name[2] + '. ',
            messages: []
          }
        }

        this.$store.dispatch('addChat', chat )
        // this.$store.dispatch('setActiveChat', data.id)
        this.searchUser = ''
      })

      this.socket.on("chat/delete", data => {
        // console.log('chat/delete', data)
        this.$store.dispatch('deleteChat', data)
      })
      // this.socket.on("group/grp/leave", data => {
      //   // console.log('group/grp/leave')
      //   this.$store.dispatch('delUserGroup', data)

      // })
      // this.socket.on("group/usr/leave", data => {
      //   // console.log('group/usr/leave')
      //   this.$store.dispatch('deleteChat', data)
      // })

      // this.socket.on('group/usr/new', data => {
      //   // console.log('group/usr/new')
      //   this.$store.dispatch('addUserToGroup', data )
      // })
      // this.socket.on('group/usr/joined', data => {
      //   // console.log('group/usr/joined', data)
      //   this.$store.dispatch('addUserToGroup', data )
      // })
      this.socket.on('group/usr/drop', data => {
        // console.log('group/usr/drop')
        this.$store.dispatch('deleteChat', data )
      })
      // this.socket.on('group/usr/left', data => {
      //   // console.log('group/usr/left', data)

      //   this.$store.dispatch('delUserGroup', data )
      //   const users = this.chats.find(ch => ch.chat_id === data.chat_id)
      //   if(users.members.length === 0) {
      //     this.socket.emit("chat/delete", data.chat_id)
      //   }
      // })
      // this.socket.on('group/usr/remove', data => {
      //   console.log('group/usr/remove')
      //   this.$store.dispatch('delUserGroup', data )
      // })

      this.socket.on("grp/join/message", data => {
        console.log({ joinmsg: data });
      });


    // NEW
    this.socket.on("grp/usr/join", data => {
      console.log({ joinmsg: data });
      this.$store.dispatch('addUserToGroup', data )

      if (data.self_uid == this.emp_id) {
        console.log(
          "you are adding " + data.new_uname + "to chat: " + data.chat_id
        );
      } else if (data.new_uid == this.emp_id) {
        console.log(
          data.self_uname + " is adding you to chat: " + data.chat_id
        );

        let myData = {
          emp_name: data.new_uname,
          emp_id: this.emp_id,
          chat_id: data.chat_id
        };

        this.socket.emit("grp/join", myData);
      } else {
        console.log(
          data.self_uname +
            " is adding " +
            data.new_uname +
            " to chat: " +
            data.chat_id
        );
      }
    });

    this.socket.on("grp/usr/leave", data => {
      console.log({ leavemsg: data });
      this.$store.dispatch('delUserGroup', data )
      const users = this.chats.find(ch => ch.chat_id === data.chat_id)
      if(users.members.length === 0) {
        this.socket.emit("chat/delete", data.chat_id)
      }

      if (data.emp_id === this.emp_id) {
        console.log("you re kicked from group " + data.chat_id);
        this.socket.emit("grp/leave", data);
        this.$store.dispatch('deleteChat', data.chat_id )
      } else {
        console.log(data.emp_id, " kicked form chat " + data.chat_id);

      }
    });

    },
    beforeDestroy(){
      this.socket.removeListener('private/create')
      this.socket.removeListener('chat/delete')
      this.socket.removeListener('group/create')
      this.socket.removeListener('group/grp/leave')
      this.socket.removeListener('group/usr/leave')
      this.socket.removeListener('group/usr/new')
      this.socket.removeListener('group/usr/joined')
      this.socket.removeListener('group/usr/add')
      this.socket.removeListener('group/usr/remove')
      this.socket.removeListener('group/usr/drop')
      this.socket.removeListener('group/usr/left')
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
        left: 5px;
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
