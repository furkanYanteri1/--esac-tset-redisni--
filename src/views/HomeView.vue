<template>
  <div class="home">
    <TopBar
      @generateProgram="generateProgram"
      @toggleStartPause="toggleStartPause"
      :isRunning="isRunning"
    />
    <div class="content">
      <LeftComponent class="content-seperate" />
      <MiddleComponent
        @horseFinished="updateResults"
        class="content-seperate"
      />
      <RightComponent class="content-seperate" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TopBar from "@/components/TopBar.vue";
import LeftComponent from "@/components/LeftComponent.vue";
import MiddleComponent from "@/components/MiddleComponent.vue";
import RightComponent from "@/components/RightComponent.vue";
import { useStore } from "vuex";

@Options({
  components: {
    TopBar,
    LeftComponent,
    MiddleComponent,
    RightComponent,
  },
})
export default class HomeView extends Vue {
  store = useStore();

  get isRunning() {
    return this.store.state.isRunning;
  }

  generateProgram() {
    this.store.commit("generatePrograms");
  }

  toggleStartPause(isRunning: boolean) {
    this.store.commit("setIsRunning", isRunning);
  }

  updateResults({
    horseName,
    raceIndex,
  }: {
    horseName: string;
    raceIndex: number;
  }) {
    this.store.commit("addHorseToResults", { horseName, raceIndex });
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  flex: 1;
}

.content-seperate {
  flex: 1;
  padding: 10px;
  border-right: 2px solid #2c3e50;
  border-left: 2px solid #2c3e50;
}
</style>
