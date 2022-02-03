import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import * as d3 from 'd3';
import dataCounter from '../../public/data/comptage-velo-compteurs.json';
import dataStation from '../../public/data/velib-emplacement-des-stations.json';

const geoMap = (containerId, datasets, width = 1100, height = 700) => {
  const map = L.map(`${containerId}`, { zoomControl: false }).setView([48.86, 2.37], 13);

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
  ).addTo(map);

  map.addControl(L.control.zoom({ position: 'bottomleft' }));

  L.svg({ clickable: true }).addTo(map);

  const stations = dataStation.map((localisation) => ({
    long: localisation.fields.coordonnees_geo[1],
    lat: localisation.fields.coordonnees_geo[0],
    name: localisation.fields.name,
  }));

  const counters = dataCounter.map((localisation) => ({
    long: localisation.fields.coordinates[1],
    lat: localisation.fields.coordinates[0],
    name: localisation.fields.nom_compteur,
  }));

  const Tooltip = d3
    .select(`#${containerId}`)
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 1)
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('padding', '5px')
    .style('position', 'fixed')
    .style('z-index', 2000);

  const mouseover = () => {
    Tooltip.style('opacity', 1);
  };

  const mousemove = (e, d) => {
    console.log(map.latLngToLayerPoint([d.lat, d.long]).x + 20);
    Tooltip.html(d.name)
      .style('left', `${map.latLngToLayerPoint([d.lat, d.long]).x}px`)
      .style('top', `${map.latLngToLayerPoint([d.lat, d.long]).y}px`);
  };

  const mouseleave = () => {
    Tooltip.style('opacity', 0);
  };

  d3.select(`#${containerId}`)
    .select('svg')
    .selectAll('myCircles')
    .data(stations)
    .join('circle')
    .attr('cx', (d) => map.latLngToLayerPoint([d.lat, d.long]).x)
    .attr('cy', (d) => map.latLngToLayerPoint([d.lat, d.long]).y)
    .attr('r', 4)
    .style('fill', '#2a9d8f')
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)
    .style('pointer-events', 'auto');

  d3.select(`#${containerId}`)
    .select('svg')
    .selectAll('myCircles')
    .data(counters)
    .join('circle')
    .attr('cx', (d) => map.latLngToLayerPoint([d.lat, d.long]).x)
    .attr('cy', (d) => map.latLngToLayerPoint([d.lat, d.long]).y)
    .attr('r', 4)
    .style('fill', '#e76f51')
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)
    .style('pointer-events', 'auto');

  function update() {
    d3.selectAll('circle')
      .attr('cx', (d) => map.latLngToLayerPoint([d.lat, d.long]).x)
      .attr('cy', (d) => map.latLngToLayerPoint([d.lat, d.long]).y);
  }

  map.on('moveend', update);
};

export default geoMap;
