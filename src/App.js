import React, { Component } from 'react';
import './App.css';
import * as _ from 'lodash';
import Canvas from './components/Canvas';
import HSLHistogram from './components/HSLHistogram';
import HSLViolin from './components/HSLViolin';
import HSLViolinPie from './components/HSLViolinPie';

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
        <HSLHistogram settings={{
          width: 600,
          height: 300,
          xticks: 20,
          xmin: 0,
          xmax: 360,
          select: 0,
          color: 'red',
        }} data={_.map(this.state.data, (d) => d[0])}/>
        <HSLHistogram settings={{
          width: 600,
          height: 300,
          xticks: 20,
          xmin: 0,
          xmax: 1,
          select: 1,
          color: 'green',
        }} data={_.map(this.state.data, (d) => d[1])}/>
        <HSLHistogram settings={{
          width: 600,
          height: 300,
          xticks: 20,
          xmin: 0,
          xmax: 1,
          select: 2,
          color: 'blue',
        }} data={_.map(this.state.data, (d) => d[2])}/>
        <HSLViolin settings={{
          width: 600,
          height: 200,
          sqrt: false,
          transitionOn: true,
          select: 1,
        }} data={this.state.data}/>
        <HSLViolin settings={{
          width: 600,
          height: 200,
          sqrt: false,
          select: 2,
        }} data={this.state.data}/>
        <HSLViolinPie settings={{
          outerR: 200,
          innerR: 100,
          // imgPath: 'example.png',
          sqrt: true,
          select: 2,
        }} data={this.state.data}/>
        <HSLViolinPie settings={{
          outerR: 200,
          innerR: 100,
          imgPath: 'example.png',
          sqrt: true,
          select: 1,
        }} data={this.state.data}/>
      </div>
    );
  }
}

export default App;
