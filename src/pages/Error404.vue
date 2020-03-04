<template>
  <div class="fixed-center text-center">
    <p>
      <img src="~assets/sad.svg" style="width:30vw;max-width:150px;" />
    </p>
    <p class="text-faded">
      Извините такой страницы не существует...
      <strong>(404)</strong>
    </p>
    <q-btn color="secondary" style="width:200px;" @click="goBack()" label="Вернуться назад" />
  </div>
</template>

<script>
export default {
  name: "Error404",
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
