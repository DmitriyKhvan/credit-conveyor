<template>
    <div>
        <q-btn
            icon="edit"
            color="grey-8"
            flat
            @click="dialog = true"
        />
        <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 500px">
                <q-card-section>
                    <div class="q-pa-sm">
                        <div class="row q-pb-md">
                            <div class="col">
                                <b>{{title}}</b>
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
                                        <q-badge class="online">
                                            online
                                        </q-badge>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div v-else class="content scroll q-pb-md">
                            <div
                              v-for="i in usersChat" :key="i.emp_id"
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
                                        <q-badge class="online">
                                            online
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
                    <q-btn label="Закрыть" class="q-mr-sm" @click="clearForm()" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios"
export default {
    props: ['id'],
    data () {
        return {
            dialog: false,
            title: '',
            searchUser: '',
            result: [],
            users: [],
            group: null
        }
    },
    computed: {
      ...mapGetters({
          emp_id: "auth/empId",
          socket: "socket/getSocket",
          chatId: 'getActiveChat',
          chats: 'getChats'
        }),
        usersChat(){
          const group = this.chats.find(el => el.chat_id === this.id)
          return group.members ? group.members : []
        }
    },
    methods: {
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
      addUser(user){
        if(!this.users.find(el => el.emp_id === user.emp_id) && user.emp_id !== this.emp_id) {
          let usr = this.usersChat.lenght !==0 ? this.usersChat.slice(0) : []
          console.log(user)
          usr.push({name: user.name, emp_id: user.emp_id})
          const arr = {
            chat_id: this.group.chat_id,
            self_uid: this.emp_id, // emp_id user katoriy dobavlaet
            new_uid:  user.emp_id, // emp_id user katoriy dobavlaetsa
            name: this.group.to_name,	 // nazvaniya gruppa
            description: '',	// opisaniya gruppa
            creator: this.group.creator, // emp_id sozdatel
            creator_fio: this.group.creator_fio, // fio sozdatel
            members: usr // spisok uchastniki
          }
          this.socket.emit('group/usr/add', arr)
        }
        this.searchUser = ''
        this.result = []
      },
      delUser(id){
        const arr = {
          chat_id: this.group.chat_id,
          emp_id: id
        }
        this.socket.emit('group/usr/remove', arr)
      },
      clearForm(){
        this.searchUser = ''
        this.result = []
      },
    },
    created(){
      const group = this.chats.find(el => el.chat_id === this.id)
      this.group = group
      this.users = group.members === null ? [] : group.members
      this.title = group.to_name

    },
    beforeDestroy(){

    }
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
