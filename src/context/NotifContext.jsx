import React, { createContext, useContext, useState, useCallback } from 'react';

const NotifContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useNotif = () => {
  const context = useContext(NotifContext);
  if (!context) throw new Error('useNotif must be used within a NotifProvider');
  return context;
};

export const NotifProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('egov_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const unreadCount = notifications.filter(n => !n.lue && !n.isRead).length;

  React.useEffect(() => {
    localStorage.setItem('egov_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const markNotifAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true, lue: true } : n));
  };

  const markAllNotifsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true, lue: true })));
  };

  const removeNotif = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /**
   * Add a toast notification
   * @param {string} message 
   * @param {string} type - 'success' | 'danger' | 'warning' | 'info'
   */
  const addNotif = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    if (duration) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  return (
    <NotifContext.Provider value={{ addNotif, removeNotif, notifications, setNotifications, unreadCount, markNotifAsRead, markAllNotifsAsRead }}>
      {children}
      
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <span className={`material-symbols-outlined text-${t.type}`}>
              {t.type === 'success' ? 'check_circle' : 
               t.type === 'danger' ? 'error' : 
               t.type === 'warning' ? 'warning' : 'info'}
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-800">{t.message}</p>
            </div>
            <button onClick={() => removeNotif(t.id)} className="text-slate-400 hover:text-slate-600">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ))}
      </div>
    </NotifContext.Provider>
  );
};
