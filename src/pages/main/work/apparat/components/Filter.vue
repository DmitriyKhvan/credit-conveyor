<template>
  <div>
    <div class="row q-col-gutter-x-md">
      <div class="col-3">
        <q-select
          filled
          clearable
          v-model="selectedSenior"
          :options="seniors"
          label="Все руководства"
          bg-color="white"
          @input="onSelectSenior"
          @clear="clearInput"
        />
      </div>
      <div class="col-3">
        <q-select
          filled
          clearable
          v-model="selectedRegion"
          :options="regions"
          label="Все регионы"
          bg-color="white"
          @input="onSelectRegion"
          @clear="clearInput"
        />
      </div>
      <div class="col-2">
        <q-select
          filled
          clearable
          v-model="selectedOrgan"
          :options="organs"
          label="Все органы"
          bg-color="white"
          @input="onSelectOrgan"
          @clear="clearInput"
        />
      </div>
      <div class="col-3 offset-md-1">
        <q-input
          filled
          bottom-slots
          clearable
          v-model="searchText"
          label="Поиск"
          bg-color="white"
          @input="search()"
          @clear="onClearSearch()"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row q-col-gutter-x-md">
      <div class="col-4">
        <q-select
          filled
          clearable
          v-model="selectedDepartment"
          :options="departments"
          label="Все управление"
          bg-color="white"
          @input="onSelectDepartment"
          @clear="clearInput"
        />
      </div>
      <div class="col-2">
        <q-select
          filled
          clearable
          v-model="selectedStatus"
          :options="statuses"
          label="Любой статус"
          bg-color="white"
          @input="onSelectedStatus"
          @clear="clearInput"
        />
      </div>
      <div class="col-3">
        <q-select
          filled
          clearable
          v-model="type"
          :options="typeOptions"
          label="Любой тип"
          bg-color="white"
          @clear="clearInput"
        />
      </div>
      <div class="col-3 text-right buttonFilter">
        <q-btn
          color="blue-14"
          size="lg"
          label="Применить фильтр"
          :disable="!isFilterButtonActive"
          @click="onFilter"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedSenior: null,
      selectedRegion: null,
      selectedOrgan: null,
      selectedDepartment: null,
      selectedStatus: null,

      searchText: "",
      type: "",
      typeOptions: [],
    };
  },
  computed: {
    ...mapState({
      seniors: (state) => state.apparat.filters.seniors,
      regions: (state) => state.apparat.filters.regions,
      organs: (state) => state.apparat.filters.organs,
      departments: (state) => state.apparat.filters.departments,
      statuses: (state) => state.apparat.filters.statuses,
      //docks: (state) => state.apparat.aDocks,
    }),
    isFilterButtonActive() {
      return !!this.selectedSenior ||
        !!this.selectedRegion ||
        !!this.selectedOrgan ||
        !!this.selectedDepartment ||
        !!this.selectedStatus
        ? true
        : false;
    },
  },
  methods: {
    onFilter() {
      this.searchText = "";

      this.$store.dispatch("apparat/loadAllDocs", { page: 1 });
    },
    // select filters
    onSelectSenior() {
      let val = null;
      if (this.selectedSenior) val = this.selectedSenior.value;
      this.$store.commit("apparat/setSenior", val);
    },
    onSelectRegion() {
      let val = null;
      if (this.selectedRegion) val = this.selectedRegion.value;
      this.$store.commit("apparat/setRegion", val);
    },
    onSelectOrgan() {
      let val = null;
      if (this.selectedOrgan) val = this.selectedOrgan.value;
      this.$store.commit("apparat/setOrgan", val);
    },
    onSelectDepartment() {
      let val = null;
      if (this.selectedDepartment) val = this.selectedDepartment.value;
      this.$store.commit("apparat/setOrgan", val);
    },
    onSelectedStatus() {
      let val = null;
      if (this.selectedStatus) val = this.selectedStatus.value;
      this.$store.commit("apparat/setStatus", val);
    },

    search() {
      console.log({ tex: this.searchText });
      this.$store.dispatch("apparat/aSearchDocs", this.searchText);
    },
    onClearSearch() {
      //console.log("....");
      this.searchText = "";
      this.$store.dispatch("apparat/aSearchDocs", this.searchText);
    },
    clearInput() {
      this.onSelectSenior();
      this.onSelectRegion();
      this.onSelectOrgan();
      this.onSelectDepartment();
      this.onSelectedStatus();

      this.$store.dispatch("apparat/loadAllDocs");
    },
  },
  created() {},
};
</script>
<style scoped>
</style>
