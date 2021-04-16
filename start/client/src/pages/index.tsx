import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Registration from './registation'
import Login from './login';
import { PageContainer } from '../components';

export default function Pages({client} : any) {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Launches path="/"/>
          <Launch path="launch/:launchId" />
          <Cart path="cart" />
          <Registration path="registration" />
          <Login path="login" />
        </Router>
      </PageContainer>
    </Fragment>
  );
}
