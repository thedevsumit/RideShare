import React from 'react';
import ReactDOM from 'react-dom/client';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Container for all notifications
const NotificationContainer = ({ children }) => (
  <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 items-end pointer-events-none">
    {children}
  </div>
);

// Individual notification component
const Notification = ({ type, message, onClose, id }) => {
  // Using theme colors - d92626 (red) for errors and f8efe4 (beige) for success
  const bgColor = type === 'success' ? 'bg-[#f8efe4]' : 'bg-[#d92626]';
  const textColor = type === 'success' ? 'text-gray-800' : 'text-white';
  const Icon = type === 'success' ? FaCheckCircle : FaExclamationCircle;
  const iconColor = type === 'success' ? 'text-[#d92626]' : 'text-white';
  const closeButtonColor = type === 'success' ? 'text-gray-500/80 hover:text-gray-700' : 'text-white/80 hover:text-white';

  // Close notification when clicked
  const handleClose = () => {
    onClose(id);
  };

  // Auto-close after 4 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`${bgColor} ${textColor} px-3.5 py-2.5 rounded-lg shadow-md flex items-center max-w-xs pointer-events-auto border border-gray-100`}
    >
      <Icon className={`mr-2 text-base flex-shrink-0 ${iconColor}`} />
      <span className="text-xs font-medium flex-grow mr-1">{message}</span>
      <button 
        onClick={handleClose} 
        className={`${closeButtonColor} transition-colors text-xs p-0.5`}
      >
        <FaTimes />
      </button>
    </motion.div>
  );
};

// Create a notification manager
class NotificationManager {
  constructor() {
    this.notifications = [];
    this.notificationId = 0;
    this.root = null;
  }

  // Initialize the notification root
  init() {
    if (typeof window === 'undefined') return;
    
    if (!this.root) {
      const notificationRoot = document.getElementById('notification-root');
      
      if (notificationRoot) {
        this.root = ReactDOM.createRoot(notificationRoot);
      } else {
        const div = document.createElement('div');
        div.id = 'notification-root';
        document.body.appendChild(div);
        this.root = ReactDOM.createRoot(div);
      }
      
      this.render();
    }
  }

  // Render all notifications
  render() {
    if (!this.root) this.init();
    if (!this.root) return;

    this.root.render(
      <NotificationContainer>
        <AnimatePresence>
          {this.notifications.map(notification => (
            <Notification
              key={notification.id}
              id={notification.id}
              type={notification.type}
              message={notification.message}
              onClose={this.removeNotification}
            />
          ))}
        </AnimatePresence>
      </NotificationContainer>
    );
  }

  // Add a notification
  addNotification = (type, message) => {
    if (!this.root) this.init();
    
    const id = this.notificationId++;
    this.notifications.push({ id, type, message });
    this.render();
    return id;
  }

  // Remove a notification
  removeNotification = (id) => {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
    this.render();
  }

  // Public API
  showSuccess = (message) => this.addNotification('success', message);
  showError = (message) => this.addNotification('error', message);
}

const notificationManager = new NotificationManager();

// Initialize on load if we're in the browser
if (typeof window !== 'undefined') {
  setTimeout(() => {
    notificationManager.init();
  }, 0);
}

export default notificationManager; 