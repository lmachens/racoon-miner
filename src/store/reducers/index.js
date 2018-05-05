import { activeMiners, mining } from './_mining';

import { combineReducers } from 'redux';
import { dialogs } from './_dialogs';
import { hardwareInfo } from './_hardwareInfo';

const reducers = combineReducers({
  dialogs,
  hardwareInfo,
  mining,
  activeMiners
});

export default reducers;
