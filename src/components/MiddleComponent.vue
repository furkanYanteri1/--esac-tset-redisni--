<template>
  <div class="middle-component">
    <div v-if="currentRace.length">
      <h3>Race {{ currentRaceIndex + 1 }}</h3>
      <div class="race-track">
        <div v-for="(horse, index) in currentRace" :key="index" class="lane">
          <div class="horse" :style="{ left: horsePositions[index] + '%' }">
            🐎
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch } from "vue";
import { useStore } from "vuex";

interface Horse {
  name: string;
  color: string;
  condition: number;
}

export default defineComponent({
  name: "MiddleComponent",
  setup() {
    const store = useStore();
    const currentRace = ref<Horse[]>([]);
    const currentRaceIndex = ref(0);
    const horsePositions = ref<number[]>([]);
    const intervalId = ref<number | null>(null);

    const startRace = () => {
      if (currentRaceIndex.value < store.state.programs.length) {
        currentRace.value = store.state.programs[currentRaceIndex.value];
        horsePositions.value = Array(currentRace.value.length).fill(0);

        intervalId.value = setInterval(() => {
          horsePositions.value = horsePositions.value.map((pos) =>
            Math.min(pos + Math.random() * 5, 100)
          );

          if (horsePositions.value.every((pos) => pos >= 100)) {
            if (intervalId.value !== null) {
              clearInterval(intervalId.value);
            }
            store.commit("updateResults", {
              index: currentRaceIndex.value,
              results: currentRace.value,
            });
            currentRaceIndex.value++;
            if (currentRaceIndex.value < store.state.programs.length) {
              startRace();
            }
          }
        }, 1000) as unknown as number; // Type assertion for setInterval return type
      }
    };

    watch(
      () => store.state.isRunning,
      (isRunning) => {
        if (isRunning) {
          startRace();
        } else {
          if (intervalId.value !== null) {
            clearInterval(intervalId.value);
          }
        }
      }
    );

    onMounted(() => {
      currentRaceIndex.value = 0;
    });

    onUnmounted(() => {
      if (intervalId.value !== null) {
        clearInterval(intervalId.value);
      }
    });

    return { currentRace, currentRaceIndex, horsePositions };
  },
});
</script>

<style scoped>
.middle-component {
  padding: 10px;
  text-align: center;
  height: 100%;
}

.race-track {
  position: relative;
  height: 200px;
  border: 2px solid #000;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.lane {
  position: relative;
  width: 90%;
  height: 20px;
  border-bottom: 1px solid #ddd;
}

.horse {
  position: absolute;
  transition: left 1s;
  transform: scaleX(-1); /* This line flips the horse emoji */
}
</style>
