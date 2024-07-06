<template>
  <div class="top-bar">
    <div class="title">Horse Racing Program</div>
    <div class="actions">
      <button
        ref="generateButton"
        @click="$emit('generateProgram')"
        class="generate-program-button"
      >
        Generate Program
      </button>
      <button @click="toggleStartPause" class="start-button">
        {{ isRunning ? "Pause" : "Start" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { startTour } from "@/tour";

export default defineComponent({
  name: "TopBar",
  setup(_, { emit }) {
    const isRunning = ref(false);
    const generateButton = ref<HTMLButtonElement | null>(null);

    const toggleStartPause = () => {
      isRunning.value = !isRunning.value;
      emit("toggleStartPause", isRunning.value);
    };

    onMounted(() => {
      if (generateButton.value) {
        generateButton.value.classList.add("shine");
        setTimeout(() => {
          generateButton.value?.classList.remove("shine");
        }, 2000);
      }
      startTour();
    });

    return { toggleStartPause, isRunning, generateButton };
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

@keyframes shine {
  0% {
    box-shadow: 0 0 15px rgb(86, 235, 255);
  }
  50% {
    box-shadow: 0 0 15px rgb(255, 255, 255);
  }
  100% {
    box-shadow: 0 0 15px rgb(86, 235, 255);
  }
}

.shine {
  animation: shine 2s;
}
</style>
