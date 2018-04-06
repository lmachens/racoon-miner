import { Button, Popover, Typography } from '../generic';
import React, { Component, Fragment } from 'react';
import { selectMiner, startMining, stopMining } from '../../../store/actions';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMiner } from '../../../api/mining';

class Mining extends Component {
  state = {
    warningOpen: false
  };

  handleMiningClick = () => {
    const { address, isMining, startMining, stopMining, minerIdentifier } = this.props;
    if (isMining) return stopMining(minerIdentifier);

    if (!address) this.setState({ warningOpen: true });
    startMining(minerIdentifier);
  };

  handleWarningClose = () => {
    this.setState({ warningOpen: false });
  };

  anchorEl = null;

  render() {
    const { connecting, errorMsg, miner, isMining } = this.props;
    const { warningOpen } = this.state;

    return (
      <Fragment>
        <Button
          buttonRef={node => {
            this.anchorEl = node;
          }}
          color="primary"
          disabled={miner.disabled}
          onClick={this.handleMiningClick}
          variant="raised"
        >
          <img src="/assets/pickaxe.png" style={{ width: 24, height: 24, marginRight: 2 }} />
          {isMining && connecting && 'Connecting'}
          {isMining && !connecting && 'Stop mining'}
          {!isMining && 'Start mining'}
        </Button>
        {errorMsg && (
          <Typography color="error" variant="caption">
            Error: {errorMsg}
          </Typography>
        )}
        <Popover anchorEl={this.anchorEl} onClose={this.handleWarningClose} open={warningOpen}>
          <Typography>
            You have to enter a valid address to enable payout. If you only want to try out mining,
            feel free to continue.
          </Typography>
        </Popover>
      </Fragment>
    );
  }
}

Mining.propTypes = {
  address: PropTypes.string.isRequired,
  connecting: PropTypes.bool.isRequired,
  miner: PropTypes.object.isRequired,
  errorMsg: PropTypes.string,
  isMining: PropTypes.bool.isRequired,
  startMining: PropTypes.func.isRequired,
  stopMining: PropTypes.func.isRequired,
  selectMiner: PropTypes.func.isRequired,
  minerIdentifier: PropTypes.string.isRequired
};

const mapStateToProps = ({ mining: { miners, selectedMinerIdentifier }, activeMiners }) => {
  return {
    address: miners[selectedMinerIdentifier].address,
    connecting: activeMiners[selectedMinerIdentifier].connecting,
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
