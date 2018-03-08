import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

export class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <div>Welcome</div>
        {children}
      </Fragment>
    );
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
