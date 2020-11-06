<template>
<div class="row no-wrap col">
    <div class="row col bg-white justify-start OpenSans rounded-borders">
        <div class="q-py-md q-px-lg row items-center no-wrap f16 click" @click="activate(1)">
            <q-icon name="description" size="25px" :class="active === 1 ? 'active' : 'gcl'"/>
            <p class="q-ml-sm text-weight-bolder" :class="active === 1 ? 'text-dark' : 'gcl'">{{ tabs[0] }}</p>
        </div>
        <div class="q-py-md q-px-lg row items-center no-wrap f16 click" @click="activate(2)">
            <q-icon name="folder_open" size="25px" :class="active === 2 ? 'active' : 'gcl'"/>
            <p class="q-ml-sm text-weight-bolder" :class="active === 2 ? 'text-dark' : 'gcl'">{{ tabs[1] }}</p>
        </div>
        <div class="q-py-md q-px-lg row items-center no-wrap f16 click" @click="activate(3)">
            <q-icon name="play_circle_outline" size="25px" :class="active === 3 ? 'active' : 'gcl'"/>
            <p class="q-ml-sm text-weight-bolder" :class="active === 3 ? 'text-dark' : 'gcl'">{{ tabs[2] }}</p>
        </div>
        <div class="q-py-md q-px-lg row items-center no-wrap f16 click" @click="activate(4)">
            <q-icon name="camera_alt" size="25px" :class="active === 4 ? 'active' : 'gcl'"/>
            <p class="q-ml-sm text-weight-bolder" :class="active === 4 ? 'text-dark' : 'gcl'">{{ tabs[3] }}</p>
        </div>
    </div>
    <div class="row bg-white q-ml-xl items-center q-px-md click rounded-borders" @click="isSearching = true">
        <q-icon v-if="!isSearching" name="search" size="25px" :class="isSearching ? 'active' : 'gcl'"/>
        <q-input v-else borderless label="Поиск" :autofocus="isSearching" @blur="clearText" v-model="searchText" clearable>
            <template v-slot:append>
                <q-icon name="search" size="25px" style="cursor: pointer" :class="isSearching ? 'active' : 'gcl'"/>
            </template>
        </q-input>
    </div>
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
  data () {
    return {
      isSearching: false,
      searchText: null
    }
  },
  methods: {
    activate (n) {
      this.$store.dispatch('instruction/alterTabsIndex', n)
    },
    clearText () {
      this.searchText = null
      this.isSearching = false
    }
  },
  computed: {
    ...mapGetters({
      active: 'instruction/getTabsIndex'
    })
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
.click {
    user-select: none;
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
