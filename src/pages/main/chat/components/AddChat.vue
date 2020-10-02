<template>
    <div>
        <q-btn class="q-mt-md full-width" color="green-6" label="Создать группу" @click="dialog = true" />
        <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 500px">
                <q-card-section>
                    <div class="q-pa-sm">
                        <div class="row q-pb-md">
                            <div class="col">
                                <q-input outlined v-model="title" label="Название Чата" dense />
                            </div>
                        </div>

                        <div class="row q-pb-md">
                            <div class="col">
                                <q-input
                                  standout
                                  class="searchBg rounded-borders"
                                  v-model="searchUser"
                                  label="Поиск участников"
                                  dense
                                  @input = "selUsers"
                                >
                                    <template v-slot:append>
                                        <q-icon color="blue-grey" name="search" />
                                    </template>
                                </q-input>
                            </div>
                        </div>
                        <div class="content scroll q-pb-md" v-if="result.length !== 0">
                            <div
                                v-for="i in result" :key="i.emp_id"
                                class="row q-py-sm q-px-md q-mb-sm justify-between roundedBlock"
                            >
                                <div class="avatarBlock">
                                    <q-avatar>
                                        <img :src="getUserProfilePhotoUrl(i.emp_id)" @click="addUser(i)">
                                    </q-avatar>
                                </div>
                                <div class="col">
                                    <div class="text-subtitle1" @click="addUser(i)"><b v-html="i.name"></b></div>
                                    <div class="text-caption" @click="addUser(i)">
                                        <q-badge v-if="onlineView(i.emp_id)" class="online">
                                            online
                                        </q-badge>
                                        <q-badge v-else class="offline">
                                            offline
                                        </q-badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="content scroll q-pb-md">
                            <div
                              v-for="i in users" :key="i.emp_id"
                              class="row q-py-sm q-px-md q-mb-sm justify-between roundedBlock"
                            >
                                <div class="avatarBlock">
                                    <q-avatar>
                                        <img :src="getUserProfilePhotoUrl(i.emp_id)">
                                    </q-avatar>
                                </div>
                                <div class="col">
                                    <div class="text-subtitle1"><b v-html="i.name"></b></div>
                                    <div class="text-caption">
                                        <q-badge v-if="onlineView(i.emp_id)" class="online">
                                            online
                                        </q-badge>
                                        <q-badge v-else class="offline">
                                            offline
                                        </q-badge>
                                    </div>
                                </div>
                                <div class="actionsBlock actions self-center">
                                    <q-btn @click="delUser(i.emp_id)" icon="delete_outline" color="grey-8" flat />
                                </div>
                            </div>
                        </div>
                    </div>
                </q-card-section>
                <q-card-actions align="center" class="q-pa-md">
                    <q-btn label="Отменить" class="q-mr-sm" @click="clearForm()" v-close-popup />
                    <q-btn label="Сохранить" color="primary" @click="createGroup()" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import UserService from "@/services/user.service"
import { mapGetters } from "vuex";
import axios from "axios"
export default {
    data () {
        return {
            dialog: false,
            title: '',
            searchUser: '',
            result: [],
            users: []
        }
    },
    computed: {
      ...mapGetters({
          user: "auth/fullName",
          emp_id: "auth/empId",
          socket: "socket/getSocket",
          chatId: 'getActiveChat',
          chats: 'getChats'
        }),
    },
    methods: {
      onlineView(emp_id){
        return UserService.isUserOnline(emp_id)
      },
      getUserProfilePhotoUrl(emp_id) {
        return UserService.getUserProfilePhotoUrl(emp_id);
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
      addUser(user){
        if(!this.users.find(el => el.emp_id === user.emp_id) && this.emp_id !== user.emp_id) this.users.push(user)
        this.searchUser = ''
        this.result = []
      },
      delUser(id){
        this.users = this.users.filter(el => el.emp_id !== id)
      },
      createGroup(){
        if(this.users.length !==0 && this.title){
          let usersIds = []
          this.users.forEach(el => {
            usersIds.push(el.emp_id)
          })

          let grpData = {
            name: this.title,
            description: "description",
            creator: this.emp_id,
            users: usersIds
          };
          this.socket.emit("grp/create", grpData);
        }
      },
      clearForm(){
        this.users = []
        this.searchUser = ''
        this.result = []
      }
    },
    created(){
      this.socket.on("grp/new", data => {
        if (data.users.includes(this.emp_id)) {
          let myData = {
            emp_name: this.user,
            emp_id: this.emp_id,
            chat_id: data.id
          };
          this.socket.emit("grp/join", myData);

          const chat = {
            count: 0,
            type: 2,
            chat_id: data.id,
            emp_id: data.creator,
            to_name: data.name,
            members: data.members,
            messages: [],
            creator: data.creator,
            creator_fio: data.creator_fio
          }
          this.$store.dispatch('addChat', chat )

          this.users = []
          this.searchUser = ''
          this.result = []
        }
      });
    },
}
</script>

<style scoped>
    .content {
        height: 45vh;
    }
    .avatarBlock {
        width: 60px;
    }
    .actionsBlock {
        width: 60px;
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
    .roundedBlock {
      cursor: pointer;
    }
</style>
