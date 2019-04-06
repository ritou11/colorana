import React, { Component } from 'react';
import * as _ from 'lodash';
import * as d3 from 'd3';
import { hslColorGenerator } from '../../utils';

class HSLHistogram extends Component {
  constructor(props) {
    super(props);
    this.id = _.uniqueId('hslhistogram-');
    this.defaultSettings = {
      width: 400,
      height: 200,
      xticks: 10,
      yticks: 10,
      margin: { top: 10, right: 10, bottom: 30, left: 40 },
      select: 1,
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
    if (!this.props.data || !this.props.data.length) return;
    const sts = this.settings;
    const widthAval = sts.width - sts.margin.left - sts.margin.right;
    const heightAval = sts.height - sts.margin.top - sts.margin.bottom;

    const maxX = sts.xmax || _.max(this.props.data);
    const minX = sts.xmin || _.min(this.props.data);
    const xScale = d3.scaleLinear()
      .domain([minX, maxX])
      .range([0, widthAval]);
    const histogram = d3.histogram()
      .domain([minX, maxX])
      .thresholds(xScale.ticks(sts.xticks));
    const bins = histogram(this.props.data);
    const maxY = _.max(_.map(bins, (b) => b.length));

    const yScale = d3.scaleLinear()
      .domain([0, maxY])
      .range([heightAval, 0]);

    this.mainGroup.append('defs')
      .append('linearGradient')
      .attrs({
        id: `${this.id}-area-gradient`,
        gradientUnits: 'userSpaceOnUse',
        x1: sts.margin.left,
        y1: '0%',
        x2: sts.margin.left + widthAval,
        y2: '0%',
      })
      .selectAll('stop')
      .data(hslColorGenerator(sts.select, { h: 0, s: 0.5, l: 0.5 }))
      .enter()
      .append('stop')
      .attr('offset', (d) => d.offset)
      .attr('stop-color', (d) => d.color);

    this.mainGroup.selectAll('rect')
      .data(bins)
      .enter()
      .append('rect')
      .attr('class', (d, i) => `hslhistogram-rect-${i}`)
      .attr('x', (d) => xScale(d.x0) + sts.margin.left)
      .attr('y', (d) => yScale(d.length))
      .attr('width', (d) => (xScale(d.x1) - xScale(d.x0)) * 0.98)
      .attr('height', (d) => heightAval - yScale(d.length))
      .attr('fill', `url(#${this.id}-area-gradient)`);

    const xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(_.min([20, sts.xticks]));
    const yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(sts.yticks)
      .tickFormat(d3.format('d'));
    this.mainGroup.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${sts.margin.left},${heightAval})`)
      .call(xAxis);
    this.mainGroup.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${sts.margin.left},0)`)
      .call(yAxis);
  }

  render() {
    return (
      <div className="hslhistogram" id={this.id} ref={(c) => { this.container = c; }}>
      </div>
    );
  }
}

export default HSLHistogram;
