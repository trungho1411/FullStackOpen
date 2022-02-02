import React from 'react';

const Notification = ({ messageClass, message }) => {
  if (message === null) {
    return null;
  }
  return <div className={messageClass}>{message}</div>;
};

export default Notification;
