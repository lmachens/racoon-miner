import { Hardware, System } from '../components/settings';
import React, { Component } from 'react';

import { PageLayout } from '../layouts';

class SettingsPage extends Component {
  render() {
    return (
      <PageLayout title="Settings">
        <System />
        <Hardware />
      </PageLayout>
    );
  }
}

export { SettingsPage };
