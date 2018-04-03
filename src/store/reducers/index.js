import { activeMiners, mining } from './_mining';

import { combineReducers } from 'redux';
import { hardwareInfo } from './_hardwareInfo';

const reducers = combineReducers({
  hardwareInfo,
  mining,
  activeMiners
});

export default reducers;
