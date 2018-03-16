import React, { Component } from 'react';

import { Mining } from '../components/mining';
import { Typography } from '../components/generic';

export class MiningPage extends Component {
  render() {
    return (
      <div>
        <Typography variant="headline">Mining</Typography>
        <Mining />
      </div>
    );
  }
}
