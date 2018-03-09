import { MinerPage, WelcomePage } from '../../ui/pages';
import React, { Fragment } from 'react';

import { Route } from 'react-router';

export const routes = (
  <Fragment>
    <Route path="/" exact component={WelcomePage} />
    <Route path="/miner" exact component={MinerPage} />
  </Fragment>
);
