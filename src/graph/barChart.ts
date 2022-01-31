import * as d3 from 'd3';

// TODO : fix weird bug with 2 subdatasets in data
const barChart = (
  containerId: string,
  datasets: number[][],
  xLabel = '',
  yLabel = '',
  title = '',
  xDomain?: string[],
  width = 900,
  height = 300,
  viewbox = '0 0 900 300',
): void => {
  /**
   * Returns a barchart plot.
   *
   * @param {datasets} Value to plots
   * (example : [[1, 2, 3]] or [[1, 2, 3], [1, 2, 3]].
   * A maximum of 5 barplot can be ploted.
   */
  if (datasets.length) {
    console.log('Second call with data loaded');
  }

  const container = d3.select(`#${containerId}`);
  const xPadding = 40;
  const yPadding = 50;

  const defaultColor = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];

  const xScale = d3
    .scaleBand()
    .domain(xDomain ?? d3.range(datasets[0].length).map((number) => number.toString()))
    .range([xPadding, width - xPadding]);

  const yScale = d3
    .scaleLinear()
    .domain([0, datasets.reduce((acc, val) => acc + (d3.max(val) as number), 0)])
    .range([height - yPadding, yPadding]);

  const svg = container
    .selectAll('svg')
    // We want only one svg element and not more
    .data([1])
    .enter()
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', viewbox);

  datasets.forEach((subDataset, index) => {
    svg
      .selectAll('rect')
      .data(subDataset, () => index)
      .enter()
      .append('rect')
      .attr('x', (_, i) => i * xScale.bandwidth() + xPadding)
      .attr('y', (d, i) => {
        let offset = 0;
        for (let subDatasetIndex = 0; subDatasetIndex < index; subDatasetIndex += 1) {
          offset += datasets[subDatasetIndex][i];
        }
        return yScale(d + offset);
      })
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d) - yPadding)
      .attr('fill', defaultColor[index])
      .attr('stroke', 'white');
  });

  const xAxis = (g: any) => {
    g.attr('transform', `translate(0, ${height - yPadding})`).call(d3.axisBottom(xScale));
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

  svg
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', yPadding / 2)
    .text(title);
};

export const averageByContinent = (rawData: any, year: number, variable = 'lifeExp') => {
  const valuesByContinent: Record<number, any> = {};
  rawData
    .filter((d: Record<string, number>) => +d.year === year)
    .forEach((d: any) => {
      if (!valuesByContinent[d.continent]) {
        valuesByContinent[d.continent] = { count: 1, sum: +d[variable] };
      } else {
        valuesByContinent[d.continent].count += 1;
        valuesByContinent[d.continent].sum += +d[variable];
      }
    });

  return {
    data: Object.values(valuesByContinent).map((d) => d.sum / d.count),
    labels: Object.keys(valuesByContinent),
  };
};

export default barChart;
