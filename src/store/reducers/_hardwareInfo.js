import { RECEIVE_HARDWARE_INFO, STOP_TRACKING_HARDWARE_INFO } from '../types';

export const hardwareInfo = (
  state = {
    isListening: false,
    data: null
  },
  { type, data }
) => {
  switch (type) {
    case RECEIVE_HARDWARE_INFO:
      return { isListening: true, data };
    case STOP_TRACKING_HARDWARE_INFO:
      return { isListening: false };
    default:
      return state;
  }
};
