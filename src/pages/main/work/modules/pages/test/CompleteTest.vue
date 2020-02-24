<template>
    <div class="">
        <h4>Тест завершен!</h4>

        <div>Ваш результат: {{countTrueAnswers}} правильных ответов из {{quesAmount}}</div>
    </div>
    
</template>
<script>
export default {
    
    data() {
        return {
           
        }
    },
    computed: {
        countTrueAnswers() {
            return this.$store.state.education.countTrueAnswers
        },
        quesAmount() {
            return this.$store.state.education.quesAmount
        }
    },
    created() {
        console.log("dfsdfsdafsd",this.$router);
        console.log("store",this.$store.state.education);
    }
}
</script>