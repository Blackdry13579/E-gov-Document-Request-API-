import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import notificationService from '../services/notificationService';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifs = async () => {
    setLoading(true);
    const result = await notificationService.getAll();
    if (result.success) {
      setNotifications(result.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  const handleMarkAsRead = async (id) => {
    const result = await notificationService.markAsRead(id);
    if (result.success) {
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    }
  };

  const handleMarkAllRead = async () => {
    const result = await notificationService.markAllRead();
    if (result.success) {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    }
  };

  return (
    <Layout>
      <Navbar title="Notifications" />
      
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Vos Notifications</h1>
            <p className="text-slate-500">Suivez les mises à jour de vos dossiers en temps réel.</p>
          </div>
          {notifications.some(n => !n.isRead) && (
            <Button variant="ghost" className="text-primary font-bold" onClick={handleMarkAllRead}>
              Tout marquer comme lu
            </Button>
          )}
        </div>

        <div className="notifications-list flex flex-col gap-4">
          {loading ? (
             <p className="text-center py-10 text-slate-400">Chargement...</p>
          ) : notifications.length > 0 ? (
            notifications.map(notif => (
              <Card 
                key={notif._id} 
                className={`flex gap-5 items-start p-6 transition-all ${notif.isRead ? 'opacity-70 bg-white' : 'border-primary/20 bg-primary/5 shadow-md'}`}
              >
                <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  notif.type === 'SUCCESS' ? 'bg-success/10 text-success' : 
                  notif.type === 'ERROR' ? 'bg-secondary/10 text-secondary' : 
                  'bg-primary/10 text-primary'
                }`}>
                  <span className="material-symbols-outlined">
                    {notif.type === 'SUCCESS' ? 'check_circle' : 
                     notif.type === 'ERROR' ? 'error' : 'notifications'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`font-bold ${notif.isRead ? 'text-slate-700' : 'text-slate-900'}`}>{notif.titre}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{new Date(notif.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{notif.message}</p>
                  
                  {!notif.isRead && (
                    <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(notif._id)}>
                      Marquer comme lu
                    </Button>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-20 opacity-40">
              <span className="material-symbols-outlined text-6xl mb-4">notifications_off</span>
              <p className="text-slate-500 font-bold">Aucune notification pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage;
