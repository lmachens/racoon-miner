import { persistor, store } from '../../store';

import { AppLayout } from '../../ui/layouts';
import CssBaseline from 'material-ui/CssBaseline';
import { MiningPage } from '../../ui/pages';
import { MuiThemeProvider } from 'material-ui/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { initialize as initializeAnalytics } from '../../api/analytics';
import { light } from '../../ui/themes';
import { trackHardwareInfo } from '../../store/actions';

initializeAnalytics();
store.dispatch(trackHardwareInfo());

const App = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MuiThemeProvider theme={light}>
        <CssBaseline />
        <AppLayout>
          <MiningPage />
        </AppLayout>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>
);

ReactDOM.render(App, document.getElementById('root'));
