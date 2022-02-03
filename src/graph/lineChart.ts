import * as d3 from 'd3';

const lineChart = (
  containerId: string,
  datasets: [number, number][][],
  legend: string[],
  symbols: any[],
  colors: string[],
  xLabel = '',
  yLabel = '',
  title = '',
  width = 475,
  height = 300,
) => {
  /**
   * Returns a scatter plot.
   *
   * @param {x} Value to plots (example : [[1, 1], [2, 2]] ou [[[1, 1], [2, 2]], [[2, 1], [3, 2]]].
   */

  const container = d3.select(`#${containerId}`);

  const xPadding = 50;
  const yPadding = 50;

  const legendWidth = 0;

  const xScale = d3
    .scaleTime()
    .domain([
      d3.max(datasets, (d1) => d3.max(d1, (d2) => d2[0] as any)),
      d3.min(datasets, (d1) => d3.min(d1, (d2) => d2[0] as any)),
    ])
    .range([width - xPadding - legendWidth, xPadding]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(datasets, (d1) => d3.max(d1, (d2) => d2[1] as any))])
    .range([height - yPadding, yPadding]);

  const svg = container
    .selectAll('svg')
    // We want only one svg element and not more
    .data([1])
    .enter()
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  datasets.forEach((subDataset, index) => {
    svg
      .append('path')
      .datum(subDataset)
      .attr('fill', 'none')
      .attr('stroke', colors[index])
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line()
          .x((d) => xScale(d[0]))
          .y((d) => yScale(d[1])),
      );
  });

  const xAxis = (g: any) => {
    g.attr('transform', `translate(0, ${height - yPadding})`).call(
      d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b') as any),
    );
  };

  const yAxis = (g: any) => {
    g.attr('transform', `translate(${xPadding}, 0)`).call(d3.axisLeft(yScale));
  };
  svg.append('g').call(xAxis);
  svg.append('g').call(yAxis);

  svg
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('y', xPadding / 3)
    .attr('x', -height / 2)
    .attr('transform', 'rotate(-90)')
    .text(yLabel);

  svg
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', height - yPadding / 3)
    .text(xLabel);

  // svg
  //   .append('text')
  //   .attr('text-anchor', 'middle')
  //   .attr('x', width / 2)
  //   .attr('y', yPadding / 2)
  //   .text(title);

  // datasets.forEach((dataset, index) => {
  //   svg
  //     .append('path')
  //     .attr('d', d3.symbol())
  //     .attr(
  //       'transform',
  //       `translate(${width - xPadding - legendWidth + 35},${yPadding + index * 20})`,
  //     )
  //     .attr('fill', colors[index]);
  //   svg
  //     .append('text')
  //     .attr('text-anchor', 'start')
  //     .attr('x', width - xPadding - legendWidth + 50)
  //     .attr('y', yPadding + index * 20 + 5)
  //     .text(legend[index]);
  // });
};

const getAverage = (data: [Date, number][]) =>
  // eslint-disable-next-line
  data.reduce((acc, val) => acc + val[1], 0) / data.length;

export const computeMovingAverage = (data: [Date, number][], period: number) => {
  const movingAverages = [];

  for (let x = 0; x + period - 1 < data.length; x += period) {
    movingAverages.push([data[x][0], getAverage(data.slice(x, x + period))]);
  }
  return movingAverages;
};

export default lineChart;
