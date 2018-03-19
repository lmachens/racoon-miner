import { ETHEREUM_MINER, MONERO_MINER } from '../../api/mining';
import {
  SELECT_MINER,
  SET_MINING_ADDRESS,
  SET_MINING_SPEED,
  SET_PROCESS_ID,
  START_MINING,
  STOP_MINING
} from '../types';

import get from 'lodash/get';
import set from 'lodash/set';

const defaultMinerProps = {
  processId: null,
  isMining: false,
  currentSpeed: 0,
  address: '',
  logs: []
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
      set(newState, `miners.${data.minerIdentifier}.currentSpeed`, data.parsed.speed);
      set(newState, `miners.${data.minerIdentifier}.logs`, [
        data.parsed,
        ...get(newState, `miners.${data.minerIdentifier}.logs`)
      ]);
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
  }
  return newState;
};
