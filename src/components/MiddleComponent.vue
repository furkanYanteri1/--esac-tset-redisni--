<template>
  <div class="middle-component">Middle Component</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MiddleComponent",
});
</script>

<style scoped>
.middle-component {
  background-color: #f39c12;
  padding: 10px;
  text-align: center;
  height: 100%;
}
</style>
