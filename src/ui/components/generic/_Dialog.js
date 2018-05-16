export { default as Dialog } from '@material-ui/core/Dialog';
export { default as DialogActions } from '@material-ui/core/DialogActions';
export { default as DialogContent } from '@material-ui/core/DialogContent';
export { default as DialogContentText } from '@material-ui/core/DialogContentText';
export { default as DialogTitle } from '@material-ui/core/DialogTitle';

import { AppBar, Button, Dialog, DialogContent, Toolbar, Typography } from '../generic';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { closeDialog } from '../../../store/actions';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 8
  }
};

class FullScreenDialog extends PureComponent {
  render() {
    const { classes, children, closeDialog, open } = this.props;

    return (
      <Dialog fullScreen onClose={closeDialog} open={open}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography className={classes.flex} color="inherit" variant="title">
              Settings
            </Typography>
            <Button color="inherit" onClick={closeDialog}>
              Done
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.content}>{children}</DialogContent>
      </Dialog>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  closeDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: bindActionCreators(closeDialog, dispatch)
  };
};

const enhanced = compose(withStyles(styles), connect(null, mapDispatchToProps))(FullScreenDialog);

export { enhanced as FullScreenDialog };
