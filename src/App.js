import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Canvas from './components/Canvas';
import HSLHistogram from './components/HSLHistogram';
import HSLViolin from './components/HSLViolin';
import HSLViolinPie from './components/HSLViolinPie';

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  acutalContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
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
  right: {
    width: '400px',
    flexShrink: 0,
  },
  rightContent: {
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
      tabvalue: 0,
    };
  }

  _handleStoreImgData(data) {
    this.setState({ data });
  }

  _handleTabChange(event, tabvalue) {
    this.setState({ tabvalue });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <div style={{ minHeight: '48px' }}>
          <AppBar>
            <Tabs value={this.state.tabvalue} onChange={this._handleTabChange.bind(this)}>
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </AppBar>
        </div>
        <div className={classes.acutalContent}>
          <div className={classes.appContent}>
            <main className={classes.mainContent}>
              <Grid container alignContent='center' direction='column' justify='center' spacing={8}>
                {this.state.tabvalue === 0 && <div>
                  <Grid item>
                    <HSLHistogram settings={{
                      width: 600,
                      height: 200,
                      xmin: 0,
                      xmax: 360,
                      select: 0,
                      color: 'red',
                    }} data={this.state.data}/>
                    <HSLHistogram settings={{
                      width: 600,
                      height: 200,
                      xmin: 0,
                      xmax: 1,
                      select: 1,
                      color: 'green',
                    }} data={this.state.data}/>
                    <HSLHistogram settings={{
                      width: 600,
                      height: 200,
                      xmin: 0,
                      xmax: 1,
                      select: 2,
                      color: 'blue',
                    }} data={this.state.data}/>
                  </Grid>
                </div>}
                {this.state.tabvalue === 1 && <div>
                  <Grid item>
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
                      sqrt: true,
                      select: 2,
                    }} data={this.state.data}/>
                  </Grid>
                </div>}
                {this.state.tabvalue === 2 && <div>
                  <Grid item>
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
                  </Grid>
                </div>}
              </Grid>
            </main>
          </div>
          <div className={classes.right}>
            <div className={classes.rightContent}>
              <Canvas width={400} height={300} src="example.png" storeImgData={this._handleStoreImgData.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
