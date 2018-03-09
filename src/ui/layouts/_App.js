import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

export class AppLayout extends Component {
  render() {
    const { children } = this.props;

    return <Fragment>{children}</Fragment>;
  }
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
