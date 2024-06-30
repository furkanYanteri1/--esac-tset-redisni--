<template>
  <div class="top-bar">
    <div class="title">Horse Racing Program</div>
    <div class="actions">
      <button @click="$emit('generateProgram')">Generate Program</button>
      <button @click="toggleStartPause">
        {{ isRunning ? "Pause" : "Start" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TopBar",
  setup(_, { emit }) {
    const isRunning = ref(false);

    const toggleStartPause = () => {
      isRunning.value = !isRunning.value;
      emit("toggleStartPause", isRunning.value);
    };

    return { toggleStartPause, isRunning };
  },
});
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.actions button {
  background-color: #3498db;
  border: none;
  color: white;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.actions button:hover {
  background-color: #2980b9;
}
</style>
