
<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm row items-start">
       <q-file
      v-model="files"
      label="Pick files"
      outlined
      use-chips
      multiple
      style="max-width: 300px"
    />
    </div>
  </div>
</template>

<script>

export default {
  created() {
    
  },
  data() {
    return {
      files: []
    };
  },
  computed: {},
  methods: {}
};
</script>


<style>
</style>
