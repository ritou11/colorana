import React, { Component } from 'react';
import * as _ from 'lodash';
import * as d3 from 'd3';

function singleViolin(sel, data, settings) {
  const sts = settings;
  const widthAval = sts.width - sts.margin.left - sts.margin.right;
  const heightAval = sts.height - sts.margin.top - sts.margin.bottom;

  if (!data || !data.length) return;

  const maxY = sts.xmax || _.max(data);
  const minY = sts.xmin || _.min(data);
  const lenY = maxY - minY;
  const yScale = d3.scaleLinear()
    .domain([minY - lenY * 0.1, maxY + lenY * 0.1])
    .range([heightAval, 0]);
  const histogram = d3.histogram()
    .domain(yScale.domain())
    .thresholds(yScale.ticks(sts.xticks));
  const bins = histogram(data);
  const maxX = _.max(_.map(bins, (b) => b.length));
  const xNum = d3.scaleLinear()
    .range([0, widthAval / 2])
    .domain([-maxX, maxX]);
  sel.append('path')
    .datum(bins)
    .style('stroke', 'none')
    .style('fill', sts.color)
    .attr('d', d3.area()
      .x0((d) => xNum(-d.length))
      .x1((d) => xNum(d.length))
      .y((d) => yScale(d.x0))
      .curve(d3.curveCatmullRom));
}

class HSLViolin extends Component {
  constructor(props) {
    super(props);
    this.defaultSettings = {
      width: 400,
      height: 200,
      xticks: 10,
      yticks: 10,
      margin: { top: 10, right: 10, bottom: 30, left: 40 },
      color: 'blue',
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
    const sts = this.settings;
    const dvd = d3.histogram()
      .domain(sts.xmin, sts.xmax);
    this.mainGroup.call(singleViolin, this.props.data, sts);
  }

  render() {
    return (
      <div className="histogram-chart" ref={(c) => { this.container = c; }}>
      </div>
    );
  }
}

export default HSLViolin;
