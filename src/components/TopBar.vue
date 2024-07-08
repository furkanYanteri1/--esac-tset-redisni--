<template>
  <div class="top-bar">
    <div class="title">Horse Racing Program</div>
    <div class="actions">
      <button
        ref="generateButton"
        @click="generateProgram"
        class="generate-program-button"
        :disabled="isRunning"
      >
        Generate Program
      </button>
      <button
        @click="toggleStartPause"
        :disabled="!programsGenerated"
        class="start-button"
      >
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
  props: {
    isRunning: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const generateButton = ref<HTMLButtonElement | null>(null);
    const programsGenerated = ref(false);

    const toggleStartPause = () => {
      emit("toggleStartPause", !props.isRunning);
    };

    const generateProgram = () => {
      emit("generateProgram");
      programsGenerated.value = true; // Simulate program generation
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

    return {
      toggleStartPause,
      generateButton,
      generateProgram,
      programsGenerated,
    };
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

.actions button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.actions button:hover:enabled {
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
