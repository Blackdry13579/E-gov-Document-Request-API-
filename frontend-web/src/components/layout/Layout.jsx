import React from 'react';
import Sidebar from './Sidebar';
import './Sidebar.css';

const Layout = ({ children }) => {
 return (
 <div className="app-layout">
 <Sidebar />
 <div className="main-content">
 <main className="flex-1 p-8 overflow-y-auto">
 {children}
 </main>
 </div>
 </div>
 );
};

export default Layout;
