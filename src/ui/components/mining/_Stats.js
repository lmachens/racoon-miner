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
    const { workerStats } = this.props;

    return (
      <Grid container justify="center" spacing={16}>
        <Grid item>
          <CardLayout title="Ø Hashrate">
            {(workerStats.averageHashrate / 100000 || 0).toFixed(2)} MH/s
          </CardLayout>
        </Grid>
        <Grid item>
          <CardLayout title="Shares">{workerStats.validShares || 0}</CardLayout>
        </Grid>
        <Grid item>
          <CardLayout title="Unpaid Balance">{0}</CardLayout>
        </Grid>
      </Grid>
    );
  }
}

Stats.propTypes = {
  workerStats: PropTypes.object.isRequired,
  minerIdentifier: PropTypes.string.isRequired,
  fetchWorkerStats: PropTypes.func.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier, miners } }) => {
  return {
    minerIdentifier: selectedMinerIdentifier,
    workerStats: miners[selectedMinerIdentifier].workerStats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWorkerStats: bindActionCreators(fetchWorkerStats, dispatch)
  };
};

const enhance = connect(mapStateToProps, mapDispatchToProps)(Stats);
export { enhance as Stats };
