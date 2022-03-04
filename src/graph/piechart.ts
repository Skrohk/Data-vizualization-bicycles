import * as d3 from 'd3';

function PieChart(
  containerId: string,
  data: { name: string; value: number }[],
  {
    name = (d: { name: string }) => d.name,
    value = (d: { value: number }) => d.value,
    paramTitle,
    width = 640,
    height = 400,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2,
    labelRadius = innerRadius * 0.2 + outerRadius * 0.8,
    format = ',',
    paramNames,
    paramColors,
    stroke = innerRadius > 0 ? 'none' : 'white',
    strokeWidth = 1,
    strokeLinejoin = 'round',
    padAngle = stroke === 'none' ? 1 / outerRadius : 0,
    donutLabel = '',
  }: any = {},
) {
  const N: string[] = d3.map(data, name);
  const V: number[] = d3.map(data, value);
  const I = d3.range(N.length).filter((i) => !Number.isNaN(V[i]));

  let names;
  if (paramNames === undefined) names = N;
  names = new d3.InternSet(names);

  let colors;
  if (paramColors === undefined) colors = d3.schemeSpectral[names.size];
  if (paramColors === undefined) {
    colors = d3.quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), names.size);
  }

  const color = d3.scaleOrdinal(names, colors as string[]);

  let title: (d: any) => string;
  if (paramTitle === undefined) {
    const formatValue = d3.format(format);
    title = (i: number) => `${N[i]}\n${formatValue(V[i])}`;
  } else {
    const O = d3.map(data, (d) => d);
    const T = paramTitle;
    title = (i: number) => T(O[i], i, data);
  }

  const arcs = d3
    .pie()
    .padAngle(padAngle)
    .sort(null)
    .value((i) => V[i as number])(I);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

  const container = d3.select(`#${containerId}`);
  const svg = container
    .selectAll('svg')
    // We want only one svg element and not more
    .data([1])
    .enter()
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [-width / 2, -height / 2, width, height])
    .attr('style', 'max-width: 100%; height: auto;');

  svg
    .append('g')
    .attr('stroke', stroke)
    .attr('stroke-width', strokeWidth)
    .attr('stroke-linejoin', strokeLinejoin)
    .selectAll('path')
    .data(arcs)
    .join('path')
    .attr('fill', (d) => color(N[d.data as any]) as any)
    .attr('d', arc as any)
    .append('title')
    .text((d) => title(d.data));

  svg
    .append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 15)
    .attr('text-anchor', 'middle')
    .selectAll('text')
    .data(arcs)
    .join('text')
    .attr('transform', (d: any) => `translate(${arcLabel.centroid(d)})`)
    .selectAll('tspan')
    .data((d) => {
      const lines = `${title(d.data)}`.split(/\n/);
      return d.endAngle - d.startAngle > 0.25 ? lines : lines.slice(0, 1);
    })
    .join('tspan')
    .attr('x', 0)
    .attr('y', (_, i) => `${i * 1.1}em`)
    .attr('font-weight', (_, i) => (i ? null : 'bold'))
    .text((d) => d);

  svg
    .append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 90)
    .selectAll('text')
    .data([1])
    .join('text')
    .attr('x', '-70px')
    .attr('y', '30px')
    .text(donutLabel);

  svg
    .append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 15)
    .attr('text-anchor', 'middle')
    .selectAll('text')
    .data([1])
    .join('text')
    .text('/ 100')
    .attr('x', '60px')
    .attr('y', '30px')
    .style('color', 'grey');
}

export default PieChart;
