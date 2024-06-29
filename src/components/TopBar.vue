<template>
  <div class="top-bar">Header</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TopBar",
});
</script>

<style scoped>
.top-bar {
  background-color: #3498db;
  padding: 10px;
  text-align: center;
  font-size: 20px;
  color: white;
}
</style>
