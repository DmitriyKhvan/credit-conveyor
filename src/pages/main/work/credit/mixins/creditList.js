
import CreditList from "../pages/CreditList/CreditList"

export default {
  data() {
    return {
      componentKey: null,
      loaderList: false
    }
  },
  methods: {
    async getCreditsList(tasks) {
        this.loaderList = true
        this.$store.commit('credits/clearCreditTasks')
        try {
          const auth = await this.$store.dispatch("credits/authBpm")
          console.log("auth", auth);
    
          await this.$store.dispatch(`credits/${tasks}`)
    
          this.loaderList = false
        } catch(error) {}
      },
  },
  
  components: {
    AppCreditList: CreditList
  }
}

