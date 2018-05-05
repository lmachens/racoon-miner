import React, { Component } from 'react';

import { CardLayout } from '../../layouts';
import PropTypes from 'prop-types';
import { Typography } from '../generic';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

const styles = {
  load: {
    fontSize: '1.5rem'
  }
};

class GpusCard extends Component {
  render() {
    const { classes, totalLoad } = this.props;

    return (
      <CardLayout>
        <Typography className={classes.load} variant="display1">
          {totalLoad.toString()}%
        </Typography>
        <Typography variant="caption">GPU</Typography>
      </CardLayout>
    );
  }
}

GpusCard.propTypes = {
  classes: PropTypes.object.isRequired,
  totalLoad: PropTypes.number.isRequired
};

const mapStateToProps = ({
  hardwareInfo: {
    Gpus: { Gpus }
  }
}) => {
  if (!Gpus.length) return { totalLoad: 0 };
  const firstGpu = Gpus[0];
  const firstGpuLoad = firstGpu.Load.find(load => load.Name === 'GPU Core');
  const totalLoad = parseInt(firstGpuLoad.Value / firstGpuLoad.Max * 100);

  return {
    totalLoad
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps))(GpusCard);
export { enhance as GpusCard };