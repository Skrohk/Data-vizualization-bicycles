<template>
  <div
    id="sidebar"
    class="
      transform
      top-0
      right-0
      w-64
      bg-white
      fixed
      h-full
      overflow-auto
      ease-in-out
      transition-all
      duration-300
      z-30
    "
    :class="isOpen ? 'translate-x-0' : 'moved'"
  >
    <button
      @click="close"
      class="bg-gray-400 hover:bg-gray-500 text-white font-bold"
      id="close-button"
    >
      <font-awesome-icon :icon="['fas', 'times']" v-if="isOpen" />
      <font-awesome-icon :icon="['fas', 'angle-double-left']" v-else />
    </button>
    <div id="sidebar-container">
      <div>
        <h2>Informations</h2>
        <h3>Note de cyclabilité de l'arrondissement</h3>
        <graph
          :renderGraph="renderPieChart"
          :graphData="graphData"
          :is-fullscreen="false"
          class="my-4"
        />
        <h3>Compteur</h3>
        <h3>Futures informations à venir</h3>
      </div>
      <div class="absolute bottom-1">
        <h3>Gaëtan Gelineau et Lucas Ruston</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PieChart from '@/graph/piechart';
import Graph from './Graph.vue';

@Options({
  components: {
    Graph,
  },
})
export default class Sidebar extends Vue {
  isOpen = true;

  close(): void {
    this.isOpen = !this.isOpen;
  }

  renderPieChart = (containerId: string, data: any) => {
    console.log('In renderPieCHart');
    PieChart(containerId, data, { donutLabel: 'Total : 14', height: 500 });
  };

  graphData = [
    {
      name: 'Stations vélib',
      value: 12,
    },
    {
      name: 'Problèmes rapportés',
      value: 5,
    },
    {
      name: 'Accidents',
      value: 10,
    },
    {
      name: 'Pistes cyclables',
      value: 15,
    },
  ];
}
</script>

<style scoped>
#sidebar {
  width: 30%;
  height: 90vh;
  position: fixed;
  z-index: 1;
  top: 5vh;
  right: 0;
  background-color: #ececec;
  overflow-x: hidden;
  border-radius: 15px;
  padding: 10px;
}
.moved {
  transform: translateX(88%);
}
#close-button {
  border-radius: 100%;
  padding: 5px;
  height: 2em;
  width: 2em;
}
#sidebar-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12%;
}
h2 {
  font-family: 'Zen Kurenaido', sans-serif;
  font-size: 1.5rem;
  font-variant: small-caps;
}
h3 {
  font-family: 'Zen Kurenaido', sans-serif;
  font-size: 1rem;
  font-variant: small-caps;
}
</style>
