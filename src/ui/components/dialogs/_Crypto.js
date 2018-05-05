import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ExternalLink,
  FormControl,
  InfoButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '../generic';
import { DoneIcon, ErrorIcon } from '../icons';
import React, { PureComponent } from 'react';
import { closeDialog, selectMiner, setMiningAddress } from '../../../store/actions';
import { ethereum, getMiner, monero } from '../../../api/mining';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column'
  }
};

class CryptoDialog extends PureComponent {
  handleAddressChange = event => {
    const { setMiningAddress, minerIdentifier } = this.props;

    const address = event.target.value;
    setMiningAddress(minerIdentifier, address);
  };

  handleCurrencyChange = event => {
    const { selectMiner } = this.props;
    const minerIdentifier = event.target.value;
    selectMiner(minerIdentifier);
  };

  render() {
    const {
      classes,
      closeDialog,
      open,
      address,
      miner,
      isMining,
      isValidAddress,
      selectedMinerIdentifier
    } = this.props;

    return (
      <Dialog aria-labelledby="crypto-dialog-title" onClose={closeDialog} open={open}>
        <DialogTitle id="crypto-dialog-title">Setup</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText>
            Before you can start mining, you have to tell the raccoon what to mine and who gets the
            profit. You can leave the default settings if you want to try out this app.
          </DialogContentText>
          <FormControl>
            <InputLabel htmlFor="crypto-select">Currency</InputLabel>
            <Select
              inputProps={{
                id: 'crypto-select'
              }}
              onChange={this.handleCurrencyChange}
              value={selectedMinerIdentifier}
            >
              {[ethereum, monero].map(miner => (
                <MenuItem key={miner.name} value={miner.identifier}>
                  {miner.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            disabled={isMining}
            fullWidth
            helperText={
              <ExternalLink to={miner.links.wallet}>
                <Typography color="primary">Don&apos;t have a wallet address?</Typography>
              </ExternalLink>
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <InfoButton
                    icon
                    popover={
                      <Typography>
                        {isValidAddress ? 'Valid address' : `Invalid address! ${miner.addressHint}`}
                      </Typography>
                    }
                  >
                    {isValidAddress ? <DoneIcon /> : <ErrorIcon color="error" />}
                  </InfoButton>
                </InputAdornment>
              )
            }}
            label={`${miner.name} address`}
            margin="normal"
            onChange={this.handleAddressChange}
            placeholder={miner.developerAddress}
            value={address}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CryptoDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  closeDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  miner: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  minerIdentifier: PropTypes.string.isRequired,
  isMining: PropTypes.bool.isRequired,
  isValidAddress: PropTypes.bool.isRequired,
  setMiningAddress: PropTypes.func.isRequired,
  selectedMinerIdentifier: PropTypes.string.isRequired,
  selectMiner: PropTypes.func.isRequired
};

const mapStateToProps = ({
  dialogs: { cryptoDialogOpen },
  mining: { miners, selectedMinerIdentifier },
  activeMiners
}) => {
  const miner = getMiner(selectedMinerIdentifier);
  const address = miners[selectedMinerIdentifier].address;
  return {
    open: cryptoDialogOpen,
    minerIdentifier: selectedMinerIdentifier,
    address,
    isValidAddress: miner.isValidAddress(address),
    miner,
    isMining: activeMiners[selectedMinerIdentifier].isMining,
    selectedMinerIdentifier
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: bindActionCreators(closeDialog, dispatch),
    setMiningAddress: bindActionCreators(setMiningAddress, dispatch),
    selectMiner: bindActionCreators(selectMiner, dispatch)
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(
  CryptoDialog
);
export { enhance as CryptoDialog };
