import MUI_Popover from 'material-ui/Popover';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  popoverPaper: {
    padding: theme.spacing.unit * 2
  }
});

const Popover = ({ classes, children, ...other }) => (
  <MUI_Popover
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    classes={{
      paper: classes.popoverPaper
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...other}
  >
    {children}
  </MUI_Popover>
);

Popover.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  popover: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
const enhancedPopover = withStyles(styles)(Popover);

export { enhancedPopover as Popover };
