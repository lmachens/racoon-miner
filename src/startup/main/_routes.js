import { MiningPage, SupportPage } from '../../ui/pages';
import React, { Fragment } from 'react';
import { Redirect, Route } from 'react-router';

export const routes = (
  <Fragment>
    <Route path="/mining" exact component={MiningPage} />
    <Route path="/support" exact component={SupportPage} />
    <Redirect path="/" to="/mining" />
  </Fragment>
);
