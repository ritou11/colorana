import React, { Component } from 'react';
import './App.css';
import * as _ from 'lodash';
import Canvas from './components/Canvas';
import Histogram from './components/Histogram';
import HSLViolin from './components/HSLViolin';

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
        <Histogram settings={{
          width: 600,
          height: 300,
          xticks: 20,
          xmin: 0,
          xmax: 360,
          color: 'red',
        }} data={_.map(this.state.data, (d) => d[0])}/>
        <Histogram settings={{
          width: 600,
          height: 300,
          xticks: 20,
          xmin: 0,
          xmax: 1,
          color: 'green',
        }} data={_.map(this.state.data, (d) => d[1])}/>
        <Histogram settings={{
          width: 600,
          height: 300,
          xticks: 20,
          xmin: 0,
          xmax: 1,
          color: 'blue',
        }} data={_.map(this.state.data, (d) => d[2])}/>
        <HSLViolin settings={{
          width: 300,
          height: 600,
          xticks: 20,
          xmin: 0,
          xmax: 1,
          color: 'blue',
        }} data={this.state.data}/>
      </div>
    );
  }
}

export default App;
