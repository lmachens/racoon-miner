import { Route, Router } from 'react-router';
import { persistor, store } from '../store';

import { AppLayout } from '../ui/layouts';
import { MuiThemeProvider } from 'material-ui/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Reboot from 'material-ui/Reboot';
import { Welcome } from '../ui/pages';
import createHistory from 'history/createBrowserHistory';
import { light } from '../ui/themes';

const history = createHistory();

const App = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <MuiThemeProvider theme={light}>
          <Reboot />
          <AppLayout>
            <Route path="/" component={Welcome} />
          </AppLayout>
        </MuiThemeProvider>
      </Router>
    </PersistGate>
  </Provider>
);

ReactDOM.render(App, document.getElementById('root'));
