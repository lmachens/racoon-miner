import { DialogContentText, FullScreenDialog } from '../generic';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class StatsDialog extends PureComponent {
  render() {
    const { open } = this.props;

    return (
      <FullScreenDialog open={open}>
        <DialogContentText>
          I want to fetch more data from the mining pools dashboard here and link it.
        </DialogContentText>
      </FullScreenDialog>
    );
  }
}

StatsDialog.propTypes = {
  open: PropTypes.bool.isRequired
};

const mapStateToProps = ({ dialogs: { settingsDialogOpen } }) => {
  return {
    open: settingsDialogOpen
  };
};

const enhance = connect(mapStateToProps)(StatsDialog);
export { enhance as StatsDialog };
