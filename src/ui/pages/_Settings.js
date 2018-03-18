import { Hardware, System } from '../components/settings';

import { PageLayout } from '../layouts';
import React from 'react';

const SettingsPage = () => (
  <PageLayout title="Settings">
    <System />
    <Hardware />
  </PageLayout>
);

export { SettingsPage };
