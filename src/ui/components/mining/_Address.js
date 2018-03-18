import { FormControl, FormHelperText, Input, InputLabel } from '../generic';
import React, { Component } from 'react';
import { removeMiningAddress, setMiningAddress } from '../../../store/actions';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
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
    const { currentAddress, isMining } = this.props;

    return (
      <form>
        <FormControl>
          <InputLabel htmlFor="name-input">Address</InputLabel>
          <Input
            id="name-input"
            disabled={isMining}
            value={currentAddress}
            onChange={this.handleChange}
          />
          <FormHelperText>Your wallet address</FormHelperText>
        </FormControl>
      </form>
    );
  }
}

Address.propTypes = {
  classes: PropTypes.object.isRequired,
  currentAddress: PropTypes.string.isRequired,
  isMining: PropTypes.bool.isRequired,
  setMiningAddress: PropTypes.func.isRequired,
  removeMiningAddress: PropTypes.func.isRequired
};

const mapStateToProps = ({ mining: { isMining, currentAddress } }) => {
  return {
    currentAddress,
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
