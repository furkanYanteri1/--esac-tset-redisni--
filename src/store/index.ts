import { createStore } from "vuex";

interface Horse {
  name: string;
  color: string;
  condition: number;
}

interface RaceResult {
  name: string;
}

interface State {
  horses: Horse[];
  programs: Horse[][];
  results: RaceResult[][];
  isRunning: boolean;
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

export default createStore<State>({
  state: {
    horses,
    programs: [],
    results: [],
    isRunning: false,
  },
  getters: {
    randomHorses: (state) => {
      const shuffled = state.horses.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 10);
    },
  },
  mutations: {
    generatePrograms(state) {
      state.programs = Array.from({ length: 6 }, () => {
        const shuffled = state.horses.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10);
      });
      state.results = Array.from({ length: state.programs.length }, () => []); // Initialize results array
    },
    addHorseToResults(
      state,
      payload: { horseName: string; raceIndex: number }
    ) {
      if (state.results[payload.raceIndex]) {
        state.results[payload.raceIndex].push({ name: payload.horseName });
      } else {
        state.results[payload.raceIndex] = [{ name: payload.horseName }];
      }
    },
    setIsRunning(state, isRunning: boolean) {
      state.isRunning = isRunning;
    },
  },
  actions: {},
  modules: {},
});
