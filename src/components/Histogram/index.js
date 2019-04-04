import React, { Component } from 'react';
import * as _ from 'lodash';
import * as d3 from 'd3';

class Histogram extends Component {
  componentDidMount() {
    this.initChart();
    this.drawChart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.width !== this.props.width
      || prevProps.height !== this.props.height) {
      if (this.svg) this.svg.remove();
      this.initChart();
    }
    this.mainGroup.selectAll('*').remove();
    this.drawChart();
  }

  initChart() {
    this.margin = { top: 10, right: 10, bottom: 30, left: 40 };
    this.width = this.props.width - this.margin.left - this.margin.right;
    this.height = this.props.height - this.margin.top - this.margin.bottom;

    this.svg = d3.select(this.container)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
    this.mainGroup = this.svg.append('g')
      .attr('transform',
        `translate(${this.margin.left},${this.margin.top})`);
  }

  drawChart() {
    if (!this.props.data || !this.props.data.length) return;
    const maxX = _.max(this.props.data);
    const minX = _.min(this.props.data);
    const dScale = d3.scaleLinear()
      .domain([minX, maxX])
      .range([0, this.width]);
    const xScale = d3.scaleLinear()
      .domain([0, 10])
      .range([0, this.width]);
    const histogram = d3.histogram()
      .domain([minX, maxX])
      .thresholds(dScale.ticks(10));
    const bins = histogram(this.props.data);
    const yData = _.map(bins, (b) => b.length);
    const maxY = _.max(yData);

    const yScale = d3.scaleLinear()
      .domain([0, maxY])
      .range([this.height, 0]);

    this.mainGroup.selectAll('rect')
      .data(yData)
      .enter()
      .append('rect')
      .attr('class', (d, i) => `histogram-chart-rect-${i}`)
      .attr('x', (d, i) => xScale(i) + this.margin.left)
      .attr('y', (d) => yScale(d) - this.margin.bottom)
      .attr('width', this.width / 10 - 1)
      .attr('height', (d) => this.height - yScale(d))
      .attr('fill', 'blue');

    const xAxis = d3.axisBottom()
      .scale(dScale)
      .ticks(10);
    const yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(10)
      .tickFormat(d3.format('d'));
    this.mainGroup.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${this.margin.left},${this.height - this.margin.bottom})`)
      .call(xAxis);
    this.mainGroup.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${this.margin.left},${-this.margin.bottom})`)
      .call(yAxis);
  }

  render() {
    return (
      <div className="histogram-chart" ref={(c) => { this.container = c; }}>
      </div>
    );
  }
}

export default Histogram;
