<template>
  <div class="right-component">
    <div v-if="programs.length > 0">
      <div class="programs">
        <div class="program">
          <h3>Program</h3>
          <div
            v-for="(program, programIndex) in programs.slice(0, 6)"
            :key="programIndex"
            class="program-table"
          >
            <table>
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(horse, horseIndex) in program" :key="horseIndex">
                  <td>{{ horseIndex + 1 }}</td>
                  <td>{{ horse.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="program">
          <h3>Result</h3>
          <div
            v-for="(program, programIndex) in programs.slice(0, 6)"
            :key="programIndex"
            class="program-table"
          >
            <table>
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(horse, horseIndex) in program" :key="horseIndex">
                  <td>{{ horseIndex + 1 }}</td>
                  <td>{{ horse.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";

interface Horse {
  name: string;
}

export default defineComponent({
  name: "RightComponent",
  setup(props, { emit }) {
    const store = useStore();
    const programs = ref<Array<Array<Horse>>>([]);

    const generateProgram = () => {
      programs.value = [];
      for (let i = 0; i < 6; i++) {
        const shuffled = store.state.horses.sort(() => 0.5 - Math.random());
        const program = shuffled
          .slice(0, 10)
          .map((horse: Horse) => ({ name: horse.name }));
        programs.value.push(program);
      }
    };

    watch(
      () => store.state.generateProgramTrigger,
      (newValue) => {
        if (newValue) generateProgram();
      }
    );

    return { programs };
  },
});
</script>

<style scoped>
.right-component {
  padding: 10px;
  text-align: center;
  height: 100%;
}

.programs {
  display: flex;
  justify-content: space-around;
}

.program {
  width: 45%;
}

.program-table {
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
  text-align: center;
}

th {
  background-color: #f2f2f2;
  text-align: center;
}
</style>
