import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { TextField } from '../generic';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { getMiner } from '../../../api/mining';
import { setMiningAddress } from '../../../store/actions';
import { withStyles } from 'material-ui/styles';

const styles = {
  chart: {
    height: 'calc(100% - 140px)'
  }
};

class Address extends Component {
  handleChange = event => {
    const { setMiningAddress, minerIdentifier } = this.props;

    setMiningAddress(minerIdentifier, event.target.value);
  };

  render() {
    const { address, miner, isMining } = this.props;

    return (
      <TextField
        disabled={isMining}
        fullWidth
        helperText={`Minimum payment threshold ${miner.minimumPaymentThreshold} ${miner.currency}`}
        label="Payment Address"
        margin="normal"
        onChange={this.handleChange}
        value={address}
      />
    );
  }
}

Address.propTypes = {
  classes: PropTypes.object.isRequired,
  miner: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  minerIdentifier: PropTypes.string.isRequired,
  isMining: PropTypes.bool.isRequired,
  setMiningAddress: PropTypes.func.isRequired
};

const mapStateToProps = ({ mining: { miners, selectedMinerIdentifier } }) => {
  return {
    minerIdentifier: selectedMinerIdentifier,
    address: miners[selectedMinerIdentifier].address,
    miner: getMiner(selectedMinerIdentifier),
    isMining: miners[selectedMinerIdentifier].isMining
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMiningAddress: bindActionCreators(setMiningAddress, dispatch)
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Address);
export { enhance as Address };
