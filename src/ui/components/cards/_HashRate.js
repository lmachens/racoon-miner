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

class HashRateCard extends Component {
  render() {
    const { classes, hashRate } = this.props;

    return (
      <CardLayout>
        <Typography className={classes.load} variant="display1">
          {hashRate}H/s
        </Typography>
        <Typography variant="caption">Hash Rate</Typography>
      </CardLayout>
    );
  }
}

HashRateCard.propTypes = {
  classes: PropTypes.object.isRequired,
  hashRate: PropTypes.number.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier }, activeMiners }) => {
  return {
    hashRate: activeMiners[selectedMinerIdentifier].currentSpeed
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps))(HashRateCard);
export { enhance as HashRateCard };
