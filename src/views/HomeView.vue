<template>
  <div class="home">
    <TopBar
      @generateProgram="generateProgram"
      @toggleStartPause="toggleStartPause"
    />
    <div class="content">
      <LeftComponent class="content-left" />
      <MiddleComponent class="content-middle" />
      <RightComponent class="content-right" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import TopBar from "@/components/TopBar.vue";
import LeftComponent from "@/components/LeftComponent.vue";
import MiddleComponent from "@/components/MiddleComponent.vue";
import RightComponent from "@/components/RightComponent.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    TopBar,
    LeftComponent,
    MiddleComponent,
    RightComponent,
  },
  setup() {
    const store = useStore();

    const generateProgram = () => {
      const programs = Array.from(
        { length: 6 },
        () => store.getters.randomHorses
      );
      store.commit("updatePrograms", programs);
      console.log("Generated programs:", programs); // Debugging
    };

    const toggleStartPause = (isRunning: boolean) => {
      store.commit("setIsRunning", isRunning);
    };

    return { generateProgram, toggleStartPause };
  },
});
</script>

<style scoped>
.home {
  background-color: gray;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  flex: 1;
}

.content-left,
.content-middle,
.content-right {
  flex: 1;
}
</style>
