import React, { Component, Fragment } from 'react';

import MUI_Button from 'material-ui/Button';
import { Popover } from './_Popover';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

export const Button = MUI_Button;

const styles = theme => ({
  popoverPaper: {
    padding: theme.spacing.unit * 2
  }
});

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
    const { children, classes, popover } = this.props;
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
        <Popover
          anchorEl={this.anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          classes={{
            paper: classes.popoverPaper
          }}
          onClose={this.handleClose}
          open={open}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          {popover}
        </Popover>
      </Fragment>
    );
  }
}

InfoButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  popover: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

const InfoButtonWithStyles = withStyles(styles)(InfoButton);
export { InfoButtonWithStyles as InfoButton };
