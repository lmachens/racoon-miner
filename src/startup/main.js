import { Route, Router } from 'react-router';
import { persistor, store } from '../store';

import { AppLayout } from '../ui/layouts';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Welcome } from '../ui/pages';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const App = (
  <Provider store={store}>
    <Router history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <AppLayout>
          <Route path="/" component={Welcome} />
        </AppLayout>
      </PersistGate>
    </Router>
  </Provider>
);

ReactDOM.render(App, document.getElementById('root'));
