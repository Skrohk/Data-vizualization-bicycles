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
          :graphData="pieChartData"
          :is-fullscreen="false"
          class="my-4"
        />
        <h3>Compteur</h3>
        <graph
          :renderGraph="renderLineChart"
          :graphData="lineChartData"
          :is-fullscreen="false"
          class="my-4"
        />
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
import lineChart from '@/graph/lineChart';
import * as d3 from 'd3';
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
    PieChart(containerId, data, { donutLabel: 'Total : 14', height: 300 });
  };

  pieChartData = [
    {
      name: 'Stations vélib',
      value: 12,
    },
    {
      name: 'Problèmes rapportés',
      value: 5,
    },
    {
      name: 'Pistes cyclables',
      value: 15,
    },
    {
      name: 'Accidents',
      value: 10,
    },
  ];

  renderLineChart = (containerId: string, data: any) => {
    lineChart(
      containerId,
      data,
      ['Station 1', 'Station 2', 'Station 3'],
      [d3.symbol().size(20), d3.symbol().size(20)],
      ['#e76f51', '#2a9d8f', '#e9c46a'],
      'Date',
      'Nombre de cycliste par heure',
      'Nombre de cycliste moyen par heure pour plusieurs compteurs parisiens',
    );
  };

  lineChartData = [
    [
      [new Date('2022-01-01'), 8],
      [new Date('2022-01-02'), 5],
      [new Date('2022-01-03'), 6],
      [new Date('2022-01-04'), 18],
      [new Date('2022-01-05'), 15],
      [new Date('2022-01-06'), 16],
    ],
    [
      [new Date('2022-01-01'), 18],
      [new Date('2022-01-02'), 15],
      [new Date('2022-01-03'), 16],
      [new Date('2022-01-04'), 28],
      [new Date('2022-01-05'), 25],
      [new Date('2022-01-06'), 26],
    ],
    [
      [new Date('2022-01-01'), 28],
      [new Date('2022-01-02'), 25],
      [new Date('2022-01-03'), 26],
    ],
  ];
}
</script>

<style scoped>
#sidebar {
  width: 35%;
  height: 95vh;
  position: fixed;
  z-index: 1;
  top: 2.5vh;
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
