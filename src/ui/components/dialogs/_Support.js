import { AppBar, Button, Dialog, Toolbar, Typography } from '../generic';
import React, { PureComponent } from 'react';

import { Discord } from '../support';
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

class SupportDialog extends PureComponent {
  render() {
    const { classes, closeDialog, open } = this.props;

    return (
      <Dialog fullScreen onClose={closeDialog} open={open}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography className={classes.flex} color="inherit" variant="title">
              Support
            </Typography>
            <Button color="inherit" onClick={closeDialog}>
              Done
            </Button>
          </Toolbar>
        </AppBar>
        <Discord />
      </Dialog>
    );
  }
}

SupportDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  closeDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

const mapStateToProps = ({ dialogs: { supportDialogOpen } }) => {
  return {
    open: supportDialogOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: bindActionCreators(closeDialog, dispatch)
  };
};

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(
  SupportDialog
);
export { enhance as SupportDialog };
