import React, { PureComponent } from 'react';

import { Discord } from '../support';
import { FullScreenDialog } from '../generic';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SupportDialog extends PureComponent {
  render() {
    const { open } = this.props;

    return (
      <FullScreenDialog open={open}>
        <Discord />
      </FullScreenDialog>
    );
  }
}

SupportDialog.propTypes = {
  open: PropTypes.bool.isRequired
};

const mapStateToProps = ({ dialogs: { supportDialogOpen } }) => {
  return {
    open: supportDialogOpen
  };
};

const enhance = connect(mapStateToProps)(SupportDialog);
export { enhance as SupportDialog };
