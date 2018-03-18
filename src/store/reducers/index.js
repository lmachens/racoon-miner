import { combineReducers } from 'redux';
import { hardwareInfo } from './_hardwareInfo';
import { mining } from './_mining';

const reducers = combineReducers({
  hardwareInfo,
  mining
});

export default reducers;
