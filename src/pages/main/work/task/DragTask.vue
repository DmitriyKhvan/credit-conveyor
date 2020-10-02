<template>
  <div class="OpenSans row no-wrap">
    <div v-for="column in scene.children" :key="column.id" class="col">
      <div :class="column.id === 'column0' || column.id === 'column1' || column.id === 'column2' ? column.props.className + ' q-mr-md' : column.props.className">
        <div class="card-column-header q-pb-md">
          <q-icon :name="column.icon" size="20px" style="color: #0054FE" />
          {{ column.name }}
        </div>
        <q-scroll-area style="height: 70vh; min-height: 70vh">
        <Container
          group-name="col"
          @drop="(e) => onCardDrop(column.id, e)"
          @drag-start="(e) => log('drag start', e)"
          @drag-end="(e) => log('drag end', e)"
          :get-child-payload="getCardPayload(column.id)"
          drag-class="card-ghost"
          drop-class="card-ghost-drop"
          :drop-placeholder="upperDropPlaceholderOptions"
          style="height: 70vh"
        >
        <!--
          :drag-class="$root.$children[0].$children[0].$children[0].$children[4].$el.attributes[1].value === 'padding-top: 70px; padding-left: 255px;' ? 'card-ghost' : 'card-ghost-o'"

         -->
          <Draggable v-for="card in column.children" :key="card.id">
            <div :class="card.props.className" :style="card.props.style">
              <p style="font-size: 14px">{{ card.data }}</p>
              <div class="row no-wrap justify-around q-pt-md">
                <div class="row items-center">
                  <q-icon name="list" size="25px" style="color: #47B881" />
                  <p class="q-ml-xs">72</p>
                </div>
                <div class="row items-center">
                  <q-icon name="chat" size="25px" style="color: #4AB8FF" />
                  <p class="q-ml-xs">6</p>
                </div>
                <div class="row items-center">
                  <q-icon name="group" size="25px" style="color: #6447B8" />
                  <p class="q-ml-xs">10</p>
                </div>
              </div>
            </div>
          </Draggable>
        </Container>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from './utils/helpers'

const lorem = `Организация по кибербезопасности направляет вам документы по зашиты внутренних систем для ознакомления и принятие соответствующие меры`

const columnNames = ['Новые задания', 'Принял(а) задания', 'Работаю', 'Завершенные задания']

const cardColors = [
  'white'
]
const icons = [
  'r_article',
  'r_assignment_turned_in',
  'r_assignment',
  'r_check_circle'
]

const pickColor = () => {
  const rand = Math.floor(Math.random() * 10)
  return cardColors[rand]
}

const scene = {
  type: 'container',
  props: {
    orientation: 'horizontal'
  },
  children: generateItems(4, i => ({
    id: `column${i}`,
    type: 'container',
    name: columnNames[i],
    icon: icons[i],
    props: {
      orientation: 'vertical',
      className: 'card-container'
    },
    children: generateItems(5, j => ({
      type: 'draggable',
      id: `${i}${j}`,
      props: {
        className: 'card rounded-borders column',
        style: { backgroundColor: pickColor() }
      },
      data: lorem.slice(0, Math.floor(Math.random() * 150) + 30)
    }))
  }))
}

export default {
  name: 'Cards',

  components: { Container, Draggable },

  data () {
    return {
      scene,
      upperDropPlaceholderOptions: {
        className: 'cards-drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true
      }
    }
  },

  methods: {
    onColumnDrop (dropResult) {
      const scene = Object.assign({}, this.scene)
      scene.children = applyDrag(scene.children, dropResult)
      this.scene = scene
    },

    onCardDrop (columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene)
        const column = scene.children.filter(p => p.id === columnId)[0]
        const columnIndex = scene.children.indexOf(column)

        const newColumn = Object.assign({}, column)
        newColumn.children = applyDrag(newColumn.children, dropResult)
        scene.children.splice(columnIndex, 1, newColumn)

        this.scene = scene
      }
    },

    getCardPayload (columnId) {
      return index => {
        return this.scene.children.filter(p => p.id === columnId)[0].children[index]
      }
    },

    dragStart () {
      console.log('drag started')
    },

    log (...params) {
      console.log(...params)
    }
  }
}
</script>
<style scoped>
@font-face {
  font-family: 'OpenSans';
  src: url('~assets/fonts/OpenSans-Regular.ttf') format('truetype');
}
.OpenSans {
  font-family: 'OpenSans';
}
.draggable-item {
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: block;
    background-color: #fff;
    outline: 0;
    border: 1px solid rgba(0, 0, 0, .125);
    margin-bottom: 2px;
    margin-top: 2px;
    cursor: default;
    user-select: none;
}

.draggable-item-horizontal {
    height: 300px;
    padding: 10px;
    line-height: 100px;
    text-align: center;
    width : 200px;
    display: block;
    background-color: #fff;
    outline: 0;
    border: 1px solid rgba(0, 0, 0, .125);
    margin-right: 4px;
    cursor: default;
}

.dragging {
    background-color: yellow;
}

.card-container {
    height: 77vh;
    padding: 10px;
    background-color: #EBEDF4;
}

.card {
    margin: 5px;
    border: 1px solid #eee;
    background-color: white;
    padding: 10px;
}

.card-column-header {
    font-size: 16px;
    font-weight: 600;
    position: sticky;
    top: 0;
    z-index: 99;
    background-color: #EBEDF4;
}

.column-drag-handle {
    cursor: move;
    padding: 5px;
}

.card-ghost {
    transition: transform 0.18s ease;
    transform: rotateZ(5deg);
    position: relative;
    margin-left: -72%;
    margin-right: 72%;
    margin-top: -18%;
    margin-bottom: 18%;
}
.card-ghost-o {
   transition: transform 0.18s ease;
    transform: rotateZ(5deg);
    position: relative;
    margin-left: -18%;
    margin-right: 18%;
    margin-top: -18%;
    margin-bottom: 18%;
}

.card-ghost-drop {
    transition: transform 0.18s ease-in-out;
    transform: rotateZ(0deg);
}

.opacity-ghost {
    transition: all .18s ease;
    opacity: 0.8;
    transform: rotateZ(5deg);
    background-color: cornflowerblue;
    box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.3);
}

.opacity-ghost-drop {
    opacity: 0;
    transform: rotateZ(0deg);
    background-color: white;
    box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.0);
}

.form-demo {
    width: 650px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    display: flex
}

.form {
    flex: 3;
    width: 500px;
    background-color: #f3f3f3;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: 6px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.08), 0px 3px 3px rgba(0, 0, 0, 0.08);
}

.form-fields-panel {
    flex: 1;
    margin-right: 50px;
}

.form-ghost {
    transition: 0.18s ease;
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.08);
}

.form-ghost-drop {
    box-shadow: 0 0 2px 5px rgba(0, 0, 0, 0.0);
}

.drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px;
}

.cards-drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px 45px 5px 5px;
}
.convas {
  position: relative;
  flex-grow: 1;
}
.board {
  user-select: none;
  white-space: nowrap;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: auto;
  padding-bottom: 8px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
