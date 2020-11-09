<template>
  <div>
    <template
      v-if="
        userRole === 'ROLE_CCS' ||
        userRole === 'ROLE_PM' ||
        credit.taskName === 'Создание Контракта в iABS' ||
        credit.taskName === 'Ожидание отправки контракта в НИКИ' ||
        credit.taskName === 'Step: Создание заявки в iABS' ||
				credit.taskId === null
      "
      >{{ linkName }}</template>
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
	}
};
</script>
<style lang="scss">
</style>