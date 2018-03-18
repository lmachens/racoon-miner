import {
  REMOVE_MINING_ADDRESS,
  SELECT_MINER,
  SET_MINING_ADDRESS,
  SET_MINING_SPEED,
  START_MINING,
  STOP_MINING
} from '../types';

import { getMiner } from '../../api/mining';
import { getProcessManagerPlugin } from '../../api/plugins';

export const setMiningAddress = address => {
  return dispatch => {
    dispatch({
      type: SET_MINING_ADDRESS,
      data: address
    });
  };
};

export const removeMiningAddress = minerIdentifier => {
  return dispatch => {
    dispatch({
      type: REMOVE_MINING_ADDRESS,
      data: minerIdentifier
    });
  };
};

export const selectMiner = minerIdentifier => {
  return dispatch => {
    dispatch({
      type: SELECT_MINER,
      data: minerIdentifier
    });
  };
};

let processId;
const handleLaunch = ({ data }) => {
  processId = data;
};

let handleData;
export const startMining = () => {
  return async (dispatch, getState) => {
    const processManager = await getProcessManagerPlugin();
    const state = getState();
    const { parser, path, args, environmentVariables } = getMiner(
      state.mining.currentMinerIdentifier
    );

    dispatch({
      type: START_MINING
    });

    handleData = ({ error, data }) => {
      const parsed = parser(error || data);
      if (parsed) {
        dispatch({
          type: SET_MINING_SPEED,
          data: parsed
        });
      }
    };
    processManager.onDataReceivedEvent.addListener(handleData);
    processManager.launchProcess(path, args, environmentVariables, true, handleLaunch);
  };
};

export const stopMining = () => {
  return async dispatch => {
    const processManager = await getProcessManagerPlugin();

    dispatch({
      type: STOP_MINING
    });

    if (processId) {
      processManager.onDataReceivedEvent.removeListener(handleData);
      processManager.terminateProcess(processId);
    }
  };
};
