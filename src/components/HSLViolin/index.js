import React, { Component } from 'react';
import * as _ from 'lodash';
import * as d3 from 'd3';
import 'd3-selection-multi';

class HSLViolin extends Component {
  constructor(props) {
    super(props);
    this.id = _.uniqueId('hslviolin-');
    this.defaultSettings = {
      select: 1, // 1 for saturation; 2 for lightness
      width: 400,
      height: 200,
      xticks: 10,
      yticks: 10,
      margin: { top: 10, right: 10, bottom: 30, left: 40 },
      textMargin: { top: 0, right: 0, bottom: 30, left: 30 },
      color: 'blue',
      color1: '#eeeeaa',
      color2: '#eeeeee',
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
    this.axisGroup.selectAll('*').remove();
    this.drawChart();
  }

  initChart() {
    this.svg = d3.select(this.container)
      .append('svg')
      .attr('width', this.settings.width)
      .attr('height', this.settings.height);
    this.mainGroup = this.svg.append('g')
      .attr('transform', `translate(${this.settings.margin.left
        + this.settings.textMargin.left},${this.settings.margin.top
        + this.settings.textMargin.top})`);
    this.axisGroup = this.svg.append('g')
      .attr('transform', `translate(${this.settings.margin.left},${this.settings.margin.top})`);
  }

  drawChart() {
    const sts = this.settings;
    const widthAval = sts.width - sts.margin.left - sts.margin.right
      - sts.textMargin.left - sts.textMargin.right;
    const heightAval = sts.height - sts.margin.top - sts.margin.bottom
       - sts.textMargin.top - sts.textMargin.bottom;

    const xScale = d3.scaleLinear()
      .domain([0, 360])
      .range([0, widthAval]);
    const dvd = d3.histogram()
      .domain(xScale.domain())
      .thresholds(36)
      .value((d) => d[0]);
    const hbins = dvd(this.props.data);

    const yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([heightAval, 0]);
    const histogram = d3.histogram()
      .domain(yScale.domain())
      .thresholds(yScale.ticks(sts.xticks));

    const binWidth = xScale(hbins[0].x1) - xScale(hbins[0].x0);
    const maxX = _.max(_.map(hbins,
      (b) => _.max(_.map(histogram(
        _.map(b, (t) => t[sts.select]),
      ), (c) => c.length))));
    const xNum = d3.scaleLinear()
      .range([0, binWidth])
      .domain([-maxX * 0.8, maxX * 0.8]);

    const apt = this.mainGroup.selectAll('.g-violin')
      .data(hbins)
      .enter()
      .append('g')
      .attr('class', (d, i) => `g-violin single-violin-${i}`)
      .attr('transform', (d) => `translate(${xScale(d.x0)},0)`);
    apt.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', binWidth)
      .attr('height', heightAval)
      .style('fill', (d, i) => (i % 2 === 0 ? sts.color1 : sts.color2));
    apt.append('defs')
      .append('clipPath')
      .attr('id', (d, i) => `${this.id}-mask-${i}`)
      .style('pointer-events', 'none')
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', binWidth)
      .attr('height', heightAval);
    apt.append('path')
      .datum((d) => histogram(_.map(d, (t) => t[sts.select])))
      .style('stroke', 'none')
      .style('fill', sts.color)
      .attr('clip-path', (d, i) => `url(#${this.id}-mask-${i})`)
      .attr('d', d3.area()
        .x0((d) => xNum(-d.length))
        .x1((d) => xNum(d.length))
        .y((d) => yScale(d.x0))
        .curve(d3.curveCatmullRom));

    this.axisGroup.append('defs')
      .append('marker')
      .attrs({
        id: `${this.id}-arrow`,
        markerUnits: 'strokeWidth',
        markerWidth: 12,
        markerHeight: 12,
        viewBox: '0 0 12 12',
        refX: 6,
        refY: 6,
        orient: 'auto',
      })
      .append('path')
      .attrs({
        d: 'M2,2 L10,6 L2,10 L6,6 L2,2',
        style: 'fill: #000000;',
      });
    this.axisGroup.append('g')
      .attr('class', 'g-xAxis')
      .attr('transform', `translate(${sts.textMargin.left},${sts.textMargin.top})`)
      .append('line')
      .attrs({
        x1: 0,
        y1: heightAval,
        x2: widthAval,
        y2: heightAval,
        stroke: 'black',
        'stroke-width': 1.5,
        'marker-end': `url(#${this.id}-arrow)`,
      });
    this.axisGroup.append('g')
      .attr('class', 'g-yAxis')
      .attr('transform', `translate(${sts.textMargin.left},${sts.textMargin.top})`)
      .append('line')
      .attrs({
        x1: 0,
        y1: heightAval,
        x2: 0,
        y2: 0,
        stroke: 'black',
        'stroke-width': 1.5,
        'marker-end': `url(#${this.id}-arrow)`,
      });
    this.axisGroup.append('text')
      .attrs({
        'text-anchor': 'middle',
        fill: 'black',
        'font-size': '12px',
        transform: `translate(${widthAval / 2 + sts.textMargin.left},${heightAval + 16 + sts.textMargin.top})`,
      })
      .text('Hue');
    this.axisGroup.append('text')
      .attrs({
        'text-anchor': 'middle',
        fill: 'black',
        'font-size': '12px',
        transform: `translate(${sts.textMargin.left - 10},${heightAval / 2
          + sts.textMargin.top}) rotate(270)`,
      })
      .text((['Saturation', 'Lightness'])[sts.select - 1]);
  }

  render() {
    return (
      <div className="HSLViolin-chart" id={this.id} ref={(c) => { this.container = c; }}>
      </div>
    );
  }
}

export default HSLViolin;
