import React, { Component } from 'react';
import './App.css';
import * as _ from 'lodash';
import Canvas from './components/Canvas';
import Histogram from './components/Histogram';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  _handleStoreImgData(data) {
    this.setState({ data });
  }

  render() {
    return (
      <div className="App">
        <Canvas width={400} height={300} src="example.png" storeImgData={this._handleStoreImgData.bind(this)} />
        <Histogram width={400} height={200} data={_.map(this.state.data, (d) => d[0])}/>
        <Histogram width={400} height={200} data={_.map(this.state.data, (d) => d[1])}/>
        <Histogram width={400} height={200} data={_.map(this.state.data, (d) => d[2])}/>
      </div>
    );
  }
}

export default App;
