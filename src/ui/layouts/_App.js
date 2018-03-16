import { AppBar, Toolbar, Typography } from '../components/generic';
import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

export class AppLayout extends Component {
  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Title
            </Typography>
          </Toolbar>
        </AppBar>
        {children}
      </Fragment>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
