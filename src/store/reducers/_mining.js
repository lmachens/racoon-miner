import { ETHEREUM_MINER, MONERO_MINER } from '../../api/mining';
import {
  RECEIVE_MINING_METRICS,
  RECEIVE_WORKER_STATS,
  REQUEST_MINING_METRICS,
  SELECT_MINER,
  SET_MINING_ADDRESS,
  SET_MINING_ERROR_MESSAGE,
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
  metrics: {
    fetching: false,
    from: Number.MAX_VALUE,
    to: 0,
    data: []
  },
  errorMsg: null,
  workerStats: {
    invalidShares: 0,
    staleShares: 0,
    validShares: 0,
    reportedHashrate: 0,
    averageHashrate: 0,
    currentHashrate: 0,
    lastSeen: 0,
    time: 0
  }
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
      set(newState, `miners.${data.minerIdentifier}.errorMsg`, null);
      break;
    case SET_MINING_ERROR_MESSAGE:
      set(newState, `miners.${data.minerIdentifier}.errorMsg`, data.errorMsg);
      break;
    case SET_PROCESS_ID:
      set(newState, `miners.${data.minerIdentifier}.processId`, data.processId);
      break;
    case START_MINING:
      set(newState, `miners.${data.minerIdentifier}.isMining`, true);
      break;
    case STOP_MINING:
      set(newState, `miners.${data.minerIdentifier}.isMining`, false);
      set(newState, `miners.${data.minerIdentifier}.currentSpeed`, 0);
      break;
    case REQUEST_MINING_METRICS:
      set(newState, `miners.${data.minerIdentifier}.metrics.fetching`, true);
      set(newState, `miners.${data.minerIdentifier}.metrics.from`, data.from);
      set(newState, `miners.${data.minerIdentifier}.metrics.to`, data.to);
      break;
    case RECEIVE_MINING_METRICS:
      set(newState, `miners.${data.minerIdentifier}.metrics.fetching`, false);
      set(newState, `miners.${data.minerIdentifier}.metrics.data`, data.metrics.data);
      break;
    case RECEIVE_WORKER_STATS:
      set(newState, `miners.${data.minerIdentifier}.workerStats`, data.workerStats);
      break;
    default:
      return state;
  }
  return newState;
};
