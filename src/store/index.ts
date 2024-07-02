import { createStore } from "vuex";

interface Horse {
  name: string;
  color: string;
  condition: number;
}

const names = [
  "MADRAS",
  "MANGUSTA",
  "BURGAS",
  "KAYI BEYI",
  "LINARDO CAN",
  "BABA DALLAS",
  "MIRBEY",
  "AL TAN",
  "OGUZUN RUYASI",
  "CAN ALUS",
  "ALIHAN",
  "CAPTAIN FANTASTIC",
  "KAZE NI KATSU",
  "PEKERIM",
  "GUCLUBEY EFENDISI",
  "WOLF SEYFO",
  "KOCA SEYID",
  "DRAGON PULSE",
  "KING DAVUT",
  "KING BERKAY",
];

const colors = [
  "black",
  "white",
  "brown",
  "grey",
  "chestnut",
  "bay",
  "palomino",
  "pinto",
  "roan",
  "dun",
];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomCondition(): number {
  return Math.floor(Math.random() * 101);
}

const horses: Horse[] = names.map((name) => ({
  name,
  color: getRandomElement(colors),
  condition: getRandomCondition(),
}));

export default createStore({
  state: {
    horses,
    programs: [] as Horse[][],
    isRunning: false,
  },
  getters: {
    randomHorses: (state) => {
      const shuffled = state.horses.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 10);
    },
  },
  mutations: {
    updatePrograms(state, programs: Horse[][]) {
      state.programs = programs;
    },
    updateResults(
      state,
      { index, results }: { index: number; results: Horse[] }
    ) {
      if (state.programs[index]) {
        state.programs[index] = results;
      }
    },
    setIsRunning(state, isRunning: boolean) {
      state.isRunning = isRunning;
    },
  },
  actions: {},
  modules: {},
});
