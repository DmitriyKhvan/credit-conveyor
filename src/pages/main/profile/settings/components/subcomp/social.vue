<template>
    <div class="col column OpenSans">
        <div class="row col" style="color:#273959;font-size:20px">У вас есть доступ для смены персональных данных (логин, пароль, электронная почта, др.)</div>
        <div class="row no-wrap full-width">
            <div class="col column justify-between">
                <q-input    class="q-mt-xl input-text"
                            input-class="inputs"
                            v-model="facebook"
                            label="Facebook"
                            label-color="grey"
                            stack-label>
                </q-input>
                <q-input    class="q-mt-xl input-text"
                            input-class="inputs"
                            v-model="instagram"
                            label="Instagram"
                            label-color="grey"
                            stack-label>
                </q-input>
                <q-input    class="q-mt-xl input-text"
                            input-class="inputs"
                            v-model="linkedIn"
                            label="LinkedIn"
                            label-color="grey"
                            stack-label>
                </q-input>
                <div class="full-width OpenSansXB text-h5 q-mt-xl text-weight-bolder"><b>Персональные страницы</b></div>
                <q-select    v-model="web"
                            class="q-mt-xl input-text"
                            style="margin-top: 30px"
                            :options="webOptions"
                            :display-value="web ? web : 'none'"
                            label="Персональный веб-сайт"
                            stack-label />
            </div>
            <div class="col column justify-start">
                <q-input    class="q-mt-xl input-text"
                            input-class="inputs"
                            v-model="tweeter"
                            label="Tweeter"
                            label-color="grey"
                            stack-label>
                </q-input>
                <q-input    class="q-mt-xl input-text"
                            input-class="inputs"
                            v-model="telegram"
                            label="Telegram"
                            label-color="grey"
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
    name: 'Social',
    data () {
        return {
            facebook: '@Baratov',
            instagram: '@Baratov',
            linkedIn: '@Baratov',
            tweeter: 'Baratov@nbu.uz',
            telegram: '@strel00k',
            web: 'Baratov.uz',
            webOptions: ['Baratov.uz', 'Baratov.nbu.uz']
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
