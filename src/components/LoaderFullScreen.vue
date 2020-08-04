<template>
    <q-dialog v-model="confirm" persistent>
        <div style="box-shadow: none"> 
            <q-spinner-ios color="white" size="2em" />
            <q-tooltip :offset="[0, 8]">Пожалуйста подождите</q-tooltip>
        </div>
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