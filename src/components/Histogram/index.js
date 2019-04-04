import React, { Component } from 'react';
import * as _ from 'lodash';
import * as d3 from 'd3';

class Histogram extends Component {
  constructor(props) {
    super(props);
    this.defaultSettings = {
      width: 400,
      height: 200,
      ticks: 10,
      margin: { top: 10, right: 10, bottom: 30, left: 40 },
    };
    this.settings = _.merge(this.defaultSettings, props.settings);
  }

  componentDidMount() {
    this.initChart();
    this.drawChart();
  }

  componentDidUpdate() {
    if (this.settings.width !== this.props.settings.width
      || this.settings.height !== this.props.settings.height) {
      if (this.svg) this.svg.remove();
      this.initChart();
    }
    this.settings = _.merge(this.defaultSettings, this.props.settings);
    this.mainGroup.selectAll('*').remove();
    this.drawChart();
  }

  initChart() {
    this.svg = d3.select(this.container)
      .append('svg')
      .attr('width', this.settings.width)
      .attr('height', this.settings.height);
    this.mainGroup = this.svg.append('g');
  }

  drawChart() {
    const widthAval = this.settings.width - this.settings.margin.left - this.settings.margin.right;
    const heightAval = this.settings.height - this.settings.margin.top - this.settings.margin.bottom;

    if (!this.props.data || !this.props.data.length) return;

    const maxX = this.settings.xmax || _.max(this.props.data);
    const minX = this.settings.xmin || _.min(this.props.data);
    const xScale = d3.scaleLinear()
      .domain([minX, maxX])
      .range([0, widthAval]);
    const histogram = d3.histogram()
      .domain([minX, maxX])
      .thresholds(this.settings.ticks);
    const bins = histogram(this.props.data);
    const maxY = _.max(_.map(bins, (b) => b.length));

    const yScale = d3.scaleLinear()
      .domain([0, maxY])
      .range([heightAval, 0]);

    this.mainGroup.selectAll('rect')
      .data(bins)
      .enter()
      .append('rect')
      .attr('class', (d, i) => `histogram-chart-rect-${i}`)
      .attr('x', (d) => xScale(d.x0) + this.settings.margin.left)
      .attr('y', (d) => yScale(d.length) - this.settings.margin.bottom)
      .attr('width', (d) => (xScale(d.x1) - xScale(d.x0)) * 0.98)
      .attr('height', (d) => heightAval - yScale(d.length))
      .attr('fill', 'blue');

    const xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(this.settings.ticks);
    const yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(this.settings.ticks)
      .tickFormat(d3.format('d'));
    this.mainGroup.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${this.settings.margin.left},${heightAval - this.settings.margin.bottom})`)
      .call(xAxis);
    this.mainGroup.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${this.settings.margin.left},${-this.settings.margin.bottom})`)
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
