import { Metrics, Mining, Stats } from '../components/mining';

import { Actions } from '../components/actions';
import { Dialogs } from '../components/dialogs';
import { PageLayout } from '../layouts';
import React from 'react';

const MiningPage = () => (
  <PageLayout>
    <Actions />
    <Stats />
    <Mining />
    <Metrics />
    <Dialogs />
  </PageLayout>
);

export { MiningPage };
