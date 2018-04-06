import { InputAdornment, TextField, Typography } from '../generic';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setMiningSpeedLimit } from '../../../store/actions';

class SpeedLimit extends Component {
  handleChange = event => {
    const { setMiningSpeedLimit, minerIdentifier } = this.props;

    const speedLimit = parseInt(event.target.value);
    if (speedLimit > 0 && speedLimit < 101) setMiningSpeedLimit(minerIdentifier, speedLimit);
  };

  render() {
    const { speedLimit, isMining } = this.props;
    return (
      <TextField
        disabled={isMining}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography variant="caption">Speed:</Typography>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Typography variant="caption">%</Typography>
            </InputAdornment>
          ),
          style: { width: 105 }
        }}
        inputProps={{ min: 1, max: 100, style: { textAlign: 'center' } }}
        margin="normal"
        onChange={this.handleChange}
        type="number"
        value={speedLimit}
      />
    );
  }
}

SpeedLimit.propTypes = {
  setMiningSpeedLimit: PropTypes.func.isRequired,
  minerIdentifier: PropTypes.string.isRequired,
  isMining: PropTypes.bool.isRequired,
  speedLimit: PropTypes.number.isRequired
};

const mapStateToProps = ({ mining: { miners, selectedMinerIdentifier }, activeMiners }) => {
  return {
    minerIdentifier: selectedMinerIdentifier,
    speedLimit: miners[selectedMinerIdentifier].speedLimit,
    isMining: activeMiners[selectedMinerIdentifier].isMining
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMiningSpeedLimit: bindActionCreators(setMiningSpeedLimit, dispatch)
  };
};

const SpeedLimitEnhance = connect(mapStateToProps, mapDispatchToProps)(SpeedLimit);

export { SpeedLimitEnhance as SpeedLimit };
