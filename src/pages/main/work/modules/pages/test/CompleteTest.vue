<template>
    <div>Complete test

    <div>{{message}}</div>
    </div>
    
</template>
<script>
export default {
    
    data() {
        return {
           
        }
    },
    computed: {
        message() {
            return this.$store.state.education.message
        }
    },
    created() {
        console.log("dfsdfsdafsd",this.$router);
    }
}
</script>