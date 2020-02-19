<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-6">
        <listOfTopics />
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6">
        <addEditQuestions />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <addEditVariants />
      </div>
    </div>
  </div>
</template>

<script>
import listOfTopics from "./topicpages/listOfTopics";
import addEditQuestions from "./topicpages/addEditQuestions";
import addEditVariants from "./topicpages/addEditVariants";

export default {
  components: {
    listOfTopics,
    addEditQuestions,
    addEditVariants
  }
};
</script>

<style></style>
