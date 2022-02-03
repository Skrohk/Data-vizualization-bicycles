import * as d3 from 'd3';
import { tile as d3tile, tileWrap as d3tileWrap } from 'd3-tile';

d3.tile = d3tile;
d3.tileWrap = d3tileWrap;

const deltas = [0]; // [-100, -4, -1, 0];
const showLayers = false;
const url = (x, y, z) => `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;

const geoMap = (containerId, datasets, width = 1100, height = 700) => {
  const container = d3.select(`#${containerId}`);
  const svg = container
    .selectAll('svg')
    // We want only one svg element and not more
    .data([1])
    .enter()
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`);

  const levels = svg
    .append('g')
    .attr('pointer-events', 'none')
    .selectAll('g')
    .data(deltas)
    .join('g')
    .style('opacity', showLayers ? 0.3 : null);

  const tile = d3
    .tile()
    .extent([
      [0, 0],
      [width, height],
    ])
    .tileSize(512)
    .clampX(false);

  const eiffelTower = [48.85902903260841, 2.294839893741968];

  const tau = 2 * Math.PI;
  const projection = d3
    .geoMercator()
    .scale(1 / tau)
    .translate([0, 0]);

  console.log('projection : ', projection(eiffelTower));

  // svg
  //   .append('circle')
  //   .attr('cx', width / 2)
  //   .attr('cy', height / 2)
  //   .attr('r', '20px')
  //   .attr('fill', 'red');

  let lastTransform = { x: undefined, y: undefined, k: undefined };

  function zoomed(transform) {
    levels.each(function (delta) {
      const tiles = tile.zoomDelta(delta)(transform);

      d3.select(this)
        .selectAll('image')
        .data(tiles, (d) => d)
        .join('image')
        .attr('xlink:href', (d) => url(...d3.tileWrap(d)))
        .attr('x', ([x]) => {
          console.log('------------\n x : ', x);
          console.log(tiles.translate[0]);
          console.log(tiles.scale);
          return (x + tiles.translate[0]) * tiles.scale;
        })
        .attr('y', ([, y]) => (y + tiles.translate[1]) * tiles.scale)
        .attr('width', tiles.scale)
        .attr('height', tiles.scale);

      svg
        .selectAll('circle')
        .data([eiffelTower])
        .join('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('r', '20px')
        .attr('fill', 'red')
        .attr('transform', transform);
    });
    lastTransform = { x: transform.x, y: transform.y, k: transform.k };
  }

  const transformParams = { k: 2272738.078820472, x: -14207.477620112986, y: 354846.5859339866 };

  const initialTransform = d3.zoomIdentity
    .translate(transformParams.x, transformParams.y)
    .scale(transformParams.k);

  const zoom = d3
    .zoom()
    // eslint-disable-next-line
    .scaleExtent([1 << 8, 1 << 22])
    .extent([
      [0, 0],
      [width, height],
    ])
    .on('zoom', (event) => {
      console.log(event.transform);
      zoomed(event.transform);
    });

  svg.call(zoom).call(zoom.transform, initialTransform);
};

export default geoMap;
