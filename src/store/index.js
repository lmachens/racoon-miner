import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import addFind from 'localforage-find';
import localForage from 'localforage';
import logger from 'redux-logger';
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
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

export const store = createStoreWithMiddleware(persistedReducer);
export const persistor = persistStore(store);
