<template>
  <div class="right-component">
    <div v-for="(program, index) in programs" :key="index" class="race-table">
      <h3>Race {{ index + 1 }}</h3>
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(horse, i) in program" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ horse.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "RightComponent",
  setup() {
    const store = useStore();
    const programs = computed(() => store.state.programs);

    return { programs };
  },
});
</script>

<style scoped>
.right-component {
  background-color: #2ecc71;
  padding: 10px;
  text-align: center;
  height: 100%;
}

.race-table {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #4caf50;
  color: white;
}
</style>
