<template>
  <q-btn
    class="printFile"
    v-if="menuNo !== 1"
    icon="print"
    @click="printFile(doc)"
    :loading="loadingDoc"
  >
    <p v-if="label" class="q-px-sm">{{label}}</p>
    <template v-slot:loading>
      <q-spinner-facebook />
    </template>
    <q-tooltip v-if="!label">Распечатать</q-tooltip>
  </q-btn>
</template>
<script>
import printJS from "print-js";
import { mapState, mapGetters } from "vuex";
import CommonUtils from "@/shared/utils/CommonUtils";

export default {
  props: {
    doc: {
      type: Object,
      default: () => {
        return {};
      }
    },
    label: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loadingDoc: false
    }
  },
  computed: {
    ...mapState({
      menuNo: state => state.assistant.menuNo
    })
  },
  methods: {
     async printFile(doc) {
      this.loadingDoc = true
      const performer = doc.start_emps_id.map(person => {
        return {
          name: `${person.LAST_NAME} ${person.FIRST_NAME.slice(0, 1)}.${person.MIDDLE_NAME.slice(0, 1)}.`
        }
      })

      const superior = doc.superior.name.split(' ')
      const h_emp = `${superior[0]} ${superior[1].slice(0, 1)}. ${superior[2].slice(0, 1)}.`

      const data = {
        type: "personal",
        doc_type: "fishka",
        data: {
          from: doc.organ,
          in_number: doc.in_number,
          out_number: doc.out_number,
          in_date: CommonUtils.dateFilter(doc.in_date),
          out_date: CommonUtils.dateFilter(doc.out_date),
          text: doc.description,
          action: "Прошу рассмотреть в установленном порядке.",
          date: CommonUtils.dateFilter(doc.created_at),
          h_emp,
          performer
        }
      };

      try {
        this.$store.dispatch("credits/setHeaderRole", "CRM")
        const fileURL = await this.$store.dispatch("assistant/getFile", data)
        printJS(fileURL)
        window.URL.revokeObjectURL(fileURL)
        this.loadingDoc = false
      } catch(error) {
        this.loadingDoc = false
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss">
.printFile {
  .q-btn__wrapper {
    padding: 0;
    min-height: 0;
  }

  .q-btn__wrapper:before {
    box-shadow: none!important;
  }
}
</style>