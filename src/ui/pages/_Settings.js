import React, { Component } from 'react';

import { PageLayout } from '../layouts';
import { System } from '../components/settings';

class SettingsPage extends Component {
  render() {
    return (
      <PageLayout title="Settings">
        <System />
      </PageLayout>
    );
  }
}

export { SettingsPage };
