import { mapState } from "vuex";

import MessagePopup from "../Components/MessagePopup"

import { floatValid, integerValid } from '../filters/validations'
import sortData from '../filters/sortData'

export default {
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
      settings: state => state.creditSettings.settings
		})
	},

	methods: {
    floatValid(val) {
      return floatValid(val)
    },
    integerValid(val) {
      return integerValid(val)
    },
    sortData(arr, sortBy) {
      return sortData(arr, sortBy)
    }
  },

  components: {
    MessagePopup
  }
};
