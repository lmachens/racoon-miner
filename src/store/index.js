import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import addFind from 'localforage-find';
import localForage from 'localforage';
import reducers from './reducers';
import thunk from 'redux-thunk';

addFind(localForage);

const reduxStorage = localForage.createInstance({
  name: 'Raccoon Miner',
  storeName: 'redux'
});

const persistConfig = {
  key: 'root',
  storage: reduxStorage
};
const persistedReducer = persistReducer(persistConfig, reducers);

let createStoreWithMiddleware;
if (process.env.__REDUX_LOGGER__) {
  const logger = require('redux-logger');
  createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
}
export const store = createStoreWithMiddleware(persistedReducer);
export const persistor = persistStore(store);
