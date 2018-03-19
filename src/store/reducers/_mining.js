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
    currentMinerIdentifier: ETHEREUM_MINER,
    isMining: false,
    currentSpeed: 0,
    addressesByIdentifier: {},
    logsByIdentifier: {}
  },
  { type, data }
) => {
  switch (type) {
    case SET_MINING_ADDRESS:
      return {
        ...state,
        addressesByIdentifier: {
          ...state.addressesByIdentifier,
          [state.currentMinerIdentifier]: data
        }
      };
    case REMOVE_MINING_ADDRESS:
      return {
        ...state,
        addressesByIdentifier: omit(state.addressesByIdentifier, data.currentMinerIdentifier)
      };
    case SELECT_MINER:
      return {
        ...state,
        currentMinerIdentifier: data
      };
    case SET_MINING_SPEED:
      return {
        ...state,
        currentSpeed: data.speed,
        logsByIdentifier: {
          ...state.logsByIdentifier,
          [state.currentMinerIdentifier]: [
            data,
            ...(state.logsByIdentifier[state.currentMinerIdentifier] || [])
          ]
        }
      };
    case START_MINING:
      return { ...state, isMining: true };
    case STOP_MINING:
      return { ...state, isMining: false };
    default:
      return state;
  }
};
