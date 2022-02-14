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
        <div class="flex flex-row items-center my-2">
          <div class="h-1 w-1 rounded-full bg-red-500 mr-0.5" />
          <p>Compteur</p>

          <div class="h-1 w-1 rounded-full bg-green-700 mr-0.5 ml-3" />
          <p>Station Vélib</p>
        </div>
        <h3>Note de cyclabilité de l'arrondissement</h3>
        <graph
          :renderGraph="renderPieChart"
          :graphData="pieChartData"
          :is-fullscreen="false"
          class="my-2"
        />
        <h3>Compteur</h3>
        <div class="my-2">
          <div class="flex flex-row items-center justify-between">
            <div
              class="flex flex-row items-center"
              v-for="(_, index) in lineChartData"
              :key="index"
            >
              <div
                class="h-1 w-1 rounded-full mr-0.5"
                :style="`background-color: ${lineChartColors[index]}`"
              ></div>
              <p>{{ lineChartStations[index] }}</p>
            </div>
            <button @click="resetLineChartView" title="Reset to original view">
              <font-awesome-icon :icon="['fas', 'expand']" />
            </button>
          </div>
          <graph
            :renderGraph="renderLineChart"
            :graphData="lineChartData"
            :is-fullscreen="false"
          />
        </div>
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
import lineChart, { computeMovingAverage } from '@/graph/lineChart';
import Graph from './Graph.vue';

@Options({
  components: {
    Graph,
  },
  props: {
    stationId: String,
  },
})
export default class Sidebar extends Vue {
  isOpen = true;

  stationId!: string;

  close(): void {
    this.isOpen = !this.isOpen;
  }

  renderPieChart = (containerId: string, data: any) => {
    PieChart(containerId, data, { donutLabel: 'Score : 42', height: 300 });
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

  lineChartColors = ['#e76f51', '#2a9d8f', '#e9c46a'];

  lineChartStations: string[] = [];

  // Need to initalize it not a defined value for it to work
  // eslint-disable-next-line
  resetLineChartView?: () => void = () => {};

  renderLineChart = (containerId: string, data: any) => {
    this.resetLineChartView = lineChart(
      containerId,
      data,
      this.lineChartColors,
      'Date',
      'Nombre de cyclistes par heure',
    );
  };

  async fetchAndFormatData() {
    const jsonFile = await import(
      `../../public/data/${this.stationId}_parsed.json`
    );

    this.lineChartStations = [jsonFile.nom];

    jsonFile.data.sort((d1: { d: string }, d2: { d: string }) => {
      const date1 = new Date(`${d1.d.replace(':', 'T')}:00:00`);
      const date2 = new Date(`${d2.d.replace(':', 'T')}:00:00`);
      if (date1 > date2) return -1;
      if (date2 > date1) return 1;
      return 0;
    });
    return [
      computeMovingAverage(
        jsonFile.data.map((d: { d: string; s: number }) => [
          new Date(`${d.d.replace(':', 'T')}:00:00`),
          d.s,
        ]),
        20,
      ),
    ];
  }

  async mounted(): Promise<void> {
    this.lineChartData = await this.fetchAndFormatData();
  }

  previousStationId?: string = undefined;

  async updated(): Promise<void> {
    if (this.previousStationId === this.stationId) return;
    this.previousStationId = this.stationId;
    this.lineChartData = await this.fetchAndFormatData();
  }

  lineChartData: any[] = [];
}
</script>

<style scoped>
#sidebar {
  width: 455px;
  height: 95vh;
  position: fixed;
  z-index: 1000;
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
  /* margin-left: 12%; */
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
