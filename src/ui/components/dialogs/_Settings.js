import { AppBar, Button, Dialog, IconButton, Toolbar, Typography } from '../generic';
import { Hardware, System } from '../settings';
import React, { PureComponent } from 'react';

import { CloseIcon } from '../icons';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { closeDialog } from '../../../store/actions';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  }
};

class SettingsDialog extends PureComponent {
  render() {
    const { classes, closeDialog, open } = this.props;

    return (
      <Dialog fullScreen onClose={closeDialog} open={open}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton aria-label="Close" color="inherit" onClick={closeDialog}>
              <CloseIcon />
            </IconButton>
            <Typography className={classes.flex} color="inherit" variant="title">
              Settings
            </Typography>
            <Button color="inherit" onClick={closeDialog}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <System />
        <Hardware />
      </Dialog>
    );
  }
}

SettingsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  closeDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

const mapStateToProps = ({ dialogs: { settingsDialogOpen } }) => {
  return {
    open: settingsDialogOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: bindActionCreators(closeDialog, dispatch)
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(
  SettingsDialog
);
export { enhance as SettingsDialog };
