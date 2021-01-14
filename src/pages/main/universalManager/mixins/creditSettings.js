import { mapState } from "vuex";

import { floatValid, integerValid } from '../filters/validations'

export default {
  props: ["title"],
  data() {
    return {
      expanded: true
    };
  },
  computed: {
    ...mapState({
      settings: state => state.creditSettings.settings
		})
	},

	methods: {
    floatValid(val) {
      return floatValid(val)
    },
    integerValid(val) {
      return integerValid(val)
    }
  }
};
