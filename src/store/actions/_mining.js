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

import { getMiner } from '../../api/mining';
import { getProcessManagerPlugin } from '../../api/plugins';
import isNil from 'lodash/isNil';

export const setMiningAddress = (minerIdentifier, address) => {
  return dispatch => {
    dispatch({
      type: SET_MINING_ADDRESS,
      data: { address, minerIdentifier }
    });
    dispatch(fetchWorkerStats(minerIdentifier));
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
    const { mining: { miners } } = getState();
    const workerId = miners[minerIdentifier].address;
    if (!workerId) return;

    const { api: { workerStats } } = getMiner(minerIdentifier);

    fetch(workerStats(workerId))
      .then(res => res.json())
      .catch(error => {
        dispatch({
          type: SET_MINING_ERROR_MESSAGE,
          data: {
            minerIdentifier,
            errorMsg: error
          }
        });
      })
      .then(response => {
        dispatch({
          type: RECEIVE_WORKER_STATS,
          data: {
            minerIdentifier,
            workerStats: response
          }
        });
      });
  };
};

const handleDataByIdenfier = {};
export const startMining = minerIdentifier => {
  return async (dispatch, getState) => {
    const { mining: { address = 'default' } } = getState();
    if (handleDataByIdenfier[minerIdentifier]) return;
    const processManager = await getProcessManagerPlugin();
    const { parser, path, args, environmentVariables, storage } = getMiner(minerIdentifier);

    dispatch({
      type: START_MINING,
      data: { minerIdentifier }
    });

    handleDataByIdenfier[minerIdentifier] = ({ error, data }) => {
      const { timestamp, errorMsg, speed } = parser(error || data);
      if (!isNil(speed)) {
        dispatch({
          type: SET_MINING_SPEED,
          data: {
            minerIdentifier,
            speed
          }
        });
        storage.setItem(timestamp, { timestamp, speed });
      } else if (!isNil(errorMsg)) {
        dispatch({
          type: SET_MINING_ERROR_MESSAGE,
          data: {
            minerIdentifier,
            errorMsg
          }
        });
        storage.setItem(timestamp, { timestamp, errorMsg });
      }
    };
    processManager.onDataReceivedEvent.addListener(handleDataByIdenfier[minerIdentifier]);
    processManager.launchProcess(path, args(address), environmentVariables, true, ({ data }) => {
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
    const { mining: { miners } } = getState();

    dispatch({
      type: STOP_MINING,
      data: { minerIdentifier }
    });
    const processId = miners[minerIdentifier].processId;
    if (processId || handleDataByIdenfier[minerIdentifier]) {
      processManager.onDataReceivedEvent.removeListener(handleDataByIdenfier[minerIdentifier]);
      processManager.terminateProcess(processId);
      delete handleDataByIdenfier[minerIdentifier];
    }
  };
};

export const fetchMetrics = (minerIdentifier, { from = 0, to = Number.MAX_VALUE }) => {
  return async (dispatch, getState) => {
    const { mining: { miners } } = getState();
    const oldMetrics = miners[minerIdentifier].metrics;
    const { storage } = getMiner(minerIdentifier);

    dispatch({
      type: REQUEST_MINING_METRICS,
      data: { minerIdentifier }
    });
    const oldMetricsInRange = oldMetrics.data.filter(
      ([timestamp]) => timestamp > from && timestamp < to
    );

    storage
      .find(
        timestamp =>
          timestamp > from &&
          timestamp < to &&
          (timestamp < oldMetrics.from || timestamp > oldMetrics.to)
      )
      .then(newItemsInRange => {
        if (newItemsInRange.length) {
          const metrics = {
            from,
            to,
            data: [
              ...newItemsInRange.map(({ timestamp, speed, errorMsg }) => [
                timestamp,
                speed,
                errorMsg
              ]),
              ...oldMetricsInRange
            ]
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
                from,
                to,
                data: oldMetricsInRange
              }
            }
          });
        }
      });
  };
};
