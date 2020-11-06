<template>
  <div class="col bg-white rounded-borders q-ml-lg q-pa-lg OpenSans">
      <div class="f24 q-ml-xl">{{ tabs[tabIndex-1] }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    tabs: {
      type: Array,
      require: true
    }
  },
  computed: {
    ...mapGetters({
      tabIndex: 'instruction/getTabsIndex'
    })
  }
}
</script>

<style>
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
    font-weight: 600;
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
