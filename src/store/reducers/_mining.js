import { ETHEREUM_MINER, MONERO_MINER } from '../../api/mining';
import {
  RECEIVE_MINING_METRICS,
  REQUEST_MINING_METRICS,
  SELECT_MINER,
  SET_MINING_ADDRESS,
  SET_MINING_SPEED,
  SET_PROCESS_ID,
  START_MINING,
  STOP_MINING
} from '../types';

import set from 'lodash/set';

const defaultMinerProps = {
  processId: null,
  isMining: false,
  currentSpeed: 0,
  address: '',
  shards: 0,
  coins: 0,
  isFetchingMetrics: false,
  metrics: []
};

export const mining = (
  state = {
    selectedMinerIdentifier: ETHEREUM_MINER,
    miners: {
      [ETHEREUM_MINER]: { ...defaultMinerProps },
      [MONERO_MINER]: { ...defaultMinerProps }
    }
  },
  { type, data }
) => {
  const newState = { ...state };
  switch (type) {
    case SET_MINING_ADDRESS:
      set(newState, `miners.${data.minerIdentifier}.address`, data.address);
      break;
    case SELECT_MINER:
      set(newState, `selectedMinerIdentifier`, data);
      break;
    case SET_MINING_SPEED:
      set(newState, `miners.${data.minerIdentifier}.currentSpeed`, data.speed);
      break;
    case SET_PROCESS_ID:
      set(newState, `miners.${data.minerIdentifier}.processId`, data.processId);
      break;
    case START_MINING:
      set(newState, `miners.${data.minerIdentifier}.isMining`, true);
      break;
    case STOP_MINING:
      set(newState, `miners.${data.minerIdentifier}.isMining`, false);
      break;
    case REQUEST_MINING_METRICS:
      set(newState, `miners.${data.minerIdentifier}.isFetchingMetrics`, true);
      break;
    case RECEIVE_MINING_METRICS:
      set(newState, `miners.${data.minerIdentifier}.isFetchingMetrics`, false);
      set(newState, `miners.${data.minerIdentifier}.metrics`, data.metrics);
      break;
  }
  return newState;
};
