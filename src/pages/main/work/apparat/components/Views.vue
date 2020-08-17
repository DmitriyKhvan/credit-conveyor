<template>
  <div class="row q-pb-md">
    <div class="col">
      <div class="row q-col-gutter-x-md">
        <div class="col-4">
          <q-select filled v-model="status" :options="statuses" label="Выбрать статус" />
        </div>
        <div class="col buttonFilter">
          <q-btn
            @click="multiCheck"
            color="blue-14"
            size="lg"
            label="Применить для всех"
            :disable="status === '' || checkeds.length === 0 ? true : false"
          />
        </div>
      </div>
    </div>
    <div class="col text-right navMenu">
      <div>Показано строк:</div>
      <div>
        <q-select
          filled
          v-model="selPage"
          :options="options2"
          bg-color="white"
          dense
          style="width:70px"
          @input="selectPages()"
        />
      </div>
      <div>1-{{faDocks.length ? faDocks.length : 0}} из {{faDocs}}</div>
      <div class="arrows">
        <div :class="faPage > 1 ? 'active': ''" @click="pagePrev">
          <q-icon name="keyboard_arrow_left" />
        </div>
        <div :class="faPage < faAllPages ? 'active': ''" @click="pageNext">
          <q-icon name="keyboard_arrow_right" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      status: "",
      options: [],
      selPage: 5,
      options2: [1, 5, 10, 15, 20, 50],
      curPage: 1
    };
  },
  computed: {
    ...mapState({
      statuses: state => state.apparat.aFilters.statuses,
      checkeds: state => state.apparat.aChecked,

      fsuperiors: state => state.apparat.aSenior,
      fregion: state => state.apparat.aRegion,
      forgan: state => state.apparat.aOrgan,
      fdepartments: state => state.apparat.aManagement,
      fstatus: state => state.apparat.aStatus,
      fperPage: state => state.apparat.aPerPage,
      faPage: state => state.apparat.aPage,
      faDocks: state => state.apparat.aDocks,
      faDocs: state => state.apparat.aDocs,
      faAllPages: state => state.apparat.aAllPages
    })
  },
  created() {
    // this.selPage = this.
  },
  methods: {
    selectPages() {
      const arr = {
        perPage: this.selPage,
        page: this.curPage,
        filters: {
          superiors: this.fsuperiors,
          region: this.fregion,
          organ: this.forgan,
          departments: this.fdepartments,
          status: this.fstatus
        }
      };
      this.$store.dispatch("aPageSelect", arr);
    },
    multiCheck() {
      const arr = {
        doc_id: this.checkeds,
        status: this.status.value
      };
      this.$store.dispatch("multiUpdateDocStatus", arr);
    },
    pageNext() {
      if (this.faPage < this.faAllPages) {
        const arr = {
          perPage: this.selPage,
          page: this.curPage + 1,
          filters: {
            superiors: this.fsuperiors,
            region: this.fregion,
            organ: this.forgan,
            departments: this.fdepartments,
            status: this.fstatus
          }
        };
        this.$store.dispatch("aPageSelect", arr);
      }
    },
    pagePrev() {
      if (this.faPage > 0) {
        const arr = {
          perPage: this.selPage,
          page: this.curPage - 1,
          filters: {
            superiors: this.fsuperiors,
            region: this.fregion,
            organ: this.forgan,
            departments: this.fdepartments,
            status: this.fstatus
          }
        };
        this.$store.dispatch("aPageSelect", arr);
      }
    }
  }
};
</script>
<style scoped>
.navMenu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.navMenu div {
  padding: 0 10px;
}
.arrows {
  display: flex;
}
.arrows div {
  cursor: pointer;
  color: #ccc;
}
.arrows div.active {
  color: #000;
}
</style>
