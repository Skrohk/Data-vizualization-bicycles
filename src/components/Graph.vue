<template>
  <div :id="containerId" :key="graphData"></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    renderGraph: Function,
    graphData: Object,
  },
})
export default class Graph<T> extends Vue {
  renderGraph!: (containerId: string, graphData: any) => Promise<void>;

  graphData: any;

  containerId = `graphContainer${(1000 * Math.random()).toFixed(0)}`;

  async mounted() {
    await this.renderGraph(this.containerId, this.graphData);
  }

  async updated() {
    await this.renderGraph(this.containerId, this.graphData);
  }
}
</script>
