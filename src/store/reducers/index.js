import { activeMiners, mining, selectedMinerIdentifier } from './_mining';

import { combineReducers } from 'redux';
import { dialogs } from './_dialogs';
import { games } from './_games';
import { hardwareInfo } from './_hardwareInfo';
import { logs } from './_logs';
import { notifications } from './_notifications';
import { price } from './_price';
import { profitability } from './_profitability';
import { settings } from './_settings';
import { utilities } from './_utilities';

const reducers = combineReducers({
  dialogs,
  games,
  hardwareInfo,
  logs,
  mining,
  activeMiners,
  selectedMinerIdentifier,
  notifications,
  price,
  profitability,
  settings,
  utilities
});

export default reducers;
