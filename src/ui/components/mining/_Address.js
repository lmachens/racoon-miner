import React, { Component } from 'react';
import { removeMiningAddress, setMiningAddress } from '../../../store/actions';

import PropTypes from 'prop-types';
import { TextField } from '../generic';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { getMiner } from '../../../api/mining';
import { withStyles } from 'material-ui/styles';

const styles = {
  chart: {
    height: 'calc(100% - 140px)'
  }
};

class Address extends Component {
  handleChange = event => {
    const { setMiningAddress } = this.props;

    setMiningAddress(event.target.value);
  };

  render() {
    const { currentAddress, currentMinerIdentifier, isMining } = this.props;
    const miner = getMiner(currentMinerIdentifier);

    return (
      <TextField
        label="Payment Address"
        helperText={`Minimum payment threshold ${miner.minimumPaymentThreshold} ${miner.currency}`}
        fullWidth
        margin="normal"
        value={currentAddress}
        disabled={isMining}
        onChange={this.handleChange}
      />
    );
  }
}

Address.propTypes = {
  classes: PropTypes.object.isRequired,
  currentMinerIdentifier: PropTypes.string.isRequired,
  currentAddress: PropTypes.string.isRequired,
  isMining: PropTypes.bool.isRequired,
  setMiningAddress: PropTypes.func.isRequired,
  removeMiningAddress: PropTypes.func.isRequired
};

const mapStateToProps = ({ mining: { isMining, currentMinerIdentifier, currentAddress } }) => {
  return {
    currentAddress,
    currentMinerIdentifier,
    isMining
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMiningAddress: bindActionCreators(setMiningAddress, dispatch),
    removeMiningAddress: bindActionCreators(removeMiningAddress, dispatch)
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Address);
export { enhance as Address };
