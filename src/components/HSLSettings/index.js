import * as _ from 'lodash';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = {
  root: {
    margin: '20px 0',
    display: 'flex',
    flexDirection: 'row',
  },
};

class HSLSettings extends Component {
  state = {
    filename: 'example.png',
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
    const { checkedZoom, checkedTrans } = this.state;
    this.props.storeSettings(_.merge({
      checkedZoom,
      checkedTrans,
    }, { [name]: event.target.checked }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                defaultChecked={false}
                onChange={this.handleChange('checkedZoom')}
                value="checkedZoom"
                color="primary"
              />
            }
            label="Zoom"
          />
          <FormControlLabel
            control={
              <Switch
                defaultChecked={false}
                onChange={this.handleChange('checkedTrans')}
                value="checkedTrans"
                color="primary"
              />
            }
            label="Transition"
          />
        </FormGroup>
      </div>
    );
  }
}

export default withStyles(styles)(HSLSettings);
