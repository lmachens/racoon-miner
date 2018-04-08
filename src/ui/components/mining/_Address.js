import {
  Button,
  ExternalLink,
  InfoButton,
  InputAdornment,
  TextField,
  Typography
} from '../generic';
import React, { Component, Fragment } from 'react';

import Done from 'material-ui-icons/Done';
import Error from 'material-ui-icons/Error';
import PropTypes from 'prop-types';
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

    const address = event.target.value.replace(/0x/, '');
    setMiningAddress(minerIdentifier, address);
  };

  render() {
    const { address, miner, isMining, isValidAddress } = this.props;

    return (
      <Fragment>
        <TextField
          disabled={isMining}
          helperText="Your address is used for payouts and to track your mining progress"
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">0x</InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                <InfoButton
                  icon
                  popover={
                    <Typography>
                      {isValidAddress
                        ? 'Valid address'
                        : 'Invalid address! It should start with 0x and have 42 characters.'}
                    </Typography>
                  }
                >
                  {isValidAddress ? <Done /> : <Error color="error" />}
                </InfoButton>
              </InputAdornment>
            ),
            style: { width: 440 }
          }}
          label={`${miner.name} address`}
          margin="normal"
          onChange={this.handleChange}
          placeholder="0000000000000000000000000000000000000000"
          value={address}
        />
        <br />
        <ExternalLink to={miner.links.wallet}>
          <Button color="primary" size="small">
            Create Address
          </Button>
        </ExternalLink>
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
  isValidAddress: PropTypes.bool.isRequired,
  setMiningAddress: PropTypes.func.isRequired
};

const mapStateToProps = ({ mining: { miners, selectedMinerIdentifier }, activeMiners }) => {
  const miner = getMiner(selectedMinerIdentifier);
  const address = miners[selectedMinerIdentifier].address;
  return {
    minerIdentifier: selectedMinerIdentifier,
    address,
    isValidAddress: miner.isValidAddress(address),
    miner,
    isMining: activeMiners[selectedMinerIdentifier].isMining
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMiningAddress: bindActionCreators(setMiningAddress, dispatch)
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Address);
export { enhance as Address };
