import React, { Fragment } from 'react';

import { Mining } from '../components/mining';
import { Typography } from '../components/generic';

const MiningPage = () => (
  <Fragment>
    <Typography variant="headline">Mining</Typography>
    <Mining />
  </Fragment>
);

export { MiningPage };
