import { Grid, InfoButton, Typography } from '../generic';
import React, { Component, Fragment } from 'react';

import { CardLayout } from '../../layouts';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchWorkerStats } from '../../../store/actions';
import { getMiner } from '../../../api/mining';

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
    const { miner, workerStats } = this.props;

    return (
      <Grid container justify="center" spacing={16}>
        <Grid item>
          <CardLayout
            actions={
              <Fragment>
                <InfoButton popover={<Typography>ToDo</Typography>}>Learn More</InfoButton>
              </Fragment>
            }
            title="Ø Hashrate"
          >
            <Typography>{(workerStats.averageHashrate / 1000000 || 0).toFixed(2)} MH/s</Typography>
          </CardLayout>
        </Grid>
        <Grid item>
          <CardLayout
            actions={
              <Fragment>
                <InfoButton popover={<Typography>ToDo</Typography>}>Learn More</InfoButton>
              </Fragment>
            }
            title="Shares"
          >
            <Typography>{workerStats.validShares || 0}</Typography>
          </CardLayout>
        </Grid>
        <Grid item>
          <CardLayout
            actions={
              <Fragment>
                <InfoButton popover={<Typography>ToDo</Typography>}>Payout</InfoButton>
                <InfoButton
                  popover={
                    <Typography>
                      Minimum payment threshold is {miner.minimumPaymentThreshold} {miner.currency}
                    </Typography>
                  }
                >
                  Learn More
                </InfoButton>
              </Fragment>
            }
            title="Unpaid Balance"
          >
            <Typography>
              {(workerStats.unpaidBalance || 0).toFixed(6)} {miner.currency}
            </Typography>
          </CardLayout>
        </Grid>
      </Grid>
    );
  }
}

Stats.propTypes = {
  miner: PropTypes.object.isRequired,
  workerStats: PropTypes.object.isRequired,
  minerIdentifier: PropTypes.string.isRequired,
  fetchWorkerStats: PropTypes.func.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier, miners } }) => {
  return {
    miner: getMiner(selectedMinerIdentifier),
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
