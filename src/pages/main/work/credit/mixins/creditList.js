
import CreditList from "../pages/CreditList/CreditList"

export default {
  data() {
    return {
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
    
          await this.$store.dispatch(`credits/${tasks}`, {page: 1, count: 10})
    
          this.loaderList = false
        } catch(error) {}
      },
  },
  
  components: {
    AppCreditList: CreditList
  }
}

