import React from 'react';
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === '') {
    return null;
  }
  return (
    <div className='container'>
      <Alert severity='success'>{notification}</Alert>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
