<template>
  <div class="card-scene">
    <Container
      orientation="horizontal"
      @drop="onColumnDrop($event)"
      drag-handle-selector=".column-drag-handle"
      :drop-placeholder="upperDropPlaceholderOptions"
    >
      <Draggable v-for="column in scene.children" :key="column.id">
        <div :class="column.props.className">
          <div class="card-column-header">
            <span class="column-drag-handle">&#x2630;</span>
            {{ column.name }} {{ column.id }}
          </div>
          <Container
            group-name="col"
            @drop="e => onCardDrop(column.id, e)"
            :get-child-payload="getCardPayload(column.id)"
            drag-class="card-ghost"
            drop-class="card-ghost-drop"
            :drop-placeholder="dropPlaceholderOptions"
          >
            <Draggable v-for="card in column.children" :key="card.id">
              <div class="card">
                <p>{{ card.id }}</p>
                <p>{{ card.task_message }}</p>
              </div>
            </Draggable>
          </Container>
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import axios from "axios";
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "./help.js";
import "../../../assets/demos.css";
import { searchIndex } from "./util";
export default {
  name: "Cards",
  components: { Container, Draggable },
  data() {
    return {
      upperDropPlaceholderOptions: {
        className: "cards-drop-preview",
        animationDuration: "150",
        showOnTop: true
      },
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true
      },
      scene: {
        type: "container",
        props: {
          orientation: "horizontal"
        },
        children: [
          {
            id: 0,
            type: "container",
            name: "Новый",
            props: {
              orientation: "vertical",
              className: "card-container"
            },
            children: []
          },
          {
            id: 1,
            type: "container",
            name: "Принимал(а)",
            props: {
              orientation: "vertical",
              className: "card-container"
            },
            children: []
          },
          {
            id: 2,
            type: "container",
            name: "Работаю",
            props: {
              orientation: "vertical",
              className: "card-container"
            },
            children: []
          },
          {
            id: 3,
            type: "container",
            name: "Завершено",
            props: {
              orientation: "vertical",
              className: "card-container"
            },
            children: []
          }
        ]
      }
    };
  },
  methods: {
    onColumnDrop(dropResult) {
      // eslint-disable-next-line
      //console.log(dropResult)
      const scene = Object.assign({}, this.scene);
      scene.children = applyDrag(scene.children, dropResult);
      this.scene = scene;
    },
    onCardDrop(columnId, dropResult) {
      // eslint-disable-next-line
      //console.log(columnId) // ид колонок
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene);
        // eslint-disable-next-line
        //console.log(scene)
        const column = scene.children.filter(p => p.id === columnId)[0];
        // eslint-disable-next-line
        //console.log(column)
        const columnIndex = scene.children.indexOf(column);
        // eslint-disable-next-line
        console.log(columnIndex);
        const newColumn = Object.assign({}, column);
        // eslint-disable-next-line
        //console.log(newColumn)
        newColumn.children = applyDrag(newColumn.children, dropResult);
        // eslint-disable-next-line
        //console.log(newColumn.children)
        scene.children.splice(columnIndex, 1, newColumn);
        // eslint-disable-next-line
        //console.log(scene.children)
        this.scene = scene;
      }
    },
    getCardPayload(columnId) {
      return index => {
        return this.scene.children.filter(p => p.id === columnId)[0].children[
          index
        ];
      };
    },
    dragStart() {
      // eslint-disable-next-line
      console.log("drag started");
    },
    log(...params) {
      // eslint-disable-next-line
      console.log(...params);
    }
  },
  beforeCreate: function() {
    axios({
      method: "GET",
      url: "tasks/user",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    }).then(res => {
      this.scene = searchIndex(res.data, this.scene);
    });
  }
};
</script>
