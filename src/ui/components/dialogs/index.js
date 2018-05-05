import React, { Fragment, PureComponent } from 'react';

import { CryptoDialog } from './_Crypto';
import { SettingsDialog } from './_Settings';
import { SupportDialog } from './_Support';

class Dialogs extends PureComponent {
  render() {
    return (
      <Fragment>
        <CryptoDialog />
        <SettingsDialog />
        <SupportDialog />
      </Fragment>
    );
  }
}

export { Dialogs };
