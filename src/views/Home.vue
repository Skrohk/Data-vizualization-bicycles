<template>
  <main class="min-h-scren">
    <!-- <sidebar /> -->
    <div class="p-2">
      <h1 class="text-h1 font-bold">Visualisation du vélo ouais trop bien</h1>
      <graph
        :renderGraph="renderGraph"
        :graphData="barChartData"
        class="mt-10"
      />
      <button @click="onClick" class="border border-black p-1 bg-navy-500">
        Add 5 years
      </button>
      <p>BarCHartData : {{ barChartData }}</p>
    </div>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Sidebar from '@/components/Sidebar.vue';
import Graph from '@/components/Graph.vue';
import barChart, { averageByContinent } from '@/graph/barChart';
import * as d3 from 'd3';

@Options({
  components: {
    Sidebar,
    Graph,
  },
})
export default class Home extends Vue {
  barChartData: number[][] = [];

  barChartLabels: string[] = [];

  year = 1952;

  rawData: any[] = [];

  async created() {
    this.rawData = await d3.csv(
      'https://raw.githubusercontent.com/romsson/visualisation-interactive/main/datasets/gapminder.csv',
    );

    const { data, labels } = averageByContinent(
      this.rawData,
      this.year,
      'lifeExp',
    );
    this.barChartData = [data];
    this.barChartLabels = labels;
  }

  renderGraph(containerId: string, data: any) {
    barChart(
      containerId,
      data,
      'Continent',
      'Espérance de vie',
      `Espérance de vie moyenne par continent en ${this.year}`,
      this.barChartLabels,
    );
  }

  onClick() {
    if (this.year < 2007) {
      this.year += 5;
      const { data, labels } = averageByContinent(
        this.rawData,
        this.year,
        'lifeExp',
      );
      this.barChartData = [data];
      this.barChartLabels = labels;
    }
  }
}
</script>
