import React, { Component, Fragment } from 'react';

import { Mining } from '../components/mining';
import { Typography } from '../components/generic';

class MiningPage extends Component {
  render() {
    return (
      <Fragment>
        <Typography variant="headline">Mining</Typography>
        <Mining />
      </Fragment>
    );
  }
}

export { MiningPage };
