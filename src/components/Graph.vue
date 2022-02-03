<template>
  <div :id="containerId" :key="graphData"></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import * as d3 from 'd3';
import { averageByContinent } from '@/graph/barChart';

@Options({
  props: {
    renderGraph: Function,
    graphData: Object,
    isFullscreen: Boolean,
  },
})
export default class Graph<T> extends Vue {
  renderGraph!: (containerId: string, graphData: any, x?: number, y?: number) => Promise<void>;

  graphData: any;

  isFullscreen = false;

  containerId = `graphContainer${(1000 * Math.random()).toFixed(0)}`;

  sizeX = 0;

  sizeY = 0;

  async mounted(): Promise<void> {
    if (this.isFullscreen) {
      await this.renderGraph(this.containerId, this.graphData, this.sizeX, this.sizeY);
    } else {
      await this.renderGraph(this.containerId, this.graphData);
    }
  }

  async updated(): Promise<void> {
    if (this.isFullscreen) {
      await this.renderGraph(this.containerId, this.graphData, this.sizeX, this.sizeY);
    } else {
      await this.renderGraph(this.containerId, this.graphData);
    }
  }

  async created(): Promise<void> {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  async destroyed(): Promise<void> {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize(): void {
    this.sizeX = window.innerWidth;
    this.sizeY = window.innerHeight;
  }
}
</script>
<style scoped>
div {
  width: 500px;
  height: 500px;
}
</style>
