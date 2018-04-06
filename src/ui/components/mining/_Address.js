import { Button, TextField } from '../generic';
import React, { Component, Fragment } from 'react';
import { fetchWorkerStats, setMiningAddress } from '../../../store/actions';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { getMiner } from '../../../api/mining';
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
    this.updateWorkerStats();
  };

  updateWorkerStats = debounce(() => {
    const { fetchWorkerStats, minerIdentifier } = this.props;

    fetchWorkerStats(minerIdentifier);
  }, 1000);

  render() {
    const { address, miner, isMining } = this.props;

    return (
      <Fragment>
        <TextField
          disabled={isMining}
          helperText="Your address is used in payouts and to identify your mining progress"
          label={`${miner.name} address`}
          margin="normal"
          onChange={this.handleChange}
          placeholder="0x0000000000000000000000000000000000000000"
          value={address}
        />
        <br />
        <Button color="primary" size="small">
          Create Wallet
        </Button>
      </Fragment>
    );
  }
}

Address.propTypes = {
  classes: PropTypes.object.isRequired,
  miner: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  minerIdentifier: PropTypes.string.isRequired,
  isMining: PropTypes.bool.isRequired,
  fetchWorkerStats: PropTypes.func.isRequired,
  setMiningAddress: PropTypes.func.isRequired
};

const mapStateToProps = ({ mining: { miners, selectedMinerIdentifier }, activeMiners }) => {
  return {
    minerIdentifier: selectedMinerIdentifier,
    address: miners[selectedMinerIdentifier].address,
    miner: getMiner(selectedMinerIdentifier),
    isMining: activeMiners[selectedMinerIdentifier].isMining
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWorkerStats: bindActionCreators(fetchWorkerStats, dispatch),
    setMiningAddress: bindActionCreators(setMiningAddress, dispatch)
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Address);
export { enhance as Address };
