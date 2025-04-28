import React, { useEffect } from 'react';
import notificationManager from './SimpleNotification';

const NotificationWrapper = ({ children }) => {
  useEffect(() => {
    // Initialize notification system
    notificationManager.init();
    const testNotification = () => {
      notificationManager.showSuccess('Notification system initialized');
    };
  }, []);

  return (
    <>
      {children}
      <div id="notification-root" />
    </>
  );
};

export default NotificationWrapper; 