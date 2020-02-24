<template>
    <div>
        <!-- <app-application-queue 
            :tasks="tasksCreditManager"
        ></app-application-queue> -->
        <app-application-queue 
            tasks="tasksCreditManager"
        ></app-application-queue>
    </div>
</template>
<script>
import ApplicationQueue from '../../list/Application'
export default {
    data() {
        return {

        }
    },
    created() {
        // Запрос к БД
        //const tasksCreditManager
    },
    components: {
       appApplicationQueue: ApplicationQueue 
    }
}
</script>
<style>

</style>