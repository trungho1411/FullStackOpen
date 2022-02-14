const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTI':
      return action.notification;
    default:
      return state;
  }
};

export const showNoti = (notification) => {
  return {
    type: 'SHOW_NOTI',
    notification,
  };
};

let timeoutID = undefined;

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    clearTimeout(timeoutID);
    dispatch({
      type: 'SHOW_NOTI',
      notification,
    });
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SHOW_NOTI',
        notification: '',
      });
    }, time);
  };
};
export default notificationReducer;
