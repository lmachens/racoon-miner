import React, { Component, Fragment } from 'react';

import Button from 'material-ui/Button';
import { Popover } from './_Popover';
import PropTypes from 'prop-types';

export { default as IconButton } from 'material-ui/IconButton';

export { Button };

class InfoButton extends Component {
  state = {
    open: false
  };

  handleClickButton = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  anchorEl = null;

  render() {
    const { children, popover } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <Button
          buttonRef={node => {
            this.anchorEl = node;
          }}
          color="primary"
          onClick={this.handleClickButton}
          size="small"
        >
          {children}
        </Button>
        <Popover anchorEl={this.anchorEl} onClose={this.handleClose} open={open}>
          {popover}
        </Popover>
      </Fragment>
    );
  }
}

InfoButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  popover: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export { InfoButton };
