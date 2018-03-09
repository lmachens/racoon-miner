import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import { dragMove } from '../../api/windows';

export class AppLayout extends Component {
  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <div onMouseDown={dragMove}>Welcome</div>
        {children}
      </Fragment>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
