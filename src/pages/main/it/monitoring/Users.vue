<template>
  <q-card>
    <q-card-section>
      <div class="row">
        <div class="col-9">
          <structure-bank @selectUser="selectUser" />
        </div>
        <div class="col-3">
          <div style="width: 100%;">
            <q-card>
              <user-card v-bind:itemData="item" />
            </q-card>
            <q-card>
              <q-card-section>
                <div v-for="(element, index) in devicesList" :key="index">
                  <p>{{ index + 1 }}. Type: {{ element.type_name }}</p>
                  <p>Model: {{ element.model_name }}</p>
                  <p>Serial: {{ element.serial }}</p>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import StructureBank from "./../../../../components/StructureBank";
import UserCard from "./../../../../components/UserCard";
import ApiService from "../../../../services/api.service";

export default {
  name: "SelectUser",
  components: {
    StructureBank,
    UserCard
  },
  mixins: [],
  data() {
    return {
      emittedItem: null,
      devicesList: []
    };
  },
  props: {},
  async created() {
    //this.emittedItem = this.data;
  },
  computed: {
    item() {
      return this.emittedItem;
    },
    isSelected() {
      return this.emittedItem !== null;
    }
  },
  methods: {
    async selectUser(item) {
      this.emittedItem = item;
      let res = await ApiService.get("devices/history");
      this.devicesList = res.data.filter(el => el.emp_id == this.item.EMP_ID);
      //console.log(this.devicesList);
    }
  }
};
</script>

<style></style>
