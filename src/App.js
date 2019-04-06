import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';
import Canvas from './components/Canvas';
import FigureBoard from './components/FigureBoard';

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
      <div className="gApp">
        <Grid container spacing={12} direction='row'>
          <Grid item xs={4} className='fixed'>
            <Canvas width={400} height={300} src="example.png" storeImgData={this._handleStoreImgData.bind(this)} />
          </Grid>
          <Grid item xs>
            <FigureBoard data={this.state.data}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
