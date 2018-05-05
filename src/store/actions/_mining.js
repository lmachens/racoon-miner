import {
  CONNECTING_POOL,
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

import { getMiner } from '../../api/mining';
import { getProcessManagerPlugin } from '../../api/plugins';
import isNil from 'lodash/isNil';
import sortBy from 'lodash/sortBy';

export const setMiningAddress = (minerIdentifier, address) => {
  return dispatch => {
    dispatch({
      type: SET_MINING_ADDRESS,
      data: { address, minerIdentifier }
    });

    const miner = getMiner(minerIdentifier);
    const validAddress = miner.isValidAddress(address);

    if (validAddress) fetchWorkerStats(minerIdentifier);
    else {
      dispatch({
        type: RECEIVE_WORKER_STATS,
        data: {
          minerIdentifier,
          workerStats: {}
        }
      });
    }
  };
};

export const selectMiner = minerIdentifier => {
  return dispatch => {
    dispatch({
      type: SELECT_MINER,
      data: minerIdentifier
    });
    dispatch(fetchWorkerStats(minerIdentifier));
  };
};

export const fetchWorkerStats = minerIdentifier => {
  return (dispatch, getState) => {
    const {
      mining: { miners }
    } = getState();
    const { address } = miners[minerIdentifier];
    if (!address) return;

    /*stats
      .fetchWorkerStats({ minerId: minerGroup, workerId })
      .catch(error => {
        dispatch({
          type: SET_MINING_ERROR_MESSAGE,
          data: {
            minerIdentifier,
            errorMsg: error.message
          }
        });
      })
      .then(response => {
        if (response) {
          dispatch({
            type: RECEIVE_WORKER_STATS,
            data: {
              minerIdentifier,
              workerStats: response
            }
          });
        }
      });*/
  };
};

const handleDataByIdenfier = {};
let sendTextInterval = null;
export const startMining = minerIdentifier => {
  return async (dispatch, getState) => {
    const {
      mining: { miners, selectedMinerIdentifier }
    } = getState();
    const address = miners[selectedMinerIdentifier].address || 'default';
    if (handleDataByIdenfier[minerIdentifier]) return;
    const processManager = await getProcessManagerPlugin();
    const { parser, path, args, environmentVariables, storage } = getMiner(minerIdentifier);

    dispatch({
      type: START_MINING,
      data: { minerIdentifier }
    });

    handleDataByIdenfier[minerIdentifier] = async ({ error, data }) => {
      const { connecting, timestamp, errorMsg, speed } = parser(error || data);

      if (connecting) {
        dispatch({
          type: CONNECTING_POOL,
          data: {
            minerIdentifier
          }
        });
      } else if (!isNil(speed)) {
        dispatch({
          type: SET_MINING_SPEED,
          data: {
            minerIdentifier,
            speed
          }
        });
        const nearestMinute = Math.round(timestamp / 10000) * 10000;
        const existingMinute = await storage.getItem(nearestMinute);
        if (existingMinute) {
          storage.setItem(nearestMinute, {
            timestamp: nearestMinute,
            speed:
              (existingMinute.speed * existingMinute.measurements + speed) /
              (existingMinute.measurements + 1),
            measurements: 1
          });
        } else {
          const { from, to } = miners[minerIdentifier].metrics;
          dispatch(fetchMetrics(minerIdentifier, from, to));

          storage.setItem(nearestMinute, { timestamp: nearestMinute, speed, measurements: 1 });
        }
      } else if (!isNil(errorMsg)) {
        dispatch({
          type: SET_MINING_ERROR_MESSAGE,
          data: {
            minerIdentifier,
            errorMsg
          }
        });
        storage.setItem(timestamp, { timestamp, errorMsg, speed: 0 });
      }
    };
    processManager.onDataReceivedEvent.addListener(handleDataByIdenfier[minerIdentifier]);

    processManager.launchProcess(path, args(address), environmentVariables(), true, ({ data }) => {
      console.info(`%cStart mining ${data} with ${args(address)}`, 'color: blue');
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
    const { activeMiners } = getState();

    dispatch({
      type: STOP_MINING,
      data: { minerIdentifier }
    });
    const processId = activeMiners[minerIdentifier].processId;
    console.info(`%cStop mining ${processId}`, 'color: blue');
    if (processId || handleDataByIdenfier[minerIdentifier]) {
      if (sendTextInterval) {
        clearInterval(sendTextInterval);
        sendTextInterval = null;
      }
      processManager.onDataReceivedEvent.removeListener(handleDataByIdenfier[minerIdentifier]);
      processManager.terminateProcess(processId);
      delete handleDataByIdenfier[minerIdentifier];
    }
  };
};

export const fetchMetrics = (minerIdentifier, { from = 0, to = Number.MAX_VALUE }) => {
  return async (dispatch, getState) => {
    const { storage } = getMiner(minerIdentifier);

    dispatch({
      type: REQUEST_MINING_METRICS,
      data: { minerIdentifier, from, to }
    });

    storage.find(timestamp => timestamp > from && timestamp < to).then(newItemsInRange => {
      const {
        mining: { miners }
      } = getState();
      const { from: currentFrom, to: currentTo } = miners[minerIdentifier].metrics;

      if (from !== currentFrom || to !== currentTo) return;

      if (newItemsInRange.length) {
        const metrics = {
          data: sortBy(newItemsInRange, 'timestamp').map(({ timestamp, speed, errorMsg }) => [
            timestamp,
            speed,
            errorMsg
          ])
        };

        dispatch({
          type: RECEIVE_MINING_METRICS,
          data: { minerIdentifier, metrics }
        });
      } else {
        dispatch({
          type: RECEIVE_MINING_METRICS,
          data: {
            minerIdentifier,
            metrics: {
              data: []
            }
          }
        });
      }
    });
  };
};
