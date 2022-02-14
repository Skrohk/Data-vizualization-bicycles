import * as d3 from 'd3';

const lineChart = (
  containerId: string,
  datasets: [number, number][][],
  colors: string[],
  xLabel = '',
  yLabel = '',
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

  const xDomainMax = d3.max(datasets, (d1) => d3.max(d1, (d2) => d2[0] as any));
  const xDomainMin = d3.min(datasets, (d1) => d3.min(d1, (d2) => d2[0] as any));
  const yDomainMax = d3.max(datasets, (d1) => d3.max(d1, (d2) => d2[1] as any));

  const xScale = d3
    .scaleTime()
    .domain([xDomainMax, xDomainMin])
    .range([width - xPadding - legendWidth, xPadding]);

  const yScale = d3
    .scaleLinear()
    .domain([0, yDomainMax])
    .range([height - yPadding, yPadding]);

  const svg = container
    .selectAll('svg')
    // We want only one svg element and not more
    .data([1])
    .enter()
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const xAxis = (g: any) => {
    g.attr('transform', `translate(0, ${height - yPadding})`).call(d3.axisBottom(xScale).ticks(6));
  };

  const yAxis = (g: any) => {
    g.attr('transform', `translate(${xPadding}, 0)`).call(d3.axisLeft(yScale));
  };
  svg.append('g').attr('class', 'xAxis').call(xAxis);
  svg.append('g').attr('class', 'yAxis').call(yAxis);

  const scatter = svg.append('g').attr('clip-path', 'url(#clip)');

  const actualiseDrawing = () => {
    svg.select('.xAxis').transition().duration(500).call(xAxis);
    svg.select('.yAxis').transition().duration(500).call(yAxis);

    datasets.forEach((subDataset, index) => {
      scatter
        .select(`.line-${index}`)
        .datum(subDataset)
        .attr(
          'd',
          d3
            .line()
            .x((d) => xScale(d[0]))
            .y((d) => yScale(d[1])),
        );
    });
  };

  const resetView = () => {
    xScale.domain([xDomainMax, xDomainMin]);
    yScale.domain([0, yDomainMax]);
    actualiseDrawing();
  };

  const updateChart = (event: any) => {
    if (!event.mode) return;
    const extent = event.selection;

    if (!extent) {
      xScale.domain([xDomainMax, xDomainMin]);
      yScale.domain([0, yDomainMax]);
    } else {
      const [xMinSelection, yMaxSelection] = extent[0];
      const [xMaxSelection, yMinSelection] = extent[1];

      const xMin = xScale.invert(xMinSelection);
      const yMin = yScale.invert(yMinSelection);
      const xMax = xScale.invert(xMaxSelection);
      const yMax = yScale.invert(yMaxSelection);

      xScale.domain([xMax, xMin]);
      yScale.domain([yMin, yMax]);
      // eslint-disable-next-line
      svg.select('.brush').call(brush.move as any, null); // This remove the grey brush area as soon as the selection has been done
    }

    actualiseDrawing();
  };

  const brush = d3
    .brush()
    .extent([
      [xPadding, yPadding],
      [width - xPadding - legendWidth, height - yPadding],
    ])
    .on('end', updateChart);

  svg
    .append('defs')
    .append('svg:clipPath')
    .attr('id', 'clip')
    .append('svg:rect')
    .attr('width', width - 2 * xPadding - legendWidth)
    .attr('height', height - 2 * yPadding)
    .attr('x', xPadding)
    .attr('y', yPadding);

  scatter
    .append('g')
    .attr('class', 'brush')
    .call(brush as any);

  datasets.forEach((subDataset, index) => {
    scatter
      .append('path')
      .attr('class', `line-${index}`)
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
      )
      .attr('pointer-events', 'none');
  });

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

  return resetView;
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
