import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Canvas from './components/Canvas';
import HSLHistogram from './components/HSLHistogram';
import HSLViolin from './components/HSLViolin';
import HSLViolinPie from './components/HSLViolinPie';
import UploadField from './components/UploadField';
import HSLSettings from './components/HSLSettings';

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  chartContent: {
    flex: 1,
    padding: '48px 36px',
    height: '100%',
    display: 'table',
  },
  chartContainer: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  right: {
    width: '440px',
    flexShrink: 0,
  },
  rightContent: {
    flexShrink: 0,
    height: '100%',
    padding: '0 20px',
    overflowY: 'auto',
    position: 'fixed',
    background: '#eaeff1',
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
    marginRight: '32px',
    textAlign: 'right',
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tabvalue: 0,
      imageSrc: 'example.png',
      hsSettings: {},
      hlSettings: {},
    };
  }

  _handleStoreImg(imageSrc) {
    this.setState({ imageSrc });
  }

  _handleStoreImgData(data) {
    this.setState({ data });
  }

  _handleTabChange(event, tabvalue) {
    this.setState({ tabvalue });
  }

  handleStoreSettings = (select) => (settings) => {
    const name = select === 1 ? 'hsSettings' : 'hlSettings';
    this.setState({ [name]: settings });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <div style={{ minHeight: '48px' }}>
          <AppBar className={classes.appBar}>
            <Tabs value={this.state.tabvalue}
              onChange={this._handleTabChange.bind(this)}
              variant="scrollable"
              scrollButtons="on">
              <Tab label="Histogram" />
              <Tab label="Violin Plot" />
              <Tab label="HL Violin Pie" />
              <Tab label="HS Violin Pie" />
            </Tabs>
            <Typography variant="h6" color="inherit" className={classes.title}>
              Analyze your image in HSL space: COLORANA
            </Typography>
          </AppBar>
        </div>
        <main className={classes.mainContent}>
          <div className={classes.appContent}>
            <div className={classes.chartContent}>
              <Grid container className={classes.chartContainer}
                alignContent='center' direction='column' justify='center' spacing={8}>
                {this.state.tabvalue === 0 && <div>
                  <Grid item>
                    <HSLHistogram settings={{
                      width: 800,
                      height: 200,
                      xmin: 0,
                      xmax: 360,
                      select: 0,
                    }} data={this.state.data}/>
                    <HSLHistogram settings={{
                      width: 800,
                      height: 200,
                      xmin: 0,
                      xmax: 1,
                      select: 1,
                    }} data={this.state.data}/>
                    <HSLHistogram settings={{
                      width: 800,
                      height: 200,
                      xmin: 0,
                      xmax: 1,
                      select: 2,
                    }} data={this.state.data}/>
                  </Grid>
                </div>}
                {this.state.tabvalue === 1 && <div>
                  <Grid item>
                    <HSLViolin settings={{
                      width: 800,
                      height: 300,
                      sqrt: this.state.hsSettings.checkedZoom,
                      transitionOn: this.state.hsSettings.checkedTrans,
                      select: 1,
                    }} data={this.state.data}/>
                    <HSLViolin settings={{
                      width: 800,
                      height: 300,
                      sqrt: this.state.hlSettings.checkedZoom,
                      transitionOn: this.state.hlSettings.checkedTrans,
                      select: 2,
                    }} data={this.state.data}/>
                  </Grid>
                </div>}
                {this.state.tabvalue === 2 && <div>
                  <Grid item>
                    <HSLViolinPie settings={{
                      outerR: 300,
                      innerR: 150,
                      imgPath: this.state.imageSrc,
                      sqrt: true,
                      select: 2,
                    }} data={this.state.data}/>
                  </Grid>
                </div>}
                {this.state.tabvalue === 3 && <div>
                  <Grid item>
                    <HSLViolinPie settings={{
                      outerR: 300,
                      innerR: 150,
                      imgPath: this.state.imageSrc,
                      sqrt: true,
                      select: 1,
                    }} data={this.state.data}/>
                  </Grid>
                </div>}
              </Grid>
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.rightContent}>
              <Canvas width={400} height={300} src={this.state.imageSrc}
                storeImgData={this._handleStoreImgData.bind(this)} />
              <Divider />
              <UploadField storeImg={this._handleStoreImg.bind(this)}/>
              <Divider />
              <HSLSettings storeSettings={this.handleStoreSettings(1)}/>
              <Divider />
              <HSLSettings storeSettings={this.handleStoreSettings(2)}/>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
