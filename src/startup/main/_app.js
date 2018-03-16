import { persistor, store } from '../../store';

import { AppLayout } from '../../ui/layouts';
import { MuiThemeProvider } from 'material-ui/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Reboot from 'material-ui/Reboot';
import { Router } from 'react-router';
import createHistory from 'history/createMemoryHistory';
import { light } from '../../ui/themes';
import { links } from './_links';
import { routes } from './_routes';

const history = createHistory();

const App = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <MuiThemeProvider theme={light}>
          <Reboot />
          <AppLayout links={links}>{routes}</AppLayout>
        </MuiThemeProvider>
      </Router>
    </PersistGate>
  </Provider>
);

ReactDOM.render(App, document.getElementById('root'));
