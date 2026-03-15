import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MesDemandesPage from './pages/MesDemandesPage';
import NouvelleDemandePage from './pages/NouvelleDemandePage';
import ConfirmationPage from './pages/citoyen/ConfirmationPage';
import AgentDashboardPage from './pages/agent/AgentDashboardPage';
import AgentListeDemandesPage from './pages/agent/AgentListeDemandesPage';
import AgentDetailDemandePage from './pages/agent/AgentDetailDemandePage';
import AgentArchivesPage from './pages/agent/AgentArchivesPage';
import AgentProfilPage from './pages/agent/AgentProfilPage';

/**
 * Protected Route Component
 */
const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) return <div>Chargement...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Simplified role check for agents
  const userRole = user.role;
  const isAgent = userRole.startsWith('AGENT_') || userRole === 'SUPERVISEUR';
  
  const hasAccess = roles.length === 0 || 
                    roles.includes(userRole) || 
                    (roles.includes('AGENT') && isAgent);

  if (!hasAccess) {
    // Redirect to their respective home dashboard if they try to access something they shouldn't
    if (isAgent) return <Navigate to="/agent/dashboard" replace />;
    if (userRole === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Citoyen Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={['CITOYEN']}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/demandes"
        element={
          <ProtectedRoute roles={['CITOYEN']}>
            <MesDemandesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/demandes/nouvelle"
        element={
          <ProtectedRoute roles={['CITOYEN']}>
            <NouvelleDemandePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/demandes/confirmation"
        element={
          <ProtectedRoute roles={['CITOYEN']}>
            <ConfirmationPage />
          </ProtectedRoute>
        }
      />

      {/* Agent Routes */}
      <Route
        path="/agent/dashboard"
        element={
          <ProtectedRoute roles={['AGENT']}>
            <AgentDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agent/demandes"
        element={
          <ProtectedRoute roles={['AGENT']}>
            <AgentListeDemandesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agent/demandes/:id"
        element={
          <ProtectedRoute roles={['AGENT']}>
            <AgentDetailDemandePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agent/archives"
        element={
          <ProtectedRoute roles={['AGENT']}>
            <AgentArchivesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agent/profil"
        element={
          <ProtectedRoute roles={['AGENT']}>
            <AgentProfilPage />
          </ProtectedRoute>
        }
      />

      {/* Shared Protected Routes */}
      <Route
        path="/profil"
        element={
          <ProtectedRoute roles={['CITOYEN', 'ADMIN']}>
            <ProfilPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute roles={['CITOYEN', 'AGENT', 'ADMIN']}>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
