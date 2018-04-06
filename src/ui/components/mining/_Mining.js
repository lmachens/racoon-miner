import { Button, Typography } from '../generic';
import React, { Component, Fragment } from 'react';
import { selectMiner, startMining, stopMining } from '../../../store/actions';

import { Metrics } from './_Metrics';
import PropTypes from 'prop-types';
import { Stats } from './_Stats';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMiner } from '../../../api/mining';

class Mining extends Component {
  handleMiningClick = () => {
    const { isMining, startMining, stopMining, minerIdentifier } = this.props;
    if (isMining) stopMining(minerIdentifier);
    else startMining(minerIdentifier);
  };

  render() {
    const { errorMsg, miner, isMining } = this.props;

    return (
      <Fragment>
        <Stats />
        <Button
          color="primary"
          disabled={miner.disabled}
          onClick={this.handleMiningClick}
          variant="raised"
        >
          <img src="/assets/pickaxe.png" style={{ width: 24, height: 24, marginRight: 2 }} />
          {isMining ? 'Stop mining' : 'Start mining'}
        </Button>
        {errorMsg && (
          <Typography color="error" variant="caption">
            Error: {errorMsg}
          </Typography>
        )}
        <Metrics />
      </Fragment>
    );
  }
}

Mining.propTypes = {
  miner: PropTypes.object.isRequired,
  errorMsg: PropTypes.string,
  isMining: PropTypes.bool.isRequired,
  startMining: PropTypes.func.isRequired,
  stopMining: PropTypes.func.isRequired,
  selectMiner: PropTypes.func.isRequired,
  minerIdentifier: PropTypes.string.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier }, activeMiners }) => {
  return {
    isMining: activeMiners[selectedMinerIdentifier].isMining,
    errorMsg: activeMiners[selectedMinerIdentifier].errorMsg,
    miner: getMiner(selectedMinerIdentifier),
    minerIdentifier: selectedMinerIdentifier
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startMining: bindActionCreators(startMining, dispatch),
    stopMining: bindActionCreators(stopMining, dispatch),
    selectMiner: bindActionCreators(selectMiner, dispatch)
  };
};

const enhance = connect(mapStateToProps, mapDispatchToProps)(Mining);
export { enhance as Mining };
