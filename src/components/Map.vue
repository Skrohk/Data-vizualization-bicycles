<template>
  <div
    class="
      p-1
      absolute
      bottom-11
      left-1.5
      bg-white
      border border-black
      flex flex-col
    "
    style="z-index: 5000; width: 150px"
  >
    <div class="flex flex-row items-center">
      <div class="h-1 w-1 rounded-full bg-red-500 mr-0.5" />
      <p>Compteur</p>
      <input type="checkbox" class="ml-1" v-model="areCountersDisplayed" />
    </div>

    <div class="flex flex-row items-center">
      <div class="h-1 w-1 rounded-full bg-green-700 mr-0.5" />
      <p>Station Vélib</p>
      <input type="checkbox" class="ml-1" v-model="areStationsDisplayed" />
    </div>
  </div>
  <div id="map-id" class="absolute top-0 left-0 w-screen h-screen"></div>
</template>

<script lang="js">
import { Options, Vue } from 'vue-class-component';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import * as d3 from 'd3';
import dataCounter from '../../public/data/comptage-velo-compteurs.json';
import dataStation from '../../public/data/velib-emplacement-des-stations.json';

@Options({
  emits: ['STATION_SELECTED'],
})
export default class Map extends Vue {
  sizeX = 0;

  sizeY = 0;

  areCountersDisplayed = true

  areStationsDisplayed = true

  map = undefined;

  async mounted() {
    this.initMap();
    this.geoMap();
  }

  async updated() {
    this.geoMap();
  }

  async created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  async destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.sizeX = window.innerWidth;
    this.sizeY = window.innerHeight;
  }

  initMap() {
    this.map = L.map('map-id', { zoomControl: false }).setView([48.86, 2.37], 13);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2tyb2hrIiwiYSI6ImNrejdiOWJmaDBqd24ybm45NXIwNTVtMm8ifQ.PnszurfVYYiKa3npiOywhw',
      {
        attribution:
          'Bike the way &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1Ijoic2tyb2hrIiwiYSI6ImNrejdiOWJmaDBqd24ybm45NXIwNTVtMm8ifQ.PnszurfVYYiKa3npiOywhw',
      },
    ).addTo(this.map);

    this.map.addControl(L.control.zoom({ position: 'bottomleft' }));

    L.svg({ clickable: true }).addTo(this.map);

    const update = () => {
      d3.selectAll('circle')
        .attr('cx', (d) => this.map.latLngToLayerPoint([d.lat, d.long]).x)
        .attr('cy', (d) => this.map.latLngToLayerPoint([d.lat, d.long]).y);
    };

    this.map.on('moveend', update);
  }

  geoMap() {
    const Tooltip = d3
      .select('#map-id')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 1)
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '5px')
      .style('padding', '5px')
      .style('position', 'fixed')
      .style('z-index', 2000)
      .style('opacity', 0);

    const mouseover = (e, d) => {
      Tooltip.style('opacity', 1);
      Tooltip.html(d.name)
        .style('left', `${e.pageX + 10}px`)
        .style('top', `${e.pageY - 15}px`);
    };

    const mouseleave = () => {
      Tooltip.style('opacity', 0);
    };

    const mouseclick = (e, d) => {
      this.$emit('STATION_SELECTED', d.id);
    };

    this.displayStations(mouseover, mouseleave);
    this.displayCounters(mouseover, mouseleave, mouseclick);
  }

  displayCounters(mouseover, mouseleave, mouseclick) {
    if (this.areCountersDisplayed) {
      const counters = dataCounter.map((localisation) => ({
        long: localisation.fields.coordinates[1],
        lat: localisation.fields.coordinates[0],
        name: localisation.fields.nom_compteur,
        id: localisation.fields.id_compteur,
      }));

      d3.select('#map-id')
        .select('svg')
        .selectAll('.counter')
        .data(counters)
        .join('circle')
        .attr('class', 'counter')
        .attr('cx', (d) => this.map.latLngToLayerPoint([d.lat, d.long]).x)
        .attr('cy', (d) => this.map.latLngToLayerPoint([d.lat, d.long]).y)
        .attr('r', 4)
        .style('fill', '#e76f51')
        .on('mouseover', mouseover)
        .on('mouseleave', mouseleave)
        .on('click', mouseclick)
        .style('pointer-events', 'auto')
        .style('cursor', 'pointer');
    } else {
      d3.selectAll('.counter').remove();
    }
  }

  displayStations(mouseover, mouseleave) {
    if (this.areStationsDisplayed) {
      const stations = dataStation.map((localisation) => ({
        long: localisation.fields.coordonnees_geo[1],
        lat: localisation.fields.coordonnees_geo[0],
        name: localisation.fields.name,
      }));

      d3.select('#map-id')
        .select('svg')
        .selectAll('.station')
        .data(stations)
        .join('circle')
        .attr('class', 'station')
        .attr('cx', (d) => this.map.latLngToLayerPoint([d.lat, d.long]).x)
        .attr('cy', (d) => this.map.latLngToLayerPoint([d.lat, d.long]).y)
        .attr('r', 4)
        .style('fill', '#2a9d8f')
        .on('mouseover', mouseover)
        .on('mouseleave', mouseleave)
        .style('pointer-events', 'auto');
    } else {
      d3.selectAll('.station').remove();
    }
  }
}
</script>
