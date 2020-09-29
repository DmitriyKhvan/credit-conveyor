<template>
<div class="row no-wrap col">
    <div class="row col bg-white justify-start OpenSans">
        <div class="q-py-md q-px-lg row items-center no-wrap f16 click" @click="active = 1">
            <q-icon name="description" size="25px" :class="active === 1 ? 'active' : 'gcl'"/>
            <p class="q-ml-sm text-weight-bolder" :class="active === 1 ? 'text-dark' : 'gcl'">Все файлы</p>
        </div>
        <div class="q-py-md q-px-lg row items-center no-wrap f16 click" @click="active = 2">
            <q-icon name="folder_open" size="25px" :class="active === 2 ? 'active' : 'gcl'"/>
            <p class="q-ml-sm text-weight-bolder" :class="active === 2 ? 'text-dark' : 'gcl'">Документы</p>
        </div>
        <div class="q-py-md q-px-lg row items-center no-wrap f16 click" @click="active = 3">
            <q-icon name="play_circle_outline" size="25px" :class="active === 3 ? 'active' : 'gcl'"/>
            <p class="q-ml-sm text-weight-bolder" :class="active === 3 ? 'text-dark' : 'gcl'">Видео файлы</p>
        </div>
        <div class="q-py-md q-px-lg row items-center no-wrap f16 click" @click="active = 4">
            <q-icon name="camera_alt" size="25px" :class="active === 4 ? 'active' : 'gcl'"/>
            <p class="q-ml-sm text-weight-bolder" :class="active === 4 ? 'text-dark' : 'gcl'">Фото</p>
        </div>
    </div>
    <div class="row bg-white q-ml-xl items-center q-px-md click">
        <q-icon name="search" size="25px" :class="active === 4 ? 'active' : 'gcl'"/>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      active: 1
    }
  }
}
</script>
<style scoped>
@font-face {
    font-family: 'OpenSans';
    src: url('~assets/fonts/OpenSans-Regular.ttf') format(truetype);
}
.gcl {
    color: #A0A5BA;
}
.OpenSans {
    font-family: 'OpenSans';
}

.f12 {
    font-size: 12px;
}
.f14 {
    font-size: 14px;
}
.f16 {
    font-size: 16px;
}
.f18 {
    font-size: 18px;
}
.f20 {
    font-size: 20px;
}
.f22 {
    font-size: 22px;
}
.f24 {
    font-size: 24px;
}
.click:hover {
    background-color: rgb(228, 228, 228);
    cursor: pointer;
    transition: 0.3s;
}
.click:hover > .gcl {
    color: #000000;
}
.active {
    color: #0054FE;
}
</style>
