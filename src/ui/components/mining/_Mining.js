import { Button, Typography } from '../generic';
import React, { Component, Fragment } from 'react';
import { selectMiner, startMining, stopMining } from '../../../store/actions';

import { Metrics } from './_Metrics';
import PropTypes from 'prop-types';
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
    const { miner, isMining, currentSpeed } = this.props;

    return (
      <Fragment>
        <Button disabled={miner.disabled} onClick={this.handleMiningClick}>
          {isMining ? 'Stop mining' : 'Start mining'}
        </Button>
        <Typography>Speed: {currentSpeed} Mh/s</Typography>
        <Metrics />
      </Fragment>
    );
  }
}

Mining.propTypes = {
  miner: PropTypes.object.isRequired,
  isMining: PropTypes.bool.isRequired,
  currentSpeed: PropTypes.number.isRequired,
  startMining: PropTypes.func.isRequired,
  stopMining: PropTypes.func.isRequired,
  selectMiner: PropTypes.func.isRequired,
  minerIdentifier: PropTypes.string.isRequired
};

const mapStateToProps = ({ mining: { selectedMinerIdentifier, miners } }) => {
  return {
    isMining: miners[selectedMinerIdentifier].isMining,
    currentSpeed: miners[selectedMinerIdentifier].currentSpeed,
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
