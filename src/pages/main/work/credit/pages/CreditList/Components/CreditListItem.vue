<template>
  <div class="creditListItem">
    <span
      class="noLinkItem"
      v-if="
        userRole === 'ROLE_CCS' ||
        userRole === 'ROLE_PM' ||
        credit.taskName === 'Создание Контракта в iABS' ||
        credit.taskName === 'Ожидание отправки контракта в НИКИ' ||
        credit.taskName === 'Step: Создание заявки в iABS' ||
				credit.taskId === null
      "
      >{{ linkName }}</span>
    <router-link
      v-else
      :to="{
        name:
          credit.taskName === 'PreApprove'
            ? 'Registration'
            : credit.taskName === 'Step: Заполнить ПП'
            ? 'Payment'
            : userRole === 'ROLE_KM'
            ? 'Profile'
            : 'CreditTask',
        params: { id: credit.id },
        query: {
          taskId: credit.taskId,
          date: credit.date,
          applicationNumber: credit.applicationNumber,
          filialName: credit.filialName,
          filial: credit.filial,
          status: credit.taskName,
        },
      }"
      >{{ linkName }}</router-link>
  </div>
</template>
<script>
import CommonUtils from "@/shared/utils/CommonUtils";

export default {
	// props: {
	// 	userRole: {
	// 		type: String,
	// 		default: ""
	// 	},
	// 	credit: {
	// 		type: Object,
	// 		default: {}
	// 	},
	// 	linkName: {
	// 		type: String,
	// 		default: ""
	// 	}
	// },

	props: ['userRole', 'credit', 'linkName'],

	data() {
		return {

		}
  },

  methods: {
    decoder(str) {
      return CommonUtils.decoder(str)
    }
  },
  
  // computed:{
  //   decoder(str) {
  //     return CommonUtils.decoder(str)
  //   }
  // }
};
</script>
<style lang="scss">
  .creditListItem {
    width: 100%;
    height: 100%;

    .noLinkItem {
      display: flex;
      padding-right: 20px;
    }
  }
</style>