import { mapState, mapGetters } from "vuex";

import MessagePopup from "../Components/MessagePopup"

import validMixin from "@/shared/mixins/validMixin"

import sortData from '../filters/sortData'

export default {
  mixins: [validMixin],
  props: {
    title: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      expanded: true
    };
  },
  computed: {
    ...mapState({
      creditSettings: state => state.creditSettings,
      settings: state => state.creditSettings.settings,
      refs: state => state.creditSettings.allRefs
    }),
    
    ...mapGetters({
      maxSumScorCardBall: "creditSettings/maxSumScorCardBall"
    })
	},

	methods: {
    sortData(arr, sortBy) {
      return sortData(arr, sortBy)
    }
  },

  components: {
    MessagePopup
  }
};
