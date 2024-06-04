import React, { useEffect } from 'react';

const Notification = ({ message, type, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
    className={`fixed top-20 flex justify-center items-center transform -translate-x-1/2 mt-4 w-[300px] max-w-md text-center py-2 rounded 
        ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
        ${visible ? 'slide-down' : ''} z-50 `}
    >
      {message}
    </div>
  );
};

export default Notification;
