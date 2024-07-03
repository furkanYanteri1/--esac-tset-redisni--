<template>
  <div class="left-component">
    <div class="top-bar">
      <button
        @click="activeTab = 'running'"
        :class="{ active: activeTab === 'running' }"
      >
        Running
      </button>
      <button
        @click="activeTab = 'all'"
        :class="{ active: activeTab === 'all' }"
      >
        All
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Color</th>
          <th>Condition</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(horse, index) in displayedHorses" :key="index">
          <td>{{ horse.name }}</td>
          <td>{{ horse.color }}</td>
          <td>{{ horse.condition }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "LeftComponent",
  setup() {
    const store = useStore();
    const activeTab = ref("all");

    const randomHorses = computed(() => store.getters.randomHorses);
    const allHorses = computed(() => store.state.horses);

    const displayedHorses = computed(() => {
      return activeTab.value === "running"
        ? randomHorses.value
        : allHorses.value;
    });

    return { activeTab, displayedHorses };
  },
});
</script>

<style scoped>
.left-component {
  padding: 10px;
  text-align: center;
  height: 100%;
}

.top-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.top-bar button {
  background-color: #f2f2f2;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 5px;
}

.top-bar button.active {
  background-color: #e74c3c;
  color: white;
}

table {
  background-color: lightgray;
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
  text-align: center;
}
</style>
