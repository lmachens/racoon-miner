import {
  APPEND_MINING_LOG,
  CONNECTING_POOL,
  CONTINUE_MINING,
  RECEIVE_WORKER_STATS,
  SELECT_MINER,
  SET_CORES,
  SET_GPUS,
  SET_MINING_ADDRESS,
  SET_MINING_ERROR_MESSAGE,
  SET_MINING_SPEED,
  SET_NOTIFICATION,
  SET_PROCESS_ID,
  START_MINING,
  STOP_MINING,
  SUSPEND_MINING,
  UNSET_NOTIFICATION
} from '../types';
import { CRYPTO_NIGHT_V7, minersByIdentifier } from '../../api/mining';
import { developerAddress, getStats, isValidAddress } from '../../api/nice-hash';
import { getMaxCores, getMaxGPUs } from '../../api/benchmarking';

import { TEST_MODE } from '../../api/notifications';
import { getProcessManagerPlugin } from '../../api/plugins';
import isNil from 'lodash/isNil';

export const loadDefault = () => {
  return dispatch => {
    dispatch({
      type: SELECT_MINER,
      data: CRYPTO_NIGHT_V7
    });
    dispatch({
      type: SET_MINING_ADDRESS,
      data: { address: developerAddress }
    });
    dispatch({
      type: SET_NOTIFICATION,
      notification: TEST_MODE
    });
  };
};

export const setMiningAddress = (minerIdentifier, address) => {
  return dispatch => {
    dispatch({
      type: SET_MINING_ADDRESS,
      data: { address, minerIdentifier }
    });

    const validAddress = isValidAddress(address);

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
    dispatch({
      type: UNSET_NOTIFICATION
    });
  };
};

export const selectMiner = minerIdentifier => {
  return dispatch => {
    dispatch({
      type: SELECT_MINER,
      data: minerIdentifier
    });
    dispatch(trackWorkerStats());
  };
};

export const trackWorkerStats = () => {
  return dispatch => {
    dispatch(fetchWorkerStats());
    setInterval(() => {
      dispatch(fetchWorkerStats());
    }, 60000);
  };
};

export const appendMiningLog = line => {
  return dispatch => {
    dispatch({
      type: APPEND_MINING_LOG,
      data: {
        timestamp: Date.now(),
        line
      }
    });
  };
};

const fetchWorkerStats = () => {
  return (dispatch, getState) => {
    const {
      mining: { miners, selectedMinerIdentifier: minerIdentifier }
    } = getState();
    const { address } = miners[minerIdentifier];

    getStats(address, minerIdentifier)
      .then(result => {
        dispatch({
          type: RECEIVE_WORKER_STATS,
          data: {
            minerIdentifier,
            workerStats: result
          }
        });
      })
      .catch(errorMsg => {
        dispatch({
          type: SET_MINING_ERROR_MESSAGE,
          data: {
            minerIdentifier,
            errorMsg
          }
        });
      });
  };
};

