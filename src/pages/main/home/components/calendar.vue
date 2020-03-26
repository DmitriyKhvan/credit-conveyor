<template>
    <div>
        <q-tabs
            v-model="tab"
            dense
            align="justify"
            inline-label
            class="bg-grey-3 q-mb-sm"
            active-bg-color="primary"
            indicator-color="primary"
            active-color="white"
            :breakpoint="0"
          >
            <q-tab name="tabOne" label="Задачи" />
            <q-tab name="tabTwo" label="Документы" />
            <q-tab name="tabThree" label="Финансы" />
            <q-tab name="tabFour" label="Блокнот" />
            <q-tab name="tabFive" label="Заметки" />
          </q-tabs>
          <q-calendar locale="ru" />    
    </div>
</template>

<script>
export default {
    data () {
        return {
            tab: 'tabOne',
        }
    }
}
</script>

<style lang="sass" scoped>

</style>