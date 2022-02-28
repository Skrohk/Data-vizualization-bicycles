<template>
  <main>
    <!-- <sidebar /> -->
    <div>
      <div id="header">
        <img src="../../public/logo.png" alt="Logo" width="55" />
        <h1 class="text-4xl">BIKE THE WAY</h1>
      </div>
      <Map
        @STATION_SELECTED="onStationSelected"
        @DISTRICT_SELECTED="onDistrictSelected"
        :view=moveViewTo
      />
      <sidebar :stationId="stationId" :districtId="districtId" @VIEW_CHANGED="onViewChanged"/>
    </div>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Sidebar from '@/components/Sidebar.vue';
import Graph from '@/components/Graph.vue';
import Map from '@/components/Map.vue';

@Options({
  components: {
    Map,
    Sidebar,
    Graph,
  },
})
export default class Home extends Vue {
  stationId = '100006300-SC';

  districtId = 1;

  moveViewTo = 1;

  // eslint-disable-next-line class-methods-use-this
  onStationSelected(id: number): void {
    this.stationId = id.toString();
  }

  onDistrictSelected(district: number): void {
    this.districtId = district;
  }

  onViewChanged(district: number): void {
    this.moveViewTo = district;
  }
}
</script>
<style scoped>
/* zen-kurenaido-regular - latin */
@font-face {
  font-family: 'Zen Kurenaido';
  font-style: normal;
  font-weight: 400;
  src: url('../../public/font/zen-kurenaido-v7-latin-regular.eot');
  src: local(''),
    url('../../public/font/zen-kurenaido-v7-latin-regular.eot?#iefix')
      format('embedded-opentype'),
    url('../../public/font/zen-kurenaido-v7-latin-regular.woff2')
      format('woff2'),
    url('../../public/font/zen-kurenaido-v7-latin-regular.woff') format('woff'),
    url('../../public/font/zen-kurenaido-v7-latin-regular.ttf')
      format('truetype'),
    url('../../public/font/zen-kurenaido-v7-latin-regular.svg#ZenKurenaido')
      format('svg');
}

#header {
  position: fixed;
  z-index: 1000;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
h1 {
  font-family: 'Zen Kurenaido', sans-serif;
  color: #2b2b2b;
  margin-left: 20px !important;
}
</style>
