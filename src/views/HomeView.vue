<template>
  <div class="home">
    <TopBar
      @generateProgram="generateProgram"
      @toggleStartPause="toggleStartPause"
    />
    <div class="content">
      <LeftComponent class="content-left" />
      <MiddleComponent @horseFinished="updateResults" class="content-middle" />
      <RightComponent class="content-right" />
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

.content-left,
.content-middle,
.content-right {
  flex: 1;
  padding: 10px;
}

.content-left {
  border-right: 2px solid #e74c3c;
}

.content-middle {
  border-right: 2px solid #f39c12;
}

.content-right {
  border-right: 2px solid #2ecc71;
}
</style>
