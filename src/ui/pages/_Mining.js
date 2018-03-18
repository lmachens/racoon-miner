import { Address, Mining } from '../components/mining';

import { PageLayout } from '../layouts';
import React from 'react';

const MiningPage = () => (
  <PageLayout title="Mining">
    <Address />
    <Mining />
  </PageLayout>
);

export { MiningPage };
