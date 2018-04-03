import { Address, Miner, Mining } from '../components/mining';

import { PageLayout } from '../layouts';
import React from 'react';

const MiningPage = () => (
  <PageLayout>
    <Miner />
    <Address />
    <Mining />
  </PageLayout>
);

export { MiningPage };
