import { RECEIVE_HARDWARE_INFO, STOP_TRACKING_HARDWARE_INFO } from '../types';

export const hardwareInfo = (
  state = {
    listening: false,
    data: null
  },
  { type, data }
) => {
  switch (type) {
    case RECEIVE_HARDWARE_INFO:
      return { listening: true, data };
    case STOP_TRACKING_HARDWARE_INFO:
      return { listening: false };
    default:
      return state;
  }
};
