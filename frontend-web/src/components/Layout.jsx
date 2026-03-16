import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="dashboard-layout flex bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-72 flex flex-col min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
