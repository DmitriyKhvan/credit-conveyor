<template>
    <q-dialog v-model="confirm" persistent>
        <q-spinner-ios color="primary" size="2em" />
        <q-tooltip :offset="[0, 8]">Пожалуйста подождите</q-tooltip>
    </q-dialog>    
</template>

<script>
export default {
    data() {
        return {
            confirm: true
        }
    }
}
</script>