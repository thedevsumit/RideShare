import React from 'react';
import ReactDOM from 'react-dom';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Container for all notifications
const NotificationContainer = ({ children }) => (
  <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 items-end">
    {children}
  </div>
);

// Individual notification component
const Notification = ({ type, message, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  const Icon = type === 'success' ? FaCheckCircle : FaExclamationCircle;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ duration: 0.3 }}
      className={`${bgColor} text-white px-4 py-3 rounded-md shadow-lg flex items-center max-w-sm`}
    >
      <Icon className="mr-2 text-lg" />
      <span className="text-sm font-medium">{message}</span>
    </motion.div>
  );
};

// Global state for notifications
let notifications = [];
let notificationId = 0;
let forceUpdate = null;

// Create a root for our notification portal
let notificationRoot = null;
const getNotificationRoot = () => {
  if (!notificationRoot) {
    notificationRoot = document.createElement('div');
    notificationRoot.id = 'notification-root';
    document.body.appendChild(notificationRoot);
  }
  return notificationRoot;
};

// Render all notifications
const renderNotifications = () => {
  ReactDOM.render(
    <NotificationContainer>
      <AnimatePresence>
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            type={notification.type}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </NotificationContainer>,
    getNotificationRoot()
  );
};

// Add a notification
const addNotification = (type, message) => {
  const id = notificationId++;
  notifications.push({ id, type, message });
  renderNotifications();

  // Auto-remove after 3 seconds
  setTimeout(() => {
    removeNotification(id);
  }, 3000);

  return id;
};

// Remove a notification
const removeNotification = (id) => {
  notifications = notifications.filter(notification => notification.id !== id);
  renderNotifications();
};

// Public API
const notification = {
  showSuccess: (message) => addNotification('success', message),
  showError: (message) => addNotification('error', message),
};

export default notification; 