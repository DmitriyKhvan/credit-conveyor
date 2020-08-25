<template>
  <div>
    <div class="row q-col-gutter-x-md">
      <div class="col-3">
        <q-select
          filled
          clearable
          v-model="selectedSeniors"
          :options="seniors"
          label="Все руководства"
          bg-color="white"
          @clear="clearInput"
        />
      </div>
      <div class="col-3">
        <q-select
          filled
          clearable
          v-model="selectedRegions"
          :options="regions"
          label="Все регионы"
          bg-color="white"
          @clear="clearInput"
        />
      </div>
      <div class="col-2">
        <q-select
          filled
          clearable
          v-model="selectedOrgans"
          :options="organs"
          label="Все органы"
          bg-color="white"
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
          v-model="selectedDepartments"
          :options="departments"
          label="Все управление"
          bg-color="white"
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
          @clear="clearInput"
        />
      </div>
      <div class="col-3">
        <q-select
          filled
          clearable
          v-model="model"
          :options="options"
          label="Любой тип"
          bg-color="white"
          @clear="clearInput"
        />
      </div>
      <div class="col-3 text-right buttonFilter">
        <q-btn color="blue-14" size="lg" label="Применить фильтр" @click="filter" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedSeniors: "",
      selectedRegions: "",
      selectedOrgans: "",
      selectedDepartments: "",
      selectedStatus: "",
      searchText: "",
      model: "",
      options: [],
    };
  },
  computed: {
    ...mapState({
      seniors: (state) => state.apparat.aFilters.seniors,
      regions: (state) => state.apparat.aFilters.regions,
      organs: (state) => state.apparat.aFilters.organs,
      departments: (state) => state.apparat.aFilters.departments,
      statuses: (state) => state.apparat.aFilters.statuses,
      docks: (state) => state.apparat.aDocks,

      fperPage: (state) => state.apparat.aPerPage,
      faPage: (state) => state.apparat.aPage,
    }),
  },
  methods: {
    filter() {
      const arr = {
        perPage: this.fperPage,
        page: this.faPage,
        filters: {
          superiors:
            this.selectedSeniors !== "" && this.selectedSeniors !== null
              ? this.selectedSeniors.value
              : null,
          region:
            this.selectedRegions !== "" && this.selectedRegions !== null
              ? this.selectedRegions.value
              : null,
          organ:
            this.selectedOrgans !== "" && this.selectedOrgans !== null
              ? this.selectedOrgans.value
              : null,
          departments:
            this.selectedDepartments !== "" && this.selectedDepartments !== null
              ? this.selectedDepartments.value
              : null,
          status:
            this.selectedStatus !== "" && this.selectedStatus !== null
              ? this.selectedStatus.value
              : null,
        },
      };
      this.$store.dispatch("aPageSelect", arr);
    },
    search() {
      console.log({ tex: this.searchText });
      this.$store.dispatch("aSearchDocs", this.searchText);
    },
    onClearSearch() {
      console.log("....");
      this.searchText = "";
      this.$store.dispatch("aSearchDocs", this.searchText);
    },
    clearInput() {
      this.filter();
    },
  },
  created() {},
};
</script>
<style scoped>
</style>
