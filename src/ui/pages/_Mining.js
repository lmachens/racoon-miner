import { Config, Metrics, Miner, Mining, Stats } from '../components/mining';

import { PageLayout } from '../layouts';
import React from 'react';

const MiningPage = () => (
  <PageLayout>
    <Miner />
    <Config />
    <Stats />
    <Mining />
    <Metrics />
  </PageLayout>
);

export { MiningPage };
