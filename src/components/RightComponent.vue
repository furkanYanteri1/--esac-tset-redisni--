<template>
  <div class="right-component">Right Component</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RightComponent",
});
</script>

<style scoped>
.right-component {
  background-color: #2ecc71;
  padding: 10px;
  text-align: center;
  height: 100%;
}
</style>
