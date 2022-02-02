import * as d3 from 'd3';
import * as d3Tile from 'd3-tile';

d3.tile = d3Tile.tile;
d3.tileWrap = d3Tile.tileWrap;

const deltas = [-100, -4, -1, 0];
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

  function zoomed(transform) {
    levels.each(function (delta) {
      const tiles = tile.zoomDelta(delta)(transform);

      d3.select(this)
        .selectAll('image')
        .data(tiles, (d) => d)
        .join('image')
        .attr('xlink:href', (d) => url(...d3.tileWrap(d)))
        .attr('x', ([x]) => (x + tiles.translate[0]) * tiles.scale)
        .attr('y', ([, y]) => (y + tiles.translate[1]) * tiles.scale)
        .attr('width', tiles.scale)
        .attr('height', tiles.scale);
    });
  }
  // eslint-disable-next-line
  const transform = d3.zoomIdentity.translate(width >> 1, height >> 1).scale(1 << 12);

  const zoom = d3
    .zoom()
    // eslint-disable-next-line
    .scaleExtent([1 << 8, 1 << 22])
    .extent([
      [0, 0],
      [width, height],
    ])
    .on('zoom', (event) => {
      console.log(event);
      zoomed(event.transform);
    });

  svg.call(zoom).call(zoom.transform, transform);
  // zoomed()
};

export default geoMap;
