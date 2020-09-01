<template>
    <div class="col column OpenSans">
        <div class="row col" style="color:#273959;font-size:20px">У вас есть доступ для смены персональных данных (логин, пароль, электронная почта, др.)</div>
        <div class="row no-wrap full-width">
            <q-input    class="q-mt-xl input-text"
                        input-class="inputs"
                        v-model="login"
                        type="login"
                        label="Логин"
                        label-color="grey"
                        hint="Введите логин"
                        stack-label>
            </q-input>
        </div>
        <div class="full-width OpenSansXB text-h6 q-mt-xl text-weight-bolder">Смена пароля</div>
        <div class="row no-wrap full-width">
            <div class="col column justify-between">
                <q-input    class="q-mt-xl input-text"
                            input-class="inputs"
                            v-model="oldpwd"
                            type="login"
                            label="Старый пароль"
                            label-color="grey"
                            style="margin-top: 10px"
                            stack-label>
                </q-input>
                <q-input    class="q-mt-xl input-text"
                            input-class="inputs"
                            v-model="repwd"
                            label="Повторите новый пароль"
                            label-color="grey"
                            stack-label>
                </q-input>
                
            </div>
            <div class="col column justify-between">
                <q-input    class="q-mt-xl input-text"
                            input-class="inputs"
                            v-model="newpwd"
                            label="Новый пароль"
                            label-color="grey"
                            style="margin-top: 10px"
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
    name: 'Authorize',
    data () {
        return {
            login: 'Admin123',
            oldpwd: '***********',
            newpwd: '-',
            repwd: null
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
