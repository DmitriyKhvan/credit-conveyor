<template>
    <div class="col column OpenSans">
        <div class="row col" style="color:#273959;font-size:20px">У вас есть доступ для смены персональных данных (логин, пароль, электронная почта, др.)</div>
        <div class="row no-wrap full-width">
            <div class="col column justify-between">
                <q-input    class="q-mt-xl input-text"
                            input-class="inputs"
                            v-model="email"
                            type="email"
                            label="Электронная почта"
                            label-color="grey"
                            :error="!isMailValid"
                            stack-label>
                            <template v-slot:error>
                                Введите электронную почту
                            </template>
                </q-input>
                <q-input    class="q-mt-xl input-text"
                            input-class="inputs"
                            v-model="phone"
                            label="Сотовый номер"
                            label-color="grey"
                            mask="(##) ### ## ##"
                            fill-mask
                            hint="Введите номер сотового телефона"
                            stack-label>
                </q-input>
                
            </div>
            <div class="col column justify-between">
                <q-input    class="q-mt-xl input-text"
                            input-class="inputs"
                            v-model="office"
                            label="Ип телефон номер"
                            label-color="grey"
                            mask="####"
                            fill-mask
                            hint="Введите Ип телефон номер"
                            stack-label>
                </q-input>
                <q-input    class="q-mt-xl input-text"
                            input-class="inputs"
                            v-model="work"
                            label="Рабочий телефон"
                            label-color="grey"
                            mask="(##) ### ## ##"
                            fill-mask
                            hint="Введите рабочий телефон"
                            stack-label>
                </q-input>
            </div>
        </div>
        <div class="full-width" style="margin-top: 50px">
            <q-btn class="q-py-sm q-px-md" color="primary" label="СОХРАНИТЬ" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'Personal',
    data () {
        return {
            email: 'Baratov@nbu.uz',
            phone: '977282828',
            office: '9755',
            work: '712343212'
        }
    },
    computed: {
        isMailValid () {
            if(this.email !== null)
                return this.email.match(/@[^.]+/);
        }
    }
}
</script>
<style scoped>
    @font-face {
        font-family: 'OpenSansXB';
        src: url('~assets/fonts/OpenSans-ExtraBold.ttf') format('truetype');
    }
    @font-face {
        font-family: 'OpenSansB';
        src: url('~assets/fonts/OpenSans-Bold.ttf') format('truetype');
    }
    @font-face {
        font-family: 'OpenSans';
        src: url('~assets/fonts/OpenSans-Regular.ttf') format('truetype');
    }

    .OpenSansXBold {
        font-family: 'OpenSansXB';
    }
    .OpenSansBold {
        font-family: 'OpenSansB';
    }
    .OpenSans {
        font-family: 'OpenSans';
    }
    .input-text {
        margin-top: 10vh;
        margin-right: 10vw;
        font-size: 20px;
        line-height: 27px;
        color: #000000;
    }
    .input-label {
        font-size: 16px;
        line-height: 22px;
        color: #787E8C;
    }
</style>
