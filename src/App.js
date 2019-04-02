import React, { Component } from 'react';
import './App.css';
import Canvas from './components/Canvas';

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
      </div>
    );
  }
}

export default App;
