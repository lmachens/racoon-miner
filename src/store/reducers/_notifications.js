import { SET_NOTIFICATION, UNSET_NOTIFICATION } from '../types';

export const notifications = (
  state = {
    notification: null
  },
  { type, notification }
) => {
  switch (type) {
    case SET_NOTIFICATION:
      return { notification };
    case UNSET_NOTIFICATION:
      return { notification: null };
    default:
      return state;
  }
};
