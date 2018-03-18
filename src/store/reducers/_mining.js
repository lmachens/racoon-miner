import { SELECT_MINER, SET_MINING_SPEED, START_MINING, STOP_MINING } from '../types';

import { ETHEREUM_MINER } from '../../api/mining';

export const mining = (
  state = {
    identifier: ETHEREUM_MINER,
    isMining: false,
    currentSpeed: null,
    history: []
  },
  { type, data }
) => {
  switch (type) {
    case SELECT_MINER:
      return { ...state, identifier: data };
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
