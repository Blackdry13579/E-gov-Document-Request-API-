import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
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
 // eslint-disable-next-line react-hooks/set-state-in-effect
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
 <Navbar title="Notifications"/>
 
 <div className="p-8 max-w-4xl mx-auto">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
  <div>
  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Vos Notifications</h1>
  <p className="text-slate-500 mt-1 font-medium">Restez informé de l'évolution de vos démarches administratives en temps réel.</p>
  </div>
  {notifications.some(n => !n.isRead) && (
  <button 
  className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-primary rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
  onClick={handleMarkAllRead}
  >
  <span className="material-symbols-outlined text-lg">done_all</span>
  Tout marquer comme lu
  </button>
  )}
  </div>

 <div className="notifications-list flex flex-col gap-4">
 {loading ? (
 <p className="text-center py-10 text-slate-400">Chargement...</p>
 ) : notifications.length > 0 ? (
  notifications.map(notif => (
  <Card 
  key={notif._id} 
  className={`group flex gap-6 items-start p-6 rounded-2xl border-2 transition-all relative overflow-hidden ${
  notif.isRead 
  ? 'border-slate-50 bg-white/50 opacity-80' 
  : 'border-primary/10 bg-white shadow-md'
  }`}
  >
  {!notif.isRead && <div className="absolute top-0 left-0 w-1 bg-primary h-full"></div>}
  <div className={`size-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110 ${
  notif.type === 'SUCCESS' ? 'bg-emerald-50 text-emerald-500' : 
  notif.type === 'ERROR' ? 'bg-rose-50 text-rose-500' : 
  'bg-primary/5 text-primary'
  }`}>
  <span className="material-symbols-outlined text-3xl">
  {notif.type === 'SUCCESS' ? 'verified' : 
  notif.type === 'ERROR' ? 'warning' : 'notifications_active'}
  </span>
  </div>
  <div className="flex-1">
  <div className="flex justify-between items-start mb-2">
  <h4 className={`text-lg font-bold leading-tight ${notif.isRead ? 'text-slate-600' : 'text-slate-900 group-hover:text-primary transition-colors'}`}>{notif.titre}</h4>
  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">
  {new Date(notif.createdAt).toLocaleDateString()}
  </span>
  </div>
  <p className="text-sm text-slate-500 mb-4 leading-relaxed">{notif.message}</p>
  
  {!notif.isRead && (
  <button 
  className="text-primary text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1 hover:underline"
  onClick={() => handleMarkAsRead(notif._id)}
  >
  Indiquer comme lu
  <span className="material-symbols-outlined text-sm">done</span>
  </button>
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
