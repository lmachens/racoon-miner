import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import logger from 'redux-logger';
import reducers from './reducers';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage
};
const persistedReducer = persistReducer(persistConfig, reducers);
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

export const store = createStoreWithMiddleware(persistedReducer);
export const persistor = persistStore(store);
