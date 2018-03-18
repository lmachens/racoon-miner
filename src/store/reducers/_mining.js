import {
  REMOVE_MINING_ADDRESS,
  SELECT_MINER,
  SET_MINING_ADDRESS,
  SET_MINING_SPEED,
  START_MINING,
  STOP_MINING
} from '../types';

import { ETHEREUM_MINER } from '../../api/mining';
import omit from 'lodash/omit';

export const mining = (
  state = {
    identifier: ETHEREUM_MINER,
    currentAddress: '',
    addresses: {},
    isMining: false,
    currentSpeed: null,
    history: []
  },
  { type, data }
) => {
  switch (type) {
    case SET_MINING_ADDRESS:
      return {
        ...state,
        currentAddress: data,
        addresses: { ...state.addresses, [state.identifier]: data }
      };
    case REMOVE_MINING_ADDRESS:
      return { ...state, currentAddress: '', addresses: omit(state.addresses, data.identifier) };
    case SELECT_MINER:
      return {
        ...state,
        identifier: data,
        currentAddress: state.addresses[state.identifier] || ''
      };
    case SET_MINING_SPEED:
      return { ...state, currentSpeed: data.speed, history: [data, ...state.history] };
    case START_MINING:
      return { ...state, isMining: true };
    case STOP_MINING:
      return { ...state, isMining: false };
    default:
      return state;
  }
};
