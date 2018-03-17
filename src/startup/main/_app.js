import { persistor, store } from '../../store';

import { AppLayout } from '../../ui/layouts';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider } from 'material-ui/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
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
          <CssBaseline />
          <AppLayout title="Raccoon Miner" links={links}>
            {routes}
          </AppLayout>
        </MuiThemeProvider>
      </Router>
    </PersistGate>
  </Provider>
);

ReactDOM.render(App, document.getElementById('root'));
