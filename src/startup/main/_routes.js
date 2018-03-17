import { MiningPage, SettingsPage, SupportPage } from '../../ui/pages';
import React, { Fragment } from 'react';
import { Redirect, Route } from 'react-router';

export const routes = (
  <Fragment>
    <Redirect path="/" exact to="/mining" />
    <Route path="/mining" exact component={MiningPage} />
    <Route path="/settings" exact component={SettingsPage} />
    <Route path="/support" exact component={SupportPage} />
  </Fragment>
);
