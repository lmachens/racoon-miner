import React, { Component } from 'react';

import { CardLayout } from '../../layouts';
import PropTypes from 'prop-types';
import { Typography } from '../generic';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { getMiner } from '../../../api/mining';
import { withStyles } from 'material-ui/styles';

const styles = {
  load: {
    fontSize: '1.5rem'
  }
};

class BalanceCard extends Component {
  render() {
    const { classes, miner, workerStats } = this.props;

    return (
      <CardLayout>
        <Typography className={classes.load} variant="display1">
          {(workerStats.unpaidBalance || 0).toFixed(10)} {miner.currency}
        </Typography>
        <Typography variant="caption">Unpaid Balance</Typography>
      </CardLayout>
    );
  }
}

BalanceCard.propTypes = {
  classes: PropTypes.object.isRequired,
  miner: PropTypes.object.isRequired,
  workerStats: PropTypes.object.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier, miners } }) => {
  return {
    miner: getMiner(selectedMinerIdentifier),
    workerStats: miners[selectedMinerIdentifier].workerStats
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps))(BalanceCard);
export { enhance as BalanceCard };