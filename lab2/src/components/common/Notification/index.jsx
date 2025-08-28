
import React from 'react';
import './Notification.css';
import { useNotificationAnimations } from '../../../hooks/useGSAPAnimations';

const Notification = ({ onClose }) => {
  const notificationRef = useNotificationAnimations(true);

  return (
    <div ref={notificationRef} className="notification">
      <div className="notification-content">
        <p className="notification-title">Change saved successfully</p>
        <p className="notification-message">Message a little big longer, but not</p>
      </div>
      <button className="notification-close-btn" onClick={onClose}>Close</button>
    </div>
  );
};

export default Notification;
