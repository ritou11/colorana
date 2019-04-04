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
    this.drawChart();
  }

  initChart() {
    this.margin = { top: 10, right: 30, bottom: 30, left: 40 };
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
      .domain([0, 20])
      .range([0, this.width]);
    const histogram = d3.histogram()
      .domain([minX, maxX])
      .thresholds(dScale.ticks(20));
    const bins = histogram(this.props.data);
    const yData = _.map(bins, (b) => b.length);
    const maxY = _.max(yData);

    const yScale = d3.scaleLinear()
      .domain([0, maxY])
      .range([this.height, 0]);

    this.svg.selectAll('rect')
      .data(yData)
      .enter()
      .append('rect')
      .attr('class', (d, i) => `histogram-chart-rect-${i}`)
      .attr('x', (d, i) => xScale(i))
      .attr('y', (d) => yScale(d))
      .attr('width', this.width / 20 - 1)
      .attr('height', (d) => this.height - yScale(d))
      .attr('fill', 'blue');
  }

  render() {
    return (
      <div className="histogram-chart" ref={(c) => { this.container = c; }}>
      </div>
    );
  }
}

export default Histogram;
