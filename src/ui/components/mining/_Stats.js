import React, { Component } from 'react';

import { CardLayout } from '../../layouts';
import { Grid } from '../generic';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchWorkerStats } from '../../../store/actions';

class Stats extends Component {
  componentDidMount() {
    this.startFetchWorkerStatsInterval();
  }

  componentWillUnmount() {
    this.stopWorkerStatsInterval();
  }

  startFetchWorkerStatsInterval = () => {
    const { minerIdentifier, fetchWorkerStats } = this.props;
    this.stopWorkerStatsInterval();

    fetchWorkerStats(minerIdentifier);
    this.workerStatsInterval = setInterval(() => {
      fetchWorkerStats(minerIdentifier);
    }, 60000);
  };

  stopWorkerStatsInterval = () => {
    this.workerStatsInterval && clearInterval(this.liveModeInterval);
  };

  render() {
    const { currentSpeed, shards, coins } = this.props;

    return (
      <Grid container justify="center" spacing={16}>
        <Grid item>
          <CardLayout title="Hashrate">{currentSpeed} Mh/s</CardLayout>
        </Grid>
        <Grid item>
          <CardLayout title="Shares">{shards}</CardLayout>
        </Grid>
        <Grid item>
          <CardLayout title="Unpaid Balance">{coins}</CardLayout>
        </Grid>
      </Grid>
    );
  }
}

Stats.propTypes = {
  currentSpeed: PropTypes.number.isRequired,
  shards: PropTypes.number.isRequired,
  coins: PropTypes.number.isRequired,
  minerIdentifier: PropTypes.string.isRequired,
  fetchWorkerStats: PropTypes.func.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier, miners } }) => {
  return {
    minerIdentifier: selectedMinerIdentifier,
    currentSpeed: miners[selectedMinerIdentifier].currentSpeed,
    shards: miners[selectedMinerIdentifier].shards,
    coins: miners[selectedMinerIdentifier].coins
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWorkerStats: bindActionCreators(fetchWorkerStats, dispatch)
  };
};

const enhance = connect(mapStateToProps, mapDispatchToProps)(Stats);
export { enhance as Stats };
