<template>
  <div class="middle-component">
    <div v-if="currentRace.length">
      <h3>Race {{ currentRaceIndex + 1 }}</h3>
      <div class="race-track">
        <div v-for="(horse, index) in currentRace" :key="index" class="lane">
          <div class="horse" :style="{ left: horsePositions[index] + '%' }">
            🐎
          </div>
          <div class="horse-name">{{ horse.name }}</div>
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
      console.log("Starting race", currentRaceIndex.value);
      if (currentRaceIndex.value < store.state.programs.length) {
        currentRace.value = store.state.programs[currentRaceIndex.value];
        horsePositions.value = Array(currentRace.value.length).fill(0);

        intervalId.value = setInterval(() => {
          horsePositions.value = horsePositions.value.map((pos, i) =>
            Math.min(pos + Math.random() * 5, 100)
          );

          console.log("Horse positions", horsePositions.value);

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
        console.log("isRunning changed to", isRunning);
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
  border: 1px solid red;
  padding: 10px;
  text-align: center;
  height: 100%;
}

.race-track {
  position: relative;
  height: 100%;
  border: 2px solid #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.lane {
  position: relative;
  width: 90%;
  height: 50px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.horse {
  position: absolute;
  transition: left 1s;
  transform: scaleX(-1); /* Face the horse to right */
}

.horse-name {
  font-size: 8px;
  margin-right: 5px;
  position: absolute;
  left: 0;
  top: -2px;
  white-space: nowrap;
}
</style>
