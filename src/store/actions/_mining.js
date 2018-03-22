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

import { getMiner } from '../../api/mining';
import { getProcessManagerPlugin } from '../../api/plugins';

export const setMiningAddress = (minerIdentifier, address) => {
  return dispatch => {
    dispatch({
      type: SET_MINING_ADDRESS,
      data: { address, minerIdentifier }
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

const handleDataByIdenfier = {};
export const startMining = minerIdentifier => {
  return async dispatch => {
    if (handleDataByIdenfier[minerIdentifier]) return;
    const processManager = await getProcessManagerPlugin();
    const { parser, path, args, environmentVariables, storage } = getMiner(minerIdentifier);

    dispatch({
      type: START_MINING,
      data: { minerIdentifier }
    });

    handleDataByIdenfier[minerIdentifier] = ({ error, data }) => {
      const parsed = parser(error || data);
      if (parsed) {
        const { timestamp, speed } = parsed;
        dispatch({
          type: SET_MINING_SPEED,
          data: {
            minerIdentifier,
            speed
          }
        });
        if (speed) {
          storage.setItem(timestamp, speed);
        }
      }
    };
    processManager.onDataReceivedEvent.addListener(handleDataByIdenfier[minerIdentifier]);
    processManager.launchProcess(path, args, environmentVariables, true, ({ data }) => {
      dispatch({
        type: SET_PROCESS_ID,
        data: {
          minerIdentifier,
          processId: data
        }
      });
    });
  };
};

export const stopMining = minerIdentifier => {
  return async (dispatch, getState) => {
    const processManager = await getProcessManagerPlugin();
    const state = getState();

    dispatch({
      type: STOP_MINING,
      data: { minerIdentifier }
    });
    const processId = state.mining.miners[minerIdentifier].processId;
    if (processId || handleDataByIdenfier[minerIdentifier]) {
      processManager.onDataReceivedEvent.removeListener(handleDataByIdenfier[minerIdentifier]);
      processManager.terminateProcess(processId);
      delete handleDataByIdenfier[minerIdentifier];
    }
  };
};

export const fetchMetrics = (minerIdentifier, { from = 0, to = Number.MAX_VALUE, steps = 1 }) => {
  return async dispatch => {
    const { storage } = getMiner(minerIdentifier);

    dispatch({
      type: REQUEST_MINING_METRICS,
      data: { minerIdentifier, from, to, steps }
    });

    storage.keys().then(timestamps => {
      const timestampsInRange = timestamps.filter(timestamp => timestamp > 0 && timestamp < to);
      storage.getItems(timestampsInRange).then(results => {
        const itemsInRange = Object.entries(results);

        dispatch({
          type: RECEIVE_MINING_METRICS,
          data: { minerIdentifier, from, to, steps, metrics: itemsInRange }
        });
      });
    });
  };
};
