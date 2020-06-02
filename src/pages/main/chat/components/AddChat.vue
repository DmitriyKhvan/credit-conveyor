<template>
    <div>
        <q-btn class="q-mt-md full-width" color="green-6" label="Добавить Чат" @click="dialog = true" />

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
                                <q-input standout class="searchBg rounded-borders" label="Поиск участников" dense>
                                    <template v-slot:append>
                                        <q-icon color="blue-grey" name="search" />
                                    </template>
                                </q-input>
                            </div>
                        </div>


                        <div class="content scroll q-pb-md">
                            <div
                                v-for="i in 10" :key="i"
                                class="row q-py-sm q-px-md q-mb-sm justify-between roundedBlock"
                            >
                                <div class="avatarBlock">
                                    <q-avatar>
                                        <img src="https://cdn.quasar.dev/img/avatar.png">
                                    </q-avatar>
                                </div>
                                <div class="col">
                                    <div class="text-subtitle1"><b>Сидоров А.А.</b></div>
                                    <div class="text-caption">
                                        <q-badge class="online">
                                            online
                                        </q-badge>
                                    </div>
                                </div>
                                <div class="actionsBlock actions self-center">
                                    <q-btn icon="delete_outline" color="grey-8" flat />
                                </div>
                            </div>
                        </div>
                    </div>
                </q-card-section>


                <q-card-actions align="center" class="q-pa-md">
                    <q-btn label="Отменить" class="q-mr-sm" v-close-popup />
                    <q-btn label="Сохранить" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            dialog: false,
            title: ''
        }
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
</style>