const handleDataByIdenfier = {};
let sendTextInterval = null;
export const startMining = minerIdentifier => {
  return async (dispatch, getState) => {
    const {
      mining: { miners, selectedMinerIdentifier }
    } = getState();
    const { address = 'default', cores, gpus } = miners[selectedMinerIdentifier];
    if (handleDataByIdenfier[minerIdentifier]) return;
    const processManager = await getProcessManagerPlugin();
    const { parser, path, args, environmentVariables } = minersByIdentifier[minerIdentifier];

    dispatch({
      type: START_MINING,
      data: { minerIdentifier }
    });

    handleDataByIdenfier[minerIdentifier] = async ({ error, data }) => {
      const line = error || data;
      const { connecting, errorMsg, speed } = parser(line);

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
      } else if (!isNil(errorMsg)) {
        dispatch({
          type: SET_MINING_ERROR_MESSAGE,
          data: {
            minerIdentifier,
            errorMsg
          }
        });
      }
      dispatch(appendMiningLog(line));
    };
    processManager.onDataReceivedEvent.addListener(handleDataByIdenfier[minerIdentifier]);
    const minerArgs = args({ address, cores, gpus });
    processManager.launchProcess(path, minerArgs, environmentVariables(), true, ({ data }) => {
      console.info(`%cStart mining ${data} with ${minerArgs}`, 'color: blue');
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

export const suspendMining = gameTitle => {
  return (dispatch, getState) => {
    const {
      activeMiners,
      mining: { selectedMinerIdentifier }
    } = getState();
    const { isMining, isSuspended } = activeMiners[selectedMinerIdentifier];
    if (isMining && !isSuspended) {
      dispatch(appendMiningLog(`${gameTitle} is running. Mining is suspended!`));
      dispatch(stopMining(selectedMinerIdentifier));
      dispatch({
        type: SUSPEND_MINING,
        data: { minerIdentifier: selectedMinerIdentifier }
      });
    }
  };
};

export const continueMining = gameTitle => {
  return (dispatch, getState) => {
    const {
      activeMiners,
      mining: { selectedMinerIdentifier }
    } = getState();
    const { isMining, isSuspended } = activeMiners[selectedMinerIdentifier];
    if (!isMining && isSuspended) {
      dispatch(appendMiningLog(`${gameTitle} is terminated. Continue mining!`));
      dispatch(startMining(selectedMinerIdentifier));
      dispatch({
        type: CONTINUE_MINING,
        data: { minerIdentifier: selectedMinerIdentifier }
      });
    }
  };
};

export const addCore = () => {
  return (dispatch, getState) => {
    const {
      activeMiners,
      mining: { miners, selectedMinerIdentifier },
      hardwareInfo: { Cpus }
    } = getState();
    const { cores } = miners[selectedMinerIdentifier];

    const maxCores = getMaxCores(Cpus);

    if (cores + 1 > maxCores) return;
    dispatch({
      type: SET_CORES,
      data: { minerIdentifier: selectedMinerIdentifier, cores: cores + 1 }
    });

    const { isMining } = activeMiners[selectedMinerIdentifier];
    if (isMining) {
      dispatch(stopMining(selectedMinerIdentifier));
    }
  };
};

export const removeCore = () => {
  return (dispatch, getState) => {
    const {
      activeMiners,
      mining: { miners, selectedMinerIdentifier }
    } = getState();
    const { cores } = miners[selectedMinerIdentifier];

    if (cores - 1 < 0) return;
    dispatch({
      type: SET_CORES,
      data: { minerIdentifier: selectedMinerIdentifier, cores: cores - 1 }
    });

    const { isMining } = activeMiners[selectedMinerIdentifier];
    if (isMining) {
      dispatch(stopMining(selectedMinerIdentifier));
    }
  };
};

export const addGPU = () => {
  return (dispatch, getState) => {
    const {
      activeMiners,
      mining: { miners, selectedMinerIdentifier },
      hardwareInfo: {
        Gpus: { Gpus }
      }
    } = getState();
    const { gpus } = miners[selectedMinerIdentifier];

    const maxGPUs = getMaxGPUs(Gpus);

    if (gpus + 1 > maxGPUs) return;
    dispatch({
      type: SET_GPUS,
      data: { minerIdentifier: selectedMinerIdentifier, gpus: gpus + 1 }
    });

    const { isMining } = activeMiners[selectedMinerIdentifier];
    if (isMining) {
      dispatch(stopMining(selectedMinerIdentifier));
    }
  };
};

export const removeGPU = () => {
  return (dispatch, getState) => {
    const {
      activeMiners,
      mining: { miners, selectedMinerIdentifier }
    } = getState();
    const { gpus } = miners[selectedMinerIdentifier];

    if (gpus - 1 < 0) return;
    dispatch({
      type: SET_GPUS,
      data: { minerIdentifier: selectedMinerIdentifier, gpus: gpus - 1 }
    });

    const { isMining } = activeMiners[selectedMinerIdentifier];
    if (isMining) {
      dispatch(stopMining(selectedMinerIdentifier));
    }
  };
};
