<template>
  <!-- Submit button-->
  <q-btn
    @click="sentFullProfile"
    color="primary"
    label="Оформить кредит"
    class="q-ml-sm"
  />
</template>
<script>
import CommonUtils from "@/shared/utils/CommonUtils";

export default {
  data() {
    return {
    }
  },
  computed: {
    fullProfile() {
      return this.$store.getters["profile/profile"].fullFormProfile
    },
    profile() {
      return this.$store.getters["profile/profile"]
    }
  },
  methods: {
    async sentFullProfile() {
      this.fullProfile.ClientManagerLogin = this.$store.getters["auth/username"]
      console.log("fullProfile", this.$store.state.profile.fullFormProfile);
        const {
          Status,
          // ApplicationID,
          // ProtocolNumber,
          // Number,
          // Branch,
          BODecision,
          // FinalDecision,
          // Date,
          BOLogin,
          // Department,
          ClientManagerLogin,
          CreditCommiteeDecisions,
          Customer,
          Guarantee,
          LoanInfo,
          ApplicationComment,
          AttachedDocuments,
        } = this.fullProfile;

        console.log('Customer', Customer)
        //ClientManagerLogin = "man"
        Customer.FullName = `${Customer.LastName} ${Customer.FirstName} ${Customer.MiddleName}`
        Customer.Document.Number = Number(Customer.Document.Number)
        Customer.Relatives.items.map(i => i.Document.Number = Number(i.Document.Number))
        Guarantee.RelatedPerson.items.map(i => i.Document.Number = Number(i.Document.Number))
        //LoanInfo.RepaymentType = Number(LoanInfo.RepaymentType)

        // удалил из объекта - Date!!!
        const data = {
          output: [
            {
              name: "application",
              data: {
                Status,
                // ApplicationID,
                // ProtocolNumber,
                // Number,
                // Branch,
                BODecision,
                // FinalDecision,
                BOLogin,
                // Department,
                ClientManagerLogin,
                CreditCommiteeDecisions,
                Customer,
                Guarantee,
                LoanInfo,
                ApplicationComment,
                AttachedDocuments,
              },
            },
          ],
        };

        console.log(JSON.stringify(data, null, 2));

        try {
          const res = await this.$store.dispatch("credits/confirmationCredit", data);
          console.log("response", JSON.stringify(res, null, 2));
          //console.log('nextTaskId', res.nextTask.id)

          if (res.nextTask.id) {
            sessionStorage.removeItem("csrf_token");
            this.$store.commit('credits/setMessage', 'Credit complete')
            this.$router.push("/work/credit")
          } else {
            throw 'Next task id is undefined'
          }
        } catch (error) {}
    }
  }
}
</script>

<style lang="scss"></style>
