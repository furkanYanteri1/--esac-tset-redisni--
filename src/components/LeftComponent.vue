<template>
  <div class="left-component">Left Component</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LeftComponent",
});
</script>

<style scoped>
.left-component {
  background-color: #e74c3c;
  padding: 10px;
  text-align: center;
  height: 100%;
}
</style>
