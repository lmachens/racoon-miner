import { AppBar, Toolbar } from '../components/generic';
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
  children: {
    overflow: 'auto',
    height: 'calc(100% - 64px)'
  },
  flex: {
    marginLeft: 4,
    flex: 1
  },
  textLogo: {
    height: 18
  }
};

const AppLayout = ({ classes, children }) => (
  <Fragment>
    <AppBar color="inherit" position="sticky">
      <Toolbar>
        <img className={classes.textLogo} src="assets/text_logo.png" />
      </Toolbar>
    </AppBar>
    <div className={classes.children}>{children}</div>
  </Fragment>
);

AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

const enhance = withStyles(styles)(AppLayout);
export { enhance as AppLayout };
