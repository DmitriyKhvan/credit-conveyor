<template>
    <div class="universalMagerBlock q-pa-md"> 
			<div class="row q-col-gutter-md">
				<div class="col-9">
					<form @submit.prevent.stop="onSubmit">
						<appSettingProcess :title="titles[0]"/>
					</form>
				</div>
				<div class="col-3">

				</div>
			</div>
    </div>
</template>
<script>
import SettingCreditProduct from './Components/SettingCreditProduct'
import SettingCreditRoleActive from './Components/SettingCreditRoleActive'
import SettingProcess from './Components/SettingProcess'
import SettingScorBalls from './Components/SettingScorBalls'
import SettingScorModel from './Components/SettingScorModel'

export default {
    data() {
        return {
					titles: [
						"Настройка процесса",
						"Настройка скоринговой модели",
						"Настройка балов скоркарты",
						"Участие роли в кредитном конвейeре",
						"Настройка кредитных продуктов"
					]
        }
    }, 
    components: {
        appSettingCreditProduct: SettingCreditProduct,
        appSettingCreditRoleActive: SettingCreditRoleActive,
        appSettingProcess: SettingProcess,
        appSettingScorBalls: SettingScorBalls,
        appSettingScorModel: SettingScorModel
    }
}
</script>
<style lang="scss">
.universalMagerBlock {
	.settingBlock { 
		background: #fff;
		box-shadow: 0px 3px 7px #ddd;

		.headerBlock {
			font-size: 24px;
			font-weight: bold;
			box-shadow: 0px 3px 7px #ddd; color: #282D30;
			margin-bottom: 7px;
		}

		.contentBlock {
		}
	}
}
</style>