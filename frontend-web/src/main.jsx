import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Router';
import { AuthProvider } from './context/AuthContext';
import { NotifProvider } from './context/NotifContext';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NotifProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </NotifProvider>
    </BrowserRouter>
  </React.StrictMode>
);
