<template>
    <div class="q-ma-lg column no-wrap OpenSansBold">
        <div class="row no-wrap justify-between full-width items-center q-mb-lg">
            <div class="row col no-wrap">
                <q-btn size="60" @click="setTab(1)" icon="list" color="white" :text-color="dtab === 1 ? 'blue-6' : 'grey'" flat class="bg-white q-py-xs" />
                <q-btn size="60" @click="setTab(2)" icon="check_box_outline_blank" color="white" :text-color="dtab === 2 ? 'blue-6' : 'grey'" flat class="bg-white q-ml-md q-py-xs" />
            </div>
            <div class="row col no-wrap">
                 <q-select  class="col bg-white text-no-wrap overflow-hidden ellipsis q-mr-md rounded-borders"
                            v-model="model" 
                            :options="options"
                            outlined
                            label="Сортировать по"
                            transition-show="jump-up"
                            transition-hide="jump-up"
                            dropdown-icon="o_arrow_drop_down"
                            clearable
                        />
                <q-input    class="col rounded-borders no-outline"
                            standout="bg-white text-red"
                            bg-color="white"
                            label-color="black" 
                            clearable
                            label="Поиск">
                    <template v-slot:append style="float-right">
                        <q-btn round flat icon="search" />
                    </template>
                </q-input>
            </div>
        </div>
        <!-- <div class="row no-wrap justify-between q-pt-md q-gutter-md">

            <div class="col column no-wrap q-pa-sm rounded-borders justify-start" style="background: #EBEDF4">
                <div class="row no-wrap items-center q-mb-md">
                    <q-icon name="r_article" size="30px" style="color: #0054FE" />
                    <div class="col text-weight-bolder q-ml-md">Новые задания</div>
                </div>
                <a-task :list="list1"></a-task>
            </div>

            <div class="col column no-wrap q-pa-sm rounded-borders justify-start" style="background: #EBEDF4">
                <div class="row no-wrap items-center q-mb-md">
                    <q-icon name="r_assignment_turned_in" size="30px" style="color: #0054FE" />
                    <div class="col text-weight-bolder q-ml-md">Принял(а) задания</div>
                </div>
                <a-task :list="list2"></a-task>
            </div>

            <div class="col column no-wrap q-pa-sm rounded-borders justify-start" style="background: #EBEDF4">
                <div class="row no-wrap items-center q-mb-md">
                    <q-icon name="r_assignment" size="30px" style="color: #0054FE" />
                    <div class="col text-weight-bolder q-ml-md">Работаю</div>
                </div>
                <a-task :list="list3"></a-task>
            </div>

            <div class="col column no-wrap q-pa-sm rounded-borders justify-start" style="background: #EBEDF4">
                <div class="row no-wrap items-center q-mb-md">
                    <q-icon name="r_check_circle" size="30px" style="color: #0054FE" />
                    <div class="col text-weight-bolder q-ml-md">Завершенные задания</div>
                </div>
                <a-task :list="list4"></a-task>
            </div>
            
            
        </div> -->
        <div class="row no-wrap justify-between q-pt-md q-gutter-md full-width">
            <div class="col  no-wrap q-pa-sm rounded-borders justify-start q-ml-none" style="background: #EBEDF4;border-bottom-left-radius:0px;border-bottom-right-radius:0px;">
                <div class="row no-wrap items-center">
                    <q-icon name="r_article" size="30px" style="color: #0054FE" />
                    <div class="col text-weight-bolder q-ml-md text-no-wrap">Новые задания</div>
                </div>
            </div>
            <div class="col  no-wrap q-pa-sm rounded-borders justify-start" style="background: #EBEDF4;border-bottom-left-radius:0px;border-bottom-right-radius:0px;">
                <div class="row no-wrap items-center">
                    <q-icon name="r_assignment_turned_in" size="30px" style="color: #0054FE" />
                    <div class="col text-weight-bolder q-ml-md text-no-wrap">Принял(а) задания</div>
                </div>
            </div>
            <div class="col  no-wrap q-pa-sm rounded-borders justify-start" style="background: #EBEDF4;border-bottom-left-radius:0px;border-bottom-right-radius:0px;">
                <div class="row no-wrap items-center">
                    <q-icon name="r_assignment" size="30px" style="color: #0054FE" />
                    <div class="col text-weight-bolder q-ml-md text-no-wrap">Работаю</div>
                </div>
            </div>
            <div class="col  no-wrap q-pa-sm rounded-borders justify-start" style="background: #EBEDF4;border-bottom-left-radius:0px;border-bottom-right-radius:0px;">
                <div class="row no-wrap items-center">
                    <q-icon name="r_check_circle" size="30px" style="color: #0054FE" />
                    <div class="col text-weight-bolder q-ml-md text-no-wrap">Завершенные задания</div>
                </div>
            </div>
        </div>
        <q-scroll-area style="height: 65vh">
            <div class="row no-wrap justify-between q-gutter-md full-width full-width">
                <a-task :list="list1" class="col no-wrap q-pa-sm q-ml-none" style="background: #EBEDF4"></a-task>
                <a-task :list="list2" class="col no-wrap q-pa-sm" style="background: #EBEDF4"></a-task>
                <a-task :list="list3" class="col no-wrap q-pa-sm" style="background: #EBEDF4"></a-task>
                <a-task :list="list4" class="col no-wrap q-pa-sm" style="background: #EBEDF4"></a-task>
            </div>
        </q-scroll-area>
    </div>
