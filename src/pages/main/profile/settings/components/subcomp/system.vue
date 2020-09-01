<template>
    <div class="col column OpenSans">
        <div class="row col" style="color:#273959;font-size:20px">У вас есть доступ для смены персональных данных (логин, пароль, электронная почта, др.)</div>
        <div class="full-width OpenSansXB text-h5 q-mt-xl text-weight-bolder"><b>Таймаут для авто выхода из системы</b></div>
        <div class="row no-wrap full-width">
            <div class="col column justify-between">
               <q-select    v-model="timeout"
                            class="q-mt-xl input-text"
                            style="margin-top: 30px"
                            :options="options"
                            label="Время для авто выхода из системы"
                            hint="Через какое количество времени нужно перезайти в систему"
                            stack-label />
                
            </div>
            <div class="col column justify-between">
                
            </div>
        </div>
        <div class="full-width OpenSansXB text-h5 q-mt-xl text-weight-bolder"><b>Тема системы Personal</b></div>
        <div class="row no-wrap full-width">
            <div class="col column justify-between">
               <q-select    v-model="theme"
                            class="q-mt-xl input-text"
                            style="margin-top: 30px"
                            :options="Toptions"
                            label="Тема Personal"
                            hint="Выберите подходящую тему для работы в системе"
                            stack-label />
                
            </div>
            <div class="col column justify-between">
                
            </div>
        </div>
        <div class="full-width" style="margin-top: 50px">
            <q-btn class="q-py-sm q-px-md" color="primary" label="СОХРАНИТЬ" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'System',
    data () {
        return {
            timeout: '15 минут',
            theme: 'Стандартная тема',
            options: [
                '10 минут', '15 минут', '30 минут', '60 минут', 
            ],
            Toptions: [
                'Стандартная тема' 
            ],
            
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
