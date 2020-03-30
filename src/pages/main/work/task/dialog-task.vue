<template>
    <q-card  style="width:500px"> 
        <q-card-section class="bg-blue-7 text-white header">
            <div class="text-h6">Документ №6765</div>
            <q-btn icon="clear" flat text-color="white" v-close-popup />
        </q-card-section>
        
        <div class="row q-pa-md">
            <div class="col-8 q-pr-md">
                <div class="text-h6">
                    Поручение по письму Министерства  РУз также призвал глав муниципалитетов разъяснить пожилым гражданам необходимость оставаться дома и исключить
                </div>
                <div class="iconsBlock q-py-sm">
                    <div class="icon q-pr-xs"><q-icon name="insert_drive_file" /></div>
                    <div>
                        документ.pdf<br>
                        <i>600кб</i>  
                    </div>                    
                </div>
                <q-separator />

                <div class="comments scroll q-pb-md" style="max-height: 45vh">
                    <div 
                        class="comment q-pt-md"
                        v-for="(c, i) in 3"
                        :key="i"
                    >
                        <div class="avatar q-pr-md">
                            <q-avatar>
                                <img src="https://cdn.quasar.dev/img/avatar.png">
                            </q-avatar>
                        </div>
                        <div class="textComment">
                            <div class="title">
                                Касымова Камила <i>2 минуты назад</i>
                            </div>
                            <div class="content">
                                короткое содержания комментария
                            </div>
                            <div class="actions">
                                <div>редактировать</div> | <div>удалить</div>
                            </div>
                        </div>
                    </div>
                </div>

                <q-separator />

                <div class="addComment q-py-md">
                    <div class="addAvatar q-pr-md">
                        <q-avatar>
                            <img src="https://cdn.quasar.dev/img/avatar.png">
                        </q-avatar>
                    </div>
                    <div class="addText">
                        <q-input
                            v-model="text"
                            outlined
                            type="textarea"
                            label="Outlined"
                            dense
                        />
                        <q-btn color="white q-mt-sm" text-color="black" label="Отправить" />
                    </div>
                </div>

            </div>

            <div class="col-4 q-pa-md rightBlock">
                <div class="rightActions">
                    <div class="buttonLeft"><q-select dense filled v-model="model" :options="options" label="Статус" /></div>
                    <div class="q-pl-md"><q-btn color="primary" text-color="white" label="Отправить" /></div>
                </div>
                <div class="q-py-md">
                    <q-select dense outlined text-color="black" v-model="model" :options="options" label="Выберите исполнителей" />
                </div>
                <div class="usersRight q-pb-md">
                    <q-chip color="red" text-color="white">
                        Хакимов Ф.Е.
                    </q-chip>
                    <div class="userLine">Мирсаев У.А.</div>
                    <div class="userLine">Хамдамов А.А.</div>
                    <div class="userLine">Баратов С</div>
                </div>
                <q-separator />
                <div class="general">
                    От: Мамхмудов К.Р
                </div>
                <q-separator />
                <div class="files q-pt-sm">
                    <div class="iconRight q-pr-xs"><q-icon name="insert_drive_file" /></div>
                    <div>
                        Файлы:
                    </div>
                </div>
                <div class="docs">
                    <a href="#">документ.pdf</a>
                    <a href="#">документ-2.doc</a>
                </div>
                <q-file 
                    class="q-mt-md"
                    outlined 
                    dense 
                    clearable 
                    color="primary" 
                    standout 
                    bottom-slots 
                    v-model="model" 
                    label="Загрузить">
                    <template v-slot:prepend>
                        <q-icon name="attach_file" />
                    </template>
                </q-file>
                <q-separator />
                <div class="date">
                    создано: 20.01.2019<br>
                    обновление: 1 день назад
                </div>
            </div>
        </div>


        <!-- <q-card-section style="max-height: 70vh" class="scroll">
                 
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
            <q-btn label="Закрыть" color="white" text-color="black" v-close-popup />                    
        </q-card-actions> -->
    </q-card>
</template>

<script>
export default {
    data () {
        return {
            model: null,
            options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
        }
    }
}
</script>

<style lang="scss" scoped>
    .iconsBlock {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .icon {
        font-size: 36px;
    }
    .rightBlock {
        background: #F8F8F8;
    }
    .comment, .actions, .addComment, .rightActions {
        display: flex;
    }
    .title {
        font-size: 16px;
        font-weight: bold;
    }
    .title i {
        font-size: 12px;
        font-weight: normal;
        color: #8B8B8B;
    }
    .actions {
        font-size: 12px;
        font-style: italic;
        color: #8B8B8B;
    }
    .actions div {
        padding-right: 5px ;
        cursor: pointer;
    }
    .actions div + div {
        padding-left: 5px;
    }
    .addText {
        width: 100%;
    }
    .buttonLeft {
        width: 150px;
    }
    
    .userLine {
        padding-left: 15px;
    }
    .general {
        padding: 15px;
        font-size: 16px;
    }
    .iconRight {font-size: 26px;}
    .files {
        display: flex;
        font-size: 16px;
        align-items: center;
    }
    .docs {
        padding-left: 30px;
        
    }
    .docs a {
        color: #575757;
        text-decoration: none;
        display: block;
    }
    .date {
        color: #575757;
        font-style: italic;
        padding: 15px;
    }
    .header {
        display: flex;
        justify-content: space-between;
    }
    
</style>