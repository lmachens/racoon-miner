import { RECEIVE_HARDWARE_INFO, STOP_TRACKING_HARDWARE_INFO } from '../types';
import { addHardwareInfoListener, removeHardwareInfoListener } from '../../api/benchmarking';

export const trackHardwareInfo = () => {
  return dispatch => {
    const hardwareInfoListener = hardwareInfo => {
      console.log(hardwareInfo);
      dispatch({
        type: RECEIVE_HARDWARE_INFO,
        data: hardwareInfo
      });
    };

    addHardwareInfoListener(hardwareInfoListener);
  };
};

export const stopTrackingHardwareInfo = () => {
  return dispatch => {
    removeHardwareInfoListener();
    dispatch({
      type: STOP_TRACKING_HARDWARE_INFO
    });
  };
};
