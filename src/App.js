import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Canvas from './components/Canvas';
import FigureBoard from './components/FigureBoard';

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    padding: '48px 36px 0',
  },
  left: {
    width: '400px',
    flexShrink: 0,
  },
  leftContent: {
    width: '400px',
    flexShrink: 0,
    height: '100%',
    overflowY: 'auto',
    position: 'fixed',
    background: '#eaeff1',
  },
};

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
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.left}>
          <div className={classes.leftContent}>
            <Canvas width={400} height={300} src="example.png" storeImgData={this._handleStoreImgData.bind(this)} />
          </div>
        </div>
        <div className={classes.appContent}>
          <main className={classes.mainContent}>
            <FigureBoard data={this.state.data}/>
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