</template>
<script>
import Task from './components/ManagmentTask'
import { mapState } from 'vuex';

export default {
    name: 'DragTask',
    data () {
        return {
            list1: [
                { name: 'Организация по кибербезопасности направляет вам документы по зашиты внутренних систем для ознакомления и принятие соответствующие меры', id: 1 },
                { name: 'Организация по кибербезопасности направляет вам документы по зашиты внутренних систем для ознакомления и принятие соответствующие меры', id: 3 },
                { name: 'Организация по кибербезопасности направляет вам документы по зашиты внутренних систем для ознакомления и принятие соответствующие меры', id: 2 },
                { name: 'Организация по кибербезопасности направляет вам документы по зашиты внутренних систем для ознакомления и принятие соответствующие меры', id: 4 }
            ],
            list2: [
                { name: 'Организация по кибербезопасности направляет вам документы по зашиты внутренних систем для ознакомления и принятие соответствующие меры', id: 6 },
                { name: 'Организация по кибербезопасности направляет вам документы по зашиты внутренних систем для ознакомления и принятие соответствующие меры', id: 5 },
                { name: 'Организация по кибербезопасности направляет вам документы по зашиты внутренних систем для ознакомления и принятие соответствующие меры', id: 7 }
            ],
            list3: [
                { name: 'Организация по кибербезопасности направляет вам документы по зашиты внутренних систем для ознакомления и принятие соответствующие меры', id: 8 },
            ],
            list4: [],
            model: null,
            options: [
                'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
            ]
        }
    },
    components: {
        ATask: Task
    },
    methods: {
        setTab(n) {
            this.$store.dispatch('tTabChange', n)
        },
        handler1 (mutationRecords) {
        this.status1 = []
        for (const index in mutationRecords) {
            const record = mutationRecords[index]
            const info = `type: ${record.type}, nodes added: ${record.addedNodes.length > 0 ? 'true' : 'false'}, nodes removed: ${record.removedNodes.length > 0 ? 'true' : 'false'}, oldValue: ${record.oldValue}`
            this.status1.push(info)
        }
        },

        handler2 (mutationRecords) {
        this.status2 = []
        for (const index in mutationRecords) {
            const record = mutationRecords[index]
            const info = `type: ${record.type}, nodes added: ${record.addedNodes.length > 0 ? 'true' : 'false'}, nodes removed: ${record.removedNodes.length > 0 ? 'true' : 'false'}, oldValue: ${record.oldValue}`
            this.status2.push(info)
        }
        },
        handler3 (mutationRecords) {
        this.status3 = []
        for (const index in mutationRecords) {
            const record = mutationRecords[index]
            const info = `type: ${record.type}, nodes added: ${record.addedNodes.length > 0 ? 'true' : 'false'}, nodes removed: ${record.removedNodes.length > 0 ? 'true' : 'false'}, oldValue: ${record.oldValue}`
            this.status3.push(info)
        }
        },
        handler4 (mutationRecords) {
        this.status4 = []
        for (const index in mutationRecords) {
            const record = mutationRecords[index]
            const info = `type: ${record.type}, nodes added: ${record.addedNodes.length > 0 ? 'true' : 'false'}, nodes removed: ${record.removedNodes.length > 0 ? 'true' : 'false'}, oldValue: ${record.oldValue}`
            this.status4.push(info)
        }
        },
        
        // store the id of the draggable element
        onDragStart (e) {
        e.dataTransfer.setData('text', e.target.id)
        e.dataTransfer.dropEffect = 'move'
        },

        onDragEnter (e) {
        // don't drop on other draggables
        if (e.target.draggable !== true) {
            e.target.classList.add('drag-enter')
        }
        },

        onDragLeave (e) {
        e.target.classList.remove('drag-enter')
        },

        onDragOver (e) {
        e.preventDefault()
        },

        onDrop (e) {
        e.preventDefault()

        // don't drop on other draggables
        if (e.target.draggable === true) {
            return
        }

        const draggedId = e.dataTransfer.getData('text')
        const draggedEl = document.getElementById(draggedId)

        // check if original parent node
        if (draggedEl.parentNode === e.target) {
            e.target.classList.remove('drag-enter')
            return
        }

        // make the exchange
        draggedEl.parentNode.removeChild(draggedEl)
        e.target.appendChild(draggedEl)
        e.target.classList.remove('drag-enter')
        }
    },
    computed: {
        ...mapState({
            dtab: state => state.tasks.tTab,
            list: state => state.tasks.tList,
            viewTasks: state => state.tasks.tViewTasks,
            tasks: state => state.tasks.tTasks,
        }),
    }
}
</script>
<style scoped lang="sass">
.drop-target
  min-height: 300px
  background-color: gainsboro
  diplay: flex
  flex: auto
.drag-enter
  outline-style: none

.box
  width: 100%
  height: 300px
  float: left
  cursor: pointer
  &:active
    cursor: grab
  

@media only screen and (max-width: 500px)
  .drop-target
    height: 200px
    width: 100px
    min-width: 100px
    background-color: gainsboro

  .box
    width: 50px
    height: 50px

.box:nth-child(3)
  clear: both

.navy
  background-color: navy

.red
  background-color: firebrick

.green
  background-color: darkgreen

.orange
  background-color: orange
</style>
<style scoped>
@font-face {
  font-family: 'OpenSansBold';
  src: url('~assets/fonts/OpenSans-Regular.ttf') format('truetype');
}
.OpenSansBold {
  font-family: 'OpenSansBold';
  font-weight: 500;
}
</style>

