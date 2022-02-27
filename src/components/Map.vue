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
    <div class="legend-item">
      <div class="marker counters" />
      <p class="label">Compteur</p>
      <input type="checkbox" class="ml-1" v-model="areCountersDisplayed" />
    </div>

    <div class="legend-item">
      <div class="marker stations" />
      <p class="label">Station Vélib</p>
      <input type="checkbox" class="ml-1" v-model="areStationsDisplayed" />
    </div>

    <div class="legend-item">
      <div class="marker conflict-points" />
      <p class="label">Zone de conflit</p>
      <input type="checkbox" class="ml-1" v-model="areConflictPointsDisplayed" />
    </div>

    <div class="legend-item">
      <div class="marker segments" >-</div>
      <p class="label">Tronçon à améliorer</p>
      <input type="checkbox" class="ml-1" v-model="areSegmentDisplayed" />
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
import dataDangerousPoints from '../../public/data/75056-points.json';
import dataSegments from '../../public/data/75056-troncons-filtered.json';

@Options({
  emits: ['STATION_SELECTED'],
})
export default class Map extends Vue {
  sizeX = 0;

  sizeY = 0;

  areCountersDisplayed = false;

  areStationsDisplayed = false;

  areConflictPointsDisplayed = false;

  areSegmentDisplayed = true;

  map = undefined;

  segmentColorScale = d3
    .scaleSequentialLog()
    .domain([1, 124]) // The max and min have been encoded to reduce processing time
    .interpolator((t) => d3.interpolateRdYlGn(1 - t));

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

      // Use d3's custom geo transform method to implement the above
      const thisMap = this.map;
      function projectPoint(x, y) {
        const point = thisMap.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
      }

      const projection = d3.geoTransform({
        point: projectPoint,
      });

      // creates geopath from projected points (SVG)
      const pathCreator = d3.geoPath().projection(projection);

      d3.select('#map-id')
        .selectAll('path')
        .attr('d', pathCreator);
    };

    update();
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
      Tooltip.html(d.name)
        .style('opacity', 1)
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
    this.displayConflictPoints();
    this.displaySegments(mouseover, mouseleave);
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

  displayConflictPoints() {
    if (this.areConflictPointsDisplayed) {
      const dangerousPoint = dataDangerousPoints.features.map((localisation) => ({
        long: localisation.geometry.coordinates[0],
        lat: localisation.geometry.coordinates[1],
      }));

      d3.select('#map-id')
        .select('svg')
        .selectAll('.dangerous-point')
        .data(dangerousPoint)
        .join('circle')
        .attr('class', 'dangerous-point')
        .attr('cx', (d) => this.map.latLngToLayerPoint([d.lat, d.long]).x)
        .attr('cy', (d) => this.map.latLngToLayerPoint([d.lat, d.long]).y)
        .attr('r', 4)
        .style('fill', '#e75151')
        .style('pointer-events', 'auto');
    } else {
      d3.selectAll('.dangerous-point').remove();
    }
  }

  displaySegments(mouseover, mouseleave) {
    if (this.areSegmentDisplayed) {
      const segments = dataSegments.features;

      d3.select('#map-id')
        .select('svg')
        .selectAll('.segments')
        .data(segments)
        .join('path')
        .attr('fill', 'none')
        .attr('stroke', (e) => this.segmentColorScale(e.properties.contributions))
        .attr('stroke-width', 2)
        .on('mouseover', (e, d) => mouseover(e, { name: d.name }))
        .on('mouseleave', mouseleave);
    } else {
      d3.selectAll('.segments').remove();
    }
  }
}
</script>
<style scoped>
.marker {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.conflict-points {
  background-color: #e75151;
}

.counters {
  background-color: #e76f51;
}

.stations {
  background-color: #2a9d8f;
}

.segments {
  color: forestgreen;
}

.legend-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.label {
  text-align: center;
}
</style>
