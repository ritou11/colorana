import React, { Component } from 'react';
import * as _ from 'lodash';

import { rgb2hsl } from '../../utils';

class Canvas extends Component {
  componentDidMount() {
    const { canvas, image } = this.refs;
    image.onload = () => {
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image,
        (this.props.width - image.width) / 2,
        (this.props.width - image.width) / 2);
      const { data } = ctx.getImageData(
        (this.props.width - image.width) / 2,
        (this.props.width - image.width) / 2,
        image.width, image.height,
      );
      const hsldata = _.map(_.chunk(data, 4), (dt) => rgb2hsl(dt[0], dt[1], dt[2]));
      this.props.storeImgData(hsldata);
    };
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width={this.props.width} height={this.props.height}>
          Target image
        </canvas>
        <img ref="image" src={this.props.src} className="hidden" alt="img"/>
      </div>
    );
  }
}

export default Canvas;
