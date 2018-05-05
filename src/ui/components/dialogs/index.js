import React, { Fragment, PureComponent } from 'react';

import { CryptoDialog } from './_Crypto';
import { SettingsDialog } from './_Settings';

class Dialogs extends PureComponent {
  render() {
    return (
      <Fragment>
        <CryptoDialog />
        <SettingsDialog />
      </Fragment>
    );
  }
}

export { Dialogs };
