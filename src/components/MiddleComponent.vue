<template>
  <div class="middle-component">
    <div class="speed-controls">
      <button
        :class="{ active: selectedSpeed === 'slow' }"
        @click="selectSpeed('slow')"
      >
        Slow
      </button>
      <button
        :class="{ active: selectedSpeed === 'normal' }"
        @click="selectSpeed('normal')"
      >
        Normal
      </button>
      <button
        :class="{ active: selectedSpeed === 'fast' }"
        @click="selectSpeed('fast')"
      >
        Fast
      </button>
    </div>
    <div v-if="currentRace.length">
      <h3>Race {{ currentRaceIndex + 1 }}</h3>
      <div class="race-track">
        <audio ref="startSound" src="/sound/start-sound.mp3"></audio>
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
  setup(_, { emit }) {
    const store = useStore();
    const currentRace = ref<Horse[]>([]);
    const currentRaceIndex = ref(0);
    const horsePositions = ref<number[]>([]);
    const intervalId = ref<number | null>(null);
    const finishedHorses = ref<Set<string>>(new Set());
    const startSound = ref<HTMLAudioElement | null>(null);
    const selectedSpeed = ref<string>("normal"); // Default speed is "normal"

    const startRace = () => {
      if (currentRaceIndex.value < store.state.programs.length) {
        currentRace.value = store.state.programs[currentRaceIndex.value];
        horsePositions.value = Array(currentRace.value.length).fill(0);
        finishedHorses.value.clear();

        const intervalTime = getIntervalTime(selectedSpeed.value);

        // Wait for 2 seconds before starting the race
        setTimeout(() => {
          startSound.value?.play(); // Play the start sound

          intervalId.value = setInterval(() => {
            horsePositions.value = horsePositions.value.map((pos, i) => {
              if (pos < 100) {
                return Math.min(pos + Math.random() * 5, 100);
              }
              return pos;
            });

            horsePositions.value.forEach((pos, i) => {
              if (
                pos >= 100 &&
                !finishedHorses.value.has(currentRace.value[i].name)
              ) {
                finishedHorses.value.add(currentRace.value[i].name);
                emit("horseFinished", {
                  horseName: currentRace.value[i].name,
                  raceIndex: currentRaceIndex.value,
                });
              }
            });

            if (horsePositions.value.every((pos) => pos >= 100)) {
              if (intervalId.value !== null) {
                clearInterval(intervalId.value);
              }
              currentRaceIndex.value++;
              if (currentRaceIndex.value < store.state.programs.length) {
                startRace();
              }
            }
          }, intervalTime); // Use dynamic interval time based on selected speed
        }, 2000); // 2-second delay before starting the race
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
      startSound.value = document.querySelector("audio"); // Initialize the audio element
    });

    onUnmounted(() => {
      if (intervalId.value !== null) {
        clearInterval(intervalId.value);
      }
    });

    // Function to calculate interval time based on selected speed
    function getIntervalTime(speed: string): number {
      switch (speed) {
        case "slow":
          return 1000; // Example slower interval time
        case "normal":
          return 500; // Default interval time
        case "fast":
          return 100; // Example faster interval time
        default:
          return 1000; // Default to normal interval time
      }
    }

    // Function to handle speed selection
    function selectSpeed(speed: string): void {
      selectedSpeed.value = speed;
    }

    return {
      currentRace,
      currentRaceIndex,
      horsePositions,
      startSound,
      selectedSpeed,
      selectSpeed,
    };
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

.speed-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  background-color: #2c3e50;
  padding: 5px;
}

.speed-controls button {
  background-color: #195d8b;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
}

.speed-controls button.active {
  border: 1px solid rgb(123, 187, 255);
}
</style>
